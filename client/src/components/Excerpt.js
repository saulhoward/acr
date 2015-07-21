import bind from 'lodash/function/bind';
import React, { Component, PropTypes } from 'react';
import Marty from 'marty';
import { Button, Input } from 'react-bootstrap';

export default class Excerpt extends Component {
    // static propTypes = {
    //     excerpt: PropTypes.string.isRequired
    // };

	constructor(props, context) {
		super(props, context);
		this.nextExcerpt = bind(this.nextExcerpt, this);
        this.state = {
            timer: 0
        };
	}

    componentDidMount() {
        this.timer = setInterval(this.nextExcerpt, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div>
                <pre>
                    <code>
                    {this.props.excerpt.content}
                    </code>
                </pre>
                <button onClick={this.nextExcerpt}>Next</button>
            </div>
        );
    }

    nextExcerpt(e) {
        if (e) {
            e.preventDefault();
        }
        this.app.excerptActionCreators.nextExcerpt();
    }
}

export default Marty.createContainer(Excerpt, {
	listenTo: 'acrStore',

	fetch: {
		excerpt() {
			return this.app.acrStore.excerpt();
		}
	}
});
