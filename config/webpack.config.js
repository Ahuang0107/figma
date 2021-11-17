const {resolve} = require("path");

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
}
