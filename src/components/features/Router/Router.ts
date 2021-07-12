import { Fragment, FunctionComponent, h, VNode, VnodeType } from '@atomify/jsx';

import { Matcher, matcher, MatcherRegex, Params } from './matcher';

type BuildRouterProps = {
    location: string;
    base?: string;
};

type RouterContext = {
    currentRoute: string;
    match: Params;
} & BuildRouterProps;

export type RouteProps = {
    match?: Matcher;
    path?: string;
    component?: VnodeType;
    regex?: MatcherRegex;
};

export type RouteComponent<P = any> = FunctionComponent<P & RouteProps>;

export const routerContext: { context: RouterContext } = {
    context: {
        location: '',
        currentRoute: '',
        match: {},
    },
};

export const createRouterContext = ({
    location = '',
    base = '',
    match = {},
    currentRoute = '',
}: RouterContext) => ({
    location,
    base,
    match,
    currentRoute,
});

export const Router: FunctionComponent<BuildRouterProps & { staticRoutes?: boolean }> = ({
    children,
    location,
    base,
    staticRoutes = true,
}) => {
    routerContext.context = createRouterContext({ location, base, currentRoute: '', match: {} });

    return staticRoutes ? h(Fragment, {}, children) : h('router-outlet', {}, children);
};

export const Route: RouteComponent = ({ children, match, component, path, regex }) => {
    if (!path) return children;

    const { location } = routerContext.context;
    const useRouteMatch = matcher(path, { url: location, regex: regex });

    const isMatch = match || useRouteMatch;

    if (!isMatch) return null;

    routerContext.context = createRouterContext({
        location,
        currentRoute: path,
        match: isMatch.params,
    });

    if (component) return h(component, { params: isMatch.params });

    return typeof children === 'function' ? children(isMatch.params) : children;
};

export const Link: FunctionComponent<{
    to: string;
    className?: string;
    extraProps?: { [key: string]: any };
    staticRoutes?: boolean;
}> = ({ to, children, extraProps = {}, staticRoutes = true }) => {
    const staticRoute = isValidElement(children)
        ? h('a', { href: to, ...extraProps }, children)
        : h('a', { href: to, ...extraProps });

    if (staticRoutes) return staticRoute;

    return h('router-link', {}, [staticRoute]);
};

export function isValidElement(object: any) {
    return typeof object === 'object' && object !== null;
}

const flattenChildren = (children: any): any => {
    return Array.isArray(children)
        ? [].concat(...children.map((c) => flattenChildren(c)))
        : [children];
};

export const Switch: FunctionComponent = ({ children }) => {
    const location = useLocation();
    const elements: VNode<RouteProps>[] = Array.isArray(children) ? children : [children];

    const firstMatchedRoute = elements.find(
        (element) =>
            isValidElement(element) &&
            element.props.path &&
            matcher(element.props.path, { url: location, regex: element.props.regex }),
    );

    if (firstMatchedRoute) return firstMatchedRoute;

    const defaultRoute = elements.find((element) => isValidElement(element) && !element.props.path);

    if (defaultRoute && defaultRoute.props.component)
        return h(defaultRoute.props.component, {}, null);

    return null;
};

export const useLocation = () => routerContext.context.location;
export const useParams = () => routerContext.context.match;
