import '@/styles/globalStyles.scss';

import { Fragment, FunctionComponent, h } from '@atomify/jsx';
import { Head } from '@atomify/kit';
import { Link, Route, Router, Switch, useParams } from '@components/features/Router/Router';
import { store } from '@source/store';
import { config } from '@utilities/config';

const SomeSamplePage = () => {
    const { id } = useParams();
    return <div>The id is: {id}</div>;
};

const App: FunctionComponent<{ location: string }> = ({ location }) => {
    const { counter } = store.getState();

    return (
        <Fragment>
            <Link to={'/posts/3'}>To posts</Link>
            <Link to={'/'} staticRoutes={false}>
                To home
            </Link>
            <Head>{Head.renderObjectToChildren(config)}</Head>
            hello world!
            <div>Hello world {counter.amount}</div>
            <Router location={location}>
                <Switch>
                    <Route path={'/posts(/:id)(/)'}>
                        <SomeSamplePage />
                    </Route>
                    <Route path={'/posts(/)'}>
                        <SomeSamplePage />
                    </Route>
                    <Route path="/">
                        <p>Home</p>
                    </Route>
                    <Route>
                        <p>Page not found</p>
                    </Route>
                </Switch>
            </Router>
            <test-button />
        </Fragment>
    );
};

export default App;
