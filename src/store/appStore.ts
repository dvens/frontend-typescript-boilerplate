import { createStore } from '@atomify/kit';
import { isServer } from '@atomify/shared';

export interface AppState {
    counter: {
        amount: number;
    };
}

const initialState = {
    counter: {
        amount: 0,
    },
};

const getInitialState = () => {
    if (!isServer) {
        return (window as any).__INITIAL_STATE__ || initialState;
    } else {
        return initialState;
    }
};

const actions = {
    updateCounter: (state: AppState, payload: { amount: number }) => {
        state.counter = {
            ...state.counter,
            amount: payload.amount,
        };

        return state;
    },
};

export const store = createStore<AppState>({
    initialState: getInitialState(),
    actions,
});
