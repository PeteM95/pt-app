import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs'; // Double check if I need these

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { CameraPosition, GoogleMap, GoogleMaps, GoogleMapsEvent, LatLng, Marker, MarkerIcon, MarkerOptions } from '@ionic-native/google-maps';

declare var google: any;

@Component({
	selector: 'page-map',
	templateUrl: 'map.html'
})
export class MapPage implements AfterViewInit, OnDestroy {
	coords: Subscription;
	firstCamera: boolean;
	googleMap: GoogleMap;
	icon: MarkerIcon;
	marker: Marker;
	markerOptions: MarkerOptions;

	@ViewChild('map') map;

	constructor(private _googleMaps: GoogleMaps,
				public navCtrl: NavController,
				public platform: Platform,
				private _geolocation: Geolocation) {
		this.icon = { url: 'file:///android_asset/www/assets/marker.png'};
		this.markerOptions = {
			title: 'Current Position',
			flat: true,
			icon: this.icon
		};
	}

	ngAfterViewInit() {
		this.platform.ready().then(() => {
			this.loadMap();
			this.watchPosition();
		});
	}

	ngOnDestroy() {
		this.coords.unsubscribe();
	}

	addMarker(position: LatLng): void {
		if (this.marker) {
			this.marker.remove();
		}

		this.markerOptions.position = position;

		Observable.fromPromise(this.googleMap.addMarker(this.markerOptions))
			.subscribe(
				(marker: Marker) => {
					marker.showInfoWindow();
					this.marker = marker;
				},
				(err: any) => console.log(err),
				() => {}
			);
	}

	checkIn(): void {
		console.log('Checking in...');
	}

	loadMap(): void {
		// create a new map by passing HTMLElement
		let element: HTMLElement = document.getElementById('map');

		this.googleMap = this._googleMaps.create(element);

		// listen to MAP_READY event
		// must wait for this event to fire before modifying the map
		Observable.fromPromise(this.googleMap.one(GoogleMapsEvent.MAP_READY))
			.subscribe(
				() => console.log('Map page Map is ready'),
				(err: any) => console.log(err),
				() => {}
			);
		this.firstCamera = true;
	}

	watchPosition(): void {
		this.coords = this._geolocation.watchPosition({ enableHighAccuracy: true })
			.sample(Observable.interval(2500))
			.subscribe(
				(res: Geoposition) => {
					const position: LatLng = new LatLng(res.coords.latitude, res.coords.longitude);
					const camera: CameraPosition = {
						target: position,
						zoom: 18
					};
					if (this.firstCamera) {
						// Only change camera on the initial load. This is so
						// the user can rotate/tilt/etc. without being interrupted.
						// Should change so camera only moves if marker moves out of current camera.
						this.googleMap.moveCamera(camera);
						this.firstCamera = false;
					}
					this.addMarker(position);
				}
			);
	}
}