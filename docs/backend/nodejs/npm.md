# npm
**NPM**: `Node Package Manager`。官方链接: [https://www.npmjs.com/](https://www.npmjs.com/)

## 一. npm使用
### 1. 安装npm
安装 `Node` 自动安装 `npm` 

通过 `npm -v` 查看版本号, 显示版本号则表示安装成功

### 2. 初始化包
- 创建一个空的目录, 以此作为工作目录, 启动命令行工具
- 执行`npm init`
该命令会为该文件夹初始化一个包, 创建`package.json`文件(包的配置文件)

`package.json`
```json
{
  "name": "1-npm", #包的名字
  "version": "1.0.0", #包的版本
  "description": "", #包的描述
  "main": "index.js", #包的入口文件
  "scripts": { #脚本配置
  "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "", #作者
  "license": "ISC" #开源证书
}
```
> 初始化注意事项
> 
> 1. `name` 不能使用中文、大写 
> 2. `version` 格式为 `x.x.x`, `x`必须为数字, 默认为 `1.0.0`
> 3. `ISC` 证书 `MIT` 证书功能上相同, 关于开源证书拓展阅读[http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html](http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html)
> 4. `package.json` 可以手动创建和修改
> 5. `npm init -y` 或 `npm init --yes` 极速创建 `package.json`
>

### 3. 下载安装包
```shell
npm install [package]
npm i [package]
```
运行之后文件夹下会增加两个资源
- `node_modules` 存放下载的包
- `package.lock.json` 包的锁文件, 用来锁定包的版本

### 4. require 导入 npm 包基本流程
1. 在当前文件夹下`node_modules`中寻找同名的文件夹
2. 在上级目录下`node_modules`寻找同名的文件夹, 直到找到磁盘根目录

### 5. 生产环境与开发环境
|   类型   |               命令                |                                      补充                                       |
| :------: | :-------------------------------: | :-----------------------------------------------------------------------------: |
| 生产依赖 |   npm i -S xx / npm i -save xx    | -s 等效于 -save, -s是默认选项, 包信息保存在`package.json`中`dependencies`属性中 |
| 开发依赖 | npm i -D xx / npm i --save-dev xx |     -D 等效于 --save-dev 包信息保存在`package.json`中`devDependencies`属性      |

### 6. 全局安装
- 全局安装
```shell
npm i -g nodemon
```
- 查看全局安装包位置
```shell
npm root -g
```
### 7. 安装包依赖
```shell
npm i 
npm install
```
### 8. 安装指定包
```shell
npm i <包名@版本号>
npm i jquery@1.11.2
```

### 9. 删除依赖
```shell
## 局部删除
npm remove uniq
npm r uniq
## 全局删除
npm remove -g nodemon
```
### 10. 配置命令别名
配置`package.json`中的`script`属性
```json
{
  "script": {
    "server": "node server.js",
    "start": "node index.js"
  }
}
```
## 二、cnpm
淘宝构建的`npmjs.com`完整镜像, 网址: https://npmmirror.com/

`cnpm`部署在`阿里云服务器`, 可以提高下载速度
### 1. 安装
```shell
npm install -g cnpm --registry=https://registry.npmmirror.com
```
### 2. 命令
```shell
# 初始化
cnpm init
# 安装包
cnpm i uniq
cnpm i -S uniq
cnpm i -D uniq
cnpm i -g nodemon
# 安装项目依赖
cnpm i
# 删除
cnpm r uniq
```
### 3. npm 配置淘宝镜像
- 直接配置
```shell
npm config set registry https://registry.npmmirror.com/

```
- 工具配置
1. 安装`nrm`
```shell
npm i -g nrm
```
2. 修改镜像
```shell
nrm use taobao
```
3. 检查是否配置成功
```shell
npm config list
```
检查`registry`地址为`https://registry.npmmirror.com/`

## 三、yarn
`yarn` 由 `Facebook` 在2016年推出新的`JavaScript`包管理工具, 官方网址为 https://yarnpkg.com/

特点:
- 速度超快: `yarn`缓存每个下载过的包, 再次使用时无需重复下载, 同时利用并行下载以最大化资源利用率
- 超级安全: 在执行代码前, `yarn`会通过算法校验每个安装包的完整性
- 超级可靠: 使用详细、简洁的锁文件格式和明确的安装算法, `yarn`能够保证在不同系统上无差异的工作

### 1. 安装
```shell
npm i -g yarn
```
### 2. 命令
```shell
# 初始化
yarn init 
yarn init -y
# 安装包
## 生产依赖
yarn add uniq
## 开发依赖
yarn add less --dev
## 全局安装
yarn global add nodemon
# 删除包
## 删除项目依赖包
yarn remove uniq
## 全局删除包
yarn global remove nodemon
# 运行命令别名
yarn <别名> 
```
### 3. yarn 配置淘宝镜像
- 配置淘宝镜像
```shell
yarn config set registry https://registry.npmmirror.com/
```
- 查看配置项
```shell
yarn config list
```
### 4. npm 和 yarn 选择
- 通过锁文件判断项目包管理工具
  - `npm` 锁文件 `package.lock.json`
  - `yarn` 锁文件 `yarn.lock`
- 包管理工具不要混着用!

## 四、管理发布包
### 1. 创建与发布
1. 创建文件夹, 创建文件`index.js`, 在文件中声明函数, 使用`module.exports`暴露
2. `npm` 初始化工具包, `package.json`填写包信息
3. 注册账号 https://www.npmjs.com/signup
4. 激活账号
5. 修改为官方镜像 `nrm use npm`
6. 命令行下 `npm login` 填写相关用户信息
7. 命令行下 `npm publish` 提交包
  
### 2. 更新包
1. 更新包中的代码
2. 测试代码是否可用
3. 修改`package.json`中的版本号
4. 发布更新 `npm publish`
  
### 3. 删除包
`npm unpublish --force`
> 注意事项
> 
> 删除包需要满足一定的条件，https://docs.npmjs.com/policies/unpublish
> - 你是包作者
> - 发布小于24小时
> - 大于24小时, 没有其他包依赖, 并且每周小于300下载量, 并且只有一个维护者
>

## 五、nvm
`nvm` 用来管理`node`版本工具, 方便切换不同版本

### 1. 安装
下载`nvm`, 下载地址为 https://github.com/coreybutler/nvm-windows/releases

选择`nvm-setup.exe`下载即可

### 2. 命令
```shell
# 查看所有可下载的 Node.js 版本
nvm list available
# 查看已安装的版本
nvm list
# 安装指定版本
nvm install 18.12.1
# 安装最新版的 Node.js
nvm install latest
# 删除某个版本的 Node.js
nvm uninstall 18.12.1
# 切换版本
nvm use 18.12.1
```
