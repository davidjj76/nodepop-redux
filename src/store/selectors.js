export const getIsLogged = state => state.auth;

export const getUi = state => state.ui;

export const getAreTagsLoaded = state => getTags(state).length > 0;
export const getTags = state => state.tags;

export const getAreAdvertsLoaded = state => state.adverts.loaded;
export const getAdverts = state => state.adverts.data;
export const getAdvert = (state, advertId) =>
  getAdverts(state).find(advert => advert.id === advertId);
