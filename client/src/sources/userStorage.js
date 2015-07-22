import { JSONStorageStateSource } from 'marty';
import userUtils from '../utils/userUtils';

export default class UserStorage extends JSONStorageStateSource {
    constructor(options) {
        super(options);
        this.namespace = 'user';
    }

    createUserID() {
        const id = userUtils.createID();
        this.set('id', id);
    }

    getUserID() {
        const id = this.get('id');
        if (!id) {
            this.createUserID();
        }
        this.app.userSourceActionCreators.receiveUserID(this.get('id'));
    }

    getUserID() {
        const id = this.get('id');
        if (!id) {
            this.createUserID();
        }
        this.app.userSourceActionCreators.receiveUserID(this.get('id'));
    }

}
