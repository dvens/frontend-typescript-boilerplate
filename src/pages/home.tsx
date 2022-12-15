import { Fragment, h } from '@atomify/jsx';

import { Button } from '@components/shared/Button';

const HomePage = () => {
    return (
        <Fragment>
            <h1>Welcome Home</h1>
            <Button>aaa</Button>
            <custom-element />
        </Fragment>
    );
};
export default HomePage;
