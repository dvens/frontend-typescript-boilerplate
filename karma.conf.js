const configureBabelLoader = require('./tools/loaders/javascript-typescript/');
const configureCSSLoader = require('./tools/loaders/style-sass');
const SassLintPlugin = require('sass-lint-webpack');
const eslintConfig = require('./tools/loaders/eslint');

const {
    alias
} = require('./tools/utilities/get-config');

module.exports = function (config) {

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'node_modules/@babel/polyfill/dist/polyfill.js',
            'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
            'src/**/*.test.ts'
        ],


        // list of files / patterns to exclude
        exclude: ['src/**/*.stories.tsx'],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.test.ts': ['webpack']
        },

        webpack: {
            mode: 'development',
            devtool: 'inline-source-maps',
            resolve: {
                alias,
                extensions: ['.tsx', '.ts', '.js', '.jsx']
            },
            module: {
                rules: [
                    ...configureBabelLoader({
                        includedPackages: [/node_modules\/(?!@atomify)/],
                        legacy: true
                    }),
                    eslintConfig,

                    //CSS/SASS
                    ...configureCSSLoader()
                ]
            },
            plugins: [
                new SassLintPlugin()
            ]
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
