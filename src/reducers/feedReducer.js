import * as types from '../actions/feedAction';
import {requestStarted, requestSuccess, requestError, DEFAULT_STATE} from './requestReducer';
import {handleActions} from 'redux-actions';


let feedReducer = {};
feedReducer[ types.FEED_REQUEST ] = requestStarted;
feedReducer[ types.FEED_SUCCESS ] = requestSuccess;
feedReducer[ types.FEED_ERROR ] = requestError;
export const feed = handleActions(feedReducer, DEFAULT_STATE);
