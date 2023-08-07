# 基础配置
## 一. 基本使用
webpack 是一个静态资源打包工具

它会以一个文件或多个文件作为打包的入口, 将我们整个项目所有文件编译组合成一个或多个文件输出

输出的文件是编译好的文件, 可以在浏览器运行

我们将 webpack 输出的文件叫做 bundle 

### 模式
- 开发模式: 仅能编译 JS 中的 ES Module 语法
- 生产模式: 能编译 JS 中的 ES Module 语法

### 初体验

1. 文件结构
```
webpack_demo # 项目根目录
    └── src # 项目源码目录
        ├── js # js文件目录
        │   ├── count.js
        │   └── sum.js
        └── main.js # 项目主文件
```
2. 创建文件
- count.js
```js
export default function count(x, y) {
  return x - y
}
```
- sum.js
```js
export default function sum(...args) {
  return args.reduce((prev, cur) => prev + cur, 0)
}
```
- main.js
```js
import count from './js/count'
import sum from './js/sum'
console.log(count(2, 1))
console.log(sum(1, 2, 3, 4))
```
3. 下载依赖
- 初始化 package.json
```shell
npm init -y
```
需要注意的是 package.json 的 name 字段不能叫做 webpack
- 下载依赖
```shell
npm i webpack webpack-cli -D
```
4. 启动 webpack
- 开发模式
```shell
npx webpack ./src/main.js --mode=development
```
- 生产模式
```shell
npx webpack ./src/main.js --mode=production
```
- `npx webpack` 用来运行本地安装 webpack 包
- `./src/main.js` 指定 webpack 从 main.js 文件开始打包
- `--mode=xxx` 指定环境
5. 观察输出文件
 webpack 默认会将文件打包输出到 dist 目录下

## 二、基本配置
### 核心概念
1. entry (入口)
指示 webpack 使用哪个模块作为构建其内部依赖图的开始, 默认值为 ./src/index.js 
2. output (输出)
告诉 webpack 在哪里输出它所创建的 bundle, 以及如何命名文件。
要输出文件的默认值为 ./dist/main.js , 其他生成文件放置在 ./dist 文件夹中
3. loader (加载器)
webpack 只能理解 JavaScript 和 Json 文件, 通过 loader 使得 webpack 能够去处理其他类型的文件, 并将它们转换为有效模块, 以供应用程序使用, 以及添加到依赖图中
4. plugins (插件)
loader 用于转换某些类型的模块, 而插件而可以用于执行范围更广的任务。包括: 打包优化, 资源管理, 注入变量
5. mode (模式)
默认值为 production 

### 添加配置文件
- 根目录下添加 webpack.config.js 文件
```js
const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: []
  },
  plugins: [],
  mode: 'development'
}
```
- 运行
```shell
npx webpack
```

## 三、开发模式介绍
- 编译代码, 使浏览器能识别运行: 处理样式资源、字体图标、图片资源、html资源等
- 代码质量检查, 树立代码规范

## 四、处理样式资源
借助 Loader 帮助 webpack 解析样式资源

