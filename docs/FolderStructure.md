[⟵ Back to overview](../README.md)

# Table of Contents
- [Public](#public)
    - [Assets](#assets)
    - [Config](#config)
    - [Server](#server)
    - [Tools](#tools)
    - [Storybook](#storybook)
    - [Templates](#templates)

- [Source](#src)
    - [Components](#components)
    - [Pages](#pages)
    - [Polyfills](#polyfills)
    - [Services](#services)
    - [Store](#store)
    - [Styles](#styles)
    - [Utilities](#utilities)
- [Build Folder](#build-folder)

# Folder Structure #

> ## Public ##

>> ### Assets ###
>> Contains all the project assets such as fonts, images and svg files. The favicons are generated through a generator named: [Favicons](https://www.npmjs.com/package/favicons). The configuration can be found here [Favicons Config](../config/favicons.js).

> ## Config ##
>> Contains all the configuration of this project like aliases, paths, copy(used by [CopyWebpackPlugin](https://webpack.js.org/plugins/copy-webpack-plugin/)), favicons, polyfills and dynamic routes.

> ## Server ##
>> Contains an [Express](https://expressjs.com/) server that gets the `Nunjucks` pages and serves them to the browser. The `Express` is mostly used during development mode because no compiling of the `Nunjucks` templates is need. It is also possible to use the `Express` in production. The server is also using a hot reload middlebare to hot reload the CSS and Javascript files (webpackHotMiddleware)[https://github.com/webpack-contrib/webpack-hot-middleware].

> ## Tools ##
>> Contains all the `Webpack` loaders and bundle tools to compile the project.

> ## Storybook ##
>> Contains the configuration for Storybook.

> ## Templates ##
>> Contains all the [Hygen](http://www.hygen.io/) generator templates.

>## Src ##

>>### Components ###
>>Contains all your project components. The setup is using the component architecture of the [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methodology.

>>### Pages ###
>>This folder is used for the default `layouts` and `pages`. The pages consist out of `JSON` files for the data and `.njk` files for the pages it self.

>>### Polyfills ###
>> This folder is being used to store or import the polyfills (Javascript import alias: `@source/polyfills`).

>>### Services ###
>> This folder is being used to store services and API utilities. (Javascript import alias: `@source/services`).

>>### Store ###
>> This folder is being used to store the stores that are using the [Store utility](../src/utilities/store/README.md) (Javascript import alias: `@source/store`).

>>### Styles ###
>>Folder with style related files. This setup supports `SASS` and `CSS` and is being bundled by [Webpack](https://webpack.js.org/) and [PostCSS](https://postcss.org/). The config can be found here: [postcss.config.js](../postcss.config.js).

>>### Utilities ###
>>Folder with base utilties. The setup has the following base utilities:
>>1. [Inview](../src/utilities/inview/README.md)
>>2. [Loadable](../src/utilities/loadable/README.md)
>>3. [Media Query](../src/utilities/media-query/README.md)
>>4. [Store](../src/utilities/store/README.md)

>## Build Folder ##
>The `build` folder is used for the build ouput of the project (development and productions builds).
