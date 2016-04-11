import {take, put, fork, call, race} from 'redux-saga/effects';
import githubAPI from '../helpers/githubAPI';
import {AsyncStorage} from 'react-native';
import * as typesLogin from '../actions/loginAction'

const AUTH_KEY = 'auth';
const USER_KEY = 'user';


// login
const authSave = ({ authKey, userKey }) => {
	AsyncStorage.multiSet([
		[ AUTH_KEY, authKey ],
		[ USER_KEY, JSON.stringify(userKey) ]
	]);
};

const authClear = () => {
	AsyncStorage.multiRemove([ AUTH_KEY, USER_KEY ]);
};

function* authorize({ username, password }) {
	try {
		const token = yield call(githubAPI.login, { username, password });
		yield call(authSave, token);
		yield put({ type: typesLogin.LOGIN_SUCCESS, token })
	} catch (error) {
		yield put({ type: typesLogin.LOGIN_ERROR, error })
	}
}

export function* loginFlow() {
	while (true) {
		let data = yield take(typesLogin.LOGIN_REQUEST);
		yield fork(authorize, { ...data.payload });
		yield take([ typesLogin.LOGOUT, typesLogin.LOGIN_ERROR ]);
		yield call(authClear);
	}
}


// isLogin
const authIsAuth = () => {
	return AsyncStorage.multiGet([ AUTH_KEY, USER_KEY ]);
};

function* isAuhorize() {
	try {
		let token = yield call(authIsAuth);
		token = githubAPI.getAuthData(token);
		yield put({ type: typesLogin.LOGIN_IS_LOGGED_SUCCESS, token })
	} catch (error) {
		yield put({ type: typesLogin.LOGIN_IS_LOGGED_ERROR, error })
	}
}
export function* isLoginFlow() {
	yield take(typesLogin.LOGIN_IS_LOGGED_REQUEST);
	yield fork(isAuhorize);
	yield take([ typesLogin.LOGIN_IS_LOGGED_SUCCESS, typesLogin.LOGIN_IS_LOGGED_ERROR ]);
}
