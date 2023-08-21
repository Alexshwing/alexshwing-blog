# Vite 知识体系

## 一、为什么需要构架工具
- 模块化方案
  - 提供模块加载方案
  - 兼容不同模块规范
- 语法转译
  - 高级语法转移, 如 Sass、TypeScript
  - 资源加载, 如图片、字体、worker
- 产物质量
  - 产物压缩
  - 无用代码删除
  - 语法降级
- 开发效率
  - 热更新
## 二、Vite 概要介绍
- 定位: 新一代前端构架工具
- 两大组成
  - No-bundle 开发服务, 源文件无需打包
  - 生产环境基于 Rollup 的 Bundler 核心特征
- 特点
  - 高性能, dev 启动速度和热更新速度非常快
  - 简单易用, 开发体验好
- 当前问题(瓶颈)
  - bundle 带来的性能开销
  - js 语言的性能瓶颈
    - 基于原生语言(Go、Rust)编写的前端编译工具链
    - 如 Go 语言编写的 Esbuild, Rust 编写的 SWC 
- 浏览器原生 ESM 支持
  - script 标签 添加 type = "module" 属性
  - 使用 ESM 模块导入导出语法
- 基于原生 ESM 开发服务优势
  - 无需打包项目源代码
  - 天然的按需加载
  - 可以利用文件级的浏览器缓存
- 基于 Esbuild 的编译性能优化
  - 打包器 Bundler
  - 编译器 Transformer
  - 压缩器 Minifier
- 内置的 Web 构建能力
  - 开箱即用的功能
    - webpack
    - webpack-dev-server
    - css-loader
    - style-loader
    - less-loader
    - sass-loader
    - postcss-loader
    - file-loader
    - MiniCssExtractPlugin
    - HTMLWebpackPlugin
## 三、Vite 上手实战
### 初始化
```shell
# 提前安装 pnpm
npm i -g pnpm
# 初始化命令
pnpm create vite
# 安装依赖
pnpm install
# 启动项目
npm run dev
```
### 使用 Sass/Scss & CSS
### 使用静态资源
除了常见的图片格式, Vite 也内置了对于 JSON 、 Worker 、 WASM 资源的支持
### 使用 HMR
### 生产环境 Tree Shaking
- 基于 ESM 的 import / export 语句依赖关系, 与运行时状态无关
- 在构建阶段将未使用到的代码进行删除

## 四、Vite 整体架构
### 关键技术: 依赖预打包
- 为什么要进行预打包
  - 避免 node_modules 过多的文件请求
  - 将 CommonJS 格式转换为 ESM 格式
- 实现原理
  - 服务启动前扫描代码中用到的依赖
  - 用 Esbuild 对依赖代码进行预打包
  - 改写 import 语句, 指定依赖为预构建产物路径
### 关键技术: 单文件编译
- 用 Esbuild 编译 TS / JSX
  - 优点: 编译速度提升10 - 100 倍
  - 局限性: 不支持类型检查、不支持语法降级到 ES5
### 关键技术: 代码压缩
- Esbuild 作为默认压缩工具, 替换传统的 Terser 、Uglify 、js等压缩工具
### 关键技术: 插件机制
- 开发阶段: 模拟 Rollup 插件机制
- 生产环境: 直接使用 Rollup

## 五、Vite 进阶路线

### 深入双引擎
- esbuild
- rollup.js
- 学习顺序
  - 先学习基本使用, 动手尝试各项常用配置
  - 然后学习其插件开发
### Vite 插件开发
- 抽离核心逻辑
- 易于拓展
- 过程
  - 1. 服务启动阶段
  - 2. 请求响应阶段
  - 3. 热更新阶段
  - 4. 服务关闭阶段
### 代码分割(拆包)
- 问题
  - 无法进行并发请求
  - 缓存复用率低
### JS编译工具(Babel)
### 语法安全降级
- 上层解决方案
  - @vitejs/plugin-legacy
- 底层原理
  - 借助 babel 进行语法自动降级
  - 提前注入 Polyfill 实现, 如 core-js、regenerator-runtime
### 服务端渲染
一种常见的渲染方式, 用于提升首屏性能和 SEO 优化
### 深入了解底层标准
- CJS 规范
- ESM 规范
- HTTP 2.0 特性