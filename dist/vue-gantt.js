import { computed as v, defineComponent as P, openBlock as s, createElementBlock as o, normalizeStyle as m, Fragment as D, renderList as k, normalizeClass as W, createElementVNode as d, toDisplayString as b, createCommentVNode as T, createBlock as C, useModel as z, unref as p, createVNode as G, mergeModels as N } from "vue";
const F = {
  week: 100,
  month: 32,
  year: 3
}, L = {
  week: 7,
  month: 31,
  year: 365
};
function $(e = /* @__PURE__ */ new Date()) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function Y(e, i) {
  const u = v(() => F[e.value]), c = v(() => L[e.value]), g = v(() => u.value * c.value), x = v(() => {
    const w = [], f = $(i.value);
    for (let n = 0; n < c.value; n++) {
      const t = new Date(f);
      t.setDate(t.getDate() + n), w.push(t);
    }
    return w;
  });
  return { pxPerDay: u, windowDays: c, totalWidth: g, days: x };
}
const A = {
  key: 0,
  class: "gantt-axis-row"
}, B = { class: "gantt-axis-dayname" }, I = { class: "gantt-axis-daynum" }, O = { class: "gantt-axis-row gantt-axis-row-kw" }, E = { class: "gantt-axis-row" }, H = {
  key: 2,
  class: "gantt-axis-row"
}, J = /* @__PURE__ */ P({
  __name: "GanttTimeAxis",
  props: {
    days: {},
    zoom: {},
    pxPerDay: {},
    totalWidth: {}
  },
  setup(e) {
    const i = e, u = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"], c = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
    function g(n) {
      const t = new Date(n);
      t.setHours(0, 0, 0, 0), t.setDate(t.getDate() + 3 - (t.getDay() + 6) % 7);
      const a = new Date(t.getFullYear(), 0, 4);
      return 1 + Math.round(((t.getTime() - a.getTime()) / 864e5 - 3 + (a.getDay() + 6) % 7) / 7);
    }
    const x = (n) => n.getDay() === 0 || n.getDay() === 6, w = v(() => {
      const n = [];
      for (const t of i.days) {
        const a = g(t), h = n[n.length - 1];
        h && h.kw === a ? h.days.push(t) : n.push({ kw: a, days: [t] });
      }
      return n;
    }), f = v(() => {
      const n = [];
      for (const t of i.days) {
        const a = `${c[t.getMonth()]} ${t.getFullYear()}`, h = n[n.length - 1];
        h && h.label === a ? h.days.push(t) : n.push({ label: a, days: [t] });
      }
      return n;
    });
    return (n, t) => (s(), o("div", {
      class: "gantt-axis",
      style: m({ width: e.totalWidth + "px" })
    }, [
      e.zoom === "week" ? (s(), o("div", A, [
        (s(!0), o(D, null, k(e.days, (a, h) => (s(), o("div", {
          key: h,
          class: W(["gantt-axis-cell gantt-axis-cell-week", { "gantt-axis-weekend": x(a) }]),
          style: m({ width: e.pxPerDay + "px" })
        }, [
          d("span", B, b(u[a.getDay()]), 1),
          d("span", I, b(a.getDate()) + "." + b(String(a.getMonth() + 1).padStart(2, "0")) + ".", 1)
        ], 6))), 128))
      ])) : e.zoom === "month" ? (s(), o(D, { key: 1 }, [
        d("div", O, [
          (s(!0), o(D, null, k(w.value, (a) => (s(), o("div", {
            key: a.kw,
            class: "gantt-axis-kw",
            style: m({ width: a.days.length * e.pxPerDay + "px" })
          }, " KW " + b(a.kw), 5))), 128))
        ]),
        d("div", E, [
          (s(!0), o(D, null, k(e.days, (a, h) => (s(), o("div", {
            key: h,
            class: W(["gantt-axis-cell gantt-axis-cell-day", { "gantt-axis-weekend": x(a) }]),
            style: m({ width: e.pxPerDay + "px" })
          }, b(a.getDate()), 7))), 128))
        ])
      ], 64)) : (s(), o("div", H, [
        (s(!0), o(D, null, k(f.value, (a) => (s(), o("div", {
          key: a.label,
          class: "gantt-axis-month",
          style: m({ width: a.days.length * e.pxPerDay + "px" })
        }, b(a.label), 5))), 128))
      ]))
    ], 4));
  }
}), V = ["data-tooltip"], R = {
  key: 0,
  class: "gantt-bar-label"
}, _ = /* @__PURE__ */ P({
  __name: "GanttBar",
  props: {
    item: {},
    left: {},
    width: {},
    showLabel: { type: Boolean }
  },
  setup(e) {
    return (i, u) => (s(), o("div", {
      class: W(["gantt-bar", e.item.className]),
      style: m({ left: e.left + "px", width: e.width + "px" }),
      "data-tooltip": e.item.tooltip || e.item.label
    }, [
      e.showLabel && e.width > 32 ? (s(), o("span", R, b(e.item.label), 1)) : T("", !0)
    ], 14, V));
  }
}), K = { class: "gantt-row" }, X = { class: "gantt-label-text" }, j = ["data-tooltip"], q = /* @__PURE__ */ P({
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
    const i = e;
    function u(l) {
      const y = l.split("-").map(Number);
      return new Date(y[0], y[1] - 1, y[2]);
    }
    function c(l) {
      return (u(l).getTime() - i.windowStart.getTime()) / 864e5 * i.pxPerDay;
    }
    function g(l) {
      return Math.max(0, c(l));
    }
    function x(l, y) {
      const r = c(l), M = c(y) + i.pxPerDay;
      return Math.max(0, Math.min(i.totalWidth, M) - Math.max(0, r));
    }
    function w(l, y) {
      const r = u(l), M = u(y), S = new Date(i.windowStart);
      return S.setDate(S.getDate() + i.days.length), M >= i.windowStart && r < S;
    }
    const f = v(() => i.items.filter((l) => w(l.start, l.end))), n = v(() => i.backgrounds.filter((l) => w(l.start, l.end ?? l.start))), t = (l) => {
      const y = /* @__PURE__ */ new Date();
      return l.getDate() === y.getDate() && l.getMonth() === y.getMonth() && l.getFullYear() === y.getFullYear();
    }, a = (l) => l.getDay() === 0 || l.getDay() === 6, h = v(() => i.zoom !== "year");
    return (l, y) => (s(), o("div", K, [
      d("div", {
        class: "gantt-label-cell",
        style: m({ width: e.labelWidth + "px" })
      }, [
        d("span", X, b(e.group.label), 1)
      ], 4),
      d("div", {
        class: "gantt-track",
        style: m({ width: e.totalWidth + "px" })
      }, [
        (s(!0), o(D, null, k(e.days, (r, M) => (s(), o("div", {
          key: M,
          class: W(["gantt-day-bg", {
            "gantt-weekend": a(r),
            "gantt-today": t(r)
          }]),
          style: m({ left: M * e.pxPerDay + "px", width: e.pxPerDay + "px" })
        }, null, 6))), 128)),
        (s(!0), o(D, null, k(n.value, (r) => (s(), o("div", {
          key: r.id,
          class: "gantt-bg-item",
          "data-tooltip": r.label,
          style: m({
            left: g(r.start) + "px",
            width: x(r.start, r.end ?? r.start) + "px"
          })
        }, null, 12, j))), 128)),
        (s(!0), o(D, null, k(f.value, (r) => (s(), C(_, {
          key: r.id,
          item: r,
          left: g(r.start),
          width: x(r.start, r.end),
          showLabel: h.value
        }, null, 8, ["item", "left", "width", "showLabel"]))), 128))
      ], 4)
    ]));
  }
}), Q = { class: "gantt-root" }, U = { class: "gantt-toolbar" }, Z = { class: "gantt-nav" }, tt = { class: "gantt-zoom-btns" }, et = { class: "gantt-scroll" }, at = { class: "gantt-header-row" }, nt = {
  key: 0,
  class: "gantt-empty"
}, lt = /* @__PURE__ */ P({
  __name: "GanttTimeline",
  props: /* @__PURE__ */ N({
    groups: {},
    items: {},
    backgrounds: { default: () => [] },
    labelWidth: { default: 180 }
  }, {
    zoom: { default: "month" },
    zoomModifiers: {},
    start: {
      default: () => $()
    },
    startModifiers: {}
  }),
  emits: ["update:zoom", "update:start"],
  setup(e) {
    const i = e, u = z(e, "zoom"), c = z(e, "start"), g = Y(u, c), x = v(() => {
      const n = {};
      for (const t of i.items)
        n[t.groupId] || (n[t.groupId] = []), n[t.groupId].push(t);
      return n;
    });
    function w(n) {
      const t = $(c.value);
      t.setDate(t.getDate() + n * g.windowDays.value), c.value = t;
    }
    function f() {
      c.value = $();
    }
    return (n, t) => (s(), o("div", Q, [
      d("div", U, [
        d("div", Z, [
          d("button", {
            class: "gantt-btn",
            onClick: t[0] || (t[0] = (a) => w(-1))
          }, "‹"),
          d("button", {
            class: "gantt-btn",
            onClick: f
          }, "Heute"),
          d("button", {
            class: "gantt-btn",
            onClick: t[1] || (t[1] = (a) => w(1))
          }, "›")
        ]),
        d("div", tt, [
          d("button", {
            class: W(["gantt-btn", { "gantt-btn-active": u.value === "week" }]),
            onClick: t[2] || (t[2] = (a) => u.value = "week")
          }, "Woche", 2),
          d("button", {
            class: W(["gantt-btn", { "gantt-btn-active": u.value === "month" }]),
            onClick: t[3] || (t[3] = (a) => u.value = "month")
          }, "Monat", 2),
          d("button", {
            class: W(["gantt-btn", { "gantt-btn-active": u.value === "year" }]),
            onClick: t[4] || (t[4] = (a) => u.value = "year")
          }, "Jahr", 2)
        ])
      ]),
      d("div", et, [
        d("div", {
          class: "gantt-inner",
          style: m({ width: i.labelWidth + p(g).totalWidth.value + "px" })
        }, [
          d("div", at, [
            d("div", {
              class: "gantt-label-cell gantt-label-header",
              style: m({ width: i.labelWidth + "px" })
            }, null, 4),
            G(J, {
              days: p(g).days.value,
              zoom: u.value,
              pxPerDay: p(g).pxPerDay.value,
              totalWidth: p(g).totalWidth.value
            }, null, 8, ["days", "zoom", "pxPerDay", "totalWidth"])
          ]),
          (s(!0), o(D, null, k(e.groups, (a) => (s(), C(q, {
            key: a.id,
            group: a,
            items: x.value[a.id] ?? [],
            backgrounds: i.backgrounds,
            labelWidth: i.labelWidth,
            totalWidth: p(g).totalWidth.value,
            pxPerDay: p(g).pxPerDay.value,
            windowStart: c.value,
            days: p(g).days.value,
            zoom: u.value
          }, null, 8, ["group", "items", "backgrounds", "labelWidth", "totalWidth", "pxPerDay", "windowStart", "days", "zoom"]))), 128)),
          e.groups.length === 0 ? (s(), o("div", nt, "Keine Daten")) : T("", !0)
        ], 4)
      ])
    ]));
  }
});
export {
  lt as GanttTimeline
};
