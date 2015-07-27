import React, { Component } from 'react';
import Marty from 'marty';
import AddGitHubUserForm from '../components/AddGitHubUserForm';
import Excerpt from '../components/Excerpt';
import Toolbar from '../components/Toolbar';

class HomePage extends Component {

	constructor(props, context) {
		super(props, context);
	}

    render() {
        let body;
        if (this.props.user.token != '') {
            body = <Excerpt excerpt={this.props.excerpt} />;
        } else {
            body = <Excerpt excerpt={this.props.exampleExcerpt} />;
        }
        return (
            <div className="main">
                <div className="primary">
                    { body }
                </div>
                <Toolbar />
            </div>
        );
    }
}

export default Marty.createContainer(HomePage, {
	listenTo: 'acrStore',

	fetch: {
		user() {
			return this.app.acrStore.user();
		},
		excerpt() {
			return this.app.acrStore.excerpt();
		},
		exampleExcerpt() {
			return this.app.acrStore.exampleExcerpt();
		}
	}
});
