<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, withBase } from 'vitepress'
import { contentMap, normalizePath, stripBase } from '../content-map'

const route = useRoute()

const index = computed(() =>
  contentMap.findIndex((item) => item.path === normalizePath(stripBase(route.path)))
)
const prev = computed(() => (index.value > 0 ? contentMap[index.value - 1] : null))
const next = computed(() =>
  index.value >= 0 && index.value < contentMap.length - 1
    ? contentMap[index.value + 1]
    : null
)
</script>

<template>
  <nav
    v-if="prev || next"
    class="doc-pager"
    :class="{ 'single-next': !prev, 'single-prev': !next }"
    aria-label="继续阅读"
  >
    <a v-if="prev" class="doc-pager-link prev" :href="withBase(prev.path)">
      <span class="label">← 上一篇</span>
      <span class="title">{{ prev.text }}</span>
      <span class="group">{{ prev.group }}</span>
    </a>
    <span v-else />

    <a v-if="next" class="doc-pager-link next" :href="withBase(next.path)">
      <span class="label">下一篇 →</span>
      <span class="title">{{ next.text }}</span>
      <span class="group">{{ next.group }}</span>
    </a>
  </nav>
</template>
