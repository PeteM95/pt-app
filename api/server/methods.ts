import { check, Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { LatLng } from '@ionic-native/google-maps';

import { Users } from './collections/users';

const nonEmptyString = Match.Where((str) => {
  check(str, String);
  return str.length > 0;
});

Meteor.methods({
	sendVerificationLink(): void {
		let userId = Meteor.userId();

		if (!userId) {
			throw new Meteor.Error('unauthorized', 'User must be logged-in to create a new chat');
		}

		Accounts.sendVerificationEmail(userId);
	},

	updateGymLocation( name: string, position: LatLng ): any {
		let userId = Meteor.userId();

		if (!userId) {
			throw new Meteor.Error('unauthorized', 'User must be logged-in to create a new chat');
		}

		const gymName = name;
		const gymPosition = {
			lat: position.lat,
			lng: position.lng
		};

		return Users.collection.update({_id: userId}, {$set: {
			"gymName": gymName,
			"gymLocation": gymPosition
		}});
	}
});