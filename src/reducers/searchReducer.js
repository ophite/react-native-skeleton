import * as types from '../actions/searchAction';
import {requestStarted, requestSuccess, requestError, DEFAULT_STATE} from './requestReducer';
import {handleActions} from 'redux-actions'


let searchReducer = {};
searchReducer[ types.SEARCH_REQUEST ] = requestStarted;
searchReducer[ types.SEARCH_SUCCESS ] = requestSuccess;
searchReducer[ types.SEARCH_ERROR ] = requestError;
export const search = handleActions(searchReducer, DEFAULT_STATE);
