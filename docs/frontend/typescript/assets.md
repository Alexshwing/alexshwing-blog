# 类型断言

## 一、定义
- 允许开发者在代码中"断言"某个值的类型, 告诉编译器此处的值是什么类型。
- 语法
```ts
// 语法1 (与 jsx 语法冲突) 
<Type>value

// 语法2
value as Type
```

## 二、用法
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

## 三、条件
```ts
expr as T
```
`expr` 是实际的值, `T` 是类型断言, 它们必须满足的下面的条件: `expr` 是 `T` 的子类型, 或者`T` 是 `expr` 的子类型 (允许类型更加宽泛或更加精确)

## 四、as const 断言
如果没有声明变量类型, let 类型被推断为内置的基本类型之一, const 命令声明的变量被推断为值类型变量
```ts
let s1 = 'alexshwing' // 类型推断为 string
const s2 = 'alexshwing' // 类型推断为 'alexshwing'
let s3 = 'alexshwing' as const // 类型推断为 'alexshwing', 变量值不能再修改
```
- `as const` 告诉编译器, 推断类型时, 可以将这个值推断为常量, 即把 let 变量断言为 const 变量, 从而把内置的基本类型变更为值类型
- `as const` 断言只能用于字面量, 不能用于变量、表达式

## 五、非空断言
在变量名后面添加感叹号`!`, 保证变量不为空

## 六、断言函数
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