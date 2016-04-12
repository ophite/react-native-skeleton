import {take, put, fork, call, race} from 'redux-saga/effects';
import githubAPI from '../helpers/githubAPI';
import * as typesSearch from '../actions/searchAction';


export function* searchFlow() {
	while(true) {
		const data = yield take(typesSearch.SEARCH_REQUEST);
		yield fork(getSearchData, data.payload);
		yield take([ typesSearch.SEARCH_SUCCESS, typesSearch.SEARCH_ERROR ]);
	}
}

function* getSearchData({ requestId, data }) {
	try {
		let searchResult = yield call(githubAPI.getSearchData, data);
		yield put({ type: typesSearch.SEARCH_SUCCESS, payload: { requestId, data: searchResult } })
	} catch (error) {
		yield put({ type: typesSearch.SEARCH_ERROR, payload: { requestId, error } })
	}
}
