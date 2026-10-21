---
type: index
audience: both
level: L1
status: published
verified_at: 2026-10-20
prerequisites: []
---

# 快速开始

5 分钟从零起步到跑通第一个任务。

> 不知道自己该从哪开始?先看 [从这开始](/start) 或 [学习路径](/learning-map) —— 先建认知,再把工具用透,最后补安全与验收。

## 0. 你需要什么

只需要一台电脑(macOS / Windows)+ 联网。**不需要会写代码**,也不需要会用终端 —— 除非你选的是需要动代码的任务(那也是 AI 执行、你负责验收)。

## 1. 先选一个真实任务

**不按职业选,按你手上要交的活选。**

| 你手上的任务 | 建议工具 | 第一个剧本 |
|-------------|---------|-----------|
| 写周报 / 汇报 / 方案,整理文档 | [WorkBuddy](/workbuddy)(2.3 办公 Agent 工作台) | [写好一份周报](/playbook/weekly-report) |
| 改代码 / 脚本 / 项目 | [Trae IDE](/trae-ide)(2.2)或 [Claude Code](/claude-code)(2.1) | [加一个功能](/playbook/add-feature) |
| 进阶:定制 Agent、做自动化 | 前面熟悉之后 | [DeepSeek Harness](/deepseek-harness)(2.5 Runtime 底座) |

## 2. 选型对照表

按形态分类,不按厂商。**挑一个跑通就行,不用都装。**

| 类 | 工具 | 适合的任务 | 一句话 |
|----|------|-----------|-------|
| **2.1** CLI 编码 Agent | [Claude Code](/claude-code) | 终端、脚本、自动化、重构 | 终端 CLI,能读写文件、跑命令 |
| **2.2** AI 原生 IDE | [Trae IDE](/trae-ide) | 编辑器内、跨多文件改动 | 字节出品,项目级协作 |
| **2.3** 成品办公 Agent 工作台 | [WorkBuddy](/workbuddy) | 文档、表格、汇报、调研 | 腾讯云出品,办公全场景 |
| **2.4** 多模型聚合通用 Agent | 筹备中 | 通用工作台、多模型切换 | 多模型切换,本地私有数据 |
| **2.5** Agent Runtime 底座 | [DeepSeek Harness](/deepseek-harness) | 自定义 Agent、编排与部署 | 开源可插拔,自建 Agent |

**不属于任何一类?** 那说明你要的不是工具能力问题,而是方法问题 —— 先读 [基础认知](/concepts)。

**新人建议**:办公类任务从 WorkBuddy 起步;代码类任务从 Trae IDE 起步,熟悉后配 Claude Code 做脚本与重构。**别一上来就上 2.5。**

## 3. 跑通第一个任务

### 办公类任务 · WorkBuddy

1. 官网下载安装并登录
2. 选一个**你真的要交差**的任务,别拿「试试玩」上手
3. 选模式:Craft(直接做)/ Plan(先给方案)/ Ask(只问不动文件)
4. 描述任务时带上:做什么 + 要什么形式 + 什么标准

```
把这份销售明细表按区域汇总,算出各区域环比,
做成一张带折线图的 Excel,再写 3 句结论。
```

### 代码类任务 · Trae IDE

1. 下载安装并登录
2. `File → Open Folder` 选项目根目录
3. AI 面板输入:`解释一下这个项目的结构`
4. 试一次选区精修,再试一次 Composer 跨文件改

### 代码类任务进阶 · Claude Code

```bash
# macOS / Linux
npm install -g @anthropic-ai/claude-code

cd ~/code/my-project
claude
> explain this project
```

## 4. 下一步去哪

跑通第一个任务后,你已经「能用」。接下来走到「可控」:

| 想做的事 | 去哪 |
|----------|------|
| **看完整学习路径(三段)** | **[学习路径](/learning-map)** |
| **任何任务动手前** | **[安全与验证](/safety)** |
| 理解 Vibe Working 到底怎么回事 | [基础认知](/concepts) |
| 写好 prompt(含办公与工程示例) | [怎么写好 Prompt](/workflow/prompt) |
| 管住 context | [上下文管理](/workflow/context) |
| 搞不定时怎么应对 | [调试与迭代](/workflow/iteration) |
| 怎么审 AI 的产物(含通用验收三铁律) | [AI 产物 Review](/workflow/review) |
| 写一份高质量周报(第一个完整剧本) | [实战剧本 · 写好一份周报](/playbook/weekly-report) |
| 端到端走一个真实工程任务 | [实战剧本 · 加一个功能](/playbook/add-feature) |
| 卡在某个报错 | [FAQ](/faq) |

---

> ⚠️ **API Key 安全提示**:任何教程、贴子、PR 都不要把 API Key 写进仓库。把 .env、*.key 加进 .gitignore。

## 外部参考

- **WorkBuddy 官网**:https://www.workbuddy.cn/
- **Trae IDE 下载**:https://www.trae.ai/
- **Claude Code 安装**:https://docs.claude.com/en/docs/claude-code
- **DeepSeek Harness 官网**:https://deepseekharness.online/
- **Node.js 安装**:https://nodejs.org/
- **nvm(推荐管理 Node 版本)**:https://github.com/nvm-sh/nvm
- **Homebrew(macOS)**:https://brew.sh/
- **飞书 AI 编程新手入门**:https://lcnziv86vkx6.feishu.cn/wiki/Tg3UwWII2iob9DkMvquc28XWnNc
