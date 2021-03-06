'use strict'
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Jarvis = require('webpack-jarvis')

let devConfig = {
    mode: 'development',
    // 增加映射文件 开启 js 的 source map
    devtool: 'cheap-module-eval-source-map',
    // 配置 webpack-dev-server
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        port: 8000,
        overlay: { // 出现错误或者警告的时候 是否覆盖页面线上错误消息
            warnings: true,
            errors: true
        },
        progress: true,
        publicPath: '/' // 此路径下的打包文件可在浏览器中访问
        // host: '0.0.0.0' // 手机设备通过ip访问devServer服务
    },
    watch: true,
    watchOptions: { // 监视文件相关的控制选项
        // webpack 使用文件系统(file system)获取文件改动的通知 在某些情况下 不会正常工作 
        // 例如 当使用 Network File System (NFS) 时。Vagrant 也有很多问题。
        // 在这些情况下，请使用轮询. poll: true。当然 poll也可以设置成毫秒数，比如：  poll: 1000
        poll: true,
        ignored: /node_modules/, // 忽略监控的文件夹
        aggregateTimeout: 300 // 默认值 当第一个文件更改 会在重新构建前增加延迟 将这段时间内进行的任何其他更改都聚合到一次重新构建里
    },
    plugins: [
        // 查看(patch)的依赖
        new webpack.NamedModulesPlugin(),
        // 替换插件
        new webpack.HotModuleReplacementPlugin(),
        // 打包模块报表
        // new BundleAnalyzerPlugin(),
        new Jarvis({
            // 仅监听编译阶段
            watchOnly: false,
            port: 1337 // optional: set a port
        })
    ]
}

module.exports = merge(common, devConfig)
