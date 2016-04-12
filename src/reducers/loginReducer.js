import * as types from '../actions/loginAction';
import {requestStarted, requestSuccess, requestError, DEFAULT_STATE} from './requestReducer';
import {handleActions} from 'redux-actions';


let reducer = {};
reducer[ types.LOGIN_REQUEST ] = requestStarted;
reducer[ types.LOGIN_SUCCESS ] = requestSuccess;
reducer[ types.LOGIN_ERROR ] = requestError;
export const login = handleActions(reducer, DEFAULT_STATE);


reducer = {};
reducer[ types.LOGIN_IS_LOGGED_REQUEST ] = requestStarted;
reducer[ types.LOGIN_IS_LOGGED_SUCCESS ] = requestSuccess;
reducer[ types.LOGIN_IS_LOGGED_ERROR ] = requestError;
export const isLogin = handleActions(reducer, DEFAULT_STATE);
