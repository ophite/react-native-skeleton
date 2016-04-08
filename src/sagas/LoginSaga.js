import {take, put, fork, call, race} from 'redux-saga/effects';
// import Types from '../Actions/Types'
import * as actions from '../actions/login'
// import {startSubmit, stopSubmit} from '../form/actions';
// import {clearState} from '../router/actions';
import authService from '../helpers/AuthService';
import {AsyncStorage} from 'react-native';
import {LOGIN_REQUEST, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT} from '../actions/login'

// // a helper for simulating work
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
//
// // attempts to login
// export function * attemptLogin (username, password) {
//   // simulate work
//   yield delay(2000)
//
//   actions.loginSuccess('sda');
//
//   if (password === '') {
//     // dispatch failure
//     yield put(Actions.loginFailure('WRONG'))
//   } else {
//     // dispatch successful logins
//     yield put(Actions.loginSuccess(username))
//   }
// }
//
// // a daemonized version which waits for LOGIN_ATTEMPT signals
// export function * watchLoginAttempt () {
//   // daemonize
//   while (true) {
//     // wait for LOGIN_ATTEMPT actions to arrive
//     const { username, password } = yield take(Types.LOGIN_ATTEMPT)
//     // call attemptLogin to perform the actual work
//     yield call(attemptLogin, username, password)
//   }
// }

const AUTH_KEY = 'auth';
const USER_KEY = 'user';

const saveAuth = ({ authKey, userKey }) => {
	AsyncStorage.multiSet([
		[ AUTH_KEY, authKey ],
		[ USER_KEY, JSON.stringify(userKey) ]
	]);
};

const clearAuth = () => {
	AsyncStorage.multiRemove([ AUTH_KEY, USER_KEY ]);
};

function* authorize({ username, password }) {
	try {
		const token = yield call(authService.login, { username, password });
		yield call(saveAuth, token);
		yield put({ type: LOGIN_SUCCESS, token })
	} catch (error) {
		yield put({ type: LOGIN_ERROR, error })
	}
}

export function* loginFlow() {
	while (true) {
		let data = yield take(LOGIN_REQUEST);
		// const { user, password } = yield take('LOGIN_REQUEST');
		yield fork(authorize, { ...data.payload });
		yield take([ LOGOUT, LOGIN_ERROR ]);
		yield call(clearAuth);
	}
}


// function* handleLoginSubmit() {
// 	// run the daemon
// 	while (true) {
//
// 		// wait for a login submit
// 		var { payload } = yield take(actions.LOGIN_SUBMIT);
// 		// start submitting the form
// 		yield put(startSubmit("authLogin"));
// 		// put a login request
// 		yield put(loginRequest(payload));
// 		// wait for a response
// 		var { error, success } = yield race({
// 			success: take(actions.LOGIN_SUCCESS),
// 			error: take(actions.LOGIN_ERROR)
// 		});
//
// 		// if not an error, pop the screen
// 		if (!error) {
// 			// finalize the form
// 			yield put(stopSubmit("authLogin"));
// 			yield put(clearState());
// 		} else {
// 			// finalize the form
// 			yield put(stopSubmit("authLogin", error.payload));
// 		}
// 	}
// }
//
// function* handleLoginRequest() {
// 	// run the daemon
// 	while (true) {
// 		try {
// 			// wait for a login request
// 			var { payload } = yield take(actions.LOGIN_REQUEST);
// 			// call the api
// 			var user = yield call(login, payload);
// 			// call the success
// 			yield put(actions.loginSuccess(user));
// 		} catch (e) {
// 			// call the error
// 			yield put(actions.loginError(e));
// 		}
// 	}
// }
//
// export default function* auth(getState) {
// 	yield fork(handleLoginRequest);
// 	yield fork(handleLoginSubmit);
// }
