const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const OfflinePlugin = require("offline-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const ENV = process.env.NODE_ENV || "development";

let entry = [path.resolve("client")];
let plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(ENV),
    },
  }),
];

const htmlPlugin = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, "client", "index.html"),
  filename: "index.html",
  inject: "body",
});

if (ENV !== "production") {
  entry = entry.concat([
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&overlay=false&reload=true",
  ]);
  plugins.unshift(htmlPlugin);
  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]);
} else {
  plugins.unshift(
    htmlPlugin,
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, "client", "images/launcher.png"),
      favicons: {
        appName: "IMPULSA Canvas",
        appDescription: "Canvas Eleitoral",
        background: "#e00a69",
        theme_color: "#e00a69",
      },
    })
  );
  plugins = plugins.concat([
    new webpack.NoEmitOnErrorsPlugin(),
    new OfflinePlugin(),
  ]);
}

module.exports = {
  mode: ENV,
  devtool: "#source-map",
  entry,
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
    },
    modules: ["client", "node_modules"],
  },
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    filename: function () {
      if (ENV == "production") {
        return "[name]-[hash].js";
      } else {
        return "[name].js";
      }
    },
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /fonts\/(.*)\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: "file-loader?name=fonts/[name].[ext]&publicPath=/",
      },
      {
        test: /\.(png|jpg|svg|gif|mp4)$/,
        use: "file-loader?name=assets/[name].[hash].[ext]&publicPath=/",
      },
    ],
  },
};
