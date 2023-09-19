# 正则表达式编程

## 一、正则表达式的四种操作
在使用正则表达式时都需要先匹配, 才有其他操作: 验证、切分、提取、替换

所谓匹配，就是看目标字符串里是否有满足匹配的子串。因此, "匹配"的本质就是"查找"。

### 验证
有没有匹配，是不是匹配上，判断是否的操作，即称为"验证"。

- 判断一个字符串是否有数字
```js
const regex = /\d/
const str = "abc123"

console.log(!!~str.search(regex))
console.log(regex.test(str)) // 最常用
console.log(!!str.match(regex))
console.log(!!regex.exec(str))
```

### 切分
将目标字符串分段称为"切分"

```js
console.log("2023-09-19".split("-")) // [ '2023', '09', '19' ]
console.log("2023-09-19".split(/\D/)) // [ '2023', '09', '19' ]
```


### 提取
提取部分匹配的数据, 正则通常使用分组引用(分组捕获)

- 日期提取年月日
```js
const regex = /^(\d{4})\D(\d{2})\D(\d{2})$/
const str = "2023-09-19"

console.log(str.match(regex))
// [
//   '2023-09-19',
//   '2023',
//   '09',
//   '19',
//   index: 0,
//   input: '2023-09-19',
//   groups: undefined
// ]

console.log(regex.exec(str))
// [
//   '2023-09-19',
//   '2023',
//   '09',
//   '19',
//   index: 0,
//   input: '2023-09-19',
//   groups: undefined
// ]


regex.test(str)
console.log(RegExp.$1, RegExp.$2, RegExp.$3) // 2023 09 19
```

### 替换
- 日期格式替换
```js
const str = "2023-09-19"
console.log(str.replace(/-/g, '/')) // 2023-09-19
```

## 二、相关 API 注意要点
```js
String#search
String#split
String#match
String#replace
RegExp#test
RegExp#exec
```

### search 和 match 的参数问题
search 和 match 会把字符串转为正则的
```js
const string = "2017.06.27";
console.log( string.search(".") ); // 0
console.log( string.search("\\.") ); // 4

console.log( string.match(".") ); // ["2", index: 0, input: "2017.06.27"]
console.log( string.match("\\.") ); // [".", index: 4, input: "2017.06.27"]
```
### match 返回结果的格式问题
match 返回结果的格式，与正则对象是否有修饰符 g 有关。
```js
const string = "2017.06.27";
const regex1 = /\b(\d+)\b/;
const regex2 = /\b(\d+)\b/g;
console.log( string.match(regex1) ); // ["2017", "2017", index: 0, input: "2017.06.27"]
console.log( string.match(regex2) ); // ["2017", "06", "27"]
```

没有 g，返回的是标准匹配格式，即，数组的第一个元素是整体匹配的内容，接下来是分组捕获的内容，然后是整体匹配的第一个下标，最后是输入的目标字符串。

有 g，返回的是所有匹配的内容。

当没有匹配时，不管有无 g，都返回 null。

### exec 比 match 更强大
当正则没有 g 时，使用 match 返回的信息比较多。但是有 g 后，就没有关键的信息 index 了。

而 exec 方法就能解决这个问题，它能接着上一次匹配后继续匹配：

```js
var string = "2017.06.27";
var regex2 = /\b(\d+)\b/g;
console.log( regex2.exec(string) );
console.log( regex2.lastIndex);
console.log( regex2.exec(string) );
console.log( regex2.lastIndex);
console.log( regex2.exec(string) );
console.log( regex2.lastIndex);
console.log( regex2.exec(string) );
console.log( regex2.lastIndex);
// => ["2017", "2017", index: 0, input: "2017.06.27"]
// => 4
// => ["06", "06", index: 5, input: "2017.06.27"]
// => 7
// => ["27", "27", index: 8, input: "2017.06.27"]
// => 10
// => null
// => 0
```
其中正则实例 lastIndex 属性，表示下一次匹配开始的位置

### 修饰符 g，对 exex 和 test 的影响
字符串的四个方法，每次匹配时，都是从 0 开始的，即 lastIndex 属性始终不变

而正则实例的两个方法 exec、test，当正则是全局匹配时，每一次匹配完成后，都会修改 lastIndex

### test 整体匹配时需要使用 ^ 和 $
test 是看目标字符串中是否有子串匹配正则，即有部分匹配即可

如果，要整体匹配，正则前后需要添加开头和结尾

