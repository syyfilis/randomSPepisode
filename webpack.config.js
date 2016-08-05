const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    cache: true,
    devtool: 'inline-source-map',

    entry: {
        app: path.join(__dirname, 'src', 'main.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: 'node_modules',
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    resolve: {
        root: ['src/', 'node_modules'],
        extensions: ['', '.js']
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'images'),
            to: ''
        }])
    ]
};