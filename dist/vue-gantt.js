import { computed as w, defineComponent as $, openBlock as o, createElementBlock as u, normalizeStyle as m, Fragment as D, renderList as k, normalizeClass as W, createElementVNode as c, toDisplayString as f, createCommentVNode as C, createBlock as G, useModel as S, ref as T, onMounted as F, onBeforeUnmount as L, unref as p, createVNode as Y, mergeModels as A } from "vue";
const N = {
  week: 100,
  month: 32,
  year: 3
}, B = {
  week: 7,
  month: 31,
  year: 365
};
function P(t = /* @__PURE__ */ new Date()) {
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}
function E(t, r, d) {
  const h = d ?? w(() => N[t.value]), y = w(() => B[t.value]), v = w(() => h.value * y.value), x = w(() => {
    const b = [], l = P(r.value);
    for (let i = 0; i < y.value; i++) {
      const n = new Date(l);
      n.setDate(n.getDate() + i), b.push(n);
    }
    return b;
  });
  return { pxPerDay: h, windowDays: y, totalWidth: v, days: x };
}
const I = {
  key: 0,
  class: "gantt-axis-row"
}, O = { class: "gantt-axis-dayname" }, R = { class: "gantt-axis-daynum" }, H = { class: "gantt-axis-row gantt-axis-row-kw" }, J = { class: "gantt-axis-row" }, V = {
  key: 2,
  class: "gantt-axis-row"
}, _ = /* @__PURE__ */ $({
  __name: "GanttTimeAxis",
  props: {
    days: {},
    zoom: {},
    pxPerDay: {},
    totalWidth: {}
  },
  setup(t) {
    const r = t, d = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"], h = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
    function y(l) {
      const i = new Date(l);
      i.setHours(0, 0, 0, 0), i.setDate(i.getDate() + 3 - (i.getDay() + 6) % 7);
      const n = new Date(i.getFullYear(), 0, 4);
      return 1 + Math.round(((i.getTime() - n.getTime()) / 864e5 - 3 + (n.getDay() + 6) % 7) / 7);
    }
    const v = (l) => l.getDay() === 0 || l.getDay() === 6, x = w(() => {
      const l = [];
      for (const i of r.days) {
        const n = y(i), g = l[l.length - 1];
        g && g.kw === n ? g.days.push(i) : l.push({ kw: n, days: [i] });
      }
      return l;
    }), b = w(() => {
      const l = [];
      for (const i of r.days) {
        const n = `${h[i.getMonth()]} ${i.getFullYear()}`, g = l[l.length - 1];
        g && g.label === n ? g.days.push(i) : l.push({ label: n, days: [i] });
      }
      return l;
    });
    return (l, i) => (o(), u("div", {
      class: "gantt-axis",
      style: m({ width: t.totalWidth + "px" })
    }, [
      t.zoom === "week" ? (o(), u("div", I, [
        (o(!0), u(D, null, k(t.days, (n, g) => (o(), u("div", {
          key: g,
          class: W(["gantt-axis-cell gantt-axis-cell-week", { "gantt-axis-weekend": v(n) }]),
          style: m({ width: t.pxPerDay + "px" })
        }, [
          c("span", O, f(d[n.getDay()]), 1),
          c("span", R, f(n.getDate()) + "." + f(String(n.getMonth() + 1).padStart(2, "0")) + ".", 1)
        ], 6))), 128))
      ])) : t.zoom === "month" ? (o(), u(D, { key: 1 }, [
        c("div", H, [
          (o(!0), u(D, null, k(x.value, (n) => (o(), u("div", {
            key: n.kw,
            class: "gantt-axis-kw",
            style: m({ width: n.days.length * t.pxPerDay + "px" })
          }, " KW " + f(n.kw), 5))), 128))
        ]),
        c("div", J, [
          (o(!0), u(D, null, k(t.days, (n, g) => (o(), u("div", {
            key: g,
            class: W(["gantt-axis-cell gantt-axis-cell-day", { "gantt-axis-weekend": v(n) }]),
            style: m({ width: t.pxPerDay + "px" })
          }, f(n.getDate()), 7))), 128))
        ])
      ], 64)) : (o(), u("div", V, [
        (o(!0), u(D, null, k(b.value, (n) => (o(), u("div", {
          key: n.label,
          class: "gantt-axis-month",
          style: m({ width: n.days.length * t.pxPerDay + "px" })
        }, f(n.label), 5))), 128))
      ]))
    ], 4));
  }
}), K = ["data-tooltip"], X = {
  key: 0,
  class: "gantt-bar-label"
}, U = /* @__PURE__ */ $({
  __name: "GanttBar",
  props: {
    item: {},
    left: {},
    width: {},
    showLabel: { type: Boolean }
  },
  setup(t) {
    return (r, d) => (o(), u("div", {
      class: W(["gantt-bar", t.item.className]),
      style: m({ left: t.left + "px", width: t.width + "px" }),
      "data-tooltip": t.item.tooltip || t.item.label
    }, [
      t.showLabel && t.width > 32 ? (o(), u("span", X, f(t.item.label), 1)) : C("", !0)
    ], 14, K));
  }
}), j = { class: "gantt-row" }, q = { class: "gantt-label-text" }, Q = ["data-tooltip"], Z = /* @__PURE__ */ $({
  __name: "GanttRow",
  props: {
    group: {},
    items: {},
    backgrounds: {},
    labelWidth: {},
    totalWidth: {},
    pxPerDay: {},
    windowStart: {},
    days: {},
    zoom: {}
  },
  setup(t) {
    const r = t;
    function d(e) {
      const a = e.split("-").map(Number);
      return new Date(a[0], a[1] - 1, a[2]);
    }
    function h(e) {
      return (d(e).getTime() - r.windowStart.getTime()) / 864e5 * r.pxPerDay;
    }
    function y(e) {
      return Math.max(0, h(e));
    }
    function v(e, a) {
      const s = h(e), M = h(a) + r.pxPerDay;
      return Math.max(0, Math.min(r.totalWidth, M) - Math.max(0, s));
    }
    function x(e, a) {
      const s = d(e), M = d(a), z = new Date(r.windowStart);
      return z.setDate(z.getDate() + r.days.length), M >= r.windowStart && s < z;
    }
    const b = w(() => r.items.filter((e) => x(e.start, e.end))), l = w(() => r.backgrounds.filter((e) => x(e.start, e.end ?? e.start))), i = (e) => {
      const a = /* @__PURE__ */ new Date();
      return e.getDate() === a.getDate() && e.getMonth() === a.getMonth() && e.getFullYear() === a.getFullYear();
    }, n = (e) => e.getDay() === 0 || e.getDay() === 6, g = w(() => r.zoom !== "year");
    return (e, a) => (o(), u("div", j, [
      c("div", {
        class: "gantt-label-cell",
        style: m({ width: t.labelWidth + "px" })
      }, [
        c("span", q, f(t.group.label), 1)
      ], 4),
      c("div", {
        class: "gantt-track",
        style: m({ width: t.totalWidth + "px" })
      }, [
        (o(!0), u(D, null, k(t.days, (s, M) => (o(), u("div", {
          key: M,
          class: W(["gantt-day-bg", {
            "gantt-weekend": n(s),
            "gantt-today": i(s)
          }]),
          style: m({ left: M * t.pxPerDay + "px", width: t.pxPerDay + "px" })
        }, null, 6))), 128)),
        (o(!0), u(D, null, k(l.value, (s) => (o(), u("div", {
          key: s.id,
          class: "gantt-bg-item",
          "data-tooltip": s.label,
          style: m({
            left: y(s.start) + "px",
            width: v(s.start, s.end ?? s.start) + "px"
          })
        }, null, 12, Q))), 128)),
        (o(!0), u(D, null, k(b.value, (s) => (o(), G(U, {
          key: s.id,
          item: s,
          left: y(s.start),
          width: v(s.start, s.end),
          showLabel: g.value
        }, null, 8, ["item", "left", "width", "showLabel"]))), 128))
      ], 4)
    ]));
  }
}), tt = { class: "gantt-toolbar" }, et = { class: "gantt-nav" }, at = { class: "gantt-zoom-btns" }, nt = { class: "gantt-scroll" }, st = { class: "gantt-header-row" }, lt = {
  key: 0,
  class: "gantt-empty"
}, it = /* @__PURE__ */ $({
  __name: "GanttTimeline",
  props: /* @__PURE__ */ A({
    groups: {},
    items: {},
    backgrounds: { default: () => [] },
    labelWidth: { default: 180 }
  }, {
    zoom: { default: "month" },
    zoomModifiers: {},
    start: {
      default: () => P()
    },
    startModifiers: {}
  }),
  emits: ["update:zoom", "update:start"],
  setup(t) {
    const r = t, d = S(t, "zoom"), h = S(t, "start"), y = T(null), v = T(0);
    let x = null;
    F(() => {
      y.value && (v.value = y.value.offsetWidth, x = new ResizeObserver(([e]) => {
        v.value = e.contentRect.width;
      }), x.observe(y.value));
    }), L(() => x?.disconnect());
    const b = w(() => {
      const e = N[d.value];
      if (!v.value) return e;
      const s = (v.value - r.labelWidth) / B[d.value];
      return Math.max(e, s);
    }), l = E(d, h, b), i = w(() => {
      const e = {};
      for (const a of r.items)
        e[a.groupId] || (e[a.groupId] = []), e[a.groupId].push(a);
      return e;
    });
    function n(e) {
      const a = P(h.value);
      a.setDate(a.getDate() + e * l.windowDays.value), h.value = a;
    }
    function g() {
      h.value = P();
    }
    return (e, a) => (o(), u("div", {
      class: "gantt-root",
      ref_key: "rootEl",
      ref: y
    }, [
      c("div", tt, [
        c("div", et, [
          c("button", {
            class: "gantt-btn",
            onClick: a[0] || (a[0] = (s) => n(-1))
          }, "‹"),
          c("button", {
            class: "gantt-btn",
            onClick: g
          }, "Heute"),
          c("button", {
            class: "gantt-btn",
            onClick: a[1] || (a[1] = (s) => n(1))
          }, "›")
        ]),
        c("div", at, [
          c("button", {
            class: W(["gantt-btn", { "gantt-btn-active": d.value === "week" }]),
            onClick: a[2] || (a[2] = (s) => d.value = "week")
          }, "Woche", 2),
          c("button", {
            class: W(["gantt-btn", { "gantt-btn-active": d.value === "month" }]),
            onClick: a[3] || (a[3] = (s) => d.value = "month")
          }, "Monat", 2),
          c("button", {
            class: W(["gantt-btn", { "gantt-btn-active": d.value === "year" }]),
            onClick: a[4] || (a[4] = (s) => d.value = "year")
          }, "Jahr", 2)
        ])
      ]),
      c("div", nt, [
        c("div", {
          class: "gantt-inner",
          style: m({ width: r.labelWidth + p(l).totalWidth.value + "px" })
        }, [
          c("div", st, [
            c("div", {
              class: "gantt-label-cell gantt-label-header",
              style: m({ width: r.labelWidth + "px" })
            }, null, 4),
            Y(_, {
              days: p(l).days.value,
              zoom: d.value,
              pxPerDay: p(l).pxPerDay.value,
              totalWidth: p(l).totalWidth.value
            }, null, 8, ["days", "zoom", "pxPerDay", "totalWidth"])
          ]),
          (o(!0), u(D, null, k(t.groups, (s) => (o(), G(Z, {
            key: s.id,
            group: s,
            items: i.value[s.id] ?? [],
            backgrounds: r.backgrounds,
            labelWidth: r.labelWidth,
            totalWidth: p(l).totalWidth.value,
            pxPerDay: p(l).pxPerDay.value,
            windowStart: h.value,
            days: p(l).days.value,
            zoom: d.value
          }, null, 8, ["group", "items", "backgrounds", "labelWidth", "totalWidth", "pxPerDay", "windowStart", "days", "zoom"]))), 128)),
          t.groups.length === 0 ? (o(), u("div", lt, "Keine Daten")) : C("", !0)
        ], 4)
      ])
    ], 512));
  }
});
export {
  it as GanttTimeline
};
