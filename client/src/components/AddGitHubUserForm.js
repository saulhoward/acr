import bind from 'lodash/function/bind';
import React, { Component, PropTypes } from 'react';
import Marty from 'marty';
import TokenActionCreators from '../actions/tokenActionCreators';
import { is } from 'immutable';

export default class AddGitHubUserForm extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    };

	constructor(props, context) {
		super(props, context);
		this.updateToken = bind(this.updateToken, this);
		this.updateUsername = bind(this.updateUsername, this);
		this.addToken = bind(this.addToken, this);

		this.state = {
			username: this.props.user.username,
			token: this.props.user.token,
			submitDisabled: true,
		};
	}

    componentWillReceiveProps(nextProps) {
        if (!is(nextProps.user, this.props.user)) {
            this.setState({
                'username': nextProps.user.username,
                'token': nextProps.user.token
            });
        }
    }

    render() {
        return (
			<form>
                <div className="mui-form-group">
                    <input
                        className="mui-form-control" 
                        ref="username"
                        name="username"
                        value={this.state.username}
                        onChange={this.updateUsername}
                        placeholder="GHUsername"
                        type="text"
                    />
                </div>
                <div className="mui-form-group">
                    <input
                        className="mui-form-control" 
                        ref="token"
                        name="token"
                        value={this.state.token}
                        onChange={this.updateToken}
                        placeholder="GHToken"
                        type="text"
                    />
                </div>
				<button
                    className="mui-btn mui-btn-primary mui-btn-raised"
					disabled={this.state.submitDisabled}
					onClick={this.addToken}
					bsStyle="primary"
				>
					Add token
				</button>
			</form>
        );
    }

    submitDisabled() {
		const token = this.refs['token'].getDOMNode().value;
		const username = this.refs['username'].getDOMNode().value;
        return (token.trim() !== '') && (username.trim() !== '')  ? false : true;
    }

	updateUsername(e) {
		const username = this.refs['username'].getDOMNode().value;
		this.setState({
			username: username,
			submitDisabled: this.submitDisabled(),
		});
	}

	updateToken(e) {
		const token = this.refs['token'].getDOMNode().value;
		this.setState({
			token: token,
			submitDisabled: this.submitDisabled(),
		});
	}

	addToken(e) {
		e.stopPropagation();
		e.preventDefault();
		if (this.state.token.trim() !== "") {
			this.app.tokenActionCreators.addGitHubDetails(this.props.user.id, this.state.username, this.state.token);
		}
	}
}

export default Marty.createContainer(AddGitHubUserForm, {
	listenTo: 'acrStore',
    fetch: {
        user() {
            return this.app.acrStore.user();
        }
    }
});
