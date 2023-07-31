# JSX
## 1. v-if
```jsx
function render() {
  const ok = true
  return <div>{ok ? <div>True</div> : <div>False</div>}</div>
}
```

## 2. v-for
```jsx
function render() {
  const list = ['A', 'B']
  return (
    <div>
      {list.map((name) => (
        <div>{name}</div>
      ))}
    </div>
  )
}
```
## 3. v-html | v-text
```jsx
function render() {
  return (
    <div domPropsInnerHTML="<div>alexshwing</div>"></div>
  )
}
```
## 4. v-on
以`on`开头，并跟着大写字母的`props`会被当作事件监听器。比如，`onClick` 与模板中的 `@click` 等价。
```jsx 
// onClick
function render() {
  return (
    <button
      onClick={() => {
        alert('click!')
      }}
    >
      click
    </button>
  )
}
```
```jsx  
// onChange
function render() {
  return <input onChange={() => console.log('1')} />
}
```

## 5. style
```jsx
function render() {
  return (
    <div style={{ width: '100px', height: '100px', background: 'red' }}></div>
  )
}
```

## 6. class
```vue
<script>
export default {
  data() {
    return {
      red: false,
    }
  },
  render() {
    return (
      <div
        class={{
          'is-red': this.red,
        }}
        onClick={() => (this.red = !this.red)}
      ></div>
    )
  },
}
</script>

<style lang="scss" scoped>
div {
  width: 100px;
  height: 100px;
  background: green;
}
.is-red {
  background: red;
}
</style>
```

## 7. components
```jsx
function render() {
  return ok.value ? <Foo /> : <Bar />
}
```

## 8. slots
### 具名
```jsx
<Foo>
  <template slot="top">top</template>
</Foo>
const slots = this.$slots
return <div>{slots.top}</div>
```
### 默认
```jsx
<Foo>middle</Foo>
const slots = this.$slots
return <div>{slots.default}</div>
```
### 作用域
```jsx
function render() {
    return (
      <div>
        <Foo
          scopedSlots={{
            top: (topInfo) => <div>{topInfo}</div>,
            middle: (middleInfo) => <div>{middleInfo}</div>,
            bottom: (bottomInfo) => <div>{bottomInfo}</div>,
          }}
        ></Foo>
      </div>
    )
  },
}
```
```jsx
function data() {
  return {
    topInfo: 'top',
    middleInfo: 'middle',
    bottomInfo: 'bottom',
  }
},
function render() {
  const scopedSlots = this.$scopedSlots
  const { topInfo, middleInfo, bottomInfo } = this
  return (
    <div>
      <div>{scopedSlots.top(topInfo)}</div>
      <div>{scopedSlots.middle(middleInfo)}</div>
      <div>{scopedSlots.bottom(bottomInfo)}</div>
    </div>
  )
},
```
## 9. v-model
```jsx
function  data() {
  return {
    inputValue: '',
  }
},
function render() {
  return (
    <div>
      <el-input v-model={this.inputValue}></el-input>
      {this.inputValue}
    </div>
  )
},
```
## 10. attributes
### sync
```jsx
// 通知父组件进行更新
// @see https://github.com/vuejs/babel-plugin-transform-vue-jsx/blob/master/example/example.js
function handleUpdate() {
  this.$emit("handleUpdate");
},
function render() {
  return (
    <el-dialog
      ...
      visible={this.visible}
      {...{ on: {'update:visible': this.handleUpdate}}}
    >
    </el-dialog>
  )
}
```