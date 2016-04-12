import {createAction} from 'redux-actions'


export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const searchRequest = createAction(SEARCH_REQUEST, (requestId, data) => {
	return { requestId, data }
});

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const searchSuccess = createAction(SEARCH_SUCCESS, (requestId, responses) => {
	return { requestId, responses }
});

export const SEARCH_ERROR = 'SEARCH_ERROR';
export const searchError = createAction(SEARCH_ERROR, (requestId, data) => {
	return { requestId, data }
});

