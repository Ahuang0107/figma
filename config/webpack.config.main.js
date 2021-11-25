const path = require("path");

const rootFolder = process.cwd();

module.exports = {
    mode: "development",
    entry: path.join(rootFolder, 'src/main/index.ts'),
    target: 'electron-main',
    output: {
        path: path.join(rootFolder, 'dist/main'),
        filename: '[name].js',
        library: {
            type: 'commonjs2',
        },
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: [
                    'ts-loader',
                ],
            },
        ],
    },
    plugins: [],
    node: {
        __dirname: false,
        __filename: false,
    },
}
