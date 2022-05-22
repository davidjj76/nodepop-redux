import {
  advertsCreatedRequest,
  advertsCreatedSuccess,
  advertsCreatedFailure,
  loadAdverts,
} from './actions';

import {
  ADVERTS_CREATED_REQUEST,
  ADVERTS_CREATED_SUCCESS,
  ADVERTS_CREATED_FAILURE,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERTS_LOADED_FAILURE,
} from './types';

describe('advertsCreatedRequest', () => {
  test('should create an "ADVERTS_CREATED_REQUEST" action', () => {
    const expectedAction = { type: ADVERTS_CREATED_REQUEST };
    expect(advertsCreatedRequest()).toEqual(expectedAction);
  });
});

describe('advertsCreatedSuccess', () => {
  test('should create an "ADVERTS_CREATED_SUCCESS" action', () => {
    const advert = 'advert';
    const expectedAction = { type: ADVERTS_CREATED_SUCCESS, payload: advert };
    expect(advertsCreatedSuccess(advert)).toEqual(expectedAction);
  });
});

describe('advertsCreatedFailure', () => {
  test('should create an "ADVERTS_CREATED_FAILURE" action', () => {
    const error = 'error';
    const expectedAction = {
      type: ADVERTS_CREATED_FAILURE,
      payload: error,
      error: true,
    };
    expect(advertsCreatedFailure(error)).toEqual(expectedAction);
  });
});

describe('loadAdverts', () => {
  const action = loadAdverts();
  const api = {
    adverts: {},
  };

  test('when adverts are already loaded', () => {
    // mock getState to return that adverts have been loaded
    const getState = () => ({ adverts: { loaded: true } });
    const dispatch = jest.fn();
    action(dispatch, getState, { api });

    expect(dispatch).not.toHaveBeenCalled();
  });

  test('when getAdverts API call resolves', async () => {
    // mock getState to return that adverts have NOT been loaded
    const getState = () => ({ adverts: { loaded: false } });
    const dispatch = jest.fn();
    const adverts = 'adverts';

    api.adverts.getAdverts = jest.fn().mockResolvedValue(adverts);
    await action(dispatch, getState, { api });

    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ADVERTS_LOADED_REQUEST,
    });

    expect(api.adverts.getAdverts).toHaveBeenCalled();

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: ADVERTS_LOADED_SUCCESS,
      payload: adverts,
    });
  });

  test('when getAdverts API call rejects', async () => {
    // mock getState to return that adverts have NOT been loaded
    const getState = () => ({ adverts: { loaded: false } });
    const dispatch = jest.fn();
    const error = { statusCode: 401 };
    const history = { push: jest.fn() };
    api.adverts.getAdverts = jest.fn().mockRejectedValue(error);

    await action(dispatch, getState, { api, history });

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: ADVERTS_LOADED_FAILURE,
      payload: error,
      error: true,
    });
  });
});
