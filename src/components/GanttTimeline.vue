<script setup lang="ts">
import { computed, ref } from 'vue'
import type { GanttGroup, GanttItem, GanttBackground, GanttZoom } from '../types'
import { useGanttLayout, localMidnight } from '../composables/useGanttLayout'
import GanttTimeAxis from './GanttTimeAxis.vue'
import GanttRow from './GanttRow.vue'

const props = withDefaults(defineProps<{
  groups: GanttGroup[]
  items: GanttItem[]
  backgrounds?: GanttBackground[]
  labelWidth?: number
  pxPerDay?: number
}>(), {
  backgrounds: () => [],
  labelWidth: 180,
  pxPerDay: undefined,
})

const zoom = defineModel<GanttZoom>('zoom', { default: 'month' })
const windowStart = defineModel<Date>('start', {
  default: () => localMidnight(),
})

const pxPerDayRef = computed(() => props.pxPerDay)
const layout = useGanttLayout(zoom, windowStart, pxPerDayRef)

const itemsByGroup = computed(() => {
  const map: Record<string, GanttItem[]> = {}
  for (const item of props.items) {
    if (!map[item.groupId]) map[item.groupId] = []
    map[item.groupId]!.push(item)
  }
  return map
})

function navigate(dir: -1 | 1) {
  const d = localMidnight(windowStart.value)
  d.setDate(d.getDate() + dir * layout.windowDays.value)
  windowStart.value = d
}

function goToday() {
  windowStart.value = localMidnight()
}
</script>

<template>
  <div class="gantt-root">
    <!-- Toolbar -->
    <div class="gantt-toolbar">
      <div class="gantt-nav">
        <button class="gantt-btn" @click="navigate(-1)">&#8249;</button>
        <button class="gantt-btn" @click="goToday">Heute</button>
        <button class="gantt-btn" @click="navigate(1)">&#8250;</button>
      </div>
      <div class="gantt-zoom-btns">
        <button class="gantt-btn" :class="{ 'gantt-btn-active': zoom === 'week' }" @click="zoom = 'week'">Woche</button>
        <button class="gantt-btn" :class="{ 'gantt-btn-active': zoom === 'month' }" @click="zoom = 'month'">Monat</button>
        <button class="gantt-btn" :class="{ 'gantt-btn-active': zoom === 'year' }" @click="zoom = 'year'">Jahr</button>
      </div>
    </div>

    <!-- Scrollable grid -->
    <div class="gantt-scroll">
      <div class="gantt-inner" :style="{ width: (props.labelWidth + layout.totalWidth.value) + 'px' }">

        <!-- Header: label placeholder + time axis -->
        <div class="gantt-header-row">
          <div class="gantt-label-cell gantt-label-header" :style="{ width: props.labelWidth + 'px' }" />
          <GanttTimeAxis
            :days="layout.days.value"
            :zoom="zoom"
            :pxPerDay="layout.pxPerDay.value"
            :totalWidth="layout.totalWidth.value"
          />
        </div>

        <!-- Data rows -->
        <GanttRow
          v-for="group in groups"
          :key="group.id"
          :group="group"
          :items="itemsByGroup[group.id] ?? []"
          :backgrounds="props.backgrounds"
          :labelWidth="props.labelWidth"
          :totalWidth="layout.totalWidth.value"
          :pxPerDay="layout.pxPerDay.value"
          :windowStart="windowStart"
          :days="layout.days.value"
          :zoom="zoom"
        />

        <div v-if="groups.length === 0" class="gantt-empty">Keine Daten</div>
      </div>
    </div>
  </div>
</template>
