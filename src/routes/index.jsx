import CafeDetail from '../pages/CafeDetail/CafeDetail';
import Home from '../pages/Home/Home';
import Registration from '../pages/Registration/Registration';
import Login from '../pages/Login/Login';

/**
 * Sorts routes
 *
 * @param routes Array<RouteConfig> i.e. routes
 * @param sortBy sort by named string of RouteConfig propery
 * @param sortOrder Enumerable SortOrder
 * @returns
 */
const sortRoutes = (routes, sortBy, sortOrder) => {
  const by = !sortBy || sortBy === null ? 'order' : sortBy;
  const order = !sortOrder || sortOrder === null ? 'asc' : sortOrder;
  if (order === 'asc') {
    return routes.sort((a, b) => (a[ by ] > b[ by ] ? 1 : a[ by ] === b[ by ] ? 0 : -1));
  } else if (order === 'desc') {
    return routes.sort((a, b) => (a[ by ] < b[ by ] ? 1 : a[ by ] === b[ by ] ? 0 : -1));
  }
  return routes;
};

/**
 * @typedef Route
 * @prop {boolean?} exact - ma mit exaktní path - nepovinne
 * @prop {string} path - cesta routy
 * @prop {string} label - label pro routu - da se pouzit jako title h1 atp.
 * @prop {order} number - pozice napriklad pro menu, pokud chces treba pouzit pro linky v nejake navigaci- Sortuji se dole v exportu
 * @prop {JSXElement | Element} route - Element nebo Komponent ktery se ma renderovat
/**
 * Routes
 * pole Route
 * @type {Route[]}
 */

const routes = [
  {
    exact: true,
    path: '/',
    label: 'Domů',
    order: 1,
    route: <Home />,
  },
  {
    exact: false,
    path: '/cafe/:id',
    label: 'Detail',
    order: 4,
    route: <CafeDetail />
  },
  {
    exact: false,
    path: '/registration',
    label: 'Registrace',
    order: 5,
    route: <Registration />
  },
  {
    exact: false,
    path: '/login',
    label: 'Login',
    order: 5,
    route: <Login />
  },
];

export const AllRoutes = sortRoutes(routes.filter(route => !route.disabled));

export const HeaderNavItems = AllRoutes.filter(route => route.inHeader);

export const FooterNavItems = AllRoutes.filter(route => route.inFooter);
