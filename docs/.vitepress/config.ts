import { defineConfig } from 'vitepress'
import { nav, sidebar } from './configs'


export default defineConfig({
    base: "/alexshwing-blog/",

    lang: 'zh-CN',
    title: `Alexshwing`,
    description: `Alexshwing's blog`,

    lastUpdated: true,

    themeConfig: {
        i18nRouting: false,
        logo: '/logo.png',

        nav,
        sidebar,
        /* 右侧大纲配置 */
        outline: {
            // level: 'deep',
            label: '本页目录'
        },

        footer: {
            copyright: 'Copyright © 2023-present alexshwing'
        },

        darkModeSwitchLabel: '外观',
        returnToTopLabel: '返回顶部',
        lastUpdatedText: '上次更新',

        docFooter: {
            prev: '上一篇',
            next: '下一篇'
        }
    }
})