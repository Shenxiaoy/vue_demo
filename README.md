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
- postcss-import
- postcss-url
-postcss-aspect-ratio-mini
- postcss-write-svg
- postcss-cssnext
- autoprefixer
- postcss-px-to-viewport
- cssnano
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
















