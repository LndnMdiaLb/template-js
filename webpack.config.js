const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CommonConfigWebpackPlugin = require('common-config-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const src = "./src"

module.exports = (env, argv) => {
    const mode = argv.mode || "development";
    return {
        entry: {
            lib: ["webpack-hot-middleware/client?reload=true", `${src}/lib.js`],
            app: ["webpack-hot-middleware/client?reload=true", `${src}/app.js`],
        },
        mode: mode,
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "./dist"),
            publicPath: "/"
        },
        plugins: [
            // Cleans the dist folder before the build starts
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
                template: 'src/index.html'
            }),
        ],
        devServer: {
            contentBase: "./dist",
            publicPath: '/',
        },
    }
}