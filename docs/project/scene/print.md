# 打印

## 1. vue-print-nb
打印表格时可能会出现`数据列边框错位`( 详见 [思否提问](https://segmentfault.com/q/1010000043788627))
```shell
npm install vue-print-nb --save
```
```vue
<template>
  <div id="print">
    <el-button type="primary" v-print="printObj" class="no-print"
      >打印</el-button
    >
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
import print from 'vue-print-nb'
export default {
  directives: {
    print,
  },
  data() {
    return {
      tableData: [
        {
          address: '上海市普陀区金沙江路 1518 弄',
        },
      ],
      printObj: {
        id: 'print',
        popTitle: '打印', // 打印配置页上方标题
        extraHead: '', //最上方的头部文字，附加在head标签上的额外标签,使用逗号分隔
        preview: '', // 是否启动预览模式，默认是false（开启预览模式，可以先预览后打印）
        previewTitle: '', // 打印预览的标题（开启预览模式后出现）,
        previewPrintBtnLabel: '', // 打印预览的标题的下方按钮文本，点击可进入打印（开启预览模式后出现）
        zIndex: '', // 预览的窗口的z-index，默认是 20002（此值要高一些，这涉及到预览模式是否显示在最上面）
        previewBeforeOpenCallback: () => {}, //预览窗口打开之前的callback（开启预览模式调用）
        previewOpenCallback: () => {}, // 预览窗口打开之后的callback（开启预览模式调用）
        beforeOpenCallback: () => {}, // 开启打印前的回调事件
        openCallback: () => {}, // 调用打印之后的回调事件
        closeCallback: () => {}, //关闭打印的回调事件（无法确定点击的是确认还是取消）
        url: '',
        standard: '',
        extraCss: '',
      },
    }
  },
}
</script>
<style lang="scss" scoped>
@page {
  size: auto;
  margin: 3mm;
}
.el-table {
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  margin: 0 auto;
}
::v-deep.el-table th {
  border: 1px solid black !important;
  border-right: none !important;
  border-bottom: none !important;
}

::v-deep.el-table td {
  border: 1px solid black;
  border-right: none !important;
}
@media print {
  ::v-deep table {
    table-layout: auto !important;
  }
  ::v-deep .el-table__header-wrapper .el-table__header {
    width: 100% !important;
  }
  ::v-deep .el-table__body-wrapper .el-table__body {
    width: 100% !important;
  }
  ::v-deep #print table {
    table-layout: fixed !important;
  }

  ::v-deep .el-table__fixed {
    display: none;
  }
  ::v-deep .el-table .el-table__cell.is-hidden > * {
    visibility: visible;
    font-size: 12px;
  }

  ::v-deep .el-table--border {
    border: none;
    .el-table__cell {
      border-right: 0;
    }
  }
  .el-table {
    border: 1px solid black !important;
  }
  ::v-deep.el-table th {
    border: 1px solid black !important;
    border-right: none !important;
    border-bottom: none !important;
  }

  ::v-deep.el-table td {
    border: 1px solid black !important;
    border-right: none !important;
  }

  .no-print {
    display: none;
  }
}
</style>
```

## 2. print-js
采用`html2Canvas`结合`print-js`解决`打印错位`问题, 但是滚动条内隐藏部分无法显示
- print.js
```javascript
//html转图片打印（解决element table打印不全的问题）
import html2canvas from "html2canvas";
import printJS from "print-js";

/**
 * html转图片
 * @param printContent
 * @param callback
 */
export const html2Canvas = (printContent, callback) => {
    // 获取dom 宽度 高度
    const width = printContent.clientWidth;
    const height = printContent.clientHeight;
    // 创建一个canvas节点
    const canvas = document.createElement("canvas");

    const scale = 4; // 定义任意放大倍数，支持小数；越大，图片清晰度越高，生成图片越慢。
    canvas.width = width * scale; // 定义canvas 宽度 * 缩放
    canvas.height = height * scale; // 定义canvas高度 *缩放
    canvas.style.width = width * scale + "px";
    canvas.style.height = height * scale + "px";
    canvas.getContext("2d").scale(scale, scale); // 获取context,设置scale

    const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; // 获取滚动轴滚动的长度
    const scrollLeft =
        document.documentElement.scrollLeft || document.body.scrollLeft; // 获取水平滚动轴的长度

    html2canvas(printContent, {
        canvas,
        backgroundColor: null,
        useCORS: true,
        windowHeight: document.body.scrollHeight,
        scrollX: -scrollLeft, // 解决水平偏移问题，防止打印的内容不全
        scrollY: -scrollTop
    })
        .then(canvas => {
            const url = canvas.toDataURL("image/png");
            callback({ url: url });
        })
        .catch(err => {
            console.error(err);
        });
};

/**
 * 用printJs打印图片
 * @param url
 * @param callback
 */
export const printImg = (url) => {

    printJS({
        printable: url,
        type: 'image',
        scanStyles: false,
        style: "@page{size:auto;margin: 1cm ;}", // 去除页眉页脚
        targetStyles: ['*'],
    });
};

/**
 * html转图片打印
 * @param dom
 * @param callback
 */
export const html2CanvasPrint = (dom, callback) => {
    //1、html转图片
    html2Canvas(dom, canvasRes => {
        //2、打印图片
        printImg(canvasRes.url, callback);
    });
};

```
- About.vue
```vue
<template>
  <div ref="printDom">
    <el-button type="primary" @click="handlePrint" ref="noPrintBtn"
      >打印</el-button
    >
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="address" label="地址" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { html2Canvas, printImg } from '../utils/print'
export default {
  data() {
    return {
      tableData: [
        {
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          address: '上海市普陀区金沙江路 1518 弄',
        },
      ],
    }
  },
  methods: {
    // 打印
    handlePrint() {
      this.$refs.noPrintBtn.$el.style.display = 'none'
      html2Canvas(this.$refs.printDom, (res) => {
        this.printDomUrl = res.url
        printImg(res.url, () => {})
      })
      this.$refs.noPrintBtn.$el.style.display = 'block'
    },
  },
}
</script>

<style lang="scss" scoped>
.el-table {
  border: 1px solid #2b2b2b;
  margin: 0 auto;
}
::v-deep.el-table th {
  border: 1px solid #2b2b2b !important;
}
::v-deep.el-table td {
  border: 1px solid #2b2b2b;
}
</style>

```

## 3.原生`html`重写打印页面
```js
/**
 * 使用`原生html`打印页面(表格、表单、描述列表)
 * ! 解决 滚动条隐藏内容未显示、换页表格项被截断、列边框错位问题
 * @param {String} title 标题
 * @param {Object} tableOptions 表格配置项(包括 tableData 表格数据、tableCol 表格展示项)
 * @param {Object} descriptionsOptions 描述列表配置项(包括 descriptionsData 描述列表数据、descriptionsCol 描述列表展示项)
 * @param {Object} formOptions 表单配置项(包括 formData 表单数据、 formCol 表单展示项)
 * @return {*} 打印页面
 */
function print(title, tableOptions = {}, descriptionsOptions = {}, formOptions = {}) {
  const iframe = document.createElement("IFRAME")
  iframe.setAttribute("id", "myIframe")
  iframe.setAttribute("style", 'position:absolute;width:0px;height:0px;left:-500px;top:-500px')
  document.body.append(iframe)
  const doc = iframe.contentWindow.document

  const _title = title || ''
  doc.write(`
    <style media="print">
      @page {
        size:landscape;
        margin-top: 30px;
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 20px;        
      }
      .title-text {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
  `)
  doc.write(`<div class="title-text">${_title}</div>`)

  !isEmptyObject(descriptionsOptions) && PrintDescriptions(descriptionsOptions, doc)

  !isEmptyObject(tableOptions) && PrintTable(tableOptions, doc)

  !isEmptyObject(formOptions) && PrintForm(formOptions, doc)

  doc.close()
  iframe.contentWindow.focus()
  iframe.contentWindow.print()
  if (navigator.userAgent.indexOf("MSIE") > 0) {
    document.body.removeChild(iframe)
  }
}


function PrintTable(options, doc) {
  if (!(this instanceof PrintTable)) return new PrintTable(options, doc);
  const tableStyle = this.getTableStyle()
  const tableHtml = this.getTableHtml(options)
  doc.write(tableStyle)
  doc.write(tableHtml)  
}
PrintTable.prototype = {
  getTableStyle: function () {
    return `
      <style media="print"> 
        table {
            border: 1px solid #DFE5EE;
            margin-top: 200px;
            border-spacing: 0;/*去掉单元格间隙*/
            table-layout: fixed; /* 固定表格布局 */
            width: 100%; /* 设置表格宽度 */
        }
        table:first-of-type {
            margin-top: 0px ;
        }
        table thead th{
            border: 1px solid #DFE5EE;
            text-align:center;
            font-size:12px;
            font-weight: normal;
            color: #606266;
            border-collapse:collapse;
            width: auto; /* 取消宽度设置 */
        }
        table tbody td{
            border: 1px solid #DFE5EE;
            text-align:center;
            font-size:12px;
            font-weight: normal;
            color: #606266;
            height: 47px;
            word-wrap: break-word; /* 当单词超出容器宽度时自动换行 */
            white-space: normal; /* 允许内容自动换行 */
        }
        tr {
          page-break-inside: avoid;
        }
      </style>`
  },
  getTableHtml: function (options) {
    const {tableData, tableCol} = options
    const head = `
        <thead>
          <tr>
            ${tableCol.reduce((prev, cur) => prev + `<th>${cur.label}</th>`, '')}
          </tr>
        </thead>
    `
    const body =  `
        <tbody>
          ${tableData.reduce((prev, cur) => prev + `<tr>${tableCol.reduce((p, c) => p + `<td>${cur[c.prop] || ''}`, '')}</tr>`, '')}
        </tbody>
    `
    return `
      <table>
        ${head}
        ${body}
      </table>
    `
  }
}

function PrintForm(options, doc, isForm = true) {
  if (!(this instanceof PrintForm)) return new PrintForm(options, doc, isForm);
  const FormStyle = this.getFormStyle()
  const FormHtml = this.getFormHtml(options, isForm)
  doc.write(FormStyle)
  doc.write(FormHtml)
}
PrintForm.prototype = {
  getFormStyle: function() {
    return `
      <style media="print">
        table {
          border: 1px solid #DFE5EE;
          border-spacing: 0;/*去掉单元格间隙*/
          table-layout: fixed; /* 固定表格布局 */
          width: 100%; /* 设置表格宽度 */
          display: table;
          text-indent: initial;
          border-spacing: 2px;
          border-color: gray;
          border-collapse: collapse;
        }
        .table-col {
          padding: 10px;
          border: 1px solid #e6ebf5;
          box-sizing: border-box;
          text-align:center;
          font-weight: normal;
          line-height: 1.5;
          color: #909399;
          font-size: 15px !important;
        }
      </style>`
  },
  getFormHtml: function(options, isForm) {
    const {formData, formCol} = options
    const n = formCol.length
    const colspan = isForm ? 2 : 1
    const colNum = isForm ? 2 : 3
    const row = Math.floor(n / colNum)
    const rem = n % colNum
    let table = `<div><table><tbody>`
  
    for (let i = 0; i < row; i ++ ) {
      let tr = `<tr>`
      for (let j = 0; j < colNum; j ++ ) {
        tr += `<th colspan="1" class="table-col">${formCol[i*colNum+j].label || ''}</th>
        <td colspan="${colspan}" class="table-col">${formData[formCol[i*colNum+j].value] || ''}</td>`
      }
      tr += `</tr>`
      table += tr
    }
  
    // 最后一行没占满
    if (rem !== 0) {
      let tr = `<tr>`
      for (let j = 0; j < rem; j ++ ) {
          tr += `<th colspan="1" class="table-col">${formCol[row*colNum+j].label || ''}</th>
          <td colspan="${colspan}" class="table-col">${formData[formCol[row*colNum+j].value] || ''}</td>`
        }
      for (let j = 0; j < colNum - rem; j ++ ) {
        tr += `<th colspan="1" class="table-col"></th>
              <td colspan="${colspan}" class="table-col"></td>`
      }
      tr += `</tr>`
      table += tr
    }
  
    table += `</tbody></table></div>`
    return table
  }
}

function PrintDescriptions(options, doc) {
  const {descriptionsData, descriptionsCol} = options
  PrintForm({
    formData: descriptionsData,
    formCol: descriptionsCol
  }, doc, false)
}

function isEmptyObject(obj) {
  for (const _ in obj) {
    return false
  }
  return true
}

const Print = {
  install(Vue) {
    Vue.prototype.$print = print
  }
}
export default Print
```
- main.js 注册插件
```js
import Print from './plugins/print' 
Vue.use(Print)
```
- 组件中使用
```js
this.$print('alexshwing', {
  tableData: this.tableData,
  tableCol: this.tableCol,
})
```