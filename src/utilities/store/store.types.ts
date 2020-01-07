export interface Store<T> {
    getState: () => T | {};
    getPrevState: () => T;
    subscribe: ( observer: ( state: T, previousState: T ) => void ) => void;
    dispatch: ( actionKey: string, payload?: any ) => T | {};
}

export interface StoreAction<T> {
    [key: string]: ( state: T | {}, payload: any ) => T;
}

export interface StoreSettings<T> {
    actions?: StoreAction<T>;
    initialState: T;
}