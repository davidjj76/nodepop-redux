import React from 'react';
import useStoreAction from '../../../hooks/useStoreAction';
import { createAdvert } from '../../../store/actions';

import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';

function NewAdvertPage() {
  const createAdvertAction = useStoreAction(createAdvert);

  return (
    <Layout>
      <NewAdvertForm onSubmit={createAdvertAction} />
    </Layout>
  );
}

export default NewAdvertPage;
