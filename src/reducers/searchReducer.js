import * as types from '../actions/searchAction';
import {reducerRequest, reducerSuccess, reducerError, DEFAULT_STATE} from 'redux-reqhelper';
import {handleActions} from 'redux-actions'


let searchReducer = {};
searchReducer[ types.SEARCH_REQUEST ] = reducerRequest;
searchReducer[ types.SEARCH_SUCCESS ] = reducerSuccess;
searchReducer[ types.SEARCH_ERROR ] = reducerError;
export const search = handleActions(searchReducer, DEFAULT_STATE);
