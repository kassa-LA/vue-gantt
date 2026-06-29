import { Ref } from 'vue';
import { GanttZoom } from '../types';
export declare const PX_PER_DAY: Record<GanttZoom, number>;
export declare const WINDOW_DAYS: Record<GanttZoom, number>;
export declare function localMidnight(date?: Date): Date;
export declare function useGanttLayout(zoom: Ref<GanttZoom>, windowStart: Ref<Date>): {
    pxPerDay: import('vue').ComputedRef<number>;
    windowDays: import('vue').ComputedRef<number>;
    totalWidth: import('vue').ComputedRef<number>;
    days: import('vue').ComputedRef<Date[]>;
};
