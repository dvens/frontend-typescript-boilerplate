import { h } from '@atomify/jsx';

import { Route, RouteProps, Switch } from './Router';

export type RouteConfig = RouteProps[];

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
