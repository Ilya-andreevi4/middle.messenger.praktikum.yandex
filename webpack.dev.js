const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.config");

const PATHS = {
  dist: path.join(__dirname, "dist"),
  static: path.join(__dirname, "static")
};

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: PATHS.dist
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${PATHS.static}/index.html`
    })
  ],
  module: {
    rules: [
      {
        test: /\.pcss$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8080
  }
});
