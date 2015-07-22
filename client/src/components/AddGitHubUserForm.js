import bind from 'lodash/function/bind';
import React, { Component, PropTypes } from 'react';
import Marty from 'marty';
import { Button, Input } from 'react-bootstrap';

import TokenActionCreators from '../actions/tokenActionCreators';

export default class AddGitHubUserForm extends Component {
    static propTypes = {
        token: PropTypes.object.isRequired
    };

	constructor(props, context) {
		super(props, context);
		this.updateToken = bind(this.updateToken, this);
		this.addToken = bind(this.addToken, this);

		this.state = {
			username: this.props.user.username,
			token: this.props.token.token,
			submitDisabled: true,
		};
	}

    render() {
        return (
			<form>
				<Input
					ref="username"
					name="username"
					value={this.state.username}
					onChange={this.updateUsername}
					placeholder="GHUsername"
					type="text"
				/>
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

    submitDisabled() {
		const token = this.refs['token'].getValue();
		const username = this.refs['username'].getValue();
        return (token.trim() !== '') && (username.trim() !== '')  ? false : true;
    }

	updateUsername(e) {
		const username = this.refs['username'].getValue();
		this.setState({
			username: username,
			submitDisabled: this.submitDisabled(),
		});
	}

	updateToken(e) {
		const token = this.refs['token'].getValue();
		this.setState({
			token: token,
			submitDisabled: this.submitDisabled(),
		});
	}

	addToken(e) {
		e.stopPropagation();
		e.preventDefault();
		if (this.state.token.trim() !== "") {
			this.app.tokenActionCreators.addToken(this.props.userID, this.state.token);
		}
	}
}

export default Marty.createContainer(AddTokenForm, {
	listenTo: 'acrStore',

    fetch: {
        token() {
            return this.app.acrStore.token();
        },
        userID() {
            return this.app.acrStore.userID();
        },
        user() {
            return this.app.acrStore.user();
        }
    }
});
