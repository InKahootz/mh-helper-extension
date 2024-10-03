const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
// const RemoteDownloadFileWebpackPlugin = require('./RemoteDownloadFileWebpackPlugin.js');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
    entry: {
        background: './src/scripts/background.ts',
        'content/page-script': './src/content/page-script.ts',
        'content/relay-content-script': './src/content/relay-content-script.ts',
        // content: path.join(srcScripts, 'content.js'),
        // main: path.join(srcScripts, 'main.js'),
        // 'options/options': './src/options/options.ts',
        // 'popup/popup': './src/popup/popup.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
    },
    mode: 'development',
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
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
        plugins: [new TsconfigPathsPlugin()]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/options/options.html',
            filename: 'options/options.html',
            chunks: ['options/options'],
        }),
        // new HtmlWebpackPlugin({
        //     template: './src/popup/popup.html',
        //     filename: 'popup/popup.html',
        //     chunks: ['popup/popup'],
        // }),
        // new HtmlWebpackPlugin({
        //     template: './src/popup/popup2.html',
        //     filename: 'popup/popup2.html',
        //     chunks: ['popup/popup'],
        // }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/manifest.v3.firefox.json', to: 'manifest.json' },
                { from: './src/images', to: 'images' },
                { from: './src/css', to: 'css' },
                { from: './src/sounds', to: 'sounds' }
            ],
        })
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: './',
        //             to: path.resolve(__dirname, '../dist/'),
        //             globOptions: {
        //                 ignore: ['**/scripts'],
        //             },
        //             context: 'src/',
        //         },
        //     ],
        // }),
        // new RemoteDownloadFileWebpackPlugin([
        //     {
        //         urlPrefix:'https://raw.githubusercontent.com/MHCommunity/mh-dark-mode/main/css/',
        //         pathPrefix: 'third_party/potatosalad/css/',
        //         files: [
        //             'giftbox.css',
        //             'inbox.css',
        //             'inventory.css',
        //             'main.css',
        //             'marketplace.css',
        //             'messagebox.css',
        //             'profile.css',
        //             'scoreboard.css',
        //             'shop.css',
        //             'team.css',
        //             'trap.css',
        //             'treasuremap.css',
        //             'camp/camp.css',
        //             'camp/hud.css',
        //             'camp/journal.css',
        //         ],
        //     },
        //     {
        //         urlPrefix: 'https://cdn.jsdelivr.net/gh/tsitu/MH-Tools@master/src/bookmarklet/',
        //         pathPrefix: 'third_party/tsitu/',
        //         files: [
        //             'bm-analyzer.min.js',
        //             'bm-crafting.min.js',
        //             'bm-cre.min.js',
        //             'bm-crown.min.js',
        //             'bm-map.min.js',
        //             'bm-menu.min.js',
        //             'bm-powers.min.js',
        //             'bm-setup-fields.min.js',
        //             'bm-setup-items.min.js',
        //         ],
        //     },
        // ])
    ]
};

module.exports = config;
