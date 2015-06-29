import bind from 'lodash/function/bind';
import React, { Component, PropTypes } from 'react';
import Marty from 'marty';
import { Button, Input } from 'react-bootstrap';

import CodeStore from '../stores/codeStore';
import CodeActionCreators from '../actions/codeActionCreators';

export default class Code extends Component {
    static propTypes = {
        code: PropTypes.string.isRequired
    };

	constructor(props, context) {
		super(props, context);
	}

    render() {
        return (
			<pre>
				<code>
				{this.props.code}
				</code>
			</pre>
        );
    }
}

export default Marty.createContainer(AddTokenForm, {
	listenTo: 'codeStore',

	fetch: {
		token() {
			return this.app.codeStore.getCode();
		}
	}
});
