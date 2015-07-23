import { ActionCreators } from 'marty';
import { ActionTypes } from '../constants';

import tokenUtils from '../utils/tokenUtils';

export default class TokenActionCreators extends ActionCreators {

	addGitHubDetails(userID, username, tokenStr) {
		const token = tokenUtils.createToken(tokenStr);
        this.dispatch(ActionTypes.RECEIVE_INTERACTION_STARTED, 'addToken');

		this.app.acrAPI.addGitHubDetails(userID, username, token)
			.then(res => {
				this.dispatch(ActionTypes.RECEIVE_INTERACTION_DONE, 'addToken');
			})
			.catch(err => {
				this.dispatch(ActionTypes.RECEIVE_INTERACTION_FAILED, 'addToken', err);
			});
	}
}
