# 拆分

对于一门语言的掌握程度怎么样, 可以用两个角度来衡量: 读和写

如何能正确地把一大串正则拆分成一块一块的, 成了破解"天书"的关键

## 一、结构和操作符
- 结构

|  结构  |                                               说明                                               |
| :----: | :----------------------------------------------------------------------------------------------: |
| 字面量 | 匹配一个具体字符, 包括不用转义和需要转义的。比如 `a`匹配字符 "a", `\n`匹配换行符, `\.`匹配小数点 |
| 字符组 |                                 匹配一个字符, 可能是多种可能之一                                 |
|  量词  |                                     表示一个字符连续出现次数                                     |
|   锚   |                                     匹配一个位置, 而不是字符                                     |
|  分组  |                                        用括号表示一个整体                                        |
|  分支  |                                        多个子表达式多选一                                        |

- 操作符

|  操作符描述  |                 操作符                  | 优先级 |
| :----------: | :-------------------------------------: | :----: |
|    转义符    |                   `\`                   |   1    |
| 括号和方括号 | `(…)`、`(?:…)`、`(?=…)`、`(?!…)`、`[…]` |   2    |
|  量词限定符  |  `{m}`、`{m,n}`、`{m,}`、`?`、`*`、`+`  |   3    |
|  位置和序列  |        `^`、`\元字符`、一般字符         |   4    |
|    管道符    |                  竖杠                   |   5    |

## 二、注意要点
### 匹配字符串整体问题
  
要匹配的目标字符串`abc`或`bcd`

一不小心就写成`/^abc|bcd$/`, 应该修改成`/^(abc|bcd)$/`

### 量词连缀问题

要匹配的字符串要求:
- 每个字符为"a"、"b"、"c"任选其一
- 字符串的长度为 3 的倍数

写成`/^[abc]{3}+/`, 这样子会报错, 说`+`前面没有什么可重复的, 应该修改成 `/([abc]{3})+/`

### 元字符转义问题
所谓元字符, 就是正则中有特殊含义的字符

包括`^、$、.、*、+、?、|、\、/、(、)、[、]、{、}、=、!、:、- ,`

当匹配到上面字符时, 可以一律转义
```js
const regex = /\^\$\.\*\+\?\|\\\/\[\]\{\}\=\!\:\-\,/;
const string = "^$.*+?|\\/[]{}=!:-,";
console.log( regex.test(string) ); // true
```
1. 字符组中的元字符
跟字符组相关的元字符`[]^-`在产生歧义的地方进行转义, 例如开头的`^`必须转义, 不然整个字符组被看成反义字符组
```js
const regex = /[\^$.*+?|\\/\[\]{}=!:\-,]/g;
const string = "^$.*+?|\\/[]{}=!:-,";
console.log( string.match(regex) ); // ["^", "$", ".", "*", "+", "?", "|", "\", "/", "[", "]", "{", "}", "=", "!", ":",
"-", ","]
```

2. 匹配 `[abc]` 和 `{3,5}`
通过`/\[abc]/` 实现转义, 将第一个方括号转义后, 后面的方括号构不成字符组, 从而避免歧义

通过`/\{3,5}/` 进行转义

3. 其余情况

比如 `=、!、:、-、,` 等符号，只要不在特殊结构中，并不需要转义。

但是，括号需要前后都转义的，如 `/\(123\)/`。

至于剩下的 `^、$、.、*、+、?、|、\、/` 等字符，只要不在字符组内，都需要转义的。

## 三、案例

### 身份证
`/^(\d{15}|\d{17}[\dxX])$/`

### IPV4
`/^((0{0,2}\d|0?\d{2}|1\d{2}|2[0-4]\d|25[0-5])\.){3}(0{0,2}\d|0?\d{2}|1\d{2}|2[0-4]\d|25[0-5])$/`

拆分结构为`((...)\.)3(...)`

其中两个`(...)`是一样的结构, 用于匹配三位数字, 那么整个的结构为`三位数.三位数.三位数.三位数`
