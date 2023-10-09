# 基础

:::tip 参考
[阮一峰 TypeScript 教程](https://wangdoc.com/typescript/)
:::

## 一、基本类型

boolean、string、number、bigint、symbol、object、undefined、null

## 二、包装对象类型

`boolean`、`string`、`number`、`bigint`和 `symbol` 这五种基本类型的值, 都有对应的包装对象。包装对象指的是这些值在需要时会自动产生的对象

```ts
const str = '123'
console.log(typeof str) // string
console.log(str.charAt(0)) // '1'
```
- 五种包装对象中, symbol 类型和 bigint 类型无法直接读取它们的包装对象(即 `Symbol` 和 `Bigint` 不能作为构造函数使用)
- 每个原始类型的值都有包装对象和字面量两种形式, 通过大小写区分, 其中大写类型同时包含包装对象和字面量, 小写类型只包含字面量
  - Boolean 和 boolean
  - String 和 string
  - Number 和 number
  - Bigint 和 bigint
  - Symbol 和 symbol

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
联合类型用`A | B`表示, 任何一个类型只要属于`A`或`B`, 就属于联合类型`A | B`
- 一个变量采用联合类型读取时, 需要进行类型缩小(区分该值具体属于哪种类型, 再进行处理)

## 七、交叉类型
交叉类型`A & B`表示，任何一个类型必须同时属于`A`和`B`，才属于交叉类型`A & B`，即交叉类型同时满足`A`和`B`的特征。
```ts
// 1. 对象的合成
let obj: 
  { foo: string } & 
  { bar: string }
obj = {
  foo: 'hello',
  bar: 'ts'
}
// 2. 对象类型添加属性
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

## 十、类型兼容
如果类型 A 的值可以赋值给类型 B, 那么类型 A 就成为类型 B 的子类型

凡是可以使用父类型的地方, 都可以使用子类型, 但是反过来不行(因为子类型继承了父类型的所有特征，所以可以用在父类型的场合。但是，子类型还可能有一些父类型没有的特征，所以父类型不能用在子类型的场合。)

```ts
let a: 'alexshwing' = 'alexshwing'
let b: string = 'alexshwing'

a = b // 报错
b = a // 正确
```


## 十一、any
any 类型表示没有任何限制, 该类型的变量可以赋予任意类型的值

从集合论的角度看, `any` 类型可以看成所有其他类型的全集, 包含了一切可能的类型。ts 将这种类型称为"顶层类型"

- 它会污染其他具有正确类型的变量，把错误留到运行时
```ts
let x: any = 'alexshwing';
let y: number

y = x // 不报错
y * 123 // 不报错
y.toFiexed() // 不报错, 错误在运行时才会暴露
```

## 十二、unknown
所有类型的值都可以分配给`unknown`类型, 但它不能直接赋值给其他类型的变量(除了`any`和`unknown`), 也不能直接调用`unknown`类型变量的方法和属性, 再次, `unkonwn`只能进行比较运算(运算符`==`、`===`、`!=`、`!==`、`||`、`&&`、`?`)、取反运算(运算符`!`)、`typeof`运算符和`instanceof`运算符

```ts
let v: unknown = 123
let v1: boolean = v // 报错
let v2: unknown = { foo: 123 }
v2.foo // 报错
let v3: unknown = 'alexshwing'
v3.trim() // 报错
```

- 使用`unknown`类型变量需要进行类型缩小
```ts
const a: unknown = 1
if (typeof a === 'number') {
  let r = a + 1
}
```
在集合论上，`unknown`也可以视为所有其他类型（除了`any`）的全集，所以它和`any`一样，也属于 TypeScript 的顶层类型。

## 十三、never
为了保持与集合论的对应关系，以及类型运算的完整性，TypeScript 还引入了“空类型”的概念，即该类型为空，不包含任何值。由于不存在任何属于“空类型”的值，所以该类型被称为`never`，即不可能有这样的值。

- 如果一个变量可能有多种类型（即联合类型），通常需要使用分支处理每一种类型。这时，处理所有可能的类型之后，剩余的情况就属于`never`类型。
- `never`类型的一个重要特点是，可以赋值给任意其他类型。
  - 这也跟集合论有关，空集是任何集合的子集。TypeScript 就相应规定，任何类型都包含了`never`类型。因此，`never`类型是任何其他类型所共有的，TypeScript 把这种情况称为“底层类型”（bottom type）。

## 十四、数组
ts 数组有一个根本特征: 所有成员的类型必须相同, 但是成员数量是不确定的

### 只读数组
```ts
const arr: readonly number[] = [0, 1]
arr[1] = 2 // 报错
arr.push(3) // 报错
delete arr[0] // 报错
```
ts 将 `readonly number[]` 与 `number[]` 视为两种不同类型, 后者是前者子类型
> 这是因为只读数组没有`pop()`、`push()`之类会改变原数组的方法，所以`number[]`的方法数量要多于`readonly number[]`，这意味着`number[]`其实是`readonly number[]`的子类型。


## 十五、元组
### 1、简介
元组表示成员类型可以自由设置的数组, 即数组的各个成员的类型可以不同。由于成员的类型不一样, 所以元组必须明确声明每个成员的类型。
- 元组成员类型可以添加问号后缀, 表示该成员可选
- 元组不能有越界的成员
- 使用拓展运算符表示不限成员数量的元组
```ts
const a: [string, number] = ['a', 1]

const b: [number, number?] = [1]

const c: [string] = ['a']
c[2] = 'b' // 报错

const d: [string, ...number[]] = ['a', 1, 2, 3, 4]
```

### 2、只读元组
```ts
type T = readonly [number, string]

type T = Readonly<[number, string]> 
```
跟数组一样，只读元组是元组的父类型。所以，元组可以替代只读元组，而只读元组不能替代元组。

### 3、成员数量判断
- 如果没有可选成员和拓展运算符, ts 会推断出元组的成员数量
- 如果包含了可选成员, ts 会推断出可能的成员数量
- 如果使用了扩展运算符，TypeScript 就无法推断出成员数量。

## 十六、symbol

### 1、简介
每一个 Symbol 值都是独一无二的
```ts
let x: symbol = Symbol()
let y: symbol = Symbol()
x === y // false
```

### 2、unique symbol
ts 设计了`symbol`的一个子类型`unique symbol`，它表示单个的、某个具体的 Symbol 值。

因为`unique symbol`表示单个值，所以这个类型的变量是不能修改值的，只能用`const`命令声明，不能用`let`声明。`const`命令为变量赋值 Symbol 值时，变量类型默认就是`unique symbol`，所以类型可以省略不写。

- unique symbol 类型的一个作用，就是用作属性名，这可以保证不会跟其他属性名冲突。如果要把某一个特定的 Symbol 值当作属性名，那么它的类型只能是 `unique symbol`，不能是 `symbol`。

```typescript
const x:unique symbol = Symbol();
const y:symbol = Symbol();

interface Foo {
  [x]: string; // 正确
  [y]: string; // 报错
}
```

- `unique symbol`类型也可以用作类（class）的属性值，但只能赋值给类的`readonly static`属性。
```ts
class C {
  static readonly foo:unique symbol = Symbol();
}
```

## 十七、函数

### 1、简介
- 函数的类型声明，需要在声明函数时，给出参数的类型和返回值的类型
- 函数实参个数可以少于类型指定的参数个数, 但是不能多于
- 使用 `typeof` 运算符获取函数的类型

### 2、Function 类型
Function 类型表示函数, 任何函数都属于这个类型。Function 类型的函数可以接受任意数量的参数，每个参数的类型都是`any`，返回值的类型也是`any`，代表没有任何约束。

### 3、never 类型
`never` 用在函数的返回值, 就表示某个函数肯定不会返回值, 即函数不会正常执行结束。如果程序中调用了一个返回值类型为`never`的函数，那么就意味着程序会在该函数的调用位置终止，永远不会继续执行后续的代码。
- 抛出错误的函数
```ts
function fail(msg:string):never {
  throw new Error(msg);
}
```
如果显式用`return`语句返回一个 Error 对象，返回值就不是 never 类型。

另外，由于抛出错误的情况属于`never`类型或`void`类型，所以无法从返回值类型中获知，抛出的是哪一种错误。

- 无限执行的函数
```ts
const sing = function(): never {
  while (true) {
    console.log("sing")
  }
}
```

## 十八、对象
### 1、简介
对象类型的最简单声明方法，就是使用大括号表示对象，在大括号内部声明每个属性和方法的类型。
- 一旦声明了类型，对象赋值时，就不能缺少指定的属性，也不能有多余的属性。
- 对象类型可以使用方括号读取属性的类型 `type Name = User['name']`
### 2、可选属性
如果某个属性是可选的（即可以忽略），需要在属性名后面加一个问号。
- 可选属性等同于允许赋值为`undefined`
- 可选属性与允许设为`undefined`的必选属性是不等价的
  - 可选属性可以省略不写, 如何是允许设为`undefined`的必选属性, 一旦省略就会报错

### 3、只读属性
属性名前面加上`readonly`关键字，表示这个属性是只读属性，不能修改。
- 只读属性只能在对象初始化期间赋值，此后就不能修改该属性。
- 在赋值时，在对象后面加上只读断言`as const`也可以将属性值设置为只读。
- 如果一个对象有两个引用，即两个变量对应同一个对象，其中一个变量是可写的，另一个变量是只读的，那么从可写变量修改属性，会影响到只读变量。

### 4、属性名的索引类型
TypeScript 允许采用属性名表达式的写法来描述类型，称为“属性名的索引类型”。

```ts
type T1 = {
  [property: string]: string
}

type T2 = {
  [property: number]: string
};

type T3 = {
  [property: symbol]: string
};
```
- 对象可以同时有多种类型的属性名索引，比如同时有数值索引和字符串索引。但是，数值索引不能与字符串索引发生冲突，必须服从后者，这是因为在 JavaScript 语言内部，所有的数值属性名都会自动转为字符串属性名。
- 同样地，可以既声明属性名索引，也声明具体的单个属性名。如果单个属性名符合属性名索引的范围，两者不能有冲突，否则报错。
- 属性名的数值索引不宜用来声明数组，因为采用这种方式声明数组，就不能使用各种数组方法以及`length`属性

### 5、解构赋值
```ts
const {id, name, price} = product
```

### 6、结构类型原则

只要对象 B 满足 对象 A 的结构特征，TypeScript 就认为对象 B 兼容对象 A 的类型，这称为“结构类型”原则（structural typing）。
```ts
const B = { x: 1, y: 1 }
const A: { x: number } = B; // 正确
```
> `B` 满足 `A` 的结构特征
>
>
> 根据"结构类型"原则, ts 检查某个值是否符合指定类型时, 并不是检查这个值的类型名(即"名义类型"), 而是检查这个值的结构是否符合要求(即"结构类型")
>
> 
> 如果类型 B 可以赋值给类型 A，TypeScript 就认为 B 是 A 的子类型（subtyping），A 是 B 的父类型。子类型满足父类型的所有结构特征，同时还具有自己的特征。凡是可以使用父类型的地方，都可以使用子类型，即子类型兼容父类型。

### 7、严格字面量检查
如果对象使用字面量表示, 会触发 ts 的严格字面量检查。如果字面量的结构跟类型定义的不一样(比如多出未定义的属性), 就会报错

如果等号右边不是字面量，而是一个变量，根据结构类型原则，是不会报错的。


```typescript
const point1:{
  x:number;
  y:number;
} = {
  x: 1,
  y: 1,
  z: 1 // 报错
};

const myPoint = {
  x: 1,
  y: 1,
  z: 1
};

const point2:{
  x:number;
  y:number;
} = myPoint; // 正确
```

### 8、最小可选属性原则
ts 2.4 引入"最小可选属性原则"(也称为"弱类型检测")。如果某个类型的所有属性都是可选的, 那么该类型的对象必须**至少存在**一个可选属性。

### 9、空对象
- 空对象是 TypeScript 的一种特殊值，也是一种特殊类型。
  - 空对象没有自定义属性，所以对自定义属性赋值就会报错。
  - 空对象只能使用继承的属性。
  - 空对象作为类型，其实是`Object`类型的简写形式。
```ts
const obj = {}
obj.prop = 123 // 报错
obj.toString() // 正确
let d: {} // 等同于 let d: Object
```

## 十九、接口
### 1、定义
interface 是对象的模板, 可以看作是一种类型约定, 中文译为"接口"。使用某个模板的对象, 就拥有了指定的类型结构

```ts
interface Person {
  name: string
  age: number
}
const p: Person = {
  name: 'alexshwing',
  age: 23,
}

type A = Person['age'] // number
```
### 2、成员
interface 可以表示对象的各种语法, 它的成员有五种形式
- 对象属性
```ts
interface A {
  x: number
  y?: number // 可选
  readonly z: number // 只读
}
```
- 对象属性索引
  - 属性索引有 `string`、`number` 和 `symbol` 三种类型
  - 属性的数值索引，其实是指定数组的类型。
  - 数值索引必须服从于字符串索引
```ts
interface A {
  [prop: string]: number // 属性的字符串索引
}
```
 
- 对象方法
```ts
interface A {
  f: (x: boolean) => string
}
```

- 函数
```ts
interface Add {
  (x: number, y: number): number;
}
const myAdd: Add = (x, y) => x + y;
```

- 构造函数
```typescript
interface ErrorConstructor {
  new (message?: string): Error;
}
```

### 3、继承
使用 `extends` 关键字可以继承

- 继承 interface 
  - interface 允许多重继承
  - 如果子接口与父接口存在同名属性, 那么子接口的属性会覆盖父接口的属性。注意，子接口与父接口的同名属性必须是类型兼容的，不能有冲突，否则会报错。

- 继承 type
  - 如果 type 命令定义的类型不是对象, interface 就无法继承

- 继承 class
  - interface 可以继承具有私有成员和保护成员的类, 但是意义不大

### 4、合并
多个同名接口会合并成一个接口
  - 同名接口合并时, 同一个属性如果有多个类型声明, 彼此不能有类型冲突
  - 同名接口合并时，如果同名方法有不同的类型声明，那么会发生函数重载。而且，后面的定义比前面的定义具有更高的优先级。
  - 同名方法之中，如果有一个参数是字面量类型，字面量类型有更高的优先级。
  - 如果两个 interface 组成的联合类型存在同名属性, 那么该属性的类型也是联合类型

### 5、interface 与 type 异同
- 相同点  
  - 都可以表示对象类型
- 不同点
  - type 能够表示非对象类型, 而 interface 只能表示对象类型
  - type 不支持继承(通过`&`添加属性), interface 可以继承其他属性
  - type 同名报错, interface 自动合并
  - type 包含属性映射, interface 不包含
  - type 可以拓展原始类型, interface 不行
  - type 可以表达某些复杂类型(比如交叉类型和联合类型), interface 不行
  - this 关键字只能用于 interface
```ts
// type 包含属性映射, interface 不包含
interface Point {
  x: number;
  y: number;
}
type PointCopy1 = {
  [Key in keyof Point]: Point[Key];
};

// this关键字只能用于interface
interface Foo {
  add(num: number): this;
}

// interface无法表达某些复杂类型（比如交叉类型和联合类型），但是type可以。
type A = { /* ... */ };
type B = { /* ... */ };

type AorB = A | B;
type AorBwithName = AorB & {
  name: string
};
```

- 总结

综上所述, 如果有复杂的类型运算, 那么没有其他选择只能使用 type ; 

一般情况下 interface 灵活性比较高, 便于扩充类型和自动合并, 建议优先使用


## 二十、类

### 1、简介
- 属性的类型
  - 类的属性可以在顶层声明, 也可以再构造方法内部声明
  - 对于顶层声明的属性, 可以在声明时同时给出类型, 也可以不给出类型, ts 会认为它们的类型为 any
  - 如果声明给出初值, 可以不写类型, ts 会自行推断属性的类型

- readonly 修饰符: 表示该属性只读
  - readonly 属性的初始值, 可以写在顶层属性, 也可以写在构造方法里面
  - 构造方法修改只读属性的值是可以的。如果两个地方都设置了只读属性的值，以构造方法为准。

- 方法的类型
  - 类的方法就是普通函数，类型声明方式与函数一致。
  - 类的方法跟普通函数一样，可以使用参数默认值，以及函数重载。
  - 另外，构造方法不能声明返回值类型，否则报错，因为它总是返回实例对象。

- 存取器方法: 存取器(accessor)包含取值器(getter)和存值器(setter), 取值器用于读取属性, 存值器用于写入属性
  - 如果某个属性只有`get`方法, 没有`set`方法, 那么该属性自动成为只读属性
  - ts 5.1版本前, `set`方法的参数类型, 必须兼容`get`方法的返回值类型, 否则报错
  - `get`和`set`方法的可访问性必须一致, 要么都为公开方法, 要么都为私有方法

- 属性索引: `[s:string]`表示所有属性名类型为字符串的属性, 它们的属性值要么是布尔值, 要么是返回布尔值的函数
  - 由于类的方法是一种特殊属性(属性值为函数的属性), 所以属性索引的类型定义也涵盖了方法
  - 属性存取器视同属性。
```ts
class MyClass {
  [s: string]: boolean | ((s: string) => boolean)

  get(s: string) {
    return this[s] as boolean
  }

  get IsInstance() {
    return true
  }
}
```

### 2、类的 interface 接口
- implements 关键字

interface 接口或 type 别名, 可以用对象的形式, 为 class 指定一组检查条件。然后，类使用 implements 关键字，表示当前类满足这些外部类型条件的限制。
```ts
interface Country {
  name: string;
}
class MyCountry implements Country {
  name = ''
}
```
> - `implements` 关键字后面, 不仅可以是接口, 也可以是另一个类。这时, 后面的类将被当作接口
> - `interface` 描述的是类的对外接口，也就是实例的公开属性和公开方法，不能定义私有的属性和方法。

- 实现多个接口
```ts
class Car implements MotorVehicle, Flyable, Swimmable {}
```
- 类与接口的合并
ts 不允许两个同名的类, 但是如果一个类和一个接口同名, 那么接口会被合并进类


### 3、Class 类型
- 实例类型
1. ts 的类本身就是一种类型, 但是它代表该类的实例类型, 而不是 class 的自身类型
```ts
class MyClass {
  // 类的定义
}

const myInstance: MyClass = new MyClass();
```
2. 作为类型使用时，类名只能表示实例的类型，不能表示类的自身类型。
```typescript
class Point {
  x:number;
  y:number;

  constructor(x:number, y:number) {
    this.x = x;
    this.y = y;
  }
}

// 错误
function createPoint(
  PointClass:Point,
  x: number,
  y: number
) {
  return new PointClass(x, y);
}
```

- 类的的自身类型
  
要获得一个类的自身类型, 可以使用 typeof 运算符
```typescript
function createPoint(
  PointClass:typeof Point,
  x:number,
  y:number
):Point {
  return new PointClass(x, y);
}
```
JavaScript 语言中，类只是构造函数的一种语法糖，本质上是构造函数的另一种写法。所以，类的自身类型可以写成构造函数的形式。

```typescript
interface PointConstructor {
  new(x:number, y:number):Point;
}

function createPoint(
  PointClass: PointConstructor,
  x: number,
  y: number
):Point {
  return new PointClass(x, y);
}
```

- 结构类型原则
  
Class 也遵循“结构类型原则”。一个对象只要满足 Class 的实例结构，就跟该 Class 属于同一个类型。

```typescript
class Foo {
  id!:number;
}

function fn(arg:Foo) { }

const bar = {
  id: 10,
  amount: 100,
};

fn(bar); // 正确
```

- 如果两个类的实例结构相同，那么这两个类就是兼容的，可以用在对方的使用场合。
- 只要 A 类具有 B 类的结构，哪怕还有额外的属性和方法，TypeScript 也认为 A 兼容 B 的类型。
- 不仅是类，如果某个对象跟某个 class 的实例结构相同，TypeScript 也认为两者的类型相同。
- 空类不包含任何成员，任何其他类都可以看作与空类结构相同。因此，凡是类型为空类的地方，所有类（包括对象）都可以使用。
- 确定两个类的兼容关系时，只检查实例成员，不考虑静态成员和构造方法。
- 如果类中存在私有成员（private）或保护成员（protected），那么确定兼容关系时，TypeScript 要求私有成员和保护成员来自同一个类，这意味着两个类需要存在继承关系。

### 4、类的继承
类使用 `extends` 关键字继承另一个类(这里称为"基类")的所有属性和方法
- 根据结构类型原则，子类也可以用于类型为基类的场合。
- 子类可以覆盖基类的同名方法。但是，子类的同名方法不能与基类的类型定义相冲突。
- 如果基类包括保护成员（`protected`修饰符），子类可以将该成员的可访问性设置为公开（`public`修饰符），也可以保持保护成员不变，但是不能改用私有成员（`private`修饰符）

### 5、可访问性修饰符
- public: 公开成员, 外部可以自由访问 (默认)
- private: 私有成员, 只能用在当前类的内部, 类的实例和子类不能使用该成员
  - 子类不能定义父类私有成员的同名成员
  - ES2022 引入了私有成员写法 `#propName` , 推荐使用该写法
  - 构造方法也可以是私有的，这就直接防止了使用 `new` 命令生成实例对象，只能在类的内部创建实例对象。这时一般会有一个静态方法，充当工厂函数，强制所有实例都通过该方法生成。
- protected: 保护成员, 只能在类的内部使用该成员, 实例无法使用该成员, 但是子类内部可以使用
  - 子类不仅可以拿到父类的保护成员，还可以定义同名成员。


### 6、静态成员
类的内部可以使用 `static` 关键字定义静态成员
- 静态成员是只能通过类本身使用的成员，不能通过实例对象使用
- `static`关键字前面可以使用 public、private、protected 修饰符
- `public`和`protected`的静态成员可以被继承

### 7、泛型类
类也可以写成泛型，使用类型参数。
- 静态成员不能使用泛型的类型参数

### 8、抽象类、抽象成员
允许在类的定义前面, 加上关键字`abstract`, 表示该类不能被实例化, 不能当作其他类的模板, 这种类就叫做"抽象类"
- 抽象类只能当作基类使用，用来在它的基础上定义子类。
- 抽象类的子类也可以是抽象类，也就是说，抽象类可以继承其他抽象类。
- 抽象类的内部可以有已经实现好的属性和方法，也可以有还未实现的属性和方法。后者就叫做“抽象成员”（abstract member），即属性名和方法名有`abstract`关键字，表示该方法需要子类实现。如果子类没有实现抽象成员，就会报错。
  - 抽象成员只能存在于抽象类，不能存在于普通类。
  - 抽象成员不能有具体实现的代码。也就是说，已经实现好的成员前面不能加`abstract`关键字。
  - 抽象成员前也不能有`private`修饰符，否则无法在子类中实现该成员。
  - 一个子类最多只能继承一个抽象类。

### 9、this 问题
类的方法经常用到 `this` 关键字，它表示该方法当前所在的对象。

- TypeScript 允许函数增加一个名为 `this` 的参数，放在参数列表的第一位，用来描述函数内部的 `this` 关键字的类型。
  - TypeScript 一旦发现函数的第一个参数名为`this`，则会去除这个参数，即编译结果不会带有该参数。
- 在类的内部，`this`本身也可以当作类型使用，表示当前类的实例对象。
- `this`类型不允许应用于静态成员。
- `this is Type`的形式，可以精确表示返回值


## 二十一、泛型
### 1、定义
泛型可以理解成一段类型逻辑，需要类型参数来表达。有了类型参数以后，可以在输入类型与输出类型之间，建立一一对应关系。
### 2、写法
- 函数
```ts
function id<T>(arg: T): T {
  return arg;
}
```
- 接口
```ts
interface Box<Type> {
  contents: Type;
}
let box: Box<string>; // 使用泛型接口, 需要给出类型参数的值
```
- 类
```ts
class Pair<K, V> {
  key: K;
  value: V;
}
```
- js 类本质是一个构造函数, 因此也可以把泛型类写成构造函数
```ts
type MyClass<T> = new (...args: any[]) => T
```
> 泛型类描述的是类的实例, 不包含静态属性和静态方法, 因此两者定义在类的本身, 所以它们不能引用类型参数

- 类型别名
```ts
type Tree<T> = {
  value: T
  left: Tree<T> | null
  right: Tree<T> | null
}
```

### 3、默认值
```ts
class Foo<T = number> {
  list: T[] = []
  add(t: T) {
    this.list.push(t)
  }
}
```
- 一旦类型参数有默认值，就表示它是可选参数。如果有多个类型参数，可选参数必须在必选参数之后

### 4、数组泛型表示
```ts
const arr1: Array<number> = [1, 2, 3]
const arr2: number[] = [1, 2, 3]
```

- 在 ts 内部, `Array` 是一个泛型接口, 类型定义如下
```ts
interface Array<Type> {
  length: number;
  pop(): Type | undefined;
  push(...items: Type[]): number;
}
```
- 使用 `ReadonlyArray<T>` 接口表示只读数组


### 5、类型参数约束条件
在类型参数上写明约束条件, 不满足条件的话编译报错

- `<TypeParameter extends ConstraintType>`
  - `TypeParameter` 类型参数
  - `extends` 关键字
  - `ConstraintType` 满足的条件, 即类型参数是`ConstraintType`的子类型

```ts
function fn<T extends { length: number }>(a: T) {
  return a
}
fn([1])
fn(1) // 报错
```
- 类型参数可同时设置约束条件和默认值, 前提是默认值必须满足约束条件
- 如果有多个类型参数, 一个类型参数的约束条件, 可以引用其他参数
```ts
function foo<T, U extends T>() {}
function bar<T extends U, U>() {}
```
- 约束条件不能引用类型参数自身

## 二十二、枚举

### 1、简介

```ts
enum Color {
  Red, // 0
  Green, // 1
  Blue, // 2
}

const r = Color.Red 
const g = Color['Green']

// 编译后为对象
const Color = {
  Red: 0,
  Green, 1,
  Blue: 2,
}
```

### 2、Enum 成员的值
Enum 成员默认不必赋值, 系统会从零开始逐一递增为每个成员赋值, 也可以对 Enum 成员进行显式赋值(成员的值可以是任意数值, 但不能是大整数 Bigint)

```ts
enum Color {
  Red = 90,
  Green = 0.5,
  Blue = 7n // 报错
}
```
Enum 成员值都是只读的, 不能重新赋值

### 3、同名 Enum 的合并
多个同名的 Enum 结构会自动合并
- 只允许其中一个的首成员省略初始值
- 同名 Enum 合并时, 不能有同名成员, 否则报错
- 所有定义必须同为 const 枚举或者非 const 枚举，不允许混合使用

### 4、字符串 Enum
Enum 成员的值除了设为数值，还可以设为字符串

```ts
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
```
- 字符串枚举的所有成员值，都必须显式设置。如果没有设置，成员值默认为数值，且位置必须在字符串成员之前。
- Enum 成员可以是字符串和数值混合赋值。
- 除了数值和字符串，Enum 成员不允许使用其他值（比如 Symbol 值）。
- 变量类型如果是字符串 Enum，就不能再赋值为字符串，这跟数值 Enum 不一样。
```ts
enum MyEnum {
  One = 'One',
  Two = 'Two',
}

let s = MyEnum.One;
s = 'One'; // 报错
```

### 5、keyof 运算符
keyof 运算符可以取出 Enum 结构的所有成员名, 作为联合类型返回
```ts
enum MyEnum {
  A = 'a',
  B = 'b'
}
type Foo = keyof typeof MyEnum; // 'A' | 'B'
```
这里`typeof`是必需的, 否则`keyof MyEnum`相当于`keyof number`
```ts
type Foo = keyof MyEnum; 
// "toString" | "toFixed" 
// | "toExponential" | "toPrecision" 
// | "valueOf" | "toLocaleString"
```
> 这是因为 Enum 作为类型，本质上属于`number`或`string`的一种变体，而`typeof MyEnum`会将`MyEnum`当作一个值处理，从而先其转为对象类型，就可以再用`keyof`运算符返回该对象的所有属性名。

返回 Enum 所有成员的值, 使用`in`运算符
```ts
type Foo = { [key in MyEnum]: any } // { a: any, b: any }
```

### 6、反向映射
```ts
enum Color {
  Red, // 0
}
console.log(Color[0]) // Red
```


## 二十三、d.ts

### 1. 简介
单独使用的模块, 一般会同时提供一个单独的类型声明文件, 把本文件的外部接口的所有类型都写在这个文件里面, 便于模块使用者了解接口, 也便于编辑器检查使用者的用法是否正确

类型声明文件里面只有类型代码，没有具体的代码实现。它的文件名一般为`[模块名].d.ts`的形式，其中的`d`表示 declaration（声明）。

```ts
export function getArrayLength(arr: any[]): number;
export const maxInterval: 12;
```
类型声明文件也可以使用`export =`命令，输出对外接口
```ts
declare module 'moment' {
  function moment(): any;
  export = moment
}
```
除了使用`export =`，模块输出在类型声明文件中，也可以使用`export default`表示。
```ts
// 模块输出
module.exports = 3.142;

// 类型输出文件
// 写法一
declare const pi: number;
export default pi;

// 写法二
declare const pi: number;
export= pi;
```

### 2. 类型声明文件来源
1. 编辑器自动生成
- 在`tsconfig.json`使用`declaration`, 编辑器就会在编译时自动生成单独的类型声明文件
```ts
{
  "compilerOptions": {
    "declaration": true
  }
}
```
- 命令行开启这个选项
```bash
$  tsc --declaration
```

2. ts 内置类型文件

内置声明文件在 ts 安装目录的 `lib` 文件夹内

3. 外部模块的类型声明文件

如果项目使用了外部的某个第三方代码库, 就需要这个库的类型声明文件

(1) 这个库自带了类型声明文件: 这个库包含了`[vendor].d.ts`文件

(2) 这个库没有自带, 可以通过社区制作的类型声明文件

TypeScript 社区主要使用 [DefinitelyTyped 仓库](https://github.com/DefinitelyTyped/DefinitelyTyped)，各种类型声明文件都会提交到那里，已经包含了几千个第三方库。这些声明文件都会作为一个单独的库，发布到 npm 的`@types`名称空间之下。比如，jQuery 的类型声明文件就发布成`@types/jquery`这个库，使用时安装这个库就可以了。

```bash
$ npm install @types/jquery --save-dev
```

(3) 找不到类型声明文件, 需要自己写

```ts
declare type JQuery = any;
declare var $: JQuery
```
也可以采用下面写法, 将整个外部模块的类型设为`any`
```ts
declare module '模块名'
```

### 3. 模块发布
当前模块如果包含自己的类型声明文件，可以在 package.json 文件里面添加一个`types`字段或`typings`字段，指明类型声明文件的位置。

```ts
{
  "name": "awesome",
  "author": "Vandelay Industries",
  "version": "1.0.0",
  "main": "./lib/main.js",
  "types": "./lib/main.d.ts"
}
```

注意，如果类型声明文件名为`index.d.ts`，且在项目的根目录中，那就不需要在`package.json`里面注明了。

### 4. 三斜杠命令
使用三斜杠命令, 加载类型声明文件

1. `/// <reference path="./lib.d.ts" />`

path 指定所引入文件的路径


2. `/// <reference types="node" />`
  
types 参数用来告诉编辑器当前脚本依赖某个 DefinitelyTyped 类型库, 通常安装在`node_modules/@types`目录

3. `/// <reference lib="es2017.string" />`

允许脚本文件显式包含内置 lib 库, 等同于在`tsconfig.json`文件里面使用`lib`属性指定 lib 库。

上面示例中，`es2017.string`对应的库文件就是`lib.es2017.string.d.ts`。


## 二十四、注释
- `// @ts-nocheck` 编辑器不对当前脚本进行类型检查
- `// @ts-check` 编译器将对该脚本进行类型检查，不论是否启用了`checkJs`编译选项。
- `// @ts-ignore` 编辑器不对下一行代码进行类型检查
- `// @ts-expect-error` 当下一行有报错时, 不显示报错信息

## 二十五、JSDoc
ts 直接处理 js 文件时, 如果无法推断出类型, 会使用 js 脚本里面的 JSDoc 注释
```js
/**
 * @params {string} somebody
 */
function say(somebody) {
  console.log("hello" + somebody)
}
```
- `@typeof` 创建自定义类型, 等于 ts 里面的类型别名
```js
/**
 * @typeof {(number | string)} NumberLike
 */

// 等同于
// type NumberLike = number | string
```

- `@type` 定义变量的类型
```js
/**
 * @type {string}
 */
let a
```

- `@params` 定义函数参数的类型
```js
// 可选参数, 指定参数默认值
/**
 * @params {string} [x="bar"]
 */
function foo(x) {}
```

- `@return` 和 `@returns` 指定函数返回值的类型
```js
/**
 * @return {boolean}
 */
function foo() { return true }
```
  
- `@extends` 定义继承的基类
```js
/**
 * @extends {Base}
 */
class Derived extends Base {}
```
- `@public`、`@protected`、`@private`分别指定类的公开成员、保护成员和私有成员。
- `@readonly`指定只读成员。