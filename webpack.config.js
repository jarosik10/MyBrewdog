const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    devtool: "none",
    entry: {
        main: ['./src/js/main.js', './src/js/navigation.js'],
        beerList: ['./src/js/beer-list.js', './src/js/navigation.js']
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({template: "./src/index.html", filename: 'index.html', chunks: ['main']}),
        new HtmlWebpackPlugin({template: "./src/beer-list.html", filename: 'beer-list.html', chunks: ['beerList']}),
        new MiniCssExtractPlugin({filename: "styles.css"})
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    attrs: ['img:src', 'source:srcset']
                }
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "images"  
                    },
                }
            }
        ]
    }
}