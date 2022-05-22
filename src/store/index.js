import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { errorRedirection, timestamp } from './middlewares';
import * as reducers from './reducers';

import * as auth from '../components/auth/service';
import * as adverts from '../components/adverts/service';

const api = { auth, adverts };

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

export default function customConfigureStore(preloadedState, { history }) {
  const store = configureStore({
    preloadedState,
    reducer: { ...reducers },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: { api, history },
        },
      }).concat(
        errorRedirection(history, {
          401: '/login',
          404: '/404',
        }),
        timestamp,
        logger,
      ),
    enhancers: [actionsHistory(10)],
  });
  return store;
}
