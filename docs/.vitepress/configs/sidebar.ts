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
                { text: '手写', link: '/frontend/javascript/handWriting' },
            ]
        },

        {
            text: 'Utils',
            collapsed: false,
            items: [
                { text: '千分位格式化', link: '/frontend/Utils/thousandsSeparator' },
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
            text: 'Element',
            collapsed: false,
            items: [
                { text: '展开行表格', link: '/vue/element/expandTable' },
                { text: '表单转为表格', link: '/vue/element/formTransformtoTable' },
                { text: '周范围选择器', link: '/vue/element/weekRangePicker' },
                { text: '样式', link: '/vue/element/style' },
            ]
        },
    ],
    '/engineering/': [
        {
            text: 'Webpack',
            collapsed: false,
            items: [
                { text: '基础配置', link: '/engineering/webpack/basic' }
            ]
        },
        {
            text: 'Git',
            collapsed: false,
            items: [
                { text: 'commit 规范', link: '/engineering/git/commit' }
            ]
        },
    ],
    '/project/': [
        {
            text: '场景',
            collapsed: false,
            items: [
                { text: 'print', link: '/project/scene/print' }
            ]
        },
        {
            text: '工具',
            collapsed: false,
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