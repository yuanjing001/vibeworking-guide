<script setup lang="ts">
import { withBase } from 'vitepress'

interface MapTask {
  tag: string
  tone: string
  text: string
  note: string
  href?: string
}

interface MapStage {
  id: string
  meta: string
  name: string
  title: string
  color: string
  tasks: MapTask[]
}

const stages: MapStage[] = [
  {
    id: 'part-1',
    meta: 'PART 1 · 1-2 小时',
    name: '基础认知',
    title: '先搞懂人机分工里你负责什么',
    color: '#6366f1',
    tasks: [
      {
        tag: '认知',
        tone: '#6366f1',
        text: '基础认知',
        note: '人机分工、AI 会编、验收标准',
        href: '/concepts',
      },
      {
        tag: '准备',
        tone: '#64748b',
        text: '快速开始',
        note: '选一个真实任务,装好工具',
        href: '/getting-started',
      },
    ],
  },
  {
    id: 'part-2',
    meta: 'PART 2 · 1-2 周',
    name: '工具主线',
    title: '把 1-2 个主流工具用透',
    color: '#8b5cf6',
    tasks: [
      {
        tag: '方法',
        tone: '#64748b',
        text: '工具主线 · 进阶路线',
        note: '4 级进阶模型 + 每工具练习清单',
        href: '/tool-mastery',
      },
      {
        tag: '模型',
        tone: '#64748b',
        text: '模型怎么选',
        note: '7 个场景 + 5 个判断问题',
        href: '/model-selection',
      },
      {
        tag: '办公',
        tone: '#6366f1',
        text: 'WorkBuddy',
        note: '办公 Agent 工作台',
        href: '/workbuddy',
      },
      {
        tag: 'IDE',
        tone: '#8b5cf6',
        text: 'Trae IDE',
        note: '编辑器内项目协作',
        href: '/trae-ide',
      },
      {
        tag: 'CLI',
        tone: '#0ea5e9',
        text: 'Claude Code',
        note: '终端里的编码 Agent',
        href: '/claude-code',
      },
      {
        tag: 'Runtime',
        tone: '#f59e0b',
        text: 'DeepSeek Harness',
        note: '定制自己的 Agent',
        href: '/deepseek-harness',
      },
    ],
  },
  {
    id: 'part-3',
    meta: 'PART 3 · 持续',
    name: '补充与实战',
    title: '安全、方法、真实任务',
    color: '#0ea5e9',
    tasks: [
      {
        tag: '安全',
        tone: '#ef4444',
        text: '安全与验证',
        note: '什么能做、什么必须人工确认',
        href: '/safety',
      },
      {
        tag: '方法',
        tone: '#64748b',
        text: '进阶方法论',
        note: 'Prompt / Context / 迭代 / Review',
        href: '/workflow/prompt',
      },
      {
        tag: '实战',
        tone: '#14b8a6',
        text: '真实任务剧本',
        note: '周报 / 加功能 / 修 Bug / 重构',
        href: '/playbook/weekly-report',
      },
      {
        tag: '自动化',
        tone: '#f59e0b',
        text: '自动化与团队沉淀',
        note: '定时任务 / MCP / 多 Agent / SOP',
        href: '/workbuddy',
      },
    ],
  },
]</script>

