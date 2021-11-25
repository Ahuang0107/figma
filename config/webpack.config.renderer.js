const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

const rootFolder = process.cwd();

module.exports = {
    mode: "development",
    entry: path.join(rootFolder, 'src/renderer/index.tsx'),
    output: {
        path: path.join(rootFolder, 'dist/renderer'),
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
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-react"
                            ],
                        }
                    },
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
            template: path.join(rootFolder, 'src/index.html'),
            title: "Figma"
        }),
    ],
}
