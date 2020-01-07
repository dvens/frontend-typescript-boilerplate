export interface LoadableOptions {
    hook: string;
    loader: () => Promise<any>;
    loading: Function | string;
    onError: () => void;
    onLoaded: () => void;
}

export const Loadable = (options: LoadableOptions) => {
    console.log(options);
};
