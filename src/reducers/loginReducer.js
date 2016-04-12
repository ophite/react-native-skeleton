import * as types from '../actions/loginAction';
import * as requestReducer from './requestReducer';
import {handleActions} from 'redux-actions';


let loginReducer = {};
loginReducer[ types.LOGIN_REQUEST ] = requestReducer.requestStarted;
loginReducer[ types.LOGIN_SUCCESS ] = requestReducer.requestSuccess;
loginReducer[ types.LOGIN_ERROR ] = requestReducer.requestError;
export const login = handleActions(loginReducer, requestReducer.DEFAULT_STATE);


loginReducer = {};
loginReducer[ types.LOGIN_IS_LOGGED_REQUEST ] = requestReducer.requestStarted;
loginReducer[ types.LOGIN_IS_LOGGED_SUCCESS ] = requestReducer.requestSuccess;
loginReducer[ types.LOGIN_IS_LOGGED_ERROR ] = requestReducer.requestError;
export const isLogin = handleActions(loginReducer, requestReducer.DEFAULT_STATE);
