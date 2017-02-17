import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin'; 

export default {
  debug: true,
  devtool: 'source-map', //larger - recommended for production
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'), //distribution
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
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
        loaders: ['style','css']
      }
    ]
  }
}
