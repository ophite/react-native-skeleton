import * as types from '../actions/loginAction';
import {reducerRequest, reducerSuccess, reducerError, DEFAULT_STATE} from 'redux-reqhelper';
import {handleActions} from 'redux-actions';


let reducer = {};
reducer[ types.LOGIN_REQUEST ] = reducerRequest;
reducer[ types.LOGIN_SUCCESS ] = reducerSuccess;
reducer[ types.LOGIN_ERROR ] = reducerError;
reducer[ types.LOGOUT ] = (state, action) => {
	const { requestId } = action.payload;
	return {
		requests: {
			[requestId]: {
				hasError: false,
				isLoaded: true,
				isLoading: false,
				errors: null,
				data: null
			}
		}
	}
};
export const login = handleActions(reducer, DEFAULT_STATE);


reducer = {};
reducer[ types.LOGIN_IS_LOGGED_REQUEST ] = reducerRequest;
reducer[ types.LOGIN_IS_LOGGED_SUCCESS ] = reducerSuccess;
reducer[ types.LOGIN_IS_LOGGED_ERROR ] = reducerError;
export const isLogin = handleActions(reducer, DEFAULT_STATE);
