import {createAction} from 'redux-actions'


// login
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequest = createAction(LOGIN_REQUEST, (requestId, data) => {
	return { requestId, data }
});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = createAction(LOGIN_SUCCESS, (requestId, responses) => {
	return { requestId, responses }
});

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = createAction(LOGIN_ERROR, (requestId, data) => {
	return { requestId, data }
});

export const LOGOUT = 'LOGOUT';
export const logout = createAction(LOGIN_ERROR, (requestId) => {
	return { requestId }
});


// isLogin
export const LOGIN_IS_LOGGED_REQUEST = 'LOGIN_IS_LOGGED_REQUEST';
export const loginIsLoggedRequest = createAction(LOGIN_IS_LOGGED_REQUEST, (requestId, data) => {
	return { requestId, data }
});

export const LOGIN_IS_LOGGED_SUCCESS = 'LOGIN_IS_LOGGED_SUCCESS';
export const loginIsLoggedSuccess = createAction(LOGIN_IS_LOGGED_SUCCESS, (requestId, responses) => {
	return { requestId, responses }
});

export const LOGIN_IS_LOGGED_ERROR = 'LOGIN_IS_LOGGED_ERROR';
export const loginIsLoggedError = createAction(LOGIN_IS_LOGGED_ERROR, (requestId, data) => {
	return { requestId, data }
});

