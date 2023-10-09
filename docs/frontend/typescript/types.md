# 类型
## 类型运算符

### 1. keyof 
`keyof` 返回对象的所有键名组成的联合类型

```ts
type MyObj = {
  foo: number,
  bar: string;
}

type Keys = keyof MyObj; // 'foo' | 'bar'

type keyT = keyof any; // string | number | symbol

type keyT = keyof object; // never
```
- 如果对象属性名采用索引形式, keyof 返回属性名的索引类型
```ts
interface T {
  [prop: number]: number;
}

type KeyT = keyof T; // number

interface T {
  [prop: string]: number;
}
type KeyT = keyof T; // string|number
```
> 当属性名为字符串时, 包含了属性名为数值的情况, 因为数值属性名会自动转为字符串

- 用于 数组 或 元组
```ts
type T = keyof ['a', 'b', 'c'] 
// 返回 number | '0' | '1' | '2' | 'length' | 'pop' | 'push' | ...
// 返回数组所有键名, 包括数字键名和继承的键名
```
- 对于联合类型，keyof 返回成员共有的键名
- 对于交叉类型，keyof 返回所有键名
- keyof 取出的是键名组成的联合类型, 如果想取出键值组成的联合类型
```ts
type MyObj = {
  foo: number
  bar: string
}

type Keys = keyof MyObj

type Values = MyObj[Keys] // number | strinig

```

keyof 用途
1. 精确表达对象的属性类型
```ts
function prop<Obj, K extends keyof Obj>(obj: Obj, key: K): Obj[K] {
  return obj[key]
}
```
2. 属性映射: 将一个类型的所有属性逐一映射成其他值
```ts
type NewProps<Obj> = {
  [Prop in keyof Obj]: boolean
}
type MyObj = { foo: number }
type newObj = NewProps<MyObj> // { foo: boolean }


type Mutable<Obj> = {
  -readonly [Prop in keyof Obj]: Obj[Prop] // 去掉 `readonly` 修饰符
  // +readonly [Prop in keyof Obj]: Obj[Prop] // 添加 `readonly` 修饰符
}

type Concrete<Obj> = {
  [Prop in keyof Obj]-?: Obj[Prop] // 可选变必选
  // [Prop in keyof Obj]+?: Obj[Prop] // 必选变可选
}
```

### 2. in 
`in` 用来取出联合类型的每个成员类型
```ts
type U = 'a' | 'b' | 'c'
type Foo = {
  [Prop in U]: number;
}
// 等同于
type Foo = {
  a: number,
  b: number,
  c: number
}
```

### 3. 方括号
方括号 `[]` 取出对象的键值类型, 比如 `T[K]` 返回对象 `T` 的属性 `K` 的类型
```ts
type Person = {
  age: number;
}
type Age = Person['age'] // number

// 使用属性名的索引类型
type Obj = {
  [key: string] = number,
}
type T = Obj[string] // nunber
```
注意, 方括号不能有值的运算 `type Age = Peron['a' + 'g' + 'e']` 或 `const key = 'age'; type Age = Person[key];`

### 4. extends...?: 条件运算符
`T extends U ? X : Y` 根据当前类型是否符合某种条件(`T`是否可以赋值给`U`), 返回不同类型
- 如果需要判断的类型是一个联合类型，那么条件运算符会展开这个联合类型。
```ts
(A|B) extends U ? X : Y

// 等同于
(A extends U ? X : Y) | (B extends U ? X : Y)
```
- 如果不希望联合类型被条件运算符展开，可以把`extends`两侧的操作数都放在方括号里面。
```ts
type ToArray<Type> =
  [Type] extends [any] ? Type[] : never;

// (string | number)[]
type T = ToArray<string|number>;
```

### 5. infer 关键字
`infer` 用来定义泛型里面推断出来的类型参数, 而不是外部传入的类型参数
```ts
// 如果参数是一个数组, 那么就将该数组的成员类型推断为`Item`
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type

type Str = Flatten<string[]> // string
type Num = Flatten<number> // number
```
- 推断函数的参数类型和返回值类型
```ts
type ReturnPromise<T> =
  T extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : T
```
> 上面示例中，如果`T`是函数，就返回这个函数的 Promise 版本，否则原样返回。`infer A`表示该函数的参数类型为`A`，`infer R`表示该函数的返回值类型为`R`。

- 提取对象指定属性
```ts
type MyType<T> = T extends { a: infer M, b: infer N } ? [M, N] : never;

type T = MyType<{ a: string; b: number }> // [string, number]
```

### 6. is
`is` 限定返回值与参数之间的关系, 用来描述返回值属于`true`还是`false`

