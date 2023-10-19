# 基础沉淀

## 一、生命周期

## 二、条件渲染
### 用 key 管理可复用的元素
Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。
```vue
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```
切换 loginType 不会清除用户已输入的内容, 如果不再复用, 只需添加具有唯一值的`key`

### `v-if` vs `v-show`
- `v-if`为 false 会在当前模板创建一个注释节点(占位节点), 等到`v-if`为 true 才会创建一个真实节点。这里的注释节点用来标识在页面中的位置, 以便在 diff 中 patch 的时候直接在该位置渲染元素
- `v-show` 通过 `display: none` 隐藏

v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

v-show 元素无论初始条件如何, 始终被渲染, 只有 CSS display 属性会被切换

一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

## 三、列表渲染

当 Vue 正在更新使用 v-for 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key attribute

### 数据更新检测
变更方法:
- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

替换数组:
- `filter()`
- `concat()`
- `slice()`

### `v-if` 和 `v-for` 一起使用
当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。这意味着 v-if 将分别重复运行于每个 v-for 循环中。
- 如果目的是有条件的跳过循环的执行, 那么可以将`v-if`置于外层元素或`<template>`
- 如果只是需要过滤掉不需要的项, 通过计算属性的方式

## 四、事件处理

事件修饰符:
- `.stop` 阻止事件继续传播
- `.prevent` 阻止事件默认行为
- `.capture` 事件捕获
- `.self` 限制事件只在元素自身触发
- `.once` 事件监听器只触发一次
- `.passive` 滚动事件的默认行为 (即滚动行为) 将会立即触发,而不会等待 `onScroll` 完成


## 五、组件基础
### `data` 必须是一个函数
data 是 Vue 实例的数据对象。Vue 会递归把 data 的 property 转换为 getter / setter , 从而让 data 的 property 能够响应数据变化。

当一个组件被定义时, data 必须声明为函数, 因为组件可能被创建多个实例。如果 data 是一个纯粹的对象, 则所有的实例将共享引用同一个对象。通过提供 data 函数, 创建每个新实例时, 调用 data 函数返回初始数据的一个全新副本数据对象。


一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝

### Prop
- 单向数据流

父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

- 非 Prop 的 Attribute

一个非 Prop 的 attribute 是指传向一个组件, 但是该组件并没有响应 prop 定义的 attribute。这些 attribute 会被添加到这个组件的根元素上。

对于绝大多数 attribute 来说，从外部提供给组件的值会替换掉组件内部设置好的值。如传入的`type=text`会替换`type=date`

`class` 和 `style` 会将两边的值合并起来，从而得到最终的值

- 禁用 Attribute 继承

如果你不希望组件的根元素继承 attribute，你可以在组件的选项中设置 `inheritAttrs: false`

子组件使用v-bind ="$attrs" 获取传递过来的非prop的attribute
```vue
<son placeholder="你好" type="text"></son>

<template>
  <div>
    <input v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
}
</script>

```
- `.sync`修饰符
双向绑定
```vue
<text-document v-bind:title.sync="doc.title"></text-document>

<!-- 等价于 -->
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```
```js
this.$emit('update:title', newTitle)
```

## 六、插槽
### 默认插槽
```vue
<!-- 父 -->
<son>main</son>

<!-- 子 -->
<template>
  <div>
    <main>
      <slot></slot>
    </main>
  </div>
</template>
```

### 具名插槽
```vue
<!-- 父 -->
<template>
  <div class="app-container">
    <son>
      <template v-slot:header>header</template>
      main
      <template v-slot:footer>footer</template>
    </son>
  </div>
</template>

<!-- 子 -->
<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```
### 作用域插槽
```vue
<!-- 父 -->
<template>
  <div class="app-container">
    <son>
      <template #header="slotProps">{{ slotProps.user }}</template>
      main
      <template #footer>footer</template>
    </son>
  </div>
</template>

<!-- 子 -->
<template>
  <div>
    <header>
      <slot name="header" v-bind:user="user"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: 'alexshwing',
        age: 10,
      },
    }
  },
}
</script>
```

## 七、keep-alive

## 八、Mixin
混入用于分发 Vue 组件的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时, 所有混入对象的选项将被“混合”进入该组件本身的选项。

- 当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。比如，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
- 同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
- 值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

## 九、directive
代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。

聚焦文本框
```vue
<template>
  <div class="app-container">
    <input v-focus />
  </div>
</template>

<script>
export default {
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      },
    },
  },
}
</script>
```

## 十、插件
添加全局功能
### 开发插件
```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
  }
  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
    }
  })
  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
    }
    ...
  })
  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
  }
}
```
### 使用插件
```js
Vue.use(MyPlugin)
```

## 十一、过滤器 (filter)
过滤器用于**常见文本格式化**。被用在两个地方: 双花括号插值和 v-bind 表达式。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示。过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。
```vue
<template>
  <div class="app-container">
    <div :id="id | toUpper"></div>
    <div>{{ id | toUpper }}</div>
    <img :src="imageUrl | imgUrl" alt="Image">
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 'alexshwing',
    }
  },
  filters: {
    toUpper(str) {
      return str.toUpperCase()
    },
    // 给图片地址添加时间戳, 避免图片缓存问题
    imgUrl(value) {
      return value + '?timestamp' + (new Date().getTime())
    }
  },
}
</script>

```
