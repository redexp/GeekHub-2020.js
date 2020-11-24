const {resolve} = require('path');

module.exports = {
	entry: resolve(__dirname, 'src', 'index.js'),
	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},

	resolve: {
		extensions: ['.js', '.jsx'],
	},

	devServer: {
		contentBase: resolve(__dirname, 'dist'),
		compress: true,
		port: 9000
	},
};