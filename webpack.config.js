var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');

const devServer = {
    contentBase: path.resolve(__dirname, './app'),
    outputPath: path.join(__dirname, './public'),
    colors: true,
    quiet: false,
    noInfo: false,
    publicPath: '/',
    historyApiFallback: false,
    host: '127.0.0.1',
    port: 8080,
    hot: true
};

module.exports = {
    entry: ['./js/helloworld.js'],
    // Output to source files after bundled
    devtool: 'source-map',
    devServer: devServer,
    output: {
        path: path.join(__dirname, '/public/'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].js'
    },
    plugins: [
        new WriteFilePlugin(),
        // output css file name when etracted with all the scss compiled
        new ExtractTextPlugin('style.css', {
            allChunks: true
        })
    ],
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            },
            {
                test: /\.css$/,
                loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
            }
        ]
    }
};
