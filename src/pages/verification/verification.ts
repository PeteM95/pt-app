import { Component, NgModule, OnInit } from '@angular/core';
import { IonicPageModule, IonicPage, NavController } from 'ionic-angular';

@NgModule({
	declarations: [
		VerifyEmailPage
	],
	imports: [
		IonicPageModule.forChild(VerifyEmailPage)
	],
	entryComponents: [
		VerifyEmailPage
	]
})
export class VerificationModule {  }

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