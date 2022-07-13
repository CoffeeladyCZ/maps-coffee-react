import { Route, Switch } from 'react-router-dom';
import { buildClass } from '../Utils';
import { AllRoutes } from './';

const MyRoutes = () => (
  <Switch>
    {AllRoutes.map((route, key) => (
      <Route
        render={() => {
          const routeClass = buildClass('main', route.additionalClass);
          return <section className={routeClass}>{route.route}</section>;
        }}
        key={key}
        path={route.path}
        exact={route.exact}
      />
    ))}
  </Switch>
);

export default MyRoutes;