```js
console.log(/123/.test("a123b")); // true
console.log(/^123$/.test("a123b")); // false
console.log(/^123$/.test("123")); // true
```
### split 注意事项
1. split 第二个参数表示数组最大长度
```js
const str = "a,b,c"
console.log(str.split(/,/, 2)) // [ 'a', 'b' ]
```
2. 正则使用分组, 结果数组中是包含分隔符的
```js
const str = "a,b,c"
console.log(str.split(/(,)/)) // [ 'a', ',', 'b', ',', 'c' ]
```

### replace 是很强大的
replace 第二个参数可以是字符串也可以是函数

当第二个参数是字符串时, 如下的字符有特殊的含义
|        属性        |              描述              |
| :----------------: | :----------------------------: |
| `$1, $2, ..., $99` | 匹配第 1-99 个分组里捕获的文本 |
|        `$&`        |        匹配到的字串文本        |
|         $`         |     匹配到的字串的左边文本     |
|        `$'`        |     匹配到的字串的右边文本     |
|        `$$`        |            美元符号            |

```js
const str = "2,3,5"

console.log(str.replace(/(\d+),(\d+),(\d+)/, "$3=$1+$2")) // 5=2+3
console.log(str.replace(/(\d+)/g, "$&$&$&")) // 222,333,555
console.log("2+3=5".replace(/=/, "$&$`$&$'$&")) // 2+3=2+3=5=5
```
### 使用构造函数需要注意的问题
一般不推荐使用构造函数生成正则，而应该优先使用字面量。因为用构造函数会多写很多 \。
```js
var string = "2017-06-27 2017.06.27 2017/06/27";
var regex = /\d{4}(-|\.|\/)\d{2}\1\d{2}/g;
console.log( string.match(regex) );
// => ["2017-06-27", "2017.06.27", "2017/06/27"]
regex = new RegExp("\\d{4}(-|\\.|\\/)\\d{2}\\1\\d{2}", "g");
console.log( string.match(regex) );
// => ["2017-06-27", "2017.06.27", "2017/06/27"]
```
### 修饰符
| 修饰符 |                                       描述                                        |
| :----: | :-------------------------------------------------------------------------------: |
|   g    |                     全局匹配, 即找到所有匹配的, 单词是 global                     |
|   i    |                         忽略字母大小写, 单词是 ingoreCase                         |
|   m    | 多行匹配, 只影响 `^` 和 `$`, 二者变化行的概念, 即行开头和行结尾, 单词是 multiline |

### source 属性
在构建动态的正则表达式时，可以通过查看该属性，来确认构建出的正则到底是什么
```js
const className = 'container'
const regex = new RegExp("(^|\\s)" + className + "(\\s|$)")
console.log(regex.source) // (^|\s)container(\s|$)
```

### 构造函数的属性
|      静态属性       |              描述               |   简写形式   |
| :-----------------: | :-----------------------------: | :----------: |
|    RegExp.input     |       最近一次目标字符串        | RegExp["$_"] |
|  RegExp.lastMatch   |       最近一次匹配的文本        | RegExp["$&"] |
|  RegExp.lastParen   |       最近一次捕获的文本        | RegExp["$+"] |
| RegExp.leftContext  | 目标字符串中lastMatch之前的文本 | RegExp["$`"] |
| RegExp.rightContext | 目标字符串中lastMatch之后的文本 | RegExp["$'"] |


## 三、案例
### 使用构造函数生成正则表达式
- 实现 getElementsByClassName
```js
<p class="high">1111</p>
<p class="high">2222</p>
<p>3333</p>
<script>
function getElementsByClassName (className) {
  var elements = document.getElementsByTagName("*");
  var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
  var result = [];
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (regex.test(element.className)) {
      result.push(element)
    }
  }
  return result;
}
var highs = getElementsByClassName('high');
highs.forEach(function (item) {
  item.style.color = 'red';
});
</script>
```

### 使用字符串保存数据
```js
var utils = {};
"Boolean|Number|String|Function|Array|Date|RegExp|Object|Error".split("|").forEach(fun
ction (item) {
  utils["is" + item] = function (obj) {
    return {}.toString.call(obj) == "[object " + item + "]";
  };
});
console.log( utils.isArray([1, 2, 3]) ); // true
```

### 强大的 replace
```js
function compress (source) {
  const keys = {}
  source.replace(/([^=&]+)=([^&]*)/g, function (full, key, value) {
    keys[key] = (keys[key] ? keys[key] + ',' : '') + value
  })
  const res = []
  for (const key in keys) {
    res.push(key + "=" + keys[key])
  }
  return res.join("&")
}

console.log(compress("a=1&b=2&a=3&b=4")) // a=1,3&b=2,4
```

### 正则测试器