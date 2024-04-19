const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, './dist/js/'),
		filename: 'script.js',
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, './dist'),
		},
		compress: true,
		port: 5000,
	},
}
