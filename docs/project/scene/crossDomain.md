# 跨域

跨域产生的原因是**浏览器同源策略**(两个 URL 的协议、端口和主机都相同的话, 则这两个 URL 是同源的)

## 一、JSONP 跨域
利用`<script>`标签没有跨域限制, 通过它的 src 属性, 发送带有 callback 参数的 GET 请求, 服务端将接口返回的数据拼凑到 callback 中, 返回给浏览器
```html
<script>
  var script = document.createElement("script")
  script.type = 'text/javascript'

  script.src = 'xx/login?callback=handleCallback'
  document.head.appendChild(script)

  function handleCallback(res) {
    alert(JSON.stringify(res))
  }
</script>
```
```js
handleCallback({"data": "alexshwing"})
```

> JSONP 缺点: 只能发送 GET 请求

## 二、CORS
CORS 是一种基于 HTTP 头的机制, 该机制通过允许服务器标识除了它自己以外的其他源(域、协议或端口), 使得浏览器允许这些源加载自己的资源

### 后端配置(Koa)
- 对于简单请求, 给接口设置响应头`Access-Control-Allow-Origin`为需要请求资源的域名
```js
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", '*')
  await next()
}
```
> 简单请求
>
> - 请求方法为 HEAD、GET 或 POST
> - HTTP headers 不超出以下字段:
>   - Accept
>   - Accept-Language
>   - Content-Language
>   - Content-Type 并且值是 `application/x-www-form-urlencoded`, `multipart/form-data`或`terxt/plain`

- 复杂请求

复杂请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求,该请求是 option 方法的，通过该请求来知道服务端是否允许跨域请求。
```js
app.use(async (ctx, next) => {
  // 简单和非简单请求都需要设置
  ctx.set('Access-Control-Allow-Origin', '*')
  // 非简单请求可能需要以下额外设置
  ctx.set(
    'Access-Control-Allow-headers',
    'Accept,Accept-Encoding,Accept-Language,Connection,Content-Length,Content-Type,Host,Origin,Referer,User-Agent'
  )
  ctx.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  )
  ctx.set('Access-Control-Allow-Credentials', true) // 允许携带 cookie
  if (ctx.method == 'OPTIONS') {
    ctx.status = 204
  } else {
    await next()
  }
})

```

## 三、Proxy
vue-cli 代理
```js
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint校验
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        // 以 `/api` 开头的路径
        target: 'http://127.0.0.1:3000', // 需要代理的目标地址
        changeOrigin: true, // 开启跨域代理
        pathRewrite: {
          '^/api': '/api', // 替换路径
        },
      },
    },
  },
})

```
```js
getUserInfo() {
  // 前端访问后端接口`http://127.0.0.1:3000/api/userinfo`
  axios('/api/userinfo').then((res) => {
    console.log(res.data)
  })
}
```

## 四、Nginx 反向代理

## 五、PossMessage
PostMessage 允许来自不同源的脚本采用异步方式进行有限通信, 可以跨文本档、多窗口、跨域信息传递

`http://localhost:3000/a.html`向`http://localhost:4000/b.html`通信

- a.html
```html
<iframe src="http://localhost:4000/b.html" frameborder="0" id="frame" onload="load()"></iframe>
<script>
  function load() {
    let frame = document.getElementId("frame")
    frame.contentWindow.postMessage("alexshwing", "http://localhost:4000")
    window.onmessage = function(e) {
      console.log(e.data)
    }
  }
</script>
```
- b.html
```js
window.onmessage = function(e) {
  console.log(e.data)
  e.source.postMessage("cc", e.origin)
}
```

## 六、websocket
使用`socket.io`
```html
<script>
  const socket = new WebSocket("ws://localhost:3000")
  socket.onopen = function() {
    socket.send("alexshwing")
  }
  socket.onmessage = function(e) {
    console.log(e.data)
  }
</script>
```
```js
const express = require("express")
cosnt app = express()
const WebSocket = require("ws")
const ws = new WebSocket.Server({ port: 3000 })
ws.on("connection", function(ws) {
  ws.on("message", function(data) {
    console.log(data)
    ws.send("cc")
  })
})
```
## 七、window.name + iframe
通过 iframe 的 src 属性由外域转向本地域，跨域数据即由 iframe 的window.name 从外域传递到本地域。

window.name属性的独特之处：name值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值(2 MB)

## 八、location.hash + iframe
三个页面，不同域之间利用 iframe 的 location.hash 传值，相同域之间直接 js 访问来通信。

## 九、document.domain + iframe
该方式只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式。 只需要给页面添加 document.domain ='test.com' 表示二级域名都相同就可以实现跨域。

实现原理：两个页面都通过js强制设置document.domain为基础主域，就实现了同域。

```html
<body>
  <iframe src="http://b.zf1.cn:3000/b.html" frameborder="0" onload="load()" id="frame"></iframe>
  <script>
    document.domain = 'zf1.cn'
    function load() {
      console.log(frame.contentWindow.a);
    }
  </script>
</body>
```
```html
<body>
   hellob
   <script>
     document.domain = 'zf1.cn'
     var a = 100;
   </script>
</body>
```

## 跨域请求如何携带 cookie

:::tip 参考
- [九种跨域方式实现原理（完整版）](https://juejin.cn/post/6844903767226351623#heading-18)
:::