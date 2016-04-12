import {createAction} from 'redux-actions';
import * as actions from './requestAction';


// login
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequest = actions.request(LOGIN_REQUEST);

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = actions.success(LOGIN_SUCCESS);

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = actions.error(LOGIN_ERROR);

export const LOGOUT = 'LOGOUT';
export const logout = createAction(LOGIN_ERROR, (requestId) => {
	return { requestId }
});


// isLogin
export const LOGIN_IS_LOGGED_REQUEST = 'LOGIN_IS_LOGGED_REQUEST';
export const loginIsLoggedRequest = actions.request(LOGIN_IS_LOGGED_REQUEST);

export const LOGIN_IS_LOGGED_SUCCESS = 'LOGIN_IS_LOGGED_SUCCESS';
export const loginIsLoggedSuccess = actions.success(LOGIN_IS_LOGGED_SUCCESS);

export const LOGIN_IS_LOGGED_ERROR = 'LOGIN_IS_LOGGED_ERROR';
export const loginIsLoggedError = actions.error(LOGIN_IS_LOGGED_ERROR);

