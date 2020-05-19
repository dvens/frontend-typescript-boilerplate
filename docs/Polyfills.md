[⟵ Back to overview](../README.md)

# Table of Contents
- [Polyfills loader](#polyfills-loader)

## Polyfills loader ##
This setup has a build in polyfills loaders to manage loading polyfills. It generates a script that loads the necessary
polyfills through feature detection. The script is being outputted within the `pages/_layouts/scripts.njk`.

The setup is loading polyfills conditionally, to make sure that only the necessary polyfills are being loaded without
including them in the main bundle.

Small example of the loader:
```javascript
<script src='/assets/js/polyfills/core-js.js' nomodule></script>
<script src='/assets/js/polyfills/regenerator-runtime.js' nomodule></script>
<script>
(function () {
    function loadScript(src, module) {
        return new Promise(function (resolve, reject) {
            document.head.appendChild(Object.assign(
                document.createElement('script'), {
                    src: src,
                    onload: resolve,
                    onerror: reject
                },
                module ? {
                    type: 'module'
                } : undefined
            ));
        });
    }
    var polyfills = []
    if (!('fetch' in window)) {
        polyfills.push(loadScript('/assets/js/polyfills/fetch.js', false))
    }

    if (!('noModule' in HTMLScriptElement.prototype) && 'getRootNode' in Element.prototype) {
        polyfills.push(loadScript('/assets/js/polyfills/custom-elements-es5-adapter.js', false))
    }

    function loadEntries() {
        'noModule' in HTMLScriptElement.prototype ? loadScript('/assets/js/main.js') : loadScript(
            '/assets/js/legacy_main.js');
    }

    polyfills.length ? Promise.all(polyfills).then(loadEntries) : loadEntries();

})();

</script>
```

## Configuration ##
The configuration can be found here `config/polyfills.js`:

__Polyfills__
The polyfills that are shipped with this setup are the following:

- [coreJs](https://github.com/zloirock/core-js)
- [regeneratorRuntime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime)
- [webcomponents](https://github.com/webcomponents/webcomponentsjs)
- [fetch](https://github.com/github/fetch)
- [intersectionObserver](https://github.com/mo/abortcontroller-polyfill)

__Adding your own polyfill__
It is also possible to add your own polyfill to the configuration you can do this by:

- `yarn add [polyfillName]`
- Include the polyfill within the `config/polyfills.js` configuration:
```javascript
const polyfills = {
    ...,
    customPolyfills: [
        {
            name: 'ie11-custom-properties', // name of the polyfill
            test:
                "(function(){var testEl=document.createElement('i');testEl.style.setProperty('--x','y');if (testEl.style.getPropertyValue('--x')==='y'||!testEl.msMatchesSelector){return false;}else{return true;}})()", // test thats being ran to test if it should be loaded
            path: require.resolve('ie11-custom-properties/ie11CustomProperties.js'), // path to the polyfill within the node_modules
        },
    ],
};
```