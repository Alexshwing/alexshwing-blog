# 高级优化

## 一、 提高开发体验
### SourceMap
SourceMap (源代码映射) 是一个用来生成源代码与构建后代码一一映射的文件的方案。

它会生成一个 xxx.map 文件, 里面包含源代码和构建后代码每一行、每一列的映射关系。当构建后代码出错了, 会通过 xxx.map 文件, 从构建后代码出错位置找到映射后源代码出错位置, 从而让浏览器提示源代码出错位置, 帮助我们更快地找到错误位置。

通过查看 [Webpack DevTool 文档](https://webpack.docschina.org/configuration/devtool/) 可知, SourceMap 值有很多种情况, 但实际开发时我们只需要关注两种情况即可:

1. 开发模式: `cheap-module-source-map`
  - 优点: 打包编译速度快, 只包含行映射
  - 缺点: 没有列映射
```js
module.exports = {
  // 其他省略
  mode: "development",
  devtool: "cheap-module-source-map",
};
```
2. 生产模式: `source-map`
  - 优点: 包含行 / 列映射
  - 缺点: 打包编译速度慢
```js
module.exports = {
  // 其他省略
  mode: "production",
  devtool: "source-map",
};
```

## 二、提升打包构建速度
### HotModuleReplacement
开发时我们修改其中一个模块代码, Webpack 默认会将所有模块全部重新打包编译, 速度很慢。

所以我们需要做到修改某个模块代码, 就只有这个模块代码需要重新打包编译, 其他模块不变, 这样打包速度就能很快。

HotModuleReplacement (HMR / 热模块替换): 在程序运行中, 替换、添加或删除模块, 而无需重新加载整个页面。

1. 基本配置
```js
module.exports = {
  // 其他省略
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了）
  },
};
```
此时 css 样式经过 style-loader 处理, 已经具备 HMR 功能, 但是 js 还不行

2. js 配置
```js
// main.js
// 判断是否支持HMR功能
if (module.hot) {
  module.hot.accept("./js/count.js", function (count) {
    const result1 = count(2, 1);
    console.log(result1);
  });

  module.hot.accept("./js/sum.js", function (sum) {
    const result2 = sum(1, 2, 3, 4);
    console.log(result2);
  });
}
```
上面这样写会很麻烦, 所以实际开发我们会使用其他 loader 来解决

比如 vue-loader 、react-hot-loader

### Oneof

打包时每个文件都会经过所有 loader 处理, 虽然因为 test 正则原因没有处理上, 但是都要过一遍, 比较慢。

添加 Oneof 可以实现只要匹配上一个 loader , 剩下的就不匹配了。

```js
module.exports = {
  module: {
    rules: [
      {
        oneOf: [
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"],
          },
          {
            test: /\.s[ac]ss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
          {
            test: /\.styl$/,
            use: ["style-loader", "css-loader", "stylus-loader"],
          },
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
              },
            },
            generator: {
              // 将图片文件输出到 static/imgs 目录中
              // 将图片文件命名 [hash:8][ext][query]
              // [hash:8]: hash值取8位
              // [ext]: 使用之前的文件扩展名
              // [query]: 添加之前的query参数
              filename: "static/imgs/[hash:8][ext][query]",
            },
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
            generator: {
              filename: "static/media/[hash:8][ext][query]",
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/, // 排除node_modules代码不编译
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
};
```

### Include / Exclude
开发时我们需要使用第三方的库或插件, 所有文件都下载到 node_modules 中了。而这些文件是不需要编译可以直接使用的。

所以我们对 js 文件处理时, 要排除 node_modules 下面的文件

- include: 包含, 只处理 xxx 文件
- exclude: 排除, 除了 xxx 文件以外其他文件都处理
```js{8-9,20}
module.exports = {
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
    }),
  ],
};
```

### Cache
每次打包时 js 文件都要经过 Eslint 检查和 Babel 编译, 速度比较慢。

我们可以缓存之前的 Eslint 检查和 Babel 编译结果, 这样第二次打包时速度就会更快。

```js{11-14,26-30}
module.exports = {
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 开启babel编译缓存
              cacheCompression: false, // 缓存文件不要压缩
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
  ],
};
```

### Thread
开启多线程同时处理 js 文件, 这样速度比之前的单线程打包更快。

> 需要注意的是, 请仅在特别耗时的操作中使用, 因为每个进程启动就有大约为 600 ms 左右开销

1. 获取 CPU 核数, 因为每个电脑都不一样
```js
// nodejs核心模块，直接使用
const os = require("os");
// cpu核数
const threads = os.cpus().length;
```
2. 安装包
```shell
npm i thread-loader -D
```
3. 配置
```js{1-4,15-28,45,48,50-60}
const os = require("os");
const TerserPlugin = require("terser-webpack-plugin");
// cpu核数
const threads = os.cpus().length;

module.exports = {
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  workers: threads, // 数量
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
      threads, // 开启多进程
    }),
    // css压缩
    // new CssMinimizerPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // css压缩也可以写到optimization.minimizer里面，效果一样的
      new CssMinimizerPlugin(),
      // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
      new TerserPlugin({
        parallel: threads // 开启多进程
      })
    ],
  },
};
```
我们目前打包的内容都很少，所以因为启动进程开销原因，使用多进程打包实际上会显著的让我们打包时间变得很长。

## 三、减少代码体积
### Tree Shaking
Tree Shaking 是一个术语, 通常用于描述移除 JavaScript 中没有使用上的代码

> 注意: 它依赖 ES Module

Webpack 已经默认开启了这个功能, 无需其他配置

### Babel
Babel 为编译的每个文件都插入了辅助代码, 使代码体积过大!

Babel 对一些公共方法使用了非常小的辅助代码, 比如 `_extend`。默认情况下会被添加到每个需要它的文件中。

我们可以将这些辅助代码作为一个独立模块, 来避免重复引入。

`@babel/plugin-transform-runtime:` 禁用 Babel 自动对每个文件的 runtime 注入, 而是引入 `@babel/plugin-transform-runtime` 并且使所有辅助代码从这里引用

1. 安装包
```shell
npm i @babel/plugin-transform-runtime -D
```
2. 配置
```js{22}
module.exports = {
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  workers: threads, // 数量
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 缓存文件不要压缩
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                },
              },
            ],
          },
        ],
      },
    ],
  },
};
```

### Image Minimizer
开发如果项目中引入较多图片, 那么图片体积会比较大, 将来请求速度比较慢。

我们可以对图片进行压缩, 减少代码体积。

> 注意: 如果项目中图片都是在线链接, 那么就不需要了。本地项目静态图片才需要进行压缩。

1. 安装包
- `image-minimizer-webpack-plugin` 用来压缩图片的插件
```shell
npm i image-minimizer-webpack-plugin imagemin -D
```
还有剩下包需要下载, 有两种模式:
- 无损压缩
```shell
npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D
```
- 有损压缩
```shell
npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D
```
> [有损/无损压缩的区别](https://baike.baidu.com/item/%E6%97%A0%E6%8D%9F%E3%80%81%E6%9C%89%E6%8D%9F%E5%8E%8B%E7%BC%A9)
>
2. 配置

我们以无损压缩配置为例
```js{1,7-34}
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");


module.exports = {
  optimization: {
    minimizer: [
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
};
```
3. 打包时可能会报错
```shell
Error: Error with 'src\images\1.jpeg': '"C:\Users\86176\Desktop\webpack\webpack_code\node_modules\jpegtran-bin\vendor\jpegtran.exe"'
Error with 'src\images\3.gif': spawn C:\Users\86176\Desktop\webpack\webpack_code\node_modules\optipng-bin\vendor\optipng.exe ENOENT
```
需要安装 `jpegtran.exe` 和 `optipng.exe` 到 node_modules 中才能解决

## 四、优化代码运行性能

### Code Split
打包代码时会将所有 js 代码打包到一个文件, 体积太大了。如果只要渲染首页, 就应该只加载首页的 js 文件, 其他文件不应该加载。

所以我们需要将打包生成的文件进行代码分割, 生成多个 js 文件, 渲染哪个页面就只加载某个 js 文件, 这样加载的资源更少, 速度就更快。

代码分割主要做两件事情
1. 分割文件: 将打包生成的文件进行分割生成多个 js 文件
2. 按需加载: 需要哪个文件就加载哪个文件
---
1. 多入口
```js
module.exports = {
  // 单入口
  // entry: './src/main.js',
  // 多入口
  entry: {
    main: "./src/main.js",
    app: "./src/app.js",
  },
};
```
配置了几个入口, 至少输出几个 js 文件

2. 提取重复代码
  
如果多入口文件中都引用了同一份代码，我们不希望这份代码被打包到两个文件中，导致代码重复，体积更大。

我们需要提取多入口的重复代码，只打包生成一个 js 文件，其他文件引用它就好。
```js
module.exports = {
  optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 以下是默认值
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 组，哪些模块要打包到一个组
      //   defaultVendors: { // 组名
      //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //     priority: -10, // 权重（越大越高）
      //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //   },
      //   default: { // 其他没有写的配置会使用上面的默认值
      //     minChunks: 2, // 这里的minChunks权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
      // 修改配置
      cacheGroups: {
        // 组，哪些模块要打包到一个组
        // defaultVendors: { // 组名
        //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
        //   priority: -10, // 权重（越大越高）
        //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
        // },
        default: {
          // 其他没有写的配置会使用上面的默认值
          minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```
3. 按需加载, 动态导入
```js
// main.js
console.log("hello main");

document.getElementById("btn").onclick = function () {
  // 动态导入 --> 实现按需加载
  // 即使只被引用了一次，也会代码分割
  import("./math.js").then(({ sum }) => {
    alert(sum(1, 2, 3, 4, 5));
  });
};
```
一旦通过 import 动态导入语法导入模块，模块就被代码分割，同时也能按需加载了。

4. 单入口

开发时我们可能是单页面应用（SPA），只有一个入口（单入口）。那么我们需要这样配置：
```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 单入口
  entry: "./src/main.js",
  // 多入口
  // entry: {
  //   main: "./src/main.js",
  //   app: "./src/app.js",
  // },
  output: {
    path: path.resolve(__dirname, "./dist"),
    // [name]是webpack命名规则，使用chunk的name作为输出的文件名。
    // 什么是chunk？打包的资源就是chunk，输出出去叫bundle。
    // chunk的name是啥呢？ 比如： entry中xxx: "./src/xxx.js", name就是xxx。注意是前面的xxx，和文件名无关。
    // 为什么需要这样命名呢？如果还是之前写法main.js，那么打包生成两个js文件都会叫做main.js会发生覆盖。(实际上会直接报错的)
    filename: "js/[name].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  mode: "production",
  optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 以下是默认值
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 组，哪些模块要打包到一个组
      //   defaultVendors: { // 组名
      //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //     priority: -10, // 权重（越大越高）
      //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //   },
      //   default: { // 其他没有写的配置会使用上面的默认值
      //     minChunks: 2, // 这里的minChunks权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
  },
};
```
5. 更新配置
最终我们采用`单入口+代码分割+动态导入`方式来进行配置
```js{174-178}
// webpack.prod.js
const os = require("os");
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

// cpu核数
const threads = os.cpus().length;

// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: getStyleLoaders(),
          },
          {
            test: /\.less$/,
            use: getStyleLoaders("less-loader"),
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoaders("sass-loader"),
          },
          {
            test: /\.styl$/,
            use: getStyleLoaders("stylus-loader"),
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
              },
            },
            generator: {
              // 将图片文件输出到 static/imgs 目录中
              // 将图片文件命名 [hash:8][ext][query]
              // [hash:8]: hash值取8位
              // [ext]: 使用之前的文件扩展名
              // [query]: 添加之前的query参数
              filename: "static/imgs/[hash:8][ext][query]",
            },
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
            generator: {
              filename: "static/media/[hash:8][ext][query]",
            },
          },
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  workers: threads, // 数量
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 缓存文件不要压缩
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
      threads, // 开启多进程
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/main.css",
    }),
    // css压缩
    // new CssMinimizerPlugin(),
  ],
  optimization: {
    minimizer: [
      // css压缩也可以写到optimization.minimizer里面，效果一样的
      new CssMinimizerPlugin(),
      // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
      new TerserPlugin({
        parallel: threads, // 开启多进程
      }),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 其他内容用默认配置即可
    },
  },
  // devServer: {
  //   host: "localhost", // 启动服务器域名
  //   port: "3000", // 启动服务器端口号
  //   open: true, // 是否自动打开浏览器
  // },
  mode: "production",
  devtool: "source-map",
};
```
6. 给动态导入文件取名称
- 修改文件
```js
import sum from "./js/sum";
// 引入资源，Webpack才会对其打包
import "./css/iconfont.css";
import "./css/index.css";
import "./less/index.less";
import "./sass/index.sass";
import "./sass/index.scss";
import "./styl/index.styl";

const result2 = sum(1, 2, 3, 4);
console.log(result2);

// 以下代码生产模式下会删除
if (module.hot) {
  module.hot.accept("./js/sum.js", function (sum) {
    const result2 = sum(1, 2, 3, 4);
    console.log(result2);
  });
}

document.getElementById("btn").onClick = function () {
  // eslint会对动态导入语法报错，需要修改eslint配置文件
  // webpackChunkName: "math"：这是webpack动态导入模块命名的方式
  // "math"将来就会作为[name]的值显示。
  import(/* webpackChunkName: "math" */ "./js/math.js").then(({ count }) => {
    console.log(count(2, 1));
  });
};
```
- eslint 配置

下载包
```shell
npm i eslint-plugin-import -D
```
配置
```js{9}
// .eslintrc.js
module.exports = {
  // 继承 Eslint 规则
  extends: ["eslint:recommended"],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  plugins: ["import"], // 解决动态导入import语法报错问题 --> 实际使用eslint-plugin-import的规则解决的
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {
    "no-var": 2, // 不能使用 var 定义变量
  },
};
```
- 统一命名配置
```js{36-38,71-78,83-85,132-134}
const os = require("os");
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

// cpu核数
const threads = os.cpus().length;

// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
    filename: "static/js/[name].js", // 入口文件打包输出资源命名方式
    chunkFilename: "static/js/[name].chunk.js", // 动态导入输出资源命名方式
    assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: getStyleLoaders(),
          },
          {
            test: /\.less$/,
            use: getStyleLoaders("less-loader"),
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoaders("sass-loader"),
          },
          {
            test: /\.styl$/,
            use: getStyleLoaders("stylus-loader"),
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
              },
            },
            // generator: {
            //   // 将图片文件输出到 static/imgs 目录中
            //   // 将图片文件命名 [hash:8][ext][query]
            //   // [hash:8]: hash值取8位
            //   // [ext]: 使用之前的文件扩展名
            //   // [query]: 添加之前的query参数
            //   filename: "static/imgs/[hash:8][ext][query]",
            // },
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
            // generator: {
            //   filename: "static/media/[hash:8][ext][query]",
            // },
          },
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  workers: threads, // 数量
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 缓存文件不要压缩
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
      threads, // 开启多进程
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[name].chunk.css",
    }),
    // css压缩
    // new CssMinimizerPlugin(),
  ],
  optimization: {
    minimizer: [
      // css压缩也可以写到optimization.minimizer里面，效果一样的
      new CssMinimizerPlugin(),
      // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
      new TerserPlugin({
        parallel: threads, // 开启多进程
      }),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 其他内容用默认配置即可
    },
  },
  // devServer: {
  //   host: "localhost", // 启动服务器域名
  //   port: "3000", // 启动服务器端口号
  //   open: true, // 是否自动打开浏览器
  // },
  mode: "production",
  devtool: "source-map",
};
```
### Preload / Prefetch
我们想在浏览器空闲时间，加载后续需要使用的资源。我们就需要用上 Preload 或 Prefetch 技术。

- Preload 告诉浏览器立即加载资源
- Prefetch 告诉浏览器在空闲时才开始加载资源

它们共同点: 
- 都只会加载资源, 并不执行
- 都有缓存

它们区别:
- Preload 加载优先级高, Prefetch 加载优先级低
- Preload 只能加载当前页面需要使用的资源

总结:
- 当前页面优先级高的资源用 Preload 加载
- 下一个页面需要使用的资源用 Prefetch 加载

它们的问题: 兼容性较差

1. 安装包
```shell
npm i @vue/preload-webpack-plugin -D
```
2. 配置
```js
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

module.exports = {
  plugins: [
    new PreloadWebpackPlugin({
      rel: "preload", // preload兼容性更好
      as: "script",
      // rel: 'prefetch' // prefetch兼容性更差
    }),
  ],
};
```
### Network Cache
将来开发时我们对静态资源会使用缓存来优化，这样浏览器第二次请求资源就能读取缓存了，速度很快。

但是这样的话就会有一个问题, 因为前后输出的文件名是一样的，都叫 main.js，一旦将来发布新版本，因为文件名没有变化导致浏览器会直接读取缓存，不会加载新资源，项目也就没法更新了。

所以我们从文件名入手，确保更新前后文件名不一样，这样就可以做缓存了。

它们都会生成一个唯一的 hash 值
- fullhash (webpack4 是 hash)

每次修改任何一个文件, 所有文件名的 hash 值都会改变, 所以一旦修改任何一个文件, 整个项目的文件缓存都将失效

- chunkhash

根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。我们 js 和 css 是同一个引入，会共享一个 hash 值。

- contenthash

根据文件内容生成 hash 值，只有文件内容变化了，hash 值才会变化。所有文件 hash 值是独享且不同的。

```js{5-7,15-16}
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
    // [contenthash:8]使用contenthash，取8位长度
    filename: "static/js/[name].[contenthash:8].js", // 入口文件打包输出资源命名方式
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js", // 动态导入输出资源命名方式
    assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
    clean: true,
  },
  plugins: [
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
  ],
}
```
- 问题

当我们修改 math.js 文件再重新打包的时候，因为 contenthash 原因，math.js 文件 hash 值发生了变化（这是正常的）。

但是 main.js 文件的 hash 值也发生了变化，这会导致 main.js 的缓存失效。明明我们只修改 math.js, 为什么 main.js 也会变身变化呢？

- 原因
  - 更新前：math.xxx.js, main.js 引用的 math.xxx.js
  - 更新后：math.yyy.js, main.js 引用的 math.yyy.js, 文件名发生了变化，间接导致 main.js 也发生了变化
- 解决

将 hash 值单独保管在一个 runtime 文件中。

我们最终输出三个文件：main、math、runtime。当 math 文件发送变化，变化的是 math 和 runtime 文件，main 不变。

runtime 文件只保存文件的 hash 值和它们与文件关系，整个文件体积就比较小，所以变化重新请求的代价也小。

```js
module.exports = {
  optimization: {
    // 提取runtime文件
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`, // runtime文件命名规则
    },
  },
};
```

### Core-js
过去我们使用 babel 对 js 代码进行了兼容性处理，其中使用@babel/preset-env 智能预设来处理兼容性问题。

它能将 ES6 的一些语法进行编译转换，比如箭头函数、点点点运算符等。但是如果是 async 函数、promise 对象、数组的一些方法（includes）等，它没办法处理。

所以此时我们 js 代码仍然存在兼容性问题，一旦遇到低版本浏览器会直接报错。所以我们想要将 js 兼容性问题彻底解决

core-js 是专门用来做 ES6 以及以上 API 的 polyfill。

polyfill翻译过来叫做垫片/补丁。就是用社区上提供的一段代码，让我们在不兼容某些新特性的浏览器上，使用该新特性。

1. 安装包
```shell
npm i @babel/eslint-parser -D
```
2. 配置
```js{5}
// eslintrc.js
module.exports = {
  // 继承 Eslint 规则
  extends: ["eslint:recommended"],
  parser: "@babel/eslint-parser", // 支持最新的最终 ECMAScript 标准
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  plugins: ["import"], // 解决动态导入import语法报错问题 --> 实际使用eslint-plugin-import的规则解决的
  parserOptions: {
    ecmaVersion: 6, // es6
    sourceType: "module", // es module
  },
  rules: {
    "no-var": 2, // 不能使用 var 定义变量
  },
};
```
3. 安装 core-js
```shell
npm i core-js
```
- 手动全部引入
```js
import "core-js";
```
这样引入会将所有兼容性代码全部引入，体积太大了。我们只想引入 promise 的 polyfill。
- 手动按需引入
```js
import "core-js/es/promise";
```
只引入打包 promise 的 polyfill，打包体积更小。但是将来如果还想使用其他语法，我需要手动引入库很麻烦。
- 自动按需引入
```js
//babel.config.js
module.exports = {
  // 智能预设：能够编译ES6语法
  presets: [
    [
      "@babel/preset-env",
      // 按需加载core-js的polyfill
      { useBuiltIns: "usage", corejs: { version: "3", proposals: true } },
    ],
  ],
};
```
此时就会自动根据我们代码中使用的语法，来按需加载相应的 polyfill 了

### PWA

开发 Web App 项目，项目一旦处于网络离线情况，就没法访问了。我们希望给项目提供离线体验。

渐进式网络应用程序(progressive web application - PWA)：是一种可以提供类似于 native app(原生应用程序) 体验的 Web App 的技术。

其中最重要的是，在 离线(offline) 时应用程序能够继续运行功能。内部通过 Service Workers 技术实现的。

1. 安装包
```shell
npm i workbox-webpack-plugin -D
```
2. 配置
```js
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  plugins: [
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
```
3. 修改 main.js
```js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
```
此时如果直接通过 VSCode 访问打包后页面，在浏览器控制台会发现 SW registration failed。

因为我们打开的访问路径是：`http://127.0.0.1:5500/dist/index.html`。此时页面会去请求 service-worker.js 文件，请求路径是：`http://127.0.0.1:5500/service-worker.js`，这样找不到会 404。

实际 service-worker.js 文件路径是：`http://127.0.0.1:5500/dist/service-worker.js`

4. 解决路径问题
- 安装包
```shell
npm i serve -g
```
serve 也是用来启动开发服务器来部署代码查看效果的。
- 运行指令
```shell
serve dist
```
此时通过 serve 启动的服务器我们 service-worker 就能注册成功了。


## 五、总结

1. 提升开发体验
- 使用 Source Map 让开发或上线时代码报错能有更加准确的错误提示。
2. 提升 webpack 提升打包构建速度
- 使用 HotModuleReplacement 让开发时只重新编译打包更新变化了的代码，不变的代码使用缓存，从而使更新速度更快。
- 使用 OneOf 让资源文件一旦被某个 loader 处理了，就不会继续遍历了，打包速度更快。
- 使用 Include/Exclude 排除或只检测某些文件，处理的文件更少，速度更快。
- 使用 Cache 对 eslint 和 babel 处理的结果进行缓存，让第二次打包速度更快。
- 使用 Thead 多进程处理 eslint 和 babel 任务，速度更快。（需要注意的是，进程启动通信都有开销的，要在比较多代码处理时使用才有效果）
3. 减少代码体积
- 使用 Tree Shaking 剔除了没有使用的多余代码，让代码体积更小。
- 使用 @babel/plugin-transform-runtime 插件对 babel 进行处理，让辅助代码从中引入，而不是每个文件都生成辅助代码，从而体积更小。
- 使用 Image Minimizer 对项目中图片进行压缩，体积更小，请求速度更快。（需要注意的是，如果项目中图片都是在线链接，那么就不需要了。本地项目静态图片才需要进行压缩。）
4. 优化代码运行性能
- 使用 Code Split 对代码进行分割成多个 js 文件，从而使单个文件体积更小，并行加载 js 速度更快。并通过 import 动态导入语法进行按需加载，从而达到需要使用时才加载该资源，不用时不加载资源。
- 使用 Preload / Prefetch 对代码进行提前加载，等未来需要使用时就能直接使用，从而用户体验更好。
- 使用 Network Cache 能对输出资源文件进行更好的命名，将来好做缓存，从而用户体验更好。
- 使用 Core-js 对 js 进行兼容性处理，让我们代码能运行在低版本浏览器。
- 使用 PWA 能让代码离线也能访问，从而提升用户体验。