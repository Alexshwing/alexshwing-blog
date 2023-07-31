# npm
**NPM**: `Node Package Manager`。官方链接: [https://www.npmjs.com/](https://www.npmjs.com/)

## 1. npm使用
### 安装npm
安装 `Node` 自动安装 `npm` 

通过 `npm -v` 查看版本号, 显示版本号则表示安装成功

### 初始化包
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

### 下载安装包
```shell
npm install [package]
npm i [package]
```