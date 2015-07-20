import { createConstants } from 'marty';
import keyMirror from 'keymirror';

export default {
    ActionTypes: createConstants([
		'TOKEN_ADD',
		'TOKEN_ADD_SUCCESS',
		'TOKEN_ADD_ERROR',

		'RECEIVE_ID',
		'RECEIVE_TOKEN',
		'RECEIVE_EXCERPT',
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
