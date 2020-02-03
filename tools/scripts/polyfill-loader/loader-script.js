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
    const loadLegacy = config.legacyPrefix
        ? entryLoaderCreator(entries, config.legacyPrefix, config)
        : false;
    const entriesTest = loadLegacy
        ? `'noModule' in HTMLScriptElement.prototype ? ${load} : ${loadLegacy};`
        : `${load}`;

    return `
        function loadEntries() {
            ${entriesTest}
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

    return `${createScripts(polyfills, config).replace(
        ',',
        '\n',
    )}\n<script>${finalizedCode}</script>`;
};

module.exports = createLoaderScript;
