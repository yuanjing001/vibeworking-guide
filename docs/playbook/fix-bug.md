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
  - bug-fix
tools:
  - claude-code
methods:
  - result-verification
  - iteration
---

# 实战剧本 · 修一个 Bug

> 修 bug 的核心不是"让 AI 改对",而是"让 bug 不再发生"。
>
> 本页是**工作流**。工具能力见 [Claude Code](/claude-code),调试方法见 [调试与迭代](/workflow/iteration),执行前后安全检查见 [安全与验证](/safety)。

## 任务卡

| 项目 | 内容 |
|------|------|
| **产出物** | 一个不再复发的 bug 修复 + 回归测试 |
| **阶段** | Stage 2 · 可控 |
| **预计时长** | 30-60 分钟 |
| **难度** | ⭐⭐ 进阶 |
| **前置** | 能稳定复现 bug;有测试或能补测试 |
| **推荐工具** | [Claude Code](/claude-code) |
| **方法支撑** | [调试与迭代](/workflow/iteration) · [安全与验证](/safety) |
| **验收标准** | 复现脚本不再挂;修复后测试全绿;能解释根因 |

## 场景

`mytool run` 在某次调用时偶发 `panic: runtime error: index out of range [3] with length 3`。

| 项目 | 值 |
|------|---|
| 现有技术栈 | Go 1.22 + cobra |
| 复现 | 大约 1/100 次,本地压测能稳定触发 |
| 日志 | 看到 stack trace 指向 `internal/parser/parser.go:87` |

## Step 0:复现 + 最小化

**没有稳定复现 = 没法验证修复**。第一步永远是:

```bash
# 写一个能稳定触发的脚本
cat > /tmp/repro.sh <<'EOF'
#!/bin/bash
for i in {1..200}; do
  ./mytool run --input "case-$i"
done
EOF
chmod +x /tmp/repro.sh
/tmp/repro.sh
```

确认能稳定触发(比如 200 次里能挂 2-3 次)。

## Step 1:给 AI 完整背景

```
Bug:parser 在某些输入下 index out of range。

复现:
- 命令:/tmp/repro.sh
- 频率:1/100 ~ 1/200
- 触发条件(猜测):input 含特殊字符 / 超长 / 边界值
- 日志:stack trace 指向 internal/parser/parser.go:87

已确认:
- 该函数没加单元测试
- line 87 是在做 [3] 切片

任务:
1. 先读 internal/parser/parser.go:80-95 和对应测试文件
2. 给出根因分析(2-3 个候选原因 + 你倾向哪个)
3. 给出最小修复方案 + 一个能稳定复现的单元测试
4. 跑 go test ./... 全绿 + 复现脚本 200 次不再 panic

输出:分析 → 测试 → 修复 → 验证结果。
```

## Step 2:Plan Mode 确认方案

按 `Shift+Tab` 进入 Plan Mode,等 AI 给根因分析。

**典型答**:
```
候选 1:line 87 在做 parts[3] 但 parts 实际只有 3 个元素 → 边界漏处理
候选 2:input 含多字节字符 → strings.Split 按 byte 切,误判长度
倾向 1,2 也可能叠加
修复:加 if len(parts) <= 3 { return ErrMalformed } 前置检查
测试:加 TestParser_ShortInput / TestParser_UnicodeInput
```

**审**:边界检查是社区共识 + Unicode 处理也对。✅ 确认。

## Step 3:实现

退出 Plan Mode,执行:

```
按计划实现,要求:
- 修复 patch 加注释解释为什么改
- 加 2 个新单测(短输入 / Unicode)
- 跑 go test ./...
- 再跑 /tmp/repro.sh 200 次,确认不再 panic
```

### 不要做的事

```bash
# ❌ 不要在大改动里改 bug
# (会引入更多问题,且难回滚)

# ❌ 不要"防御性编程"
if err != nil { return err }  # 不解决 index 越界
```

## Step 4:验证 + 复测

```bash
# 1. 单元测试
go test ./internal/parser/ -v
go test ./...               # 全量

# 2. Race 检测
go test -race ./...

# 3. 复现脚本
for i in 1 2 3; do /tmp/repro.sh; done  # 跑 3 轮共 600 次
```

**如果 600 次都没 panic,基本可以确认修复有效。**

## Step 5:沉淀

### 5.1 加进 CLAUDE.md

```markdown
## Bug 历史
- parser:输入边界 + Unicode 处理 — 必须前置检查长度

## 协作规则
- 修 bug 必须先写复现脚本(稳定触发)
- 修 bug 必须加回归测试
- 跑 go test -race ./... 再 commit
```

### 5.2 commit message 格式

```bash
git commit -m "fix(parser): prevent index out of range on short/unicode input

panic 出现在 parser.go:87 的 parts[3] 切片。
当输入 < 3 字段时直接 panic;多字节字符情况下错列。

- 加 len(parts) 前置检查
- 加 TestParser_ShortInput / TestParser_UnicodeInput 回归覆盖

复现脚本 200 次不再 panic。
"
```

## Step 6:Review

按 [AI 产物 Review](/workflow/review):

- [ ] 看 diff 范围是否只动了必要的行
- [ ] 危险信号表过一遍
- [ ] 让另一个 AI review:提示里强调"边界 + Unicode"
- [ ] 跑 race detector

## 复盘:修 bug 的反模式

| 反模式 | 为什么错 |
|--------|---------|
| 没复现就改 | 改完没法验证,可能改错 |
| 改动过大 | 引新问题,难回滚 |
| 加防御性 `if err != nil` | 不解决真问题,污染代码 |
| 不加回归测试 | 同样的 bug 还会回来 |
| 不沉淀进 CLAUDE.md | 团队其他人会踩同一个坑 |

## 外部参考

- **Go 错误处理最佳实践**:https://go.dev/blog/error-handling-and-go
- **Repro 技巧**:最小化用例是核心能力
- **飞书 AI 编程实战指南**:https://lcnziv86vkx6.feishu.cn/wiki/Tg3UwWII2iob9DkMvquc28XWnNc —— 其「Bug 定位」「回归测试」相关章节是本章的延伸阅读