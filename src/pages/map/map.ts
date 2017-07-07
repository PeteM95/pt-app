import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { CameraPosition, GoogleMap, GoogleMaps, GoogleMapsEvent, LatLng, Marker, MarkerIcon, MarkerOptions } from '@ionic-native/google-maps';

declare var plugin: any;
declare var cordova: any;


@Component({
	selector: 'page-map',
	templateUrl: 'map.html'
})
export class MapPage implements OnDestroy {
	coords: Subscription;
	firstCamera: boolean;
	googleMap: GoogleMap;
	icon: MarkerIcon;
	marker: Marker;
	markerOptions: MarkerOptions;

	@ViewChild('map') theMap: ElementRef;
	map: any;

	constructor(private _googleMaps: GoogleMaps,
				public navCtrl: NavController,
				public platform: Platform,
				private _geolocation: Geolocation) {
		Observable.fromPromise(platform.ready())
			.subscribe(
				() => {
					this.loadMap();
					this.watchPosition();
				},
				(err: any) => console.log(err),
				() => {}
			);
		this.icon = { url: 'file:///android_asset/www/assets/marker.png'};
		this.markerOptions = {
			title: 'Current Position',
			flat: true,
			icon: <MarkerIcon>{ url: 'file:///android_asset/www/assets/marker.png'}
		};
	}

	ngOnDestroy() {
		this.coords.unsubscribe();
	}

	addMarker(position: LatLng): void {
		if (this.marker) {
			this.marker.remove();
		}
		this.markerOptions.position = position;
		this.map.addMarker(this.markerOptions, (marker: Marker) => {
			marker.showInfoWindow();
			this.marker = marker;
		});
	}

	checkIn(): void {
		console.log('Checking in...');
	}

	loadMap(): void {
		console.log('Start loading Map');

		let element = this.theMap.nativeElement;
		this.map = new plugin.google.maps.Map.getMap(element, {});

		console.log('Map should be loaded.');
		this.map.one(plugin.google.maps.event.MAP_READY, () => {
			console.log('Map is ready.');
		});
		
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
						this.map.moveCamera(camera);
						//this.googleMap.moveCamera(camera);
						this.firstCamera = false;
					}
					this.addMarker(position);
				}
			);
	}
}