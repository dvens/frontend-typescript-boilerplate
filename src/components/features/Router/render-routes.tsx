import { h } from '@atomify/jsx';

import { matcher, Params } from './matcher';
import { isValidElement, Route, RouteProps, Switch } from './Router';

export type RouteConfig = (RouteProps & {
    action?: (params?: Params) => Promise<any> | void;
})[];

export const runActionFromRoutes = (location: string, routes: RouteConfig) => {
    const matchedRoutes = routes.map((route) => {
        const match = matcher(route.path, { url: location, regex: route.regex });

        return match ? { ...route, ...match } : null;
    });

    const promises = matchedRoutes.map((route) => {
        return route && route.action ? route.action(route.params) : Promise.resolve(null);
    });

    return Promise.all(promises);
};

export const renderRoutes = (routes: RouteConfig, extraProps = {}) => {
    return routes ? (
        <Switch>
            {routes.map((route) => (
                <Route
                    {...extraProps}
                    path={route.path}
                    regex={route.regex}
                    component={route.component}
                />
            ))}
        </Switch>
    ) : null;
};
