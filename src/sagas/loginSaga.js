import {take, put, fork, call, race} from 'redux-saga/effects';
import githubAPI from '../helpers/githubAPI';
import * as storageService from '../helpers/storageService';
import * as types from '../actions/loginAction';


// login
export function* loginFlow() {
	while (true) {
		yield call(storageService.authClear);
		let data = yield take(types.LOGIN_REQUEST);
		yield fork(authorize, {
			requestId: data.payload.requestId,
			...data.payload.data
		});

		yield take([ types.LOGOUT, types.LOGIN_ERROR ]);
		yield call(storageService.authClear);
	}
}

function* authorize({ requestId, username, password }) {
	try {
		const token = yield call(githubAPI.login, { username, password });
		yield call(storageService.authSave, token);
		let data = yield call(storageService.authGet);
		data = yield call(storageService.convertAuthData, data);
		yield put({ type: types.LOGIN_SUCCESS, payload: { requestId, data } })
	} catch (error) {
		yield put({ type: types.LOGIN_ERROR, payload: { requestId, error } })
	}
}


// isLogin
export function* isLoginFlow() {
	while (true) {
		let data = yield take(types.LOGIN_IS_LOGGED_REQUEST);
		yield fork(isAuhorize, data.payload.requestId);
		yield take([ types.LOGIN_IS_LOGGED_SUCCESS, types.LOGIN_IS_LOGGED_ERROR ]);
	}
}

function* isAuhorize(requestId) {
	try {
		let data = yield call(storageService.authGet);
		data = yield call(storageService.convertAuthData, data);
		yield put({ type: types.LOGIN_IS_LOGGED_SUCCESS, payload: { requestId, data } })
	} catch (error) {
		yield put({ type: types.LOGIN_IS_LOGGED_ERROR, payload: { requestId, error } })
	}
}
