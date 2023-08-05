# 替换路由
```js
// @see https://github.com/vuejs/vue-router/issues/1234
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const createRouter = () => new Router({
  mode: 'history',
  routes: []
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

export default router
```