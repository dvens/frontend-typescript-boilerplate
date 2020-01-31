const path = require('path');
const fs = require('fs');
const Terser = require('terser');

const ensureDirectoryExistence = require('../../utilities/ensure-directory-existence');

function getPolyfills(config) {
    const polyfills = [];
    const instructions = [...(config.polyfills.customPolyfills || [])];

    if (config.polyfills.coreJs) {
        instructions.push({
            name: 'core-js',
            path: require.resolve('core-js-bundle/minified.js'),
            nomodule: true,
        });
    }

    if (config.polyfills.regeneratorRuntime) {
        instructions.push({
            name: 'regenerator-runtime',
            path: require.resolve('regenerator-runtime/runtime'),
            nomodule: true,
        });
    }

    if (config.polyfills.fetch) {
        instructions.push({
            name: 'fetch',
            test: "!('fetch' in window)",
            path: require.resolve('whatwg-fetch/dist/fetch.umd.js'),
        });
    }

    if (config.polyfills.intersectionObserver) {
        instructions.push({
            name: 'intersection-observer',
            test:
                "!('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype)",
            path: require.resolve('intersection-observer/intersection-observer.js'),
        });
    }

    if (config.polyfills.webcomponents) {
        instructions.push({
            name: 'webcomponents',
            test:
                "!('attachShadow' in Element.prototype) || !('getRootNode' in Element.prototype) || (window.ShadyDOM && window.ShadyDOM.force)",
            path: require.resolve('@webcomponents/webcomponentsjs/webcomponents-bundle.js'),
        });

        instructions.push({
            name: 'custom-elements-es5-adapter',
            test:
                "!('noModule' in HTMLScriptElement.prototype) && 'getRootNode' in Element.prototype",
            path: require.resolve('@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'),
        });
    }

    instructions.forEach(async instruction => {
        if (!instruction.name || !instruction.path) {
            throw new Error(`A polyfill should have a name and a path property.`);
        }

        const codePath = path.resolve(instruction.path);
        if (!codePath || !fs.existsSync(codePath) || !fs.statSync(codePath).isFile()) {
            throw new Error(`Could not find a file at ${instruction.path}`);
        }

        let code = fs.readFileSync(codePath, 'utf-8');

        if (!instruction.noMinify && config.polyfills.minify) {
            code = Terser.minify(code).code;
        }

        const url = `${config.clientDist}${config.polyfillOutputPath}${instruction.name}.js`;

        ensureDirectoryExistence(url);
        fs.writeFileSync(url, code);

        // Push polyfill when path and name exists.
        polyfills.push({
            name: instruction.name,
            test: instruction.test,
            nomodule: !!instruction.nomodule,
            module: !!instruction.module,
        });
    });

    return polyfills;
}

module.exports = getPolyfills;
