/*
    babel-loader is responsible for making Javascript backwards compatible
*/

module.exports = (env, argv) => {
    // const mode = argv.mode || "development";
    return {
        use: {
            loader:'babel-loader' ,
            options: {
                presets:[
                    [ "@babel/preset-env", {
                        useBuiltIns: "usage" , // "usage" or "entry" or false
                        corejs: { version: 3, proposals: true } ,
                        targets: "last 2 versions"
                    }]
                    // , "@babel/preset-react"
                ]
                , plugins: [
                    [ "@babel/plugin-proposal-class-properties" , { loose: true } ] ,
                    [ "@babel/plugin-proposal-object-rest-spread" , { loose: true, useBuiltIns: true } ] ,
                    "@babel/plugin-syntax-dynamic-import"
                ]
            }
        },
        test: /\.m?js$/ ,
        exclude: /(node_modules|bower_components)/
    }
};