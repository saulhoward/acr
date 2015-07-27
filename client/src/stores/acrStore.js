import assign from 'lodash/object/assign';
import { handles, Store } from 'marty';
import { Record, fromJS } from 'immutable';
import { ActionTypes } from '../constants';

const UserRecord = Record({id:'', username:'', token:'', timestamp: ''})

export default class ACRStore extends Store {
    constructor(options) {
        super(options);

        this.state = {
            excerpts: fromJS([]),
            exampleExcerpts: fromJS([]),
        };
        this.state.user = new UserRecord();

        this.handlers = {
            _addUserID   : ActionTypes.RECEIVE_USER_ID,
            _addUsername : ActionTypes.RECEIVE_USERNAME,
            _addUser     : ActionTypes.RECEIVE_USER,
            _addToken    : ActionTypes.RECEIVE_TOKEN,
            _addExcerpt  : ActionTypes.RECEIVE_EXCERPT,
            _addExampleExcerpt  : ActionTypes.RECEIVE_EXAMPLE_EXCERPT,
            _nextExcerpt : ActionTypes.NEXT_EXCERPT,
        };
    }

    _addToken(token) {
        this.state.user = new UserRecord(
            assign(this.state.user.toJS(), {token: token.token})
        );
        this.hasChanged();
    }

    _addUser(user) {
        this.state.user = new UserRecord(
            assign(this.state.user.toJS(), user)
        );
        this.hasChanged();
    }

    _addUsername(username) {
        this.state.user = new UserRecord(
            assign(this.state.user.toJS(), {username})
        );
        this.hasChanged();
    }

    _addUserID(id) {
        this.state.user = new UserRecord(
            assign(this.state.user.toJS(), {id})
        );
        this.hasChanged();
    }

    _addExcerpt(e) {
        this.state.excerpts = this.state.excerpts.push(e);
        this.hasChanged();
    }

    _addExampleExcerpt(e) {
        this.state.exampleExcerpts = this.state.exampleExcerpts.push(e);
        this.hasChanged();
    }

    _nextExcerpt() {
        if (this.state.user.username != '') {
            this.app.acrAPI.getNextExcerpt(this.state.user.id);
        } else {
            this.app.acrAPI.getNextExampleExcerpt();
        }
    }

    userID() {
        return this.fetch({
            id: "userID",
            locally() {
                if (this.state.user.id != '') {
                    return this.state.user.id;
                }
                return undefined;
            },
            remotely() {
                this.app.userStorage.getUserID();
                this.app.acrAPI.getUser(this.state.user.id);
                return true;
            }
        })
    }

    user() {
        return this.fetch({
            id: "user",
            dependsOn: this.userID(),
            locally() {
                return this.state.user;
            }
        })
    }

    token() {
        return this.fetch({
            id: "token",
            dependsOn: this.userID(),
            locally() {
                return this.state.user.token;
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

    exampleExcerpt() {
        return this.fetch({
            id: "exampleExcerpt",
            locally() {
                if (this.state.exampleExcerpts.size > 0) {
                    return this.state.exampleExcerpts.last();
                }
                return undefined;
            },
            remotely() {
                return this.app.acrAPI.getNextExampleExcerpt();
            }
        })
    }
}
