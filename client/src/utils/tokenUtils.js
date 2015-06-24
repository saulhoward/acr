import uuid from 'uuid';
import _ from 'lodash';

export default {
	createToken(token) {
		return {
			token: token,
			id: uuid.v1(),
			created: new Date().toJSON()
		};
	}
};
