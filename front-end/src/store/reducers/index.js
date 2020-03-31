import {combineReducers} from "redux";
import {feedReducer} from "./feed";
import {authReducer} from "./auth";

export const rootReducer = combineReducers({
    auth: authReducer,
    content: feedReducer
});