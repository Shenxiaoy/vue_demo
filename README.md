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

-----------------------

## 使用postcss 的插件来做兼容适配处理
- postcss-import           vue/cli已默认安装
- postcss-url              vue/cli已默认安装
- postcss-aspect-ratio-mini
- postcss-write-svg
- postcss-cssnext          该插件可以让我们使用CSS未来的特性，其会对这些特性做相关的兼容性处理
- autoprefixer             vue/cli已默认安装
- postcss-px-to-viewport
- cssnano                  主要用来压缩和清理CSS代码
```css
/*autoprefixer 被重复调用，*/
"cssnano": {
   "autoprefixer": false,
   "postcss-zindex": false  /*只要启用了这个插件，z-index的值就会重置为1，所以设置为false*/
}
```
- browserslist 设置浏览器的兼容范围
- postcss-viewport-units
- viewport-units-buggyfill
> postcss-viewport-units 和 viewport-units-buggyfill 是为处理vh vw兼容问题，而viewport-units-buggyfill更多的功能是兼容IE和Safari

### 配置 移动web适配 vw/vh
使用插件 postcss-px-to-viewport，自动把px单位转化为vw;

配置项
```js
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
		  })
		]
	  }
	}
  },
```

### postcss-write-svg
处理移动端1px的解决方案

在postcss中配置
```js
 "postcss-write-svg": {
            utf8: false
        },
```

* 1 
```css
@svg 1px-border {
    height: 2px;
    @rect {
        fill: var(--color, black);
        width: 100%;
        height: 50%;
    }
}
.example {
    border: 1px solid transparent;
    border-image: svg(1px-border param(--color #00b1ff)) 2 2 stretch;
}

/*编译后的css*/
.example {
    border: 1px solid transparent;
    border-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' height='2px'%3E%3Crect fill='%2300b1ff' width='100%25' height='50%25'/%3E%3C/svg%3E") 2 2 stretch;
}
```
* 2

上面演示的是使用border-image方式，除此之外还可以使用background-image来实现。比如：
```css
@svg square {
    @rect {
        fill: var(--color, black);
        width: 100%;
        height: 100%;
    }
}

#example {
    background: white svg(square param(--color #00b1ff));
}

/*编译出来就是*/
#example {
    background: white url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%2300b1ff' width='100%25' height='100%25'/%3E%3C/svg%3E");
}
```

-----------------

### 使用 vant 框架
- 安装vant
```js
npm install vant --save
```
- 按需加载使用组件
> 在babel.config.js中加入以下代码
```js
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
};
```
- 也可以手动引入组件
```js
import Button from 'vant/lib/button';
import 'vant/lib/button/style';
```

### 路由按需加载
通过import 去引入组件，做到按需加载响应路由的js
```js
const Test = import('../test/index.vue')
```

### 首页优化方案
- SSR
- 通过 puppeteer、phantomJs 无头浏览器生成html返回，需要服务端支持
- prerender-spa-plugin 依赖于puppeteer和路由模式设置为browserRouter
> 参考 [vue预渲染之prerender-spa-plugin解析](https://blog.csdn.net/a460550542/article/details/88579721)
> 参考 [使用预渲提升 SPA 应用体验](http://www.javanx.cn/20190904/spa/)

### 手势库
- hammer.js
- AlloyFinger

### 调试控制台
- vconsole
- eruda

### 抓包工具
- charles
> [下载地址](https://www.charlesproxy.com/download/)
> [使用教程](https://juejin.im/post/5a1033d2f265da431f4aa81f)
- fiddler

### 异常监控平台 【sentry】


##### 来源
[参考](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247484656&idx=1&sn=ce3aa8b0046a53930fcb5931c5d2c7f7&chksm=fa2be419cd5c6d0f25bccee079c36bc0e47af37fc9d987dd2abf9c3be25e0f4d9bdac867c2a3&mpshare=1&scene=1&srcid=&sharer_sharetime=1568620958972&sharer_shareid=fe4836100d04d765272ad5873b1cfd78&key=5418d699bf014e6146d316929d578e59c5b3531821d002b0b061931ced88bbf19117568793e5eb5ffef7b98fdecc1d23a08936b52b1936c13c82f7afd3030da6df4c99db144c4c217751f45af1f3a9aa&ascene=1&uin=MTgyMjcxMjc0Mw%3D%3D&devicetype=Windows+10&version=62060833&lang=zh_CN&pass_ticket=y04Kq06U3lj3%2FJZnWWGFgQrFVeKbKcV9wJvTWHEiM8tk%2F5IK%2B4DIsYmdjzPOc18g)












