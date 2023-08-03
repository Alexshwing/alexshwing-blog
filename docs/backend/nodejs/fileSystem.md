# 文件系统
```js
const fs = require("fs")
```
## 一、文件写入
### 1. 异步写入
- `fs.writeFile(file, data[, options], callback`
  - `file` 文件名
  - `data` 待写入数据
  - `options` 配置项
  - `callback` 写入回调
- Returns `undefined`
```js
fs.writeFile('./test.txt', 'alexshwing', 'utf8', err => {
  if (err) throw err
  console.log("success")
})
```
### 2. 同步写入
- `fs.writeFileSync(file, data[, options])`
- Returns `undefined`
```js
try {
  fs.writeFileSync("./test.txt", 'alexshwing')
} catch(e) {
  console.log(e)
}
```
### 3. 追加写入
- `fs.appendFile(file, data[, options], callback)`
- `fs.appendFileSync(file, data, [.options])`
- Returns `undefined`
```js
fs.appendFile('./test.txt', 'alexshwing', err => {
  if (err) throw err
  console.log("success")
})
fs.appendFileSync('./test.txt', 'alexshwing')
```
### 4. 流式写入
- `fs.createWriteStream(path[, options])`
  - `path` 文件路径
  - `options` 配置项
- Returns `Object`
```js
const ws = fs.createWriteStream('./test.txt')
ws.write("1\r\n")
ws.write("2\r\n")
ws.write("3\r\n")
ws.write("4\r\n")
```
> 程序打开一个文件需要消耗资源, 流式写入可以减少打开关闭文件的次数
>
> `流式写入`方式适用于`大文件写入或频繁写入`, `writeFile`适用于`写入频率较低的场景`
>
> `progress.memoryUsage` 查看内存使用情况
### 5. 应用场景
- 下载文件
- 安装软件
- 保存程序日志, 如`Git`
- 编辑器保存文件
- 视频录制

## 二、文件读取
### 1. 异步读取
- `fs.readFile(path[, options], callback)`
- Returns `undefined`
```js
fs.readFile('./test.txt', 'uft-8', (err, data) => {
  if (err) throw err
  console.log(data)
})
```
### 2. 同步读取
- `fs.readFileSync(path[, options])`
- Returns `string | Buffer`
```js
const data = fs.readFileSync('./test.txt')
const data2 = fs.readFileSync('./test.txt', 'utf-8')
```
### 3. 流式读取
- `fs.createReadStream(path[, options]`
- Returns `Object`
```js
const rs = fs.createReadStream("./test.txt")
// 每次取出`64k`数据后执行一次`data`回调
rs.on("data", data => {
  console.log(data)
})
// 读取完毕, 执行`end`回调
rs.on('end', () => {
  console.log("success")
})
```
### 4. 应用场景
- 电脑开机
- 程序运行
- 编辑器打开文件
- 查看图片
- 播放视频/音乐
- `Git`查看日志
- 上传文件
- 查看聊天记录

## 三、文件移动和重命名
- `fs.rename(oldPath, newPath, callback)`
- `fs.renameSync(oldPath, newPath)`
  - `oldPath` 当前文件路径
  - `newPath` 文件新路径
```js
fs.rename('./test.txt', './file/test.txt', err => {
  if (err) throw err
  console.log("success")
})
fs.renameSync('./test.txt', './alex.txt')
```
## 四、文件删除
- `fs.unlink(path, callback)`
- `fs.unlinkSync(path)`
```js
fs.unlink("./test.txt", err => {
  if (err) throw err
  console.log("success")
})
fs.unlinkSync("./test.txt")
```
## 五、文件夹操作
### 1. 创建文件夹
- `fs.mkdir(path[, options], callback)`
- `fs.mkdirSync(path[, options])`
```js
// 异步创建
fs.mkdir('./page', err => {
  if (err) throw err
  console.log("success")
})
// 递归异步创建
fs.mkdir('./1/2/3', { recursive: true }, err => {
  if (err) throw err
  console.log("success")
})
// 递归同步创建
fs.mkdirSync("./x/y/z", { recursive: true })
```
### 2. 读取文件夹
- `fs.readdir(path[, options], callback)`
- `fs.readdirSync(path[, options])`
```js
fs.readdir('./test', (err, data) => {
  if (err) throw err
  console.log(data)
})
const res = fs.readdirSync("./test")
console.log(res)
```
### 3. 删除文件夹
- `fs.rmdir(path[, options], callback)`
- `fs.rmdirSync(path[, options])`
```js
fs.rmdir("./page", err => {
  if (err) throw err
  console.log("success")
})
fs.rmdir("./1/2/3", { recursive: true }, err => {
  if (err) throw err
  console.log("success")
})
fs.rmdirSync("./x/y/x", { recursive: true })
```
## 六、查看资源状态
- `fs.stat(path[, options], callback)`
- `fs.statSync(path[, options])`
```js
fs.stat("./test.txt", (err, data) => {
  if (err) throw err
  console.log(data)
})
const res = fs.statSync("./test.txt")
```
结果包括：
  - `size` 文件体积
  - `birthtime` 创建时间
  - `mtime` 最后修改时间
  - `isFile` 检测是否为文件
  - `isDirectory` 检测是否为文件夹
  - ...

## 七、相对路径与绝对路径
- 相对路径
  - `./test.txt | test.txt`
  - `../test.txt`
- 绝对路径
  - `D:/test.txt` `Windows`系统下
  - `/usr/bin` `Linux`系统下

## 八、__dirname
当前文件所在目录的绝对路径
```js
const data = fs.readFileSync(__dirname + '/data.txt')
console.log(data)
```

## 九、path 模块
- `path.resolve` 拼接规范的绝对路径常用
- `path.seq` 获取操作系统的路径分隔符
- `path.parse` 解析路径并返回对象
- `path.basename` 获取路径的基础名称
- `path.dirname` 获取路径目录名
- `path.extname` 获取路径拓展名
```js
const path = require('path');
//获取路径分隔符
console.log(path.sep);
//拼接绝对路径
console.log(path.resolve(__dirname, 'test'));
//解析路径
let pathname = 'D:/program file/nodejs/node.exe';
console.log(path.parse(pathname));
//获取路径基础名称
console.log(path.basename(pathname))
//获取路径的目录名
console.log(path.dirname(pathname));
//获取路径的扩展名
console.log(path.extname(pathname));
```

## 十、管道流
流式文件读写
```js
const rs = fs.createReadStream("a.txt")
const ws = fs.createWriteStream("b.txt")
// 监听流的开启和关闭
rs.once("open", () => console.log("可读流打开"))
rs.once("close", () => {
  console.log("可读流关闭")
  ws.end()
})
ws.once("open", () => console.log("可写流打开"))
ws.once("close", () => {
  console.log("可写流关闭")
})
rs.on("data", (data) => {
  ws.write(data)
})
```
采用`pipe`可以将`可读流`的内容直接写入`可写流`中
```js
const rs = fs.createReadStream("a.txt")
const ws = fs.createWriteStream("b.txt")
rs.pipe(ws)
```