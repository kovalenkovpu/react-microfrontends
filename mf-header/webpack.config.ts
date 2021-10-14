import { merge } from 'webpack-merge';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import singleSpaDefaults from 'webpack-config-single-spa-react-ts';
// Not sure about this declaration
import { RuntimeModule } from 'webpack';

const config = (webpackConfigEnv: Record<string, unknown>) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'react-mf',
    projectName: 'mf-header',
    webpackConfigEnv,
  });

  const standalonePlugin = defaultConfig['plugins'].find(
    (p: RuntimeModule) => p.constructor.name === 'StandaloneSingleSpaPlugin',
  );

  standalonePlugin.options.importMapUrl = new URL(
    'http://www.react-mf.com.s3-website.eu-central-1.amazonaws.com/importmap.json',
  );

  const externals = [];

  if (webpackConfigEnv.standalone) {
    externals.push('react', 'react-dom');
  }

  const scssModulesConfig = {
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
    },
  };

  return merge(defaultConfig, {
    externals,
    ...scssModulesConfig,
  });
};

export default config;
