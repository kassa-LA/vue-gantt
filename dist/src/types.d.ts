export type GanttZoom = 'week' | 'month' | 'year';
export interface GanttGroup {
    id: string;
    label: string;
}
export interface GanttItem {
    id: string;
    groupId: string;
    start: string;
    end: string;
    label: string;
    className?: string;
    tooltip?: string;
}
export interface GanttBackground {
    id: string;
    start: string;
    end?: string;
    label?: string;
}
