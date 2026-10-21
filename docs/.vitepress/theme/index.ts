import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import GiscusComment from './components/GiscusComment.vue'
import BackToTop from './components/BackToTop.vue'
import DocBreadcrumb from './components/DocBreadcrumb.vue'
import DocPrevNext from './components/DocPrevNext.vue'
import LearningMap from './components/LearningMap.vue'
import ReadingProgress from './components/ReadingProgress.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 内容优先的阅读外壳:进度条 → 面包屑 → 正文 → 上一篇/下一篇
      'layout-top': () => h(ReadingProgress),
      'doc-before': () => h(DocBreadcrumb),
      'doc-footer-before': () => h(DocPrevNext),
      // 回到顶部:全站浮动,首页与 404 不显示
      'layout-bottom': () => h(BackToTop),
    })
  },
  enhanceApp({ app }) {
    // 注册全局 Giscus 评论组件
    app.component('GiscusComment', GiscusComment)
    // 学习地图:页面里直接用 <LearningMap />
    app.component('LearningMap', LearningMap)
  },
}
