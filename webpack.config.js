var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    devServer: {
      inline: true,
      contentBase: './build',
      //historyApiFallback: true,
      port: 3000
    },
    devtool: 'cheap-module-source-map',
    entry: __dirname + '/src/index.js',
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel-loader'],
          exclude: /node_modules/
        }
      ]
    },
    output: {
      path: __dirname + '/build',
      filename: 'js/bundle.min.js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }),
      /* UNCOMMENT FOR PRODUCTION BUILD */
      /*new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        children: true,
        async: true,
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        sourceMap: true, 
        minimize: true,
        beautify: false,
        comments: false,
        compress: {
          warnings: false, // Suppress uglification warnings
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          screw_ie8: true,
            sequences     : true,
            booleans      : true,
            loops         : true,
            unused        : true,
            warnings      : false,
            drop_console  : true
        }
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.ModuleConcatenationPlugin()*/
    ]
};
