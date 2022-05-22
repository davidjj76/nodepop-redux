import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  UI_RESET_ERROR,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERTS_LOADED_FAILURE,
  ADVERTS_CREATED_FAILURE,
  ADVERTS_CREATED_REQUEST,
  ADVERTS_CREATED_SUCCESS,
  ADVERTS_DETAIL_REQUEST,
  ADVERTS_DETAIL_SUCCESS,
  ADVERTS_DETAIL_FAILURE,
  ADVERTS_DELETED_REQUEST,
  ADVERTS_DELETED_SUCCESS,
  ADVERTS_DELETED_FAILURE,
  TAGS_LOADED,
} from './types';
import { getAdvert, getAreAdvertsLoaded, getAreTagsLoaded } from './selectors';
import { createAction } from '@reduxjs/toolkit';

const errorPrepareAction = error => ({
  payload: error,
  error: true,
});

export const authLoginRequest = createAction(AUTH_LOGIN_REQUEST);
export const authLoginSuccess = createAction(AUTH_LOGIN_SUCCESS);
export const authLoginFailure = createAction(
  AUTH_LOGIN_FAILURE,
  errorPrepareAction,
);

export function authLogin(credentials) {
  return async function (dispatch, _getState, { api, history }) {
    dispatch(authLoginRequest());
    try {
      await api.auth.login(credentials);
      dispatch(authLoginSuccess());
      const from = history.location.state?.from || '/';
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
}

export const authLogoutSuccess = createAction(AUTH_LOGOUT_SUCCESS);

export function authLogout() {
  return async function (dispatch, _getState, { api, history }) {
    await api.auth.logout();
    dispatch(authLogoutSuccess());
    history.push('/login');
  };
}

export const uiResetError = createAction(UI_RESET_ERROR);

export const advertsLoadedRequest = createAction(ADVERTS_LOADED_REQUEST);
export const advertsLoadedSuccess = createAction(ADVERTS_LOADED_SUCCESS);
export const advertsLoadedFailure = createAction(
  ADVERTS_LOADED_FAILURE,
  errorPrepareAction,
);

export const loadAdverts = () => {
  return async function (dispatch, getState, { api }) {
    if (getAreAdvertsLoaded(getState())) {
      return;
    }
    dispatch(advertsLoadedRequest());
    try {
      const adverts = await api.adverts.getAdverts();
      dispatch(advertsLoadedSuccess(adverts));
    } catch (error) {
      dispatch(advertsLoadedFailure(error));
    }
  };
};

export const advertsCreatedRequest = createAction(ADVERTS_CREATED_REQUEST);
export const advertsCreatedSuccess = createAction(ADVERTS_CREATED_SUCCESS);
export const advertsCreatedFailure = createAction(
  ADVERTS_CREATED_FAILURE,
  errorPrepareAction,
);

export const createAdvert = newAdvert => {
  return async function (dispatch, _getState, { api, history }) {
    dispatch(advertsCreatedRequest());
    try {
      const advert = await api.adverts.createAdvert(newAdvert);
      dispatch(advertsCreatedSuccess(advert));
      history.push(`/adverts/${advert.id}`);
    } catch (error) {
      dispatch(advertsCreatedFailure(error));
    }
  };
};

export const advertsDetailRequest = createAction(ADVERTS_DETAIL_REQUEST);
export const advertsDetailSuccess = createAction(ADVERTS_DETAIL_SUCCESS);
export const advertsDetailFailure = createAction(
  ADVERTS_DETAIL_FAILURE,
  errorPrepareAction,
);

export const loadAdvert = advertId => {
  return async function (dispatch, getState, { api }) {
    if (getAdvert(getState(), advertId)) {
      return;
    }
    dispatch(advertsDetailRequest());
    try {
      const advert = await api.adverts.getAdvert(advertId);
      dispatch(advertsDetailSuccess(advert));
    } catch (error) {
      dispatch(advertsDetailFailure(error));
    }
  };
};

export const advertsDeletedRequest = createAction(ADVERTS_DELETED_REQUEST);
export const advertsDeletedSuccess = createAction(ADVERTS_DELETED_SUCCESS);
export const advertsDeletedFailure = createAction(
  ADVERTS_DELETED_FAILURE,
  errorPrepareAction,
);

export const deleteAdvert = advertId => {
  return async function (dispatch, _getState, { api, history }) {
    dispatch(advertsDeletedRequest());
    try {
      await api.adverts.deleteAdvert(advertId);
      dispatch(advertsDeletedSuccess(advertId));
      history.push(`/adverts`);
    } catch (error) {
      dispatch(advertsDeletedFailure(error));
    }
  };
};

export const tagsLoaded = createAction(TAGS_LOADED);

export const loadTags = () => {
  return async function (dispatch, getState, { api }) {
    if (getAreTagsLoaded(getState())) {
      return;
    }
    const tags = await api.adverts.getTags();
    dispatch(tagsLoaded(tags));
  };
};
