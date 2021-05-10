import webpack from 'webpack';
import { merge } from 'webpack-merge';
import { ClientBase, createClientBaseConfig } from './client.base';

const createClientDevConfig = (options: ClientBase) => {
    const baseConfig = createClientBaseConfig(options) as any;

    const devConfig = {
        plugins: [new webpack.HotModuleReplacementPlugin()],
    };

    return merge(baseConfig, devConfig);
};

export default createClientDevConfig;
