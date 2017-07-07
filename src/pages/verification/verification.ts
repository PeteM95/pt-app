import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

import { User } from '../../services/user';

@IonicPage({
	name: 'verify-email',
	segment: 'verify-email/:token'
})
@Component({
	selector: 'verification',
	templateUrl: 'verification.html'
})
export class VerifyEmailPage implements OnInit{
	token: string;
	
	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				private alertCtrl: AlertController,
				private _user: User) {  }

	ngOnInit() {
		this.token = this.navParams.get('token');
		Observable.fromPromise(this._user.verifyEmail(this.token))
			.subscribe(
				() => console.log(this.token),
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