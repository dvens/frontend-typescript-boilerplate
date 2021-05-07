import { compilerPromise, logMessage } from '../utilities/compiler-promise';
import webpack from 'webpack';

import webpackConfig from '../../webpack.config';
import chalk from 'chalk';
async function start() {
    const multiCompiler = webpack(webpackConfig);

    const clientModernCompiler = multiCompiler.compilers.find(
        (compiler) => compiler.name === 'client',
    );
    // const serverCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'server');

    const clientModernPromise = compilerPromise('client', clientModernCompiler);
    // const serverPromise = compilerPromise('server', serverCompiler);

    // serverCompiler.watch({}, (error: any, stats: any) => {
    //     if (!error && !stats.hasErrors()) {
    //         console.log(stats.toString(serverConfig.stats));
    //         return;
    //     }
    //     console.error(chalk.red(stats.compilation.errors));
    // });

    clientModernCompiler.watch({}, (error: any, stats: any) =>
        console.error(chalk.red(stats.compilation.errors)),
    );

    // wait until client and server is compiled
    try {
        await clientModernPromise;
        logMessage('Done!', 'info');
    } catch (error) {
        logMessage(error, 'error');
    }
}

export default start;
