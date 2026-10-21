<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'

const props = defineProps<{
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping?: string
  strict?: string
  reactionsEnabled?: string
  emitMetadata?: string
  inputPosition?: string
  theme?: string
  lang?: string
}>()

const route = useRoute()
const containerRef = ref<HTMLDivElement | null>(null)

function loadGiscus() {
  if (!containerRef.value) return
  containerRef.value.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('data-repo', props.repo)
  script.setAttribute('data-repo-id', props.repoId)
  script.setAttribute('data-category', props.category)
  script.setAttribute('data-category-id', props.categoryId)
  script.setAttribute('data-mapping', props.mapping ?? 'pathname')
  script.setAttribute('data-strict', props.strict ?? '0')
  script.setAttribute('data-reactions-enabled', props.reactionsEnabled ?? '1')
  script.setAttribute('data-emit-metadata', props.emitMetadata ?? '0')
  script.setAttribute('data-input-position', props.inputPosition ?? 'bottom')
  script.setAttribute('data-theme', props.theme ?? 'light')
  script.setAttribute('data-lang', props.lang ?? 'zh-CN')

  containerRef.value.appendChild(script)
}

onMounted(() => {
  loadGiscus()
})

watch(
  () => route.path,
  () => {
    loadGiscus()
  },
)
</script>

<template>
  <div class="giscus-wrapper">
    <div ref="containerRef" class="giscus-container" />
  </div>
</template>

<style scoped>
.giscus-wrapper {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
}

.giscus-container {
  min-height: 200px;
}
</style>