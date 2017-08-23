import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

declare var process: any;

Meteor.startup(() => {
	Accounts.onCreateUser((options, user) => {
		console.log('onCreateUser');

		return user;
	});
	// Deny all client-side updates to user documents
	Meteor.users.deny({
		update() {return true;}
	});

	process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;

	Accounts.emailTemplates.siteName = "test";
	Accounts.emailTemplates.from = "Test <dingleberry@dupe-squad.biz>";

	Accounts.urls.verifyEmail = (token) => {
		return `http://localhost:8100/#/nav/n4/verify-email/${token}`;
	}

	Accounts.emailTemplates.verifyEmail = {
		subject: (user) => {
			return `Hello ${user}, please verify your email`;
		},
		text: (user, url: string) => {
			// let splitUrl = url.split('#/');
			// let newUrl = `${splitUrl[0]}#/nav/n4/${splitUrl[1]}`;
			return `Hello ${user}, please verify your email by clicking on the following link: \n${url}`;
		}
	};
});