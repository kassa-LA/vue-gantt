# vue-gantt

A lightweight Gantt/Timeline component for Vue 3. No dependencies beyond Vue itself.

- Three zoom levels: week, month, year
- Sticky label column, horizontal scroll
- Weekend and today highlighting
- Background markers (e.g. public holidays)
- CSS-only tooltips with multi-line support
- Fully themeable via CSS variables
- TypeScript support

---

## Installation

```bash
npm install github:kassa-LA/vue-gantt
```

---

## Basic usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GanttTimeline } from 'vue-gantt'
import type { GanttGroup, GanttItem, GanttBackground, GanttZoom } from 'vue-gantt'

const zoom = ref<GanttZoom>('month')
const windowStart = ref(new Date())

const groups: GanttGroup[] = [
  { id: 'alice', label: 'Alice' },
  { id: 'bob',   label: 'Bob' },
]

const items: GanttItem[] = [
  { id: '1', groupId: 'alice', start: '2026-07-01', end: '2026-07-10', label: 'Vacation' },
  { id: '2', groupId: 'bob',   start: '2026-07-05', end: '2026-07-07', label: 'Sick leave' },
]

const backgrounds: GanttBackground[] = [
  { id: 'h1', start: '2026-07-04', label: 'Public Holiday' },
]
</script>

<template>
  <GanttTimeline
    :groups="groups"
    :items="items"
    :backgrounds="backgrounds"
    :labelWidth="200"
    v-model:zoom="zoom"
    v-model:start="windowStart"
  />
</template>
```

---

## API

### `<GanttTimeline>` props

| Prop | Type | Default | Description |
|---|---|---|---|
| `groups` | `GanttGroup[]` | — | Rows (one per person / resource) |
| `items` | `GanttItem[]` | — | Bars to render |
| `backgrounds` | `GanttBackground[]` | `[]` | Full-height background markers (holidays etc.) |
| `labelWidth` | `number` | `180` | Width of the label column in px |
| `v-model:zoom` | `GanttZoom` | `'month'` | Active zoom level |
| `v-model:start` | `Date` | today | Left edge of the visible window |

### Types

```typescript
type GanttZoom = 'week' | 'month' | 'year'

interface GanttGroup {
  id: string
  label: string
}

interface GanttItem {
  id: string
  groupId: string
  start: string      // YYYY-MM-DD
  end: string        // YYYY-MM-DD (inclusive)
  label: string
  className?: string // CSS class applied to the bar
  tooltip?: string   // supports \n for line breaks
}

interface GanttBackground {
  id: string
  start: string      // YYYY-MM-DD
  end?: string       // YYYY-MM-DD (inclusive), single day if omitted
  label?: string
}
```

> **Note:** `end` is inclusive — a bar from `2026-07-01` to `2026-07-03` spans three days.

### Zoom levels

| Zoom | px / day | Days visible | Time axis |
|---|---|---|---|
| `week` | 100 | 7 | Weekday name + date |
| `month` | 32 | 31 | ISO week number + day numbers |
| `year` | 3 | 365 | Month blocks |

---

## Custom bar colors

Use `className` on `GanttItem` and style it with `:deep()` in the consuming component:

```vue
<style scoped>
:deep(.gantt-bar.vacation)   { background: #3b82f6; }
:deep(.gantt-bar.sick-leave) { background: #ef4444; }
</style>
```

---

## Theming

Override CSS variables to adapt the component to your design system:

```css
:root {
  --gantt-row-height:    36px;
  --gantt-bar-height:    22px;
  --gantt-bar-radius:    4px;
  --gantt-bar-bg:        #3b82f6;
  --gantt-bar-color:     #fff;

  --gantt-label-bg:      #f8fafc;
  --gantt-grid-color:    #e2e8f0;

  --gantt-weekend-bg:    rgba(0, 0, 0, 0.045);
  --gantt-today-bg:      rgba(59, 130, 246, 0.10);
  --gantt-today-line:    #3b82f6;

  --gantt-bg-item-bg:    rgba(239, 68, 68, 0.13);  /* background markers */
  --gantt-bg-item-border:rgba(239, 68, 68, 0.35);

  --gantt-tooltip-bg:    #1e293b;
  --gantt-tooltip-color: #fff;
}
```

---

## Known limitations

- No drag & drop or inline editing — display only
- CSS tooltips can be clipped by parent `overflow: hidden` containers
- Bar labels are hidden in year zoom (bars too narrow)
