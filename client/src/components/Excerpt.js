import bind from 'lodash/function/bind';
import React, { Component, PropTypes } from 'react';
import Marty from 'marty';
import { Button, Input } from 'react-bootstrap';

export default class Excerpt extends Component {
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
				{this.props.excerpt}
				</code>
			</pre>
        );
    }
}

export default Marty.createContainer(Excerpt, {
	listenTo: 'codeStore',

	fetch: {
		excerpt() {
			return this.app.codeStore.excerpt();
		}
	}
});
