# 如何写好 JavaScript

## 一、各司其责
### 控制网页深浅浏览模式
1. 版本1
```js
const btn = document.getElementById('modeBtn');
btn.addEventListener('click', (e) => {
  const body = document.body;
  if(e.target.innerHTML === '🌞') {
    body.style.backgroundColor = 'black';
    body.style.color = 'white';
    e.target.innerHTML = '🌜';
  } else {
    body.style.backgroundColor = 'white';
    body.style.color = 'black';
    e.target.innerHTML = '🌞';
  }
});
```
2. 版本2
```js
const btn = document.getElementById('modeBtn');
btn.addEventListener('click', (e) => {
  const body = document.body;
  if(body.className !== 'night') {
    body.className = 'night';
  } else {
    body.className = '';
  }
});
```
3. 版本3
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>深夜食堂</title>
</head>
<body>
  <input id="modeCheckBox" type="checkbox">
  <div class="content">
    <header>
      <label id="modeBtn" for="modeCheckBox"></label>
      <h1>深夜食堂</h1>
    </header>
    <main>
      <div class="pic">
        <img src="https://p2.ssl.qhimg.com/t0120cc20854dc91c1e.jpg">
      </div>
      <div class="description">
        <p>
            这是一间营业时间从午夜十二点到早上七点的特殊食堂。这里的老板，不太爱说话，却总叫人吃得热泪盈
            眶。在这里，自卑的舞蹈演员偶遇隐退多年舞界前辈，前辈不惜讲述自己不堪回首的经历不断鼓舞年轻人，最终令其重拾自信；轻言绝交的闺蜜因为吃到共同喜爱的美食，回忆起从前的友谊，重归于好；乐观的绝症患者遇到同命相连的女孩，两人相爱并相互给予力量，陪伴彼此完美地走过了最后一程；一味追求事业成功的白领，在这里结交了真正暖心的朋友，发现真情比成功更有意义。食物、故事、真情，汇聚了整部剧的主题，教会人们坦然面对得失，对生活充满期许和热情。每一个故事背后都饱含深情，情节跌宕起伏，令人流连忘返 [6]  。
        </p>
      </div>
    </main>
  </div>
</body>
</html>
```
```css
body, html {
  width: 100%;
  height: 100%;
  max-width: 600px;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

body {
  box-sizing: border-box;
}

.content {
  padding: 10px;
  transition: background-color 1s, color 1s;
}

div.pic img {
  width: 100%;
}

#modeCheckBox {
  display: none;
}

#modeCheckBox:checked + .content {
  background-color: black;
  color: white;
  transition: all 1s;
}

#modeBtn {
  font-size: 2rem;
  float: right;
}

#modeBtn::after {
  content: '🌞';
}

#modeCheckBox:checked + .content #modeBtn::after {
  content: '🌜';
}
```
- HTML/CSS/JS 各司其责
- 应当避免不必要的由 JS 直接操作样式
- 可以用 class 来表示状态
- 纯展示类交互寻求零 JS 方案

## 二、组件封装
### 电商网站轮播图  
1. 版本一
- HTML

轮播图是一个典型的列表结构, 我们可以使用无序列表`<ul>`元素来实现
```html
<div id="my-slider" class="slider-list">
  <ul>
    <li class="slider-list__item--selected">
      <img src="https://p5.ssl.qhimg.com/t0119c74624763dd070.png"/>
    </li>
    <li class="slider-list__item">
      <img src="https://p4.ssl.qhimg.com/t01adbe3351db853eb3.jpg"/>
    </li>
    <li class="slider-list__item">
      <img src="https://p2.ssl.qhimg.com/t01645cd5ba0c3b60cb.jpg"/>
    </li>
    <li class="slider-list__item">
      <img src="https://p4.ssl.qhimg.com/t01331ac159b58f5478.jpg"/>
    </li>
  </ul>
</div>
```
- CSS
  - 使用 CSS 绝对定位来将图片重叠在同一个位置
  - 轮播图切换的状态使用修饰符 (modifiler)
  - 轮播图的切换动画使用 CSS transition
```css
#my-slider{
  position: relative;
  width: 790px;
}

.slider-list ul{
  list-style-type:none;
  position: relative;
  padding: 0;
  margin: 0;
}

.slider-list__item,
.slider-list__item--selected{
  /* 这里使用绝对定位，可以将多张图片重叠在一起，当然要记得给父盒子开相对定位 */
  position: absolute;
  transition: opacity 1s;
  opacity: 0;
  text-align: center;
}

