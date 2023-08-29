# run

## npm run xxx 会发生什么
```shell
npm run vite
```
```json
{
  "script": {
    "dev": "vite"
  }
}
```
读取 package.json 的 script 对应的脚本命令, vite 是一个可执行脚本, 它的查找规则是:
- 先从当前项目的 node_modules/.bin 去查找可执行命令 vite
- 如果没找到就去全局的 node_modules 去找可执行命令 vite
- 如果还没找到就去环境变量中查找
- 再找不到就进行报错


在 node_modules 中有三个文件
> 因为 nodejs 是跨平台的所以可执行命令兼容各个平台

- .sh 文件是给Linux unix Macos 使用
- .cmd 给 windows 的 cmd 使用
- .ps1 给 windows 的 powerShell 使用


## npm 生命周期

```json
"predev": "node prev.js",
"dev": "node index.js",
"postdev": "node post.js"
```
- 执行 npm run dev 命令的时候 predev 会自动执行 他的生命周期是在 dev 之前执行，
- 然后执行 dev 命令
- 再然后执行 postdev，也就是dev之后执行
  - 应用场景
    - npm run build 可以在打包之后删除dist目录
    - 编写完一个工具发布 npm，那就可以在之后写一个 ci 脚本顺便帮你推送到 git 等等([vue-cli](https://github.com/vuejs/vue-cli/blob/dev/package.json#L10))



:::tip 参考
[Nodejs 第五章（Npm run 原理）](https://juejin.cn/post/7261235534663368741)
:::