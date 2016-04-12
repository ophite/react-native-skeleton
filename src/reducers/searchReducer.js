import * as types from '../actions/searchAction';
import * as requestReducer from './requestReducer';
import {handleActions} from 'redux-actions'


let searchReducer = {};
searchReducer[ types.SEARCH_REQUEST ] = requestReducer.requestStarted;
searchReducer[ types.SEARCH_SUCCESS ] = requestReducer.requestSuccess;
searchReducer[ types.SEARCH_ERROR ] = requestReducer.requestError;
export const search = handleActions(searchReducer, requestReducer.DEFAULT_STATE);
