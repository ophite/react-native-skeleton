import {actionRequest, actionSuccess, actionError} from 'redux-reqhelper';


export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const searchRequest = actionRequest(SEARCH_REQUEST);

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const searchSuccess = actionSuccess(SEARCH_SUCCESS);

export const SEARCH_ERROR = 'SEARCH_ERROR';
export const searchError = actionError(SEARCH_ERROR);

