const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'ty_bundle.[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	mode: 'production',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 8000
	},
	module: {
		rules: [
			{
				test: /\.(sc|c|sa)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							sourceMap: true,
							plugins: loader => [
								require('autoprefixer')({browsers: ['> 0.15% in CN']})
							]
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css', // 设置最终输出的文件名
			chunkFilename: '[id].[hash].css'
		}),
		new HtmlWebpackPlugin({
			title: 'HtmlWebpackPlugin', // 默认值：Webpack App
			filename: 'index.html', // 默认值： 'index.html'
			template: path.resolve(__dirname, 'src/index.html'),
			minify: {
				collapseWhitespace: true, // 是否移除空格
				removeComments: true, // 是否移除注释
				removeAttributeQuotes: true // 移除属性的引号
			}
		})
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true // set to true if you want JS source maps
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	}
}