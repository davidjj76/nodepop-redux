import React from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../../layout';
import AdvertDetail from './AdvertDetail';
import { getAdvert } from '../../../store/selectors';
import { deleteAdvert, loadAdvert } from '../../../store/actions';
import useStoreAction from '../../../hooks/useStoreAction';
import useStoreData from '../../../hooks/useStoreData';

function AdvertPage() {
  const { advertId } = useParams();
  const loadAdvertAction = useStoreAction(loadAdvert);
  const deleteAdvertAction = useStoreAction(deleteAdvert);
  const advert = useStoreData(state => getAdvert(state, advertId));

  React.useEffect(() => {
    loadAdvertAction(advertId);
  }, [loadAdvertAction, advertId]);

  const handleDelete = () => {
    deleteAdvertAction(advertId);
  };

  return (
    <Layout>
      {advert && <AdvertDetail {...advert} onDelete={handleDelete} />}
    </Layout>
  );
}

export default AdvertPage;
