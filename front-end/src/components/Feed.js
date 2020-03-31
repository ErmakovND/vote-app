import React from 'react';
import {connect} from 'react-redux';

import Spinner from 'react-bootstrap/Spinner';

import Poll from "./Poll";

class Feed extends React.Component {
    render() {
        const {content, own} = this.props;
        if (content.service.loading) {
            return (
                <Spinner animation="border" variant="primary" />
            )
        }
        const feed = own ? content.feed.own : content.feed.all;
        return (
            <React.Fragment>
                {feed.map(poll => (
                    <Poll poll={poll} />
                ))}
            </React.Fragment>
        )
    }
}

const mapStateToProps = store => {
    return {
        content: store.content
    }
};

export default connect(
    mapStateToProps
)(Feed);