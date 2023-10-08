# 装饰器
## 一、简介
装饰器用来在定义时修饰类的行为
```ts
function say(value: any, context: any) {
  console.log('alexshwing')
}

@say
class A {}
```
第一个字符是`@`, 后面是一个表达式, 这个表达式必须是一个函数, 接受传入参数, 要么不返回值, 要么返回一个新对象取代所修饰的目标对象


## 二、装饰器结构
```typescript
type Decorator = (
  value: DecoratedValue,
  context: {
    kind: string;
    name: string | symbol;
    addInitializer?(initializer: () => void): void;
    static?: boolean;
    private?: boolean;
    access: {
      get?(): unknown;
      set?(value: unknown): void;
    };
  }
  // context:ClassMethodDecoratorContext
) => void | ReplacementValue;
```
- value: 所装饰的对象
- context: 上下文对象, ts 提供原生接口`ClassMethodDecoratorContext`描述这个对象
  - 1. kind 所装饰对象的类型
    - class
    - method
    - getter
    - setter
    - field
    - accessor
  - 2. name 字符串或者 Symbol 值, 所装饰对象的名字
  - 3. addInitializer 添加类的初始化逻辑
  - 4. private 所装饰的对象是否为类的私有成员
  - 5. static 所装饰的对象是否为类的静态成员
  - 6. access 存取器, 包含某个值的 get 和 set 方法

## 三、类装饰器
```ts
type ClassDecorator = (
  value: Function,
  context: {
    kind: 'class';
    name: string | undefined;
    addInitializer(initializer: () => void): void;
  }
) => Function | void;
```

类装饰器可以返回一个函数, 替代当前类的构造方法
```ts
function countInstances(value:any, context:any) {
  let instanceCount = 0;

  const wrapper = function (...args:any[]) {
    instanceCount++;
    const instance = new value(...args);
    instance.count = instanceCount;
    return instance;
  } as unknown as typeof MyClass;

  wrapper.prototype = value.prototype; // A
  return wrapper;
}

@countInstances
class MyClass {}

const inst1 = new MyClass();
inst1 instanceof MyClass // true
inst1.count // 1
```

类装饰器也可以返回一个新的类，替代原来所装饰的类。
```ts
function countInstances(value:any, context:any) {
  let instanceCount = 0;

  return class extends value {
    constructor(...args:any[]) {
      super(...args);
      instanceCount++;
      this.count = instanceCount;
    }
  };
}

@countInstances
class MyClass {}

const inst1 = new MyClass();
inst1 instanceof MyClass // true
inst1.count // 1
```

类装饰器的`addInitializer`方法, 用来定义一个类的初始化函数, 在类完全定义结束后执行
```ts
function customElement(name: string) {
  return <Input extends new (...args: any) => any>(
    value: Input,
    context: ClassDecoratorContext
  ) => {
    context.addInitializer(function () {
      customElements.define(name, value)
    })
  }
}
// 当前类注册为指定名称（本例为`<hello-world>`）的自定义 HTML 元素
@customElement('alexshwing')
class myComponent extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.innerHTML = `<h1>Hello World</h1>`
  }
}
```

## 四、方法装饰器
```ts
type ClassMethodDecorator = (
  value: Function,
  context: {
    kind: 'method';
    name: string | symbol;
    static: boolean;
    private: boolean;
    // ! 只有 get 用于取值, 没有 set 进行赋值
    access: { get: () => unknown };
    addInitializer(initializer: () => void): void;
  }
) => Function | void;
```
方法装饰器会改写类的原始方法, 实质等同于下面的操作
```ts
function trace(decoratedMethod) { }
class C {
  @trace
  toString() {
    return 'C'
  }
}
// `@trace` 等同于 `C.prototype.toString = trace(C.prototype.toString)`
```
如果方法装饰器返回一个新的函数, 就会替代所装饰的原始函数
```ts
function log(originalMethod: any, context: ClassMemberDecoratorContext) {
  const methodName = String(context.name)

  function replacementMethod(this: any, ...args: any[]) {
    console.log(`log: entering method ${methodName}`)
    const res = originalMethod.call(this, ...args)
    console.log(`log: exiting method ${methodName}`)
    return res
  }
  return replacementMethod
}

class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
  @log
  say() {
    console.log(this.name)
  }
}

const p = new Person('alexshwing')
p.say()
// log: entering method say
// alexshwing
// log: exiting method say
```
方法延迟执行
```ts
function delay(milliseconds: number = 0) {
  return function (value, context) {
    if (context.kind === 'method') {
      return function (...args: any[]) {
        setTimeout(() => {
          value.apply(this, args)
        }, milliseconds)
      }
    }
  }
}

class Logger {
  @delay(1000)
  log(msg: string) {
    console.log(`${msg}`)
  }
}

let logger = new Logger()
```
这种通过高阶函数返回装饰器的做法, 称为"工厂模式"

方法装饰器中`addInitializer`方法, 用于类的初始化阶段添加回调函数。这个回调函数作为`addInitializer`的参数传入, 它会在构造方法执行期间执行, 早于属性(field)的初始化
```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
    this.greet = this.greet.bind(this); // 绑定 this
  }
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}
const g = new Person('alexshwing').greet;
g() 
```
使用 addInitializer 改写
```ts
function bound(
  originalMethod:any, context:ClassMethodDecoratorContext
) {
  const methodName = context.name;
  if (context.private) {
    throw new Error(`不能绑定私有方法 ${methodName as string}`);
  }
  context.addInitializer(function () {
    this[methodName] = this[methodName].bind(this);
  });
}
```

