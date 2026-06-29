import { GanttGroup, GanttItem, GanttBackground, GanttZoom } from '../types';
type __VLS_Props = {
    group: GanttGroup;
    items: GanttItem[];
    backgrounds: GanttBackground[];
    labelWidth: number;
    totalWidth: number;
    pxPerDay: number;
    windowStart: Date;
    days: Date[];
    zoom: GanttZoom;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
