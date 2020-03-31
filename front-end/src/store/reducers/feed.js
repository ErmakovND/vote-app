import {LOAD_ALL_REQUEST, LOAD_ALL_SUCCESS, LOAD_ALL_FAILURE} from "../actionTypes";
import {LOAD_OWN_REQUEST, LOAD_OWN_SUCCESS, LOAD_OWN_FAILURE} from "../actionTypes";
import {VOTE_REQUEST, VOTE_SUCCESS, VOTE_FAILURE} from "../actionTypes";
import {ADD_POLL_REQUEST, ADD_POLL_SUCCESS, ADD_POLL_FAILURE} from "../actionTypes";

const initialState = {
    feed: {
        all: [],
        own: []
    },
    service: {
        loading: false
    }
};

export const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_REQUEST:
        case LOAD_OWN_REQUEST:
        case VOTE_REQUEST:
        case ADD_POLL_REQUEST:
            return {...state, service: {...state.service, loading: true}}
        case LOAD_ALL_SUCCESS:
            return {...state, 
                feed: {...state.feed, all: action.payload}, 
                service: {...state.service, loading: false}}
        case LOAD_OWN_SUCCESS:
            return {...state, 
                feed: {...state.feed, own: action.payload}, 
                service: {...state.service, loading: false}}
        case VOTE_SUCCESS:
            const {question, choice} = action.payload;
            return {...state,
                feed: {
                    all: state.feed.all.map(item => {
                        if (item.id === question) {
                            return {
                                ...item,
                                user_choice: choice,
                                choices: item.choices.map(opt => (
                                    {...opt, votes: opt.votes + (opt.id === choice)}
                                ))
                            };
                        }
                        return item;
                    }),
                    own: state.feed.own.map(item => {
                        if (item.id === question) {
                            return {
                                ...item,
                                user_choice: choice,
                                choices: item.choices.map(opt => (
                                    {...opt, votes: opt.votes + (opt.id === choice)}
                                ))
                            };
                        }
                        return item;
                    })
                },
                service: {...state.service, loading: false}
            };
        case ADD_POLL_SUCCESS:
            return {...state, 
                service: {...state.service, loading: false}}
        case LOAD_ALL_FAILURE:
        case LOAD_OWN_FAILURE:
        case VOTE_FAILURE:
        case ADD_POLL_FAILURE:
            return {...state, 
                service: {...state.service, 
                    loading: false, 
                    error: "Something went wrong"}}
        default:
            return state;
    }
};