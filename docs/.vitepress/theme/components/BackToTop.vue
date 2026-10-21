<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import { stripBase } from '../content-map'

const route = useRoute()

// 滚动进度:0 → 1,用于环形指示
const progress = ref(0)
// 是否显示按钮
const shown = ref(false)

let ticking = false

const pagePath = computed(() => stripBase(route.path))
const isHome = computed(() => pagePath.value === '/')
const isNotFound = computed(() => pagePath.value.includes('404'))
const visible = computed(() => shown.value && !isHome.value && !isNotFound.value)

// 进度环:半径 15,周长 ≈ 94.25
const RADIUS = 15
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const dashOffset = computed(() => CIRCUMFERENCE * (1 - progress.value))

function measure() {
  const doc = document.documentElement
  const scrollTop = window.scrollY || doc.scrollTop
  const scrollHeight = doc.scrollHeight - window.innerHeight

  progress.value = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0
  // 滚过一屏才出现
  shown.value = scrollTop > window.innerHeight * 0.8

  ticking = false
}

function onScroll() {
  if (ticking) return
  ticking = true
  // 用 setTimeout 而非 requestAnimationFrame:rAF 在后台标签页会挂起,
  // 用户切回前台时按钮状态会长时间不同步。
  window.setTimeout(measure, 80)
}

function scrollToTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
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

// 切换页面后滚动位置会重置,重新计算一次
watch(
  () => route.path,
  () => measure(),
)
</script>

<template>
  <Transition name="back-to-top-fade">
    <button
      v-if="visible"
      class="back-to-top"
      type="button"
      aria-label="回到顶部"
      @click="scrollToTop"
    >
      <svg class="back-to-top-ring" viewBox="0 0 36 36" aria-hidden="true">
        <circle class="back-to-top-track" cx="18" cy="18" :r="RADIUS" />
        <circle
          class="back-to-top-bar"
          cx="18"
          cy="18"
          :r="RADIUS"
          :stroke-dasharray="CIRCUMFERENCE"
          :stroke-dashoffset="dashOffset"
        />
      </svg>
      <svg class="back-to-top-arrow" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 19V5M5 12l7-7 7 7"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span class="back-to-top-label" aria-hidden="true">回到顶部</span>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 30;

  display: grid;
  place-items: center;

  width: 44px;
  height: 44px;

  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(8px);

  color: var(--vp-c-text-2);
  cursor: pointer;
  transition:
    color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s;
}

.back-to-top:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.2);
  transform: translateY(-2px);
}

.back-to-top:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

/* 进度环铺满按钮,随滚动进度填充 */
.back-to-top-ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.back-to-top-track {
  fill: none;
  stroke: var(--vp-c-divider);
  stroke-width: 2;
}

.back-to-top-bar {
  fill: none;
  stroke: var(--vp-c-brand-1);
  stroke-width: 2;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.1s linear;
}

.back-to-top-arrow {
  width: 18px;
  height: 18px;
  position: relative;
}

/* hover 时在按钮上方浮出标签,不影响按钮本身的布局 */
.back-to-top-label {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);

  padding: 4px 9px;
  border-radius: 6px;
  background-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);

  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  white-space: nowrap;
  color: #fff;

  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.back-to-top:hover .back-to-top-label,
.back-to-top:focus-visible .back-to-top-label {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* 出现 / 消失 */
.back-to-top-fade-enter-active,
.back-to-top-fade-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.back-to-top-fade-enter-from,
.back-to-top-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 639px) {
  .back-to-top {
    right: 16px;
    bottom: 16px;
    width: 40px;
    height: 40px;
  }

  /* 触屏没有 hover,标签始终隐藏 */
  .back-to-top-label {
    display: none;
  }
}
</style>
