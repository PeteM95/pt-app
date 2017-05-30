import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';

import { User } from '../../providers/user';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	// The account fields for the login form.
	// If you're using the username field with or without email, make
	// sure to add it to the type
	account: { username: string, password: string } = {
		username: 'Test Human',
		password: 'test'
	};

	// Our translated text strings
	//private loginErrorString: string;

	constructor(public navCtrl: NavController,
				public _user: User,
				public toastCtrl: ToastController) {  }

	// Attempt to login through our User service
	doLogin() {
		this._user.login(this.account)
			.subscribe(
				(resp: string) => {
					console.log(resp);
					this.navCtrl.push(MainPage);
				},
				(err) => {
					this.navCtrl.push(MainPage); // TODO: Make this go somewhere else (handle error)
					// Unable to log in
					let toast = this.toastCtrl.create({
						message: err,
						duration: 3000,
						position: 'top'
					});
					toast.present();
				}
			);
	}
}