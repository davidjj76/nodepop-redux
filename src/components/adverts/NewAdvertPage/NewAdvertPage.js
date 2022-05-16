import React from 'react';
import useStoreAction from '../../../hooks/useStoreAction';
import { createAdvert } from '../../../store/actions';

import NewAdvertForm from './NewAdvertForm';

function NewAdvertPage() {
  const createAdvertAction = useStoreAction(createAdvert);

  return (
    <>
      <NewAdvertForm onSubmit={createAdvertAction} />
    </>
  );
}

export default NewAdvertPage;
