import { handles, Store } from 'marty';
import { fromJS } from 'immutable';

import { ActionTypes } from '../constants';

export default class CodeStore extends Store {
    constructor(options) {
        super(options);

        this.state = fromJS({});
 
		this.handlers = {
			addToken: ActionTypes.TOKEN_ADD,
			_addExcerpt : ActionTypes.RECEIVE_EXCERPT,
		};
    }

	_addExcerpt(e) {
        this.state = this.state.withMutations(s => {
            s.setIn('excerpts', e);
        });
		this.hasChanged();
	}

	addToken(token) {
        this.state = new TokenRecord(token);
	}

    getToken() {
		return this.state.token;
    }

	excerpt() {
		return this.fetch({
			id: "excerpt",
			// dependsOn: this.system({}),
			locally() {
				return this.state.get('excerpts');
			},
			remotely() {
				return this.app.acrAPI.getNextExcerpt();
			}
		})
	}
}
