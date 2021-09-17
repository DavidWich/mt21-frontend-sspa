const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "hfu-microfrontend",
    projectName: "studi-app-dashboard",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: [
      "@hfu-microfrontend/hfu-api",
      "@hfu-microfrontend/hfu-utility",
      "@hfu-microfrontend/studi-app-dashboard-bib",
      "@hfu-microfrontend/studi-app-dashboard-course",
      "@hfu-microfrontend/studi-app-dashboard-mail",
      "@hfu-microfrontend/studi-app-dashboard-news",
      "@reduxjs/toolkit",
      "i18next",
      "react",
      "react-dom",
      "react-i18next",
      "react-redux",
      "single-spa",
    ],
  });
};
