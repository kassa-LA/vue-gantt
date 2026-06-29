import { GanttGroup, GanttItem, GanttBackground, GanttZoom } from '../types';
type __VLS_Props = {
    groups: GanttGroup[];
    items: GanttItem[];
    backgrounds?: GanttBackground[];
    labelWidth?: number;
};
type __VLS_PublicProps = {
    'zoom'?: GanttZoom;
    'start'?: Date;
} & __VLS_Props;
declare const _default: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:zoom": (value: GanttZoom) => any;
    "update:start": (value: Date) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:zoom"?: ((value: GanttZoom) => any) | undefined;
    "onUpdate:start"?: ((value: Date) => any) | undefined;
}>, {
    backgrounds: GanttBackground[];
    labelWidth: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
