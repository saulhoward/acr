import { ActionCreators } from 'marty';
import { ActionTypes } from '../constants';

import tokenUtils from '../utils/tokenUtils';

export default class TokenActionCreators extends ActionCreators {

	addToken(tokenStr) {
		const token = tokenUtils.createToken(tokenStr);
		this.dispatch(ActionTypes.TOKEN_ADD, token);

		this.app.acrAPI.addToken(token)
			.then(res => {
				console.log('success', res);
				this.dispatch(ActionTypes.TOKEN_ADD_SUCCESS, res);
			})
			.catch(err => {
				console.log('an error', err);
				this.dispatch(ActionTypes.TOKEN_ADD_ERROR, err);
			});
	}
}
