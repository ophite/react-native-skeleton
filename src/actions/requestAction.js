import {createAction} from 'redux-actions';


export const request = (type) => createAction(type, (requestId, data) => {
	return { requestId, data }
});

export const success = (type) => createAction(type, (requestId, responses) => {
	return { requestId, responses }
});

export const error = (type) => createAction(type, (requestId, data) => {
	return { requestId, data }
});

