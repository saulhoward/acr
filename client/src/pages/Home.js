import React, { Component } from 'react';
import Marty from 'marty';
import { Button, Grid, PageHeader, Input } from 'react-bootstrap';

import AddTokenForm from '../components/AddTokenForm';
import Code from '../components/Code';

class HomePage extends Component {

	constructor(props, context) {
		super(props, context);
	}

    render() {
        return (
            <Grid>
                <PageHeader>Home</PageHeader>
				<AddTokenForm />
				<Excerpt />
            </Grid>
        );
    }
}

export default Marty.createContainer(HomePage);
