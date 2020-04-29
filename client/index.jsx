if (process.env.NODE_ENV != "production") {
  // Must use require here as import statements are only allowed
  // to exist at the top of a file.
  require("preact/debug");
}

import React from "react";
import ReactDom from "react-dom";

if (process.env.NODE_ENV == "production") {
  const OfflinePluginRuntime = require("offline-plugin/runtime");
  OfflinePluginRuntime.install({
    onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
    onUpdated: () => {
      window.location.reload();
    },
  });
}

import { library } from "@fortawesome/fontawesome-svg-core";
import { faFileDownload, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

library.add(faFileDownload);
library.add(faFilePdf);
library.add(faGithub);

import { BrowserRouter } from "react-router-dom";

import Application from "Application.jsx";

ReactDom.render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
  document.getElementById("app")
);
