const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const {spawn} = require("child_process");

const rootFolder = process.cwd();

module.exports = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    const port = process.env.PORT;
    return {
        mode: isProduction ? 'production' : 'development',
        entry: path.join(rootFolder, 'src/renderer/index.tsx'),
        target: ['web', 'electron-renderer'],
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
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            static: {
                directory: path.join(rootFolder, 'dist/renderer'),
            },
            port: port,
            compress: true,
            hot: true,
            onBeforeSetupMiddleware() {
                console.log('Starting Main Process...');
                spawn('yarn', ['run', 'start:main'], {
                    shell: true,
                    env: process.env,
                    stdio: 'inherit',
                })
                    .on('close', (code) => process.exit(code))
                    .on('error', (spawnError) => console.error(spawnError));
            }
        }
    }
}
