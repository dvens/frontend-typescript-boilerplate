[⟵ Back to overview](../README.md)

# Table of Contents
- [Webpack](#webpack)
- [Setup](#setup)
- [Usage](#usage)
- [Browser support](#browser-support)
- [Extending configuration](#extending-configuration)

# Webpack #
This project is using a [Webpack](https://webpack.js.org/) configuration to build the project. It helps you to write modern javascript using the latest browser feature. `Webpack` is used within this project to optimize the code for production and to make sure it runs on all supported browsers.

Webpack is used here to compile CSS/SASS through PostCSS and it compiles Typescript to Javascript.

## Setup ##
The base configuration of the Webpack configuration can be found within the `webpack.config.js`. The `webpack.config.js` makes use of the development and production configuration that can be found within the `tools/webpack` folder. This is the base configuration, it is recommended to use the `webpack.config.js` to overwrite or [extend](#extending-configuration) the setup configuration.

## Usage ##
1. The `webpack.config.js` imports two configurations the `webpackProdConfig` and `webpackDevConfig`:
```javascript
const webpackProdConfig = require('./tools/webpack/webpack.prod.config');
const webpackDevConfig = require('./tools/webpack/webpack.dev.config');

const clientConfig = {
    entry: [resolveApp('src/index.ts')]
};

function getBuildOptions() {
    if (isProduction) {
        // Legacy and normal build
        return [webpackProdConfig(clientConfig, true), webpackProdConfig(clientConfig)];
    } else {
        // Normal build
        return webpackDevConfig(clientConfig);
    }
}

module.exports = getBuildOptions();
```

We run the production configuration in production mode and the development configuration in development mode (you can change if you want differently). We only run the modern build in development mode to get the fastest development experience as possible. You can use the following commands to run the project in older browsers:

```javascript
yarn build:server
yarn start:build-server
```

## Browser support ##
`webpackProdConfig` creates a single build of your app for modern browsers (by default last 2 of major browsers). This is usefull when you only need to support modern browsers.

`webpackProdConfig` support a second parameter to generate a legacy build for IE11. Additional code is being injected to run the code in IE11. Use the following configuration to run both `legacy` and `modern` build:

```javascript
const webpackProdConfig = require('./tools/webpack/webpack.prod.config');
const webpackDevConfig = require('./tools/webpack/webpack.dev.config');

const clientConfig = {
    entry: [resolveApp('src/index.ts')]
};

module.exports = [webpackProdConfig(clientConfig, true), webpackProdConfig(clientConfig)];
```

## Extending configuration ##
A webpack config is an object. To extend it recommended to use `webpack-merge`.

__Example__
```javascript
const merge = require('webpack-merge');

const legacyConfig = webpackProdConfig({
    entry: [resolveApp('src/index.ts')]
}, true)

module.exports = [merge({
    legacyConfig, {
        output: {
            path: 'dist',
        }
    }
})]
```