const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { dependencies, devDependencies } = require('./package.json');

module.exports = {
    entry: {
    handler: './src/handler.js',
    local: './src/local.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
  },
  mode: 'production',
  target: 'node',
  node: false,
  externals: [...Object.keys(dependencies), ...Object.keys(devDependencies)],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: '12',
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
