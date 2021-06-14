import { Fragment, FunctionComponent, h } from '@atomify/jsx';
import { Head } from '@atomify/kit';

const ErrorPage: FunctionComponent<{ error: string }> = ({ error }) => {
    return (
        <Fragment>
            <Head>
                <title>Internal Server Error</title>
            </Head>
            <h1>Error Page!</h1>
            <p>{error}</p>
        </Fragment>
    );
};

export default ErrorPage;
