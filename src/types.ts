export type GanttZoom = 'week' | 'month' | 'year'

export interface GanttGroup {
  id: string
  label: string
}

export interface GanttItem {
  id: string
  groupId: string
  start: string   // YYYY-MM-DD
  end: string     // YYYY-MM-DD (inclusive)
  label: string
  className?: string
  tooltip?: string
}

export interface GanttBackground {
  id: string
  start: string   // YYYY-MM-DD
  end?: string    // YYYY-MM-DD (inclusive), single day if omitted
  label?: string
}