.slider-list__item--selected{
  transition: opacity 1s;
  opacity: 1;
}
```
- JS
  - API 设计应保证原子操作, 职责单一, 满足灵活性
```js
// 创建一个Slider类，封装一些API
class Slider{
  constructor(id){
    this.container = document.getElementById(id);
    this.items = this.container
    .querySelectorAll('.slider-list__item, .slider-list__item--selected');
  }
  
  // 获取选中的图片元素：通过选择器`.slider__item--selected`获得被选中的元素
  getSelectedItem(){
    const selected = this.container
      .querySelector('.slider-list__item--selected');
    return selected
  }
  
  // 获取选中图片的索引值：返回选中的元素在items数组中的位置。
  getSelectedItemIndex(){
    return Array.from(this.items).indexOf(this.getSelectedItem());
  }
  
  // 跳转到指定索引的图片
  slideTo(idx){
    const selected = this.getSelectedItem();
    if(selected){ 
      // 将之前选择的图片标记为普通状态
      selected.className = 'slider-list__item';
    }
    const item = this.items[idx];
    if(item){
      // 将当前选中的图片标记为选中状态
      item.className = 'slider-list__item--selected';
    }
  }
  
  // 跳转到下一索引的图片：将下一张图片标记为选中状态
  slideNext(){
    const currentIdx = this.getSelectedItemIndex();
    const nextIdx = (currentIdx + 1) % this.items.length;
    this.slideTo(nextIdx);
  }
  
  // 跳转到上一索引的图片：将上一张图片标记为选中状态
  slidePrevious(){
    const currentIdx = this.getSelectedItemIndex();
    const previousIdx = (this.items.length + currentIdx - 1) % this.items.length;
    this.slideTo(previousIdx);  
  }
}

```
2. 控制流交互版
- HTML
```html
<div id="my-slider" class="slider-list">
  <ul>
    <li class="slider-list__item--selected">
      <img src="https://p5.ssl.qhimg.com/t0119c74624763dd070.png"/>
    </li>
    <li class="slider-list__item">
      <img src="https://p4.ssl.qhimg.com/t01adbe3351db853eb3.jpg"/>
    </li>
    <li class="slider-list__item">
      <img src="https://p2.ssl.qhimg.com/t01645cd5ba0c3b60cb.jpg"/>
    </li>
    <li class="slider-list__item">
      <img src="https://p4.ssl.qhimg.com/t01331ac159b58f5478.jpg"/>
    </li>
  </ul>
  <a class="slide-list__next"></a>
  <a class="slide-list__previous"></a>
  <div class="slide-list__control">
    <span class="slide-list__control-buttons--selected"></span>
    <span class="slide-list__control-buttons"></span>
    <span class="slide-list__control-buttons"></span>
    <span class="slide-list__control-buttons"></span>
  </div>
</div>

```
- CSS
```css
#my-slider{
  position: relative;
  width: 790px;
  height: 340px;
}

.slider-list ul{
  list-style-type:none;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.slider-list__item,
.slider-list__item--selected{
  position: absolute;
  transition: opacity 1s;
  opacity: 0;
  text-align: center;
}

.slider-list__item--selected{
  transition: opacity 1s;
  opacity: 1;
}

.slide-list__control{
  position: relative;
  display: table;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 5px;
  border-radius: 12px;
  bottom: 30px;
  margin: auto;
}

.slide-list__next,
.slide-list__previous{
  display: inline-block;
  position: absolute;
  top: 50%; /*定位在录播图组件的纵向中间的位置*/
  margin-top: -25px;
  width: 30px;
  height:50px;
  text-align: center;
  font-size: 24px;
  line-height: 50px;
  overflow: hidden;
  border: none;
  background: transparent;
  color: white;
  background: rgba(0,0,0,0.2); /*设置为半透明*/
  cursor: pointer; /*设置鼠标移动到这个元素时显示为手指状*/
  opacity: 0; /*初始状态为透明*/
  transition: opacity .5s; /*设置透明度变化的动画，时间为.5秒*/
}

.slide-list__previous {
  left: 0; /*定位在slider元素的最左边*/
}

.slide-list__next {
  right: 0; /*定位在slider元素的最右边*/
}

#my-slider:hover .slide-list__previous {
  opacity: 1;
}


#my-slider:hover .slide-list__next {
  opacity: 1;
}

.slide-list__previous:after {
  content: '<';
}

.slide-list__next:after {
  content: '>';
}

/*下面是四个小圆点的样式，其实通过这种BEM命名规则你也能看出来*/
.slide-list__control-buttons,
.slide-list__control-buttons--selected{
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 0 5px;
  background-color: white;
  cursor: pointer; /*设置鼠标移动到这个元素时显示为手指状*/
}
/*当选择后，小圆点的颜色变成红色*/
.slide-list__control-buttons--selected {
  background-color: red;
}

