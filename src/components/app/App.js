import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NewAdvertPage from '../adverts/NewAdvertPage';
import { LoginPage, PrivateRoute } from '../auth';
import NotFoundPage from './NotFoundPage';

function App() {
  return (
    <Switch>
      <PrivateRoute exact path="/adverts/new" component={NewAdvertPage} />
      {/* <PrivateRoute exact path="/adverts/:advertId">
        <AdvertPage />
      </PrivateRoute>
      <PrivateRoute exact path="/adverts">
        <AdvertsPage />
      </PrivateRoute> */}
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/404">
        <NotFoundPage />
      </Route>
      {/* <Route exact path="/">
        <Redirect to="/adverts" />
      </Route> */}
      <Redirect to="/404" />
    </Switch>
  );
}

export default App;
