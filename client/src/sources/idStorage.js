import { JSONStorageStateSource } from 'marty';

import userUtils from '../utils/userUtils';

export default class IDStorage extends JSONStorageStateSource {
    constructor(options) {
        super(options);
        this.namespace = 'acr';
    }

    createID() {
        const id = userUtils.createID();
        this.set('id', id);
    }

    getID() {
        this.app.idSourceActionCreators.receiveID(
            this.get('id')
        );
    }
}
