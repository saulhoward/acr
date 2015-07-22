import { ActionCreators } from 'marty';
import { ActionTypes } from '../constants';

export default class InteractionSourceActionCreators extends ActionCreators {
	receivePending(key) {
		this.dispatch(ActionTypes.RECEIVE_INTERACTION_PENDING, key);
	}

	receiveStarted(key) {
		this.dispatch(ActionTypes.RECEIVE_INTERACTION_STARTED, key);
	}

	receiveFailed(key, err) {
		this.dispatch(ActionTypes.RECEIVE_INTERACTION_FAILED, key, err);
	}

	receiveDone(key) {
		this.dispatch(ActionTypes.RECEIVE_INTERACTION_DONE, key);
	}
}
