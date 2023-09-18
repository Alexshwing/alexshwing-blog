# 字符匹配

正则表达式是匹配模式，要么匹配字符，要么匹配位置

## 一. 模糊匹配
### 横向模糊匹配
一个正则可匹配的字符串的长度不是固定的, 可以是多种情况
```js
const str = 'abc abbc abbbc abbbbc abbbbbc'
console.log(str.match(/ab{2,4}c/g)) // [ 'abbc', 'abbbc', 'abbbbc' ]
```
### 正向模糊匹配
一个正则匹配的字符串，具体到某一位字符时，它可以不是某个确定的字符，可以有多种可能
```js
const str = 'a1c a2c a3c a4c'
console.log(str.match(/a[1-3]c/g)) // [ 'a1c', 'a2c', 'a3c' ]
```

## 二. 字符组
### 范围表示法
- `[1-6a-fA-F]`
- 匹配 `a`、`-`、`z` 任意字符使用`[-az]`、`[az-]`、`[a\-z]`
### 排除字符组
- `[^abc]`
  - `^` 脱字符
  - 除了 abc 外任意字符

### 简写
| 字符组 |      等价表示       |                               含义                               |
| :----: | :-----------------: | :--------------------------------------------------------------: |
|   \d   |        [0-9]        |                             数字字符                             |
|   \D   |       [^0-9]        |                            非数字字符                            |
|   \w   |    [0-9a-zA-Z_]     |                        数字、字母、下划线                        |
|   \W   |    [^0-9a-zA-Z_]    |                            非单词字符                            |
|   \s   |    [\t\v\n\r\f]     | 空白符，包括空格、水平制表符、垂直制表符、换行符、会车符、换页符 |
|   \S   |    [^\t\v\n\r\f]    |                             非空白符                             |
|   .    | [^\n\r\u2028\u2029] |          通配符。换行符、回车符、行分隔符和列分隔符除外          |

- 匹配任意字符
  - `[\d\D]`
  - `[\w\W]`
  - `[\s\S]`
  - `[^]`

## 三. 量词
### 简写
|  量词   |              含义               |
| :-----: | :-----------------------------: |
| `{m,n}` |  至少出现 m 次, 至多出现 n 次   |
| `{m,}`  |          至少出现 m 次          |
|  `{m}`  |   等价于 {m,m} 必须出现 m 次    |
|    ?    | 等价于 {0,1} 要么出现要么不出现 |
|    +    |    等价于 {1,} 至少出现一次     |
|    *    |     等价于 {0,} 出现任意次      |
### 匹配模式
匹配模式分为贪婪匹配和惰性匹配

贪婪匹配为尽可能多的匹配, 惰性匹配为尽可能少的匹配

在量词后添加 `?` 即可将贪婪匹配转为惰性匹配
```js
const str = '123456'
console.log(str.match(/\d{1,3}/g)) // [ '123', '456' ]
console.log(str.match(/\d{1,3}?/g)) // [ '1', '2', '3', '4', '5', '6' ]
```

## 四. 多选分支
- (p1|p2|p3)
  - p1、p2、p3 是子模式, 用 `|` (管道符) 分隔表示其中任何之一

```js
const regex = /good|nice/g
const str = 'good idea, nice try.'
console.log(str.match(regex)) // [ 'good', 'nice' ]
```
多选分支也是惰性的
```js
const regex = /good|goodbye/g
const str = 'goodbye'
console.log(str.match(regex)) // [ 'good' ]
```

## 五. 案例
### 匹配 16 进制颜色值
```js
const regex = /#([0-9a-zA-Z]{6}|[0-9a-zA-Z]{3})/g;
const string = "#ffbbad #Fc01DF #FFF #ffE";
console.log( string.match(regex) );
```
### 匹配时间
```js
const regex = /^(0?[0-9]|1[0-9]|[2][0-3]):(0?[0-9]|[1-5][0-9])$/
const string1 = "23:12";
const string2 = "02:07";
const string3 = "2:7";
console.log( regex.test(string1) );
console.log( regex.test(string2) );
console.log( regex.test(string3) );
```
> 正则中使用了 ^ 和 $，分别表示字符串开头和结尾
### 匹配日期
```js
const regex = /^[0-9]{4}-(0[0-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
const str = "2017-06-10";
console.log( regex.test(str) );
```

### window 操作系统文件路径
```js
const regex = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/;
console.log( regex.test("F:\\study\\javascript\\regex\\regular expression.pdf") );
console.log( regex.test("F:\\study\\javascript\\regex\\") );
console.log( regex.test("F:\\study\\javascript") );
console.log( regex.test("F:\\") );
```
- `[^\\:*<>|"?\r\n/]` 文件名或文件夹名, 不包含特殊字符

### 匹配 id 
```js
const regex = /id=".*?"/
const string = `<div id="container" class="main"></div>`
console.log(string.match(regex))
```
由于匹配原理涉及到"回溯", 效率比较低, 修改如下
```js
const regex = /id="[^"]*"/
const string = `<div id="container" class="main"></div>`
console.log(string.match(regex))
```
