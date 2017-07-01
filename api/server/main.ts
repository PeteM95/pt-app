import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

var process: any;

Meteor.startup(() => {
	process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;

	Accounts.emailTemplates.siteName = "test";
	Accounts.emailTemplates.from = "Test <dingleberry@dupe-squad.biz>";
});
