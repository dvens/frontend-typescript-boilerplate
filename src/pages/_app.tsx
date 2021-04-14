import { Fragment, h } from '@atomify/jsx';

const App = () => {
    return (
        <Fragment>
            <div>Hello world!</div>
            <test-button />
            <script src="/assets/js/main.js" />
        </Fragment>
    );
};

export default App;
