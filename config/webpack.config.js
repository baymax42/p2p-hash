const path = require('path')
const TSLintPlugin = require('tslint-webpack-plugin')


module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    server: path.resolve(__dirname, '../src/server/main.ts'),
    p2p: path.resolve(__dirname, '../src/peer/main.ts'),
    worker: path.resolve(__dirname, '../src/worker/main.ts')
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js'
  },
  resolve: {
    // Add in `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../src/')
    ]
  },
  module: {
    rules: [{
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
        }
      ]
    }]
  },
  plugins: [
    new TSLintPlugin({
      files: ['./src/**/*.ts']
    })
  ]
}
