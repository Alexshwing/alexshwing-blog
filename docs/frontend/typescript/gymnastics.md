# TypeScript 类型体操通关秘籍

## 一、模式匹配要提取
模式匹配是通过 extends 对类型参数做匹配, 结果保存到通过 infer 声明的局部类型变量中。

### 数组
```ts
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]]
  ? First
  : never
type T1 = GetFirst<[1, 2, 3]>
```
> 用`unknown`接受和匹配任何类型, 而很少把任何类型赋值给某个类型变量(不使用`any`)

### 字符串
```ts
type StartWith<
  Str extends string,
  Prefix extends string
> = Str extends `${Prefix}${string}` ? true : false
type T2 = StartWith<'123', '12'>
```
> `${string}` 表示任意的 string

### 函数
提取参数和返回值
```ts
type GetParams<Func extends Function> = Func extends (
  ...args: infer Args
) => unknown
  ? Args
  : never

type GetReturnType<Func extends Function> = Func extends (
  ...args: any[]
) => infer ReturnType
  ? ReturnType
  : never

type T1 = GetParams<(a: number, b: string, c: number[]) => void>
type T2 = GetReturnType<(a: number, b: string, c: number[]) => void>
```
> 参数类型要赋值给别的类型, 这里采用`any`

### 构造器
提取实例类型和参数类型
```ts
interface Person {
  name: string
}
interface PersonConstructor {
  new (name: string): Person
}

type GetInstanceType<Constructor extends new (...args: any) => any> =
  Constructor extends new (...args: any) => infer InstanceType
    ? InstanceType
    : any

type GetConstructorParameters<
  ConstructorType extends new (...args: any) => any
> = ConstructorType extends new (...args: infer ParametersType) => any
  ? ParametersType
  : any

type T1 = GetInstanceType<PersonConstructor>
type T2 = GetConstructorParameters<PersonConstructor>
```

### 索引类型
```ts
type GetRefProps<Props> = 'ref' extends keyof Props
  ? Props extends { ref?: infer Value | undefined }
    ? Value
    : never
  : never

type T1 = GetRefProps<{ ref?: 1 }>
type T2 = GetRefProps<{ ref?: undefined }>

```
> 在`ts3.0`如果没有对应索引, Obj[Key] 返回的是`{}`而不是`never`, 这里进行向下兼容


## 二、重新构造做变换
想要变化就需要重新构造新的的类型, 并且可以在构造新类型的过程中对原类型做一些过滤和变换。

其中索引类型有专门的语法叫做映射类型, 对索引做修改的 as 叫做重映射。

### 数组
```ts
type Push<Arr extends unknown[], Ele> = [...Arr, Ele]
type T1 = Push<[number, number], string>

type Zip<One extends unknown[], Other extends unknown[]> = One extends [
  infer OneFirst,
  ...infer OneRest
]
  ? Other extends [infer OtherFirst, ...infer OtherRest]
    ? [[OneFirst, OtherFirst], ...Zip<OneRest, OtherRest>]
    : []
  : []

type T2 = Zip<[1, 2, 3, 4, 5], ['a', 'b', 'c', 'd', 'e']>
```

### 字符串
```ts
// 首字母大写
type CapitalizeStr<Str extends string> =
  Str extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : Str

type T1 = CapitalizeStr<'alexshwing'> // Alexshwing

// 下划线转驼峰
type CamelCase<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
    : Str

type T2 = CamelCase<'aa_bb_cc'> // aaBbCc
```

### 函数
```ts
// 已有函数类型添加参数
type AppendArgument<Func extends Function, Arg> = Func extends (
  ...args: infer Args
) => infer ReturnType
  ? (...args: [...Args, Arg]) => ReturnType
  : never

type T1 = AppendArgument<(a: number) => number, number> // (args_0: number, args_1: number) => number
```

### 索引
```ts
type obj = {
  name: string
  age: number
}

// key 变大写
type UppercaseKey<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key]
}

type T1 = UppercaseKey<obj>

// 只读
type ToReadonly<T> = {
  readonly [Key in keyof T]: T[Key]
}
type T2 = ToReadonly<obj>

// 可选
type ToPartial<T> = {
  [Key in keyof T]?: T[Key]
}
type T3 = ToPartial<obj>

// 去掉只读
type ToMutable<T> = {
  -readonly [Key in keyof T]: T[Key]
}
type T4 = ToMutable<T2>

// 去掉可选
type toRequired<T> = {
  [Key in keyof T]-?: T[Key]
}
type T5 = toRequired<T3>

// 过滤参数
type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [Key in keyof Obj as ValueType extends Obj[Key] ? Key : never]: Obj[Key]
}
type T6 = FilterByValueType<obj, 'name'>

```
> `Upprcase<Key & string>` 限制类型为 string
>
> `Record` 用于创建索引类型 `type Record<K extends string | number | symbol, T> = { [P in K]: T }`


## 三、递归复用做循环
数组长度不确定、字符串长度不确定、对象层级不确定, 采用递归模拟循环

