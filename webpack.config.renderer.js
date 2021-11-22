const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    mode: "development",
    entry: path.join(__dirname, 'src/renderer/index.tsx'),
    output: {
        path: path.join(__dirname, 'dist/renderer'),
        filename: 'renderer.js',
        library: {
            type: 'umd',
        },
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        mainFiles: ["index"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    'ts-loader',
                ],
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            title: "Figma"
        }),
    ],
}
