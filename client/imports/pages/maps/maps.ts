import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Observable, Subscription } from 'rxjs';
import { SebmGoogleMap } from 'angular2-google-maps/core';
import { Location } from '../../../../imports/models';
import template from './maps.html';

const DEFAULT_ZOOM = 8;
const EQUATOR = 40075004;
const DEFAULT_LAT = 51.678418;
const DEFAULT_LNG = 7.809007;
const LOCATION_REFRESH_INTERVAL = 500;

@Component({
	template
})
export class MapsComponent implements OnInit, OnDestroy {
	lat: number = DEFAULT_LAT;
	lng: number = DEFAULT_LNG;
	zoom: number = DEFAULT_ZOOM;
	accuracy: number = -1;
	intervalObs: Subscription;

	constructor(private platform: Platform) {  }

	ngOnInit() {
		// Refresh location at a specific refresh rate
		this.intervalObs = this.reloadLocation()
			.flatMapTo(Observable
				.interval(LOCATION_REFRESH_INTERVAL)
				.timeInterval())
			.subscribe(() => {
				this.reloadLocation();
			});
	}

	ngOnDestroy() {
		// Dispose subscription
		if (this.intervalObs) {
			this.intervalObs.unsubscribe();
		}
	}

	calculateZoomByAccuracy(accuracy: number): number {
		// Source: http://stackoverflow.com/a/25143326
		const deviceHeight = this.platform.height();
		const deviceWidth = this.platform.width();
		const screenSize = Math.min(deviceWidth, deviceHeight);
		const requiredMpp = accuracy / screenSize;

		return ((Math.log(EQUATOR / (256 * requiredMpp))) / Math.log(2)) + 1;
	}

	reloadLocation(): any {
		return Observable.fromPromise(Geolocation.getCurrentPosition().then((position) => {
			if (this.lat && this.lng) {
				// Update view-models to represent the current geo-location
				console.log(position);
				this.accuracy = position.coords.accuracy;
				this.lat = position.coords.latitude;
				this.lng = position.coords.longitude;
				this.zoom = this.calculateZoomByAccuracy(this.accuracy);
			}
		}).catch((error) => {
			console.log('Error getting location', error);
		}));
	}
}