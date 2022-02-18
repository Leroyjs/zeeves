/**
 * Webpack main config file
 */

require('handlebars-loader');
const path = require('path');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const environment = require('./environment');

const getHtmlTemplate = () => glob
  .sync('./src/pages/**/index.hbs')
  .map((file) => ({
    name: file.match(/\/pages\/(.+)\/index.hbs/)[1],
    path: file,
  }))
  .map(
    (template) => new HTMLWebpackPlugin({
      inject: true,
      hash: false,
      template: template.path,
      chunks: [template.name.toString()],
      filename: `${template.name}.html`,
      favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
    }),
  );

function getEntry() {
  const entry = {};
  glob.sync('./src/pages/**/index.js')
    .forEach((file) => {
      const name = file.match(/\/pages\/(.+)\/index.js/)[1];
      entry[name] = file;
    });
  return entry;
}

module.exports = {
  entry: getEntry(),
  output: {
    filename: 'js/[name].[contenthash].js',
    path: environment.paths.output,
  },
  module: {
    rules: [
      {
        test: /\.hbs/,
        loader: 'handlebars-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          partialDirs: [
            path.join(__dirname, '../src/partials'),
            path.join(__dirname, '../src/sections'),
          ],
          helperDirs: [
            path.join(__dirname, '../src/helpers'),
          ],
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          },
        },
        generator: {
          filename: 'images/design/[name].[hash:6][ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          },
        },
        generator: {
          filename: 'images/design/[name].[hash:6][ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new ImageMinimizerPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
          ],
        ],
      },
    }),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(environment.paths.source, 'images', 'content'),
          to: path.resolve(environment.paths.output, 'images', 'content'),
          toType: 'dir',
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
        },
        {
          from: path.resolve(environment.paths.source, 'docs'),
          to: path.resolve(environment.paths.output, 'docs'),
          toType: 'dir',
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
        },
        {
          from: path.resolve(environment.paths.source, 'seofiles'),
          to: path.resolve(environment.paths.output),
          toType: 'dir',
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
        },
      ],
    }),
  ].concat([...getHtmlTemplate()]),
  target: 'web',
};
