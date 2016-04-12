import * as typesLogin from '../actions/loginAction';
import * as requestReducer from './requestReducer';
import {handleActions} from 'redux-actions'


let loginReducer = {};
loginReducer[ typesLogin.LOGIN_REQUEST ] = requestReducer.requestStarted;
loginReducer[ typesLogin.LOGIN_SUCCESS ] = requestReducer.requestSuccess;
loginReducer[ typesLogin.LOGIN_ERROR ] = requestReducer.requestError;
export const login = handleActions(loginReducer, requestReducer.DEFAULT_STATE);


loginReducer = {};
loginReducer[ typesLogin.LOGIN_IS_LOGGED_REQUEST ] = requestReducer.requestStarted;
loginReducer[ typesLogin.LOGIN_IS_LOGGED_SUCCESS ] = requestReducer.requestSuccess;
loginReducer[ typesLogin.LOGIN_IS_LOGGED_ERROR ] = requestReducer.requestError;
export const isLogin = handleActions(loginReducer, requestReducer.DEFAULT_STATE);

//
// export const isLogin = (state = {}, action) => {
// 	if (!action) return state;
//
// 	switch (action.type) {
// 		case typesLogin.LOGIN_IS_LOGGED_REQUEST:
// 			return {
// 				showProgress: true
// 			};
// 		case typesLogin.LOGIN_IS_LOGGED_SUCCESS:
// 			return {
// 				...state,
// 				isLoggedIn: action.user != null && action.header != null,
// 				showProgress: false,
// 				...action
// 			};
// 		case typesLogin.LOGIN_IS_LOGGED_ERROR:
// 			return {
// 				error: action.error,
// 				showProgress: false
// 			};
// 		default:
// 			return state;
// 	}
// };

