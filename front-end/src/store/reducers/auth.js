import {SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE} from "../actionTypes";
import {SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE} from "../actionTypes";
import {SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE} from "../actionTypes";

const initialState = {
    user: {
        isAuth: false,
    },
    service: {
        loading: false,
        error: ""
    }
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_REQUEST:
        case SIGN_UP_REQUEST:
        case SIGN_OUT_REQUEST:
            return {...state, 
                service: 
                {...state.service, 
                    loading: true,
                    error: ""
                }
            };
        case SIGN_IN_SUCCESS:
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                user: {
                    login: action.payload,
                    isAuth: true
                },
                service: {
                    ...state.service,
                    loading: false,
                    error: ""
                }
            };
        case SIGN_IN_FAILURE:
        case SIGN_UP_FAILURE:
            return {
                ...state,
                service: {
                    ...state.service,
                    loading: false,
                    error: "Check your login and password"
                }
            };
        case SIGN_OUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
};