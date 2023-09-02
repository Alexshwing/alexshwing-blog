# 进阶
## 一、导航守卫
导航首位用来通过跳转或取消的方式守卫导航(导航表示路由正在发生改变)

**参数或查询的改变并不会触发进入/离开的导航守卫**, 需要通过观察 $route 对象或`beforeRouteUpdate`组件内守卫
### 1. 全局前置守卫
当一个导航触发时，全局前置守卫按照创建顺序调用。 守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。
```js
router.beforeEach((to, from, next) => { })
```
- to: Route 即将要进入的目标路由对象
- from: Route 当前导航要离开的路由
- next: Function 一定要调用该方法来 resolve 这个钩子
  - next() 进行管道中下一个钩子
  - next(false) 中断当前导航
  - next("/") 跳转到一个不同的地址
### 2. 全局解析守卫
在 2.5.0+ 你可以用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。
### 3. 全局后置守卫
```js
router.afterEach((to, from) => { })
```
### 4. 路由独享守卫
```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```
### 5. 组件内守卫
- beforeRouteEnter
- beforeRouteUpdate (2.2+)
- beforeRouteLeave
```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```
beforeRouteEnter 守卫 不能 访问 this, 可以通过传一个回调函数给 next 来访问组件实例。
> 注意 beforeRouteEnter 是支持给 next 传递回调的唯一守卫。
```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```
这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。
```js
beforeRouteLeave (to, from, next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```
### 6. 完整的导航解析流程
1. 导航被触发
2. 在失活的组件里调用 beforeRouteLeave
3. 调用全局的 beforeEach
4. 在重用的组件里调用 beforeRouteUpdate(2.2+)
5. 在路由配置里调用 beforeRouteEnter
6. 解析异步路由组件
7. 在被激活的组件里调用 beforeRouteEnter
8. 调用全局的 beforeResolve
9. 导航被确认
10. 调用全局的 afterEach 钩子
11. 触发 DOM 更新
12. 调用 beforeRouteEnter 守卫中传给 next 回调函数, 创建好的组件实例会作为回调函数的参数传入
## 二、路由元信息
```js{10}
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```
通过`$route.matched` 来检查路由记录中的 meta 字段
- 在全局导航守卫中检查元字段
```js
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
```
## 三、过渡动效
通过`<transition>`组件添加过渡效果
```vue
<transition>
  <router-view></router-view>
</transition>
```
## 四、滚动行为
在切换到新路由时, 想要页面滚到顶部或者保持原先的位置
> 注意: 这个功能只在支持 history.pushState 的浏览器中使用
```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
```
scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。

这个方法返回滚动位置的对象信息，长这样：
- `{ x: number, y: number }`
- `{ selector: string, offset? : { x: number, y: number } `(offset 只在 2.6.0+ 支持)
- falsy 或 空对象, 不发生滚动

```js
// 滚动到顶部
scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
// 返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
// 滚动到锚点
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}
```
## 五、路由懒加载
结合 Vue 的异步组件和 Webpack 的 代码分割实现
```js
const Foo = () => import('./Foo.vue')
const router = new VueRouter({
  routes: [{ path: '/foo', component: Foo }]
})
```
## 六、导航故障
- 用于已经位于它们正在尝试导航到的页面
- 一个导航守卫通过调用`next(false)`终端这次导航
- 一个导航守卫抛出一个错误, 或调用`next(new Error())`
### 检测导航故障
导航故障是一个 Error 实例，附带了一些额外的属性。要检查一个错误是否来自于路由器，可以使用 isNavigationFailure 函数：
```js
import VueRouter from 'vue-router'
const { isNavigationFailure, NavigationFailureType } = VueRouter
// 正在尝试访问 admin 页面
router.push('/admin').catch(failure => {
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    // 向用户显示一个小通知
    showToast('Login in order to access the admin panel')
  }
})
```
> 如果你忽略第二个参数：isNavigationFailure(failure)，那么就只会检查这个错误是不是一个导航故障。
### NavigationFailureType
- redirected 在导航守卫中调用了`next(newLocation)`重定向到了其他地方
- aborted 在导航守卫中调用了`next(false)`中断了本次导航
- cancelled 在当前导航还没有完成之前又有了一个新的导航
- duplicated 导航被阻止
### 导航故障的属性
所有的导航故障都会有 to 和 from 属性，分别用来表达这次失败的导航的目标位置和当前位置。
```js
// 正在尝试访问 admin 页面
router.push('/admin').catch(failure => {
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    failure.to.path // '/admin'
    failure.from.path // '/'
  }
})
```