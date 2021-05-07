import '@/styles/globalStyles.scss';

import { Fragment, h } from '@atomify/jsx';
import { Head } from '@atomify/kit';
import { store } from '@source/store';
import { config } from '@utilities/config';

const App = () => {
    const { counter } = store.getState();

    return (
        <Fragment>
            <Head>{Head.renderObjectToChildren(config)}</Head>
            <div>Hello world!! {counter.amount}</div>
            <test-button />
        </Fragment>
    );
};

export default App;
