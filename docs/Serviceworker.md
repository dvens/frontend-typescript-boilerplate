[⟵ Back to overview](../README.md)

# Table of Contents
- [Serviceworker](#serviceworker)
- [Configuration](#configuration)

## Serviceworker ##
This setup is using [Workbox](https://developers.google.com/web/tools/workbox) to generate a Serviceworker.

- The Serviceworker supports both [generateSW](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#generatesw) and [injectManifest](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#injectmanifest).
- You can choose the `injectManifest` option by setting the `config.injectManifest` to `true`. This setting can be found within the `config/config.js`.

## Configuration ##
__Default configuration__
```javascript
let defaultWorboxConfig = {
    // where to output the generated sw
    swDest: path.join(config.dist, 'sw.js'),
    // directory to match patterns against to be precached
    globDirectory: config.dist,
    // cache any html js and css by default
    globPatterns: ['**/*.{js,css,eot,ttf,woff,json}'],
    runtimeCaching: [{
        urlPattern: /\/assets\/images\//,
        handler: 'StaleWhileRevalidate'
    }],
};
```
__Extending the configuration__

You can easily change this configuration by creating a `workbox-config.js` within the root of this project.

