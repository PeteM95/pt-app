import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ModalController, NavController, Platform } from 'ionic-angular';
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs';

import { AutocompletePage } from './autocomplete';
import { Setup4 } from '../pages';

import { CameraPosition, Geocoder, GeocoderResult, GoogleMap, GoogleMaps, GoogleMapsEvent, LatLng, Marker, MarkerIcon, MarkerOptions } from '@ionic-native/google-maps';

declare var plugin: any;
declare var cordova: any;

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

	@ViewChild('map') theMap: ElementRef;
	map: any;

	constructor(public navCtrl: NavController,
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
		Observable.fromPromise(this.platform.ready())
			.subscribe(
				(res: string) => { this.loadMap(); },
				(err: any) => { console.log(err); },
				() => {}
			);
	}

	loadMap(): void {
		console.log('Start loading Map');

		let element = this.theMap.nativeElement;
		this.map = new plugin.google.maps.Map.getMap(element, {});

		console.log('Map should be loaded.');
		this.map.one(plugin.google.maps.event.MAP_READY, () => {
			console.log('Map is ready.');
		});


		// let element: HTMLElement = document.getElementById('map');
		// this.googleMap = this._googleMaps.create(element);
		// this.googleMap.setOptions({
		// 	'gestures': {
		// 		'scroll': false,
		// 		'tilt': false,
		// 		'rotate': false,
		// 		'zoom': false
		// 	}
		// });

		// Observable.fromPromise(this.googleMap.one(GoogleMapsEvent.MAP_READY))
		// 	.subscribe(
		// 		(res: any) => { console.log('Map is ready'); },
		// 		(err: any) => { console.log(err); },
		// 		() => {}
		// 	);

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
				//console.log(placeResult);

				this.gym.name = placeResult.name;
				this.gym.position = new LatLng(placeResult.geometry.location.lat(), placeResult.geometry.location.lng());
				this.markerOptions = {
					title: placeResult.name,
					position: this.gym.position,
				}

				this.map.addMarker(this.markerOptions, (marker: Marker) => {
					if (this.marker) {
						this.marker.remove();
					}
					marker.showInfoWindow();
					this.marker = marker;
				});

				this.map.moveCamera(this.moveCamera(this.markerOptions.position));

				// Observable.fromPromise(this._geocoder.geocode({ address: placeResult.address_components[0].long_name }))
				// 	.do((result: GeocoderResult) => {
				// 		if (result[0]) {
				// 			console.log(result);
				// 			this.gym.position = new LatLng(placeResult.geometry.location.lat(), placeResult.geometry.location.lng());
				// 			//this.gym.position = new LatLng(result[0].position.lat, result[0].position.lng);
				// 			this.markerOptions = {
				// 				title: this.gym.name,
				// 				position: this.gym.position,
				// 				animation: 'drop'
				// 			};
				// 		} else {
				// 			console.log('Could not Geocode place');
				// 		}
				// 	})
				// 	.do(() => {
				// 		this.map.addMarker(this.markerOptions, (marker: Marker) => {
				// 			if (this.marker) {
				// 				this.marker.remove();
				// 			}
				// 			marker.showInfoWindow();
				// 			this.marker = marker;
				// 		});
				// 	})
				// 	// .concatMap(result => this.map.addMarker(this.markerOptions),
				// 	// 		  (result, marker) => marker)
				// 	.subscribe(
				// 		() => {
				// 			//console.log('should be done with marker');
				// 		},
				// 		(err: any) => {
				// 			console.log(err);
				// 		},
				// 		() => {
				// 			this.map.moveCamera(this.moveCamera(this.markerOptions.position));							
				// 		}
				// 	);
			}
		});
	}

	moveCamera(position: LatLng): CameraPosition {
		const camera: CameraPosition = {
			target: position,
			zoom: 15
		};

		return camera;
	}

	pushPage(): void {
		// TODO: Process data
		this.map.remove();
		Observable.fromPromise(this.navCtrl.push(Setup4))
			.subscribe(
				() => console.log('Pushing to next'),
				(err: any) => console.log(err),
				() => {}
			);
	}

	showAddressModal(): void {
		let modal = this.modalCtrl.create(AutocompletePage);
		//this.googleMap.setClickable(false);
		modal.onDidDismiss(data => {
			//this.googleMap.setClickable(true);
			if (data) {
				this.address = data;
				this.loadMarker();
				if (this.address) {
					//console.log('all done');
				}
			};
		});
		modal.present();
	}
}