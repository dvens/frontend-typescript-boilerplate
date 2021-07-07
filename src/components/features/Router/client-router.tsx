import {
    Component,
    defineElement,
    FCE,
    useElement,
    useListen,
    useProp,
    useRef,
    useWatch,
} from '@atomify/hooks';
import { h, hydrate } from '@atomify/jsx';


import { useHistory } from './history';
import { Matcher, matcher } from './matcher';
import { createRouterContext, routerContext } from './Router';

import { RouteConfig } from '@components/features/Router/render-routes';

function isModifiedEvent(event: MouseEvent) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

const RouterLink = () => {
    const anchor = useElement<HTMLAnchorElement>('a');
    const { navigate } = useHistory({ base: '' });

    useListen(anchor, 'click', (event: MouseEvent) => {
        const { target, href } = anchor.current!;

        if (
            !event.defaultPrevented &&
            event.button === 0 &&
            (!target || target === '_self') &&
            !isModifiedEvent(event)
        ) {
            event.preventDefault();
            navigate(href);
        }
    });

    return null;
};

defineElement('router-link', RouterLink);

export interface RouterOutletProps extends Component {
    routes: RouteConfig;
}

const RouterOutlet: FCE<RouterOutletProps> = ({ element }) => {
    const { historyState } = useHistory({ base: '' });
    const [routes, _, watchRoutes] = useProp<RouteConfig>('routes', []);
    const routesState = useRef<RouteConfig>(routes);

    /**
     * Watch the history and update the router.
     */
    useWatch(() => {
        if (historyState.path && routesState.current.length > 1) {
            updateRouter(historyState.path);
        }
    });

    /**
     * Update localstate when routes are set.
     */
    watchRoutes((newValue) => (routesState.current = newValue));

    const updateRouter = (path: string) => {
        const routes = routesState.current;
        let isMatch: Matcher = { params: {}, url: path };

        const firstMatchedRoute = routes.find((route) => {
            const match = matcher(route.path, { url: path });
            if (route.path && match) {
                isMatch = match;
                return true;
            } else {
                return false;
            }
        });
        // TODO: add default route
        if (firstMatchedRoute && firstMatchedRoute.component! && isMatch) {
            routerContext.context = createRouterContext({
                location: path,
                currentRoute: path,
                match: isMatch.params,
            });

            const component = h(firstMatchedRoute.component, {}, null);
            component && hydrate(component, element.container);
        }
    };

    return null;
};

RouterOutlet.props = {
    routes: {
        type: Array,
    },
};

defineElement('router-outlet', RouterOutlet);

export const setClientRoutes = (routes: RouteConfig) => {
    const routerOutlet = document.querySelector('router-outlet') as RouterOutletProps;

    if (!routerOutlet) return;
    routerOutlet.componentOnReady().then(() => {
        routerOutlet.routes = routes;
    });
};
