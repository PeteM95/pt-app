import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Observable } from 'rxjs';

import { Setup3 } from '../pages';

@Component({
	selector: 'setup-organization',
	templateUrl: 'organization.html'
})
export class OrganizationSetup {
	organization = { selected: false, ein: '13-3433452'}
	amount: number = 1;
	
	constructor(public navCtrl: NavController,
				public platform: Platform) {  }

	pushPage(): void {
		// TODO: Process data
		console.log(`Amount selected: ${this.amount}`);
		Observable.fromPromise(this.navCtrl.push(Setup3, {
					ein: this.organization.ein,
					amount: this.amount
				}))
			.subscribe(
				() => console.log('Pushing to next'),
				(err: any) => console.log(err),
				() => {}
			);
	}

}