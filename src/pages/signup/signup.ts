import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { MeteorObservable } from 'meteor-rxjs';

import { Setup1 } from '../setup/pages';
import { User } from '../../services/user';
import { Profile } from 'api/models';

@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html'
})
export class SignupPage {
	// The account fields for the login form.
	// If you're using th eusername field with or without email, make
	// sure to add it to the type
	account: Profile = {
		username: 'Test Human',
		email: 'pete.milionis@gmail.com',
		password: 'test'
	};

	// Our translated text strings
	// private signupErrorString: string;

	constructor(public navCtrl: NavController,
				public toastCtrl: ToastController,
				private alertCtrl: AlertController,
				private _user: User) {  }

	doSignup() {
		// Attempt to login through our User service
		Observable.fromPromise(this._user.signup(this.account))
			.concatMap(result => MeteorObservable.call('sendVerificationLink'),
					  (outer, inner) => outer)
			.subscribe(
				() => console.log('signup complete'),
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