### 数组
```ts
// 不确定层数的 Promise 中 value 类型 
type DeepPromiseValueType<T> = T extends Promise<infer ValueType>
  ? DeepPromiseValueType<ValueType>
  : T

type T1 = DeepPromiseValueType<Promise<Promise<Promise<Record<string, any>>>>>

// ! IsEqual 简易实现
type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false)

// includes
type Includes<Arr extends unknown[], FindItem> = Arr extends [
  infer First,
  ...infer Rest
]
  ? IsEqual<First, FindItem> extends true
    ? true
    : Includes<Rest, FindItem>
  : false

type T2 = Includes<[1, 2, 3], 1>
type T3 = Includes<[1, 2, 3], 4>

```
### 字符串
```ts
// 字符串字面量转联合类型
type StringToUnion<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? First | StringToUnion<Rest>
    : never

type T = StringToUnion<'abc'> // "a" | "b" | "c"
```

### 对象
多层级对象添加 readonly
```ts
type obj = { a: { b: { c: 1; d: () => '123' } } }

type _DeepReadonly<Obj extends Record<string, any>> = {
  readonly [Key in keyof Obj]: Obj[Key] extends object
    ? Obj[Key] extends Function
      ? Obj[Key]
      : _DeepReadonly<Obj[Key]>
    : Obj[Key]
}

type DeepReadonly<Obj extends Record<string, any>> = Obj extends any
  ? {
      readonly [Key in keyof Obj]: Obj[Key] extends object
        ? Obj[Key] extends Function
          ? Obj[Key]
          : DeepReadonly<Obj[Key]>
        : Obj[Key]
    }
  : never

type T1 = _DeepReadonly<obj>
type T2 = _DeepReadonly<obj>['a']
type T3 = DeepReadonly<obj>
```
> `T1` 只有 `a` 加上`readonly` 因为 ts 只有类型被用到的时候才会做类型计算
>
> 使用`Obj extends any ? {} : any` 触发计算


## 四、数组长度做计数
ts 类型系统中没有加减乘除运算符, 但是可以通过构造不同的数组取 length 的方式完成数值计算, 把数值计算转化为对数组的提取和构造

### 模拟四则运算
```ts
type BuildArr<
  Length extends number,
  Ele = unknown,
  Res extends unknown[] = []
> = Res['length'] extends Length ? Res : BuildArr<Length, Ele, [...Res, Ele]>

type Add<A extends number, B extends number> = [
  ...BuildArr<A>,
  ...BuildArr<B>
]['length']

type T1 = Add<999, 1>

// 构造长度为 A 的数组, 提取长度为 B 的数组后 Rest 的长度即为答案
// ! 仅适用于 A > B
type Subtract<A extends number, B extends number> = BuildArr<A> extends [
  ...arr1: BuildArr<B>,
  ...arr2: infer Rest
]
  ? Rest['length']
  : never

type T2 = Subtract<3, 1>

// 乘法相当于 A 累加 B 次
type Mutiply<
  A extends number,
  B extends number,
  Res extends unknown[] = []
> = B extends 0
  ? Res['length']
  : Mutiply<A, Subtract<B, 1>, [...BuildArr<A>, ...Res]>

type T3 = Mutiply<2, 3>

// 除法类似 累减
type Divide<
  A extends number,
  B extends number,
  Res extends unknown[] = []
> = A extends 0 ? Res['length'] : Divide<Subtract<A, B>, B, [unknown, ...Res]>

type T4 = Divide<9, 3>
```

### 数组长度实现计数
用数组计算出字符串长度
```ts
type StrLen<
  Str extends string,
  Res extends unknown[] = []
> = Str extends `${string}${infer Rest}`
  ? StrLen<Rest, [...Res, unknown]>
  : Res['length']

type T = StrLen<'123'>
```

## 五、联合分散可简化

当类型参数为联合类型, 并且在条件类型**左边**直接引用该类型参数的时候, ts 会把每一个元素单独传入来做类型运算, 最后在合并成联合类型, 这种语法称为**分布式条件类型**
```ts
type UppercaseA<Item extends string> = Item extends 'a' ? Uppercase<Item> : Item

type T = UppercaseA<'a' | 'b' | 'c'> // "b" | "c" | "A"
```

### 判断联合类型
```ts
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never

type T1 = IsUnion<'a' | 'b'>
type T2 = IsUnion<'ab'>
```
> `A extends A` 触发分布式条件, 让 A 的每个类型单独传入
>
> `[B] extends [A]` 避免触发分布式条件类型, 此时`B`为整个联合类型
>
> 此时`B`为整个联合类型整体, `A`是单个类型, 自然条件不成立, 利用这个特性判断联合类型

### 数组转联合类型
```ts
type ArrToUnion<T extends unknown[]> = T[number]
type T = ArrToUnion<['a', 'b']> // 'a' 'b'
```
### 全组合
```ts
type Combination<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`

