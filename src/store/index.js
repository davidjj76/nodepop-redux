import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import * as reducers from './reducers';

import * as auth from '../components/auth/service';
import * as adverts from '../components/adverts/service';

const api = { auth, adverts };

// Middleware example: adds timestamp to every action
const timestamp = store => next => action =>
  next({
    ...action,
    meta: { ...action.meta, timestamp: new Date().getTime() },
  });

// Reducer enhancer example: for every action saves an entry in history
const actionsHistory =
  historyLength => createStore => (reducer, initialState, enhancer) => {
    const actionsHistoryReducer = ({ history, ...prevState }, action) => {
      const nextState = reducer(prevState, action);
      return {
        ...nextState,
        history: (history || [])
          .concat({ prevState, action, nextState })
          .slice(-historyLength),
      };
    };
    return createStore(actionsHistoryReducer, initialState, enhancer);
  };

const configureStore = (preloadedState, { history }) => {
  const middlewares = [
    thunk.withExtraArgument({ api, history }),
    timestamp,
    logger,
  ];

  const store = createStore(
    combineReducers(reducers),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares), actionsHistory(10)),
  );
  return store;
};

export default configureStore;
