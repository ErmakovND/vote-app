import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import 'bootswatch/dist/journal/bootstrap.min.css';

import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import MainRouter from "./routers/MainRouter";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Container className="mt-4 col-sm-6 col-md-5">
                    <MainRouter/>
                </Container>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth,
        feed: store.feed
    }
};

export default connect(mapStateToProps)(App);