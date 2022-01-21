import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Layout from '../../layout';
import AdvertDetail from './AdvertDetail';
import { getAdvert } from '../../../store/selectors';
import { deleteAdvert, loadAdvert } from '../../../store/actions';

function AdvertPage() {
  const { advertId } = useParams();
  const dispatch = useDispatch();
  const advert = useSelector(state => getAdvert(state, advertId));

  React.useEffect(() => {
    dispatch(loadAdvert(advertId));
  }, [dispatch, advertId]);

  const handleDelete = () => {
    dispatch(deleteAdvert(advertId));
  };

  return (
    <Layout>
      {advert && <AdvertDetail {...advert} onDelete={handleDelete} />}
    </Layout>
  );
}

export default AdvertPage;
