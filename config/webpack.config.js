const path = require('path')
const TSLintPlugin = require('tslint-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    server: path.resolve(__dirname, '../src/Server.ts'),
    worker: path.resolve(__dirname, '../src/Worker.ts'),
    peer: path.resolve(__dirname, '../src/Main.ts'),
    fileGenerator: path.resolve(__dirname, '../src/HashFileGenerator.ts')
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
