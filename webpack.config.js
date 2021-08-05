const path = require('path');
const webpack = require("webpack");

// https://github.com/namics/webpack-config-plugins/
const JSConfigWebpackPlugin = require("js-config-webpack-plugin"); 
const TSConfigWebpackPlugin = require("ts-config-webpack-plugin"); 
const SCSSConfigWebpackPlugin = require("scss-config-webpack-plugin"); 
const FontConfigWebpackPlugin = require("font-config-webpack-plugin"); 
const ImageConfigWebpackPlugin = require("image-config-webpack-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

const src = "./src"
const dist = path.resolve(__dirname, "./dist")

const fontAssets = "static/font/"
const imageAssets = "static/image/"
const fileName = '[name].[hash:8].[ext]'

const legacyFontLoader = {
    /* 
        font-config-webpack-plugin only handles woff(2) so additional loader handles other font types
    */
    test: /\.(ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/ ,
    use: [
        {
        loader: 'file-loader',
        options: {
            name: fileName,
            outputPath: fontAssets,
            esModule: false
        }
      }
    ]
};

/* 
webpack 5 config 
https://webpack.js.org/guides/asset-modules/
*/

const webpack5Loaders = [
    {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        type: 'asset/resource',
        generator: {
            filename: `${imageAssets}${fileName}`
        }
    },
    {
        test: /\.(ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules|bower_components)/ ,
        type: 'asset/resource',
        generator: {
            filename: `${fontAssets}${fileName}`
        }
    },
    {
        test: /\.(woff2?)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules|bower_components)/ ,
        type: 'asset/resource',
        generator: {
            filename: `${fontAssets}${fileName}`
        }
    }
]


module.exports = (env, argv) => {
    const mode = argv.mode || "development";
    const isDev = mode === "development";
    const config = {
        mode: mode,
        entry: {
            /*  research this 
                alt:
                    require(webpack-hot-middleware/client)
                    "this piece of javascript is sent down to the client to set up the websocket connection"
            */
            lib: [/*"webpack-hot-middleware/client?reload=true",*/ `${src}/lib.js`],
            app: [/*"webpack-hot-middleware/client?reload=true",*/ `${src}/app.js`],
        },
        output: {
            filename: "[name].js",
            path: dist,
            /*  root of file serving is "/"
                ex: in html src=/js/bundle.js change to "/js"
                */
            publicPath: "/"
        },
        module: {
            // rules: webpack5Loaders,
            /* 
                font-config-webpack-plugin only handles woff(2) so additional loader handles other font types
            */
            rules: [
                legacyFontLoader,
            ]
          },
        plugins: [
            /* */
            // Cleans the dist folder before the build starts
            // https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional
            new CleanWebpackPlugin(),
            // Multi threading babel loader configuration with caching for .js and .jsx files
            new JSConfigWebpackPlugin(),
            // Multi threading typescript loader configuration with caching for .ts and .tsx files
            new TSConfigWebpackPlugin(),
            // SCSS Configuration for .css .module.css and .scss .module.scss files
            new SCSSConfigWebpackPlugin(),
            // File loader configuration for .woff and .woff2 files
            new FontConfigWebpackPlugin({name:`${fontAssets}${fileName}`}),
            // File loader configuration for .gif .jpg .jpeg .png and .svg files
            new ImageConfigWebpackPlugin({name:`${imageAssets}${fileName}`}),
            
            new webpack.HotModuleReplacementPlugin(),
            // Generate a base html file and injects all generated css and js files
            new HtmlWebpackPlugin({
                title: `trust app`,
                'meta': {
                    'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                },
                template: `${src}/index.html`
            })
        ],
        devServer: {
            contentBase: "./dist",
            publicPath: '/',
            // writeToDisk: true,
            /*
            historyApiFallback: true,
            
            open: true,
            compress: true,
            hot: true,
            overlay: true,
            
            stats: {
                colors: true
            },
            
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            port: 8080
            },

            // Provides the ability to execute custom middleware after all other middleware internally within the server.
            after: function (app, server, compiler) {
                app;
                server;
                compiler
                // do fancy stuff
            }
            */
        },
    };

    /* inline-source-map */
    if (isDev) config.devtool = 'source-map';
    return config

}