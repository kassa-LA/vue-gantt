<script setup lang="ts">
import type { GanttItem } from '../types'

defineProps<{
  item: GanttItem
  left: number
  width: number
  showLabel: boolean
}>()
</script>

<template>
  <div
    class="gantt-bar"
    :class="item.className"
    :style="{
      position: 'absolute',
      left: left + 'px',
      width: width + 'px',
      top: 'calc((var(--gantt-row-height) - var(--gantt-bar-height)) / 2)',
      transform: 'none',
    }"
    :data-tooltip="item.tooltip || item.label"
  >
    <span v-if="showLabel && width > 32" class="gantt-bar-label">{{ item.label }}</span>
  </div>
</template>
