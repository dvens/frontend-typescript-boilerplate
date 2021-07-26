# Docs
:warning: This is still work in progress! :warning:

# Table of Contents
1.  [Setup](#setup)
2.  [Features](#features)
3.  [Getting Started](#getting-started)
3.  [Next Steps](#next-steps)
------

# Setup #
Welcome to the readme of the Frontend setup.

This is a basic setup for creating (static) html templates and dynamic pages through [Express](https://expressjs.com/) and build on top on other tools like: [Node.js](https://nodejs.org/), [Webpack](http://webpack.github.io/) and [Browsersync](http://www.browsersync.io/).

Filled with automated tasks and configuration options through [Webpack](https://webpack.js.org/) and Node Scripts. This gives us the options to make use of [Webpacks: Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) and the same aliases through Typescript and SASS.

# Features #
__1.__ Express Server for development (and for production if you want SSR).

__2.__ Routes based upon a simple static router

__3.__ Hot Module Replacement for Typescript and SASS.

__4.__ Dynamic polyfill loader based upon the settings (`config/polyfills.js`).

__5.__ Auto generating and injection of favicons and manifest.json (manageable through `config/favicons.js`) [Favicons](https://github.com/itgalaxy/favicons).

__6.__ Modern and modern/legacy webpack bundle.

__7.__ Auto generated Serviceworker through Workbox.

__8.__ Styleguide through Storybook.

__9.__ Typescript is being used within this setup. [Typescript Cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet).

__10.__ Linting: prettier, eslint and editorconfig.

------

# Getting Started #
Use the setup following these commands.

__1. Make sure you're on the right node version. (10.x should work)__

__2. Install all the npm modules__

`yarn install`

__3. Start the project in dev mode__

`yarn start`

# Next Steps
- Add testing
- Add documentation
- Fix hmr for @atomify/css (shadow dom)


Future todos
- Create export to static routes