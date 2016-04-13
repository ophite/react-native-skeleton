import * as types from '../actions/feedAction';
import {reducerRequest, reducerSuccess, reducerError, DEFAULT_STATE} from 'redux-reqhelper';
import {handleActions} from 'redux-actions';


let feedReducer = {};
feedReducer[ types.FEED_REQUEST ] = reducerRequest;
feedReducer[ types.FEED_SUCCESS ] = reducerSuccess;
feedReducer[ types.FEED_ERROR ] = reducerError;
export const feed = handleActions(feedReducer, DEFAULT_STATE);
