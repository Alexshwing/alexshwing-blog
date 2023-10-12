# 展开行表格

## 一. 基本结构
```vue
<template>
  <div class="container">
    <el-button type="primary"
      @click="printSelectedProductId"
      size="small">打印选中商品id</el-button>
    <el-button type="primary"
      @click="scrollToRow()"
      size="small">锚点到某一行</el-button>
    <el-table
      style="width: 100%"
      :data="tableData"
      ref="main"
      @select-all="mainSelectAll"
      @select="mainSelect"
      @expand-change="mainExpandChange"
      class="out-table">
      <el-table-column
        type="expand">
        <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
        <!-- @see https://element.eleme.cn/#/zh-CN/component/table 自定义列模板-->
        <template
          slot-scope="scope">
          <el-table
            :data="tableData[scope.$index].product"
            :ref="`sub${scope.$index}`"
            @select="subSelect"
            @select-all="(selection) => subSelectAll(selection, scope.row)">
            <el-table-column
              type="selection"
              width="50"></el-table-column>
            <el-table-column
              prop="name"
              label="商品名称"></el-table-column>
            <el-table-column
              prop="id"
              label="商品id"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"></el-table-column>

      <el-table-column
        prop="name"
        label="姓名"></el-table-column>
      <el-table-column
        prop="age"
        label="年龄"></el-table-column>
      <el-table-column
        prop="date"
        label="日期"></el-table-column>
    </el-table>
  </div>
</template>
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
  const expandTableList = this.getAllExpandTable('sub')
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
    const tableRef = this.$refs['main']
    // 获取所有表格行
    const allTableRows = Array.from(tableRef.$el.querySelectorAll('.el-table__row'))
    // 过滤掉`展开行内表格行`, 只保留`外层表格行`
    const outTableRows = allTableRows.filter((row) =>
      row.parentNode.parentNode.parentNode.parentNode.classList.contains('out-table')
    )
    this.$refs['main'].toggleRowExpansion(this.tableData[pos], true)
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
## 四、选择器父子联动
```vue
<script>
export default {
  methods: {
    // 外层全选
    async mainSelectAll(selection) {
      if (selection.length === 0) {
        this.$refs['main'].data.forEach(async (_, index) => {
          if (!!this.$refs[`sub${index}`]) {
            await this.$refs[`sub${index}`].clearSelection()
          }
          this.selectedRow.has(index) && this.selectedRow.delete(index)
        })
      } else {
        this.tableData.forEach(async (item) => {
          this.mainSelect(Array.of(item), item)
        })
      }
    },
    // 外层单选
    async mainSelect(selection, row) {
      const isSelected = selection.includes(row)
      const rowIndex = this.tableData.findIndex((item) => item.id === row.id)
      if (isSelected) {
        if (`sub${rowIndex}` in this.$refs && !!this.$refs[`sub${rowIndex}`]) {
          this.selectedRow.add(rowIndex)
          await this.$refs[`sub${rowIndex}`].toggleAllSelection()
        } else {
          this.selectedRow.add(rowIndex)
        }
      } else {
        if (`sub${rowIndex}` in this.$refs && !!this.$refs[`sub${rowIndex}`]) {
          this.selectedRow.has(rowIndex) && this.selectedRow.delete(rowIndex)
          await this.$refs[`sub${rowIndex}`].clearSelection()
        } else {
          this.selectedRow.has(rowIndex) && this.selectedRow.delete(rowIndex)
        }
      }
    },
    // 内层全选
    async subSelectAll(selection, faRow) {
      const faIndex = this.tableData.findIndex((item) => item.id === faRow.id)
      if (selection.length === 0) {
        this.selectedRow.has(faIndex) && this.selectedRow.delete(faIndex)

        await this.$refs['main'].toggleRowSelection(faRow, false)
      } else {
        this.selectedRow.add(faIndex)
        await this.$refs['main'].toggleRowSelection(faRow, true)
      }
    },
    // 内层单选
    async subSelect(selection, row) {
      this.$nextTick(async () => {
        const isSubSelected = selection.includes(row)
        const faIndex = this.tableData.findIndex((item) => item.id === row.pid)
        const faRow = this.tableData.find((item) => item.id === row.pid)
        if (isSubSelected) {
          const isFaSelectAll = this.$refs[`sub${faIndex}`].store.states.isAllSelected

          if (isFaSelectAll) {
            this.selectedRow.add(faIndex)
          }
          await this.$refs['main'].toggleRowSelection(faRow, isFaSelectAll)
        } else {
          this.selectedRow.has(faIndex) && this.selectedRow.delete(faIndex)
          await this.$refs['main'].toggleRowSelection(faRow, false)
        }
      })
    },
    // 外层展开行状态变化
    mainExpandChange(row, expandedRows) {
      const isExpanded = expandedRows.includes(row)
      if (isExpanded) {
        const rowIndex = this.tableData.findIndex((item) => item.id === row.id)
        if (this.selectedRow.has(rowIndex)) {
          const curIndexInTableData = this.tableData.findIndex((item) => item.id === row.id)

          this.$nextTick(() => {
            const children = this.tableData[curIndexInTableData].product
            children.forEach((child) => {
              this.$refs[`sub${curIndexInTableData}`].toggleRowSelection(child, true)
            })
          })
        }
      }
    },
  }
}
</script>
```