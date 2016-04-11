import {take, put, fork, call, race} from 'redux-saga/effects';
import githubAPI from '../helpers/githubAPI';
import * as storageService from '../helpers/storageService';
import * as typesLogin from '../actions/loginAction';

// login
function* authorize({ username, password }) {
	try {
		const token = yield call(githubAPI.login, { username, password });
		yield call(storageService.authSave, token);
		let data = yield call(storageService.authGet);
		data = yield call(storageService.convertAuthData, data);
		yield put({ type: typesLogin.LOGIN_SUCCESS, ...data })
	} catch (error) {
		yield put({ type: typesLogin.LOGIN_ERROR, error })
	}
}

export function* loginFlow() {
	while (true) {
		let data = yield take(typesLogin.LOGIN_REQUEST);
		yield fork(authorize, { ...data.payload });
		yield take([ typesLogin.LOGOUT, typesLogin.LOGIN_ERROR ]);
		yield call(storageService.authClear);
	}
}


// isLogin
function* isAuhorize() {
	try {
		let data = yield call(storageService.authGet);
		data = yield call(storageService.convertAuthData, data);
		yield put({ type: typesLogin.LOGIN_IS_LOGGED_SUCCESS, ...data })
	} catch (error) {
		yield put({ type: typesLogin.LOGIN_IS_LOGGED_ERROR, error })
	}
}

export function* isLoginFlow() {
	yield take(typesLogin.LOGIN_IS_LOGGED_REQUEST);
	yield fork(isAuhorize);
	yield take([ typesLogin.LOGIN_IS_LOGGED_SUCCESS, typesLogin.LOGIN_IS_LOGGED_ERROR ]);
}
