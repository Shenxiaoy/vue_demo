# vue_demo

## 搭建流程

#### vue create vue_node (全局有安装vue/cli 3)

### 添加多页面打包入口
在 vue.config.js 中，添加pages属性，包含了入口js、title、模板等,详情参考vue/cli 官网配置参数[pages](https://cli.vuejs.org/zh/config/#pages)
```js
function getPageEntry (globPath) {
  const result = glob.sync(globPath)
  return result.reduce((acc, curr) => {
	const conf = require(curr)
	let paths = curr.split('/')
	paths.splice(-1)
	const app = paths.slice(-1)
	paths.push('index.js')
	return acc[app] = Object.assign({}, {entry: paths.join('/'), title: app, template: 'public/' + app + '.html'}, conf), acc
  }, {})
}

module.exports = {
  pages: getPageEntry('./src/views/**?/config.json')
}
```

-------

### 构建公共js包，加快构建速度
使用 webpack.DllPlugin  webpack.DllReferencePlugin

- 一般通过DllPlugin 去打包第三方库（node_modules）和映射文件（manifest.json)

- DllReferencePlugin 引入映射文件json，加快构建速度