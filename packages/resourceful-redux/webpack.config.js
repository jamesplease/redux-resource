const path = require('path');
const webpack = require('webpack');

const inProduction = process.env.NODE_ENV === 'production';

const plugins = [
  // In production set the 'NODE_ENV' value to 'production'.
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(inProduction ? 'production' : 'development')
  }),

  // Minify the source code during production.
  inProduction && new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    output: {
      comments: false
    },
    compress: {
      warnings: false,
      screw_ie8: true
    }
  })
].filter(Boolean);

const min = inProduction ? '.min' : '';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: `resourceful-redux${min}.js`,
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    library: 'resourcefulRedux'
  },
  plugins,
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  devtool: 'source-map'
};
