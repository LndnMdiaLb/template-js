#!/usr/bin/env node

const {
  parsed: {
    webpack_port: port
  }
} = require('dotenv').config();

const http = require("http")
const express = require("express");
const app = express();
const webpack = require("webpack");

const server = http.createServer(app);

/* 
  use webpack-dev-server through the Node.js API
  generate compiler using webpack(config) 
*/

const mode = process.env.MODE || 'development';

/* functional config */
const config = require("../webpack.config.js")({}, {
  mode
});
const compiler = webpack(config);

/* middleware */
/*
    const devServerOptions = Object.assign({}, config.devServer, {
      open: true,
      stats: {
        colors: true,
      },
    });
*/

const webpackDev = require("webpack-dev-middleware")(compiler, config.devServer);
const webpackHot = require("webpack-hot-middleware")(compiler);

// /*
//   https://github.com/60frames/webpack-hot-server-middleware
// */

app.use(webpackDev);
app.use(webpackHot);

app.use(express.static("dist"));
app.listen(`${port}`, () => console.log(`port ${port}`));


/*

  two ways for webpack-dev-server hot update:

  1  webpack-dev-server, hot=true, inline=true

  2  express server: webpack-dev-middleware + webpack-hot-middleware, __webpack_hmr

        const compiler = webpack(webpackConfig);
        webpackConfig.entry.app = ['webpack-hot-middleware/client', webpackConfig.entry.app];
        const devMiddleware = require('webpack-dev-middleware')(compiler, {});
        const app = express();
        app.use(devMiddleware);
        //...

*/