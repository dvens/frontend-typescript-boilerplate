[⟵ Back to overview](../README.md)

# Table of Contents
- [Commands](#commands)
- [Tasks](#tasks)
- [Options](#options)

## Commands ##
The setup makes use of Webpack and Node scripts. The Node scripts are being run by [run.js](../tools/scripts/run.js), it launches the other script with `ts-node` (e.g. `ts-node ./tools/scripts/run static`).

## Tasks ##
### `yarn start` ###
- Launches Node.js server through [Nodemon](https://nodemon.io/).
- Cleans up the output `/build` directory.
- Launches [Webpack](https://webpack.github.io/) compiler in a watch mode (via
  [webpack-middleware](../server/middleware/hotReload.ts)) and launches.
  [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement).
- Launches [Browsersync](https://browsersync.io/).

### `yarn static` (`tools/scripts/static.js`) ###
- Cleans up the output `/build` directory.
- Generates polyfills based upon the `config/polyfills.js` settings.
- Bundles SASS and Javascript through [Webpack](https://webpack.github.io/) and moves the assets that are used in Javascript and SASS into the `/build` folder.
- Generates static routes based upon the pages in `/src/pages`.
- Generates sw.js.

### `yarn build` (`tools/scripts/build.js`) ###
- Cleans up the output `/build` directory.
- Generates polyfills based upon the `config/polyfills.js` settings.
- Bundles SASS and Javascript through [Webpack](https://webpack.github.io/) and moves the assets that are used in Javascript and SASS into the `/build` folder.
- Generates sw.js.

### `yarn build:server` ###
- Runs `yarn build`
- Builds the Express server into `/build` folder through `tsc`(Typescript compiler).

### `yarn start:build-server` ###
- Runs the compiled production Express server locally.

### `yarn storybook` ###
- Runs [Storybook](https://storybook.js.org/) on port `9001`.

### `yarn storybook:build` ###
- Statically builds [Storybook](https://storybook.js.org/) to the `/build/styleguide`.

### `yarn test` ###
- Runs the test with [Karma](https://karma-runner.github.io/latest/index.html) based upon the `/karma.conf.js`.

### `yarn generate` ###
- Runs the function to generate components by using [Hygen](https://www.hygen.io/).

### `yarn favicons` ###
- Generates favicons based upon the `public/logo.png` and the `config/favicons.js` settings.


#### Options

| Flag        | Description                                                                         |
| ----------- | ----------------------------------------------------------------------------------- |
| `cross-env NODE_ENV=production` | runs the related scripts in production mode (default is development). This variable is being retrieved in `tools/utilities/get-default-mode.js`.
| `cross-env NODE_ENV ASSET_PREFIX=new_assets` | Adds a prefix to the assets paths, in CSS its used as following: without asset prefix `~@public/assets/images/logo.png -> /assets/images/logo.png, ex with asset prefix `~@public/assets/images/logo.png -> /new_assets/assets/images/logo.png