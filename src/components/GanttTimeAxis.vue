<script setup lang="ts">
import { computed } from 'vue'
import type { GanttZoom } from '../types'

const props = defineProps<{
  days: Date[]
  zoom: GanttZoom
  pxPerDay: number
  totalWidth: number
}>()

const DAY_NAMES = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
const MONTH_SHORT = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']

function getISOWeek(date: Date): number {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7))
  const week1 = new Date(d.getFullYear(), 0, 4)
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
}

const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6

// Month view: group consecutive days by ISO week
const weekGroups = computed(() => {
  const groups: { kw: number; days: Date[] }[] = []
  for (const day of props.days) {
    const kw = getISOWeek(day)
    const last = groups[groups.length - 1]
    if (last && last.kw === kw) {
      last.days.push(day)
    } else {
      groups.push({ kw, days: [day] })
    }
  }
  return groups
})

// Year view: group consecutive days by month
const monthGroups = computed(() => {
  const groups: { label: string; days: Date[] }[] = []
  for (const day of props.days) {
    const label = `${MONTH_SHORT[day.getMonth()]} ${day.getFullYear()}`
    const last = groups[groups.length - 1]
    if (last && last.label === label) {
      last.days.push(day)
    } else {
      groups.push({ label, days: [day] })
    }
  }
  return groups
})
</script>

<template>
  <div class="gantt-axis" :style="{ width: totalWidth + 'px' }">

    <!-- Week: single row, day name + date -->
    <template v-if="zoom === 'week'">
      <div class="gantt-axis-row">
        <div
          v-for="(day, i) in days"
          :key="i"
          class="gantt-axis-cell gantt-axis-cell-week"
          :class="{ 'gantt-axis-weekend': isWeekend(day) }"
          :style="{ width: pxPerDay + 'px' }"
        >
          <span class="gantt-axis-dayname">{{ DAY_NAMES[day.getDay()] }}</span>
          <span class="gantt-axis-daynum">{{ day.getDate() }}.{{ String(day.getMonth() + 1).padStart(2, '0') }}.</span>
        </div>
      </div>
    </template>

    <!-- Month: two rows (KW + day numbers) -->
    <template v-else-if="zoom === 'month'">
      <div class="gantt-axis-row gantt-axis-row-kw">
        <div
          v-for="wg in weekGroups"
          :key="wg.kw"
          class="gantt-axis-kw"
          :style="{ width: (wg.days.length * pxPerDay) + 'px' }"
        >
          KW&nbsp;{{ wg.kw }}
        </div>
      </div>
      <div class="gantt-axis-row">
        <div
          v-for="(day, i) in days"
          :key="i"
          class="gantt-axis-cell gantt-axis-cell-day"
          :class="{ 'gantt-axis-weekend': isWeekend(day) }"
          :style="{ width: pxPerDay + 'px' }"
        >
          {{ day.getDate() }}
        </div>
      </div>
    </template>

    <!-- Year: single row, month blocks -->
    <template v-else>
      <div class="gantt-axis-row">
        <div
          v-for="mg in monthGroups"
          :key="mg.label"
          class="gantt-axis-month"
          :style="{ width: (mg.days.length * pxPerDay) + 'px' }"
        >
          {{ mg.label }}
        </div>
      </div>
    </template>

  </div>
</template>
