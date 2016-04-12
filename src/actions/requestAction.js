import {createAction} from 'redux-actions'


export const REQUEST_STARTED = 'REQUEST_STARTED';
export const requestStarted = createAction(REQUEST_STARTED, (requestId, data) => {
	return { requestId, data }
});

export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const requestSuccess = createAction(REQUEST_SUCCESS, (requestId, responses) => {
	return { requestId, responses }
});

export const REQUEST_ERROR = 'REQUEST_ERROR';
export const requestError = createAction(REQUEST_ERROR, (requestId, data) => {
	return { requestId, data }
});