<template>
  <section class="learning-map" aria-label="学习路线图">
    <svg class="lm-compass" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" stroke-opacity="0.3" />
      <path d="M32 12 L36 31 L32 27 L28 31 Z" fill="currentColor" fill-opacity="0.85" />
      <path d="M32 52 L28 33 L32 37 L36 33 Z" fill="currentColor" fill-opacity="0.3" />
      <text x="32" y="9" text-anchor="middle">N</text>
    </svg>

    <header class="lm-head">
      <span class="lm-kicker">LEARNING ROUTE · 学习主线</span>
      <p class="lm-title">一条主线,三段学习</p>
      <p class="lm-desc">
        先建认知,再把工具用透,最后补上安全与验收。按顺序走,不用自己拼路径。
      </p>
    </header>

    <div class="lm-legend" aria-hidden="true">
      <span><i class="lm-key is-start" />起点</span>
      <span><i class="lm-key is-stage" />阶段站</span>
      <span><i class="lm-key is-task" />任务站</span>
      <span><i class="lm-key is-end" />终点</span>
    </div>

    <div class="lm-route">
      <a class="lm-start" :href="withBase('/concepts')">
        <span class="lm-start-dot" aria-hidden="true" />
        <span class="lm-start-body">
          <strong>起点 · 基础认知</strong>
          <small>先搞懂人机分工与验收,再碰工具。</small>
        </span>
      </a>

      <div
        v-for="stage in stages"
        :key="stage.id"
        class="lm-stage"
        :style="{ '--stage': stage.color }"
      >
        <a class="lm-stage-card" :href="`#${stage.id}`">
          <span class="lm-stage-meta">{{ stage.meta }}</span>
          <strong>{{ stage.name }} · {{ stage.title }}</strong>
          <small>查看阶段详情 ↓</small>
        </a>

        <div class="lm-branches">
          <template v-for="task in stage.tasks" :key="task.text">
            <a
              v-if="task.href"
              class="lm-task"
              :style="{ '--tag': task.tone }"
              :href="withBase(task.href)"
            >
              <span class="lm-task-tag">{{ task.tag }}</span>
              <strong>{{ task.text }}</strong>
              <small>{{ task.note }}</small>
            </a>
            <div v-else class="lm-task is-pending" :style="{ '--tag': task.tone }">
              <span class="lm-task-tag">{{ task.tag }}</span>
              <strong>{{ task.text }}</strong>
              <small>{{ task.note }}</small>
            </div>
          </template>
        </div>
      </div>

      <div class="lm-terminus">
        <span class="lm-end-dot" aria-hidden="true" />
        <div class="lm-terminus-body">
          <span class="lm-kicker">TERMINUS · 终点</span>
          <strong>属于自己的工作系统</strong>
          <small>
            三段走完,你得到的不是一堆工具技巧,而是一套自己的判断、流程和验收标准。
          </small>
        </div>
      </div>
    </div>

    <p class="lm-footnote">VW · ROUTE 01 · 3 PARTS · 认知 → 工具 → 补充 · 点击站点跳转</p>
  </section>
</template>

<style scoped>
.learning-map {
  position: relative;
  margin: 28px 0 44px;
  padding: 26px 26px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background-color: var(--vp-c-bg-soft);
  background-image:
    radial-gradient(
      color-mix(in srgb, var(--vp-c-text-3) 16%, transparent) 1px,
      transparent 1px
    ),
    linear-gradient(
      140deg,
      color-mix(in srgb, var(--vp-c-brand-1) 9%, transparent),
      transparent 46%
    );
  background-size: 20px 20px, 100% 100%;
  overflow: hidden;
}

.lm-compass {
  position: absolute;
  top: 22px;
  right: 22px;
  width: 54px;
  height: 54px;
  color: var(--vp-c-text-2);
  opacity: 0.8;
}

.lm-compass text {
  font-size: 9px;
  fill: currentColor;
  letter-spacing: 0.08em;
}

.lm-head {
  position: relative;
  z-index: 1;
  padding-right: 64px;
}

.lm-kicker {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--vp-c-text-3);
}

.lm-title {
  margin: 6px 0 4px;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.35;
  color: var(--vp-c-text-1);
}

