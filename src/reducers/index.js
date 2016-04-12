import {combineReducers} from 'redux';
import {login, isLogin} from './loginReducer';
import {feed} from './feedReducer';
import {search} from './searchReducer';
import {request} from './requestReducer';

const rootReducer = combineReducers({
	login,
	isLogin,
	feed,
	search
});

export default rootReducer;
