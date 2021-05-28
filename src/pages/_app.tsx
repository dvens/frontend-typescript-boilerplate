import '@/styles/globalStyles.scss';

import { Fragment, h } from '@atomify/jsx';
import { Head } from '@atomify/kit';
import { Route, Router, Switch, useParams } from '@components/features/Router/Router';
import { store } from '@source/store';
import { config } from '@utilities/config';

const SomeSamplePage = () => {
    const { id } = useParams();
    return <div>The id is: {id}</div>;
};

const App = () => {
    const { counter } = store.getState();

    return (
        <Fragment>
            <Head>{Head.renderObjectToChildren(config)}</Head>
            hello world!
            <div>Hello world {counter.amount}</div>
            <Router location="/posts/1">
                <Switch>
                    <Route path={'/posts(/:id)(/)'}>
                        <SomeSamplePage />
                    </Route>
                    <Route path={'/posts(/)'}>
                        <SomeSamplePage />
                    </Route>
                </Switch>
            </Router>
            <test-button />
        </Fragment>
    );
};

export default App;
