import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../Pages/Home';
import Appointments from '../Pages/Appointments';
import Services from '../Pages/Services';
import Clients from '../Pages/Clients';
import Pets from '../Pages/Pets';
import Settings from '../Pages/Settings';

import NotFound from '../Pages/NotFound';

import { useAuth } from '../hooks';

const PrivateRoutes = () => {
  const { isUserAdmin } = useAuth();

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/appointments" component={Appointments} />
      <Route path="/services" component={Services} />
      <Route path="/clients" component={Clients} />
      <Route path="/pets" component={Pets} />

      {isUserAdmin && <Route path="/settings" component={Settings} />}

      <Route path="/login">
        <Redirect to="/" />
      </Route>

      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default PrivateRoutes;