```
- JS
```js
class Slider{
  constructor(id, cycle = 3000){
  
    this.container = document.getElementById(id);
    this.items = this.container.querySelectorAll('.slider-list__item, .slider-list__item--selected');
    this.cycle = cycle;

    const controller = this.container.querySelector('.slide-list__control');
    if(controller){
      const buttons = controller.querySelectorAll('.slide-list__control-buttons, .slide-list__control-buttons--selected');
      
      // 鼠标经过某个小圆点，就将此圆点对应的图片显示出来，并且停止循环轮播
      controller.addEventListener('mouseover', evt=>{
        const idx = Array.from(buttons).indexOf(evt.target);
        if(idx >= 0){
          this.slideTo(idx);
          this.stop();
        }
      });
      
      // 鼠标移开小圆点，就继续开始循环轮播
      controller.addEventListener('mouseout', evt=>{
        this.start();
      });
      
      // 注册slide事件，将选中的图片和小圆点设置为selected状态
      this.container.addEventListener('slide', evt => {
        const idx = evt.detail.index
        const selected = controller.querySelector('.slide-list__control-buttons--selected');
        if(selected) selected.className = 'slide-list__control-buttons';
        buttons[idx].className = 'slide-list__control-buttons--selected';
      })
    }
    
    // 点击左边小箭头，翻到前一页
    const previous = this.container.querySelector('.slide-list__previous');
    if(previous){
      previous.addEventListener('click', evt => {
        this.stop();
        this.slidePrevious();
        this.start();
        evt.preventDefault();
      });
    }
    // 点击右边小箭头，翻到后一页
    const next = this.container.querySelector('.slide-list__next');
    if(next){
      next.addEventListener('click', evt => {
        this.stop();
        this.slideNext();
        this.start();
        evt.preventDefault();
      });
    }
  }
  getSelectedItem(){
    let selected = this.container.querySelector('.slider-list__item--selected');
    return selected
  }
  getSelectedItemIndex(){
    return Array.from(this.items).indexOf(this.getSelectedItem());
  }
  slideTo(idx){
    let selected = this.getSelectedItem();
    if(selected){ 
      selected.className = 'slider-list__item';
    }
    let item = this.items[idx];
    if(item){
      item.className = 'slider-list__item--selected';
    }
  
    const detail = {index: idx}
    const event = new CustomEvent('slide', {bubbles:true, detail})
    this.container.dispatchEvent(event)
  }
  slideNext(){
    let currentIdx = this.getSelectedItemIndex();
    let nextIdx = (currentIdx + 1) % this.items.length;
    this.slideTo(nextIdx);
  }
  slidePrevious(){
    let currentIdx = this.getSelectedItemIndex();
    let previousIdx = (this.items.length + currentIdx - 1) % this.items.length;
    this.slideTo(previousIdx);  
  }
  // 定义一个定时器，循环播放
  start(){
    this.stop();
    this._timer = setInterval(()=>this.slideNext(), this.cycle);
  }
  // 停止循环播放（用户在自己操作的时候要停止自动循环）
  stop(){
    clearInterval(this._timer);
  }
}

const slider = new Slider('my-slider');
slider.start();

``` 
3. 总结: 基本方法
- 结构设计
- 展现效果
- 行为设计
  - API (功能)
  - Event (控制流)

### 重构: 插件化
[插件化轮播图](https://code.h5jun.com/weru/3/edit?js,output)
 
- 解耦
  - 将控制元素抽取成插件
  - 插件与组件之间通过**依赖注入**方式建立连接
  - 将 HTML 模板化, 更易于拓展
- 抽象
  - 将通用的组件模型抽象出来

### 总结
- 组件设计的原则: 封装性、正确性、拓展性、复用性
- 实现组件的步骤: 结构设计、展现效果、行为设计
- 三次重构
  - 插件化
  - 模板化
  - 抽象化(组件框架)


## 三、过程抽象
- 用来处理局部细节控制的一些方法
- 函数式编程思想的基础应用

### 操作次数限制
- 一些异步交互
- 一次性的 HTTP 请求

```js
const list = document.querySelector('ul'); 
const buttons = list.querySelectorAll('button'); 
buttons.forEach((button) => { 
    // 我们为按钮绑定点击事件
    button.addEventListener('click', (evt) => { 
        const target = evt.target; 
        // 改变当前点击的元素样式，渐变消失
        target.parentNode.className = 'completed'; 
        // 两秒钟后删除这个元素
        setTimeout(() => { 
            list.removeChild(target.parentNode); 
        }, 2000); 
    }); 
});
```

- Once
  - 为了能够让"只执行一次"的需求覆盖不同的事件处理, 我们可以将不同的事件处理, 我们可以将这个需求剥离出来。这个过程我们称为**过程抽象**
```js
function once(fn) { 
    return function (...args) { 
        if(fn) { 
            const ret = fn.apply(this, args); 
            fn = null; 
            return ret;
        } 
    }; 
}
button.addEventListener('click', once((evt) => { 
    const target = evt.target; 
    target.parentNode.className = 'completed'; 
    setTimeout(() => { 
        list.removeChild(target.parentNode); 
    }, 2000); 
}));

