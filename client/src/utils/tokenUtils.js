export default {
	createToken(token) {
		return {
			token: token,
			created: new Date().toJSON()
		};
	}
};
