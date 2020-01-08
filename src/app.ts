import { Loadable } from './utilities/loadable/loadable';

Loadable({
    hook: 'counter-element',
    loader: () => import('@source/components/atoms/counter-element'),
    onLoaded: () => console.log('Counter Element loaded'),
});
