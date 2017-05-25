import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { MapsComponent } from '../pages/maps/maps';
import template from "./app.html";

@Component({
	selector: 'my-app',
	template
})
export class App {
	rootPage: any;

	constructor(platform: Platform) {
		this.rootPage = MapsComponent;

		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			if (platform.is('cordova')) {
				StatusBar.styleDefault();
				Splashscreen.hide();
			}
		});
	}
}