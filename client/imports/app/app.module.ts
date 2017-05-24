import { NgModule, ErrorHandler } from '@angular/core';
import { App } from './app.component';

@NgModule({
	declarations: [
		App
	],
	entryComponents: [
		MyApp
	],
	providers: [
		{ provide: ErrorHandler }
	]
})
export class AppModule {  }