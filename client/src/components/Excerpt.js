import React, { Component, PropTypes } from 'react';
import Marty from 'marty';

export default class Excerpt extends Component {
    // static propTypes = {
    //     excerpt: PropTypes.string.isRequired
    // };

    render() {
        return (
            <div className="excerpt">
                <pre>
                    <code>
                    {this.props.excerpt.content}
                    </code>
                </pre>
            </div>
        );
    }
}

export default Marty.createContainer(Excerpt);
