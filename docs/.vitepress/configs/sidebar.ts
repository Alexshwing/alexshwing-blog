import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
    '/frontend/': [
        {
            text: 'CSS',
            collapsed: false,
            items: [
                { text: '移动端适配', link: '/frontend/css/mobileAdaptation' },
                { text: '负margin', link: '/frontend/css/negativeMargin' },
                { text: '三栏布局', link: '/frontend/css/threeCol' },
                { text: 'canvas', link: '/frontend/css/canvas' },
                { text: 'sticky', link: '/frontend/css/sticky' },
                { text: 'getComputedStyle', link: '/frontend/css/getComputedStyle' },
                { text: '文本溢出', link: '/frontend/css/textOverflow' },
                { text: '水平垂直居中', link: '/frontend/css/center' },
                { text: '隐藏元素', link: '/frontend/css/hiddenEl' },
                { text: 'footer固定在底部', link: '/frontend/css/fixedAttheBottom' },
                { text: '电梯导航', link: '/frontend/css/elevatorNavigation' },
                { text: '根据背景色切换黑白文字', link: '/frontend/css/switchTextColorByBGColor' },
                { text: '通用样式', link: '/frontend/css/commonStyle' },
            ]
        },
        {
            text: 'JavaScript',
            collapsed: false,
            items: [
                { text: '对象', link: '/frontend/javascript/object' },
                { text: '事件循环', link: '/frontend/javascript/eventloop' },
                { text: '事件流', link: '/frontend/javascript/eventFlow' },
                { text: '执行上下文与作用域', link: '/frontend/javascript/executionContext' },
                { text: 'MutationObserver', link: '/frontend/javascript/mutationObserver' },
                { text: 'dispatchEvent', link: '/frontend/javascript/dispatchEvent' },
                { text: '手写', link: '/frontend/javascript/handWriting' },
                { text: 'trick', link: '/frontend/javascript/trick' },
            ]
        },
        {
            text: 'TypeScript',
            collapsed: false,
            items: [
                { text: '基础', link: '/frontend/typescript/basic' },
                { text: '类型', link: '/frontend/typescript/types' },
                { text: '装饰器', link: '/frontend/typescript/decorator' },
                { text: '模块', link: '/frontend/typescript/module' },
            ]
        },
        {
            text: 'Utils',
            collapsed: true,
            items: [
                { text: '判断数据类型', link: '/frontend/Utils/type' },
                { text: '解析 URL', link: '/frontend/Utils/parseUrlParams' },
                { text: '随机数', link: '/frontend/Utils/getRandomNumberFromRange' },
                { text: '判断设备类型', link: '/frontend/Utils/judgeEquipment' },
                { text: '防抖节流', link: '/frontend/Utils/debouneAndThrottle' },
                { text: '文件转换', link: '/frontend/Utils/fileConversion' },
                { text: '颜色转换', link: '/frontend/Utils/colorConversions' },
                { text: '柯里化', link: '/frontend/Utils/curry' },
                { text: '千分位格式化', link: '/frontend/Utils/thousandsSeparator' },
                { text: '树', link: '/frontend/Utils/tree' },
                { text: 'setTimeout 和 setInterval', link: '/frontend/Utils/timer' },
                { text: 'PromisePool', link: '/frontend/Utils/promisePool' },
            ]
        },
        {
            text: 'Camp',
            collapsed: true,
            items: [
                { text: '前端与 HTML', link: '/frontend/camp/html' },
                { text: '深入理解 CSS', link: '/frontend/camp/css' },
                { text: '如何写好 JavaScript', link: '/frontend/camp/javascript' },
                { text: '深入浅出 TypeScript', link: '/frontend/camp/typescript' },
                { text: 'Web 标准与前端开发', link: '/frontend/camp/standard' },
                { text: 'HTTP 实用指南', link: '/frontend/camp/http' },
                { text: 'Web 开发的安全之旅', link: '/frontend/camp/secure' },
                { text: '前端设计模式应用', link: '/frontend/camp/designPatterns' },
                { text: '响应式系统 与 React', link: '/frontend/camp/react' },
                { text: 'Node.js 与前端开发实战', link: '/frontend/camp/nodejs' },
                { text: 'Vite 知识体系', link: '/frontend/camp/vite' },
                { text: '构建 Webpack 知识体系', link: '/frontend/camp/webpack' },
                { text: '前端必须知道的开发调试知识', link: '/frontend/camp/debug' },
                { text: '项目', link: '/frontend/camp/project' },
            ]
        }
    ],
    '/vue/': [
        {
            text: 'Vue2',
            collapsed: false,
            items: [
                { text: 'data', link: '/vue/vue2/data' },
                { text: 'v-if 和 v-show', link: '/vue/vue2/ifandshow' },
                { text: 'v-if 和 v-for', link: '/vue/vue2/ifandfor' },
                { text: 'key', link: '/vue/vue2/key' },
                { text: 'Vue.$set', link: '/vue/vue2/set' },
                { text: '组件渲染顺序', link: '/vue/vue2/componentsRenderOrder' },
                { text: 'nextTick', link: '/vue/vue2/nextTick' },
                { text: '过滤器', link: '/vue/vue2/filter' },
                { text: '@hook', link: '/vue/vue2/hooks' },
                { text: 'JSX', link: '/vue/vue2/JSX' },
                { text: '替换路由', link: '/vue/vue2/replaceRoutes' },
                { text: '监听 SessionStorage', link: '/vue/vue2/watchSessionStorage' },
            ]
        },
        {
            text: 'Vue3',
            collapsed: false
        },
        {
            text: 'Vuex',
            collapsed: false,
            items: [
                { text: 'Start', link: '/vue/vuex/getting-started' },
                { text: 'State', link: '/vue/vuex/state' },
                { text: 'Getters', link: '/vue/vuex/getters' },
                { text: 'Mutaions', link: '/vue/vuex/mutaions' },
                { text: 'Actions', link: '/vue/vuex/actions' },
                { text: 'Modules', link: '/vue/vuex/modules' },
            ]
        },
        {
            text: 'Vue Router',
            collapsed: true,
            items: [
                { text: '基础', link: '/vue/router/basic' },
                { text: '进阶', link: '/vue/router/advance' },
            ]
        },
        {
            text: 'Pinia',
            collapsed: false,
        },
        {
            text: 'Nuxt',
            collapsed: false,
        },
    ],
    '/engineering/': [
        {
            text: 'Git',
            collapsed: false,
            items: [
                { text: '常用命令', link: '/engineering/git/command' },
                { text: '储藏', link: '/engineering/git/stash' },
                { text: 'commit 规范', link: '/engineering/git/commit' },
                { text: '代码行数统计', link: '/engineering/git/count' }
            ]
        },
        {
            text: 'Webpack',
            collapsed: false,
            items: [
                { text: '基础配置', link: '/engineering/webpack/basic' },
                { text: '高级优化', link: '/engineering/webpack/senior' }
            ]
        },
        {
            text: 'Npm',
            collapsed: false,
            items: [
                { text: 'install', link: '/engineering/npm/install' },
                { text: 'run', link: '/engineering/npm/run' },
                { text: 'npx', link: '/engineering/npm/npx' },
            ]
        },
        {
            text: 'Vite',
            collapsed: false,
        },
        {
            text: 'Eslint',
            collapsed: false,
        },
        {
            text: 'Babel',
            collapsed: false,
        },
    ],
    '/project/': [
        {
            text: '场景',
            collapsed: false,
            items: [
                { text: '工具库', link: '/project/scene/toolLibrary' },
                { text: '扫码', link: '/project/scene/scan' },
                { text: '打印', link: '/project/scene/print' },
                { text: '水印', link: '/project/scene/watermark' },
                { text: '禁用中文输入法的输入框', link: '/project/scene/limit-input' }
            ]
        },
        {
            text: '工具',
            collapsed: false,
            items: [
                {
                    text: 'D3',
                    link: '/project/tool/d3/',
                    collapsed: true,
                    items: [
                        { text: '开始', link: '/project/tool/d3/getting-started' },
                        { text: '选择集', link: '/project/tool/d3/selection' },
                        { text: '比例尺', link: '/project/tool/d3/scale' },
                        { text: '坐标轴', link: '/project/tool/d3/axis' },
                        { text: '读取文件', link: '/project/tool/d3/fetch' },
                        { text: '柱形图', link: '/project/tool/d3/barChart' },
                        { text: '散点图', link: '/project/tool/d3/scatterChart' },
                        { text: '折线图', link: '/project/tool/d3/lineChart' },
                        { text: '地图', link: '/project/tool/d3/map' }
                    ]
                },
                {
                    text: 'Element',
                    link: '/project/tool/element/',
                    collapsed: true,
                    items: [
                        { text: '展开行表格', link: '/project/tool/element/expandTable' },
                        { text: '表单转为表格', link: '/project/tool/element/formTransformtoTable' },
                        { text: '周范围选择器', link: '/project/tool/element/weekRangePicker' },
                        { text: '样式', link: '/project/tool/element/style' },
                        { text: '踩坑', link: '/project/tool/element/trap' },
                    ]
                },
                {
                    text: 'Three.js',
                    link: '/project/tool/three/',
                    collapsed: true,
                    items: [
                        { text: '基础', link: '/project/tool/three/basic' },
                        { text: '模型', link: '/project/tool/three/model' },
                        { text: 'Raycaster', link: '/project/tool/three/raycaster' },
                    ]
                },
                {
                    text: '正则表达式',
                    link: '/project/tool/regex/',
                    collapsed: true,
                    items: [
                        { text: '字符匹配', link: '/project/tool/regex/characterMatching' },
                        { text: '位置匹配', link: '/project/tool/regex/positionMatching' },
                        { text: '括号的作用', link: '/project/tool/regex/bracket' },
                        { text: '回溯', link: '/project/tool/regex/backtrack' },
                        { text: '拆分', link: '/project/tool/regex/split' },
                        { text: '构建', link: '/project/tool/regex/structure' },
                        { text: '编程', link: '/project/tool/regex/program' },
                    ]
                },
            ]
        },
        {
            text: '个人项目',
            collapsed: false
        },
        {
            text: '其他',
            collapsed: false,
            items: [
                { text: 'codesandbox', link: '/project/other/codesandbox' },
            ]
        },
    ],
    '/backend/': [
        {
            text: 'Node.js',
            collapsed: false,
            items: [
                { text: 'NPM', link: '/backend/nodejs/npm' },
                { text: '文件系统', link: '/backend/nodejs/fileSystem' },
                { text: 'HTTP', link: '/backend/nodejs/http' },
                { text: '模块化', link: '/backend/nodejs/module' },
                { text: '文件上传', link: '/backend/nodejs/fileUpload' },
            ]
        },
        {
            text: 'Python',
            collapsed: false,
            items: [
                { text: 'SortedList', link: '/backend/python/sortedList' },
            ]
        },
    ],
    '/algorithms/': [
        {
            text: '算法',
            items: [
                { text: '数学', link: '/algorithms/math' },
                { text: '并查集', link: '/algorithms/unionFind' },
                { text: '树状数组', link: '/algorithms/fenwick' },
                { text: '拓扑排序', link: '/algorithms/topsort' },
                { text: '换根DP', link: '/algorithms/rerooting' },
            ]
        }
    ],
    '/os/': [
        {
            text: 'Linux',
            items: [
                { text: '常用命令', link: '/os/linux/command' }
            ]
        }
    ]
}