import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authLogout } from '../../../store/actions';
import { getIsLogged } from '../../../store/selectors';

import { ConfirmationButton } from '../../common';

const AuthButton = () => {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();

  return isLogged ? (
    <ConfirmationButton
      confirmation="Are you sure?"
      onConfirm={() => dispatch(authLogout())}
    >
      Logout
    </ConfirmationButton>
  ) : (
    <Link to="/login">Login</Link>
  );
};

export default AuthButton;
