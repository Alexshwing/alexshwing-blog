# 选择集

## 一、选择元素
1. d3.select: 选中第一个符合条件的元素 
2. d3.selectAll: 选中所有符合条件的元素   

## 二、修改元素
1. attr(name[, value]): 属性值
2. selction.classed(name[, value]): 类名
3. style(name[, value[, priority]]): 样式
4. property(name[, value]): 特殊属性(如文本域的 value 属性以及 checkbox 的 checked 属性)                           
5. text([value]): 文本                                                                                   
6. html([value]): inner HTML                                                                             
7. append(type): 追加元素(指定的 type 为字符串则创建一个以此字符串为标签名的元素追加到选择集元素列表中) 
8. insert(type[, before]): 插入元素                                                                               
9. remove(): 从当前文档中移除选中元素                                                               
10. clone([deep]): 在所选元素之后插入所选元素的克隆，并返回包含新添加的克隆元素的选择集                   
11. sort(compare): 排序                                                                                   
12. raise(): 按序重新插入每个选中的元素，每次插入的元素都作为其父元素的最后一个子元素               

## 三、Joining Data
### data([data[, key]])

- 将指定数组的数据 data 与已经选中的元素进行绑定并返回一个新的数据集, 
- 返回的数据集使用 update 表示: 此时数据已经成功的与元素绑定。并且定义了 enter 和 exit 方法用来返回需要加入元素和移除元素的选择集
- key 函数通过计算每个数据与元素的字符串标识来控制哪一个数据与哪一个元素绑定, 替代默认的按索引绑定的方式。
```html
<div id="Ford"></div>
<div id="Jarrah"></div>
<div id="Kwon"></div>
<div id="Locke"></div>
<div id="Reyes"></div>
<div id="Shephard"></div>
```
```js
var data = [
  {name: "Locke", number: 4},
  {name: "Reyes", number: 8},
  {name: "Ford", number: 15},
  {name: "Jarrah", number: 16},
  {name: "Shephard", number: 31},
  {name: "Kwon", number: 34}
];

d3.selectAll("div")
  .data(data, function(d) { return d ? d.name : this.id; })
    .text(function(d) { return d.number; });
```

### enter()
- 返回 enter 选择集: 没有对应 DOM 节点的数据的占位节点
- enter 选择集通常在数据比节点多时用来创建缺失的节点
```js
var div = d3.select("body")
  .selectAll("div")
  .data([4, 8, 15, 16, 23, 42])
  .enter().append("div")
    .text(function(d) { return d; });
```
- 如果 body 初始为空，则上述代码会创建 6 个新的 DIV 元素并依次添加到 body 中，并且将其文本内容设置为对应的数值:
```html
<div>4</div>
<div>8</div>
<div>15</div>
<div>16</div>
<div>23</div>
<div>42</div>
```
- 从概念上来讲，enter 选择集的占位符是一个指向父元素的指针(上述例子中为 body)。enter 选择集通常仅仅用来添加元素，并且在添加完元素之后与 update 选择集进行 merged, 这样的话数据的修改可以同时应用于 enter 的元素和 update 的元素。

### exit()
- 返回 exit 选择集: 没有对应数据的已经存在的 DOM 节点
- exit 选择集通常用来移除多余的元素

```js
var div = d3.select("body")
  .selectAll("div")
  .data([4, 8, 15, 16, 23, 42])
  .enter().append("div")
    .text(function(d) { return d; });
// 更新 div
div = div.data([1, 2, 4, 8, 16, 32], d => d) // update [4, 8, 16]
div.enter().append('div').text(d => d) // enter 添加 [1, 2, 32]

div.exit().remove() // remove [15, 23, 42]
```

### datunm([value])
- 获取或设置**每个选中元素**上绑定的数据
```html
<ul id="list">
  <li data-username="shawnbot">Shawn Allen</li>
  <li data-username="mbostock">Mike Bostock</li>
</ul>
```
- 可以通过将每个元素绑定的数据设置为其 dataset 属性:
```js
selection.datum(function() { return this.dataset; })
```

## 四、事件
为了交互, 选择集允许监听和分配事件
1. selection.on(typenames[, listener[, capture]])
- 给每个选中元素添加或移除一个指定 typenames 时间的 listener
- typenames 是一个字符串表示的事件类型, 浏览器支持的 DOM event type都可使用
- 移除事件监听器, listener 设置为 null
- 可选的 capture 标志位与 W3C 的 useCapture flag 对应: "启动捕获后, 所有的指定类型的事件将会被分发给指定的 EventListener 然后被分派到树中任何 EventTargets. 向上冒泡的事件不会触发指定使用捕获的 EventListener."

2. selection.dispatch(type[, parameters])
- 为每个选中元素根据指定的 type 按序派发一个 custom event , 可以指定一个可选的 parameters 映射来设置事件的附加属性
  
3. d3.event
- 当前 event (如果存在的话)。这个值在调用事件监听器时设置的，并且在监听器执行结束之后重置。

## 五、控制流
更高阶的应用就是选择集提供定制化的控制流
1. selection.each(function)
- 为每个选中元素依次调用指定的 function, 并传递当前元素绑定的数据 d , 当前索引 i 以及当前分组 nodes
- 在同一个作用域中同时访问父节点和子节点数据时很有用
```js
parent.each(function(p, j) {
  d3.select(this)
    .selectAll(".child")
      .text(function(d, i) { return "child " + d.name + " of " + p.name; });
});
```
2. selection.call(function[, arguments...])
调用一次指定的 function，并为将当前选择集作为第一个参数，此外还可以使用可选的其他参数。

3. selection.empty()
- 当且仅当当前选择集中没有任何元素时返回 true.
4. selection.nodes() 
- 返回选择集中被选中元素的元素数组。
5. selection.node() 
- 返回选择集中第一个非空元素。如果选择集为空则返回 null。
6. selection.size()
- 返回选择集中包含的元素个数。
## 六、Local Variables
## 七、Namespaces

:::tip 来源
[d3-selection](https://github.com/xswei/d3-selection/blob/master/README.md#d3-selection)
:::