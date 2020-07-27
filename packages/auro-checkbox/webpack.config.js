const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  entry: {
    ['auro-checkbox__bundled']: './src/auro-checkbox.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          test: /([\\/]node_modules[\\/])/,
          name: 'polyfills',
        },
      },
    },
  },
  devServer: {
    contentBase: [path.join(__dirname, 'docs'), path.join(__dirname, 'dist')],
    compress: true,
    port: 8080
  }
};


module.exports = (env, argv) => {
  argv = argv || {};

  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    config.mode = 'development';
    config.watch = true;
  } else if (argv.env === 'debug') {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
