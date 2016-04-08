import {combineReducers} from "redux";
import * as types from "../actions";
import {LOGIN_SUCCESS, LOGOUT, LOGIN_ERROR, LOGIN_REQUEST} from '../actions/login';

const data = (state = { isFetching: false, message: "" }, action) => {

	switch (action.type) {

		case types.REQUEST_DATA:
			return {
				...state,
				isFetching: true
			};

		case types.RECEIVE_DATA:
			return {
				...state,
				isFetching: false,
				message: action.data.message
			};

		default:
			return state;
	}
};


const users = (state = {}, action) => {
	if (!action) return state;

	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				success: true,
				payload: action.payload
			};
		default:
			return state;
	}
};

const auth = (state = {}, action) => {
	if (!action) return state;

	// debugger;

	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				showProgress: true
			};
		case LOGIN_SUCCESS:
			return {
				'token': action.token,
				isLoggedIn: true,
				showProgress: false
			};
		case LOGIN_ERROR:
			return {
				'error': action.error,
				showProgress: false,
			};
		case LOGOUT:
			return null;
		default:
			return state;
	}
};


const rootReducer = combineReducers({
	data,
	users,
	auth
});

export default rootReducer;
