import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { MeteorObservable } from 'meteor-rxjs';

import { Meteor } from 'meteor/meteor';
import { DDP } from 'meteor/ddp';

import { Setup1 } from '../setup/pages';
import { User } from '../../services/user';
import { Profile } from 'api/models';

@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html'
})
export class SignupPage implements OnInit {
	// The account fields for the login form.
	// If you're using th eusername field with or without email, make
	// sure to add it to the type
	account: Profile = {
		username: 'Test Human',
		email: 'pete.milionis@gmail.com',
		password: 'test'
	};

	// FOR TESTING
	ddp: any;

	// Our translated text strings
	// private signupErrorString: string;

	constructor(public navCtrl: NavController,
				public toastCtrl: ToastController,
				private alertCtrl: AlertController,
				private _user: User) {  }

	ngOnInit() {
		// console.log('testing');
		// this.ddp = DDP.connect('http://192.168.0.20:3000');
		// this.ddp.call('testConnection');
		// MeteorObservable.call('testConnection').subscribe();

		// Log DDP
		let oldSend = Meteor['connection']._stream.send;
		Meteor['connection']._stream.send = function() {
			oldSend.apply(this, arguments);
		}

		Meteor['connection']._stream.on('message', (message) => {
			console.log('DDP receive: ', message);
		});
	}

	doSignup() {
		// Attempt to login through our User service
		this.testConnection();
		Observable.fromPromise(this._user.signup(this.account))
			.concatMap(result => MeteorObservable.call('sendVerificationLink'),
					  (outer, inner) => outer)
			.subscribe(
				() => this.navCtrl.setRoot(Setup1),
				(e: Error) => this.handleError(e)
			);
	}

	testConnection() {
		console.log(Meteor.status());
		// console.log(this.ddp.status());
		// DDP.connect('http://192.168..20:3000').call('testConnection');
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