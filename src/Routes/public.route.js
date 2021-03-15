import { Switch, Route, Redirect } from 'react-router-dom';

import LogIn from '../Pages/LogIn';

const PublicRoutes = () => (
  <Switch>
    <Route path="/login" component={LogIn} />
    <Route path="*">
      <Redirect to="/login" />
    </Route>
  </Switch>
);

export default PublicRoutes;
