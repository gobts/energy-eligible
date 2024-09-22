const path = require("path");
const TsConfigPathPlugin = require("tsconfig-paths-webpack-plugin");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const nodeExternal = require("webpack-node-externals");

module.exports = {
  devtool: "source-map",
  entry: "./src/index.ts",
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
      },
      {
        test: /\.js?$/,
        use: "esbuild-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [
      new TsConfigPathPlugin({
        configFile: "./tsconfig.paths.json",
      }),
    ],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  externals: [
    nodeExternal({
      allowlist: [/\.(?!(?:.js?|.json)$).{1,5}/i],
    }),
  ],
  plugins: [
    new WebpackShellPluginNext({
      onBuildStart: {
        script: ['echo "Webpack build the project..."'],
        blocking: true,
        parallel: false,
      },
      onBuildEnd: {
        script: ['echo "The project is builded."'],
        blocking: false,
        parallel: true,
      },
    }),
  ],
};
