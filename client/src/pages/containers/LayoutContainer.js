import bind from 'lodash/function/bind';
import React, { Component, PropTypes } from 'react';
import { RouteHandler } from 'react-router';
import { RouteNames } from '../../constants';

import AddGitHubUserForm from '../../components/AddGitHubUserForm';

export default class LayoutContainer extends Component {
    static contextTypes = {
        router: PropTypes.func.isRequired
    };

    constructor(props, context) {
		super(props, context);
		this.clickOverlay = bind(this.clickOverlay, this);
		this.toggleSettings = bind(this.toggleSettings, this);
        this.state = {
            settings: false
        };
    }

    render() {
        let modal;
        if (this.state.settings) {
            modal = (
                <div className="mui-overlay" onClick={this.clickOverlay}>
                    <div className="settings-modal">
                        <AddGitHubUserForm />
                        <button className="mui-btn mui-btn-default" onClick={this.toggleSettings}>Close</button>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="mui-container-fluid container">
                    <div className="mui-appbar">
                        <span onClick={this.toggleSettings}>Settings</span>
                    </div>
                    <RouteHandler />
                    <footer>
                        <p>acr</p>
                    </footer>
                </div>
                { modal }
            </div>
        );
    }

    clickOverlay(e) {
        e.preventDefault();
        const cls = event.target.classList[0];
        if (cls == 'mui-overlay') {
            this.toggleSettings(e);
        }
    }

    toggleSettings(e) {
        e.preventDefault();
        this.setState({
            settings: !this.state.settings
        });
    }
}
