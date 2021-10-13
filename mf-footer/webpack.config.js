const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "react-mf",
    projectName: "mf-footer",
    webpackConfigEnv,
  });

  const standalonePlugin = defaultConfig.plugins.find(
    (p) => p.constructor.name === "StandaloneSingleSpaPlugin"
  );

  standalonePlugin.options.importMapUrl = new URL(
    "http://www.react-mf.com.s3-website.eu-central-1.amazonaws.com/importmap.json"
  );

  const externals = [];

  if (webpackConfigEnv.standalone) {
    externals.push("react", "react-dom");
  }

  return merge(defaultConfig, {
    // customizations go here
    externals,
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  mode: 'local',
                  auto: true,
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
      ],
    }
  });
};
