import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as reducers from './reducers';
import thunk from 'redux-thunk';

import * as auth from '../components/auth/service';
import * as adverts from '../components/adverts/service';

const api = { auth, adverts };

const configureStore = (preloadedState, { history }) => {
  const middlewares = [thunk.withExtraArgument({ api, history })];

  const store = createStore(
    combineReducers(reducers),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  return store;
};

export default configureStore;
