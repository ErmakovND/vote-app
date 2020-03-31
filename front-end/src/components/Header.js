import React from 'react';
import {connect} from 'react-redux';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import {STRUCTURE} from "../constants/header";

import {signOutUser} from "../store/actions/auth";
import {loadAllFeed, loadOwnFeed} from "../store/actions/feed";

class Header extends React.Component {
    handleLogOut = e => {
        e.preventDefault();
        e.stopPropagation();
        this.props.signOutUser();
    };

    loadFeed = title => () => {
        if (title === "All") {
            this.props.loadAllFeed();
        }
        if (title === "My") {
            this.props.loadOwnFeed();
        }
    }

    render() {
        const {auth} = this.props;
        return (
            <Navbar bg="primary">
                <Container>
                    <Navbar.Brand>Polling App</Navbar.Brand>
                    <Nav className="mr-auto ml-md-5" activeKey="None">
                        {Object.values(STRUCTURE).map(item => (
                            <LinkContainer to={item.route} key={item.route}>
                                <Nav.Link
                                    disabled={!auth.user.isAuth} 
                                    onSelect={this.loadFeed(item.title)}
                                >
                                    {item.title}
                                </Nav.Link>
                            </LinkContainer>
                        ))}
                    </Nav>
                    {auth.user.isAuth ?
                        <Nav>
                            <NavDropdown alignRight title={auth.user.login} id="user-details">
                                <NavDropdown.Header>
                                    {auth.service.loading ?
                                        <Spinner animation="border" variant="primary"/> :
                                        <Button onClick={this.handleLogOut}>
                                            Sign Out
                                        </Button>
                                    }
                                </NavDropdown.Header>
                            </NavDropdown>
                        </Nav> : null}
                </Container>
            </Navbar>
        )
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signOutUser: () => dispatch(signOutUser()),
        loadAllFeed: () => dispatch(loadAllFeed()),
        loadOwnFeed: () => dispatch(loadOwnFeed())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);