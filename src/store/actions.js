import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  UI_RESET_ERROR,
  ADVERTS_CREATED_FAILURE,
  ADVERTS_CREATED_REQUEST,
  ADVERTS_CREATED_SUCCESS,
  TAGS_LOADED,
} from './types';
import { getAreTagsLoaded } from './selectors';

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
