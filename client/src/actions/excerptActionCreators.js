import { ActionCreators } from 'marty';
import { ActionTypes } from '../constants';

export default class ExcerptActionCreators extends ActionCreators {
    nextExcerpt() {
		this.dispatch(ActionTypes.NEXT_EXCERPT);
    }
}
