const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/parser.test.ts",
  output: {
    path: path.resolve(__dirname, "__tests__"),
    filename: "test.js"
  },
  plugins: [new CleanWebpackPlugin(["__tests__"], { beforeEmit: true })],

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /fixtures\/(.*)/,
        use: "raw-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"]
  }
};
