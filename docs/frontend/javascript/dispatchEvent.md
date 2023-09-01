# dispatchEvent
- Event.dispatchEvent()

EventTarget 的 dispatchEvent() 方法会向一个指定的事件目标派发一个 Event，并以合适的顺序（同步地）调用所有受影响的 EventListener。标准事件处理规则（包括事件捕获和可选的冒泡过程）同样适用于通过手动使用 dispatchEvent() 方法派发的事件。

和经由浏览器触发，并通过事件循环异步调用事件处理程序的“原生”事件不同，dispatchEvent() 会**同步调用**事件处理函数。在 dispatchEvent() 返回之前，所有监听该事件的事件处理程序将在代码继续前执行并返回。

```vue
<template>
  <div class="container">
    <button @click="click">click</button>
    <div>{{ count }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    }
  },
  mounted() {
    window.addEventListener('dblclick', () => {
      console.log(sessionStorage.getItem('COUNT'))
    })
  },
  methods: {
    click() {
      const el = document.querySelector('.container')
      const doubleClickEvent = new MouseEvent('dblclick', {
        bubbles: true,
        cancelable: true,
        view: window,
      })

      el.dispatchEvent(doubleClickEvent) // 模拟双击事件

      this.count++
      sessionStorage.setItem('COUNT', this.count)
    },
  },
}
</script>

```
由于 dispatchEvent 会同步调用事件处理函数, 这里读取到的缓存值是`this.count++; sessionStorage.setItem('COUNT', this.count)`操作前的值

> 踩坑记录
>
> 在 [监听 SessionStorage](../../vue/vue2/watchSessionStorage.md) 中调用 dispatchEvent 前应先把前置操作完成