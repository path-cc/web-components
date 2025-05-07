const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = {
	entry: "./src/minimal.ts",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
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
			name: "CHTCWebComponents",
			type: "umd",
		},
	},
	externals: {
		react: "React", // Case matters here
		"react-dom": "ReactDOM", // Case matters here
	},
};
