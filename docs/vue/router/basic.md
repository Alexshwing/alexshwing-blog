# 基础
:::tip 参考
[Vue Router v3.x](https://v3.router.vuejs.org/zh/)
:::
## 一、起步
- HTML
```html
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```
- JavaScript
```js
// 1. 定义路由组件
// 可以从其他文件导入
const Foo = { template: '<div></div>' }
// 2. 定义路由
// 每个路由应该映射一个组件
const routes = [
  { path: '/foo', component: Foo },
]
// 3. 创建 router 实例, 并传`routes`配置
const router = new VueRouter({
  routes 
})
// 4. 创建和挂载根实例
const app = new Vue({
  router
}).$mount('#app')
```
通过 `this.$router` 访问路由器, `this.$route` 访问当前路由

## 二、动态路由匹配
```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```
路径参数使用冒号标记。当匹配到路由时, 参数值会被设置到`this.$route.params`
### 响应路由变化
使用路由参数时, 原来的组件实例会被复用, 意味着组件的生命周期钩子不会再被调用, 通过`watch`或`beforeRouteUpdate`监测变化
```js
 watch: {
  $route(to, from) {}
}
```
```js
beforeRouteUpdate(to, from, next) {}
```
### 通配符路由
```js
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
},
{
  // 会匹配所有路径
  // 含有通配符的路由应该放在最后
  path: '*'
}
```
当使用一个通配符时, `$router.params`会自动添加一个名为`pathMatch`参数, 包含通配符被匹配的部分
```js
// 给出一个路由 { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
// 给出一个路由 { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
```
### 优先级
路由定义越早, 优先级越高

## 三、嵌套路由
```js{7-12,14-16}
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },

        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中
        { path: '', component: UserHome }
      ]
    }
  ]
})
```
以 `/` 开头的嵌套路径会被当作根路径
## 四、编程式导航
### 1. router.push(location, onComplete?, onAbort?)
向 histroy 栈添加一条新的记录, 等同于`<router-link :to="...">`
```js
// 字符串
router.push("home")
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```
**如果提供了`path`, `params`会被忽略**
```js
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```
### 2. router.replace(location, onComplete?, onAbort?)
不会像 history 添加新记录, 替换掉当前的 history 记录, 等同于`<router-link :to="..." replace>`
### 3. router.go(n)
history 记录向前或向后多少步, 等同于`window.history.go(n)`

## 五、命名路由
```js{3}
{
  path: '/user/:userId',
  name: 'user',
  component: User
}
```
```vue
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```
## 六、命名视图
同级展示多个组件
```vue
<!-- 默认为 default -->
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```
```js
{
  path: '/',
  components: {
    default: Foo,
    a: Bar,
    b: Baz
  }
}
```
## 七、重定向和别名
### 重定向
```js
// 1. 重定向到 /b
{ path: '/a', redirect: '/b' }
// 2. 重定向到已命名的路由
{ path: '/a', redirect: { name: 'foo' }}
// 3. 方法, 动态返回重定向目标
{ path: '/a', redirect: to => {
  // 方法接收 目标路由 作为参数
  // return 重定向的 字符串路径/路径对象
}}
```
注意导航守卫并没有应用在跳转路由上，而仅仅应用在其目标上。在下面这个例子中，为 /a 路由添加一个 beforeEnter 守卫并不会有任何效果。
### 别名
```js
{ path: '/a', component: A, alias: '/b' }
```
## 八、路由组件传参
### 布尔模式
如果 props 设置为 true , route.params 会被设置为组件属性
```js
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```
### 对象模式
如果 props 是一个对象，它会被按原样设置为组件属性。
```js
const router = new VueRouter({
  routes: [
    {
      path: '/promotion/from-newsletter',
      component: Promotion,
      props: { newsletterPopup: false }
    }
  ]
})
``` 
### 函数模式
你可以创建一个函数返回 props。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。
```js
const router = new VueRouter({
  routes: [
    {
      path: '/search',
      component: SearchUser,
      props: route => ({ query: route.query.q })
    }
  ]
})
```
URL `/search?q=vue` 会将 `{query: 'vue'}` 作为属性传递给 SearchUser 组件
## 九、HTML5 Histrory模式
`vue-router`默认`hash`模式---使用 URL 的 hash 来模拟一个完整的 URL , 相当于 URL 改变时, 页面不会重新加载

如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面。
```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```