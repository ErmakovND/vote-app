import React from 'react';
import {connect} from 'react-redux';

import {LinkContainer} from 'react-router-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

import {signInUser, signUpUser, signOutUser} from "../store/actions/auth";

import {SIGN_IN_FORM, SIGN_UP_FORM} from "../constants/auth";

class Auth extends React.Component {
    handleFormChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = e => {
        const {registry} = this.props;
        e.preventDefault();
        e.stopPropagation();
        if (registry) {
            this.props.signUpUser(this.state);
        } else {
            this.props.signInUser(this.state);
        }
    };

    render() {
        const {registry, auth} = this.props;
        if (auth.user.isAuth) {
            return (
                <Card>
                    <Card.Body>
                        <Form.Label>
                        <Card.Subtitle>
                            Welcome, {auth.user.login}!
                        </Card.Subtitle>
                        </Form.Label>
                    </Card.Body>
                </Card>
            )
        }
        const form = registry ? SIGN_UP_FORM : SIGN_IN_FORM;
        return (
            <Card>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        {Object.values(form).map(field => (
                            <Form.Group controlId={field.name} key={field.name}>
                                <Form.Label>
                                    <Card.Subtitle>{field.title}</Card.Subtitle>
                                </Form.Label>
                                <Form.Control
                                    type={field.name}
                                    name={field.name}
                                    placeholder={field.holder}
                                    onChange={this.handleFormChange}
                                />
                            </Form.Group>
                        ))}
                        <Form.Group controlId="feedback">
                            <Form.Text className="text-primary">
                                {auth.service.error}
                            </Form.Text>
                        </Form.Group>
                        {auth.service.loading ? 
                        <Spinner animation="border" variant="primary"/> : 
                        <div>
                            <Button variant="primary" type="submit">
                                {registry ? "Sign Up" : "Sign In"}
                            </Button>
                            <LinkContainer to={registry ? "/signin" : "/signup"}>
                                <Button variant="link">
                                    {registry ? "Sign In" : "Sign Up"}
                                </Button>
                            </LinkContainer>
                        </div>
                        }
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signInUser: creds => dispatch(signInUser(creds)),
        signUpUser: user => dispatch(signUpUser(user)),
        signOutUser: () => dispatch(signOutUser())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);