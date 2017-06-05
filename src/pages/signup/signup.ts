import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { SetupPage } from '../setup/setup';
import { User } from '../../providers/user';

@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html'
})
export class SignupPage {
	// The account fields for the login form.
	// If you're using th eusername field with or without email, make
	// sure to add it to the type
	account: { username: string, email: string, password: string } = {
		username: 'Test Human',
		email: 'test@example.com',
		password: 'test'
	};

	// Our translated text strings
	// private signupErrorString: string;

	constructor(public navCtrl: NavController,
				public _user: User,
				public toastCtrl: ToastController) {  }

	doSignup() {
		// Attempt to login through our User service
		this._user.signup(this.account)
			.subscribe(
				(resp) => {
					console.log(resp);
					this.navCtrl.push(SetupPage);
				},
				(err) => {
					this.navCtrl.push(SetupPage); // TODO: Remove this when you add your signup endpoint

					// Unable to sign up
					const toast = this.toastCtrl.create({
						message: err,
						duration: 3000,
						position: 'top'
					});
					toast.present();
				}
			);
	}
}