import { getAreTagsLoaded, getTags, getAdvert } from './selectors';

const tags = ['motor', 'mobile'];
const adverts = [{ id: '1' }];
const state = { tags, adverts: { data: adverts } };

describe('getAreTagsLoaded', () => {
  test('should return false', () => {
    const stateWithoutTags = { ...state, tags: [] };
    expect(getAreTagsLoaded(stateWithoutTags)).toBe(false);
  });

  test('should return true', () => {
    expect(getAreTagsLoaded(state)).toBe(true);
  });
});

describe('getTags', () => {
  test('should return all tags', () => {
    expect(getTags(state)).toBe(tags);
  });
});

describe('getAdvert', () => {
  test('should return advert', () => {
    expect(getAdvert(state, '1')).toBe(adverts[0]);
  });

  test('should return undefined', () => {
    expect(getAdvert(state, '2')).toBeUndefined();
  });
});
