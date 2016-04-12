import {take, put, fork, call, race} from 'redux-saga/effects';
import githubAPI from '../helpers/githubAPI';
import * as storageService from '../helpers/storageService';
import * as typesLogin from '../actions/loginAction';


// login
export function* loginFlow() {
	while (true) {
		let data = yield take(typesLogin.LOGIN_REQUEST);
		yield fork(authorize, {
			requestId: data.payload.requestId,
			...data.payload.data
		});

		yield take([ typesLogin.LOGOUT, typesLogin.LOGIN_ERROR ]);
		yield call(storageService.authClear);
	}
}

function* authorize({ requestId, username, password }) {
	try {
		const token = yield call(githubAPI.login, { username, password });
		yield call(storageService.authSave, token);
		let data = yield call(storageService.authGet);
		data = yield call(storageService.convertAuthData, data);
		yield put({ type: typesLogin.LOGIN_SUCCESS, payload: { requestId, data } })
	} catch (error) {
		yield put({ type: typesLogin.LOGIN_ERROR, payload: { requestId, error } })
	}
}


// isLogin
export function* isLoginFlow() {
	let data = yield take(typesLogin.LOGIN_IS_LOGGED_REQUEST);
	yield fork(isAuhorize, data.payload.requestId);
	yield take([ typesLogin.LOGIN_IS_LOGGED_SUCCESS, typesLogin.LOGIN_IS_LOGGED_ERROR ]);
}

function* isAuhorize(requestId) {
	try {
		let data = yield call(storageService.authGet);
		data = yield call(storageService.convertAuthData, data);
		yield put({ type: typesLogin.LOGIN_IS_LOGGED_SUCCESS, payload: { requestId, data } })
	} catch (error) {
		yield put({ type: typesLogin.LOGIN_IS_LOGGED_ERROR, payload: { requestId, error } })
	}
}
