const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CommonConfigWebpackPlugin = require('common-config-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const src = "./src"

module.exports = (env, argv) => {
    const mode = argv.mode || "development";
    const isDev = mode === "development";
    const config = {
        mode: mode,
        entry: {
            /* research this 
            alt:
                require(webpack-hot-middleware/client)
                "this piece of javascript is sent down to the client to set up the websocket connection"
            */
            lib: ["webpack-hot-middleware/client?reload=true", `${src}/lib.js`],
            app: ["webpack-hot-middleware/client?reload=true", `${src}/app.js`],
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "./dist"),
            /*  root of file serving is "/"
                ex: in html src=/js/bundle.js change to "/js"
                */
            publicPath: "/"
        },
        plugins: [
            // Cleans the dist folder before the build starts
            // https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional
            new CleanWebpackPlugin(),
            // Multi threading babel loader configuration with caching for .js and .jsx files
            // Multi threading typescript loader configuration with caching for .ts and .tsx files
            // SCSS Configuration for .css .module.css and .scss .module.scss files
            // File loader configuration for .woff and .woff2 files
            // File loader configuration for .gif .jpg .jpeg .png and .svg files
            // https://github.com/namics/webpack-config-plugins/
            new CommonConfigWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            // Generate a base html file and injects all generated css and js files
            new HtmlWebpackPlugin({
                title: `trust app`,
                'meta': {
                    'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                },
                template: './src/index.html'
            }),
        ],
        devServer: {
            contentBase: "./dist",
            publicPath: '/',
            // Provides the ability to execute custom middleware after all other middleware internally within the server.
            after: function (app, server, compiler) {
                app;
                server;
                compiler
                // do fancy stuff
            }
        },
    };

    /* inline-source-map */
    if (isDev) config.devtool = 'source-map';
    return config

}