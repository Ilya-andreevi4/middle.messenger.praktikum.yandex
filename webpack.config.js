const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const PATHS = {
  source: path.join(__dirname, "src"),
  static: path.join(__dirname, "static")
};

module.exports = {
  entry: `${PATHS.source}/index.ts`,
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FaviconsWebpackPlugin({
      logo: `${PATHS.static}/favicon.svg`,
      mode: "webapp", // optional can be 'webapp', 'light' or 'auto' - 'auto' by default
      devMode: "webapp",
      prefix: "assets/favicons/",
      favicons: {
        background: "#ddd",
        theme_color: "#333"
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json")
            }
          }
        ],
        exclude: /(node_modules)/
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource"
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline"
      }
    ]
  }
};
