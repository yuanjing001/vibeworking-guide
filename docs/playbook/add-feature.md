---
type: scenario
audience: developer
level: L2
status: published
verified_at: 2026-10-20
prerequisites:
  - has:terminal
  - has:git
scenarios:
  - feature-dev
tools:
  - claude-code
methods:
  - task-decomposition
  - result-verification
---

# 实战剧本 · 加一个功能

> 真实场景演示。跟着走一遍,把"方法论"变成"肌肉记忆"。
>
> 本页是**工作流**。工具能力见 [Claude Code](/claude-code),拆解方法见 [调试与迭代](/workflow/iteration),执行前后安全检查见 [安全与验证](/safety)。

## 任务卡

| 项目 | 内容 |
|------|------|
| **产出物** | 一个带单元测试的新功能(`--verbose` flag) |
| **阶段** | Stage 2 · 可控 |
| **预计时长** | 60-90 分钟 |
| **难度** | ⭐⭐ 进阶 |
| **前置** | 会跑测试;项目已接入 Claude Code |
| **推荐工具** | [Claude Code](/claude-code) |
| **方法支撑** | [上下文管理](/workflow/context) · [AI 产物 Review](/workflow/review) |
| **验收标准** | 测试全绿;diff 经过 review;手动验证通过 |

## 场景

给一个 CLI 工具 `mytool` 加 `--verbose` flag,开启后打印所有内部调用细节。

| 项目 | 值 |
|------|---|
| 现有技术栈 | Go 1.22 + cobra |
| 项目结构 | `cmd/mytool/main.go` · `internal/runner/runner.go` |
| 测试 | `go test ./...` |
| 期望 | `mytool run --verbose` 打印每个步骤的输入输出 |

## Step 0:准备

确认 `CLAUDE.md` 至少包含:

```markdown
## 项目
- 技术栈:Go 1.22 + cobra
- 启动:go run ./cmd/mytool
- 测试:go test ./...

## 协作规则
- 改之前先 Plan Mode
- 优先小 commit,每个 commit 跑测试
- 不动 cmd/mytool/main.go 以外的 main 入口
```

## Step 1:Plan Mode 拆任务

按 `Shift+Tab` 进入 Plan Mode。发给 AI:

```
任务:给 mytool 加 --verbose flag。
要求:
1. 顶层 cobra flag,bind 到 internal/runner.Runner
2. verbose=true 时,runner 每个 step 前后打印 "→ input" / "← output"
3. 加单元测试覆盖 verbose=true 和 false 两种路径
4. 现有测试不能挂

输出:先列改动文件 + 每个文件的改动点 + 验证步骤。
```

AI 会给类似这样的计划:

```
改动清单:
- internal/runner/runner.go:加 Verbose bool 字段 + Printf
- cmd/mytool/main.go:cobra Flags().BoolVarP(...)
- internal/runner/runner_test.go:加 TestRunner_Verbose

验证:go test ./...
```

**审**:改动文件数 ≤ 3,符合预期。✅ 确认。

## Step 2:实现 + 验证

退出 Plan Mode(再按一次 `Shift+Tab`),让 AI 实现:

```
按计划实现。
要求:
- 提交前必须 go test ./... 全绿
- 每个文件单独 commit
```

**但别一口气全部做完** —— 按 [Context 管理](/workflow/context) 的建议,逐步独立验证:

### 2.1 先改 runner.go

```bash
git add internal/runner/runner.go
git diff --staged | claude -p "review 这段 diff,关注并发安全"
go test ./internal/runner/...
```

如果测试挂了,按 [迭代与调试](/workflow/iteration) 处理。

### 2.2 加 main.go 的 flag

```bash
git add cmd/mytool/main.go
go run ./cmd/mytool --verbose
# 手动确认 verbose 行为
```

### 2.3 加测试

```bash
git add internal/runner/runner_test.go
go test ./...
go test -race ./...  # 顺便跑竞态检测
```

### 2.4 commit

```bash
git commit -m "feat(runner): add --verbose flag with structured logging

- Add Verbose bool to Runner
- Bind cobra --verbose flag
- Print step input/output when enabled
- Add unit tests for both paths

Co-Authored-By: Claude <noreply@anthropic.com>"
```

## Step 3:Review

按 [AI 产物 Review](/workflow/review) 的清单过:

- [ ] 看 diff:`git show HEAD`
- [ ] 让另一个 AI review(可选):`git diff HEAD~1 | claude -p "review 这段 diff"`
- [ ] 跑完整测试:`go test ./...`
- [ ] 跑竞态:`go test -race ./...`
- [ ] 手动跑:`mytool --verbose` 实际看输出
- [ ] 危险信号表过一遍(见 [AI 产物 Review](/workflow/review#危险信号表-必看))

## Step 4:反思

发给自己或团队:

```
本次 Prompt 哪里起效?
- "先列改动文件" 让 AI 不用 100 行再返工
- "每个文件单独 commit" 强制小改动
- "跑 -race" 是自己加的,AI 没主动加

沉淀进 CLAUDE.md:
- 任何新增 flag,必须加单元测试(已加)
- PR 必须包含 go test -race 结果(建议加)
```

## 真实案例

- [给开源云盘 Cloudreve 加 AI 对话功能](https://lcnziv86vkx6.feishu.cn/wiki/YIxGw6iCBi6WbYko7uiccnrZneh)—— 在已有 Go + React 代码库上加功能,和本剧本是同一套路径
- 更多案例导读:[TRAE 实战案例精选](/trae-cases)

## 复盘:这个剧本的"套路"

| 套路 | 为什么 |
|------|--------|
| Plan Mode 拆任务 | 减少返工 |
| 改一个验证一个 | context 不爆,问题早发现 |
| 每步独立 commit | 错了能精准回滚 |
| Review + 反思 | 沉淀经验 |

任何"加功能"任务都能套这套。

## 外部参考

- **Claude Code Plan Mode 详解**:官方文档相关章节
- **Conventional Commits 规范**:https://www.conventionalcommits.org/
- **Go Race Detector**:https://go.dev/blog/race-detector
- **飞书 AI 编程实战指南**:https://lcnziv86vkx6.feishu.cn/wiki/Tg3UwWII2iob9DkMvquc28XWnNc —— 其「实战案例」章节有更多类似剧本