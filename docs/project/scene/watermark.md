# 水印

用 canvas 把水印内容绘制出来并铺满屏幕, 设置 pointer-events 为 none ,让用户无法直接选中和操作该水印，然后用 MutationObserver 监听该元素，让用户无法删除该元素

```js
export function __canvasWM({
  container = document.querySelector(".app-main"),
  width = '300px',
  height = '200px',
  textAlign = 'center',
  textBaseline = 'middle',
  font = '18px microsoft yahei',
  fillStyle = 'rgba(184, 184, 184, 0.3)',
  content = '超级管理员',
  rotate = '20',
  zIndex = 1000
} = {}) {

  const args = arguments[0] || ''
  const canvas = document.createElement("canvas")  
  canvas.setAttribute("width", width)
  canvas.setAttribute("height", height)
  
  const ctx = canvas.getContext("2d")
  ctx.textAlign = textAlign
  ctx.textBaseline = textBaseline
  ctx.font = font
  ctx.fillStyle = fillStyle
  ctx.rotate(Math.PI / 180 * rotate)
  ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2)

  const base64Url = canvas.toDataURL()
  const __wm = document.querySelector(".__wm")

  const watermarkDiv =  __wm || document.createElement("div")
  const styleStr = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: ${zIndex};
    pointer-events: none;
    background-repeat: repeat;
    background-image: url('${base64Url}');
  `
  watermarkDiv.setAttribute('style', styleStr)
  watermarkDiv.classList.add('__wm')

  if (!__wm) {
    container.style.position = 'relative'
    container.insertBefore(watermarkDiv, container.firstChild)
  }

  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  if (MutationObserver) {
    let mo = new MutationObserver(function () {
      const __wm = document.querySelector('.__wm');
      // 只在__wm元素变动才重新调用 __canvasWM
      if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
        // 避免一直触发
        mo.disconnect();
        mo = null;
        __canvasWM(JSON.parse(JSON.stringify(args)));
      }
    });

    mo.observe(container, {
      attributes: true,
      subtree: true,
      childList: true
    })
  }

}

```