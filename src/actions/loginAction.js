import {createAction} from 'redux-actions';
import {actionRequest, actionSuccess, actionError} from 'redux-reqhelper';


// login
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequest = actionRequest(LOGIN_REQUEST);

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = actionSuccess(LOGIN_SUCCESS);

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = actionError(LOGIN_ERROR);

export const LOGOUT = 'LOGOUT';
export const logout = createAction(LOGOUT, (requestId) => {
	return { requestId }
});


// isLogin
export const LOGIN_IS_LOGGED_REQUEST = 'LOGIN_IS_LOGGED_REQUEST';
export const loginIsLoggedRequest = actionRequest(LOGIN_IS_LOGGED_REQUEST);

export const LOGIN_IS_LOGGED_SUCCESS = 'LOGIN_IS_LOGGED_SUCCESS';
export const loginIsLoggedSuccess = actionSuccess(LOGIN_IS_LOGGED_SUCCESS);

export const LOGIN_IS_LOGGED_ERROR = 'LOGIN_IS_LOGGED_ERROR';
export const loginIsLoggedError = actionError(LOGIN_IS_LOGGED_ERROR);

