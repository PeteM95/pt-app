import { Injectable } from '@angular/core';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable, Subject } from 'rxjs';

import { Profile } from 'api/models';

@Injectable()
export class User {
	_user: any;

	/*
	 * Takes Username and Password to log user in
	 */
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

	/*
	 * Log the user out, which forgets the session
	 */
	logout(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			Meteor.logout((e: Error) => {
				if (e) {
					reject(e);
				}

				resolve();
			});
		});
	}

	/*
	 * Process a login/signup response to store user data
	 */
	_loggedIn(resp) {
		this._user = resp.user;
	}

	sendEmailVerificationLink(): void  {
		MeteorObservable.call('sendVerificationLink').subscribe({
			next: () => {},
			error: (e: Error) => {}
		});
	}

	/*
	 * Creates user and, upon success, logs in
	 */
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
	 * Takes token from verification link and verifies user email,
	 * then logs user in
	 */
	verifyEmail(token: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			Accounts.verifyEmail(token, (e: Error) => {
				if (e) {
					return reject(e);
				}

				resolve();
			});
		});
	}
}