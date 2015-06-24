import { createConstants } from 'marty';
import keyMirror from 'keymirror';

export default {
    ActionTypes: createConstants([
		'RECEIVE_TOKEN',
		'TOKEN_ADD',
		'TOKEN_ADD_SUCCESS',
		'TOKEN_ADD_ERROR',
	]),

    RouteNames: keyMirror({
        HOME: null
    }),

    Interactions: {},

    Status: keyMirror({
        PENDING: null,
        STARTED: null,
        FAILED: null,
        DONE: null
    })
};
