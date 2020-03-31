import {LOAD_ALL_REQUEST, LOAD_ALL_SUCCESS, LOAD_ALL_FAILURE} from "../actionTypes";
import {LOAD_OWN_REQUEST, LOAD_OWN_SUCCESS, LOAD_OWN_FAILURE} from "../actionTypes";
import {VOTE_REQUEST, VOTE_SUCCESS, VOTE_FAILURE} from "../actionTypes";
import {ADD_POLL_REQUEST, ADD_POLL_SUCCESS, ADD_POLL_FAILURE} from "../actionTypes";
import api from "../../services/api";

export const loadAllFeed = () => async dispatch => {
    dispatch({
        type: LOAD_ALL_REQUEST
    })

    try {
        const r = await api
        .loadAll();
        dispatch({
            type: LOAD_ALL_SUCCESS,
            payload: r.data
        })
    } catch (e) {
        dispatch({
            type: LOAD_ALL_FAILURE
        })
    }
};

export const loadOwnFeed = () => async dispatch => {
    dispatch({
        type: LOAD_OWN_REQUEST
    })

    try {
        const r = await api
        .loadOwn();
        dispatch({
            type: LOAD_OWN_SUCCESS,
            payload: r.data
        })
    } catch (e) {
        dispatch({
            type: LOAD_OWN_FAILURE
        })
    }
};

export const addPoll = (poll) => async dispatch => {
    dispatch({
        type: ADD_POLL_REQUEST
    })

    try {
        const r = await api
        .createPoll(poll.title);
        const pollId = r.data.id;
        await poll.options.map(async opt => {
            await api
            .addChoice(pollId, opt);
        })
        dispatch({
            type: ADD_POLL_SUCCESS
        })
    } catch (e) {
        dispatch({
            type: ADD_POLL_FAILURE
        })
    }
};

export const vote = (question, choice) => async dispatch => {
    dispatch({
        type: VOTE_REQUEST
    })

    try {
        await api
        .vote(question, choice);
        dispatch({
            type: VOTE_SUCCESS,
            payload: {question, choice}
        })
    } catch (e) {
        dispatch({
            type: VOTE_FAILURE
        })
    }
};