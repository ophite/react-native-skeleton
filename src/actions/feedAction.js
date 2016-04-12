import * as actions from './requestAction';


export const FEED_REQUEST = 'FEED_REQUEST';
export const feedRequest = actions.request(FEED_REQUEST);

export const FEED_SUCCESS = 'FEED_SUCCESS';
export const feedSuccess = actions.success(FEED_SUCCESS);

export const FEED_ERROR = 'FEED_ERROR';
export const feedError = actions.error(FEED_ERROR);

