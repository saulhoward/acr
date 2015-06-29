import { handles, Store } from 'marty';
import { fromJS } from 'immutable';

import { ActionTypes } from '../constants';

export default class CodeStore extends Store {
    constructor(options) {
        super(options);

        this.state = fromJS({
            codes: {},
        });
 
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
