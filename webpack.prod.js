const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.config");

const PATHS = {
  source: path.join(__dirname, "src"),
  dist: path.join(__dirname, "dist"),
  static: path.join(__dirname, "static")
};

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contentHash].bundle.js",
    path: PATHS.dist
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: `${PATHS.static}/index.html`,
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  plugins: [new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" })],
  module: {
    rules: [
      {
        test: /\.pcss$/i,
        include: PATHS.source,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      }
    ]
  }
});
