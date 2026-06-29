import { computed as w, defineComponent as $, openBlock as n, createElementBlock as o, normalizeStyle as m, Fragment as D, renderList as f, normalizeClass as W, createElementVNode as u, toDisplayString as k, createCommentVNode as T, createBlock as C, useModel as z, unref as p, createVNode as G, mergeModels as N } from "vue";
const F = {
  week: 100,
  month: 32,
  year: 3
}, L = {
  week: 7,
  month: 31,
  year: 365
};
function P(e = /* @__PURE__ */ new Date()) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function Y(e, l, c) {
  const h = w(() => c?.value ?? F[e.value]), v = w(() => L[e.value]), g = w(() => h.value * v.value), b = w(() => {
    const x = [], r = P(l.value);
    for (let a = 0; a < v.value; a++) {
      const t = new Date(r);
      t.setDate(t.getDate() + a), x.push(t);
    }
    return x;
  });
  return { pxPerDay: h, windowDays: v, totalWidth: g, days: b };
}
const A = {
  key: 0,
  class: "gantt-axis-row"
}, B = { class: "gantt-axis-dayname" }, I = { class: "gantt-axis-daynum" }, O = { class: "gantt-axis-row gantt-axis-row-kw" }, E = { class: "gantt-axis-row" }, H = {
  key: 2,
  class: "gantt-axis-row"
}, J = /* @__PURE__ */ $({
  __name: "GanttTimeAxis",
  props: {
    days: {},
    zoom: {},
    pxPerDay: {},
    totalWidth: {}
  },
  setup(e) {
    const l = e, c = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"], h = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
    function v(r) {
      const a = new Date(r);
      a.setHours(0, 0, 0, 0), a.setDate(a.getDate() + 3 - (a.getDay() + 6) % 7);
      const t = new Date(a.getFullYear(), 0, 4);
      return 1 + Math.round(((a.getTime() - t.getTime()) / 864e5 - 3 + (t.getDay() + 6) % 7) / 7);
    }
    const g = (r) => r.getDay() === 0 || r.getDay() === 6, b = w(() => {
      const r = [];
      for (const a of l.days) {
        const t = v(a), i = r[r.length - 1];
        i && i.kw === t ? i.days.push(a) : r.push({ kw: t, days: [a] });
      }
      return r;
    }), x = w(() => {
      const r = [];
      for (const a of l.days) {
        const t = `${h[a.getMonth()]} ${a.getFullYear()}`, i = r[r.length - 1];
        i && i.label === t ? i.days.push(a) : r.push({ label: t, days: [a] });
      }
      return r;
    });
    return (r, a) => (n(), o("div", {
      class: "gantt-axis",
      style: m({ width: e.totalWidth + "px" })
    }, [
      e.zoom === "week" ? (n(), o("div", A, [
        (n(!0), o(D, null, f(e.days, (t, i) => (n(), o("div", {
          key: i,
          class: W(["gantt-axis-cell gantt-axis-cell-week", { "gantt-axis-weekend": g(t) }]),
          style: m({ width: e.pxPerDay + "px" })
        }, [
          u("span", B, k(c[t.getDay()]), 1),
          u("span", I, k(t.getDate()) + "." + k(String(t.getMonth() + 1).padStart(2, "0")) + ".", 1)
        ], 6))), 128))
      ])) : e.zoom === "month" ? (n(), o(D, { key: 1 }, [
        u("div", O, [
          (n(!0), o(D, null, f(b.value, (t) => (n(), o("div", {
            key: t.kw,
            class: "gantt-axis-kw",
            style: m({ width: t.days.length * e.pxPerDay + "px" })
          }, " KW " + k(t.kw), 5))), 128))
        ]),
        u("div", E, [
          (n(!0), o(D, null, f(e.days, (t, i) => (n(), o("div", {
            key: i,
            class: W(["gantt-axis-cell gantt-axis-cell-day", { "gantt-axis-weekend": g(t) }]),
            style: m({ width: e.pxPerDay + "px" })
          }, k(t.getDate()), 7))), 128))
        ])
      ], 64)) : (n(), o("div", H, [
        (n(!0), o(D, null, f(x.value, (t) => (n(), o("div", {
          key: t.label,
          class: "gantt-axis-month",
          style: m({ width: t.days.length * e.pxPerDay + "px" })
        }, k(t.label), 5))), 128))
      ]))
    ], 4));
  }
}), R = ["data-tooltip"], V = {
  key: 0,
  class: "gantt-bar-label"
}, _ = /* @__PURE__ */ $({
  __name: "GanttBar",
  props: {
    item: {},
    left: {},
    width: {},
    showLabel: { type: Boolean }
  },
  setup(e) {
    return (l, c) => (n(), o("div", {
      class: W(["gantt-bar", e.item.className]),
      style: m({ left: e.left + "px", width: e.width + "px" }),
      "data-tooltip": e.item.tooltip || e.item.label
    }, [
      e.showLabel && e.width > 32 ? (n(), o("span", V, k(e.item.label), 1)) : T("", !0)
    ], 14, R));
  }
}), K = { class: "gantt-row" }, X = { class: "gantt-label-text" }, j = ["data-tooltip"], q = /* @__PURE__ */ $({
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
  setup(e) {
    const l = e;
    function c(s) {
      const y = s.split("-").map(Number);
      return new Date(y[0], y[1] - 1, y[2]);
    }
    function h(s) {
      return (c(s).getTime() - l.windowStart.getTime()) / 864e5 * l.pxPerDay;
    }
    function v(s) {
      return Math.max(0, h(s)) + 1;
    }
    function g(s, y) {
      const d = h(s), M = h(y) + l.pxPerDay;
      return Math.max(0, Math.min(l.totalWidth, M) - Math.max(0, d) - 2);
    }
    function b(s, y) {
      const d = c(s), M = c(y), S = new Date(l.windowStart);
      return S.setDate(S.getDate() + l.days.length), M >= l.windowStart && d < S;
    }
    const x = w(() => l.items.filter((s) => b(s.start, s.end))), r = w(() => l.backgrounds.filter((s) => b(s.start, s.end ?? s.start))), a = (s) => {
      const y = /* @__PURE__ */ new Date();
      return s.getDate() === y.getDate() && s.getMonth() === y.getMonth() && s.getFullYear() === y.getFullYear();
    }, t = (s) => s.getDay() === 0 || s.getDay() === 6, i = w(() => l.zoom !== "year");
    return (s, y) => (n(), o("div", K, [
      u("div", {
        class: "gantt-label-cell",
        style: m({ width: e.labelWidth + "px" })
      }, [
        u("span", X, k(e.group.label), 1)
      ], 4),
      u("div", {
        class: "gantt-track",
        style: m({ width: e.totalWidth + "px" })
      }, [
        (n(!0), o(D, null, f(e.days, (d, M) => (n(), o("div", {
          key: M,
          class: W(["gantt-day-bg", {
            "gantt-weekend": t(d),
            "gantt-today": a(d)
          }]),
          style: m({ left: M * e.pxPerDay + "px", width: e.pxPerDay + "px" })
        }, null, 6))), 128)),
        (n(!0), o(D, null, f(r.value, (d) => (n(), o("div", {
          key: d.id,
          class: "gantt-bg-item",
          "data-tooltip": d.label,
          style: m({
            left: v(d.start) + "px",
            width: g(d.start, d.end ?? d.start) + "px"
          })
        }, null, 12, j))), 128)),
        (n(!0), o(D, null, f(x.value, (d) => (n(), C(_, {
          key: d.id,
          item: d,
          left: v(d.start),
          width: g(d.start, d.end),
          showLabel: i.value
        }, null, 8, ["item", "left", "width", "showLabel"]))), 128))
      ], 4)
    ]));
  }
}), Q = { class: "gantt-root" }, U = { class: "gantt-toolbar" }, Z = { class: "gantt-nav" }, tt = { class: "gantt-zoom-btns" }, et = { class: "gantt-scroll" }, at = { class: "gantt-header-row" }, nt = {
  key: 0,
  class: "gantt-empty"
}, lt = /* @__PURE__ */ $({
  __name: "GanttTimeline",
  props: /* @__PURE__ */ N({
    groups: {},
    items: {},
    backgrounds: { default: () => [] },
    labelWidth: { default: 180 },
    pxPerDay: { default: void 0 }
  }, {
    zoom: { default: "month" },
    zoomModifiers: {},
    start: {
      default: () => P()
    },
    startModifiers: {}
  }),
  emits: ["update:zoom", "update:start"],
  setup(e) {
    const l = e, c = z(e, "zoom"), h = z(e, "start"), v = w(() => l.pxPerDay), g = Y(c, h, v), b = w(() => {
      const a = {};
      for (const t of l.items)
        a[t.groupId] || (a[t.groupId] = []), a[t.groupId].push(t);
      return a;
    });
    function x(a) {
      const t = P(h.value);
      t.setDate(t.getDate() + a * g.windowDays.value), h.value = t;
    }
    function r() {
      h.value = P();
    }
    return (a, t) => (n(), o("div", Q, [
      u("div", U, [
        u("div", Z, [
          u("button", {
            class: "gantt-btn",
            onClick: t[0] || (t[0] = (i) => x(-1))
          }, "‹"),
          u("button", {
            class: "gantt-btn",
            onClick: r
          }, "Heute"),
          u("button", {
            class: "gantt-btn",
            onClick: t[1] || (t[1] = (i) => x(1))
          }, "›")
        ]),
        u("div", tt, [
          u("button", {
            class: W(["gantt-btn", { "gantt-btn-active": c.value === "week" }]),
            onClick: t[2] || (t[2] = (i) => c.value = "week")
          }, "Woche", 2),
          u("button", {
            class: W(["gantt-btn", { "gantt-btn-active": c.value === "month" }]),
            onClick: t[3] || (t[3] = (i) => c.value = "month")
          }, "Monat", 2),
          u("button", {
            class: W(["gantt-btn", { "gantt-btn-active": c.value === "year" }]),
            onClick: t[4] || (t[4] = (i) => c.value = "year")
          }, "Jahr", 2)
        ])
      ]),
      u("div", et, [
        u("div", {
          class: "gantt-inner",
          style: m({ width: l.labelWidth + p(g).totalWidth.value + "px" })
        }, [
          u("div", at, [
            u("div", {
              class: "gantt-label-cell gantt-label-header",
              style: m({ width: l.labelWidth + "px" })
            }, null, 4),
            G(J, {
              days: p(g).days.value,
              zoom: c.value,
              pxPerDay: p(g).pxPerDay.value,
              totalWidth: p(g).totalWidth.value
            }, null, 8, ["days", "zoom", "pxPerDay", "totalWidth"])
          ]),
          (n(!0), o(D, null, f(e.groups, (i) => (n(), C(q, {
            key: i.id,
            group: i,
            items: b.value[i.id] ?? [],
            backgrounds: l.backgrounds,
            labelWidth: l.labelWidth,
            totalWidth: p(g).totalWidth.value,
            pxPerDay: p(g).pxPerDay.value,
            windowStart: h.value,
            days: p(g).days.value,
            zoom: c.value
          }, null, 8, ["group", "items", "backgrounds", "labelWidth", "totalWidth", "pxPerDay", "windowStart", "days", "zoom"]))), 128)),
          e.groups.length === 0 ? (n(), o("div", nt, "Keine Daten")) : T("", !0)
        ], 4)
      ])
    ]));
  }
});
export {
  lt as GanttTimeline
};
