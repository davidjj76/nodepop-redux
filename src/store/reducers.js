import { createReducer } from '@reduxjs/toolkit';
import {
  advertsCreatedSuccess,
  advertsDeletedSuccess,
  advertsDetailSuccess,
  advertsLoadedSuccess,
  authLoginSuccess,
  authLogoutSuccess,
  tagsLoaded,
  uiResetError,
} from './actions';

export const initialState = {
  auth: false,
  adverts: {
    loaded: false,
    data: [],
  },
  tags: [],
  ui: {
    loading: false,
    error: null,
  },
};

export const auth = createReducer(initialState.auth, builder => {
  builder
    .addCase(authLoginSuccess, () => true)
    .addCase(authLogoutSuccess, () => false);
});

export const adverts = createReducer(initialState.adverts, builder => {
  builder
    .addCase(advertsLoadedSuccess, (_state, action) => ({
      loaded: true,
      data: action.payload,
    }))
    .addCase(advertsCreatedSuccess, (state, action) => {
      state.data.push(action.payload);
    })
    .addCase(advertsDetailSuccess, (state, action) => {
      state.data.push(action.payload);
    })
    .addCase(advertsDeletedSuccess, (state, action) => {
      state.data = state.data.filter(advert => advert.id !== action.payload);
    });
});

export const tags = createReducer(initialState.tags, builder => {
  builder.addCase(tagsLoaded, (_state, action) => action.payload);
});

const isErrorAction = action => action.error;
const isRequestAction = action => action.type.endsWith('_REQUEST');
const isSuccessAction = action => action.type.endsWith('_SUCCESS');

export const ui = createReducer(initialState.ui, builder => {
  builder
    .addCase(uiResetError, state => {
      state.error = null;
    })
    .addMatcher(isRequestAction, () => ({
      loading: true,
      error: null,
    }))
    .addMatcher(isSuccessAction, () => ({
      loading: false,
      error: null,
    }))
    .addMatcher(isErrorAction, (_state, action) => ({
      loading: false,
      error: action.payload,
    }));
});
