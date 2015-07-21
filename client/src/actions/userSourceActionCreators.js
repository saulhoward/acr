import { ActionCreators } from 'marty';
import { ActionTypes } from '../constants';

export default class UserSourceActionCreators extends ActionCreators {
	receiveUserID(id) {
		this.dispatch(ActionTypes.RECEIVE_USER_ID, id);
	}
}
