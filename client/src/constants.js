import { createConstants } from 'marty';
import keyMirror from 'keymirror';

export default {
    ActionTypes: createConstants([
		'RECEIVE_USER_ID',
		'RECEIVE_TOKEN',
		'RECEIVE_USERNAME',
		'RECEIVE_USER',
		'RECEIVE_EXCERPT',
		'RECEIVE_EXAMPLE_EXCERPT',

        'NEXT_EXCERPT',

        'RECEIVE_INTERACTION_PENDING',
        'RECEIVE_INTERACTION_STARTED',
        'RECEIVE_INTERACTION_FAILED',
        'RECEIVE_INTERACTION_DONE',
	]),

    RouteNames: keyMirror({
        HOME: null
    }),

    Interactions: {},

    Statuses: keyMirror({
        PENDING: null,
        STARTED: null,
        FAILED: null,
        DONE: null
    })
};
