const path = require('path');
const babel = require('./webpack/loaders/babel');

const src = "./src"

module.exports = (env, argv) => {
    const mode = argv.mode || "development";
    return {
        entry: {
            lib: [`${src}/lib.js`],
            app: [`${src}/app.js`],
        },
        mode: mode,
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "./dist")
            // publicPath: '/js'
        },
        module: {
            rules: [
                babel(env, argv)
        ]}
    }
}