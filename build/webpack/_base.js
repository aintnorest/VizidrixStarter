const webpack           = require('webpack');
const config            = require('../config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer      = require('autoprefixer');

const paths = config.get('utils_paths');

const webpackConfig = {
    name    : 'client',
 // target  : 'web',
    entry   : {
        app : [
            'babel-polyfill',
            paths.project(config.get('dir_src'))
        ],
        vendor : config.get('vendor_dependencies')
    },
    output : {
        filename: '[name].js',
        path:     paths.project(config.get('dir_dist'))
        //publicPath : '/'
    },
    plugins : [
        new webpack.DefinePlugin(config.get('globals')),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            template: paths.src('index.html'),
            hash:     true,
            filename: 'index.html',
            inject:   'body'
        })
    ],
    resolve : {
        extensions : ["", ".react.js", ".js", ".jsx",".style.js"],
        alias      : config.get('utils_aliases')
    },
    module : {
        loaders : [
            {
                test : /\.(js|jsx)$/,
                exclude : /node_modules/,
                loader: "babel-loader",
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'react'],
                    "env": {
                        "development": {
                            "plugins": [
                                ["react-transform", {
                                    "transforms": [
                                        {
                                            "transform": "react-transform-hmr",
                                            "imports": ["react"],
                                            "locals": ["module"]
                                        },
                                        {
                                            "transform": "react-transform-catch-errors",
                                            "imports": ["react", "redbox-react"]
                                        },
                                    ]
                                    // factoryMethods: ["React.createClass", "createClass"]
                                }]
                            ]
                        }
                    }
                },
            },
            {
                test    : /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader","css-loader","postcss-loader")
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]'
            },
            { test: /\.woff(\?.*)?$/,  loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?.*)?$/, loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2" },
            { test: /\.ttf(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?.*)?$/,   loader: "file-loader?prefix=fonts/&name=[path][name].[ext]" },
            { test: /\.svg(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml" }
        ]
    },
    postcss: [ autoprefixer({ browsers: ["ie >= 10","last 2 Chrome versions","iOS >= 7"] }), require('precss') ]
};

// NOTE: this is a temporary workaround. I don't know how to get Karma
// to include the vendor bundle that webpack creates, so to get around that
// we remove the bundle splitting when webpack is used with Karma.
// NOTE: Not using karma anymore but without this is complains of two versions of babel polyfill
const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin(
  'vendor', '[name].js'
);
commonChunkPlugin.__KARMA_IGNORE__ = true;
webpackConfig.plugins.push(commonChunkPlugin);

module.exports = webpackConfig;
