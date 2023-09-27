# 泛型
## 一、定义
泛型可以理解成一段类型逻辑，需要类型参数来表达。有了类型参数以后，可以在输入类型与输出类型之间，建立一一对应关系。
## 二、写法
### 1. 函数
```ts
function id<T>(arg: T): T {
  return arg;
}
```
### 2. 接口
```ts
interface Box<Type> {
  contents: Type;
}
let box: Box<string>;
```
- 使用泛型接口, 需要给出类型参数的值
### 3. 类
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
- 泛型类描述的是类的实例, 不包含静态属性和静态方法, 因此两者定义在类的本身, 所以它们不能引用类型参数

### 4. 类型别名
```ts
type Tree<T> = {
  value: T
  left: Tree<T> | null
  right: Tree<T> | null
}
```

## 三、默认值
```ts
class Foo<T = number> {
  list: T[] = []
  add(t: T) {
    this.list.push(t)
  }
}
```
- 一旦类型参数有默认值，就表示它是可选参数。如果有多个类型参数，可选参数必须在必选参数之后

## 四、数组泛型表示
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


## 五、类型参数约束条件
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