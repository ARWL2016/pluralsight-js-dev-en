import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin'; 
import WebpackMd5Hash from 'webpack-md5-hash'; 
import ExtractTextPlugin from 'extract-text-webpack-plugin'; 

export default {
  debug: true,
  devtool: 'source-map', //larger - recommended for production
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'), //distribution
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    //Generate a seperate CSS file 
    new ExtractTextPlugin('[name].[contenthash].css'), 
    //create unique hashed file names 
    new WebpackMd5Hash(), 
    //Create a separate bundle of vendor libraries 
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }), 
    //Create HTML file with reference to bundle.js
    new HtmlWebpackPlugin({
      template: 'src/index.html', 
      inject: true //injects script tag 
    }),

    //Eliminate duplicate packages 
    new webpack.optimize.DedupePlugin(), 
    
    // Minify JS 
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        loaders: ['babel']
      },
      {
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract('css?sourceMap')
      }
    ]
  }
}
