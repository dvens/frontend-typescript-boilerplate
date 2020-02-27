export type keys = string[] | undefined;

export interface Store<T> {
    getState: () => T;
    getPrevState: () => T;
    subscribe: (observer: (state: T) => void, keys?: keys) => void;
    dispatch: (actionKey: string, payload?: any) => T | {};
}

export interface StoreAction<T> {
    [key: string]: (state: T | {}, payload: any) => T;
}

export interface StoreSettings<T> {
    actions?: StoreAction<T>;
    initialState: T;
}

export interface Observer {
    callback: Function;
    keys: keys;
}

export type Observers = Array<Observer>;