```ts
type A = { a: string };
type B = { b: string };

function isTypeA(x: A|B): x is A {
  if ('a' in x) return true;
  return false;
}
```
- 类型保护
```ts
function isCat(a: any): a is Cat {
  return a.name === 'kitty'
}
let x: Cat|Dog
if (isCat(x)) {
  x.meow()
}
```
- 在类的内部描述类的方法的返回值
```ts
class Teacher {
  isStudent(): this is Student {
    return false
  }
}
class Student {
  isStudent(): this is Student {
    return true
  }
}
```
> 注意，`this is T`这种写法，只能用来描述方法的返回值类型，而不能用来描述属性的类型。

### 7. 模板字符串
模板字符串内部可以引用其他类型, 可以引用 string、number、bigint、boolean、null、undefined
- 模板字符串里面引用的类型，如果是一个联合类型，那么它返回的也是一个联合类型，即模板字符串可以展开联合类型
- 如果模板字符串引用两个联合类型，它会交叉展开这两个类型

### 8. satisfies 运算符
`satisfies` 用于检测某个值是否符合指定类型(ts 4.9)

```typescript
type Colors = "red" | "green" | "blue";
type RGB = [number, number, number];

const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  bleu: [0, 0, 255] // 报错
} satisfies Record<Colors, string|RGB>;

const greenComponent = palette.green.substring(1); // 不报错
```

上面示例中，变量`palette`的值后面增加了`satisfies Record<Colors, string|RGB>`，表示该值必须满足`Record<Colors, string|RGB>`这个条件，所以能够检测出属性名`bleu`的拼写错误。同时，它不会改变`palette`的类型推断，所以，TypeScript 知道`palette.green`是一个字符串，对其调用`substring()`方法就不会报错。

## 类型映射
将一种类型按照映射规则转换成另一种类型
```typescript
type A = {
  foo: number;
  bar: number;
};

type ToBoolean<Type> = {
  [Property in keyof Type]: boolean;
}

type B = ToBoolean<A>
```

### Partial
属性变为可选
```ts
type _Partial<T> = {
  [P in keyof T]?: T[P]
}
```
### Readonly
属性变为只读
```ts
type _Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

### 映射修饰符
- `+`修饰符：写成`+?`或`+readonly`，为映射属性添加`?`修饰符或`readonly`修饰符。
- `–`修饰符：写成`-?`或`-readonly`，为映射属性移除`?`修饰符或`readonly`修饰符。

```typescript
// 添加可选属性
type Optional<Type> = {
  [Prop in keyof Type]+?: Type[Prop];
};

// 移除可选属性
type Concrete<Type> = {
  [Prop in keyof Type]-?: Type[Prop];
};

// 添加 readonly
type CreateImmutable<Type> = {
  +readonly [Prop in keyof Type]: Type[Prop];
};

// 移除 readonly
type CreateMutable<Type> = {
  -readonly [Prop in keyof Type]: Type[Prop];
};
```
> TypeScript 原生的工具类型`Required<T>`专门移除可选属性，就是使用`-?`修饰符实现的。
> 
> 注意，`–?`修饰符移除了可选属性以后，该属性就不能等于`undefined`了，实际变成必选属性了。但是，这个修饰符不会移除`null`类型。

### 键名重映射
`as + 新类型` 通常是模板字符串的形式
```ts
type B = {
  [p in keyof A as `${p}ID`]: number;
};
```

### 属性过滤
```ts
type User = {
  name: string
  age: number
}

type Filter<T> = {
  [K in keyof T as T[K] extends string ? K : never]: string
}

type C = Filter<User>

```
> 保留字符串属性
>
> `as T[K] extends string ? K : never]`, 使用了条件运算符。如果属性值`T[K]`的类型是字符串，那么属性名不变，否则属性名类型改为`never`，即这个属性名不存在。这样就等于过滤了不符合条件的属性，只保留属性值为字符串的属性。

### 联合类型映射
```ts
type S = {
  kind: 'square'
  x: number
  y: number
}

type C = {
  kind: 'circle'
  radius: number
}

type MyEvents<Events extends { kind: string }> = {
  [E in Events as E['kind']]: (event: E) => void
}

