import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    {
        text: '基础',
        items: [
            { text: 'CSS', link: '/frontend/css/' },
            { text: 'JavaScript', link: '/frontend/javascript/' },
            { text: 'Typescript', link: '/frontend/typescript/' },
            { text: 'Utils', link: '/frontend/utils/' },
            { text: 'Camp', link: '/frontend/camp/html' },
        ],
    },
    {
        text: 'VUE',
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
        ]
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
        text: '工具',
        items: [
            { text: 'Git', link: '/tools/git/' },
            { text: 'Github', link: '/tools/github/' },
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
