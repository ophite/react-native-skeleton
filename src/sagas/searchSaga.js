import {take, put, fork, call, race} from 'redux-saga/effects';
import githubAPI from '../helpers/githubAPI';
import * as types from '../actions/searchAction';


export function* searchFlow() {
	while(true) {
		const data = yield take(types.SEARCH_REQUEST);
		yield fork(getSearchData, data.payload);
		yield take([ types.SEARCH_SUCCESS, types.SEARCH_ERROR ]);
	}
}

function* getSearchData({ requestId, data }) {
	try {
		let searchResult = yield call(githubAPI.getSearchData, data);
		yield put({ type: types.SEARCH_SUCCESS, payload: { requestId, data: searchResult } })
	} catch (error) {
		yield put({ type: types.SEARCH_ERROR, payload: { requestId, error } })
	}
}
