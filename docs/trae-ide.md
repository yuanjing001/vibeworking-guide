---
type: tool
audience: developer
level: L1
status: published
verified_at: 2026-10-20
paradigm: 2.2
prerequisites:
  - has:code-reading
tools:
  - trae-ide
---

# Trae IDE

> **分类:2.2 AI 原生 IDE** · 推荐给需要编辑器内跨文件改动的用户(含产品经理做轻量原型) · 本页是速查词条,详尽配置看[官方文档](#外部参考)


::: tip 工具主线
本页是速查词条;想把它用到位,看[工具主线 · 用透清单](/tool-mastery)、[TRAE 实战案例精选](/trae-cases);模型选择看[模型怎么选](/model-selection)。
:::
## 核心定位

字节出品的 AI 原生 IDE,定位类似 Cursor。图形化、内置 AI、主打**跨多文件改动**。

**它和 CLI 类工具的差别在于:它把「上下文」做成了可视化的操作** —— 你能看见项目树、看见 diff、看见 AI 改了哪几行。这是它对新手最友好的地方。

| 维度 | 说明 |
|------|------|
| 形态 | 独立桌面 IDE |
| 强项 | 跨多文件改动、选区级精修、全项目语义检索 |
| 弱项 | 脚本 / CI / 远程服务器场景不如 CLI |
| 上手成本 | 三个工具里最低,界面熟悉 |

## 适用场景

| 适合 | 不适合 |
|------|--------|
| 跨多文件批量改(Composer) | 写脚本 / CI / 部署自动化 |
| 选中一段代码做精修 | 远程服务器上直接干活 |
| 边看代码边来回讨论 | 完整的工程化流水线编排 |
| 不熟悉终端操作的用户 | — |
| 产品经理做轻量原型 | — |

## 10 分钟上手 Demo

### 1. 装上

从官网下载对应平台安装包:https://www.trae.ai/

| 系统 | 安装方式 |
|------|---------|
| macOS | 下载 `.dmg` 拖入 Applications |
| Windows | 下载 `.exe` 安装 |
| Linux | 以官网为准(`.deb` / `.AppImage`) |

### 2. 打开项目

1. 启动并用账号登录
2. `File → Open Folder` 选项目根目录
3. 右侧 AI 面板输入:`解释一下这个项目的结构`

### 3. 试三个真实动作

**动作一 · 选区精修**

编辑器里选几行代码 → 侧边弹出快捷操作(Explain / Refactor / Add tests / Fix bug)。

**动作二 · Composer 跨多文件改**

```
把 src/api/ 下所有 fetch 调用统一改成 axios,并加上错误处理
```

它会先列出「将要改哪些文件」→ **你点确认** → 一次性改完 + 给 diff。
**这个「先列清单再改」的机制就是 Plan Mode 思想,很关键。**

**动作三 · `@` 引用上下文**

| 引用 | 作用 |
|------|------|
| `@file` | 单个文件 |
| `@folder` | 整个文件夹 |
| `@codebase` | 全项目语义检索 |
| `@docs` | 拉外部文档上下文 |

**显式引用能省上下文、提精度** —— 比让它全项目扫描快得多,也准得多。

## 典型工作流

```
1. Open Folder 打开项目根目录(让 AGENTS.md 生效)
2. 让 AI 解释项目结构 —— 建立整体认知
3. 小改动 → 选区 + 快捷操作
4. 跨文件改动 → Composer,先看清单再确认
5. 看 diff,不满意就让它改
6. 需要跑命令 / 写脚本 → 切到 Claude Code
```

### 核心 UI 速查

| 区域 | 作用 |
|------|------|
| 左侧文件树 | 浏览 / 编辑文件 |
| 中央 | 传统代码编辑区 |
| 右侧 AI 面板 | 对话、改代码、看 diff |
| 底部 Composer | 跨多文件改动入口 |
| 顶部 `@` | 塞入上下文 |

## 项目级 AGENTS.md

Trae IDE 会读项目根目录的 `AGENTS.md`(或 `CLAUDE.md`)作为协作合同。

**这是最省力的提效手段** —— 写一次,之后每次启动都自动生效,不用重复交代规范。写法见 [基础认知 · 沉淀载体](/concepts#沉淀载体)。

## 代表性实战案例

官方知识库里有几十个 TRAE 案例,这里挑 5 个不同方向的,先看「能复用什么」:

| 案例 | 类型 | 看什么 |
|------|------|--------|
| [采购管理系统(前后端系统)](https://lcnziv86vkx6.feishu.cn/wiki/LVCswepqci6uSWkVcIScQtqrnGc) | 业务系统 / 代表性 | 单开发者 + AI 从需求、架构、模型、PDF 做到联调 |
| [不做「赛博棉花工」:数据处理自由](https://lcnziv86vkx6.feishu.cn/wiki/Or72wPz5biEA0Lk5mvGch0gCnQf) | 数据 / 非技术 | 把重复的格式转换描述成明确的输入输出 + 示例 |
| [智能会议纪要助手](https://lcnziv86vkx6.feishu.cn/wiki/N9UywVgpgiyEwMkptsjcBuWFnhk) | 办公 / MCP | 用 MCP 接语音识别,把会议录音变成结构化纪要 |
| [给 Cloudreve 加 AI 对话](https://lcnziv86vkx6.feishu.cn/wiki/YIxGw6iCBi6WbYko7uiccnrZneh) | 既有项目 | 读懂别人的代码库,小步加功能 |
| [用 TRAE 把一个 IM 系统真正做完](https://lcnziv86vkx6.feishu.cn/wiki/DvPCwlGGGicnHJkIFdCc0q2jnsf) | 复杂系统 / 反面 | Vibe Coding 失控曲线,以及为什么要先设计 |

完整导读(8 个精选 + 更多案例):[TRAE 实战案例精选](/trae-cases)。

## 避坑指南

| 坑 | 表现 | 解法 |
|----|------|------|
| **Composer 不看清单直接确认** | 一次改十几个文件,review 不过来 | 每次都读清单,范围超预期就否掉 |
| **不用 `@` 硬让它全项目扫** | 上下文占用高、结果不精准 | 显式引用目标文件 / 目录 |
| **把它当命令行用** | 该跑脚本的场景很别扭 | 转 [Claude Code](/claude-code) |
| **默认放开全部权限** | AI 动了不该动的文件 | 保持手动授权 |
| **不写 AGENTS.md** | 每次都要重复说同样的规范 | 沉淀成项目规则文件 |

## 同类工具对比

同类:**2.2 AI 原生 IDE**。本体系内已有词条:

| 工具 | 一句话 | 侧重 |
|------|-------|------|
| **Trae IDE** | 字节出品,类 Cursor | 跨多文件改动 + 图形化协同 |
| Cursor | 同类工具,本体系词条筹备中 | — |
| [Claude Code](/claude-code)(2.1) | 终端 CLI | 脚本 / 自动化 / 远程 |

**经验之谈**:日常 70% 用 Trae IDE,剩下 30%(脚本 / 自动化 / CI)用 Claude Code。两者不是替代关系。

---

## 外部参考

- **官网 / 下载**:https://www.trae.ai/
- **官方文档**:https://docs.trae.ai/
- **Composer 使用技巧**:官方文档的 Composer 章节
- **TRAE 官方知识库 · TRAE 实战指南**:https://lcnziv86vkx6.feishu.cn/wiki/Tg3UwWII2iob9DkMvquc28XWnNc

> Trae IDE 迭代很快,功能菜单可能与本文略有出入;以你安装的版本为准。
