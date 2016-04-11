import {take, put, fork, call, race} from 'redux-saga/effects';
import githubAPI from '../helpers/githubAPI';
import * as typesFeed from '../actions/feedAction';

function* getFeedData(user, header) {
	try {
		let data = yield call(githubAPI.getFeedData, user, header);
		yield put({ type: typesFeed.FEED_SUCCESS, data })
	} catch (error) {
		yield put({ type: typesFeed.FEED_ERROR, error })
	}
}

export function* feedFlow() {
	const data = yield take(typesFeed.FEED_REQUEST);
	yield fork(getFeedData, { ...data.payload });
	yield take([ typesFeed.FEED_SUCCESS, typesFeed.FEED_ERROR ]);
}
