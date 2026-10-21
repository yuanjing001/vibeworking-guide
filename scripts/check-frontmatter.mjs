// Frontmatter 词表校验:确保「受控词表」真的是受控的。
// 用法: node scripts/check-frontmatter.mjs
// 退出码非 0 表示有非法值 —— build 会因此失败。

import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const DOCS = new URL('../docs/', import.meta.url).pathname

// ── 受控词表 ──────────────────────────────────────────────
const VOCAB = {
  type: ['concept', 'tool', 'scenario', 'method', 'reference', 'index'],
  audience: ['workplace', 'developer', 'both'],
  level: ['L1', 'L2', 'L3', 'L4'],
  status: ['draft', 'review', 'published'],
  paradigm: ['2.1', '2.2', '2.3', '2.4', '2.5'],
}

// prerequisites 用 has: 前缀的受控词表
const PREREQ = [
  'has:none',
  'has:ai-basics',
  'has:office',
  'has:code-reading',
  'has:terminal',
  'has:git',
  'has:testing',
  'has:node',
  'has:mcp',
]

// tools 必须是已知工具 id(与文件名对应)
const KNOWN_TOOLS = ['claude-code', 'trae-ide', 'workbuddy', 'deepseek-harness']

const REQUIRED = ['type', 'audience', 'level', 'status']

// ── 极简 YAML frontmatter 解析(只支持本项目用到的子集) ──
function parseFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return null
  const end = raw.indexOf('\n---', 4)
  if (end === -1) return null

  const lines = raw.slice(4, end).split('\n')
  const data = {}
  let listKey = null

  for (const line of lines) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue

    // 列表项 "- value"
    const listItem = line.match(/^\s+-\s+(.+)$/)
    if (listItem && listKey) {
      data[listKey].push(listItem[1].trim())
      continue
    }

    // 键值 "key: value" / "key:"(空值意味着随后是列表)
    const kv = line.match(/^([a-z_]+):\s*(.*)$/)
    if (!kv) continue

    const [, key, value] = kv
    if (value === '') {
      data[key] = []
      listKey = key
    } else if (value === '[]') {
      // 行内空数组
      data[key] = []
      listKey = null
    } else {
      data[key] = value
      listKey = null
    }
  }
  return data
}

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (entry.name.endsWith('.md')) yield full
  }
}

// ── 校验 ──────────────────────────────────────────────────
const errors = []
const warnings = []
let checked = 0

for (const file of walk(DOCS)) {
  // 首页由 VitePress layout 提供,豁免 frontmatter 要求
  if (relative(DOCS, file) === 'index.md') continue

  const raw = readFileSync(file, 'utf8')
  const rel = relative(DOCS, file)
  const fm = parseFrontmatter(raw)

  if (!fm) {
    errors.push(`${rel}: 缺少 frontmatter`)
    continue
  }
  checked++

  for (const key of REQUIRED) {
    if (fm[key] === undefined) errors.push(`${rel}: 缺少必填字段 ${key}`)
  }

  for (const [key, allowed] of Object.entries(VOCAB)) {
    const v = fm[key]
    if (v === undefined) continue
    const values = Array.isArray(v) ? v : [v]
    for (const item of values) {
      if (!allowed.includes(item)) {
        errors.push(`${rel}: ${key}="${item}" 不在受控词表 [${allowed.join(', ')}]`)
      }
    }
  }

  for (const p of fm.prerequisites ?? []) {
    if (!PREREQ.includes(p)) {
      errors.push(`${rel}: prerequisites "${p}" 不在受控词表 [${PREREQ.join(', ')}]`)
    }
  }

  for (const t of fm.tools ?? []) {
    if (!KNOWN_TOOLS.includes(t)) {
      errors.push(`${rel}: tools "${t}" 不是已知工具 id [${KNOWN_TOOLS.join(', ')}]`)
    }
  }

  // tool 类型必须有 paradigm 与 verified_at
  if (fm.type === 'tool') {
    if (!fm.paradigm) errors.push(`${rel}: type=tool 必须声明 paradigm`)
    if (!fm.verified_at) errors.push(`${rel}: type=tool 必须声明 verified_at`)
  }

  // verified_at 超过 180 天未复核 → 提醒
  if (fm.verified_at) {
    const days = (Date.now() - new Date(fm.verified_at).getTime()) / 86400000
    if (days > 180) {
      warnings.push(`${rel}: verified_at 已 ${Math.floor(days)} 天未复核(建议季度复核)`)
    }
  }
}

// ── 输出 ──────────────────────────────────────────────────
console.log(`检查了 ${checked} 篇内容页`)

if (warnings.length) {
  console.log(`\n⚠️  ${warnings.length} 条提醒:`)
  warnings.forEach((w) => {
    console.log(`  ${w}`)
  })
}

if (errors.length) {
  console.error(`\n❌ ${errors.length} 处错误:`)
  errors.forEach((e) => {
    console.error(`  ${e}`)
  })
  process.exit(1)
}

console.log('✅ Frontmatter 词表校验通过')
