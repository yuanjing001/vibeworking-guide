import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vibe Working 人机协同指南',
  description:
    '人机协同工作 · 泛职场 · 方法优先,工具为载体 · 不按职业分轨 · 编程只是工作场景之一',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,

  // 部署到 https://yuanjing001.github.io/vibeworking-guide/ 时,所有资源与站内链接
  // 需要带 /vibeworking-guide/ 前缀,否则静态资源会 404。
  base: '/vibeworking-guide/',

  // 默认主题配置
  themeConfig: {
    nav: [
      {
        text: '学习路径',
        items: [
          { text: '学习路径总览', link: '/learning-map' },
          { text: '基础认知', link: '/concepts' },
          { text: '快速开始', link: '/getting-started' },
          { text: '从这开始 · 20 分钟', link: '/start' },
        ],
      },
      {
        text: '工具主线',
        items: [
          { text: '把主流工具用透', link: '/tool-mastery' },
          { text: '模型怎么选 · 7 个场景', link: '/model-selection' },
          { text: 'WorkBuddy · 10 个实战配方', link: '/workbuddy-recipes' },
          { text: 'WorkBuddy · 工具词条', link: '/workbuddy' },
          { text: 'Trae IDE · AI 原生 IDE', link: '/trae-ide' },
          { text: 'TRAE · 实战案例精选', link: '/trae-cases' },
          { text: 'Claude Code · CLI 编码 Agent', link: '/claude-code' },
          { text: 'DeepSeek Harness · Runtime 底座', link: '/deepseek-harness' },
        ],
      },
      {
        text: '实战',
        items: [
          { text: '写好一份周报', link: '/playbook/weekly-report' },
          { text: '加一个功能', link: '/playbook/add-feature' },
          { text: '修一个 Bug', link: '/playbook/fix-bug' },
          { text: '重构一段代码', link: '/playbook/refactor' },
        ],
      },
      {
        text: '进阶补充',
        items: [
          { text: '安全与验证', link: '/safety' },
          {
            text: '进阶方法论',
            items: [
              { text: '怎么写好 Prompt', link: '/workflow/prompt' },
              { text: '上下文管理', link: '/workflow/context' },
              { text: '调试与迭代', link: '/workflow/iteration' },
              { text: 'AI 产物 Review', link: '/workflow/review' },
            ],
          },
          {
            text: '关于本站',
            items: [
              { text: '体系说明', link: '/about' },
              { text: '常见问题', link: '/faq' },
              { text: '资源索引', link: '/resources' },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yuanjing001/vibeworking-guide' },
    ],

    logo: '/logo.svg',

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/yuanjing001/vibeworking-guide/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    footer: {
      message: '内容基于 CC BY-NC-SA 4.0 发布 · 站点代码 MIT',
      copyright: `© ${new Date().getFullYear()} vibe-work-guide contributors`,
    },

    outline: {
      level: [2, 3],
      label: '本页大纲',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    // Giscus 评论:在 GitHub 仓库创建后,到 https://giscus.app 生成配置,
    // 把下面对象取消注释并填入实际值即可启用。
    // giscusConfig: {
    //   repo: 'yuanjing001/vibeworking-guide',
    //   repoId: 'R_xxxxxx',
    //   category: 'Announcements',
    //   categoryId: 'DIC_xxxxxx',
    //   mapping: 'pathname',
    //   strict: '0',
    //   reactionsEnabled: '1',
    //   emitMetadata: '0',
    //   inputPosition: 'bottom',
    //   theme: 'light',
    //   lang: 'zh-CN',
    // },
  },
})