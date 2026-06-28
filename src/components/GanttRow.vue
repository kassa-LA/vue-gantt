<script setup lang="ts">
import { computed } from 'vue'
import type { GanttGroup, GanttItem, GanttBackground, GanttZoom } from '../types'
import GanttBar from './GanttBar.vue'

const props = defineProps<{
  group: GanttGroup
  items: GanttItem[]
  backgrounds: GanttBackground[]
  labelWidth: number
  totalWidth: number
  pxPerDay: number
  windowStart: Date
  days: Date[]
  zoom: GanttZoom
}>()

function parseDate(s: string): Date {
  const parts = s.split('-').map(Number)
  return new Date(parts[0]!, parts[1]! - 1, parts[2]!)
}

function dateToX(dateStr: string): number {
  const date = parseDate(dateStr)
  const diffMs = date.getTime() - props.windowStart.getTime()
  return (diffMs / 86400000) * props.pxPerDay
}

function itemLeft(start: string): number {
  return Math.max(0, dateToX(start))
}

function itemWidth(start: string, end: string): number {
  const l = dateToX(start)
  const r = dateToX(end) + props.pxPerDay  // end is inclusive → +1 day width
  return Math.max(0, Math.min(props.totalWidth, r) - Math.max(0, l))
}

function isVisible(start: string, end: string): boolean {
  const s = parseDate(start)
  const e = parseDate(end)
  const we = new Date(props.windowStart)
  we.setDate(we.getDate() + props.days.length)
  return e >= props.windowStart && s < we
}

const visibleItems = computed(() => props.items.filter(i => isVisible(i.start, i.end)))
const visibleBg = computed(() => props.backgrounds.filter(b => isVisible(b.start, b.end ?? b.start)))

const isToday = (date: Date): boolean => {
  const now = new Date()
  return date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
}
const isWeekend = (date: Date): boolean => date.getDay() === 0 || date.getDay() === 6

const showLabel = computed(() => props.zoom !== 'year')
</script>

<template>
  <div class="gantt-row">
    <div class="gantt-label-cell" :style="{ width: labelWidth + 'px' }">
      <span class="gantt-label-text">{{ group.label }}</span>
    </div>
    <div class="gantt-track" :style="{ width: totalWidth + 'px' }">
      <!-- Per-day backgrounds (weekends + today) -->
      <div
        v-for="(day, i) in days"
        :key="i"
        class="gantt-day-bg"
        :class="{
          'gantt-weekend': isWeekend(day),
          'gantt-today': isToday(day),
        }"
        :style="{ left: (i * pxPerDay) + 'px', width: pxPerDay + 'px' }"
      />
      <!-- Background items (Feiertage) -->
      <div
        v-for="bg in visibleBg"
        :key="bg.id"
        class="gantt-bg-item"
        :data-tooltip="bg.label"
        :style="{
          left: itemLeft(bg.start) + 'px',
          width: itemWidth(bg.start, bg.end ?? bg.start) + 'px',
        }"
      />
      <!-- Absence bars -->
      <GanttBar
        v-for="item in visibleItems"
        :key="item.id"
        :item="item"
        :left="itemLeft(item.start)"
        :width="itemWidth(item.start, item.end)"
        :showLabel="showLabel"
      />
    </div>
  </div>
</template>
