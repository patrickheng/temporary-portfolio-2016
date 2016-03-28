const _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
  "use strict";

  function i(a, b, c, d) {
    return c = parseFloat(c) - parseFloat(a), d = parseFloat(d) - parseFloat(b), Math.sqrt(c * c + d * d);
  }

  function j(a) {
    return "string" != typeof a && a.nodeType || (a = _gsScope.TweenLite.selector(a), a.length && (a = a[0])), a;
  }

  function k(a, b, c) {
    let e, f, d = a.indexOf(" ");
    return -1 === d ? (e = void 0 !== c ? c + "" : a, f = a) : (e = a.substr(0, d), f = a.substr(d + 1)), e = -1 !== e.indexOf("%") ? parseFloat(e) / 100 * b : parseFloat(e), f = -1 !== f.indexOf("%") ? parseFloat(f) / 100 * b : parseFloat(f), e > f ? [f, e] : [e, f];
  }

  function l(a) {
    if (!a) return 0;
    a = j(a);
    let d, e, f, g, h, k, l, c = a.tagName.toLowerCase();
    if ("path" === c) {
      g = a.style.strokeDasharray, a.style.strokeDasharray = "none", d = a.getTotalLength() || 0;
      try {
        e = a.getBBox();
      } catch (m) { throw new Error(m); }
      a.style.strokeDasharray = g;
    } else if ("rect" === c) d = 2 * a.getAttribute("width") + 2 * a.getAttribute("height");
    else if ("circle" === c) d = 2 * Math.PI * parseFloat(a.getAttribute("r"));
    else if ("line" === c) d = i(a.getAttribute("x1"), a.getAttribute("y1"), a.getAttribute("x2"), a.getAttribute("y2"));
    else if ("polyline" === c || "polygon" === c)
      for (f = a.getAttribute("points").match(b) || [], "polygon" === c && f.push(f[0], f[1]), d = 0, h = 2; h < f.length; h += 2) d += i(f[h - 2], f[h - 1], f[h], f[h + 1]) || 0;
    else "ellipse" === c && (k = parseFloat(a.getAttribute("rx")), l = parseFloat(a.getAttribute("ry")), d = Math.PI * (3 * (k + l) - Math.sqrt((3 * k + l) * (k + 3 * l))));
    return d || 0;
  }

  function m(b, c) {
    if (!b) return [0, 0];
    b = j(b), c = c || l(b) + 1;
    let d = a(b),
      e = d.strokeDasharray || "",
      f = parseFloat(d.strokeDashoffset),
      g = e.indexOf(",");
    return 0 > g && (g = e.indexOf(" ")), e = 0 > g ? c : parseFloat(e.substr(0, g)) || 1e-5, e > c && (e = c), [Math.max(0, -f), Math.max(0, e - f)];
  }
  let c, a = document.defaultView ? document.defaultView.getComputedStyle : function() {},
    b = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi;
  c = _gsScope._gsDefine.plugin({
    propName: "drawSVG",
    API: 2,
    version: "0.0.10",
    global: !0,
    overwriteProps: ["drawSVG"],
    init: function(a, b, c) {
      if (!a.getBBox) return !1;
      let j, n, o, i = l(a) + 1;
      return this._style = a.style, b === !0 || "true" === b ? b = "0 100%" : b ? -1 === (b + "").indexOf(" ") && (b = "0 " + b) : b = "0 0", j = m(a, i), n = k(b, i, j[0]), this._length = i + 10, 0 === j[0] && 0 === n[0] ? (o = Math.max(1e-5, n[1] - i), this._dash = i + o, this._offset = i - j[1] + o, this._addTween(this, "_offset", this._offset, i - n[1] + o, "drawSVG")) : (this._dash = j[1] - j[0] || 1e-6, this._offset = -j[0], this._addTween(this, "_dash", this._dash, n[1] - n[0] || 1e-5, "drawSVG"), this._addTween(this, "_offset", this._offset, -n[0], "drawSVG"));
    },
    set: function(a) {
      this._firstPT && (this._super.setRatio.call(this, a), this._style.strokeDashoffset = this._offset, 1 === a || 0 === a ? this._style.strokeDasharray = this._offset < .001 && this._length - this._dash <= 10 ? "none" : this._offset === this._dash ? "0px, 999999px" : this._dash + "px," + this._length + "px" : this._style.strokeDasharray = this._dash + "px," + this._length + "px");
    }
  }), c.getLength = l, c.getPosition = m;
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()();