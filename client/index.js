import React from "react";
import ReactDom from "react-dom";

if (process.env.NODE_ENV == "production") {
  const OfflinePluginRuntime = require("offline-plugin/runtime");
  OfflinePluginRuntime.install({
    onUpdating: () => {
      console.log("SW Event:", "onUpdating");
    },
    onUpdateReady: () => {
      console.log("SW Event:", "onUpdateReady");
      // Tells to new SW to take control immediately
      OfflinePluginRuntime.applyUpdate();
    },
    onUpdated: () => {
      console.log("SW Event:", "onUpdated");
      // Reload the webpage to load into the new version
      window.location.reload();
    },

    onUpdateFailed: () => {
      console.log("SW Event:", "onUpdateFailed");
    },
  });
}

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faFileDownload,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

library.add(faBars);
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
