import {combineReducers} from "redux";
import * as typesLogin from '../actions/login';

const login = (state = {}, action) => {
	if (!action) return state;
	// debugger;

	switch (action.type) {
		case typesLogin.LOGIN_REQUEST:
			return {
				showProgress: true
			};
		case typesLogin.LOGIN_SUCCESS:
			return {
				token: action.token,
				isLoggedIn: true,
				showProgress: false
			};
		case typesLogin.LOGIN_ERROR:
			return {
				error: action.error,
				showProgress: false
			};
		case typesLogin.LOGOUT:
			return null;
		default:
			return state;
	}
};


const isLogin = (state = {}, action) => {
	if (!action) return state;
	// debugger;

	switch (action.type) {
		case typesLogin.LOGIN_IS_LOGGED_REQUEST:
			return {
				showProgressAuthChecking: true
			};
		case typesLogin.LOGIN_IS_LOGGED_SUCCESS:
			return {
				'token': action.token,
				isLoggedIn: action.token != null,
				showProgressAuthChecking: false
			};
		case typesLogin.LOGIN_IS_LOGGED_ERROR:
			return {
				'error': action.error,
				showProgressAuthChecking: false
			};
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	login,
	isLogin
});

export default rootReducer;
