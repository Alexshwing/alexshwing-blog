# 深入浅出 TypeScript

## 为什么要学习 TypeScript
1. TypeScript VS JavaScript
  
| TypeScript                                      | JavaScript                     |
| ----------------------------------------------- | ------------------------------ |
| JavaScript 的超集, 用于解决大型项目的代码复杂性 | 一种脚本语言, 用于创建动态网页 |
| 强类型, 支持静态和动态类型                      | 动态弱类型语言                 |
| 可以在编译期间发现并纠正错误                    | 只能在运行时发现错误           |
| 不允许改变变量的数据类型                        | 变量可以被赋值成不同类型       |

2. TypeScript 带来了什么
- 类型安全
- 下一代 JS 特性
- 完善的工具链

不仅仅是一门语言, 更是生产力工具

3. 学习推荐
- [Awesome Typescript](https://github.com/dzharii/awesome-typescript#tools) TS 开源教程及应用
- [Typescript Playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAQwB7AgZzgMyhEcDkyqa+AUKcAHYwCmUmCAxjXAIIAKAknAN6lwCCAegBGECAGshAExowEwADb4AXL36DNwaWsoBXECLoAaDQIC+pzflHipjXCBrVV6zVp1x9humfcOQJ2o1NBgoKgBzP3NSGPJMPUpGGFRKOCgaAEc9GlCAHgAVOBokWkppDAkaAE8ITDYuAD4ACj0oRTUC4zgIEQArNQ5OAG0CgF0ASjdBDJg2tKJ0ADpIUNb27t6+idjyUgzs3JhmmwAhAHlzgGl8CaA) TS 到 JS 在线编译 

## TypeScript 基础
### 基本数据类型
```ts
const q: string = 'string'
const w: number = 1
const e: boolean = true
const r: null = null
const t: undefined = undefined
```
### 对象类型
```ts
interface IBytedancer {
    readonly jobId: number // 只读属性: 约束属性不可在对象初始化外赋值
    name: string
    sex: 'man' | 'woman' | 'other'
    age: number
    hobby?: string // 可选属性: 定义该属性可以不存在
    [key: string]: any // 任意属性: 约束所有对象属性都必须是该属性的子属性
}

const bytedancer: IBytedancer = {
    jobId: 9303245,
    name: 'Lin',
    sex: 'man',
    age: 28,
    hobby: 'swimming'
};

// 报错无法分配到 "jobId" ，因为它是只读属性。ts(2540)
bytedancer.jobId = 12345
// 成功: 任意属性标注下可以添加任意属性
bytedancer.plateform = 'data'
```
- 函数类型
```ts
// 标记类型
const add: (x: number, y: number) => number = (x, y) => x + y

// 定义接口
interface IMult {
    (x: number, y: number): number
}
const mult: IMult = (x, y) => x * y;
```
### 函数重载
```ts
interface IGetDate {
    (type: 'string', timestamp?: string): string; // 返回类型改为any就可以通过了
    (type: 'date', timestamp?: string): Date;
    (type: 'string' | 'date', timestamp?: string): Date | string;
}
/* 报错：不能将类型"(type: any, timestamp: any) => string | Date"分配给类型"IGetDate"。
    不能将类型"string | Date" 分配给类型"string"。
    不能将类型 "Date"分配给类型"string"。ts(2322) */
const getDate2: IGetDate = (type, timestamp) => {
    const date = new Date(timestamp);
    return type === 'string' ? date.toLocaleString() : date;
}

```
### 数组类型
```ts
// 1. [类型 + 方括号]
const arr1: number[] = [1, 2, 3]
// 2. 泛型
const arr2: Array<string | number | Record<string, number>> = [1, 2, '3', { a: 1 }]
// 3. 元组
const arr3: [number, string] = [1, '2']
// 4. 接口
interface IArr4 {
    [key: number]: any
}
const arr4: IArr4 = ['string', () => null, {}, []]
```
### 补充类型
```ts
// 空类型 
type IEmptyFunction = () => void
// 任意类型: 所有类型的子类型
type IAnyType = any;
// 枚举类型: 支持枚举值到枚举名的正反映射
enum EColor { Mon, Tue, Wed, Thu, Fri, Sat, Sun };
EColor['Mon'] === 0;
EColor[0] === 'Mon';
```
### 泛型

不预先指定具体的类型, 而在使用的时候在指定类型的一种特性

- 基本定义
  - 泛型的语法 `<>` 里面写类型参数, 一般用 `T` 表示
  - 使用时有两种方法指定类型：定义要使用的类型 或 通过 TS 类型推断, 自动推导类型
  - 泛型的作用是临时占位, 之后通过传来的类型进行推导
```ts
type IGetRepeatArrR = <T>(target: T) => T[];

// 泛型约束: 限制泛型必须符合字符串
type IGetRepeatArr = <T extends string>(target: T) => T[]
const getStrArr: IGetRepeatArr = target => new Array(100).fill(target)
// 报错:类型“number”的参数不能赋给类型“string”的参数。
getStrArr(123);

// 泛型默认参数
type IGet<T = number> = (target: T) => T[];
const getRepeatArr: IGet = target => new Array(100).fill(target);
// 类型“string”的参数不能赋给类型“number”的参数。
getRepeatArr('123');

```
### 类型别名和类型断言
```ts
// 通过type关键字定义类型别名
type IAdd = (x: number, y: number) => number
function sum(x: number, y: number): number {
    return x + y;
}
const sum2: IAdd = sum;

// 类型断言: 断言变量的正确类型
const s: any = '123';
console.log((s as string).length);

```
type VS interface

- 定义: 给类型起个别名

- 相同点 
  - 都可以定义对象或函数
  - 都允许继承
- 差异点
  - interface 是 TS 用来定义对象, type 用来定义别名方便使用
  - type 可以定义基本数据类型, interface 不行
  - interface 可以合并重复声明, type 不行

### 字符串 / 数字字面量
允许指定字符串 / 数字的固定值
```ts
type IOddNum = 1 | 3 | 5 | 7 | 9
```
### any、unknown、void
### never
### 元组 tuple

### interface
定义: 接口是为了定义对象类型
特点:
- 可选属性: ?
- 只读属性: readonly
- 可以描述函数类型
- 可以描述自定义属性

总结: 接口非常灵活 duck typing

### 类
定义: 写法和 JS 差不多, 增加了一些定义
特点:
- 增加了 public 、private 、 protected 修饰符
- 抽象类
  - 只能被继承, 不能被实例化
  - 作为基类, 抽象方法必须被子类实现
- interface 约束类, 使用 implements 关键字

## TypeScript 进阶
### 联合类型
`IA | IB` 表示一个值可以是几种类型之一
```ts
const bookList = [{
    author: 'xiaoming',
    type: 'history',
    range: '2001-2021'
}, {
    author: 'xiaoli',
    type: 'story',
    theme: 'love'
}]
interface IHistoryBook {
    author: string;
    type: string;
    range: string;
}
interface IStoryBook {
    author: string;
    type: string;
    theme: string;
}
type IBookList = Array<IHistoryBook | IStoryBook>;
```
### 交叉类型
`IA & IB` 多种类型叠加在一起成为一种类型, 包含所有类型的特性
```ts
type IBookList = Array<{
    author: string;
} & ({
    type: 'history';
    range: string;
} | {
    type: 'story';
    theme: string
})>;
```
### 类型保护和类型守卫
**类型保护**就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型。要定义一个类型保护，我们只要简单地定义一个函数, 成为类型守卫，它的返回值是一个**类型谓词**
```ts
interface IA { a: 1, a1: 2 }
interface IB { b: 1, b1: 2 }

// 类型守卫: 定义一个函数, 它的返回值是一个类型谓词, 生效范围为子作用域
// 这个例子中, arg is IA 就是类型谓词
// 谓词为 parameterName is Type 这种形式
// parameterName 必须来自当前函数签名里的一个参数名
function getIsIA(arg: IA | IB): arg is IA {
    return !!(arg as IA).a;
}

function log2(arg: IA | IB) {
    if (getIsIA(arg)) console.log(arg.a1);
    else console.log(arg.b1);
}

```

实现函数 logBook 类型，函数接收书本类型，并 logger 出相关特征 由于两种类型的书本都有 type 属性, 可以用 type 进行推断

```ts
function logBook(book: IBookItem) {
    // 联合类型 + 类型保护 = 自动类型推断
    if (book.type === 'history') {
        console.log(book.range)
    } else {
        console.log(book.theme)
    }
}

```

### 高级类型
实现 merge 函数类型, 要求 sourceObj 必须为 targetObj 的子集
```ts
function merge1(sourceObj, targetObj) {
    const result = { ...sourceObj };
    for (let key in targetObj) {
        const itemVal = sourceObj[key];
        itemVal && (result[key] = itemVal);
    }
}
function merge2(sourceObj, targetObj) {
    return { ...sourceObj, ...targetObj };
}

```
```ts
interface IMerge {
    <T extends Record<string, any>>(sourceObj: Partial<T>, targetObj: T): T;
}
// 将参数转化为可选参数
// 在以上代码中，首先通过 keyof T 拿到 T 的所有属性名，然后使用 in 进行遍历，将值赋给 P，最后通过 T[P] 取得相应的属性值。中间的 ? 号，用于将所有属性变为可选。
type IPartial<T extends Record<string, any>> = {
    [P in keyof T]?: T[P];
}

// 索引类型: 关键字[keyof] 相当于取值对象中的所有key组成的字符串字面量
type IKeys = keyof { a: string, b: number }; // => type IKeys = 'a' | 'b'
// 关键字[in] 相当于取值字符串字面量中的一种可能, 配合泛型P, 表示每一个key
// 关键字[?], 通过设定对象可选选项, 即可自动推导子集类型

```
### 函数返回值类型
实现函数 delayCall 的类型声明, 接受一个函数作为入参,其实现延迟 1s 运行函数, 返回 promise 结果为入参函数的执行结果
```ts
function delayCall(func) {
    return new Promise(resolve => {
        setTimeout(() => {
            const res = func();
            resolve(res);
        }, 1000);
    })
}

// ReturnType: 得到函数的返回值类型
type IDelayCall= <T extends () => any>(func: T) => ReturnType<T>;
type IReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

// 关键字[extends] 跟随泛型出现时, 表示类型推断, 其表达可类比三元表达式
// T === 判断类型 ? 类型A : 类型B
// 关键字[infer] 出现在类型推荐中, 表示定义类型变量, 可用于指代类型
// 如该场景下, 将函数的返回值类型作为变量, 使用新泛型R表示, 使用在类型推荐命中的结果中

```