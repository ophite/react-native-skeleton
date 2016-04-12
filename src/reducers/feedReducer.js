import * as types from '../actions/feedAction';
import * as requestReducer from './requestReducer';
import {handleActions} from 'redux-actions';


let feedReducer = {};
feedReducer[ types.FEED_REQUEST ] = requestReducer.requestStarted;
feedReducer[ types.FEED_SUCCESS ] = requestReducer.requestSuccess;
feedReducer[ types.FEED_ERROR ] = requestReducer.requestError;
export const feed = handleActions(feedReducer, requestReducer.DEFAULT_STATE);
