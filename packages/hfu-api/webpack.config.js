const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "hfu-microfrontend",
    projectName: "hfu-api",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: [
      "@hfu-microfrontend/hfu-api",
      "@hfu-microfrontend/hfu-utility",
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
