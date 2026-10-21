# vibe-work-guide

> Vibe Working 人机协同指南 · 人机协同工作范式(人主导方向 + AI 承担执行 + 多轮迭代共创)

[![Built with VitePress](https://img.shields.io/badge/Built%20with-VitePress-blueviolet)](https://vitepress.dev/)
[![Deploy to GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-success)](https://pages.github.com/)
[![License: 内容 CC BY-NC-SA 4.0](https://img.shields.io/badge/content-CC%20BY--NC--SA%204.0-lightgrey)](./LICENSE)
[![License: 代码 MIT](https://img.shields.io/badge/code-MIT-blue)](./LICENSE-CODE)

## 这是什么

以 **人机协同工作范式**为主线的人机协同指南,不以单一工具为中心。

- 不做「Cursor 从入门到精通」式的工具说明书
- 工具只是实现范式的载体,换工具,方法论照样成立
- **方法优先,工具为载体**:场景内容统一「方法篇(什么算好)+ 工具篇(怎么用 AI 做到)」;工具换代,方法与判断标准不换
- **任务制学习路径**:3 个阶段(能用 → 可控 → 可复用),一条路线;每个任务都有任务卡(产出物 / 时长 / 难度 / 验收)
- **泛职场,不按职业分轨**:面向所有想用 AI 把工作做得更好的人;写作、数据、工程只是不同的任务场景,编程只是其中一种形式
- **安全与验证横向贯穿所有层次**,不是某一章

> **术语**:推荐使用「人机协同工作范式」,而非「氛围式协同」—— 后者容易与「氛围式编程」混淆。

## 5 层架构 + 2 条贯穿原则

```
第 5 层  底层基建     Agent Runtime 底座、基准评测、私有部署、团队级落地
第 4 层  进阶方法论   任务拆解、多 Agent 协同、提示词工程、MCP 生态
第 3 层  场景实践     写作 / 文档 / 数据 / 工程 / 自动化
第 2 层  工具范式     5 大类工具图谱
第 1 层  基础认知     定义、人机分工、通用底层能力

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
主线原则  方法优先,工具为载体   ← 决定每篇场景内容的写法
横向原则  安全与验证 · 结果校验   ← 贯穿以上所有层次
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**五层是内容的组织层次,不是学习顺序。** 每篇内容都标注 `prerequisites`,读者按需进入。

**站点分两层呈现**:前台是「任务入口 + 学习地图」,后台是「知识库」(基础认知 / 工具图谱 / 方法论 / 安全)。**首页先给任务,不给体系** —— 读者选一个真实任务,照任务卡做完,再回来看方法。

**内容优先的阅读外壳**:阅读页不设左侧栏,顶部导航负责全局可达;正文用面包屑 + 上一篇/下一篇维持阅读顺序,右侧只保留本页大纲。

**方法优先**的落点是写法:工具决定做多快,判断决定做多好。所以场景内容先讲「什么算好」,再讲「怎么用 AI 做到」;工具换代,上半篇不用重写。

## 工具图谱(5 大类,共 8 个项目)

| 类 | 判断核心 | 已上线词条 |
|----|---------|-----------|
| **2.1** CLI 编码 Agent | 终端交互与代码任务工作流 | [Claude Code](https://docs.claude.com/en/docs/claude-code) |
| **2.2** AI 原生 IDE | 编辑器内的项目级开发协作 | [Trae IDE](https://www.trae.ai/) |
| **2.3** 成品办公 Agent 工作台 | 预制办公任务与交付工作流 | [WorkBuddy](https://www.workbuddy.cn/) |
| **2.4** 多模型聚合通用 Agent | 通用工作台形态与模型接入机制 | —(待验证) |
| **2.5** Agent Runtime 底座 | 面向 Agent 运行、编排与定制开发 | [DeepSeek Harness](https://deepseekharness.online/) |

分类不按厂商,按**形态与能力边界**。判定规则见站内[基础认知 · 判定规则](docs/concepts.md)。

## 学习路径(三段)

只讲三段;「入门 / 熟练 / 进阶 / 专家」这套刻度不用背,完整路线与验收标准见站内[学习路径](docs/learning-map.md)。

| 段 | 你会做到 | 主要内容 | 产出 |
|----|---------|---------|------|
| **第 1 部分 · 基础认知** | 分清人机分工,知道 AI 在哪会编 | 基础认知 + 快速开始 | 一个真实的、能交付的产出 |
| **第 2 部分 · 工具主线** | 把 1-2 个主流工具练到 L3/L4 | 进阶模型 + 4 个工具练习清单 | 模板 + 避坑清单 + 自动化流程 |
| **第 3 部分 · 补充与实战** | 稳定交付、能验收、能沉淀 | 安全与验证 + 方法论 + 实战剧本 | 完整工作流 + 自己的验收清单 |

## 内容元数据

每篇内容带 frontmatter,由 `pnpm check:meta` 在构建时校验受控词表:

```yaml
type: tool | scenario | method | concept | reference | index
audience: workplace | developer | both
level: L1 | L2 | L3 | L4
status: draft | review | published
paradigm: 2.1 ~ 2.5        # type=tool 必填
prerequisites: [has:terminal, ...]
verified_at: 2026-10-20    # type=tool 必填,超 180 天提醒复核
```

**三类内容实体不互相复制**:工具资料 / 场景工作流 / 方法论资产,通过链接与元数据关联。工具更新只改工具词条一处。

> **关于 `audience`**:该字段只描述内容的典型工作场景(`workplace` = 办公场景,`developer` = 代码与工程场景,`both` = 跨场景通用),**不代表站点按人群分轨**。

## 本地开发

```bash
pnpm install
pnpm docs:dev      # http://localhost:5173
pnpm check:meta    # 校验 frontmatter 受控词表
pnpm docs:build    # 校验元数据 + 构建静态站点
```

需要 Node.js 20+。

## 部署

push 到 `main` 分支会触发 GitHub Actions,自动部署到 GitHub Pages。

第一次部署需在仓库 Settings → Pages → Source 选 **GitHub Actions**。

## 内容地图

```
├── 学习路径
│   ├── 学习路径总览(基础认知 → 工具主线 → 补充与实战)
│   ├── 基础认知 / 快速开始 / 从这开始
│   ├── 工具主线:把主流工具用透(WorkBuddy 10 个配方 / Trae 案例精选 / Claude Code / Harness)
│   └── 模型怎么选(7 个场景 + 5 个判断问题,跨工具通用)
├── 实战任务(按工作场景组织,不分职业)
│   ├── 写作:写好一份周报(方法篇 + 工具篇)
│   └── 代码与工程:加一个功能 / 修一个 Bug / 重构一段代码
├── 知识库
│   ├── 基础认知 + 技术概念速查
│   ├── 安全与验证
│   ├── 工具范式(2.1 / 2.2 / 2.3 / 2.5)
│   └── 进阶方法论(Prompt / Context / 迭代 / Review)
└── 关于
    ├── 体系说明(5 层架构、工具图谱、更新日志)
    └── FAQ / 资源索引
```

## 贡献

新增内容需满足三要素:属于 Vibe Working 范畴、能归入 5 层架构、有明确的适用场景与一个真实任务。

新增文件请带合法 frontmatter,并通过 `pnpm check:meta`。

欢迎 PR。

## License

本仓库采用**双协议**,内容与代码分开授权:

| 范围 | 协议 |
|------|------|
| `docs/**` 的 Markdown 内容与插图 | [CC BY-NC-SA 4.0](./LICENSE) |
| `.vitepress/**`、`scripts/**`、构建配置 | [MIT](./LICENSE-CODE) |

代码不用 CC 协议 —— CC 不授予专利许可,且 NC / SA 条款会让代码无法合并进常规开源项目。

复用**内容**时请注明出处:`vibe-work-guide contributors` + 仓库链接,并说明是否做过改编;若改编后公开分发,需以相同协议发布。
