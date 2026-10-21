---
type: reference
audience: both
level: L2
status: published
verified_at: 2026-10-20
prerequisites:
  - has:ai-basics
---

# 常见问题

排错顺序:环境 → 认证 → 工具链 → AI 行为。

## `claude` / `trae` 命令找不到

排查:

```bash
node -v          # 应 ≥ 20
which node npm   # 应有路径
npm root -g      # 全局 bin 在哪
echo "$PATH"     # 全局 bin 在 PATH 里吗
```

| 原因 | 解法 |
|------|------|
| Node 没装 | `brew install node` 或 [官网 LTS](https://nodejs.org/) |
| Node 太旧 | 装 Node 22+ |
| npm 全局 bin 不在 PATH | 用 Homebrew / nvm 装 Node |

## 浏览器登录打不开(WSL / 远程)

Claude Code 会给一个 URL,复制到本机浏览器完成登录。

## `.env` 不生效

按这个顺序排查:

1. 该目录是否被工具标记为"信任目录"?
2. key 是否写在正确的位置?
3. 改完是否重开了终端?

## Windows setx 后 WSL 里读不到

Windows 环境变量不会自动同步到 WSL。在 WSL 的 `~/.bashrc` 里再 `export` 一次:

```bash
echo 'export ANTHROPIC_API_KEY="..."' >> ~/.bashrc
source ~/.bashrc
```

## `npm install -g` 报权限错误(EACCES)

**不要**用 `sudo npm -g`。换种方式装 Node:

| 系统 | 推荐方式 |
|------|---------|
| macOS | Homebrew:`brew install node` |
| Linux / WSL | nvm |

## MCP 启动失败 / Connection closed

高频原因:Node 版本过低 / Windows stdio 问题(改 WSL2) / 缺少 MCP 依赖。

排查:先在终端单独跑一遍 MCP 命令看具体报错,再回到工具里启用。

## AI "降智"了

90% 的"降智"都是用法问题,详见 [迭代与调试](/workflow/iteration#ai-降智-的诊断表)。

## AI 写的周报像流水账,怎么办?

问题通常不在工具,在方法 —— 没有先定义「什么算成果」。先读 [写好一份周报](/playbook/weekly-report) 的方法篇,再改提示词:把「结果 + 数据 + 价值」和「不许编」写进约束。

## Trae IDE Composer 卡住

- 文件太大,拆开改
- 网络弱,稍等重试
- prompt 写更具体

## 平台兼容速查

| 工具 | macOS | Windows 原生 | WSL2 |
|------|-------|-------------|------|
| Claude Code | ✅ | ⚠️ | ✅ |
| Trae IDE | ✅ | ✅ | ⚠️ |

## 外部参考

- **Claude Code 故障排查**:https://docs.claude.com/en/docs/claude-code
- **Trae IDE 常见问题**:https://docs.trae.ai/
- **MCP 故障排查**:https://modelcontextprotocol.io/
- **飞书 AI 编程实战指南**:https://lcnziv86vkx6.feishu.cn/wiki/Tg3UwWII2iob9DkMvquc28XWnNc —— 其「常见报错」「环境问题」相关章节是本章的延伸阅读