import { format } from 'util';
import { HttpStateSource } from 'marty';
HttpStateSource.removeHook('parseJSON');

export default class AcrHttpAPI extends HttpStateSource {

	addToken(token) {
		return this.put({
			body: token,
			url: format('/tokens/' + token.id)
		})
		.then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Failed to put token');
        });
	}

}
