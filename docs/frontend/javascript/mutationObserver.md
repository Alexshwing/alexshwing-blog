# MutationObserver
MutaionObserver 提供监视对 DOM 树所做更改的能力

## 方法
###  mutationObserver.observe(target[, options])
配置了 MutationObserver 对象的回调方法以开始接收与给定选项匹配的 DOM 变化的通知
- target: 要观察的 DOM node
- options: 配置项
  - subtree: 监听以 target 为根的子树
  - childlist: 监听 target 节点中发生的节点新增与删除
  - attributes: 观察所有监听的节点属性值的变化
  - attributeFilter: 哪些属性名会被监听的数组
  - attributeOldValue：记录上一次被监听的节点的属性变化
  - characterData: 监听声明的 target 节点上所有字符的变化
  - characterDataOldValue：记录前一个被监听的节点中发生的文本变化 
### mutationObserver.disconnect()
告诉观察者停止观察变动

```vue
<template>
  <div class="container">
    <el-button type="primary"
      @click="isShow = !isShow">click</el-button>
    <div class="fa">
      <div class="son"
        v-if="isShow">son
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
    }
  },
  mounted() {
    const fa = document.querySelector('.fa')
    const observer = new MutationObserver(() => {
      console.log('changed!')
    })
    const config = {
      childList: true,
      subtree: true,
    }
    observer.observe(fa, config)
  },
}
</script>


<style lang="scss" scoped>
</style>

```
## 应用场景
### 1. 监听去水印
### 2. Vue nextTick