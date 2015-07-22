import { handles, Store } from 'marty';
import { fromJS } from 'immutable';

import { ActionTypes, Interactions, Statuses } from '../constants';

export default class InteractionStore extends Store {
    constructor(options) {
        super(options);

        this.state = fromJS({
            errors: {},
            status: {}
        });

        this.handlers = {
			_setPending : ActionTypes.RECEIVE_INTERACTION_PENDING,
			_setStarted : ActionTypes.RECEIVE_INTERACTION_STARTED,
			_setFailed  : ActionTypes.RECEIVE_INTERACTION_FAILED,
			_setDone    : ActionTypes.RECEIVE_INTERACTION_DONE,
        };
    }

    _setPending(key) {
        this.state = this.state.withMutations(s => {
            s.deleteIn(['errors', key]);
            s.setIn(['status', key], Statuses.PENDING);
        });
    }

    _setStarted(key) {
        this.state = this.state.withMutations(s => {
            s.deleteIn(['errors', key]);
            s.setIn(['status', key], Statuses.STARTED);
        });
    }

    _setFailed(key, err) {
        this.state = this.state.withMutations(s => {
            s.setIn(['errors', key], err);
            s.setIn(['status', key], Statuses.FAILED);
        });
    }

    _setDone(key) {
        this.state = this.state.setIn(['status', key], Statuses.DONE);
    }

    getError(key) {
        return this.state.getIn(['errors', key]);
    }

    getStatus(key) {
        return this.state.getIn(['status', key], Statuses.PENDING);
    }
}
