import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { App } from './app.component';
import { MapsComponent } from '../pages/maps/maps';

@NgModule({
	declarations: [
		App,
		MapsComponent
	],
	imports: [
		IonicModule.forRoot(App),
	],
	bootstrap: [IonicApp],
	entryComponents: [
		App,
		MapsComponent
	],
	providers: [
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule {  }