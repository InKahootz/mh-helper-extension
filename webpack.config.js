const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const config = require('./config/config');

const srcScripts = path.resolve(__dirname, 'src/scripts/');
const outpath = path.resolve(__dirname, 'dist/');

if (process.env.ENV == null) {
    process.env.ENV = "development";
}
const ENV = process.env.ENV;

const envConfig = config.load(ENV);
config.log(envConfig);

module.exports = {
    mode: ENV,
    devtool: ENV === "development" ? "eval-source-map" : "source-map",
    entry: {
        background: path.join(srcScripts, 'background.js'),
        content: path.join(srcScripts, 'content.js'),
        main: path.join(srcScripts, 'main.js'),
        options: path.join(srcScripts, 'options.js'),
        popup: path.join(srcScripts, 'popup.js'),
    },
    output: {
        path: outpath,
        filename: 'scripts/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        // Typescript type check and lint on separate process
        new ForkTsCheckerWebpackPlugin(),
        // Move assets to dist/
        new CopyPlugin({
            patterns: [
                {
                    from: './',
                    to: outpath,
                    globOptions: {
                        ignore: ['**/scripts'],
                    },
                    context: 'src/',
                },
            ],
        }),
        new webpack.EnvironmentPlugin({
            BACKEND_URL: envConfig.BACKEND_URL,
        }),
    ],
};
