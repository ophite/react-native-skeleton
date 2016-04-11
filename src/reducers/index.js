import {combineReducers} from 'redux';
import {login, isLogin} from './loginReducer';

const rootReducer = combineReducers({
	login,
	isLogin
});

export default rootReducer;
