const path = require('path');

module.exports = {
  entry: "./src/bundle.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: "openlearning-xapi.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
};
