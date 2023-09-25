# codesandbox

两种代码运行环境
- Browser Sandpack: 针对编译与执行都能在浏览器完成的纯前端项目
- Cloud Sandpack: 针对需要服务端运行环境的项目
  
这两种环境会体现为一个独立网站，这个网站会作为 iframe 嵌入在 codesandbox 编辑器的预览模块中。

预览模块通过定义好的通信协议与其他模块（比如代码编辑模块、控制台模块）通信。

对于Cloud Sandpack，会占用一定服务端资源。对于Browser Sandpack，则不会占用什么服务端资源，因为他大部分逻辑都是在前端执行的。


:::tip TODO
- [一文彻底搞懂前端沙箱](https://www.yuque.com/wangxiangzhong/mvugau/bgs3po)
- [搭建一个属于自己的在线 IDE ](https://github.com/mcuking/blog/issues/86)
- [CodeSandbox - 从入门到实现原理解析](https://www.yuque.com/wangxiangzhong/aob8up/yzg7mb)
:::