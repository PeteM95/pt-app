import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { NavController, ViewController, Searchbar } from 'ionic-angular';
import { MapsAPILoader } from '@agm/core';


@Component({
	selector: 'gym-autocomplete',
	templateUrl: 'autocomplete.html'
})
export class AutocompletePage implements OnInit {
	autocompleteItems: Array<any>;
	autocomplete = { query: '' };
	places: any;
	service: any;

	@ViewChild('searchbar') searchbar: Searchbar;

	constructor(public navCtrl: NavController,
				public viewCtrl: ViewController,
				private _zone: NgZone,
				private _mapsAPILoader: MapsAPILoader) {
	}

	ngOnInit(): void {
		this._mapsAPILoader.load().then(() => {
			this.places = new google.maps.places.AutocompleteService();
		});
	}

	ionViewDidLoad() {
		// Autofocus on searchbar
		setTimeout(() => {
			this.searchbar.setFocus();
		}, 200);
	}

	dismiss(): void {
		this.viewCtrl.dismiss();
	}

	chooseItem(item: any): void {
		this.viewCtrl.dismiss(item);
	}

	updateSearch() {
		if (this.autocomplete.query == '') {
			this.autocompleteItems = [];
			return;
		}

		// TODO: change to observable
		this.places.getPlacePredictions({ input: this.autocomplete.query },
			(predictions: Array<google.maps.places.AutocompletePrediction>, status) => {
				this.autocompleteItems = [];
				this._zone.run(() => {
					predictions.forEach((prediction) => {
						this.autocompleteItems.push(prediction);
					});
				});
			}
		);
	}
}