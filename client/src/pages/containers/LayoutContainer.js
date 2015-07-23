import React, { Component, PropTypes } from 'react';
import { RouteHandler } from 'react-router';
import { RouteNames } from '../../constants';

export default class LayoutContainer extends Component {
    static contextTypes = {
        router: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className="mui-container">
                <div className="mui-appbar">
                </div>
                <RouteHandler />
            </div>
        );
    }
}
