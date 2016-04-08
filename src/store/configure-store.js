import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import rootReducer from "../reducers";
import sagaMiddleware from 'redux-saga';
import sagas from '../sagas';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  sagaMiddleware(sagas),
  loggerMiddleware
)(createStore);

const configureStore = function (initialState: Object = {}): Function {
  return createStoreWithMiddleware(rootReducer, initialState);
};

export default configureStore;
