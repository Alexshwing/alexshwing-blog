# 监听 SessionStorage

## 1. 用`StorageEvent`重写`setSessionStorage`
- main.js
```javascript
Vue.prototype.setSessionItem = function(key, newVal) {
  if (key === 'number') {
    const storage = {
      setItem: function(k, val) {
        sessionStorage.setItem(k, val)
        // 初始化创建事件
        const event = new StorageEvent("setNumber", {
          canBubble: false, // 是否可以通过 dom 冒泡
          cancelable: false, // 是否可以注销事件
          key: k, // 事件结果时被改变的值对应的属性名称
          newValue: val, // 新值
          oldValue: sessionStorage.getItem(k), // 旧值
          storageArea: sessionStorage // 发生在哪个 storage 对象上
        })
        // 派发对象
        window.dispatchEvent(event)
      }
    }
    return storage.setItem(key,newVal)
  }
}
```
## 2. 修改时调用`setSessionItem`
- App.vue
```vue
<template>
  <div id="app">
    <el-select v-model="number" @change="handleChangeNumber">
      <el-option
        v-for="item in [
          { value: '0', label: '0' },
          { value: '1', label: '1' },
          { value: '2', label: '2' },
        ]"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <nav>
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: '0',
    }
  },
  methods: {
    handleChangeNumber() {
      this.setSessionItem('number', this.number)
    },
  },
}
</script>
```
## 3. 在需要获取数据的地方监听
- AboutView.vue
```vue
<template>
  <div>{{ number }}</div>
</template>
<script>
export default {
  data() {
    return {
      number: '',
    }
  },
  mounted() {
    this.number = sessionStorage.getItem('number')
    // 添加对`sessionStorage`中`number`监听
    window.addEventListener('setNumber', this.updateNumber)
  },
  beforeDestroy() {
    // 移除对`sessionStorage`中`number`监听
    window.removeEventListener('setNumber', this.updateNumber)
  },
  methods: {
    updateNumber() {
      this.number = sessionStorage.getItem('number')
    },
  },
}
</script>
```