import T from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useStoreData from '../../../hooks/useStoreData';
import { getIsLogged } from '../../../store/selectors';

const RequireAuth = ({ children }) => {
  const isLogged = useStoreData(getIsLogged);
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

RequireAuth.propTypes = {
  children: T.node,
};

export default RequireAuth;
