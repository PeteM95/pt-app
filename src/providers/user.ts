import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class User {
	_user: any;

	login(accountInfo: any): Observable<string> {
		const login: Observable<string> = Observable.of(`logging in as ${accountInfo}`);
		return login;
	}

	signup(accountInfo: any): Observable<string> {
		const signup: Observable<string> = Observable.of(`signing up as ${accountInfo}`);
		return signup;
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