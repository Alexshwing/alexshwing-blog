import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
    '/frontend/': [
        {
            text: 'CSS',
            collapsed: false,
            items: [
                { text: 'footer固定在底部', link: '/frontend/css/fixedAttheBottom' },
                { text: '文本溢出', link: '/frontend/css/textOverflow' }
            ]
        },
        {
            text: 'JavaScript',
            collapsed: false,
            items: [
                { text: '执行上下文与作用域', link: '/frontend/javascript/executionContext' },
                { text: '工具函数', link: '/frontend/javascript/utils' },
                { text: '手写', link: '/frontend/javascript/handWriting' },
            ]
        },

        {
            text: 'Utils',
            collapsed: false,
            items: [
                { text: '判断数据类型', link: '/frontend/Utils/type' },
                { text: '柯里化', link: '/frontend/Utils/curry' },
                { text: '千分位格式化', link: '/frontend/Utils/thousandsSeparator' },
                { text: '树', link: '/frontend/Utils/tree' },
            ]
        },
        {
            text: 'Camp',
            collapsed: false,
            items: [
                { text: '前端与 HTML', link: '/frontend/camp/html' },
                { text: '深入浅出 TypeScript', link: '/frontend/camp/typescript' },
                { text: '项目', link: '/frontend/camp/project' },
            ]
        }
    ],
    '/vue/': [
        {
            text: 'Vue2',
            collapsed: false,
            items: [
                { text: '组件渲染顺序', link: '/vue/vue2/componentsRenderOrder' },
                { text: 'nextTick', link: '/vue/vue2/nextTick' },
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
    ],
    '/engineering/': [
        {
            text: 'Webpack',
            collapsed: false,
            items: [
                { text: '基础配置', link: '/engineering/webpack/basic' },
                { text: '高级优化', link: '/engineering/webpack/senior' }
            ]
        },
        {
            text: 'Git',
            collapsed: false,
            items: [
                { text: 'commit 规范', link: '/engineering/git/commit' },
                { text: '代码行数统计', link: '/engineering/git/count' }
            ]
        },
    ],
    '/project/': [
        {
            text: '场景',
            collapsed: false,
            items: [
                { text: '打印', link: '/project/scene/print' },
                { text: 'el-table 无限滚动', link: '/project/scene/inifinite-scroll' }
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
                        { text: '读取文件', link: '/project/tool/d3/fetch' }
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
                }
            ]
        },
        {
            text: '个人项目',
            collapsed: false
        }
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