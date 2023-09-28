# class

## 一、简介
### 1.属性的类型
- 类的属性可以在顶层声明, 也可以再构造方法内部声明
- 对于顶层声明的属性, 可以在声明时同时给出类型, 也可以不给出类型, ts 会认为它们的类型为 any
- 如果声明给出初值, 可以不写类型, ts 会自行推断属性的类型

### 2.readonly 修饰符
表示该属性只读

- readonly 属性的初始值, 可以写在顶层属性, 也可以写在构造方法里面
- 构造方法修改只读属性的值是可以的。如果两个地方都设置了只读属性的值，以构造方法为准。

### 3.方法的类型
- 类的方法就是普通函数，类型声明方式与函数一致。
- 类的方法跟普通函数一样，可以使用参数默认值，以及函数重载。
- 另外，构造方法不能声明返回值类型，否则报错，因为它总是返回实例对象。

### 4.存取器方法
存取器(accessor)包含取值器(getter)和存值器(setter), 取值器用于读取属性, 存值器用于写入属性
- 如果某个属性只有`get`方法, 没有`set`方法, 那么该属性自动成为只读属性
- ts 5.1版本前, `set`方法的参数类型, 必须兼容`get`方法的返回值类型, 否则报错
- `get`和`set`方法的可访问性必须一致, 要么都为公开方法, 要么都为私有方法

### 5.属性索引
`[s:string]`表示所有属性名类型为字符串的属性, 它们的属性值要么是布尔值, 要么是返回布尔值的函数
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

## 二、类的 interface 接口
### 1. implements 关键字
interface 接口或 type 别名, 可以用对象的形式, 为 class 指定一组检查条件。然后，类使用 implements 关键字，表示当前类满足这些外部类型条件的限制。
```ts
interface Country {
  name: string;
}
class MyCountry implements Country {
  name = ''
}
```
- `implements` 关键字后面, 不仅可以是接口, 也可以是另一个类。这时, 后面的类将被当作接口
- `interface` 描述的是类的对外接口，也就是实例的公开属性和公开方法，不能定义私有的属性和方法。

### 2. 实现多个接口
```ts
class Car implements MotorVehicle, Flyable, Swimmable {}
```
### 3. 类与接口的合并
ts 不允许两个同名的类, 但是如果一个类和一个接口同名, 那么接口会被合并进类


## 三、Class 类型
### 1. 实例类型
- ts 的类本身就是一种类型, 但是它代表该类的实例类型, 而不是 class 的自身类型
```ts
class MyClass {
  // 类的定义
}

const myInstance: MyClass = new MyClass();
```
- 作为类型使用时，类名只能表示实例的类型，不能表示类的自身类型。
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

### 2. 类的的自身类型
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

### 3. 结构类型原则
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

## 四、类的继承
类使用 `extends` 关键字继承另一个类(这里称为"基类")的所有属性和方法
- 根据结构类型原则，子类也可以用于类型为基类的场合。
- 子类可以覆盖基类的同名方法。但是，子类的同名方法不能与基类的类型定义相冲突。
- 如果基类包括保护成员（`protected`修饰符），子类可以将该成员的可访问性设置为公开（`public`修饰符），也可以保持保护成员不变，但是不能改用私有成员（`private`修饰符）

## 五、可访问性修饰符
- public: 公开成员, 外部可以自由访问 (默认)
- private: 私有成员, 只能用在当前类的内部, 类的实例和子类不能使用该成员
  - 子类不能定义父类私有成员的同名成员
  - ES2022 引入了私有成员写法 `#propName` , 推荐使用该写法
  - 构造方法也可以是私有的，这就直接防止了使用 `new` 命令生成实例对象，只能在类的内部创建实例对象。这时一般会有一个静态方法，充当工厂函数，强制所有实例都通过该方法生成。
- protected: 保护成员, 只能在类的内部使用该成员, 实例无法使用该成员, 但是子类内部可以使用
  - 子类不仅可以拿到父类的保护成员，还可以定义同名成员。


## 六、静态成员
类的内部可以使用 `static` 关键字定义静态成员
- 静态成员是只能通过类本身使用的成员，不能通过实例对象使用
- `static`关键字前面可以使用 public、private、protected 修饰符
- `public`和`protected`的静态成员可以被继承

## 七、泛型类
类也可以写成泛型，使用类型参数。
- 静态成员不能使用泛型的类型参数

## 八、抽象类、抽象成员
允许在类的定义前面, 加上关键字`abstract`, 表示该类不能被实例化, 不能当作其他类的模板, 这种类就叫做"抽象类"
- 抽象类只能当作基类使用，用来在它的基础上定义子类。
- 抽象类的子类也可以是抽象类，也就是说，抽象类可以继承其他抽象类。
- 抽象类的内部可以有已经实现好的属性和方法，也可以有还未实现的属性和方法。后者就叫做“抽象成员”（abstract member），即属性名和方法名有`abstract`关键字，表示该方法需要子类实现。如果子类没有实现抽象成员，就会报错。
  - 抽象成员只能存在于抽象类，不能存在于普通类。
  - 抽象成员不能有具体实现的代码。也就是说，已经实现好的成员前面不能加`abstract`关键字。
  - 抽象成员前也不能有`private`修饰符，否则无法在子类中实现该成员。
  - 一个子类最多只能继承一个抽象类。

## 九、this 问题
类的方法经常用到 `this` 关键字，它表示该方法当前所在的对象。

- TypeScript 允许函数增加一个名为 `this` 的参数，放在参数列表的第一位，用来描述函数内部的 `this` 关键字的类型。
  - TypeScript 一旦发现函数的第一个参数名为`this`，则会去除这个参数，即编译结果不会带有该参数。
- 在类的内部，`this`本身也可以当作类型使用，表示当前类的实例对象。
- `this`类型不允许应用于静态成员。
- `this is Type`的形式，可以精确表示返回值