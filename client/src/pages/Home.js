import React, { Component } from 'react';
import Marty from 'marty';
import { Button, Grid, PageHeader, Input } from 'react-bootstrap';

import AddTokenForm from '../components/AddTokenForm';

class HomePage extends Component {

	constructor(props, context) {
		super(props, context);
	}

    render() {
        return (
            <Grid>
                <PageHeader>Home</PageHeader>
				<AddTokenForm />
            </Grid>
        );
    }
}

export default Marty.createContainer(HomePage);
