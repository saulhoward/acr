import { ActionCreators } from 'marty';
import { ActionTypes } from '../constants';

export default class CodeSourceActionCreators extends ActionCreators {
	receiveExcerpt(e) {
		this.dispatch(ActionTypes.RECEIVE_EXCERPT, e);
	}

	receiveExampleExcerpt(e) {
		this.dispatch(ActionTypes.RECEIVE_EXAMPLE_EXCERPT, e);
	}
}
