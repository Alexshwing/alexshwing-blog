# module

## 一、简介
任何包含 import 或 export 语句的文件, 就是一个模块

如果一个文件不包含 export 语句，但是希望把它当作一个模块（即内部变量对外不可见），可以在脚本头部添加一行语句 `export {}`

## 二、import type 语句
1. 在 import 语句输入类型前面添加 type 关键字
- a.ts
```ts
export interface A {
  foo: string;
}
export let a = 123;
```
- b.ts
```ts
import { type A, a} from './a'
```

2. 使用 import type 语句, 这个语句只能输入类型, 不能输入正常接口
```ts
import type { A } from './a' // 正确
import type { a } from './a' // 报错
```

3. export 也有两种方法, 表示输出的是类型
```ts
type A = 'a'
export { type A } // 方法一
export type { A } // 方法二
```

## 三、CommonJS 模块
CommonJS 是 Node.js 的专用模块格式, 与 ES 模块格式不兼容
### 1. import = 语句
- ts 使用 `import=`语句输入 CommonJS 模块
```ts
import fs = require("fs")
```
- ts 还允许使用 `import * as [接口名] from 模块文件` 输入 CommonJS 模块
```ts
import * as fs from 'fs'
```
### 2. export = 语句
ts 使用 `export=`语句输出 CommonJS 模块的对象, 等同于 CommonJS 的 `module.exports` 对象
```ts
const obj = { foo: 123 }
export = obj
```
`export=`语句输出的对象, 只能使用`import=`语句加载
```ts
import obj = require('./a')
obj.foo
```
