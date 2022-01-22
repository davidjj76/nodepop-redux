import { Link } from 'react-router-dom';
import useStoreAction from '../../../hooks/useStoreAction';
import useStoreData from '../../../hooks/useStoreData';
import { authLogout } from '../../../store/actions';
import { getIsLogged } from '../../../store/selectors';

import { ConfirmationButton } from '../../common';

const AuthButton = () => {
  const isLogged = useStoreData(getIsLogged);
  const authLogoutAction = useStoreAction(authLogout);

  return isLogged ? (
    <ConfirmationButton
      confirmation="Are you sure?"
      onConfirm={authLogoutAction}
    >
      Logout
    </ConfirmationButton>
  ) : (
    <Link to="/login">Login</Link>
  );
};

export default AuthButton;
