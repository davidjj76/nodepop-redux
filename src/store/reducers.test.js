import { adverts, initialState } from './reducers';
import {
  ADVERTS_LOADED_SUCCESS,
  ADVERTS_CREATED_SUCCESS,
  ADVERTS_DELETED_SUCCESS,
} from './types';

describe('adverts', () => {
  test('should manage "ADVERTS_LOADED_SUCCESS" action', () => {
    const payload = [{ id: '3' }];
    const action = { type: ADVERTS_LOADED_SUCCESS, payload };
    const prevState = initialState.adverts;
    const expectedState = { loaded: true, data: payload };
    expect(adverts(prevState, action)).toEqual(expectedState);
  });

  test('should manage "ADVERTS_CREATED_SUCCESS" action', () => {
    const payload = { id: '3' };
    const action = { type: ADVERTS_CREATED_SUCCESS, payload };
    const prevState = initialState.adverts;
    const expectedState = { data: [payload] };
    expect(adverts(prevState, action)).toMatchObject(expectedState);
  });

  test('should manage "ADVERTS_DELETED_SUCCESS" action', () => {
    const payload = '3';
    const action = { type: ADVERTS_DELETED_SUCCESS, payload };
    const prevState = { data: [{ id: payload }] };
    const expectedState = { data: [] };
    expect(adverts(prevState, action)).toMatchObject(expectedState);
  });

  test('should manage ANY action', () => {
    const action = { type: 'ANY' };
    const prevState = initialState.adverts;
    const expectedState = prevState;
    expect(adverts(prevState, action)).toBe(expectedState);
  });
});
