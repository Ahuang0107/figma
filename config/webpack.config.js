const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");

const rootFolder = process.cwd();

module.exports = () => {
    const isProduction = process.env.NODE_ENV !== 'dev';
    const port = process.env.PORT;
    return {
        mode: isProduction ? 'production' : 'development',
        entry: path.join(rootFolder, 'src/renderer/index.tsx'),
        target: ['web'],
        output: {
            path: path.join(rootFolder, 'dist'),
            filename: 'index.js',
            library: {
                type: 'umd',
            },
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"],
            mainFiles: ["index"],
            fallback: {
                fs: false,
                path: require.resolve('path-browserify'),
            }
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
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    loader: 'file-loader',
                    options: {
                        name: './fonts/[name].[ext]',
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(rootFolder, 'src/index.html'),
                title: "Figma"
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {from: 'node_modules/@skeditor/canvaskit-wasm/bin/canvaskit.wasm'}
                ]
            }),
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            static: {
                directory: path.join(rootFolder, 'dist'),
            },
            port: port,
            compress: true,
            hot: true,
        },
        performance: {
            hints: false
        }
    }
}
