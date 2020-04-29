const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OfflinePlugin = require("offline-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

const ENV = process.env.NODE_ENV;

const hotMiddlewareScript =
  "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true";

let entry = ["./client/index.jsx"];
let plugins = [
  new HTMLWebpackPlugin({
    template: path.resolve("client", "index.html"),
    filename: "index.html",
    inject: "body",
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(ENV),
    },
  }),
  new FaviconsWebpackPlugin({
    logo: path.resolve("client", "images/launcher.png"),
    favicons: {
      appName: "IMPULSA Canvas",
      appDescription: "Canvas Eleitoral",
      background: "#e00a69",
      theme_color: "#e00a69",
    },
  }),
];

if (ENV !== "production") {
  plugins = [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
  ];
  entry = [...entry, hotMiddlewareScript];
} else {
  plugins = [...plugins, new OfflinePlugin()];
}

module.exports = {
  devtool: "source-map",
  entry,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
    },
    modules: ["client", "node_modules"],
  },
  output: {
    path: path.resolve("public"),
    publicPath: "/",
    filename: function (...args) {
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
