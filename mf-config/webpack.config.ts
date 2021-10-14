import { merge } from 'webpack-merge';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import singleSpaDefaults from 'webpack-config-single-spa-ts';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';

const config = (webpackConfigEnv: Record<string, unknown>, argv: unknown) => {
  const orgName = 'react-mf';
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: 'mf-config',
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  const scssModulesConfig = {
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: 'src/index.ejs',
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            to: path.resolve(__dirname, 'dist'),
          },
        ],
      }),
    ],
  };

  return merge(defaultConfig, scssModulesConfig);
};

export default config;
