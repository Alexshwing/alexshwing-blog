# 位置匹配

## 一. 位置
位置(锚)是相邻字符之间的位置

`(↑)a(↑)b(↑)c(↑)d(↑)e(↑)`

- (↑) 表示位置
## 二. 如何匹配位置
### ^ 和 $
- ^ (脱字符) 匹配开头, 在多行匹配中匹配行开头
- $ (美元符号) 匹配结尾, 在多行匹配中匹配行结尾

```js
console.log("hello".replace(/^|$/g, '#')) // #hello#
```

多行匹配模式 (即有修饰符 m)
```js
console.log("I\nlove\njavascript".replace(/^|$/gm, '#')) 
// #I#
// #love#
// #javascript#
```

### \b 和 \B
`\b` 单词边界, 具体是`\w 和 \W 、\w 和 ^ 、\w 和 $`之间的位置
```js
console.log("[JS] Lession_01.mp4".replace(/\b/g, '#')) // [#JS#] #Lession_01#.#mp4#
```

`\B` 非单词边界, 在字符串所有位置中, 扣除 `\b` 所指位置后剩余的位置, 具体是 `\w 和 \w 、\W 和 \W 、^ 和 \W, \W 和 $ `之间的位置
```js
console.log("[JS] Lession_01.mp4".replace(/\B/g, '#')) // #[J#S]# L#e#s#s#i#o#n#_#0#1.m#p#4
```

### `(?=p)` 和 `(?!p)`
- `(?=p)`
其中 p 是一个子模式, 即 p 前面的位置, 或者说该位置后面的字符要匹配 p 
- `(?!p)`
是 `(?=p)` 的反面意思

```js
console.log("hello".replace(/(?=l)/g, '#')) // he#l#lo
console.log("hello".replace(/(?!l)/g, '#')) // #h#ell#o#
```

二者学名为 positive lookahead 和 negative lookahead

中文翻译为 正向先行断言 和 负向先行断言

ES5 之后的版本，会支持 positive lookbehind 和 negative lookbehind。

具体是 `(?<=p)` 和 `(?<!p)`。

## 三. 位置特性
将位置理解为空字符
```js
"hello" = "" + "h" + "" + "e" + "" + "l" + "" + "l" + "" + "o" + ""
```
## 四. 案例
### 不匹配任何东西的正则
```js
const reg = /.^/
```

### 数字千分位
```js
const str = '123456789'
const regex = /(?!^)(?=(\d{3})+$)/g
console.log(str.replace(regex, ',')) // 123,456,789
```
如果要把 `12345678 123456789` 替换成 `12,345,678 123,456,789`。
此时我们需要修改正则，把里面的开头 `^` 和结尾 `$` ，修改成 `\b` ：
```js
const str = '12345678 123456789'
const regex = /(?!\b)(?=(\d{3})+\b)/g
console.log(str.replace(regex, ',')) // 12,345,678 123,456,789
```
其中`(?!\b)`等价于`\B`, 所以上述代码等价于 
```js
const str = '12345678 123456789'
const regex = /\B(?=(\d{3})+\b)/g
console.log(str.replace(regex, ',')) // 12,345,678 123,456,789
```

- 货币格式化
```
input 
1888

output 
$ 1,888.00
```
```js
const str = 1888
function format (num) {
  return num.toFixed(2).replace(/\B(?=(\d{3})+\b)/g, ',').replace(/^/, "$$ ")
}
console.log(format(str))
```
### 验证密码
密码长度为 6-12 位, 由数字、大写字母和小写字母组成, 包含两种字符

1. 密码长度为 6-12 位, 由数字、大写字母和小写字母组成
```js
const regex = /^[0-9a-zA-Z]{6,12}$/
```
2. 包含数字字符
```js
const regex = /(?=.*[0-9])^[0-9a-zA-Z]{6,12}$/
```
3. 包含数字或小写字母
```js
const regex = /(?=.*[0-9])(?=.*[a-z])^[0-9A-Za-z]{6,12}$/
```
4. 分类讨论
把原问题分类讨论成下述情况

- 同时包含数字和小写字母
- 同时包含数字和大写字母
- 同时包含小写和大写字母
- 同时包含数字、小写和大写字母 (包含在上面的情况中)
```js
const regex = /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[AZ]))^[0-9A-Za-z]{6,12}$/;
console.log( regex.test("1234567") ); // false 全是数字
console.log( regex.test("abcdef") ); // false 全是小写字母
console.log( regex.test("ABCDEFGH") ); // false 全是大写字母
console.log( regex.test("ab23C") ); // false 不足6位
console.log( regex.test("ABCDEF234") ); // true 大写字母和数字
console.log( regex.test("abcdEF234") ); // true 三者都有
```
5. 解惑

步骤2中的`/(?=.*[0-9])^[0-9a-zA-Z]{6,12}$/`是解题的关键

只需要弄明白 `(?=.*[0-9])^`, 将它拆分为 `(?=.*[0-9])` 和 `^`

表示开头前面还有个位置, 当然也是开头, 即同一个位置

`(?=.*[0-9])^` 表示 有任何多个任意字符，后面再跟个数字

翻译成大白话, 接下来的字符必须包含数字

6. 另一种解法
“至少包含两种字符”的意思就是说，不能全部都是数字，也不能全部都是小写字母，也不能全部都是大写
字母。

不能都是数字 `/(?!^[0-9]{6,12}$)^[0-9A-Za-z]{6,12}$/`

三者都不能 `/(?!^[0-9]{6,12}$)(?!^[a-z]{6,12}$)(?!^[A-Z]{6,12}$)^[0-9A-Za-z]{6,12}$/`