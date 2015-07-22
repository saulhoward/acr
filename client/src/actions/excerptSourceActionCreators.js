import { ActionCreators } from 'marty';
import { ActionTypes } from '../constants';

export default class CodeSourceActionCreators extends ActionCreators {
	receiveExcerpt(e) {
		this.dispatch(ActionTypes.RECEIVE_EXCERPT, e);
	}
}