type Config = MyEvents<S | C>
// 等同于
type Config = {
  square: (event: S) => void
  circle: (event: C) => void
}
```
> 上面示例中，原始键名的映射是`E in Events`，这里的`Events`是两个对象组成的联合类型`S|C`。所以，`E`是一个对象，然后再通过键名重映射，得到字符串键名`E['kind']`。

## 类型断言

### 1、定义
`value as Type`

允许开发者在代码中"断言"某个值的类型, 告诉编译器此处的值是什么类型。

### 2、用法
- 指定 unknown 类型的变量的具体类型
```ts
const value: unknown = 'alexshwing';
const v1: string = value; // 报错
const v2: string = value as string; 
```
- 指定联合类型值得具体类型
```ts
const s1: number | string = 'alexshwing';
const s2: string = s1 as string;
```

### 3、条件
```ts
expr as T
```
`expr` 是实际的值, `T` 是类型断言, 它们必须满足的下面的条件:`expr` 是 `T` 的子类型, 或者`T` 是 `expr` 的子类型 (允许类型更加宽泛或更加精确)

### 4、as const 断言
如果没有声明变量类型, let 类型被推断为内置的基本类型之一, const 命令声明的变量被推断为值类型变量
```ts
let s1 = 'alexshwing' // 类型推断为 string
const s2 = 'alexshwing' // 类型推断为 'alexshwing'
let s3 = 'alexshwing' as const // 类型推断为 'alexshwing', 变量值不能再修改
```
- `as const` 告诉编译器, 推断类型时, 可以将这个值推断为常量, 即把 let 变量断言为 const 变量, 从而把内置的基本类型变更为值类型
- `as const` 断言只能用于字面量, 不能用于变量、表达式

### 5、非空断言
在变量名后面添加感叹号`!`, 保证变量不为空

### 6、断言函数
断言函数用于保证函数参数符合某种类型。如果函数参数达不到要求, 就会抛出错误, 中断程序执行; 如果达到要求, 就不进行任何操作, 让代码按照正常流程运行
```ts
function isString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Not a string')
  }
}
```
- 断言函数只用于更清晰表达函数意图, 真正的检查需要开发者自己部署
- 断言函数的 `asserts` 等同于 `void` 类型, 所以除了返回 `undefined` 和 `null` 之外都会报错
- 断言参数非空可以使用工具类 `NonNullable<T>`
- 断言某个参数为真(不等于`false`、`undefined`和`null`), 使用`asserts x`
- 断言函数与类型保护函数(type guard)是两种不同的函数。断言函数不返回值, 而类型保护函数返回一个布尔值

```ts
function isString (value: unknown): value is string {
  return typeof value === 'string';
}
```
> 上面示例就是一个类型保护函数`isString()`，作用是检查参数`value`是否为字符串。如果是的，返回`true`，否则返回`false`。该函数的返回值类型是`value is string`，其中的`is`是一个类型运算符，如果左侧的值符合右侧的类型，则返回`true`，否则返回`false`。

## declare 关键字

### 1、简介
declare 关键字用来告诉编译器, 某个类型是存在的, 可以在当前文件中使用, 它主要作用是让当前文件可以使用其他文件声明的类型。

declare 关键字的重要特点是通知编辑器某个类型是存在的, 不给出具体实现

### 2、类型
1. 变量
```ts
declare var document;
document.title = 'alexshwing';
```
> declare 告诉编辑器, 变量`document`的类型是外部定义的(具体定义在 ts 内置文件 `lib.d.ts`, 如果没有找到外部定义这里就会假定它的类型为`any`)

注意，declare 关键字只用来给出类型描述，是纯的类型代码，不允许设置变量的初始值，即不能涉及值。

2. 函数
```ts
declare function say(name: string): void;

say("alexshwing")
```

3. 类
```ts
declare class Animal {
  constructor(name: string);
  eat(): void;
  sleep(): void;
}
```

4. 模块和命名空间
```ts
declare namespace AnimalLib {
  class Animal {
    constructor(name: string);
    eat(): void;
    sleep(): void;
  }

  type Animals = 'Fish' | 'Dog';
}
declare module AnimalLib {
  class Animal {
    constructor(name: string);
    eat(): void;
    sleep(): void;
  }

  type Animals = 'Fish' | 'Dog';
}
```
declare 关键字的另一个用途, 是为外部模块添加属性和方法时, 给出新增部分的类型描述
```ts
// a.ts
export interface A {
  x: number;
}

// b.ts
import { A } from './a'

declare module './a' {
  interface A {
    y: number;
  }
}

const a: A = { x: 0, y: 0}
```
> 上面示例中，脚本`a.ts`定义了一个接口`A`，脚本`b.ts`为这个接口添加了属性`y`。`declare module './a' {}`表示对`a.ts`里面的模块，进行类型声明，而同名 interface 会自动合并，所以等同于扩展类型。

5. global

为 js 引擎的原生对象添加属性和方法, 可以使用 `declare global {}` 语法
```ts
export {}

declare global {
  interface String {
    toSmallString(): string;
  }
}
String.prototype.toSmallString = (): string => {
  // 具体实现
  return ''
}
```
> `export {}` 告诉编辑器这个脚本当成模块处理, `declare global`必须用在模块里面

6. enum
```ts
declare enum E1 {
  A,
  B
}
declare enum E2 {
  A = 0,
  B = 1
}
```
7. declare module 用于类型声明文件

我们可以为每个模块脚本, 定义一个`.d.ts`文件, 把该脚本用到的类型定义都放在这个文件里面。但是，更方便的做法是为整个项目，定义一个大的`.d.ts`文件，在这个文件里面使用`declare module`定义每个模块脚本的类型。

```ts
declare module 'url' {
  export interface Url {
    pathname?: string;
    hostname?: string;
  }
  export function parse(urlStr: string): Url;
}
```

使用时, 自己的脚本使用三斜杠命令, 加载这个类型声明文件
```ts
/// <reference path="node.d.ts" />
```
