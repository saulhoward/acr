import { Application } from 'marty';

import interactionStore from './stores/InteractionStore';
import interactionSourceActionCreators from './actions/interactionSourceActionCreators';
import userSourceActionCreators from './actions/userSourceActionCreators';
import tokenActionCreators from './actions/tokenActionCreators';
import tokenSourceActionCreators from './actions/tokenSourceActionCreators';
import excerptSourceActionCreators from './actions/excerptSourceActionCreators';
import excerptActionCreators from './actions/excerptActionCreators';
import acrAPI from './sources/acrAPI';
import acrStore from './stores/acrStore';
import userStorage from './sources/userStorage';

export default class App extends Application {
    constructor(options) {
        super(options);

        this.register({
            core: {
                interactionStore
            },
			interactionSourceActionCreators,
			userSourceActionCreators,
			tokenActionCreators,
			tokenSourceActionCreators,
			excerptSourceActionCreators,
			excerptActionCreators,
			acrAPI,
            acrStore,
			userStorage,
        });
    }
}
