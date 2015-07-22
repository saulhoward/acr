import { format } from 'util';
import { HttpStateSource } from 'marty';
HttpStateSource.removeHook('parseJSON');

export default class AcrHttpAPI extends HttpStateSource {

	addToken(userID, token) {
		return this.put({
			body: token,
			url: format('/users/' + userID + '/tokens')
		})
		.then(res => {
            if (res.ok) {
                this.app.tokenSourceActionCreators.receiveToken(token);
            }
        });
	}

	getNextExcerpt(id) {
		return this.get({
			url: format('/users/' + id + '/excerpts')
		})
		.then(res => {
            if (res.ok) {
                return res.json().then(e => {
                    this.app.excerptSourceActionCreators.receiveExcerpt(e);
                });
            } else {
                if (res.status == 404)  {
                    return res.json().then(e => {
                        this.app.excerptSourceActionCreators.receiveExcerpt({});
                    });
                }
            }
        });
	}
}
