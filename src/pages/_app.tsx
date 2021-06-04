import '@/styles/globalStyles.scss';

import { Fragment, FunctionComponent, h } from '@atomify/jsx';
import { Head } from '@atomify/kit';
import { renderRoutes } from '@components/features/Router';
import { RouteConfig } from '@components/features/Router/render-routes';
import { Link, Router } from '@components/features/Router/Router';
import { store } from '@source/store';
import { config } from '@utilities/config';

const App: FunctionComponent<{ location: string; routeConfig: RouteConfig }> = ({
    location,
    routeConfig,
}) => {
    const { counter } = store.getState();

    return (
        <Fragment>
            <Link to={'/posts/3'} staticRoutes={false}>
                To posts
            </Link>
            <Link to={'/'} staticRoutes={false}>
                To home
            </Link>
            <Head>{Head.renderObjectToChildren(config)}</Head>
            <div>Hello world {counter.amount}</div>
            <Router location={location} staticRoutes={false}>
                {renderRoutes(routeConfig)}
            </Router>
        </Fragment>
    );
};

export default App;
