# 类型系统

## 一、基本类型
- boolean
- string
- number
- bigint
- symbol
- object
- undefined
- null

## 二、包装对象类型

`boolean`、`string`、`number`、`bigint`和 `symbol` 这五种基本类型的值, 都有对应的包装对象。包装对象指的是这些值在需要时会自动产生的对象

```ts
const str = '123'
console.log(typeof str) // string
console.log(str.charAt(0)) // '1'
```
- 五种包装对象中, symbol 类型和 bigint 类型无法直接读取它们的包装对象(即 `Symbol` 和 `Bigint` 不能作为构造函数使用), `Boolean`、`String`、`Number()`可以
- 每个原始类型的值都有包装对象和字面量两种形式, 通过大小写区分
  - Boolean 和 boolean
  - String 和 string
  - Number 和 number
  - Bigint 和 bigint
  - Symbol 和 symbol
  - 其中大写类型同时包含包装对象和字面量, 小写类型只包含字面量

## 三、Object 类型与 object 类型
### 1. Object 类型
`Object` 类型代表 JS 语言里面的广义对象。所有可以转成对象的值, 都是`Object`类型
```ts
let obj: Object

obj = true
obj = 1
obj = '1'
obj = { foo: 123 }
obj = [1, 2]
obj = (a: number) => a + 1

obj = undefined // 不能将类型“undefined”分配给类型“Object”。ts(2322)
obj = null // 不能将类型“null”分配给类型“Object”。ts(2322)
```
- 空对象`{}`是`Object`类型的简写形式

### 2. object 类型
`object`代表 JS 里面的狭义对象, 即可以用字面量表示的对象, 只包含对象、数组和函数, 不包含原始类型的值
```ts
let obj: object

obj = true // 不能将类型“boolean”分配给类型“object”。
obj = 1 // 不能将类型“number”分配给类型“object”。
obj = '1' // 不能将类型“string”分配给类型“object”。
obj = { foo: 123 }
obj = [1, 2]
obj = (a: number) => a + 1
```
- 无论是`Object`还是`object`都只包含 JS 内置对象原生的属性和方法

## 四、undefined 和 null 的特殊性
- `undefined` 和 `null` 既是值, 又是类型
- 作为值, 任何其他类型的变量都可以赋值为 `undefined` 和 `null`

## 五、值类型
单个值也是一种类型
- ts 在推断类型时, 遇到`const`命令的变量, 如果没有标注类型, 就会推断该变量为值类型(如果赋值为对象, 并不会推断为值类型)

## 六、联合类型
联合类型用`A|B`表示, 任何一个类型只要属于`A`或`B`, 就属于联合类型`A|B`
- 一个变量采用联合类型读取时, 需要进行类型缩小(区分该值具体属于哪种类型, 再进行处理)

## 七、 交叉类型
交叉类型`A&B`表示，任何一个类型必须同时属于`A`和`B`，才属于交叉类型`A&B`，即交叉类型同时满足`A`和`B`的特征。
- 对象的合成
```ts
let obj: 
  { foo: string } & 
  { bar: string }
obj = {
  foo: 'hello',
  bar: 'ts'
}
```
- 对象类型添加属性
```ts
type A = { foo: number };
type B = A & { bar: number }
```

## 八、type 类型别名
- 别名不允许重名
- 别名的作用域是块级作用域
- 别名支持使用表达式，也可以在定义一个别名时，使用另一个别名，即别名允许嵌套。

## 九、typeof 运算符
TypeScript 将`typeof`运算符移植到了类型运算，它的操作数依然是一个值，但是返回的不是字符串，而是该值的 TypeScript 类型。
```typescript
const a = { x: 0 };

type T0 = typeof a;   // { x: number }
type T1 = typeof a.x; // number
```
- `typeof`用于返回 TypeScript 类型, 只能用在类型运算之中, 不能用在值运算
- `typeof`的参数只能是标识符, 不能是需要运算的表达式或类型
```ts
type T = typeof Date(); // 报错
type Age = number;
type MyAge = typeof Age; // 报错
```

## 十、块级类型声明
TypeScript 支持块级类型声明，即类型可以声明在代码块（用大括号表示）里面，并且只在当前代码块有效。

## 十一、类型兼容
如果类型 A 的值可以赋值给类型 B, 那么类型 A 就成为类型 B 的子类型

凡是可以使用父类型的地方, 都可以使用子类型, 但是反过来不行(因为子类型继承了父类型的所有特征，所以可以用在父类型的场合。但是，子类型还可能有一些父类型没有的特征，所以父类型不能用在子类型的场合。)

```ts
let a: 'alexshwing' = 'alexshwing'
let b: string = 'alexshwing'

a = b // 报错
b = a // 正确
```