import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import StatsWebpackPlugin from 'stats-webpack-plugin';

export default {
  context: path.resolve(__dirname, '..'),
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name]-[hash].min.js'
  },
  resolve: {
    root: path.resolve( __dirname, '..', 'src' ),
    alias: {
      'Component': 'core/Component'
    },
    extensions: [
      '',
      '.js',
      '.jsx',
      '.json'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.html?$/,
        exclude: /node_modules/,
        loader: 'raw'
      },
      {
        test: /\.handlebars$/,
        exclude: /node_modules/,
        loader: 'handlebars'
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /node_modules/,
        loader: 'ify'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version!sass')
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "80-100", speed: 4}}'
        ]
      }
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loader: 'ify'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/template/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': JSON.stringify(false),
      '__PROD__': JSON.stringify(true)
    }),
    new webpack.ProvidePlugin({
    }),
    new CopyWebpackPlugin([
      { from: 'static' }
    ],
    { ignore: ['.DS_Store', '.keep'] }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false
        // pure_funcs: ['console.log']
      }
    }),
    new ExtractTextPlugin('[name]-[hash].min.css', { allChunks: true }),
    new CleanWebpackPlugin(['dist'], { root: path.join(__dirname, '..') }),
    new StatsWebpackPlugin('webpack.stats.json')
  ]
};