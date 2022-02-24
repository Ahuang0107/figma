const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (isProd) => {
    const rootFolder = process.cwd();
    return {
        entry: path.join(rootFolder, 'src/index.tsx'),
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            fallback: {
                fs: false,
                path: require.resolve('path-browserify'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [
                        ...cssLoader(isProd),
                        ...postcssLoader(isProd),
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        ...cssLoader(isProd),
                        ...postcssLoader(isProd),
                        'less-loader',
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        ...cssLoader(isProd),
                        ...postcssLoader(isProd),
                        'sass-loader',
                    ]
                },
                {
                    test: /\.(otf|ttf|eot|woff|woff2)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[hash][ext][query]'
                    }
                },
                {
                    test: /\.(jpg|jpeg|png)$/i,
                    type: "asset/resource",
                    generator: {
                        filename: 'images/[hash][ext][query]'
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                templateContent: `
                    <html>
                      <body>
                        <div id='react-page'></div>
                      </body>
                    </html>
                  `
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].chunk.css',
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'node_modules/canvaskit-wasm/bin/canvaskit.wasm',
                        to: 'js/'
                    }
                ]
            }),
        ],
    }
}

const cssLoader = (isProd) => [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
]

const postcssLoader = (isProd) => [
    {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                    isProd && 'postcss-preset-env'
                ]
            }
        }
    }
]
