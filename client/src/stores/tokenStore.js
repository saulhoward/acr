import { handles, Store } from 'marty';
import { Record } from 'immutable';

import { ActionTypes } from '../constants';

const TokenRecord = Record({token:'', id: '', timestamp: ''})

export default class TokenStore extends Store {
    constructor(options) {
        super(options);
		this.state = new TokenRecord();

		this.handlers = {
			addToken: ActionTypes.TOKEN_ADD
		};
    }

	addToken(token) {
        this.state = new TokenRecord(token);
	}

    getToken() {
		return this.state.token;
    }
}
