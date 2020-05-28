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

import { createBrowserHistory } from "history";

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

import { Router } from "react-router-dom";

import Application from "Application.jsx";

// GA
const gaTracking = process.env.GA_TRACKING_ID;
if (gaTracking) {
  (function (i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r;
    (i[r] =
      i[r] ||
      function () {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    "script",
    "https://www.google-analytics.com/analytics.js",
    "ga"
  );

  ga("create", gaTracking, "auto");
  ga("send", "pageview");
}

const history = createBrowserHistory();
history.listen((location) => {
  if (window.ga) {
    window.ga("set", "page", location.pathname + location.search);
    window.ga("send", "pageview");
  }
});

ReactDom.render(
  <Router history={history}>
    <Application />
  </Router>,
  document.getElementById("app")
);
