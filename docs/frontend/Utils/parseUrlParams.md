# 解析 URL
```js
const url = 'http://www.getui.com?user=superman&id=345&id=678&city=%E6%9D%AD%E5%B7%9E&enabled'
function parseUrlParams() {
    const [href, params] = url.split("?")
    const res = {}
    params && params.split("&").map(item => {
        let [key, value = true] = item.split("=")
        value = typeof value === 'boolean' ? value : decodeURIComponent(value) // 转中文
        if (!res[key]) {
            res[key] = value
        } else {
            if (Array.isArray(res[key])) {
                res[key].push(value)
            } else {
                res[key] = [res[key], value]
            }
        }
    })
    return res
}
console.log(parseUrlParams(url)) // {user: 'superman', id: Array(2), city: '杭州', enabled: true}
```