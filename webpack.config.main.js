const path = require("path");

module.exports = {
    mode: "development",
    entry: path.join(__dirname, 'src/main/index.ts'),
    target: 'electron-main',
    output: {
        path: path.join(__dirname, 'dist/main'),
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
