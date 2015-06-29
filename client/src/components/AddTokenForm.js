import bind from 'lodash/function/bind';
import React, { Component, PropTypes } from 'react';
import Marty from 'marty';
import { Button, Input } from 'react-bootstrap';

import TokenStore from '../stores/tokenStore';
import TokenActionCreators from '../actions/tokenActionCreators';

export default class AddTokenForm extends Component {
    static propTypes = {
        token: PropTypes.string.isRequired
    };

	constructor(props, context) {
		super(props, context);
		this.updateToken = bind(this.updateToken, this);
		this.addToken = bind(this.addToken, this);

		this.state = {
			token: this.props.token,
			submitDisabled: true,
		};
	}

    render() {
        return (
			<form>
				<Input
					ref="token"
					name="token"
					value={this.state.token}
					onChange={this.updateToken}
					placeholder="GHToken"
					type="text"
				/>
				<Button
					disabled={this.state.submitDisabled}
					onClick={this.addToken}
					bsStyle="primary"
				>
					Add token
				</Button>
			</form>
        );
    }

	updateToken(e) {
		const token = this.refs['token'].getValue();
		this.setState({
			token: token,
			submitDisabled: token.trim() !== '' ? false : true
		});
	}

	addToken(e) {
		e.stopPropagation();
		e.preventDefault();
		if (this.state.token.trim() !== "") {
			this.app.tokenActionCreators.addToken(this.state.token);
		}
	}
}

export default Marty.createContainer(AddTokenForm, {
	listenTo: 'tokenStore',

	fetch: {
		token() {
			return this.app.tokenStore.getToken();
		}
	}
});
