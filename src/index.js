import express from "express";
import path from "path";
import webpackConfig from "../webpack.config.js";
import "./render";

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 8000;

const app = express();

app.use("/files", express.static(path.join(__dirname, "../files")));

if (ENV !== "production") {
  const webpack = require("webpack");
  const webpackDev = require("webpack-dev-middleware");
  const webpackHot = require("webpack-hot-middleware");
  const compiler = webpack(webpackConfig);
  const history = require("connect-history-api-fallback");
  app.use(history());
  app.use(
    webpackDev(compiler, {
      logLevel: "warn",
      publicPath: webpackConfig.output.publicPath,
    })
  );
  app.use(
    webpackHot(compiler, {
      log: console.log,
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000,
    })
  );
} else {
  app.use(express.static(webpackConfig.output.path));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(webpackConfig.output.path, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
