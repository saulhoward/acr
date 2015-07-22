import React, { Component } from 'react';
import Marty from 'marty';
import { Button, Grid, PageHeader, Input } from 'react-bootstrap';

import AddGitHubUserForm from '../components/AddGitHubUserForm';
import Excerpt from '../components/Excerpt';

class HomePage extends Component {

	constructor(props, context) {
		super(props, context);
	}

    render() {
        let body;
        if (this.props.token.token != '') {
            body = <Excerpt />;
        }
        return (
            <Grid>
                <PageHeader>Home</PageHeader>
				<AddGitHubUserForm />
                { body }
            </Grid>
        );
    }
}

export default Marty.createContainer(HomePage, {
	listenTo: 'acrStore',

	fetch: {
		token() {
			return this.app.acrStore.token();
		}
	}
});
