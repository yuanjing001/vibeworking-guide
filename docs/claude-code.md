---
type: tool
audience: developer
level: L2
status: published
verified_at: 2026-10-20
paradigm: 2.1
prerequisites:
  - has:terminal
  - has:git
tools:
  - claude-code
---

# Claude Code

> **分类:2.1 CLI 编码 Agent** · 推荐给熟悉终端、需要脚本与自动化任务的用户 · 本页是速查词条,详尽配置看[官方文档](#外部参考)


::: tip 工具主线
本页是速查词条;想把它用到位,看[工具主线 · 用透清单](/tool-mastery);模型选择看[模型怎么选](/model-selection)。
:::
## 核心定位

Anthropic 官方的终端 AI 编程 Agent。装在命令行里,能读项目、改文件、跑命令。

**它和其他工具的差别在于:它活在你的真实环境里。** IDE 类工具在沙箱里改代码,Claude Code 直接在你的项目目录里工作 —— 能读你的 git 历史、能跑你的测试、能执行你的构建命令。

| 维度 | 说明 |
|------|------|
| 形态 | 终端 CLI |
| 载体 | 本地真实环境(含 shell、git、测试) |
| 强项 | 长周期任务、跨文件批量重构、脚本与自动化 |
| 弱项 | 选区小改动不如 IDE 顺手;需要会用终端 |

## 适用场景

| 适合 | 不适合 |
|------|--------|
| 跨多文件批量改(统一改调用风格、批量补测试) | 改一行错别字 |
| 写脚本 / CI 配置 / 部署脚本 | 边看代码边来回聊 |
| 让 AI 跑命令、跑测试、提交代码 | 完全不想用终端的人 |
| 在远程服务器上直接干活 | 需要图形化可视化的任务 |
| 重构:改结构但保证测试全绿 | — |

## 10 分钟上手 Demo

### 1. 装上

```bash
npm install -g @anthropic-ai/claude-code
claude --version
```

| 系统 | 说明 |
|------|------|
| macOS / Linux | 上面的命令直接跑 |
| Windows | 推荐 WSL2 |

### 2. 在项目里启动

```bash
cd ~/code/my-project
claude
```

### 3. 先让它读,再让它写

```
> 这个项目是干什么的?入口在哪?
```

**先读后写**是第一步要养成的习惯 —— 你不先理解项目,后面所有的改都是盲改。

### 4. 试一次真实的小改动

```
> 用 Plan Mode,给 src/ 下所有 fetch 调用加上错误处理。
> 先列清单,不要直接改。
```

看完清单确认没问题,再让它执行。

## 典型工作流

```
1. cd 到项目根目录(规则文件生效的关键)
2. claude 启动
3. 先问「这个项目怎么组织的」—— 建立上下文
4. 复杂任务先进 Plan Mode,对齐方案
5. 执行,看 diff
6. 自己跑一遍测试验证
7. 小步 commit
8. 长任务 / 走偏了 → /clear 重来
```

### 5 个最高频命令

| 命令 | 作用 |
|------|------|
| `claude` | 启动会话 |
| `/clear` | 清空上下文(详见 [上下文管理](/workflow/context)) |
| `Shift+Tab` | 切换 Plan Mode(只规划不执行) |
| `ESC` | 中断当前生成 |
| `/permissions` | 配置操作权限白名单 |

### 3 个核心配置文件

| 文件 | 作用 |
|------|------|
| `~/.claude/settings.json` | 全局偏好、API Key |
| `~/.claude.json` | 全局 MCP servers |
| `./CLAUDE.md` | 项目级规则,**随项目走,最值得花时间写** |

`CLAUDE.md` 写得好,AI 第一轮就能给出贴合项目规范的产物。写法见 [基础认知 · 沉淀载体](/concepts#沉淀载体)。

## 避坑指南

| 坑 | 表现 | 解法 |
|----|------|------|
| **不在项目根目录启动** | AI 看不到项目规则,行为飘忽 | `cd` 到根目录再启动 |
| **一直纠正** | 它说「您说得对」然后又写错 | `/clear` + 重写 prompt,详见 [调试与迭代](/workflow/iteration) |
| **上下文塞满** | 输出变短、重复、答非所问 | 60% 是分水岭,见 [上下文管理](/workflow/context) |
| **默认全放开权限** | 误删文件、误跑危险命令 | 先保持询问,跑顺了再放宽 |
| **一次给太大任务** | 失败就得全部重来 | 拆成能独立验证的小任务 |
| **不写 CLAUDE.md** | 每次都要重复交代同样的规矩 | 沉淀成项目规则文件 |

### API Key 安全

**任何教程、贴子、PR 都不要把 API Key 写进仓库。** 把 `.env`、`*.key` 加进 `.gitignore`。

## 同类工具对比

同类:**2.1 CLI 编码 Agent**。与相邻两类的分工:

| 需求 | 选谁 |
|------|------|
| 终端里跑命令、脚本、自动化、远程服务器 | **Claude Code** |
| 编辑器里选区改、边看边聊 | [Trae IDE](/trae-ide)(2.2) |
| 不写代码,处理文档报表 | [WorkBuddy](/workbuddy)(2.3) |
| 多模型自由切换 | 2.4 类工具(筹备中) |
| 自定义拼装 Agent | [DeepSeek Harness](/deepseek-harness)(2.5) |

**经验之谈**:日常编码用 IDE,脚本 / 自动化 / CI / 大重构用 Claude Code。两者配合而非替代。

---

## 外部参考

- **官方文档**:https://docs.claude.com/en/docs/claude-code
- **官方最佳实践**(强烈推荐通读):https://www.anthropic.com/engineering/claude-code-best-practices
- **认证与 API Key**:https://docs.claude.com/en/docs/claude-code/authentication
- **MCP 协议**:https://modelcontextprotocol.io/
