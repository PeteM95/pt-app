import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-angular';
import template from "./app.html";

@Component({
	selector: 'my-app',
	template
})
export class App {
	constructor(platform: Platform) {
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