import React from 'react';
import {connect} from 'react-redux';

import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';

import {vote} from "../store/actions/feed";

class Poll extends React.Component {
    constructor(props) {
        super(props);
        const {poll} = props;
        this.state = {
            choice: poll.user_choice
        };
    }

    handleVote = (e) => {
        const {poll} = this.props;
        this.props.vote(poll.id, this.state.choice);
    };

    handleChoiceChange = (e) => {
        this.setState({choice: e.target.id});
    };

    render() {
        const {poll} = this.props;
        const votesTotal = poll.choices.reduce((acc, cur) => (acc + cur.votes), 0);
        const voted = poll.user_choice !== -1;
        return (
            <Card key={poll.id} className="mb-3">
                <Card.Header>
                    <Card.Subtitle>{poll.owner_name}</Card.Subtitle>
                    <Badge variant='primary'>{poll.owner_name}</Badge>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{poll.question_text}</Card.Title>
                    <Form>
                        {poll.choices.map(
                            option => (
                                <React.Fragment key={option.id}>
                                    <FormCheck
                                        custom
                                        disabled={voted}
                                        type='radio'
                                        name={poll.id}
                                        id={option.id}
                                        label={option.choice_text}
                                        onChange={this.handleChoiceChange}
                                    />
                                    {voted ?
                                        <ProgressBar
                                            max={votesTotal}
                                            now={option.votes}
                                            label={`${option.votes*100/votesTotal}%`}
                                        /> : null}
                                </React.Fragment>
                            ))}
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <Button
                        variant='primary'
                        disabled={poll.user_choice !== -1}
                        onClick={this.handleVote}
                    >
                        Vote
                    </Button>
                    <Badge
                        style={{float: 'right'}}
                        variant='primary'
                    >
                        {votesTotal} vote{votesTotal !== 1 ? "s" : ""}
                    </Badge>
                </Card.Footer>
            </Card>
        )
    };
}

const mapDispatchToProps = dispatch => {
    return {
        vote: (question, choice) => dispatch(vote(question, choice))
    }
};

export default connect(
    () => ({}),
    mapDispatchToProps
)(Poll);