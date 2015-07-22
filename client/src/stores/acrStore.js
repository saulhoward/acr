import { handles, Store } from 'marty';
import { Record, fromJS } from 'immutable';
import { ActionTypes } from '../constants';

const TokenRecord = Record({token:'', timestamp: ''})
const UserRecord = Record({id: '', username: ''})

export default class ACRStore extends Store {
    constructor(options) {
        super(options);

        this.state = {
            excerpts: fromJS([]),
        };
        this.state.token = new TokenRecord();

		this.handlers = {
			_addUser   : ActionTypes.RECEIVE_USER,
			_addUserID   : ActionTypes.RECEIVE_USER_ID,
			_addToken    : ActionTypes.RECEIVE_TOKEN,
			_addExcerpt  : ActionTypes.RECEIVE_EXCERPT,
			_nextExcerpt : ActionTypes.NEXT_EXCERPT,
		};
    }

	_addToken(token) {
        this.state.token = new TokenRecord(token);
		this.hasChanged();
	}

	_addUser(id, username) {
        this.state.user = new UserRecord({id, username});
		this.hasChanged();
	}

	_addUserID(id) {
        this.state.user = new UserRecord({id});
		this.hasChanged();
	}

	_addExcerpt(e) {
        this.state.excerpts = this.state.excerpts.push(e);
		this.hasChanged();
	}

    _nextExcerpt() {
        this.app.acrAPI.getNextExcerpt(this.state.user.id);
    }

	user() {
		return this.fetch({
			id: "user",
			locally() {
                if (this.state.user) {
                    return this.state.user;
                }
				return undefined;
			},
            remotely() {
                this.app.userStorage.getUser();
                return true;
            }
		})
	}

	userID() {
		return this.fetch({
			id: "userID",
            dependsOn: this.user(),
			locally() {
                if (this.state.user) {
                    return this.state.user.id;
                }
				return undefined;
			}
		})
	}

	token() {
		return this.fetch({
			id: "token",
            dependsOn: this.userID(),
			locally() {
				return this.state.token;
			}
		})
	}

	excerpt() {
		return this.fetch({
			id: "excerpt",
            dependsOn: this.token(),
			locally() {
                if (this.state.excerpts.size > 0) {
                    return this.state.excerpts.last();
                }
                return undefined;
			},
            remotely() {
                return this.app.acrAPI.getNextExcerpt(this.state.user.id);
            }
		})
	}
}
