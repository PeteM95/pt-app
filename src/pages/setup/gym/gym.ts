import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ModalController, NavController, Platform } from 'ionic-angular';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Observable } from 'rxjs';

import { AutocompletePage } from './autocomplete';

import { CameraPosition, Geocoder, GeocoderResult, GoogleMap, GoogleMaps, GoogleMapsEvent, LatLng, Marker, MarkerIcon, MarkerOptions } from '@ionic-native/google-maps';

@Component({
	selector: 'setup-gym',
	templateUrl: 'gym.html'
})
export class GymSetup implements AfterViewInit {
	address: google.maps.places.AutocompletePrediction;
	googleMap: GoogleMap;
	gym: { name: string, position: LatLng };
	icon: MarkerIcon;
	marker: Marker;
	markerOptions: MarkerOptions;
	places: google.maps.places.PlacesService;
	displayMap: string;

	@ViewChild('map') map;

	constructor(private _navCtrl: NavController,
				public modalCtrl: ModalController,
				public platform: Platform,
				private _googleMaps: GoogleMaps,
				private _geocoder: Geocoder,
				private _mapsAPILoader: MapsAPILoader) {
		this.gym = {
			name: '',
			position: null
		};
		this.address = {
			description: '',
			matched_substrings: [],
			place_id: '',
			terms: [],
			types: []
		};
		this.displayMap = 'block';
	}

	ngAfterViewInit() {
		Observable.fromPromise(this.platform.ready())
			.subscribe(
				(res: string) => { this.loadMap(); },
				(err: any) => { console.log(err); },
				() => {}
			);
	}

	loadMap(): void {
		let element: HTMLElement = document.getElementById('map');
		this.googleMap = this._googleMaps.create(element);
		this.googleMap.setOptions({
			'gestures': {
				'scroll': false,
				'tilt': false,
				'rotate': false,
				'zoom': false
			}
		});

		Observable.fromPromise(this.googleMap.one(GoogleMapsEvent.MAP_READY))
			.subscribe(
				(res: any) => { console.log('Map is ready'); },
				(err: any) => { console.log(err); },
				() => {}
			);

		// Load PlacesService
		Observable.fromPromise(this._mapsAPILoader.load())
			.subscribe(
				() => {
					this.places = new google.maps.places.PlacesService(document.createElement('div'));
				},
				(err: any) => { console.log(err); },
				() => {}
			);
	}

	loadMarker(): void {
		let place = this.address;
		this.places.getDetails( { placeId: place.place_id }, (placeResult, status) => {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				this.gym.name = placeResult.name;
				Observable.fromPromise(this._geocoder.geocode({ address: placeResult.formatted_address }))
					.do((result: GeocoderResult) => {
						if (result[0]) {
							//console.log(result);
							this.gym.position = new LatLng(result[0].position.lat, result[0].position.lng);
							this.markerOptions = {
								title: this.gym.name,
								position: this.gym.position
							};
						}
					})
					.concatMap(result => Observable.fromPromise(this.googleMap.addMarker(this.markerOptions)),
							  (result, marker) => marker)
					.subscribe(
						(marker: Marker) => {
							if (this.marker) {
								this.marker.remove();
							}
							marker.showInfoWindow();
							this.marker = marker;
						},
						(err: any) => {
							console.log(err);
						},
						() => {
							this.googleMap.moveCamera(this.moveCamera(this.markerOptions.position));							
						}
					);
			}
		});
	}

	moveCamera(position: LatLng): CameraPosition {
		const camera: CameraPosition = {
			target: position,
			zoom: 18
		};

		return camera;
	}

	showAddressModal(): void {
		let modal = this.modalCtrl.create(AutocompletePage);
		this.displayMap = 'none';
		modal.onDidDismiss(data => {
			this.displayMap = 'block';
			if (data) {
				this.address = data;
				this.loadMarker();
				if (this.address) {
					console.log('all done');
				}
			};
		});
		modal.present();
	}
}