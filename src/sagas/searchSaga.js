import {take, put, fork, call, race} from 'redux-saga/effects';
import githubAPI from '../helpers/githubAPI';
import * as typesSearch from '../actions/searchAction';


function* getSearchData(searchQuery) {
	try {
		let data = yield call(githubAPI.getSearchData, searchQuery);
		yield put({ type: typesSearch.SEARCH_SUCCESS, data })
	} catch (error) {
		yield put({ type: typesSearch.SEARCH_ERROR, error })
	}
}

export function* searchFlow() {
	const searchQuery = yield take(typesSearch.SEARCH_REQUEST);
	yield fork(getSearchData, searchQuery);
	yield take([ typesSearch.SEARCH_SUCCESS, typesSearch.SEARCH_ERROR ]);
}