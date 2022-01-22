import React from 'react';

import { useFormContext } from './context';

function Input({ component: Component = 'input', ...props }) {
  const { formValue, handleChange } = useFormContext();

  const { type, name } = props;
  const inputProps = {
    [type === 'checkbox' ? 'checked' : 'value']: formValue[name],
    onChange: handleChange,
  };

  return <Component {...inputProps} {...props} />;
}

export default Input;
