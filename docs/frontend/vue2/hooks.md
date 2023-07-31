# @hook
## 1. 介绍
> `@hook`用来监听组件生命周期的回调函数


> 和生命周期`mounted`、`created` 和 `updated`有什么区别?
> 
> `@hook` 会在对应的生命周期函数执行后执行
>
> `@hook` 可以在父组件监听子组件的生命周期运行情况
```javascript
// @see https://github.com/vuejs/vue/blob/main/src/core/instance/lifecycle.ts#L393
export function callHook(
  vm: Component,
  hook: string,
  args?: any[],
  setContext = true
) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget()
  const prev = currentInstance
  setContext && setCurrentInstance(vm)
  const handlers = vm.$options[hook]
  const info = `${hook} hook`
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, args || null, vm, info)
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook)
  }
  setContext && setCurrentInstance(prev)
  popTarget()
}
```
从这段源码我们可以看到`hook`部分调用逻辑, `vm.$emit('hook:' + hook)`其实就是在调用我们写的`@hook:mounted=xxx`

## 2. 用法
### 1. 统一书写多个生命周期逻辑
```vue
<script>
export default {
  data() {
    return {
      form: {},
    };
  },
  created() {
    console.log('created')
    this.$on('hook:beforeMount', () => {
      console.log('beforeMount')
    })
    this.$on('hook:mounted', () => {
      console.log(this.name); // this 就是组件实例自己
      console.log('mounted')
    })
  }
};
</script>
```
注意
1. 按照生命周期执行的先后周期，我们只能`mounted`生命周期里写这之后的生命周期，而不能写`hook:beforeMount`
2. `this.$on`第二个回调函数的`this`指的是当前组件实例本身，无论这个回调函数是否是箭头函数。
### 2.监听子组件生命周期运行情况
```vue
<Children @hook:mounted="ButtonRender"/>
<script>
export default {
  name: 'Parents',
  components: {
  	Children
  },
  data: () => {
    return {
      name: 'dx',
    };
  },
  methods: {
    ButtonRender() {
      console.log('渲染完成')
    }
  }
}
</script>
```
注意
1. `@hoook`写法可以不需要在子组件里面编写其他代码
2. 从`vue`源码中可以发现 `vm.$emit('hook:' + hook) `这里虽然调用了`hook`但没有返回参数，也就是说，上面代码中`ButtonRender`没有默认参数。
3. 同样承接着2来说，由于`ButtonRender`没有默认参数，所以我们无法在`ButtonRender`函数中获取子组件`Children`的实例。(解决方法: 通过`ref`获取子组件实例, `ref`绑定是在组件挂载完成后, 所以这种方法只能用在`@hook:mounted`和`@hook:updated`等`mounted`之后执行的生命周期中)
```javascript
function ButtonRender() {
    console.log(this.$refs.child1) // this.$refs.child1就是子组件Children的实例了
    console.log('渲染完成')
}
```
## 3. 应用场景
### 定时器销毁
```vue
<script>
export default {
  mounted () {
    const timer = setInterval(() => {
    }, 1000);
    this.$once('hook:beforeDestroy', function () {
        clearInterval(timer)
    })
  }
}
</script>
```
### 如果属于同一业务的逻辑要在不同的生命周期中执行，下面这样会更利于阅读和维护
```vue
<script>
export default {
  created() {
    this.$on('hook:mounted', () => {
      // 挂载时执行一些业务A相关逻辑
    })
    this.$on('hook:updated', () => {
      // 更新时执行一些业务A相关逻辑
    })
    this.$once('hook:beforeDestroy', () => {
     //  销毁时执行一些业务A相关逻辑
    })
  }
}
</script>
```

### 监听第三方组件生命周期
```vue
<el-button type="primary" @hook:mounted="ButtonRender" :disabled="disabled">{{name}}</el-button>

<script>
export default {
  name: 'Parents',
  data: () => {
    return {
      name: 'dx',
      disabled: true
    };
  },
  methods: {
    ButtonRender() {
      this.disabled = false
      this.name = 'yx'
    }
  }
}
</script>
```
