import { computed, type Ref } from 'vue'
import type { GanttZoom } from '../types'

export const PX_PER_DAY: Record<GanttZoom, number> = {
  week: 100,
  month: 32,
  year: 3,
}

export const WINDOW_DAYS: Record<GanttZoom, number> = {
  week: 7,
  month: 31,
  year: 365,
}

export function localMidnight(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function useGanttLayout(zoom: Ref<GanttZoom>, windowStart: Ref<Date>, pxPerDayOverride?: Ref<number | undefined>) {
  const pxPerDay = computed(() => pxPerDayOverride?.value ?? PX_PER_DAY[zoom.value])
  const windowDays = computed(() => WINDOW_DAYS[zoom.value])
  const totalWidth = computed(() => pxPerDay.value * windowDays.value)

  const days = computed<Date[]>(() => {
    const result: Date[] = []
    const base = localMidnight(windowStart.value)
    for (let i = 0; i < windowDays.value; i++) {
      const d = new Date(base)
      d.setDate(d.getDate() + i)
      result.push(d)
    }
    return result
  })

  return { pxPerDay, windowDays, totalWidth, days }
}
