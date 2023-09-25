# 扫码

## 相机扫码
- [vue-barcode-reader](https://www.npmjs.com/package/vue-barcode-reader)
- [@zxing/library](https://www.npmjs.com/package/@zxing/library)

```vue
<template>
  <div id="app">
    <StreamBarcodeReader @decode="onDecode"></StreamBarcodeReader>
  </div>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";
export default {
  name: "App",
  components: {
    StreamBarcodeReader,
  },
  methods: {
    onDecode(val) {
      console.log(val, "decoded");
    },
  },
};
</script>
```
通过 codesandbox 跑一个类似于沙箱环境

## 企微扫码

1. 安装包
```shell
npm install weixin-jsapi
```
2. 通过 config 接口注入权限验证配置
3. 调用企业微信扫一扫

```vue
<template>
  <div class="container">
    <el-button @click="handleScan"></el-button>
  </div>
</template>

<script>
import wx from 'weixin-jsapi'
import CryptoJS from 'crypto-js'
export default {
  mounted() {
    this.handleConfig()
  },

  methods: {
    // 配置
    async handleConfig() {
      const data = {
        timestamp: this.getTimeStamp(),
        nonceStr: this.getRandomString(16),
      }

      const res = await xxx
      this.ticket = res.data

      wx.config({
        beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'xxxx', // 必填，企业微信的corpID，必须是本企业的corpID，不允许跨企业使用
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: this.getSignature(
          this.ticket,
          data.timestamp,
          data.nonceStr
        ), // 必填，签名，见 附录-JS-SDK使用权限签名算法
        jsApiList: ['agentConfig', 'scanQRCode'], // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
      })

      wx.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        console.log('ready')
      })

      wx.error(() => {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })
    },

    async handleScan() {
      wx.scanQRCode({
        desc: 'scanQRCode desc',
        needResult: 1, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是条形码（一维码），默认二者都有
        success: async (res) => {
          // 回调
          var result = res.resultStr //当needResult为1时返回处理结果
          console.log(result)
          this.scanCode()
        },
        error: function (res) {
          if (res.errMsg.indexOf('function_not_exist') > 0) {
            alert('版本过低请升级')
          }
        },
      })
    },

    getTimeStamp() {
      return Date.parse(new Date())
    },
    getRandomString(len) {
      const _charStr =
        'abacdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let max = _charStr.length,
        _str = ''
      //判断是否指定长度，否则默认长度为15
      len = len || 15
      //循环生成字符串
      for (var i = 0, index; i < len; i++) {
        _str += _charStr.charAt(Math.floor(Math.random() * max))
      }

      return _str
    },
    getSignature(ticket, timestamp, nonceStr) {
      let url = window.location.href.split('#')[0]
      let jsapi_ticket = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
      return CryptoJS.SHA1(jsapi_ticket).toString()
    },
  },
}
</script>

```
:::tip 参考
- [JS-SDK 使用说明](https://developer.work.weixin.qq.com/document/path/90547)
- [企业微信扫一扫](https://developer.work.weixin.qq.com/document/path/90525)
- [vue 使用企业微信扫一扫](https://blog.csdn.net/weixin_43972680/article/details/124633325?spm=1001.2014.3001.5501)
:::