<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const progress = ref(0)
let ticking = false

const visible = computed(() => route.path !== '/' && !route.path.includes('404'))

function measure() {
  const article = document.querySelector('.vp-doc')
  if (!article) return
  const rect = article.getBoundingClientRect()
  const total = rect.height - window.innerHeight + 240
  const scrolled = -rect.top + 120
  progress.value = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0
  ticking = false
}

function onScroll() {
  if (ticking) return
  ticking = true
  window.requestAnimationFrame(measure)
}

onMounted(() => {
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div
    v-if="visible"
    class="reading-progress"
    :style="{ transform: `scaleX(${progress})` }"
    aria-hidden="true"
  />
</template>
