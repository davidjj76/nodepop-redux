import React from 'react';

import { FormProvider } from './context';
import useForm from './useForm';

function Form({ initialValue, onSubmit, ...props }) {
  const { handleSubmit, ...form } = useForm(initialValue);
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} {...props} />
    </FormProvider>
  );
}

export default Form;
