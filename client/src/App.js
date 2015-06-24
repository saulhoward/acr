import { Application } from 'marty';

import interactionStore from './stores/InteractionStore';
import tokenStore from './stores/tokenStore';
import tokenActionCreators from './actions/tokenActionCreators';
import acrAPI from './sources/acrAPI';

export default class App extends Application {
    constructor(options) {
        super(options);

        this.register({
            core: {
                interactionStore
            },
			tokenStore,
			tokenActionCreators,
			acrAPI,
        });
    }
}
