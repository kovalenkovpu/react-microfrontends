const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "react-mf";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "mf-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(
    defaultConfig,
    {
      plugins: [
        new HtmlWebpackPlugin({
          inject: false,
          template: "src/index.ejs",
          templateParameters: {
            isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
            orgName,
          },
        }),
        new CopyPlugin({
          patterns: [
            { from: path.resolve(__dirname, "public"), to: path.resolve(__dirname, "dist") }
          ],
        }),
      ],
    },
    {
      // modify the webpack config however you'd like to by adding to this object
    }
  );
};
