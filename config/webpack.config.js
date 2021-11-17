const {resolve} = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/renderer",
    output: {
        path: resolve(__dirname, "../dist"),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: [".jsx", ".js"],
        mainFiles: ["index"],
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-react",
                        ],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            title: "Figma"
        }),
    ],
    devServer: {
        static: {
            directory: resolve(__dirname, "../dist"),
        },
        compress: true,
        port: 11010,
        open: true,
    }
}
