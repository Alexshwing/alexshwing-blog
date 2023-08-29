# 基础

## 加载 Gltf 模型

复制`node_modules\three\examples\jsm\libs`文件夹到`public`文件夹下

```js
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; 
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"; 

export class MyThree {
  constructor(container) {
    this.canvas = container // 绘制区域
    this.width = this.canvas.offsetWidth
    this.height = this.canvas.offsetHeight
    this.renderer = null // 渲染器
    this.scene = null // 场景
    this.camera = null // 相机
    this.controls = null // 控制器
    this.light = null // 灯光
    this.mesh = null  // 网格
    this.init()
    // TODO
    // 页面缩放事件监听
    window.addEventListener('resize', () => {
      this.width = this.canvas.offsetWidth
      this.height = this.canvas.offsetHeight
      this.renderer.setSize(this.width, this.height)
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()
    });
  }

  init() {
    this.initRenderer()
    this.initScene()
    this.initCamera()
    this.initControls()
    this.initLight()
    // this.addMesh()
    this.tick()
  }
  
  initRenderer() {
      this.renderer = new THREE.WebGLRenderer({ 
        preserveDrawingBuffer: true,
        antialias: true, // 抗锯齿
        alpha: true,
        canvas: this.canvas
      })
      this.renderer.setSize(this.width, this.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // 设备像素比
  }
  
  initScene() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color("#ccc")
  }
  
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000)
    this.camera.position.set(100, 100, 100)
    this.camera.lookAt(this.scene.position); // 相机视点
    this.scene.add(this.camera)
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement) // 轨道控制器
    this.controls.enableDamping = true // 添加惯性
  }

  initLight() {
    this.light = new THREE.AmbientLight(0xdeedff, 1.5)
    this.scene.add(this.light)
  }

  addMesh() {
    // 添加立方体
    const geometry = new THREE.BoxGeometry(5, 5, 5)
    const material = new THREE.MeshBasicMaterial({ color: 0x03c03c })
    this.mesh = new THREE.Mesh(geometry, material)
    this.scene.add(this.mesh)
  }

  // 动画
  tick() {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.tick.bind(this))
  }

  loadGltfModel(path) {
    const loader = new GLTFLoader()
    const drocoLoader = new DRACOLoader()
    drocoLoader.setDecoderPath('./droco/gltf')
    loader.setDRACOLoader(drocoLoader)

    loader.load(path, (gltf) => {
      this.scene.add(gltf.scene)
    })
  }
}

```