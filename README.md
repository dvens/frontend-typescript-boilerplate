# Docs
- [Commands](docs/Commands.md)
- [Folder structure](docs/FolderStructure.md)
- [HTML Templating - Nunjucks](docs/Templating.md)
- [Webpack](docs/Webpack.md)
- [Routes and static rendering](docs/Routes.md)
- [Favicons and manifest.json](docs/Favicons.md)
- [Polyfills](docs/Polyfills.md)
- [Web Components](docs/WebComponents.md)
- [Testing](docs/Testing.md)
- [Storybook](docs/Storybook.md)
- [Serviceworker](docs/Serviceworker.md)
- [Generating](docs/Generating.md)
- [Utilities](docs/Utilities.md)

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

__2.__ Generating Static Routes (Nunjucks to HTML) and dynamic routes based upon slugs

__3.__ Hot Module Replacement for Typescript and SASS.

__4.__ Dynamic polyfill loader based upon the settings (`config/polyfills.js`).

__5.__ Auto generating and injection of favicons and manifest.json (manageable through `config/favicons.js`).

__6.__ Modern and modern/legacy webpack bundle.

__7.__ Auto generated Serviceworker through Workbox.

__8.__ Styleguide through Storybook.

__9.__ Testing with Karma and Jasmine.

__10.__ Typescript is being used within this setup. [Typescript Cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet).

__11.__ Linting: prettier, eslint and editorconfig.

__12.__ Auto generated favicons by using [Favicons](https://github.com/itgalaxy/favicons).å

__13.__ Code generator by using [Hygen](http://www.hygen.io/)

------

# Getting Started #
Use the setup following these commands.

__1. Make sure you're on the right node version. (10.x should work)__

__2. Install all the npm modules__

`yarn install`

__3. Start the project in dev mode__

`yarn start`

(See [commands](docs/Commands.md) for the full list)

# Next Steps #
- Add css to string option for web components
- Create static router based upon wouter/with data management fetching data based upon route
- Create export to static routes
- Add favicons
- Add polyfill loader
- Fix hmr for @atomify/css

After
- Check why ESLint is not working
- Add proper error pages for ssr.
- Add babel extend
- Fix storybook for JSX
- Fix hygen
- Check if testing is working
- Update docs
- TEST the setup :)

After testing the setup
- Create CLI to generate the setup
- Create NPM Packages out of the tools folder