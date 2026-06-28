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
    :style="{ left: left + 'px', width: width + 'px' }"
    :data-tooltip="item.tooltip || item.label"
  >
    <span v-if="showLabel && width > 32" class="gantt-bar-label">{{ item.label }}</span>
  </div>
</template>