.lm-desc {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.lm-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
  margin-top: 18px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.lm-legend span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.lm-key {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.lm-key.is-start {
  border: 2px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}

.lm-key.is-stage {
  background: #8b5cf6;
}

.lm-key.is-task {
  border: 2px solid #0ea5e9;
  background: var(--vp-c-bg);
}

.lm-key.is-end {
  background: linear-gradient(90deg, #6366f1, #0ea5e9);
}

.lm-route {
  position: relative;
  margin-top: 22px;
  padding-left: 34px;
}

/* 主线:一条从起点走到终点的路线 */
.lm-route::before {
  content: '';
  position: absolute;
  top: 18px;
  bottom: 26px;
  left: 13px;
  width: 3px;
  border-radius: 2px;
  background: linear-gradient(180deg, #6366f1, #8b5cf6 55%, #0ea5e9);
  opacity: 0.45;
}

.lm-start {
  position: relative;
  display: flex;
  gap: 10px;
  padding: 6px 8px 10px 0;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.lm-start-dot {
  position: absolute;
  top: 12px;
  left: -28px;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 4px solid var(--vp-c-brand-1);
  border-radius: 50%;
  background: var(--vp-c-bg);
}

.lm-start-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.lm-start-body strong {
  font-size: 15px;
  color: var(--vp-c-text-1);
}

.lm-start-body small {
  font-size: 12px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.lm-stage {
  position: relative;
  margin: 16px 0;
}

.lm-stage-card {
  position: relative;
  display: block;
  padding: 14px 18px;
  border: 1px solid color-mix(in srgb, var(--stage) 30%, var(--vp-c-divider));
  border-radius: 12px;
  background: color-mix(in srgb, var(--stage) 7%, var(--vp-c-bg));
  text-decoration: none;
  transition: border-color 0.2s, background 0.2s;
}

.lm-stage-card::before {
  content: '';
  position: absolute;
  top: 20px;
  left: -27px;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border: 3px solid var(--vp-c-bg);
  border-radius: 50%;
  background: var(--stage);
  box-shadow: 0 0 0 1px var(--stage);
}

.lm-stage-card:hover {
  border-color: var(--stage);
  background: color-mix(in srgb, var(--stage) 11%, var(--vp-c-bg));
}

.lm-stage-meta {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--stage);
}

.lm-stage-card strong {
  display: block;
  margin-top: 2px;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.lm-stage-card small {
  display: inline-block;
  margin-top: 4px;
  font-size: 12px;
  color: var(--stage);
}

/* 任务站:从主线分出来的支线 */
.lm-branches {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 10px 0 2px 20px;
  padding-left: 16px;
  border-left: 2px dashed color-mix(in srgb, var(--stage) 32%, transparent);
}

.lm-task {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: border-color 0.2s, transform 0.2s;
}

a.lm-task:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

.lm-task.is-pending {
  opacity: 0.72;
}

/* 任务数为奇数时,最后一张任务卡占满整行,避免地图上出现半截空位 */
.lm-branches > .lm-task:last-child:nth-child(odd) {
  grid-column: 1 / -1;
}

.lm-task-tag {
  align-self: flex-start;
  padding: 1px 8px;
  border: 1px solid color-mix(in srgb, var(--tag) 32%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--tag) 11%, transparent);
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--tag);
}

.lm-task strong {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.45;
}

.lm-task small {
  font-size: 12px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.lm-terminus {
  position: relative;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  margin-top: 18px;
  padding: 18px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, #6366f1 11%, var(--vp-c-bg)),
    color-mix(in srgb, #0ea5e9 11%, var(--vp-c-bg))
  );
}

.lm-terminus::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 3px;
  border-radius: 14px 14px 0 0;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #0ea5e9);
}

.lm-end-dot {
  flex: none;
  width: 16px;
  height: 16px;
  margin-top: 3px;
  border-radius: 50%;
  background: linear-gradient(90deg, #6366f1, #0ea5e9);
  box-shadow: 0 0 0 4px color-mix(in srgb, #6366f1 14%, transparent);
}

.lm-terminus-body {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.lm-terminus-body strong {
  font-size: 15px;
  color: var(--vp-c-text-1);
}

.lm-terminus-body small {
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.lm-footnote {
  margin: 14px 2px 0;
  font-size: 10.5px;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-3);
}

@media (max-width: 860px) {
  .learning-map {
    padding: 20px 16px 14px;
  }

  .lm-compass {
    display: none;
  }

  .lm-head {
    padding-right: 0;
  }

  .lm-title {
    font-size: 19px;
  }

  .lm-branches {
    grid-template-columns: 1fr;
  }
}
</style>
