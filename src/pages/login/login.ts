import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';

//import { MainPage } from '../../pages/pages';
import { Setup1 } from '../setup/pages';

import { User } from '../../services/user';

import { Profile } from 'api/models';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	account: Profile = {
		username: 'Test Human',
		email: 'pete.milionis@gmail.com',
		password: 'test'
	};

	// Our translated text strings
	//private loginErrorString: string;

	constructor(public navCtrl: NavController,
				public toastCtrl: ToastController,
				private alertCtrl: AlertController,
				private _user: User) {  }

	// Attempt to login through our User service
	doLogin() {
		Observable.fromPromise(this._user.login(this.account))
			.subscribe(
				() => this.navCtrl.push(Setup1),
				(e: Error) => this.handleError(e)
			);
	}

	handleError(e: Error): void {
		console.log(e);

		const alert = this.alertCtrl.create({
			buttons: ['OK'],
			message: e.message,
			title: 'Oops!'
		});
	}
}