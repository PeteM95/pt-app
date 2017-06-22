import { Component, AfterViewInit, Renderer2, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

declare var Panda: any;

@Component({
	selector: 'setup-donation',
	templateUrl: 'donation.html'
})
export class DonationSetup implements AfterViewInit {
	amount: number;
	ein: string;

	@ViewChild('fn') fn: any;
	@ViewChild('ln') ln: any;
	@ViewChild('cc') cc: any;
	@ViewChild('ex') ex: any;
	@ViewChild('cv') cv: any;
	
	constructor(public navCtrl: NavController,
				public platform: Platform,
				private _navParams: NavParams,
				private _renderer: Renderer2) {
		this.amount = _navParams.get('amount')*100;
		this.ein = _navParams.get('ein');
	}

	ngAfterViewInit() {
		this._renderer.setAttribute(this.fn._elementRef.nativeElement.children[0], 'data-panda', 'first_name');
		this._renderer.setAttribute(this.ln._elementRef.nativeElement.children[0], 'data-panda', 'last_name');
		this._renderer.setAttribute(this.cc._elementRef.nativeElement.children[0], 'data-panda', 'credit_card');
		this._renderer.setAttribute(this.ex._elementRef.nativeElement.children[0], 'data-panda', 'expiration');
		this._renderer.setAttribute(this.cv._elementRef.nativeElement.children[0], 'data-panda', 'cvv');
		console.log(this.fn);

		Panda.init('pk_test_2EwxquXI7I8AXVMmKj3Q-Q', 'panda_cc_form');
		Panda.on('success', (cardToken) => {
			console.log(cardToken);
		});
		Panda.on('error', (errors) => {
			console.log(errors);
		});
	}
}