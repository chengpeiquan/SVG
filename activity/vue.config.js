const path = require("path");
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const express = require('express')
const app = express()
//  
// var singer = require('./src/assets/js/datac.json')  //本地json文件数据
// var recommend=require('./src/assets/js/datad.json')
 
var apiRoutes = express.Router();
app.use('/api',apiRoutes);

function resolve(dir){
	return path.join(__dirname, dir)
}
module.exports = {
	publicPath: "./",
	assetsDir: "static",
	productionSourceMap: false,
	lintOnSave: false,
	// pages:{
	// 	index:{
	// 		entry: 'src/page/index/main.js',
	// 		template: 'src/page/index/index.html',
	// 		filename: 'index.html',
	// 	},
	// 	index_m:{
	// 		entry: 'src/page/index_m/main.js',
	// 		template: 'src/page/index_m/index.html',
	// 		filename: 'index_m.html',
	// 	},
	// },
	chainWebpack: (config)=>{
		config.optimization.minimize(true);
		    // 分割代码
		// config.optimization.splitChunks({
		// 	chunks: 'initial',
		// })
		// config.plugins.delete('preload')
		config.resolve.alias
			.set("@", resolve("src"))
			.set("@img",resolve("src/assets/img"))
			.set("@styl",resolve("src/assets/styl"))
			.set("@js",resolve("src/assets/js"))
			.set("@lib",resolve("src/assets/js/lib"))
			.set("@cp",resolve("src/components"))
			.set("@views",resolve("src/views"))
			.end()
		config.module
			.rule("images")
				.test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
				.use("url-loader")
					.loader("url-loader")
					.options({
						limit: 10000,
						fallback: {
							loader: "file-loader",
							options: {
								name: "static/img/[name].[hash:8].[ext]"
							}
						}
					})
				.end()
	},
	 css: {
		extract: true,
        loaderOptions: {
            css: {
                // options here will be passed to css-loader
            },
            postcss: {
                // options here will be passed to postcss-loader
                // plugins: [require('postcss-px2rem')({
                //     remUnit: 75
                // })]
            }
        }
    },
	
	configureWebpack:config=>{
	    //关闭 webpack 的性能提示
	    // performance: {
		   //  hints:false
	    // }
 
	    //或者
		// config.optimization.minimize(true)
		
		if(process.env.NODE_ENV==='production'){
			return{
				plugins:[
					new CompressionWebpackPlugin({
						test:/\.js$|\.html$|\.css/,
						threshold:10240,
						deleteOriginalAssets:false
						
					})
				]
			}
		}
	    //警告 webpack 的性能提示
	    // performance: {
	    // 	hints:'warning',
	    // 	//入口起点的最大体积
	    // 	maxEntrypointSize: 50000000,
	    // 	//生成文件的最大体积
	    // 	maxAssetSize: 30000000,
	    // 	//只给出 js 文件的性能提示
	    // 	assetFilter: function(assetFilename) {
	    // 		return assetFilename.endsWith('.js');
	    // 	}
	    // }
},
 devServer: {
	 disableHostCheck: true,
	 port: 80,
	proxy: {
             "/v1": {
                    // target: "https://god.gameyw.netease.com",
					target: "https://h5api.chatbot.nie.163.com",
                    ws: true,
                    changOrigin: true,
					 pathRewrite: {
					          '^/v1': ''
					 }
                 }
            }
  }
  // devServer:{      
	 // before(app) {
  //      app.get('/api/singer', (req, res) => {
  //           res.json({              
  //               errno: 0,   // 这里是你的json内容
  //               data: singer
  //           })
  //       })
  //       app.get('/api/recommend', (req, res) => {
  //           res.json({              
  //               errno: 0,   // 这里是你的json内容
  //               data: recommend
  //           })
  //       })
  //   },
  //   open: process.platform === 'darwin',
  //   host: '0.0.0.0',
  //   port: 8080,
  //   https: false,
  //   hotOnly: false,
  //   proxy: null      //设置跨域，即将本文件内任何没有匹配到的静态文件，都指向跨域地址
  //  }
}