import { check, Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

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
	}
});