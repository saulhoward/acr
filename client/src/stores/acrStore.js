import { handles, Store } from 'marty';
import { fromJS } from 'immutable';
import { ActionTypes } from '../constants';

const TokenRecord = Record({token:'', timestamp: ''})
const IDRecord = Record({id: ''})

export default class ACRStore extends Store {
    constructor(options) {
        super(options);

        this.state = {};
        // this.state.record = new TokenRecord();
        // this.state.id = new IDRecord();

		this.handlers = {
			_addID      : ActionTypes.RECEIVE_ID,
			_addToken   : ActionTypes.RECEIVE_TOKEN,
			_addExcerpt : ActionTypes.RECEIVE_EXCERPT,
		};
    }

	_addToken(token) {
        this.state.token = new TokenRecord(token);
	}

	_addID(id) {
        this.state.id = new IDRecord(id);
	}

	_addExcerpt(e) {
        this.state = this.state.withMutations(s => {
            s.setIn('excerpts', e);
        });
		this.hasChanged();
	}

	id() {
		return this.fetch({
			id: "id",
			locally() {
				return this.state.id;
			}
            remotely() {
                return this.app.idStorage.getID();
            }
		})
	}

	token() {
		return this.fetch({
			id: "token",
            dependsOn: this.id(),
			locally() {
				return this.state.token;
			}
		})
	}

	systems() {
		return this.fetch({
			id: "systems",
			dependsOn: this.project({}),
			locally() {
				return this.state.get('systems');
			},
			remotely() {
				const project = this.state.get('project').toJS();
				return this.app.phsAPI.fetchDataSource(
					ActionTypes.RECEIVE_PROJECT_SYSTEMS,
					{
						owner: project.organization,
						project: project.name,
						path: 'all-systems' 
					}
				);
			}
		})
	}

	projectStats() {
		return this.fetch({
			id: "projectStats",
			dependsOn: this.project({}),
			locally() {
				return this.state.get('stats');
			},
			remotely() {
				const project = this.state.get('project').toJS();
				return this.app.systemAPI.fetchStatsForProject(
					project.organization, project.name
				);
			}
		})
	}

	systemLocations() {
		return this.fetch({
			id: "systemLocations",
			dependsOn: this.project({}),
			locally() {
				return this.state.get('systemLocations');
			},
			remotely() {
				const project = this.state.get('project').toJS();
				return this.app.phsAPI.fetchDataSource(
					ActionTypes.RECEIVE_PROJECT_SYSTEM_LOCATIONS,
					{
						owner: project.organization,
						project: project.name,
						path: 'location' 
					}
				);
			}
		})
	}
}
