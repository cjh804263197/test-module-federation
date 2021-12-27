const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const WebpackRemoteTypesPlugin = require("webpack-remote-types-plugin").default;
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin")

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3001,
  },
  output: {
    publicPath: "auto",
  },
  // externals: {
	// 	cesium: "Cesium",
	// 	mars3d: "mars3d",
	// },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // {
      //   test: /bootstrap\.tsx$/,
      //   loader: "bundle-loader",
      //   options: {
      //     lazy: true,
      //   },
      // },
    ],
  },
  //http://localhost:3002/remoteEntry.js
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      remotes: {
        app2: `app2@${getRemoteEntryUrl(3002)}`,
        mesh: `mesh@${getRemoteEntryUrl(3000)}`
      },
      shared: ['react']
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new WebpackRemoteTypesPlugin({
      remotes: {
        app2: `app2@http:${getRemoteEntryUrl(3002)}`,
        mesh: `mesh@http:${getRemoteEntryUrl(3000)}`
      },
      outputDir: 'src/types',
      remoteFileName: '[name]-ts.tgz' // default filename is [name]-dts.tgz where [name] is the remote name, for example, `app` with the above setup
    }),
    new HtmlWebpackTagsPlugin({
			append: false,
			scripts: ["mars3d-cesium/Cesium.js", "mars3d/mars3d.js"],
			links: ["mars3d-cesium/Widgets/widgets.css", "mars3d/mars3d.css"],
			publicPath: "http://localhost:3000/",
		}),
  ],
};

function getRemoteEntryUrl(port) {
    return `//localhost:${port}/remoteEntry.js`
}
