# analyze
```js
const fs = require("fs")
const path = require("path")

// 当前依赖对应`package.json`
function getCurDependencyPackageJson(path) {
  return JSON.parse(fs.readFileSync(path))
}

/**
 * 获取以当前依赖为根的`依赖图`
 * @param {*} curPath 当前依赖`package.json`文件所在路径
 * @param {*} depth 深度
 */
function getDependencyTree(curPath, depth = Infinity) {
  const curDependencyPackageJson = getCurDependencyPackageJson(curPath)
  const { name, version, dependencies = {} } = curDependencyPackageJson
  const res = {
    name,
    version,
    children: []
  }
  if (depth === 0) {
    return res
  }
  if (!isEmptyObj(dependencies)) {
    const subDependencyList = Object.keys(dependencies)
    subDependencyList.forEach(dependencyName => {
      // 获取子依赖的`package.json`
      const childPath = path.join('./node_modules', dependencyName, 'package.json')
      const childRes = getDependencyTree(childPath, depth - 1)
      res.children.push(childRes)
    })
  }
  return res
} 
const res = getDependencyTree(path.join(__dirname, 'package.json'))
// 文件写入
fs.writeFile("./graph.json", JSON.stringify(res), err => {
  if (err) {
    console.error(err)
  }
  console.log("添加成功")
})

function isEmptyObj(obj) {
  for (const _ in obj) {
    return false
  }
  return true
}
```