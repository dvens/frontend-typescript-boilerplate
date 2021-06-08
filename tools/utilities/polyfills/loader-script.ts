import { minify } from 'terser';

const EMPTY_ENTRIES = {
    files: [],
};

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
const createPolyfillLoader = (polyfills, relativePath) => {
    if (!polyfills) return '';
    const filteredPolyfills = polyfills.filter((polyfill) => polyfill.test);

    let code = 'var polyfills = []\n';

    filteredPolyfills.forEach((polyfill) => {
        code += `if(${polyfill.test}) {
            polyfills.push(loadScript('${relativePath}${polyfill.name}.js', ${Boolean(
            polyfill.module,
        )} ) )
        }\n`;
    });

    return code;
};

const asArrayLiteral = (arr) => `[${arr.map((e) => `${JSON.stringify(e)}`).join(',')}]`;

/*
 * Creates an entry loader based upon the amount of items, it will use an foreach when there are more multiple entries.
 * Prefix from the config.legacyPrefix is being used for legacy entries.
 */
const entryLoaderCreator = (files) => {
    const generatedFiles = files.map((file) => {
        return {
            path: file.path,
            module: file.module || false,
        };
    });

    return generatedFiles.length === 1
        ? `loadScript('${generatedFiles[0].path}', ${Boolean(generatedFiles[0].module)})`
        : `${asArrayLiteral(
              generatedFiles,
          )}.forEach(function (entry) { loadScript(entry.path, entry.module); })`;
};

/**
 * Creates an function that returns a promise or single executable loadEntries fucntion.
 */
const createExecuteLoadEntries = (polyfills) => {
    if (polyfills && polyfills.length) {
        return 'polyfills.length ? Promise.all(polyfills).then(loadEntries) : loadEntries();';
    }
    return 'loadEntries()';
};

const createEntriesLoader = (config, polyfills) => {
    const { modern = EMPTY_ENTRIES, legacy = EMPTY_ENTRIES } = config;
    const loadModern = entryLoaderCreator(modern.files);
    const loadLegacy = entryLoaderCreator(legacy.files);

    const entriesTest = legacy.test
        ? `${legacy.test} ? ${loadModern} : ${loadLegacy};`
        : `${loadModern}`;

    return `
        function loadEntries() {
            ${entriesTest}
        }

        ${createExecuteLoadEntries(polyfills)}
    `;
};

const createScripts = (polyfills, config) => {
    if (polyfills.length === 0) return '';

    const filteredPolyfills = polyfills.filter((polyfill) => !polyfill.test);

    return filteredPolyfills
        .map(
            (polyfill) =>
                `<script src='${config.relativePathToPolyfills}${polyfill.name}.js' ${
                    polyfill.nomodule ? 'nomodule' : ''
                }${polyfill.module ? 'type="module"' : ''}></script>`,
        )
        .join(',');
};

/**
 * Creates a production loader script that executed immediately.
 */
const createProdLoaderScript = async (config, polyfills) => {
    const code = `
    (function () {
        ${loadScriptFunction}
        ${createPolyfillLoader(polyfills, config.relativePathToPolyfills)}
        ${createEntriesLoader(config, polyfills)}
    })();`;

    let finalizedCode = code;

    if (config.polyfills.minify) {
        const minified = await minify(code);
        finalizedCode = minified.code;
    }

    return {
        polyfillScript: createScripts(polyfills, config).replace(',', '\n'),
        code: finalizedCode,
    };
};

/**
 * Creates a development loader script that executed immediately.
 */
const createDevLoaderScript = async (config) => {
    const { modern } = config;

    let code = '';
    modern.files.forEach((file) => (code += `<script src="${file.path}"></script>`));

    return {
        code,
    };
};

export { createProdLoaderScript, createDevLoaderScript };
