import { connect } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { getIsLogged } from '../../../store/selectors';

const PrivateRoute = ({ isLogged, ...props }) => {
  const location = useLocation();

  return isLogged ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  );
};

const mapStateToProps = state => ({
  isLogged: getIsLogged(state),
});

export default connect(mapStateToProps)(PrivateRoute);
