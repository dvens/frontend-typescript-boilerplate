import proxyContainer from './polyfill';
import { Store, StoreSettings } from './store.types';

export default function createStore<State>(settings: StoreSettings<State>): Store<State> {
    const actionsHolder = settings.actions || {};
    const observers: Array<Function> = [];

    let prevState: State = settings.initialState;

    function valueHasChanged(value: unknown, old: unknown): boolean {
        // This ensures (old==NaN, value==NaN) always returns false
        return old !== value && (old === old || value === value);
    }

    const validator = {
        set(state: State, key: any, value: any) {
            if (valueHasChanged(state[key as keyof typeof state], value)) {
                state[key as keyof typeof state] = value;
                callObservers(state, prevState);
            }

            return true;
        },
    };

    let state = proxyContainer(settings.initialState || {}, validator);

    function subscribe(observer: Function) {
        if (typeof observer !== 'function')
            new Error('You can only subscribe to Store changes with a valid function!');
        observers.push(observer);
        return true;
    }

    function dispatch(actionKey: string, payload: any) {
        const action = actionsHolder[actionKey];
        if (typeof action !== 'function') new Error(`Action "${actionKey}" doesn't exist.`);

        prevState = Object.assign({}, state);

        const newState = action(state, payload);
        state = newState;

        return true;
    }

    function callObservers(data: State, previousState: State) {
        observers.forEach(observer => observer(data, previousState));
    }

    return {
        subscribe,
        dispatch,
        getState: () => state,
        getPrevState: () => prevState,
    };
}
