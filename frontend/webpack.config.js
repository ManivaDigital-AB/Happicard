const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  devtool: "inline-source-map",
  devServer: { port: 3000, hotOnly: true, historyApiFallback: true },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    chunkFilename: "[id].js",
    publicPath: "",
  },
  resolve: {
    extensions: ['',".js", ".jsx", '.css'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,

        loader: "raw-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer", {}]],
              },
            },
          },
        ],
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
  { test: /\.png$/, loader: "url-loader?limit=100000" },
  { test: /\.jpg$/, loader: "file-loader" },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "url-loader?limit=10000&name=img/[name].[ext]",
      },
    ],
  },
  resolve: {
    mainFiles: ["index", "Index"],
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: "http://localhost:4000",
    }),
  },
};
