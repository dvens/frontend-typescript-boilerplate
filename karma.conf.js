const configureBabelLoader = require('./tools/loaders/javascript-typescript/');
const configureCSSLoader = require('./tools/loaders/style-sass');
const SassLintPlugin = require('sass-lint-webpack');
const eslintConfig = require('./tools/loaders/eslint');

const {
    alias
} = require('./tools/utilities/get-config');

const path = require('path');

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
            './**/*.test.ts'
        ],


        // list of files / patterns to exclude
        exclude: ['src/**/*.stories.tsx'],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './**/*.ts': ['webpack', 'coverage'],
            './**/*.tsx': ['webpack', 'coverage'],
        },

        webpack: {
            mode: 'development',
            node: {
                fs: 'empty'
            },
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
                    ...configureCSSLoader(),
                    {
                        test: /\.ts$|\.tsx$/,
                        enforce: 'post',
                        use: {
                            loader: 'istanbul-instrumenter-loader',
                            options: {
                                esModules: true
                            }
                        },
                        exclude: /node_modules|\.test\.ts$/,
                    }
                ]
            },
            plugins: [
                new SassLintPlugin()
            ]
        },

        reporters: ['spec', 'kjhtml', 'coverage-istanbul'],

        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly', 'text-summary'],
            dir: 'coverage',
            combineBrowserReports: true,
            skipFilesWithNoCoverage: false,
            fixWebpackSourcePaths: true,
            thresholds: {
                global: {
                    statements: 80,
                    branches: 80,
                    functions: 80,
                    lines: 80,
                },
            },
        },
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
