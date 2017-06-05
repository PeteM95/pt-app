import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { GymSetup } from './gym/gym';


export interface Slide {
	title: string;
	body: Component;
}

@Component({
	selector: 'page-setup',
	templateUrl: 'setup.html'
})
export class SetupPage {
	slides: Slide[];
	currentSlide: Slide;
	showSkip: boolean = false;

	constructor(public navCtrl: NavController,
				public menu: MenuController) {
		this.slides = [
			{
				title: 'Gym Location',
				body: GymSetup
			}
		];
		this.currentSlide = this.slides[0];
	}

	skip() {
		// Skip slide for use in modifying pre-existing settings
	}

	startApp() {
		this.navCtrl.setRoot(TabsPage, {}, {
			animate: true,
			direction: 'forward'
		});
	}

	ionViewDidEnter() {
		// The root left menu should be disabled on the setup page
		this.menu.enable(false);
	}

	ionViewWillLeave() {
		// Enable the root left menu when leaving the setup page
		this.menu.enable(true);
	}
}