## 五、属性装饰器
```ts
type ClassFieldDecorator = (
  value: undefined,
  context: {
    kind: 'field'; // ! 该值为`field`, 而不是`property`或`attribute`
    name: string | symbol;
    static: boolean;
    private: boolean;
    access: { get: () => unknown, set: (value: unknown) => void };
    addInitializer(initializer: () => void): void;
  }
) => (initialValue: unknown) => unknown | void;
```
属性装饰器要么不返回值，要么返回一个函数，该函数会自动执行，用来对所装饰属性进行初始化。该函数的参数是所装饰属性的初始值，该函数的返回值是该属性的最终值。

属性装饰器的返回值函数，可以用来更改属性的初始值。

属性装饰器的上下文对象`context`的`access`属性，提供所装饰属性的存取器
```ts
let acc: any
function exposeAccess(value: any, context: ClassFieldDecoratorContext) {
  acc = context.access as any
}

class Color {
  @exposeAccess
  name = 'green'
}
const green = new Color()
console.log(green.name) // green
console.log(acc.get(green)) // green
acc.set(green, 'red')
console.log(green.name) // red
console.log(acc.get(green)) // red
```

## 六、getter 装饰器、setter 装饰器
```typescript
type ClassGetterDecorator = (
  value: Function,
  context: {
    kind: 'getter';
    name: string | symbol;
    static: boolean;
    private: boolean;
    access: { get: () => unknown };
    addInitializer(initializer: () => void): void;
  }
) => Function | void;

type ClassSetterDecorator = (
  value: Function,
  context: {
    kind: 'setter';
    name: string | symbol;
    static: boolean;
    private: boolean;
    access: { set: (value: unknown) => void };
    addInitializer(initializer: () => void): void;
  }
) => Function | void;
```
getter 装饰器的上下文对象`context`的`access`属性只包含`get()`方法; setter 装饰器的`access`属性只包含`set()`方法。这两个装饰器要么不返回值，要么返回一个函数，取代原来的取值器或存值器

## 七、accessor 装饰器
装饰器语法引入一个新的属性修饰符`accessor`, 等同于为属性`x`自动生成取值器和存值器, 它们作用于私有属性`x`


`accessor`也可以与静态属性和私有属性一起使用。
```ts
class C {
  accessor x = 1;
  static accessor y = 1;
}
// 等同于
class CC {
  #x = 1
  get x() { return this.#x }
  set x(val) { this.#x = val }
}
```

accessor 装饰器的类型如下。

```typescript
type ClassAutoAccessorDecorator = (
  value: {
    get: () => unknown;
    set: (value: unknown) => void;
  },
  context: {
    kind: "accessor";
    name: string | symbol;
    access: { get(): unknown, set(value: unknown): void };
    static: boolean;
    private: boolean;
    addInitializer(initializer: () => void): void;
  }
) => {
  get?: () => unknown;
  set?: (value: unknown) => void;
  init?: (initialValue: unknown) => unknown;
} | void;
```

## 八、装饰器执行顺序
装饰器执行分为两个阶段
(1) 评估: 计算`@`符号后面的表达式的值, 得到的应该是函数
(2) 应用: 将评估装饰器后得到的函数, 应用于所装饰对象
也就是说，装饰器的执行顺序是，先评估所有装饰器表达式的值，再将其应用于当前类。

应用装饰器时，顺序依次为方法装饰器和属性装饰器，然后是类装饰器。
```ts
function d(str: string) {
  console.log(`评估 @d(): ${str}`)
  return (value: any, context: any) => console.log(`应用 @d(): ${str}`)
}
function log(str: string) {
  console.log(str)
  return str
}

@d('类装饰器')
class T {
  @d('静态属性装饰器')
  static staticField = log('静态属性值');
  @d('原型方法')
  [log('计算方法名')]() {}
  @d('实例属性')
  instanceField = log('实例属性值')
}
// 评估 @d(): 类装饰器
// 评估 @d(): 静态属性装饰器
// 评估 @d(): 原型方法
// 计算方法名
// 评估 @d(): 实例属性
// 应用 @d(): 原型方法
// 应用 @d(): 静态属性装饰器
// 应用 @d(): 实例属性
// 应用 @d(): 类装饰器
// 静态属性值
```

(1) 评估: 这一步计算装饰器的值。首先是类装饰器, 然后是类内部装饰器, 按照它们的出现顺序

注意, 如果属性名或方法名是计算值, 则它们在对应的装饰器评估之后, 也会进行自身的评估

(2) 应用: 实际执行装饰器函数, 将它们与对应的方法和属性进行结合。

原型方法的装饰器首先应用, 然后是静态属性和静态方法装饰器, 接下来是实例属性修饰器, 最后是类装饰器

注意，“实例属性值”在类初始化的阶段并不执行，直到类实例化时才会执行。

如果一个方法或属性有多个装饰器，则内层的装饰器先执行，外层的装饰器后执行。