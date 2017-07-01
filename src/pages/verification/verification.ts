import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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
	
	constructor(public navCtrl: NavController) {  }

	ngOnInit() {
		console.log(this.token);
	}

}