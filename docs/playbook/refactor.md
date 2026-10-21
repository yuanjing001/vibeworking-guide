---
type: scenario
audience: developer
level: L3
status: published
verified_at: 2026-10-20
prerequisites:
  - has:terminal
  - has:git
  - has:testing
scenarios:
  - refactoring
tools:
  - claude-code
methods:
  - task-decomposition
  - result-verification
---

# 实战剧本 · 重构一段代码

> 重构的真理:**先有测试,再动代码**。否则你只是在"赌".
>
> 本页是**工作流**。工具能力见 [Claude Code](/claude-code),代码校验清单见 [AI 产物 Review](/workflow/review),执行前后安全检查见 [安全与验证](/safety)。

## 任务卡

| 项目 | 内容 |
|------|------|
| **产出物** | 行为零变化的重构 + 测试全绿 |
| **阶段** | Stage 2 · 可控(偏进阶) |
| **预计时长** | 1-2 小时 |
| **难度** | ⭐⭐⭐ 挑战 |
| **前置** | 现有测试覆盖关键路径;能用 git 回滚 |
| **推荐工具** | [Claude Code](/claude-code) |
| **方法支撑** | [AI 产物 Review](/workflow/review) · [调试与迭代](/workflow/iteration) |
| **验收标准** | 所有测试不变且通过;每步可回滚;行为零变化 |

## 场景

`internal/runner/runner.go` 里的 `Run()` 函数已经 200+ 行,做 5 件事:参数解析、IO 准备、3 步流水线、错误聚合。圈复杂度 28。该拆。

| 项目 | 值 |
|------|---|
| 现有技术栈 | Go 1.22 |
| 目标 | 单一职责,每个步骤独立函数,Run() 只做编排 |
| 测试现状 | `runner_test.go` 已有 4 个 case,覆盖 happy path + 2 个错误 |

## Step 0:前置条件检查

**没测试不重构。** 没测试就先补测试,再谈重构。

```bash
go test -cover ./internal/runner/...
# 当前覆盖率 67%
```

67% 不算高,但 happy path + 2 个错误已覆盖,够支撑本次重构。如果覆盖率 < 50%,**先别重构**,补测试优先。

## Step 1:Plan Mode 拆步骤

按 `Shift+Tab`。给 AI:

```
范围:internal/runner/runner.go 的 Run() 函数(200+ 行,5 件事)。
目标:拆成 5 个独立函数,Run() 只做编排。
约束:
- 行为零变化(所有现有测试不变、不挂)
- 每个新函数 ≤ 50 行
- 公共依赖走 interface(便于 mock)
- 一次只拆一个,每步独立 commit

输出:5 个步骤清单 + 每个步骤的"前置 / 改动 / 验证"。
```

AI 会给类似:

```
Step 1:抽出 parseArgs()(无依赖,纯函数,最容易)
Step 2:抽出 prepareIO()(依赖 fs,需小接口)
Step 3:抽出 stepA / stepB / stepC(各自单一职责)
Step 4:Run() 改成 5 行编排
Step 5:补 3 个新函数的单元测试,覆盖率 80%+
```

## Step 2:逐步执行

### 2.1 Step 1:抽出 parseArgs

```
执行 Step 1:抽出 parseArgs。
要求:
- 把 Run() 里参数解析的逻辑全部移过去
- Run() 里只留 1 行:args, err := parseArgs(...)
- 现有测试 go test ./... 不挂
- commit message 写清楚
```

```bash
go test ./...
git add -p
git diff --staged | claude -p "review 这段 diff,关注行为等价性"
git commit -m "refactor(runner): extract parseArgs from Run()"
```

### 2.2 Step 2:prepareIO

**先扩测试**:

```
执行 Step 2 之前:为 prepareIO 写一个失败用例
(确保重构前后行为一致)
```

然后执行 Step 2。重复"扩测试 → 改 → 验证 → commit"循环。

### 2.3 Step 3-5:同理

每个步骤独立 commit,每个 commit 跑测试 + 看 diff。

## Step 3:重构后的验证

```bash
# 1. 全量测试 + 覆盖率
go test ./... -cover
# 目标:覆盖率 ≥ 80%

# 2. Race 检测
go test -race ./...

# 3. 行为对比(可选:跑 benchmark 确认无性能退化)
go test -bench=. ./internal/runner/...

# 4. 静态分析
go vet ./...
staticcheck ./...  # 如果用了的话

# 5. 让 AI 整体 Review 一次
git diff main..HEAD | claude -p "refactor 评审:行为等价 / 单一职责 / 可测性"
```

## Step 4:沉淀

### 4.1 CLAUDE.md 加规则

```markdown
## 重构规则
- 重构前必须有 ≥ 70% 测试覆盖
- 重构一次只动一个抽象
- 每个 commit 行为零变化(测试不挂)
- 重构后覆盖率必须升(不得降)
```

### 4.2 反思清单

```
本次重构:
- 耗时:2h(其中 30min 是补测试)
- 重构后 Run() 行数:200 → 12
- 圈复杂度:28 → 5
- 覆盖率:67% → 82%

下次可改进:
- 应该先用 gocyclo / fieldlint 看具体高复杂度点
- 应该在补测试时就加 benchmark,避免"事后追性能"
```

## 复盘:重构的 5 条铁律

| 铁律 | 为什么 |
|------|--------|
| **先测后改** | 没测试重构 = 盲改 |
| **小步走** | 每步可回滚、可验证 |
| **行为零变化** | 重构不是改需求 |
| **覆盖率只升不降** | 重构是改善结构,不能丢质量 |
| **别跨 commit 重构 + 改需求** | 出了问题分不清是哪个 commit 的锅 |

## 反模式

| 反模式 | 为什么错 |
|--------|---------|
| 一口气把整个文件重构 | 出问题无法定位 |
| 重构时顺手"优化"逻辑 | 行为变化无法 review |
| 用 AI 一把梭 | AI 不知道你的历史约定 |
| 重构完了不跑 race detector | 并发 bug 可能趁机溜进 |
| 重构完覆盖率掉了 | 新结构不可测 |

## 外部参考

- **Refactoring(经典书)**:Martin Fowler 的"Refactoring"—— 第二章"重构原则"必读
- **Go 重构工具**:`gofmt -r`、`gocyclo`、`fieldlint`、`staticcheck`
- **测试覆盖率工具**:Go 内置 `go test -cover`,可视化用 `go-cover-ui`
- **飞书 AI 编程实战指南**:https://lcnziv86vkx6.feishu.cn/wiki/Tg3UwWII2iob9DkMvquc28XWnNc —— 其「代码重构」「测试驱动」相关章节是本章的延伸阅读