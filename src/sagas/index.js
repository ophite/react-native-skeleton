import {loginFlow, isLoginFlow} from './loginSaga'
import {fork} from 'redux-saga/effects';

// start the daemons
export default function* root() {
	yield [
		fork(isLoginFlow),
		fork(loginFlow)
	];
};
