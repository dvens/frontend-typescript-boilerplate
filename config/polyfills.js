const polyfills = {
    coreJs: true,
    regeneratorRuntime: true,
    webcomponents: true,
    fetch: true,
    intersectionObserver: true,
    minify: true,
};

module.exports = polyfills;

// Config for the refactor
// const config = {
//     outputPath: `${config.components}/templates/scripts.tsx`,
//     modern: {
//         files: [{ path: 'main.js' }],
//     },
//     legacy: {
//         files: [
//             {
//                 test: "'noModule' in HTMLScriptElement.prototype",
//                 path: `${config.legacyPrefix}main.js`,
//             },
//         ],
//     },
//     polyfills: {
//         coreJs: true,
//         regeneratorRuntime: true,
//         webcomponents: true,
//         fetch: true,
//         intersectionObserver: true,
//         minify: true,
//     },
// };
