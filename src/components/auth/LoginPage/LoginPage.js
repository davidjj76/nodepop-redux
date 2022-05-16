import React from 'react';
import useStoreAction from '../../../hooks/useStoreAction';
import useStoreData from '../../../hooks/useStoreData';
import { authLogin, uiResetError } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

import LoginForm from './LoginForm';

function LoginPage() {
  const { loading, error } = useStoreData(getUi);
  const onLogin = useStoreAction(authLogin);
  const onErrorClose = useStoreAction(uiResetError);
  return (
    <div>
      <LoginForm onSubmit={onLogin} />
      {loading && <p>...login in nodepop</p>}
      {error && (
        <div onClick={onErrorClose} style={{ color: 'red' }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
