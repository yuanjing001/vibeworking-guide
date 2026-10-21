// 阅读顺序与页面归属:导航的「内容顺序」只在这里定义一次。
// 顶部导航负责全局可达,这里负责「读到这里,接下来读什么」。

import { withBase } from 'vitepress'

export interface ContentMapItem {
  path: string
  text: string
  group: string
}

export const contentMap: ContentMapItem[] = [
  // 快捷入口
  { path: '/start', text: '从这开始 · 20 分钟', group: '开始' },

  // 第 1 部分:基础认知
  { path: '/learning-map', text: '学习路径', group: '学习路径' },
  { path: '/concepts', text: '基础认知', group: '学习路径 · 第 1 部分' },
  { path: '/getting-started', text: '快速开始', group: '学习路径 · 第 1 部分' },

  // 第 2 部分:工具主线
  { path: '/tool-mastery', text: '工具主线 · 把主流工具用透', group: '学习路径 · 第 2 部分' },
  { path: '/model-selection', text: '模型怎么选 · 7 个场景', group: '学习路径 · 第 2 部分' },
  { path: '/workbuddy', text: 'WorkBuddy', group: '学习路径 · 第 2 部分' },
  { path: '/workbuddy-recipes', text: 'WorkBuddy 实战配方 · 10 个真实工作流', group: '学习路径 · 第 2 部分' },
  { path: '/trae-ide', text: 'Trae IDE', group: '学习路径 · 第 2 部分' },
  { path: '/trae-cases', text: 'TRAE 实战案例精选', group: '学习路径 · 第 2 部分' },
  { path: '/claude-code', text: 'Claude Code', group: '学习路径 · 第 2 部分' },
  { path: '/deepseek-harness', text: 'DeepSeek Harness', group: '学习路径 · 第 2 部分' },

  // 第 3 部分:补充与实战
  { path: '/safety', text: '安全与验证', group: '学习路径 · 第 3 部分' },
  { path: '/workflow/prompt', text: '怎么写好 Prompt', group: '学习路径 · 第 3 部分' },
  { path: '/workflow/context', text: '上下文管理', group: '学习路径 · 第 3 部分' },
  { path: '/workflow/iteration', text: '调试与迭代', group: '学习路径 · 第 3 部分' },
  { path: '/workflow/review', text: 'AI 产物 Review', group: '学习路径 · 第 3 部分' },
  { path: '/playbook/weekly-report', text: '实战剧本 · 写好一份周报', group: '实战任务' },
  { path: '/playbook/add-feature', text: '实战剧本 · 加一个功能', group: '实战任务' },
  { path: '/playbook/fix-bug', text: '实战剧本 · 修一个 Bug', group: '实战任务' },
  { path: '/playbook/refactor', text: '实战剧本 · 重构一段代码', group: '实战任务' },

  // 关于
  { path: '/about', text: '体系说明', group: '关于' },
  { path: '/faq', text: '常见问题', group: '关于' },
  { path: '/resources', text: '资源索引', group: '关于' },
]

export function normalizePath(path: string): string {
  const normalized = path.replace(/\.html$/, '').replace(/\/+$/, '')
  return normalized || '/'
}

// 浏览器里 route.path 带 base 前缀(如 /vibeworking-guide/playbook/weekly-report),
// 而 contentMap 存的是站点内路径(/playbook/weekly-report),两边要对齐后才能匹配。
// withBase('/') 能拿回 base 本身,且它读的是模块级 siteDataRef,不像 useData() 依赖 inject,
// 因此在 computed getter 里调用也安全。
export function stripBase(path: string): string {
  const base = withBase('/')
  if (base && base !== '/' && path.startsWith(base)) {
    return path.slice(base.length - 1) || '/'
  }
  return path
}

export function findContentItem(path: string): ContentMapItem | undefined {
  const normalized = normalizePath(stripBase(path))
  return contentMap.find((item) => item.path === normalized)
}