```

### 高阶函数
- 以函数作为参数
- 以函数作为返回值
- 常用于作为函数装饰器
- Once
- Throttle
```js
function throttle(fn, time = 500){
  let timer;
  return function(...args){
    if(timer == null){
      fn.apply(this,  args);
      timer = setTimeout(() => {
        timer = null;
      }, time)
    }
  }
}

btn.onclick = throttle(function(e){
  circle.innerHTML = parseInt(circle.innerHTML) + 1;
  circle.className = 'fade';
  setTimeout(() => circle.className = '', 250);
});
```
- Debounce
```js
var i = 0;
setInterval(function(){
  bird.className = "sprite " + 'bird' + ((i++) % 3);
}, 1000/10);

function debounce(fn, dur){
  dur = dur || 100;
  var timer;
  return function(){
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, dur);
  }
}

document.addEventListener('mousemove', debounce(function(evt){
  var x = evt.clientX,
      y = evt.clientY,
      x0 = bird.offsetLeft,
      y0 = bird.offsetTop;
  
  console.log(x, y);
  
  var a1 = new Animator(1000, function(ep){
    bird.style.top = y0 + ep * (y - y0) + 'px';
    bird.style.left = x0 + ep * (x - x0) + 'px';
  }, p => p * p);
  
  a1.animate();
}, 100));
```
- Consumer
```js
function consumer(fn, time){
  let tasks = [],
      timer;
  
  return function(...args){
    tasks.push(fn.bind(this, ...args));
    if(timer == null){
      timer = setInterval(() => {
        tasks.shift().call(this)
        if(tasks.length <= 0){
          clearInterval(timer);
          timer = null;
        }
      }, time)
    }
  }
}

function add(ref, x){
  const v = ref.value + x;
  console.log(`${ref.value} + ${x} = ${v}`);
  ref.value = v;
  return ref;
}

let consumerAdd = consumer(add, 1000);

const ref = {value: 0};
for(let i = 0; i < 10; i++){
  consumerAdd(ref, i);
}

```
```js
function consumer(fn, time){
  let tasks = [],
      timer;
  
  return function(...args){
    tasks.push(fn.bind(this, ...args));
    if(timer == null){
      timer = setInterval(() => {
        tasks.shift().call(this)
        if(tasks.length <= 0){
          clearInterval(timer);
          timer = null;
        }
      }, time)
    }
  }
}

btn.onclick = consumer((evt)=>{
  let t = parseInt(count.innerHTML.slice(1)) + 1;
  count.innerHTML = `+${t}`;
  count.className = 'hit';
  let r = t * 7 % 256,
      g = t * 17 % 128,
      b = t * 31 % 128;
  
  count.style.color = `rgb(${r},${g},${b})`.trim();
  setTimeout(()=>{
    count.className = 'hide';
  }, 500);
}, 800)

```
- Iterative
```js
const isIterable = obj => obj != null 
  && typeof obj[Symbol.iterator] === 'function';

function iterative(fn) {
  return function(subject, ...rest) {
    if(isIterable(subject)) {
      const ret = [];
      for(let obj of subject) {
        ret.push(fn.apply(this, [obj, ...rest]));
      }
      return ret;
    }
    return fn.apply(this, [subject, ...rest]);
  }
}

const setColor = iterative((el, color) => {
  el.style.color = color;
});

const els = document.querySelectorAll('li:nth-child(2n+1)');
setColor(els, 'red');
```

### 编程范式
- 命令式
```js
switcher.onclick = function(evt){
  if(evt.target.className === 'on'){
    evt.target.className = 'off';
  }else{
    evt.target.className = 'on';
  }
}
```
- 声明式
```js
function toggle(...actions){
  return function(...args){
    let action = actions.shift();
    actions.push(action);
    return action.apply(this, args);
  }
}

switcher.onclick = toggle(
  evt => evt.target.className = 'off',
  evt => evt.target.className = 'on'
);
```
- 三态
```js
function toggle(...actions){
  return function(...args){
    let action = actions.shift();
    actions.push(action);
    return action.apply(this, args);
  }
}

switcher.onclick = toggle(
  evt => evt.target.className = 'warn',
  evt => evt.target.className = 'off',
  evt => evt.target.className = 'on'
);
```
