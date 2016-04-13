import {actionRequest, actionSuccess, actionError} from 'redux-reqhelper';


export const FEED_REQUEST = 'FEED_REQUEST';
export const feedRequest = actionRequest(FEED_REQUEST);

export const FEED_SUCCESS = 'FEED_SUCCESS';
export const feedSuccess = actionSuccess(FEED_SUCCESS);

export const FEED_ERROR = 'FEED_ERROR';
export const feedError = actionError(FEED_ERROR);

