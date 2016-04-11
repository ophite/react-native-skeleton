import {loginFlow, isLoginFlow} from './loginSaga';
import {feedFlow} from './feedSaga';
import {searchFlow} from './searchSaga';
import {fork} from 'redux-saga/effects';

// start the daemons
export default function* root() {
	yield [
		fork(isLoginFlow),
		fork(loginFlow),
		fork(feedFlow),
		fork(searchFlow)
	];
};
