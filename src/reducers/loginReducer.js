import * as typesLogin from '../actions/loginAction';

export const login = (state = {}, action) => {
	if (!action) return state;

	switch (action.type) {
		case typesLogin.LOGIN_REQUEST:
			return {
				showProgress: true
			};
		case typesLogin.LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				showProgress: false,
				...action
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


export const isLogin = (state = {}, action) => {
	if (!action) return state;

	switch (action.type) {
		case typesLogin.LOGIN_IS_LOGGED_REQUEST:
			return {
				showProgress: true
			};
		case typesLogin.LOGIN_IS_LOGGED_SUCCESS:
			return {
				...state,
				isLoggedIn: action.user != null && action.header != null,
				showProgress: false,
				...action
			};
		case typesLogin.LOGIN_IS_LOGGED_ERROR:
			return {
				error: action.error,
				showProgress: false
			};
		default:
			return state;
	}
};

