# 展开行表格

## 一. 基本结构
```vue
<template>
  <div class="container">
    <el-button type="primary" @click="printSelectedProductId" size="small"
      >打印选中商品id</el-button
    >
    <el-button type="primary" @click="scrollToRow()" size="small"
      >锚点到某一行</el-button
    >
    <el-table
      style="width: 100%"
      :data="tableData"
      ref="table"
      class="out-table"
    >
      <el-table-column type="expand">
        <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
        <!-- @see https://element.eleme.cn/#/zh-CN/component/table 自定义列模板-->
        <template slot-scope="scope">
          <el-table
            :data="tableData[scope.$index].product"
            :ref="`expandTable${scope.$index}`"
          >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="id" label="商品id"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: 'alexshwing',
          age: 10,
          date: '2016-05-02',
          product: [
            { name: 'apple', id: 0 },
            { name: 'banana', id: 1 },
          ],
        },
        {
          name: 'tom',
          age: 19,
          date: '2016-05-03',
          product: [
            { name: 'orange', id: 3 },
            { name: 'pineapple', id: 4 },
            { name: 'pear', id: 5 },
          ],
        },
        {
          name: 'jack',
          product: [
            { name: 'apple', id: 6 },
            { name: 'banana', id: 7 },
          ],
        },
        {
          name: 'mike',
          product: [
            { name: 'apple', id: 8 },
            { name: 'banana', id: 9 },
          ],
        },
        {
          name: 'luke',
          product: [
            { name: 'apple', id: 10 },
            { name: 'banana', id: 11 },
          ],
        },
        {
          name: 'rose',
          product: [
            { name: 'apple', id: 12 },
            { name: 'banana', id: 13 },
          ],
        },
        {
          name: 'jerry',
          product: [
            { name: 'apple', id: 14 },
            { name: 'banana', id: 15 },
          ],
        },
        {
          name: 'roy',
          product: [
            { name: 'apple', id: 16 },
            { name: 'banana', id: 17 },
          ],
        },
        {
          name: 'james',
          product: [
            { name: 'apple', id: 18 },
            { name: 'banana', id: 19 },
          ],
        },
        {
          name: 'anthony',
          product: [
            { name: 'apple', id: 20 },
            { name: 'banana', id: 21 },
          ],
        },
      ],
    }
  },
}
</script>

```
## 二. 获取展开行内选中项
```javascript
/**
 * 获取所有展开行内的表格
 * ! 添加`!!this.$refs[key]`原因
 * ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。
 * 如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素，如果用在子组件上，引用就指向组件实例。
 * expandTable 从展开变为隐藏, ref会取到undifined
 * @param {*} tableName - 展开行表格名称前缀
 * @return {*} 所有展开行表格ref
 */
function getAllExpandTable(tableName) {
  const expandTableKeys = Object.keys(this.$refs).filter(
    (key) => key.startsWith(tableName) && !!this.$refs[key]
  )
  return expandTableKeys.map((key) => this.$refs[key])
},
// 打印选中商品id
function printSelectedProductId() {
  const expandTableList = this.getAllExpandTable('expandTable')
  const selectedProductIdList = expandTableList.flatMap(
    ({ selection = [] }) => selection.map(({ id }) => id)
  )
  console.log(selectedProductIdList)
},
```
## 三. 锚点到某一行
```javascript
function scrollToRow(pos = 8) {
    // 获取最外层表格ref
    const tableRef = this.$refs.table
    // 获取所有表格行
    const allTableRows = Array.from(
      tableRef.$el.querySelectorAll('.el-table__row')
    )
    // 过滤掉`展开行内表格行`, 只保留`外层表格行`
    const outTableRows = allTableRows.filter((row) =>
      row.parentNode.parentNode.parentNode.parentNode.classList.contains(
        'out-table'
      )
    )
    this.$refs.table.toggleRowExpansion(this.tableData[pos], true)
    const el = outTableRows[pos]
    const rect = el.getBoundingClientRect()
    let top = rect.top
    // 卷起的高度
    const scrollTop =
      document.documentElement.scrollTop || //firefox
      document.body.scrollTop || //chrome
      window.pageYOffset //safari
    top += scrollTop

    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  },
```
