const glob = require('glob')
const path = require('path')
const webpack = require('webpack')

function getPageEntry (globPath) {
  const result = glob.sync(globPath)
  return result.reduce((acc, curr) => {
	const conf = require(curr)
	let paths = curr.split('/')
	paths.splice(-1)
	const app = paths.slice(-1)
	paths.push('index.js')
	return acc[app] = Object.assign({}, {entry: paths.join('/'), title: app, template: 'public/template/' + app + '.html'}, conf), acc
  }, {})
}

module.exports = {
  pages: getPageEntry('./src/views/**?/config.json'),
  configureWebpack: {
	plugins: [
	  // dllPlugin关联配置
	  new webpack.DllReferencePlugin({
		// 跟dll.config里面DllPlugin的context一致
		context: process.cwd(),

		// dll过程生成的manifest文件
		manifest: require(path.join(process.cwd(), "public", "vendor-manifest.json"))
	  })
	],
	resolve: {
	  extensions: ['.js', '.vue', '.json'],
	  alias: {
		'static': path.resolve(__dirname, 'src/assets'),
		'@': path.resolve(__dirname, 'src')
	  }
	},
  },

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px-to-viewport')({
			unitToConvert: "px",
			viewportWidth: 750,
			unitPrecision: 3,
			propList: [
			  "*"
			],
			viewportUnit: "vw",
			fontViewportUnit: "vw",
			selectorBlackList: [],
			minPixelValue: 1,
			mediaQuery: false,
			replace: true,
			exclude: /(\/|\\)(node_modules)(\/|\\)/,
		  }),
		  require('postcss-aspect-ratio-mini')(),
		  require('postcss-write-svg')({
			uft8: false
		  })
		]
	  }
	}
  },

  chainWebpack: config => {
	if (process.env.ANALYZ) {
	  config.plugin('webpack-bundle-analyzer')
		.use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
	}
  },

  devServer: {
	proxy: {
	  '/api': {
		// 跨域 API 地址
		target: 'http://172.19.0.1:3000',
		// 如果要代理 websockets
		ws: false,
		// 将主机标头的原点更改为目标URL
		changeOrigin: true,
		autoRewrite: true,
		cookieDomainRewrite: true
	  }
	}
  }
}