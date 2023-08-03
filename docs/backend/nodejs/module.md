# 模块化
## 一. 介绍
将一个复杂的程序文件依据一定规则 (规范) 拆分成多个文件的过程称之为 **模块化**

其中拆分出的`每个文件就是一个模块`, 模块内部数据是私有的, 不过模块可以暴露内部数据以便其他模块使用。

好处:
- 防止命名冲突
- 高复用性
- 高维护性

## 二. 模块暴露数据
### 1 模块初体验
- me.js
```js
function test() {
  console.log("test")
}
module.exports = test
```
- index.js
```js
const test = require("/me.js")
test()
```
### 2 暴露数据
- `module.exports = value`
- `exports.name = value`

> 注意事项
> - `module.exports`可以暴露`任意`数据
> - 不能使用`exports = value` 形式暴露数据, 模块内部`module`与`exports`的隐式关系`exports = module.exports = {}`, `require`返回的是目标模块中`module.exports`的值

## 三. 导入模块
`const test = require('./me.js')`
> 注意事项
> - 对于自己创建的模块, 导入模块建议使用`相对路径`, 且不省略`./`和`../`
> - `js`和`json`导入时可以不加后缀, `c/c++`编写的`node`拓展文件也可以不加后缀
> - 如果导入其他类型文件, 会以`js`文件进行处理
> - 如果导入的路径是文件夹, 首先检测该文件夹下`package.json`中的`main`属性对应的文件, 如果存在则导入, 否则如果文件不存在报错。如果`main`属性不存在, 或者`package.json`不存在, 则会尝试导入文件夹下`index.js`和`index.json`, 如果还是没找到, 就会报错
> - 导入`node.js`内置模块, 直接`require`模块名字即可, 无需添加`./`和`../`
## 四、导入模块的基本流程
1. 将相对路径转为绝对路径, 定位目标文件
2. 缓存检测
3. 读取目标文件代码
4. 包裹为一个函数并执行(立即执行函数), 通过`arguments.callee.toString()`查看自执行函数
5. 缓存模块的值
6. 返回`module.exports`的值

伪代码如下:
```js
function require(file){
  //1. 将相对路径转为绝对路径，定位目标文件
  let absolutePath = path.resolve(__dirname, file);
  //2. 缓存检测
  if(caches[absolutePath]){
    return caches[absolutePath];
  }
  //3. 读取文件的代码
  let code = fs.readFileSync(absolutePath).toString();
  //4. 包裹为一个函数 然后执行
  let module = {};
  let exports = module.exports = {};
  (function (exports, require, module, __filename, __dirname) {
    const test = {
      name: 'alexshwing'
    }
    module.exports = test;
    console.log(arguments.callee.toString());
  })(exports, require, module, __filename, __dirname)
  //5. 缓存结果
  caches[absolutePath] = module.exports;
  //6. 返回 module.exports 的值
  return module.exports;
}
```
## 五、CommonJS规范
`module.exports`、`exports`以及`require`都是`CommonJs`模块化规范中的内容

`Node.js`实现`CommonJS`模块化规范, 二者关系像`JavaScript`与`ECMAScript`