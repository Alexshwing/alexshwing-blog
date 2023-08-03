import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    {
        text: '前端',
        items: [
            { text: 'CSS', link: '/frontend/css/' },
            { text: 'JavaScript', link: '/frontend/javascript/' },
            { text: 'Typescript', link: '/frontend/typescript/' },
            { text: 'Vue2', link: '/frontend/vue2/' },
            { text: 'Element', link: '/frontend/element/expandTable' },
            { text: 'Webpack', link: '/frontend/webpack/' },
            { text: 'Utils', link: '/frontend/utils/' },
            { text: 'Camp', link: '/frontend/camp/html' },
        ],
    },
    {
        text: '后端',
        items: [
            { text: 'Node.js', link: '/backend/nodejs/npm' },
            { text: 'Python', link: '/backend/python/' },
        ]
    },
    {
        text: '算法',
        link: '/algorithms/fenwick',
        activeMatch: '^/algorithms'
    },
    {
        text: '系统',
        items: [
            { text: 'Linux', link: '/os/linux/command' }
        ]
    },
    {
        text: '工具',
        items: [
            { text: 'Git', link: '/tools/git/' },
            { text: 'Github', link: '/tools/github/' },
        ]
    },
    {
        text: '关于我',
        link: '/ABOUT.html'
    }
]
