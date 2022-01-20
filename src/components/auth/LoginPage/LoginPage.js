import React from 'react';
import { connect } from 'react-redux';
import { authLogin, uiResetError } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

import LoginForm from './LoginForm';

function LoginPage({ onLogin, loading, error, onErrorClose }) {
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

const mapStateToProps = getUi;
const mapDispatchToProps = { onLogin: authLogin, onErrorClose: uiResetError };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
