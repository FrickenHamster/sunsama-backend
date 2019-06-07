const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: './src/index.js',
	target: 'node',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'backend.js'
	},
	externals: nodeExternals(),
	plugins: [
/*		new webpack.IgnorePlugin(/\.(css|less)$/),
		new webpack.BannerPlugin('require("source-map-support").install();',
			{ raw: true, entryOnly: false })*/
	],
	devtool: 'sourcemap',
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	},
};