type AllCombinations<A extends string, B extends string = A> = A extends A
  ? Combination<A, AllCombinations<Exclude<B, A>>>
  : never

type T = AllCombinations<'a' | 'b' | 'c'>
//  "a" | "b" | "c" | "bc" | "cb" | "ab" | "ac" | "abc" | "acb" | "ba" | "ca" | "bca" | "cba" | "bac" | "cab"
```
> 实现思路是两两组合, 组合出的字符串再和其他字符串两两组合
>
> 比如 'A' | 'B' | 'c'，就是 A 和 B、C 组合，B 和 A、C 组合，C 和 A、B 组合。然后组合出来的字符串再和其他字符串组合。
>
> `AllCombinations<Exclude<B, A>>` 意思是 B 去掉 A 以后的所有类型组合, `Combination<A, AllCombinations<Exclude<B, A>>>` 就是 全组合

## 六、特殊特性要牢记

- any 类型与任何类型的交叉都是 any
- never 作为类型参数出现在条件类型左侧时，会直接返回 never
- any 作为类型参数出现在条件类型左侧时，会直接返回 trueType 和 falseType 的联合类型
- 元组也是数组类型, 但每个元素都是只读的, 并且 length 是数字字面量, 而数组的 length 是 number
```ts
type IsAny<T> = 'a' extends 'b' & T ? true : false
type T1 = IsAny<any>
type T2 = IsAny<1>

type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never

type IsNever<T> = [T] extends [never] ? true : false
type T3 = IsNever<never>

type TestAny<T> = T extends number ? 1 : 2
type T4 = TestAny<any> // 1 | 2

type len = [1, 2, 3]['length'] // 3
type len2 = number[]['length'] // number

type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? false
  : true

type IsTuple<T> = T extends readonly [...params: infer Eles]
  ? NotEqual<Eles['length'], number>
  : false

type T5 = IsTuple<[1, 2, 3]> // true
type T6 = IsTuple<number[]> // false
```
- 类型有父子关系, (A & B) 是 (A | B) 子类型
  - 允许父类型赋值给子类型, 叫做 逆变
  - 允许子类型赋值给父类型, 叫做 协变
  - ts 中函数参数有逆变的性质, 也就是如果参数可能是多个类型, 参数类型会变成它们的交叉类型
```ts
type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never

type T1 = UnionToIntersection<{ a: 1 } | { b: 2 }>
// type T1 = {
//   a: 1;
// } & {
//   b: 2;
// }
```
> `U extends U` 触发联合类型 distributive 的性质, 让每个类型单独传入做计算, 最后合并

- 可选索引的值为 undefined 和值类型的联合类型，可以用来过滤可选索引, 反过来也可以过滤非可选索引
```ts
type _Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type GetOptional<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends _Pick<Obj, Key> ? Key : never]: Obj[Key]
}

type T = GetOptional<{ name: string; age?: number }>
```
> 过滤的方式是单独取出该索引(`_Pick<Obj, Key>`)之后, 判断空对象是否是其子类型
>
> 因为可选参数可能为 undefined，也就是索引类型可能是 {}，所以 {} extends Pick<Obj, Key> 就能过滤出可选索引。（可选的意思就是有或者没有，没有的时候就是空的索引类型）

- 索引类型的索引为字符串字面量类型, 可索引签名不是, 可以用这个特性过滤掉可索引签名
```ts
type RemoveIndexSignature<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key]
}
type T = RemoveIndexSignature<{
  [key: string]: any // 可索引签名
  age: number // 具体索引
}>
```

- keyof 只能拿到 class 的 public 的索引，可以用来过滤出 public 的属性
```ts
type ClassPublicProps<Obj extends Record<string, any>> = {
    [Key in keyof Obj]: Obj[Key]    
}
```

## 七、内置高级类型
- `Parameters` 提取函数类型的参数类型
- `ReturnType` 提取函数类型的返回值类型
- `ConstructorParameters` 提取构造器参数的类型
- `InstanceType` 提取构造器返回值的类型
- `ThisParameterType` this 类型提取
```ts
type Person = {
  name: 'alex'
}
function hello(this: Person) {
  console.log(this.name)
}

type T = ThisParameterType<typeof hello>
```
- `OmitThisParameter` 去掉 this 类型
- `Partial` 索引变为可选
- `Required` 索引变为必选
- `Readonly` 索引变为只读
- `Pick` 可以取出索引类型的一部分索引构造成新的索引类型, 实现过滤
```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```
- `Record` 创建索引类型, 传入 key 和值的类型
- `Exclude` 从联合类型去掉一部分类型
- `Extract` 从联合类型保留一部分类型
- `Omit` 去掉一部分索引构造新的索引类型
- `Awaited` 取出嵌套 Promise 的值的类型
- `NonNullable` 判断是否为非空类型(不是 null 或 undefined)
- `Uppercase` 大写、`Lowercase` 小写、`Capitalize` 首字母大写、`Uncapitalize` 去掉首字母大写