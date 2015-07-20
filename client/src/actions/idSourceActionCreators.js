import { ActionCreators } from 'marty';
import { ActionTypes } from '../constants';

export default class IDSourceActionCreators extends ActionCreators {
	receiveID(id) {
		this.dispatch(ActionTypes.RECEIVE_ID, id);
	}
}
