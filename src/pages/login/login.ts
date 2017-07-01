import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';

import { User } from '../../services/user';

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
		console.log('log in');
	}
}