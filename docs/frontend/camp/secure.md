# Web 开发的安全之旅

## 一、攻击篇
### 1. Cross-Site Scripting(XSS)
- 盲目信任用户提交的内容
```js
// string -> DOM
docuemnt.write
element.innerHTML = anyString
SSR(user_data) // 伪代码
```
- 通常难以从 UI 感知(暗地执行脚本)
- 窃取用户信息(cookie/token)
- 绘制 UI (例如弹窗), 诱骗用户点击/填写表单
#### Stored XSS
- 恶意脚本被存在于数据库中
- 访问页面: 读数据 -> 被攻击
- 危害最大, 对全部用户可见
#### Reflected XSS
- 不涉及数据库
- 从 URL 上攻击
#### DOM-based XSS
- 不需要服务器参与
- 恶意攻击的发起 + 执行, 全在浏览器完成
#### Mutation-based XSS
- 利用浏览器渲染 DOM 的特性(独特优化)
- 不同浏览器, 会有区别(按浏览器进行攻击)

### 2. Cross-site request forgery(CSRF)
- 在用户不知情的前提下
- 利用用户权限(cookie)
- 构造指定 HTTP 请求, 窃取或修改用户敏感信息

### 3. SQL Injection
- 请求 SQL 参数(恶意注入)
- Server
  - 参数 -> SQL 
  - 运行 SQL code
- 获取其他数据、修改数据、删除数据
- Injection 不止于 SQL
  - CLI
  - OS command
  - Server-Side Request Forgery(SSRF), 服务端伪造请求
    - 严格而言, SSRF 不是 injection, 但是原理类似
  
### 4. Denial of Service(Dos)
通过某种方式(构造特定请求), 导致服务器资源被显著消耗, 来不及响应更多请求, 导致请求挤压, 进而雪崩效应

#### ReDos 基于正则表达式的 DoS
#### Logical DoS
- 耗时的同步操作
- 数据库写入
- SQL join
- 文件备份
- 循环执行逻辑
### 5. Distributed Dos(DDoS)
短时间内, 来自大量僵尸设备的请求流量, 服务器不能及时完成全部请求, 导致请求堆积, 进而雪崩效应, 无法响应新请求
- 攻击特点
  - 直接访问 API
  - 任意 API
  - 消耗大量带宽(耗尽)

### 6. 中间人攻击
- 明文传输
- 信息纂改不可知
- 对方身份未验证

## 二、防御篇
## 1. XSS
- 永远不信任用户的提交内容
  - 不要将用户提交内容直接转换为 DOM
- 现成工具
  - 前端
    - 主流框架默认防御 XSS
    - google-closure-library
  - 服务端(Node)
    - DOMPurify
- Content Security Policy(CSP)
  - 哪些源 (域名) 被认为是安全的
  - 来自安全源的脚本可以执行, 否则直接抛错
  - 对 eval + inline script 说 no
## 2. CSRF
- if 伪造请求 => 异常来源
- then 限制请求来源 => 限制伪造请求
- 请求头部
  - Origin 
    - 同源请求中, GET + HEAD 不发送
  - Referer
- Token
- Iframe 攻击: `X-Frame-Options: DENY/SAMEORIGIN`
- 避免用户信息被携带: SameSite Cookie

### 3. Injection
- 找到项目中查询 SQL 地方
- 使用 prepared statement
- 最小权限原则
  - 禁止 sudo || root
- 建立允许名单 + 过滤
  - 禁止 rm
- 对 URL 类型参数进行协议、域名、ip等限制
  - 禁止访问内网

### 4. Dos
- Code Review
  - `/(ab*)+/` (x)
- 代码扫描 + 正则性能测试
- 禁止用户提供正则

### 5. DDos
- 流量治理
  - 负载均衡
  - API 网关
  - CDN
- 快速自动扩容
- 非核心服务降级

### 6. 中间人
- HTTPS
  - 可靠性: 加密
  - 完整性: MAC 验证
  - 不可抵抗性: 数字签名


## 三、推荐读物
- [Web Application Security: Exploitation and Countermeasures for Modern Web Applications](https://www.amazon.com/Web-Application-Security-Exploitation-Countermeasures/dp/1492053112/ref=sr_1_3?crid=3KZBER4W7Z6JF&dchild=1&keywords=web+security&qid=1627822659&sprefix=web+secu%2Caps%2C360&sr=8-3)
- [SameSite 那些事](https://imnerd.org/samesite.html)
- [关于 Web 安全突然想到的](https://github.com/AngusFu/diary/issues/32)
- [什么是 DDoS 攻击？](https://aws.amazon.com/cn/shield/ddos-attack-protection/)