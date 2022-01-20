import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

const Root = ({ children, store, history }) => {
  return (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
};

export default Root;
