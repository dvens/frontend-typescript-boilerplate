# Docs
- [Commands](docs/commands.md)
- [Folder structure](docs/FolderStructure.md)
- [HTML Templating - Nunjucks](docs/Templating.md)
- [Webpack](docs/Webpack.md)
- [Express](docs/Express.md)
- [Routes and static rendering](docs/Routes.md)
- [Assets](docs/Assets.md)
- [Polyfills](docs/Polyfills.md)
- [Favicons and manifest.json](docs/Favicons.md)
- [Typescript](docs/Typescript.md)
- [Web Components](docs/WebComponents.md)
- [Testing](docs/Testing.md)
- [Storybook](docs/Storybook.md)
- [Serviceworker](docs/Serviceworker.md)

# Table of Contents
1.  [Intro](#markdown-header-setup)
2.  [Getting Started](#markdown-header-getting-started)
------

# Setup #
Welcome to the readme of the Frontend setup.

This is a basic setup for creating (static) html templates and dynamic pages through [Express](https://expressjs.com/) and build on top on other tools like: [Node.js](https://nodejs.org/), [Webpack](http://webpack.github.io/) and [Browsersync](http://www.browsersync.io/).

Filled with automated tasks and configuration options through [Webpack](https://webpack.js.org/) and Node Scripts. This gives us the options to make use of [Webpacks: Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) and the same aliases through Typescript and SASS.

This setup comes with following features:
__1. Express Server for development (can be build if you want SSR in production).__

__2. Generating Static Routes (Nunjucks to HTML) and dynamic routes based upon slugs.__

__3. Hot Module Replacement for Typescript and SASS.__

__4. Dynamic polyfill loader based upon the settings (`config/polyfills.js`) and tests, this
keepsthe bundle size for the last 2 versions of every modern browser extremely low.__

__5. Auto generating and injection of favicons and manifest.json (manageable through `config/favicons.js`).__

__6. Modern and modern/legacy webpack bundle.__

__7. Auto generated Serviceworker through Workbox.__

__8. Styleguide through Storybook.__

__9. Testing with Karma and Jasmine.__

------

# Getting Started #
Use the setup following these commands.

__1. Make sure you're on the right node version. (10.x should work)__

__2. Install all the npm modules__

`yarn install`

__3. Start the project in dev mode__

`yarn start`

(See [commands](docs/Commands.md) for the full list)