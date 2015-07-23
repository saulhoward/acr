import React, { Component } from 'react';
import Marty from 'marty';
import AddGitHubUserForm from '../components/AddGitHubUserForm';
import Excerpt from '../components/Excerpt';

class HomePage extends Component {

	constructor(props, context) {
		super(props, context);
	}

    render() {
        let body;
        if (this.props.user.token != '') {
            body = <Excerpt />;
        }
        return (
            <div className="mui-panel">
                <AddGitHubUserForm />
                { body }
            </div>
        );
    }
}

export default Marty.createContainer(HomePage, {
	listenTo: 'acrStore',

	fetch: {
		user() {
			return this.app.acrStore.user();
		}
	}
});
