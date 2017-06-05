const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    entry: ["./app/index.jsx", "./app/style.scss"],
    output: { path: path.join(__dirname, "dist"), filename: "app.js" },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react"]
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    use: ["css-loader", "sass-loader"]
                })
            },
            {
                test: /\.png$/,
                exclude: /node_modules/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css"),
        new CopyPlugin([
            { from: "node_modules/bootstrap/dist/css/bootstrap.min.css" },
            { from: "node_modules/bootstrap/dist/js/bootstrap.min.js" },
            { from: "node_modules/jquery/dist/jquery.min.js" }
        ]),
        new HtmlPlugin({
            template: "./app/index.html"
        })
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        historyApiFallback: true,
        proxy: {
            "/api": {
                target: "http://localhost:8081",
                secure: false
            }
        }
    }
};
