const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const SRC_DIR = path.resolve(__dirname, 'public');
const BUILD_DIR = path.resolve(__dirname, 'static');

module.exports = {

  entry: {
    app: [
      `${SRC_DIR}/index.js`,
    ],
  },
  output: {
    filename: 'dist.js',
    path: BUILD_DIR,
    publicPath: '',
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        include: SRC_DIR,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'font-loader?format[]=truetype&format[]=woff&format[]=embedded-opentype'],
      },
      {
        test: /\.(jpe?g|gif|svg|ai)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
          'url-loader?limit=10000',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=public/fonts/[name].[ext]',
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg|ai)$/, loader: 'url-loader?limit=100000' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules']
  },
  devtool: 'inline-sourcemap',
};
