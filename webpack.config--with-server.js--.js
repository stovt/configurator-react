const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: [
      'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
      'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
      "./code/index.js"
    ]
  },
  devtool: "inline-source-map",
  devServer: {
    port: 3000
  },
  resolve: {
    extensions: [".jsx", ".js"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "head"
    }),
    new ScriptExtHtmlWebpackPlugin({
      defer: [],
      defaultAttribute: 'defer'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: "js/bundle.min.js",
    path: path.resolve(__dirname, "src")
  }
};