import { h } from '@atomify/jsx';
import { useParams } from '@components/features/Router/Router';

const SomeSamplePage = () => {
    const { id } = useParams();
    return <div>The id is: {id}</div>;
};
export default SomeSamplePage;
