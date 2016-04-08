import {loginFlow} from './LoginSaga'
import { fork } from 'redux-saga/effects';

// start the daemons
export default function* root() {
	yield [
		fork(loginFlow)
	];
};
