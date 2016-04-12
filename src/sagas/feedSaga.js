import {take, put, fork, call, race} from 'redux-saga/effects';
import githubAPI from '../helpers/githubAPI';
import * as typesFeed from '../actions/feedAction';


export function* feedFlow() {
	const data = yield take(typesFeed.FEED_REQUEST);
	yield fork(getFeedData, {
		requestId: data.payload.requestId,
		...data.payload.data,
	});
	yield take([ typesFeed.FEED_SUCCESS, typesFeed.FEED_ERROR ]);
}


function* getFeedData({requestId, user, header}) {
	try {
		let data = yield call(githubAPI.getFeedData, {user, header});
		yield put({ type: typesFeed.FEED_SUCCESS, payload: { requestId, data } })
	} catch (error) {
		yield put({ type: typesFeed.FEED_ERROR, payload: { requestId, error } })
	}
}
