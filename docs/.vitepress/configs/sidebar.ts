import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
    '/frontend/': [
        {
            text: 'CSS',
            collapsed: false,
            items: [
                { text: 'footer固定在底部', link: '/frontend/css/fixedAttheBottom' }
            ]
        },
        {
            text: 'JavaScript',
            collapsed: false,
            items: [
                { text: '执行上下文与作用域', link: '/frontend/javascript/executionContext' },
                { text: '工具函数', link: '/frontend/javascript/utils' },
            ]
        },
        {
            text: 'Vue2',
            collapsed: false,
            items: [
                { text: '组件渲染顺序', link: '/frontend/vue2/componentsRenderOrder' },
                { text: '@hook', link: '/frontend/vue2/hooks' },
                { text: 'JSX', link: '/frontend/vue2/JSX' },
                { text: '替换路由', link: '/frontend/vue2/replaceRoutes' },
                { text: '监听 SessionStorage', link: '/frontend/vue2/watchSessionStorage' },
            ]
        },
        {
            text: 'Element',
            collapsed: false,
            items: [
                { text: '展开行表格', link: '/frontend/element/expandTable' },
                { text: '表单转为表格', link: '/frontend/element/formTransformtoTable' },
                { text: '周范围选择器', link: '/frontend/element/weekRangePicker' },
                { text: '样式', link: '/frontend/element/style' },
            ]
        },
        {
            text: 'Utils',
            collapsed: false,
            items: [
                { text: '打印', link: '/frontend/utils/print' },
            ]
        },
        {
            text: 'Camp',
            collapsed: false,
            items: [
                { text: '前端与 HTML', link: '/frontend/camp/html' },
                { text: '项目', link: '/frontend/camp/project' },
            ]
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
                { text: '文件上传', link: '/backend/nodejs/fileUpload' },
            ]
        },
    ],
    '/algorithms/': [
        {
            text: '算法',
            items: [
                { text: '并查集', link: '/algorithms/unionFind' },
                { text: '树状数组', link: '/algorithms/fenwick' },
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