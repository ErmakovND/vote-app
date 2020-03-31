import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';

import Auth from "../../components/Auth";
import Feed from "../../components/Feed";
import NewPoll from "../../components/NewPoll";

class MainRouter extends React.Component {

    render() {
        const {isAuth} = this.props;
        return (
                <Switch>
                    <Route path="/signin" render={() => (<Auth/>)}/>
                    <Route path="/signup" render={() => (<Auth registry/>)}/>
                    <Route path="/new" render={
                        isAuth ?
                        () => (<NewPoll/>) :
                        () => (<Redirect to="signin"/>)}/>
                    <Route path="/all" render={
                        isAuth ?
                        () => (<Feed/>) :
                        () => (<Redirect to="signin"/>)}/>
                    <Route path="/my" render={
                        isAuth ?
                        () => (<Feed own/>) :
                        () => (<Redirect to="signin"/>)}/>
                </Switch>
        )
    }
}

const mapStateToProps = store => {
    return {
        isAuth: store.auth.user.isAuth
    }
}

export default connect(
    mapStateToProps
)(MainRouter);