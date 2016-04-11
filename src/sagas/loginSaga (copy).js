import {take, put, fork, call, race} from 'redux-saga/effects';
import authService from '../helpers/authService';
import * as storageService from '../helpers/storageService';
import * as typesLogin from '../actions/loginAction';
import * as typesFeed from '../actions/feedAction';
import * as typesSearch from '../actions/searchAction';

// login
function* authorize({ username, password }) {
	try {
		const token = yield call(authService.login, { username, password });
		yield call(storageService.authSave, token);
		let data = yield call(storageService.authGet);
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



// feed
function* getFeedData(user, header) {
	try {
		let data = yield call(authService.getFeedData, user, header);
		yield put({ type: typesFeed.FEED_SUCCESS, data })
	} catch (error) {
		yield put({ type: typesFeed.FEED_ERROR, error })
	}
}

export function* feedFlow() {
	// debugger;
	const data = yield take(typesFeed.FEED_REQUEST);
	yield fork(getFeedData, {...data.payload});
	yield take([ typesFeed.FEED_SUCCESS, typesFeed.FEED_ERROR ]);
}



// search
function* getSearchData(searchQuery) {
	try {
		let data = yield call(authService.getSearchData, searchQuery);
		yield put({ type: typesSearch.SEARCH_SUCCESS, data })
	} catch (error) {
		yield put({ type: typesSearch.SEARCH_ERROR, error })
	}
}

export function* searchFlow() {
	// debugger;
	const searchQuery = yield take(typesSearch.SEARCH_REQUEST);
	yield fork(getSearchData, searchQuery);
	yield take([ typesSearch.SEARCH_SUCCESS, typesSearch.SEARCH_ERROR ]);
}
