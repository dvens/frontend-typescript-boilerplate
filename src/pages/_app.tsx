import { Fragment, h } from '@atomify/jsx';
import { Head } from '@atomify/kit';
import { config } from '@utilities/config';

const App = () => {
    return (
        <Fragment>
            <Head>{Head.renderObjectToChildren(config)}</Head>
            <div>Hello world!!</div>
            <test-button />
        </Fragment>
    );
};
export default App;
