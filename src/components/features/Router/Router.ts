import { ComponentChildren, Fragment, FunctionComponent, h, VNode, VnodeType } from '@atomify/jsx';

import { Matcher, matcher, MatcherRegex, Params } from './matcher';

type BuildRouterProps = {
    location: string;
    base?: string;
};

type RouterContext = {
    currentRoute: string;
    match: Params;
} & BuildRouterProps;

type RouteProps = {
    match?: Matcher;
    path: string;
    component?: VnodeType;
    regex?: MatcherRegex;
};

export type RouteComponent<P = any> = FunctionComponent<P & RouteProps>;

const routerContext: { context: RouterContext } = {
    context: {
        location: '',
        currentRoute: '',
        match: {},
    },
};

const createRouterContext = ({
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

    return staticRoutes ? h('div', {}, children) : h('router-outlet', { location }, children);
};

export const Route: RouteComponent = ({ children, match, component, path, regex }) => {
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

export function isValidElement(object: VNode) {
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
            matcher(element.props.path, { url: location, regex: element.props.regex }),
    );

    if (firstMatchedRoute) return firstMatchedRoute;

    return null;
};

export const useLocation = () => routerContext.context.location;
export const useParams = () => routerContext.context.match;
