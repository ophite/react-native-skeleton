import {createAction} from 'redux-actions';


export const FEED_REQUEST = 'FEED_REQUEST';
export const feedRequest = createAction(FEED_REQUEST, (requestId, data) => {
	return { requestId, data }
});

export const FEED_SUCCESS = 'FEED_SUCCESS';
export const feedSuccess = createAction(FEED_SUCCESS, (requestId, responses) => {
	return { requestId, responses }
});

export const FEED_ERROR = 'FEED_ERROR';
export const feedError = createAction(FEED_ERROR, (requestId, data) => {
	return { requestId, data }
});

