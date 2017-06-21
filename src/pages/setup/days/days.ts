import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Observable } from 'rxjs';

import { MainPage } from '../../pages';

export interface Day {
	name: string,
	selected: boolean
}

@Component({
	selector: 'setup-days',
	templateUrl: 'days.html'
})
export class DaysSetup {
	days: Array<Day> = [
		{ name: 'Sunday', selected: false },
		{ name: 'Monday', selected: false },
		{ name: 'Tuesday', selected: false },
		{ name: 'Wednesday', selected: false },
		{ name: 'Thursday', selected: false },
		{ name: 'Friday', selected: false },
		{ name: 'Saturday', selected: false },
	]

	constructor(public navCtrl: NavController,
				public platform: Platform) {  }

	pushPage(): void {
		// TODO: Process data
		console.log(`Days selected: ${this.days}`);
		Observable.fromPromise(this.navCtrl.setRoot(MainPage))
			.subscribe(
				() => console.log('Setting root to MainPage'),
				(err: any) => console.log(err),
				() => {}
			);
	}
}