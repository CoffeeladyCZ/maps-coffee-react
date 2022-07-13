import CafeDetail from '../components/Cafe/CafeDetail';
import FormCafe from '../components/Form/FormCafe';
import Home from '../components/Home';
import AppRegistration from '../components/Registration/AppRegistration';

/**
 * Sortuje routes
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
 * @prop {boolean?} inFooter - pouziva se pro filter exportu routes pro footer, napr. navigace ve footeru - nepovinne
 * @prop {boolean?} inHeader - pouziva se pro filter exportu routes pro header, napr. navigace v headeru - nepovinne
 * @prop {JSXElement | Element | SVGElement | null} icon - muze se pouzit jako ikona pro navigaci napriklad - nepovinne
 * @prop {boolean?} disabled  - zamezí exportu routy a ta bude nedosupná - nepovinne
 * @prop {string?} additionalClass - doplňkové classy pro danou routu jako jeden string  napr.: 'class-1 class-2 ...' - nepovinne
 */

/**
 * errorRoutes
 * chybove routy
 * pole Route
 * @type {Route[]}
 */

 const errorRoutes = [
    {
        path: '*',
        label: '404',
        route: (
            <>
                <h1>404</h1>
                <div>Tato stránka neexistuje!</div>    
            </>
        ),
        order: 999999999999
    },
];

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
        additionalClass: 'app-map'
    },
    {
        exact: false,
        path: '/form',
        label: 'Formulář',
        order: 2,
        route: <FormCafe />
    },
    {
        exact: false,
        path: '/registration',
        label: 'Registrace',
        order: 3,
        route: <AppRegistration />
    },
    {
        exact: false,
        path: '/cafe/:cafename',
        label: 'Detail',
        order: 4,
        route: <CafeDetail />
    },
];

// zde se meguji a sortuji vsechn pole s routami
export const AllRoutes = sortRoutes([ ...routes, ...errorRoutes ].filter(route => !route.disabled));
// toto je treba pro navigaci v headeru
export const HeaderNavItems = AllRoutes.filter(route => route.inHeader);
// toto je treba pro navigaci ve footeru
export const FooterNavItems = AllRoutes.filter(route => route.inFooter);
