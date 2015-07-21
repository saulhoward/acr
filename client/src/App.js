import { Application } from 'marty';

import interactionStore from './stores/InteractionStore';
import acrStore from './stores/acrStore';
import tokenActionCreators from './actions/tokenActionCreators';
import tokenSourceActionCreators from './actions/tokenSourceActionCreators';
import codeSourceActionCreators from './actions/codeSourceActionCreators';
import userSourceActionCreators from './actions/userSourceActionCreators';
import excerptActionCreators from './actions/excerptActionCreators';
import acrAPI from './sources/acrAPI';
import userStorage from './sources/userStorage';

export default class App extends Application {
    constructor(options) {
        super(options);

        this.register({
            core: {
                interactionStore
            },
            acrStore,
			tokenActionCreators,
			userSourceActionCreators,
			tokenSourceActionCreators,
			codeSourceActionCreators,
			excerptActionCreators,
			acrAPI,
			userStorage,
        });
    }
}