[Webpack官方Loader文档](https://webpack.docschina.org/loaders/)

### 处理 css
1. 安装包: css-loader 和 style-loader
- css-loader 将 css 文件编译成 webpack 能识别模块
- style-loader 动态创建一个 style 标签, 里面放置 webpack 中 
```shell
npm i css-loader style-loader -D
```
2. 配置
- webpack.config.js
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ],
  },
};
```
### 处理 Less
1. 安装包
- less-loader 将 less 文件编译为 css 文件
```shell
npm i less-loader -D
```
2. 配置
```js
{
  test: /\.less$/,
  use: ["style-loader", "css-loader", "less-loader"],
},
```

### 处理 Sass 和 Scss 
1. 安装包
- sass-loader: 将 Sass 文件编译成 css 文件
- sass: sass-loader 依赖 sass进行编译
```shell
npm i sass-loader sass -D
```
2. 配置
```js
{
  test: /\.s[ac]ss$/,
  use: ["style-loader", "css-loader", "sass-loader"],
},
```

### 处理 Styl
1. 安装包
- stylus-loader 将 styl 文件编译成 css 文件
```shell
npm i stylus-loader -D
```
2. 配置
```js
{
  test: /\.styl$/,
  use: ["style-loader", "css-loader", "stylus-loader"],
},
```

## 五、处理图片资源
webpack5 已内置 file-loader 和 url-loader 用于处理图片资源
- 配置
```js
{
  test: /\.(png|jpe?g|gif|webp)$/,
  type: "asset",
},
```
## 六、修改输出资源的名称和路径
```js
output: {
  path: path.resolve(__dirname, "dist"),
  filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
  clean: true, // 自动将上次打包目录资源清空
},
module: {
  rules: [
    {
      test: /\.(png|jpe?g|gif|webp)$/,
      type: "asset",
      parser: {
        dataUrlCondition: {
          maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
        }
      },
      generator: {
        // 将图片文件输出到 static/imgs 目录中
        // 将图片文件命名 [hash:8][ext][query]
        // [hash:8]: hash 值取 8 位
        // [ext]: 使用之前文件的拓展名
        // [query]: 添加之前的查询参数
        filename: "static/imgs/[hash:8][ext][query]"
      }
    }
  ]
}
```


## 七、处理字体图标资源

## 八、处理其他资源

## 九、EsLint
检测 js 和 jsx 语法的工具, 通过写 Eslint 配置文件, 里面编写各种 rules 规则, 用这些规则检查代码
1. 安装包
```shell
npm i eslint-webpack-plugin eslint -D
```
2. 配置文件
- .eslintrc.* 新建文件, 位于项目根目录
  - eslintrc
  - eslintrc.js
  - eslintrc.json
- package.json 中 eslintConfig: 不需要创建文件, 在原有文件基础下编写

这里采用 eslintrs.js 编写配置文件
```js
module.exports = {
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  // 解析选项
  parserOptions: {
    ecmaVersion: 6, // ES 语法版本
    sourceType: 'module', // ES 模块化
  },
  // 具体检查规则
  // "off" | 0: 关闭规则
  // "warn" | 1: 开启规则, 使用警告级别错误(不会导致程序退出)
  // "error" | 2: 开启规则, 使用错误级别错误(当被触发时, 程序会退出)
  rules: {
    "no-var": 2, // 不能使用 var
  },
  // 继承现有的规则
  // Eslint 官方: eslint:recommended
  // React Cli: react-app
  // Vue Cli: plugin:vue/essential
  extends: ["eslint:recommended"]
  // 其他规则详见: https://eslint.bootcss.com/docs/user-guide/configuring
};
```
3. webpack 配置中引入插件
```js
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
module.exports = {
  // ...
  plugins: [
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, 'src')
    })
  ],
  // ...
}
```

## 十、Babel
JavaScript 编译器

主要用于将 ES6 语法编写的代码转换为向后兼容的 JavaScript 语法, 以便能够运行在当前和旧版本的浏览器或其他环境中

1. 安装包
```shell
npm i babel-loader @babel/core @babel/preset-env -D
```
2. 配置文件
- babel.config.* 新建文件, 位于项目根目录
  - babel.config.js
  - babel.config.json
- .babelrc.* 新建文件, 位于项目根目录
  - .babelrc
  - .babelrc.js
  - .babelrc.json
- package.json 中 babel 不需要创建文件, 在原有文件基础上编写

这里采用 `babel.config.js` 作为配置文件
```js
module.exports = {
  // 预设
  // @babel/preset-env: 一个智能预设，允许您使用最新的 JavaScript
  // @babel/preset-react：一个用来编译 React jsx 语法的预设
  // @babel/preset-typescript：一个用来编译 TypeScript 语法的预设
  presets: ["@babel/preset-env"]
}
```
2. 将 babel-loader 添加到 module 列表中
```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/, // 排除node_modules代码不编译
      loader: "babel-loader",
    }
  ]
}
```

## 十一、处理 HTML 资源
使用插件生成一个 HTML5 文件, 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle
1. 安装包
```shell
npm i html-webpack-plugin -D
```
2. 配置 webpack
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, 'public/index.html')
    })
  ],
};
```
此时 dist 目录就会输出一个 index.html 文件

## 十二、开发服务器&自动化
保存文件后自动编译
1. 安装包
```shell
npm i webpack-dev-server -D
```
2. 配置 webpack
```js
module.exports = {
  // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },  
}
```
3. 运行指令
```shell
npx webpack serve
```

## 十三、生产模式介绍
生产模式是开发完代码后, 对代码进行部署上线

这个模式下我们主要对代码进行优化, 让其性能更好
- 优化代码运行性能
- 优化代码打包速度

## 十四、css 处理

## 十五、html 压缩

## 总结