// webpack.config.js

const path = require('path');

module.exports = {
  entry: './src/script.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // Ensure the public path is set for the dev server
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname), // Serve from the root directory
    },
    compress: true,
    port: 9000, // You can change the port if needed
  },
};
