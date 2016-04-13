import {take, put, fork, call, race} from 'redux-saga/effects';
import githubAPI from '../helpers/githubAPI';
import * as types from '../actions/feedAction';


export function* feedFlow() {
	while (true) {
		const data = yield take(types.FEED_REQUEST);
		yield fork(getFeedData, {
			requestId: data.payload.requestId,
			...data.payload.data
		});
		yield take([ types.FEED_SUCCESS, types.FEED_ERROR ]);
	}
}


function* getFeedData({ requestId, user, header }) {
	try {
		let data = yield call(githubAPI.getFeedData, { user, header });
		yield put({ type: types.FEED_SUCCESS, payload: { requestId, data } })
	} catch (error) {
		yield put({ type: types.FEED_ERROR, payload: { requestId, error } })
	}
}
