import { NgModule } from '@angular/core';
import { VerifyEmailPage } from './verification';
import { IonicPageModule } from 'ionic-angular';

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
