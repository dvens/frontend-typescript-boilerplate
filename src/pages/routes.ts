import { RouteConfig } from '@components/features/Router/render-routes';

import NotFoundPage from './404';
import HomePage from './home';
import SomeSamplePage from './samplePage';

export const routeConfig: RouteConfig = [
    {
        path: '/posts(/:id)(/)',
        component: SomeSamplePage,
    },
    {
        path: '/posts(/)',
        component: SomeSamplePage,
    },
    {
        path: '/',
        component: HomePage,
    },
    {
        component: NotFoundPage,
    },
];
