import { format } from 'util';
import { HttpStateSource } from 'marty';
HttpStateSource.removeHook('parseJSON');

export default class AcrHttpAPI extends HttpStateSource {

    addGitHubDetails(userID, username, token) {
        console.log('adding GH', userID, username, token);
        return this.put({
            body: { username: username, token: token.token },
            url: format('/users/' + userID + '/tokens')
        })
        .then(res => {
            if (res.ok) {
                this.app.userSourceActionCreators.receiveUsername(username);
                this.app.tokenSourceActionCreators.receiveToken(token);
            }
        });
    }

    getUser(id) {
        return this.get({
            url: format('/users/' + id)
        })
        .then(res => {
            if (res.ok) {
                return res.json().then(e => {
                    this.app.userSourceActionCreators.receiveUser(e);
                });
            } else {
                if (res.status == 404)  {
                    return res.json().then(e => {
                        this.app.userSourceActionCreators.receiveUser({});
                    });
                }
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

    getNextExampleExcerpt() {
        return this.get({
            url: format('/excerpts')
        })
        .then(res => {
            if (res.ok) {
                return res.json().then(e => {
                    this.app.excerptSourceActionCreators.receiveExampleExcerpt(e);
                });
            } else {
                if (res.status == 404)  {
                    return res.json().then(e => {
                        this.app.excerptSourceActionCreators.receiveExampleExcerpt({});
                    });
                }
            }
        });
    }
}
