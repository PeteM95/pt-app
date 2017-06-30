import { Injectable } from '@angular/core';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Observable, Subject } from 'rxjs';

import { Profile } from 'api/models';

@Injectable()
export class User {
	_user: any;

	login(user: Profile): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			Meteor.loginWithPassword(user.username, user.password, (e: Error) => {
				if (e) {
					return reject(e);
				}

				resolve();
			});
		});
	}

	signup(user: Profile): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			Accounts.createUser(user, (e: Error) => {
				if (e) {
					return reject(e);
				}

				resolve();
			});
		});
	}

	/*
	 * Log the user out, which forgets the session
	 */
	logout() {
		this._user = null;
	}

	/*
	 * Process a login/signup response to store user data
	 */
	_loggedIn(resp) {
		this._user = resp.user;
	}
}