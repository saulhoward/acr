import uuid from 'uuid';

export default {
	createID() {
		return uuid.v1();
	}
};
