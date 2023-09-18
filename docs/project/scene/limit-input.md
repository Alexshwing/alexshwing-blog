# 禁用中文输入法的输入框
功能
- 禁用中文输入法
- 解决密码填充

利用`type=password`的输入框禁用中文输入法, 将`div`覆盖在输入框上展示输入, 并通过伪元素来模拟光标闪烁, 通过`readonly=false`和动态控制输入框聚焦和失焦解决密码填充
```vue
<template>
  <div class="ban-chinese-input">
    <el-input
      type="password"
      :placeholder="placeholder"
      v-model="inputVal"
      autocomplete="off"
      class="password-input"
      ref="passwordInput"
      :readonly="!isMobile && readonly"
      @keyup.enter.native="handleKeyup"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @click.native="handleClick"
    ></el-input>
    <div
      :class="{ 'input-container': true, 'input-select-all': isSelectAll }"
      disabled
    >
      <span>{{ inputVal }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LimitInput',
  props: {
    placeholder: {
      type: String,
    },
    handleEnter: {
      type: Function,
      default: () => () => {},
      require: true,
    },
  },

  data() {
    return {
      inputVal: '',
      readonly: true,
      isSelectAll: false,
      isMobile: false,
    }
  },
  watch: {
    inputVal() {
      if (this.inputVal === '') {
        this.readonly = true
        this.handleFocus(null)
      }
    },
  },
  mounted() {
    this.isMobile = this.isUseMobile()
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.key === 'a') {
        console.log('Ctrl + A 被按下')
        this.isSelectAll = true
        console.log(this.isSelectAll)
      } else {
        this.isSelectAll = false
      }
    })
  },
  methods: {
    isUseMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    },

    handleKeyup() {
      this.$props.handleEnter(this.inputVal)
    },
    handleBlur(e) {
      if (e) {
        e.stopPropagation()
      }
      this.readonly = true
      this.controlSwing('0')
    },
    handleFocus(e) {
      if (e) {
        e.stopPropagation()
        e.preventDefault()
      }
      setTimeout(() => {
        this.readonly = false
      }, 100)
      this.controlSwing('1')
    },
    handleClick() {
      if (this.$refs.passwordInput) {
        this.$refs.passwordInput.$refs.input.onmousedown = (e) => {
          // 手机软键盘弹起是默认事件
          if (!this.isMobile && e) {
            e.stopPropagation()
            e.preventDefault()
          }
          if (
            this.$refs.passwordInput.$refs.input.value === '' ||
            this.readonly
          ) {
            this.$refs.passwordInput.$refs.input.blur()
            setTimeout(() => {
              this.$refs.passwordInput.$refs.input.focus()
            }, 0)
          }
          return false
        }
      }
    },
    handleInput(e) {
      if (!e) {
        this.readonly = true
      }
    },
    controlSwing(num) {
      const style = document.createElement('style')
      document.head.appendChild(style)
      const sheet = style.sheet
      sheet.insertRule(
        `.input-container:after{opacity:${num};animation:${
          num === '0' ? 'null' : 'swing 1.2s infinite'
        }}`
      )
    },
  },
}
</script>

<style lang="scss">
.ban-chinese-input {
  position: relative;
  & .input-container {
    position: absolute;
    left: 12px;
    top: 1px;
    pointer-events: none;
    height: 38px;
    line-height: 38px;
    background: #ffffff;
    font-size: 20px;

    &:after {
      content: '';
      display: inline-block;
      height: 20px;
      position: relative;
      border-right: solid 1px #666;
      top: 2px;
      left: 1px;
      opacity: 0;
    }
  }
  & .input-select-all {
    background: #a9cff2;
  }
  & .el-input__inner {
    color: #ffffff;
    caret-color: transparent;
  }
}

@keyframes swing {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

```

:::tip 参考
- [完美解决 element-ui input=password 在浏览器会自动填充密码的问题](https://juejin.cn/post/6916396142984953869?searchId=20230912155621549C628D728D6BB4C573)
- [VUE扫码枪中文输入法兼容自动回车事件(下)](https://blog.csdn.net/MichelleZhai/article/details/127922910)
:::