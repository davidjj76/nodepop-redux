import React from 'react';
import { useDispatch } from 'react-redux';
import { createAdvert } from '../../../store/actions';

import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';

function NewAdvertPage() {
  const dispatch = useDispatch();

  return (
    <Layout>
      <NewAdvertForm
        onSubmit={newAdvert => dispatch(createAdvert(newAdvert))}
      />
    </Layout>
  );
}

export default NewAdvertPage;
