const webpackConfig = require('./webpack.config.js');

// Karma watches for entry points so we clear webpack entry point
webpackConfig.entry = {};

// Used for mocking
webpackConfig.module.loaders[0].query = {plugins: ['babel-plugin-rewire']};

// Make sourcemaps work in test results
webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        webpack: webpackConfig,
        files: ['./node_modules/promise-polyfill/promise.js', 'test/bundle.js'],
        preprocessors: {
            'test/bundle.js': ['webpack', 'sourcemap']
        },
        reporters: ['progress', 'jasmine-diff'],

        // keeps webpack from spamming the console, shows only warnings and errors
        webpackMiddleware: {
            noInfo: true
        },
        jasmineDiffReporter: {
            pretty: 4 // Indent the data structure with 4-space steps
        }
    });
};
