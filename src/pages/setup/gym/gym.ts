import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ModalController, NavController, Platform } from 'ionic-angular';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Observable } from 'rxjs';

import { AutocompletePage } from './autocomplete';

import { CameraPosition, Geocoder, GoogleMap, GoogleMaps, GoogleMapsEvent, LatLng, Marker, MarkerIcon, MarkerOptions } from '@ionic-native/google-maps';

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
	}

	ngAfterViewInit() {
		this.platform.ready().then(() => {
			this.loadMap();
		});
	}

	loadMap(): void {
		let element: HTMLElement = document.getElementById('map');
		this.googleMap = this._googleMaps.create(element);
		this.googleMap.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready'));

		// Load PlacesService
		this._mapsAPILoader.load().then(() => {
			this.places = new google.maps.places.PlacesService(document.createElement('div'));
		});
	}

	loadMarker(): void {
		let place = this.address;
		this.places.getDetails( { placeId: place.place_id }, (placeResult, status) => {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				this.gym.name = placeResult.name;
				Observable.fromPromise(this._geocoder.geocode({ address: placeResult.formatted_address }))
					.subscribe(
						(result: any) => {
							this.gym.position = result.position;
						},
						(err: any) => {
							console.log(err);
						},
						() => {}
					);
			}
		});

		this.markerOptions = {
			title: this.gym.name,
			position: this.gym.position
		};

		Observable.fromPromise(this.googleMap.addMarker(this.markerOptions))
			.subscribe(
				(marker: Marker) => {
					marker.showInfoWindow();
					this.marker = marker;
				},
				(err: any) => {
					console.log(err);
				},
				() => {
					this.moveCamera(this.markerOptions.position);
				}
			);
			
		return;
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
		modal.onDidDismiss(data => {
			this.address = data;
			this.loadMarker();
			if (this.address) {
				console.log('all done');
			}
		});
		modal.present();
	}
}