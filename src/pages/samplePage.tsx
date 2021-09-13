import { Fragment, h } from '@atomify/jsx';

import { useParams } from '@components/features/Router/Router';
import img from '@public/images/example.jpg';

const SomeSamplePage = () => {
    const { id } = useParams();
    return (
        <Fragment>
            <div>The id is: {id}</div>
            <img src={img} />
        </Fragment>
    );
};

export default SomeSamplePage;
