import * as actions from './requestAction';


export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const searchRequest = actions.request(SEARCH_REQUEST);

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const searchSuccess = actions.success(SEARCH_SUCCESS);

export const SEARCH_ERROR = 'SEARCH_ERROR';
export const searchError = actions.error(SEARCH_ERROR);

