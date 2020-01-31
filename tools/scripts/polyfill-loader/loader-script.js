const Terser = require('terser');

/**
 * Loader utility thats being used to load scripts dynamically.
 */
const loadScriptFunction = `
  function loadScript(src, module) {
    return new Promise(function (resolve, reject) {
      document.head.appendChild(Object.assign(
        document.createElement('script'),
        { src: src, onload: resolve, onerror: reject },
        module ? { type: 'module' } : undefined
      ));
    });
  }`;

/**
 * Creates polyfill string with a variable where polyfills are being added when their test is valid.
 */
const createPolyfillLoader = (polyfills, config) => {
    if (!polyfills) return '';

    const filteredPolyfills = polyfills.filter(polyfill => polyfill.test);

    let code = 'var polyfills = []\n';

    filteredPolyfills.forEach(polyfill => {
        code += `if(${polyfill.test}) {
            polyfills.push(loadScript('${config.polyfillOutputPath}${polyfill.name}.js', ${Boolean(
            polyfill.module,
        )} ) )
        }\n`;
    });

    return code;
};

const asArrayLiteral = arr => `[${arr.map(e => `'${e}'`).join(',')}]`;

/*
 * Creates an entry loader based upon the amount of items, it will use an foreach when there are more multiple entries.
 * Prefix from the config.legacyPrefix is being used for legacy entries.
 */
const entryLoaderCreator = (files, prefix, config) => {
    const generatedFiles = files.map(
        file => `${config.jsOutputPath}${prefix ? prefix : ''}${file}`,
    );

    return generatedFiles.length === 1
        ? `loadScript('${generatedFiles[0]}')`
        : `${asArrayLiteral(generatedFiles)}.forEach(function (entry) { loadScript(entry); })`;
};

/**
 * Creates an function that returns a promise or single executable loadEntries fucntion.
 */
const createExecuteLoadEntries = polyfills => {
    if (polyfills && polyfills.length) {
        return 'polyfills.length ? Promise.all(polyfills).then(loadEntries) : loadEntries();';
    }
    return 'loadEntries()';
};

const createEntriesLoader = (entries, config) => {
    const load = entryLoaderCreator(entries, false, config);
    const loadLegacy = entryLoaderCreator(entries, config.legacyPrefix, config);

    return `
        function loadEntries() {
            'noModule' in HTMLScriptElement.prototype ? ${load} : ${loadLegacy};
        }

        ${createExecuteLoadEntries(entries)}
    `;
};

const createScripts = (polyfills, config) => {
    if (polyfills.length === 0) return '';

    const filteredPolyfills = polyfills.filter(polyfill => !polyfill.test);

    return filteredPolyfills
        .map(
            polyfill =>
                `<script src='${config.polyfillOutputPath}${polyfill.name}.js' ${
                    polyfill.nomodule ? 'nomodule' : ''
                }${polyfill.module ? 'type="module"' : ''}></script>`,
        )
        .join(',');
};

/**
 * Creates a loader script that executed immediately.
 */
const createLoaderScript = (entries, polyfills, config) => {
    const code = `
    (function () {
        ${loadScriptFunction}
        ${createPolyfillLoader(polyfills, config)}
        ${createEntriesLoader(entries, config)}
    })();`;

    const finalizedCode = config.polyfills.minify ? Terser.minify(code).code : code;

    return `
        ${createScripts(polyfills, config).replace(',', '\n')}\n
        <script>${finalizedCode}</script>`;
};

module.exports = createLoaderScript;

// (function () {
//     <script src='/assets/js/polyfills/core-js.js' nomodule ></script>,<script src='/assets/js/polyfills/regenerator-runtime.js' nomodule ></script>

// function loadScript(src, module) {
// return new Promise(function (resolve, reject) {
//   document.head.appendChild(Object.assign(
//     document.createElement('script'),
//     { src: src, onload: resolve, onerror: reject },
//     module ? { type: 'module' } : undefined
//   ));
// });
// }
//     var polyfills = []
// if(!('fetch' in window)) {
//         polyfills.push(loadScript('/assets/js/polyfills/fetch.js', false ) )
//     }
// if(!('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype)) {
//         polyfills.push(loadScript('/assets/js/polyfills/intersection-observer.js', false ) )
//     }
// if(!('attachShadow' in Element.prototype) || !('getRootNode' in Element.prototype) || (window.ShadyDOM && window.ShadyDOM.force)) {
//         polyfills.push(loadScript('/assets/js/polyfills/webcomponents.js', false ) )
//     }
// if(!('noModule' in HTMLScriptElement.prototype) && 'getRootNode' in Element.prototype) {
//         polyfills.push(loadScript('/assets/js/polyfills/custom-elements-es5-adapter.js', false ) )
//     }

//     function loadEntries() {
//         'noModule' in HTMLScriptElement.prototype ? loadScript('/assets/js/main.js') : loadScript('/assets/js/legacy_main.js');
//     }

//     polyfills.length ? Promise.all(polyfills).then(loadEntries) : loadEntries();

// })();

/* <script src="polyfills/core-js.577a5602a7262d6256830802d4aaab43.js" nomodule=""></script>
<script src="polyfills/regenerator-runtime.92d44da139046113cb3739b173605787.js" nomodule=""></script>
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

    var polyfills = [];
    if (!('fetch' in window)) {
        polyfills.push(loadScript('polyfills/fetch.191258a74d74243758f52065f3d0962a.js', false))
    }
    if (!('attachShadow' in Element.prototype) || !('getRootNode' in Element.prototype) || (window.ShadyDOM && window.ShadyDOM.force)) {
        polyfills.push(loadScript('polyfills/webcomponents.d406f4685fdfb412c61f23b3ae18f2dc.js', false))
    }
    if (!('noModule' in HTMLScriptElement.prototype) && 'getRootNode' in Element.prototype) {
        polyfills.push(loadScript('polyfills/custom-elements-es5-adapter.84b300ee818dce8b351c7cc7c100bcf7.js', false))
    }

    function loadEntries() {
        'noModule' in HTMLScriptElement.prototype ? loadScript('./d42f7829ce2a036a178d.js') : loadScript('./legacy/1f03ac28f0e54fbace33.js');
    }

    polyfills.length ? Promise.all(polyfills).then(loadEntries) : loadEntries();
})(); */
