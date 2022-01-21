import client from '../../api/client';
import { withFormData } from '../../utils/converters';

const advertsPath = '/v1/adverts';

const mapAdvert = ({ photo, ...advert }) => ({
  ...advert,
  photo: photo ? `${process.env.REACT_APP_API_BASE_URL}${photo}` : null,
});

export const getTags = () => {
  return client.get(`${advertsPath}/tags`);
};

export const getAdverts = () => {
  return client.get(`${advertsPath}`).then(adverts => adverts.map(mapAdvert));
};

export const getAdvert = advertId => {
  return client.get(`${advertsPath}/${advertId}`).then(mapAdvert);
};

export const deleteAdvert = advertId => {
  return client.delete(`${advertsPath}/${advertId}`);
};

export const createAdvert = withFormData(newAdvert => {
  return client.post(advertsPath, newAdvert).then(mapAdvert);
});

// export const createAdvert = newAdvert => {
//   return client.post(advertsPath, objectToFormData(newAdvert));
// };
