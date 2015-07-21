import { ActionCreators } from 'marty';
import { ActionTypes } from '../constants';

export default class TokenSourceActionCreators extends ActionCreators {
	receiveToken(t) {
		this.dispatch(ActionTypes.RECEIVE_TOKEN, t);
	}
}
