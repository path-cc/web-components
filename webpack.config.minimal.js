const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = {
	entry: "./src/minimal.ts",
	mode: "production",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	experiments: {
		outputModule: true,
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		plugins: [new TsconfigPathsPlugin({ configFile: "src/tsconfig.json" })],
	},
	output: {
		filename: "minimal-bundle.js",
		path: path.resolve(__dirname, "dist"),
		globalObject: "this",
		library: {
			type: "modern-module",
		},
	},
	externalsType: 'module',
	externals: {
		react: "react", // Case matters here
		"react-dom": "react-dom", // Case matters here
	},
};
