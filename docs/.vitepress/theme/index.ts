import { h, App } from 'vue'
import Theme from 'vitepress/theme'


// import './styles/index.scss'

export default Object.assign({}, Theme, {
    Layout: () =>
        h(Theme.Layout, null, {
        })
})