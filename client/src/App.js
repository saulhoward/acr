import { Application } from 'marty';

import interactionStore from './stores/InteractionStore';
import tokenStore from './stores/tokenStore';
import codeStore from './stores/codeStore';
import tokenActionCreators from './actions/tokenActionCreators';
import idSourceActionCreators from './actions/idSourceActionCreators';
import acrAPI from './sources/acrAPI';
import idStorage from './sources/idStorage';

export default class App extends Application {
    constructor(options) {
        super(options);

        this.register({
            core: {
                interactionStore
            },
			tokenStore,
            codeStore,
			tokenActionCreators,
			idSourceActionCreators,
			acrAPI,
			idStorage,
        });
    }
}
