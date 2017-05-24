import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { App } from './app.component';

@NgModule({
	declarations: [
		App
	],
	imports: [
		IonicModule.forRoot(App),
	],
	bootstrap: [IonicApp],
	entryComponents: [
		App
	],
	providers: [
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule {  }