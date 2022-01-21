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

function handleError(error, { history }) {
  if (error.statusCode === 401) {
    history.push('/login');
  }
  if (error.statusCode === 404) {
    history.push('/404');
  }
}

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginSuccess = () => ({
  type: AUTH_LOGIN_SUCCESS,
});

export const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});

export function authLogin(credentials) {
  return async function (dispatch, getState, { api, history }) {
    dispatch(authLoginRequest());
    try {
      await api.auth.login(credentials);
      dispatch(authLoginSuccess());
      const { from } = history.location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      handleError(error, { history });
      dispatch(authLoginFailure(error));
    }
  };
}

export const authLogoutSuccess = () => ({
  type: AUTH_LOGOUT_SUCCESS,
});

export function authLogout() {
  return async function (dispatch, getState, { api, history }) {
    await api.auth.logout();
    dispatch(authLogoutSuccess());
    history.push('/login');
  };
}

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});

export const advertsLoadedRequest = () => ({
  type: ADVERTS_LOADED_REQUEST,
});

export const advertsLoadedSuccess = adverts => ({
  type: ADVERTS_LOADED_SUCCESS,
  payload: adverts,
});

export const advertsLoadedFailure = error => ({
  type: ADVERTS_LOADED_FAILURE,
  error: true,
  payload: error,
});

export const loadAdverts = () => {
  return async function (dispatch, getState, { api, history }) {
    if (getAreAdvertsLoaded(getState())) {
      return;
    }
    dispatch(advertsLoadedRequest());
    try {
      const adverts = await api.adverts.getAdverts();
      dispatch(advertsLoadedSuccess(adverts));
    } catch (error) {
      handleError(error, { history });
      dispatch(advertsLoadedFailure(error));
    }
  };
};

export const advertsCreatedRequest = () => ({
  type: ADVERTS_CREATED_REQUEST,
});

export const advertsCreatedSuccess = advert => ({
  type: ADVERTS_CREATED_SUCCESS,
  payload: advert,
});

export const advertsCreatedFailure = error => ({
  type: ADVERTS_CREATED_FAILURE,
  error: true,
  payload: error,
});

export const createAdvert = newAdvert => {
  return async function (dispatch, getState, { api, history }) {
    dispatch(advertsCreatedRequest());
    try {
      const advert = await api.adverts.createAdvert(newAdvert);
      dispatch(advertsCreatedSuccess(advert));
      history.push(`/adverts/${advert.id}`);
    } catch (error) {
      handleError(error, { history });
      dispatch(advertsCreatedFailure(error));
    }
  };
};

export const advertsDetailRequest = () => ({
  type: ADVERTS_DETAIL_REQUEST,
});

export const advertsDetailSuccess = advert => ({
  type: ADVERTS_DETAIL_SUCCESS,
  payload: advert,
});

export const advertsDetailFailure = error => ({
  type: ADVERTS_DETAIL_FAILURE,
  error: true,
  payload: error,
});

export const loadAdvert = advertId => {
  return async function (dispatch, getState, { api, history }) {
    if (getAdvert(getState(), advertId)) {
      return;
    }
    dispatch(advertsDetailRequest());
    try {
      const advert = await api.adverts.getAdvert(advertId);
      dispatch(advertsDetailSuccess(advert));
    } catch (error) {
      handleError(error, { history });
      dispatch(advertsDetailFailure(error));
    }
  };
};

export const advertsDeletedRequest = () => ({
  type: ADVERTS_DELETED_REQUEST,
});

export const advertsDeletedSuccess = advert => ({
  type: ADVERTS_DELETED_SUCCESS,
  payload: advert,
});

export const advertsDeletedFailure = error => ({
  type: ADVERTS_DELETED_FAILURE,
  error: true,
  payload: error,
});

export const deleteAdvert = advertId => {
  return async function (dispatch, getState, { api, history }) {
    dispatch(advertsDeletedRequest());
    try {
      await api.adverts.deleteAdvert(advertId);
      dispatch(advertsDeletedSuccess(advertId));
      history.push(`/adverts`);
    } catch (error) {
      handleError(error, { history });
      dispatch(advertsDeletedFailure(error));
    }
  };
};

export const tagsLoaded = tags => ({
  type: TAGS_LOADED,
  payload: tags,
});

export const loadTags = () => {
  return async function (dispatch, getState, { api }) {
    if (getAreTagsLoaded(getState())) {
      return;
    }
    const tags = await api.adverts.getTags();
    dispatch(tagsLoaded(tags));
  };
};
