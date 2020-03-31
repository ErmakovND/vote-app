import React from 'react';
import {connect} from 'react-redux';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';

import {addPoll} from "../store/actions/feed"

class NewPoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            options: [
                "",
                ""
            ]
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        this.props.addPoll(this.state);
        this.setState({
            title: "",
            options: [
                "",
                ""
            ]
        });
    };

    handleAddOption = e => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({options: [...this.state.options, ""]})
    };

    handleDeleteOption = i => e => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            options: this.state.options.filter(
                (opt, idx) => (!(idx === i))
            )
        })
    };

    handleTitleChange = e => {
        this.setState({title: e.target.value});
        console.log(this.state);
    };

    handleOptionChange = i => e => {
        this.setState({
            options: this.state.options.map(
                (opt, idx) => {
                    return idx === i ? e.target.value : opt;
                }
            )
        });
        console.log(this.state);
    };

    render() {
        const {content} = this.props;
        return (
            <Card>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="question">
                            <Form.Label>
                                <Card.Subtitle>Question</Card.Subtitle>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Your Question"
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="answers">
                            <Form.Label>
                                <Card.Subtitle>Answers</Card.Subtitle>
                            </Form.Label>
                            {this.state.options.map(
                                (opt, idx) => (
                                    <InputGroup className="mb-1">
                                        <Form.Control
                                            type="text"
                                            value={opt}
                                            size="sm"
                                            placeholder={`Answer ${idx+1}`}
                                            onChange={this.handleOptionChange(idx)}
                                        >
                                        </Form.Control>
                                        <InputGroup.Append>
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                size="sm"
                                                onClick={this.handleDeleteOption(idx)}
                                            >
                                                Delete
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                ))}
                            <Button
                                variant="primary"
                                type="submit"
                                size="sm"
                                onClick={this.handleAddOption}
                            >
                                Add Answer
                            </Button>
                        </Form.Group>
                        {content.service.loading ? 
                            <Spinner animation="border" variant="primary"/> : 
                            <Button
                                variant="primary"
                                type="submit"
                                block
                            >
                                Submit
                            </Button>
                        }
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = store => {
    return {
        content: store.content
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPoll: (poll) => dispatch(addPoll(poll))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewPoll);