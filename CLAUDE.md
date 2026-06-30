# vue-gantt

## Projekt

Vue 3 Komponenten-Library für Gantt-Diagramme. Eigenständiges Paket, primär entwickelt für den Einsatz in projekt-e (Fehlzeiten-Gantt). Kein eigenständiges Demo/App — reine Library.

## Tech-Stack

- **Vue 3** (Peer-Dependency), **TypeScript**
- **Vite** + **vite-plugin-dts** (Library-Build)
- Paketmanager: **npm**
- GitHub: `kassa-LA/vue-gantt` (public)

## Öffentliche API

Exportiert aus `src/index.ts`:

- **`GanttTimeline`** — Haupt-Komponente
- **Typen**: `GanttGroup`, `GanttItem`, `GanttBackground`, `GanttZoom`

```ts
export interface GanttGroup      { id, label }
export interface GanttItem       { id, groupId, start, end, label, className?, tooltip? }
export interface GanttBackground { id, start, end?, label? }
export type GanttZoom = 'week' | 'month' | 'year'
```

Daten-Format: Datumsangaben immer `YYYY-MM-DD`, `end` ist inklusiv.

## Komponenten & Composables

- `GanttTimeline.vue` — Einstiegspunkt, nimmt Props entgegen
- `GanttRow.vue` — eine Zeile (Group)
- `GanttBar.vue` — ein Balken (Item)
- `GanttTimeAxis.vue` — Zeitachse oben
- `useGanttLayout.ts` — Berechnungslogik (px-Positionen, Zoom)

## Befehle

```bash
npm run build      # Build → dist/ (nötig damit projekt-e Änderungen sieht)
npm run dev        # Watch-Modus (automatischer Rebuild bei Änderungen)
```

## Entwicklungs-Workflow

- Entwicklung in `/home/dirk/projekte/vue-gantt`
- Änderungen werden zuerst lokal implementiert und erst dann per `npm run build` gebaut, um sie im projekt-e Testsystem (localhost) zu sehen
- Lokale Integration in projekt-e via **Symlink** auf `dist/`
- Commits auf `master`, Push nach GitHub nur auf explizite Anweisung
- In projekt-e wird die Library als GitHub-Dependency referenziert — nach Push dort `npm install` / Lockfile-Update in projekt-e nötig
