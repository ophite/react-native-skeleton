import {combineReducers} from 'redux';
import {login, isLogin} from './loginReducer';
import {feed} from './feedReducer';

const rootReducer = combineReducers({
	login,
	isLogin,
	feed
});

export default rootReducer;
