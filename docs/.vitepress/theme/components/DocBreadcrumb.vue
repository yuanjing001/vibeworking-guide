<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { findContentItem } from '../content-map'

const route = useRoute()
const item = computed(() => findContentItem(route.path))
</script>

<template>
  <nav v-if="item" class="doc-breadcrumb" aria-label="页面位置">
    <a href="/">首页</a>
    <span class="sep" aria-hidden="true">/</span>
    <span>{{ item.group }}</span>
  </nav>
</template>
