const path = require("path");
const fs = require("fs");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

const nodeModules = {};
fs.readdirSync("node_modules")
  .filter(function (x) {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = "commonjs " + mod;
  });

module.exports = {
  mode: "production",
  entry: {
    index: "./index.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "lib"),
  },
  target: "node",
  externals: nodeModules,
  node: {
    __filename: false,
    __dirname: false,
    console: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      "./LICENSE",
      "./package.json",
      "./README.md",
      "./package-lock.json",
    ]),
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
  ],
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }],
  },
};
