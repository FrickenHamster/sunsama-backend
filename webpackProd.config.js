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
	],
	mode: 'production',
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
