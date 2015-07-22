import { ActionCreators } from 'marty';
import { ActionTypes } from '../constants';

import tokenUtils from '../utils/tokenUtils';

export default class TokenActionCreators extends ActionCreators {

	addToken(userID, tokenStr) {
		const token = tokenUtils.createToken(tokenStr);
        this.dispatch(ActionTypes.RECEIVE_INTERACTION_STARTED, 'addToken');

		this.app.acrAPI.addToken(userID, token)
			.then(res => {
				this.dispatch(ActionTypes.RECEIVE_INTERACTION_DONE, 'addToken');
			})
			.catch(err => {
				this.dispatch(ActionTypes.RECEIVE_INTERACTION_FAILED, 'addToken', err);
			});
	}
}
