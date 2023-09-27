# 接口
## 一、定义
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
## 二、成员
interface 可以表示对象的各种语法, 它的成员有五种形式
### 1. 对象属性
```ts
interface A {
  x: number
  y?: number // 可选
  readonly z: number // 只读
}
```
### 2. 对象属性索引
```ts
interface A {
  [prop: string]: number // 属性的字符串索引
}
```
属性索引有 `string`、`number` 和 `symbol` 三种类型

属性的数值索引，其实是指定数组的类型。

数值索引必须服从于字符串索引

### 对象方法
```ts
interface A {
  f: (x: boolean) => string
}
```
### 函数
```ts
interface Add {
  (x: number, y: number): number;
}
const myAdd: Add = (x, y) => x + y;
```
### 构造函数
```typescript
interface ErrorConstructor {
  new (message?: string): Error;
}
```

## 三、继承
使用 `extends` 关键字可以继承

### 继承 interface 
- interface 允许多重继承
- 如果子接口与父接口存在同名属性, 那么子接口的属性会覆盖父接口的属性。注意，子接口与父接口的同名属性必须是类型兼容的，不能有冲突，否则会报错。
### 继承 type
- 如果 type 命令定义的类型不是对象, interface 就无法继承
### 继承 class
- interface 可以继承具有私有成员和保护成员的类, 但是意义不大

## 四、合并
- 多个同名接口会合并成一个接口
- 同名接口合并时, 同一个属性如果有多个类型声明, 彼此不能有类型冲突
- 同名接口合并时，如果同名方法有不同的类型声明，那么会发生函数重载。而且，后面的定义比前面的定义具有更高的优先级。
- 同名方法之中，如果有一个参数是字面量类型，字面量类型有更高的优先级。
- 如果两个 interface 组成的联合类型存在同名属性, 那么该属性的类型也是联合类型

## 五、interface 与 type 异同
### 相同点
- 都可以表示对象类型


### 不同点
1. type 能够表示非对象类型, 而 interface 只能表示对象类型
2. type 不支持继承(通过`&`添加属性), interface 可以继承其他属性
3. type 同名报错, interface 自动合并
4. type 包含属性映射, interface 不包含
```ts
interface Point {
  x: number;
  y: number;
}
type PointCopy1 = {
  [Key in keyof Point]: Point[Key];
};
```
5. this 关键字只能用于 interface
```ts
interface Foo {
  add(num: number): this;
}
```
6. type 可以拓展原始类型, interface 不行
7. type 可以表达某些复杂类型(比如交叉类型和联合类型), interface 不行
```ts
type A = { /* ... */ };
type B = { /* ... */ };

type AorB = A | B;
type AorBwithName = AorB & {
  name: string
};
```
### 总结
综上所述, 如果有复杂的类型运算, 那么没有其他选择只能使用 type ; 

一般情况下 interface 灵活性比较高, 便于扩充类型和自动合并, 建议优先使用