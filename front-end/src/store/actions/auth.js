import {SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE} from "../actionTypes";
import {SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE} from "../actionTypes";
import {SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE} from "../actionTypes";
import api from "../../services/api";

export const signInUser = user => async dispatch => {
    dispatch({
        type: SIGN_IN_REQUEST
    })

    try {
        await api
        .signIn({username: user.login, password: user.password});
        dispatch({
            type: SIGN_IN_SUCCESS,
            payload: user.login
        })
    } catch (e) {
        dispatch({
            type: SIGN_IN_FAILURE
        })
    }
};

export const signUpUser = user => async dispatch => {
    dispatch({
        type: SIGN_UP_REQUEST
    })

    try {
        await api
        .signUp({username: user.login, password1: user.password1, password2: user.password2});
        dispatch({
            type: SIGN_UP_SUCCESS,
            payload: user.login
        })
    } catch (e) {
        dispatch({
            type: SIGN_UP_FAILURE
        })
    }
};

export const signOutUser = () => async dispatch => {
    dispatch({
        type: SIGN_OUT_REQUEST
    })
    
    try {
        await api
        .signOut();
        dispatch({
            type: SIGN_OUT_SUCCESS
        })
    } catch (e) {
        dispatch({
            type: SIGN_OUT_FAILURE
        })
    }
};