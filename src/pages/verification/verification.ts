import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
				public navParams: NavParams) {  }

	ngOnInit() {
		console.log(this.navParams.get('token'));
	}

}