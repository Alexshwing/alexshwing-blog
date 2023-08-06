import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    {
        text: '基础',
        items: [
            { text: 'CSS', link: '/frontend/css/' },
            { text: 'JavaScript', link: '/frontend/javascript/' },
            { text: 'Typescript', link: '/frontend/typescript/' },
            { text: 'Camp', link: '/frontend/camp/html' },
        ],
    },
    {
        text: 'Vue生态',
        items: [
            { text: 'Vue2', link: '/vue/vue2/' },
            { text: 'Vue3', link: '/vue/vue3/' },
            { text: 'Element', link: '/vue/element/' },
        ]
    },
    {
        text: '工程化',
        items: [
            { text: 'Webpack', link: '/engineering/webpack/' },
            { text: 'Git', link: '/engineering/git/' },
        ]
    },
    {
        text: '场景',
        link: '/project/',
        activeMatch: '^/project'
    },
    {
        text: '浏览器',
        link: '/browser/',
        activeMatch: '^/browser'
    },
    {
        text: '后端',
        items: [
            { text: 'Node.js', link: '/backend/nodejs/npm' },
            { text: 'Python', link: '/backend/python/' },
        ]
    },
    {
        text: '系统',
        items: [
            { text: 'Linux', link: '/os/linux/command' }
        ]
    },
    {
        text: '算法',
        link: '/algorithms/fenwick',
        activeMatch: '^/algorithms'
    },
    {
        text: '关于我',
        link: '/ABOUT.html'
    }
]
