import webpack from 'webpack';
import { merge } from 'webpack-merge';
import { ClientBase, createClientBaseConfig } from './client.base';

const createClientDevConfig = (options: ClientBase) => {
    const baseConfig = createClientBaseConfig(options) as any;

    const devConfig = {
        entry: ['webpack-hot-middleware/client'],
        plugins: [new webpack.HotModuleReplacementPlugin()],
    };

    return merge(devConfig, baseConfig);
};

export default createClientDevConfig;
