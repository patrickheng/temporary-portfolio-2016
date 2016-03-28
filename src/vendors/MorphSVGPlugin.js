// var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
// (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
//   "use strict";
//   var a = Math.PI / 180,
//     b = 180 / Math.PI,
//     c = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
//     d = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
//     e = /[achlmqstvz]/gi,
//     f = _gsScope.TweenLite,
//     g = function(a) {
//       window.console && console.log(a)
//     },
//     h = function(b, c) {
//       var d, e, f, g, h, i, j = Math.ceil(Math.abs(c) / 90),
//         k = 0,
//         l = [];
//       for (b *= a, c *= a, d = c / j, e = 4 / 3 * Math.sin(d / 2) / (1 + Math.cos(d / 2)), i = 0; j > i; i++) f = b + i * d, g = Math.cos(f), h = Math.sin(f), l[k++] = g - e * h, l[k++] = h + e * g, f += d, g = Math.cos(f), h = Math.sin(f), l[k++] = g + e * h, l[k++] = h - e * g, l[k++] = g, l[k++] = h;
//       return l
//     },
//     i = function(c, d, e, f, g, i, j, k, l) {
//       if (c !== k || d !== l) {
//         e = Math.abs(e), f = Math.abs(f);
//         var m = g % 360 * a,
//           n = Math.cos(m),
//           o = Math.sin(m),
//           p = (c - k) / 2,
//           q = (d - l) / 2,
//           r = n * p + o * q,
//           s = -o * p + n * q,
//           t = e * e,
//           u = f * f,
//           v = r * r,
//           w = s * s,
//           x = v / t + w / u;
//         x > 1 && (e = Math.sqrt(x) * e, f = Math.sqrt(x) * f, t = e * e, u = f * f);
//         var y = i === j ? -1 : 1,
//           z = (t * u - t * w - u * v) / (t * w + u * v);
//         0 > z && (z = 0);
//         var A = y * Math.sqrt(z),
//           B = A * (e * s / f),
//           C = A * -(f * r / e),
//           D = (c + k) / 2,
//           E = (d + l) / 2,
//           F = D + (n * B - o * C),
//           G = E + (o * B + n * C),
//           H = (r - B) / e,
//           I = (s - C) / f,
//           J = (-r - B) / e,
//           K = (-s - C) / f,
//           L = Math.sqrt(H * H + I * I),
//           M = H;
//         y = 0 > I ? -1 : 1;
//         var N = y * Math.acos(M / L) * b;
//         L = Math.sqrt((H * H + I * I) * (J * J + K * K)), M = H * J + I * K, y = 0 > H * K - I * J ? -1 : 1;
//         var O = y * Math.acos(M / L) * b;
//         !j && O > 0 ? O -= 360 : j && 0 > O && (O += 360), O %= 360, N %= 360;
//         var P, Q, R, S = h(N, O),
//           T = n * e,
//           U = o * e,
//           V = o * -f,
//           W = n * f,
//           X = S.length - 2;
//         for (P = 0; X > P; P += 2) Q = S[P], R = S[P + 1], S[P] = Q * T + R * V + F, S[P + 1] = Q * U + R * W + G;
//         return S[S.length - 2] = k, S[S.length - 1] = l, S
//       }
//     },
//     j = function(a) {
//       var b, d, e, f, h, j, k, l, m, n, o, p, q, r = (a + "").match(c) || [],
//         s = [],
//         t = 0,
//         u = 0,
//         v = r.length,
//         w = 2,
//         x = 0;
//       if (!a || !isNaN(r[0]) || isNaN(r[1])) return g("ERROR: malformed path data: " + a), s;
//       for (b = 0; v > b; b++)
//         if (q = h, isNaN(r[b]) ? (h = r[b].toUpperCase(), j = h !== r[b]) : b--, e = +r[b + 1], f = +r[b + 2], j && (e += t, f += u), 0 === b && (l = e, m = f), "M" === h) t = e, u = f, k = [e, f], x += w, w = 2, s.push(k), b += 2;
//         else if ("C" === h) k || (k = [0, 0]), k[w++] = e, k[w++] = f, j || (t = u = 0), k[w++] = t + 1 * r[b + 3], k[w++] = u + 1 * r[b + 4], k[w++] = t += 1 * r[b + 5], k[w++] = u += 1 * r[b + 6], b += 6;
//       else if ("S" === h) "C" === q || "S" === q ? (n = t - k[w - 4], o = u - k[w - 3], k[w++] = t + n, k[w++] = u + o) : (k[w++] = t, k[w++] = u), k[w++] = e, k[w++] = f, j || (t = u = 0), k[w++] = t += 1 * r[b + 3], k[w++] = u += 1 * r[b + 4], b += 4;
//       else if ("Q" === h) n = e - t, o = f - u, k[w++] = t + 2 * n / 3, k[w++] = u + 2 * o / 3, j || (t = u = 0), t += 1 * r[b + 3], u += 1 * r[b + 4], n = e - t, o = f - u, k[w++] = t + 2 * n / 3, k[w++] = u + 2 * o / 3, k[w++] = t, k[w++] = u, b += 4;
//       else if ("T" === h) n = t - k[w - 4], o = u - k[w - 3], k[w++] = t + n, k[w++] = u + o, n = t + 1.5 * n - e, o = u + 1.5 * o - f, k[w++] = e + 2 * n / 3, k[w++] = f + 2 * o / 3, k[w++] = t = e, k[w++] = u = f, b += 2;
//       else if ("H" === h) f = u, k[w++] = t + (e - t) / 3, k[w++] = u + (f - u) / 3, k[w++] = t + 2 * (e - t) / 3, k[w++] = u + 2 * (f - u) / 3, k[w++] = t = e, k[w++] = f, b += 1;
//       else if ("V" === h) f = e, e = t, j && (f += u - t), k[w++] = e, k[w++] = u + (f - u) / 3, k[w++] = e, k[w++] = u + 2 * (f - u) / 3, k[w++] = e, k[w++] = u = f, b += 1;
//       else if ("L" === h) k[w++] = t + (e - t) / 3, k[w++] = u + (f - u) / 3, k[w++] = t + 2 * (e - t) / 3, k[w++] = u + 2 * (f - u) / 3, k[w++] = t = e, k[w++] = u = f, b += 2;
//       else if ("Z" === h) t = l, u = m;
//       else if ("A" === h) {
//         for (p = i(t, u, 1 * r[b + 1], 1 * r[b + 2], 1 * r[b + 3], 1 * r[b + 4], 1 * r[b + 5], (j ? t : 0) + 1 * r[b + 6], (j ? u : 0) + 1 * r[b + 7]), d = 0; d < p.length; d++) k[w++] = p[d];
//         t = k[w - 2], u = k[w - 1], b += 7
//       } else g("Error: malformed path data: " + a);
//       return s.totalPoints = x + w, s
//     },
//     k = function(a, b) {
//       var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q = 0,
//         r = .999999,
//         s = a.length,
//         t = b / ((s - 2) / 6);
//       for (o = 2; s > o; o += 6)
//         for (q += t; q > r;) c = a[o - 2], d = a[o - 1], e = a[o], f = a[o + 1], g = a[o + 2], h = a[o + 3], i = a[o + 4], j = a[o + 5], p = 1 / (Math.floor(q) + 1), k = c + (e - c) * p, m = e + (g - e) * p, k += (m - k) * p, m += (g + (i - g) * p - m) * p, l = d + (f - d) * p, n = f + (h - f) * p, l += (n - l) * p, n += (h + (j - h) * p - n) * p, a.splice(o, 4, c + (e - c) * p, d + (f - d) * p, k, l, k + (m - k) * p, l + (n - l) * p, m, n, g + (i - g) * p, h + (j - h) * p), o += 6, s += 6, q--;
//       return a
//     },
//     l = function(a) {
//       var b, c, d, e, f = "",
//         g = a.length,
//         h = 100;
//       for (c = 0; g > c; c++)
//         for (e = a[c], f += "M" + e[0] + "," + e[1] + " C", b = e.length, d = 2; b > d; d++) f += (e[d++] * h | 0) / h + "," + (e[d++] * h | 0) / h + " " + (e[d++] * h | 0) / h + "," + (e[d++] * h | 0) / h + " " + (e[d++] * h | 0) / h + "," + (e[d] * h | 0) / h + " ";
//       return f
//     },
//     m = function(a, b) {
//       return b.length - a.length
//     },
//     n = function(a) {
//       for (var b = [], c = a.length - 1, d = 0; --c > -1;) b[d++] = a[c], b[d++] = a[c + 1], c--;
//       for (c = 0; d > c; c++) a[c] = b[c];
//       a.reversed = a.reversed ? !1 : !0
//     },
//     o = function(a, b) {
//       var c, d, e = a.slice(0),
//         f = a.length,
//         g = f - 2;
//       for (b = 0 | b, c = 0; f > c; c++) d = (c + b) % g, a[c++] = e[d], a[c] = e[d + 1]
//     },
//     p = function(a, b, c) {
//       var d, e, f = a.length,
//         g = 0,
//         h = f - 2;
//       for (c *= 6, e = 0; f > e; e += 6) d = (e + c) % h, g += Math.abs(a[d] - b[e]) + Math.abs(a[d + 1] - b[e + 1]);
//       return g
//     },
//     q = function(a, b, c) {
//       var d, e, f, g = a.length,
//         h = p(a, b, 0),
//         i = 0;
//       for (f = 6; g > f; f += 6) e = p(a, b, f / 6), h > e && (h = e, i = f);
//       if (c)
//         for (d = a.slice(0), n(d), f = 6; g > f; f += 6) e = p(d, b, f / 6), h > e && (h = e, i = -f);
//       return i / 6
//     },
//     r = function(a, b, c) {
//       var d, e, f = a.length,
//         g = 99999999999,
//         h = 0;
//       for (e = 0; f > e; e += 6) d = Math.abs(a[e] - b) + Math.abs(a[e + 1] - c), g > d && (g = d, h = e);
//       return h
//     },
//     s = function(a, b, c) {
//       var d, e, f, g, h, i = b.length - a.length,
//         j = i > 0 ? b : a,
//         l = i > 0 ? a : b,
//         p = 0,
//         s = l.length,
//         t = "object" == typeof c && c.push ? c.slice(0) : [c],
//         u = "reverse" === t[0] || t[0] < 0;
//       if (i)
//         for (0 > i && (i = -i), a.sort(m), b.sort(m), j[0].length > l[0].length && k(l[0], (j[0].length - l[0].length) / 6 | 0); i > p;) f = r(l[0], j[s][0], j[s][1]), g = l[0][f], h = l[0][f + 1], l[s++] = [g, h, g, h, g, h, g, h], l.totalPoints += 8, p++;
//       for (s = 0; s < a.length; s++) d = b[s], e = a[s], i = d.length - e.length, 0 > i ? k(d, -i / 6 | 0) : i > 0 && k(e, i / 6 | 0), u && !e.reversed && n(e), c = t[s] || 0 === t[s] ? t[s] : "auto", c && (Math.abs(e[0] - e[e.length - 2]) < .01 && Math.abs(e[1] - e[e.length - 1]) < .01 ? "auto" === c ? (t[s] = c = q(e, d, 0 === s), 0 > c && (u = !0, n(e), c = -c), o(e, 6 * c)) : "reverse" !== c && o(e, 6 * (0 > c ? -c : c)) : !u && ("auto" === c && Math.abs(d[0] - e[0]) + Math.abs(d[1] - e[1]) + Math.abs(d[d.length - 2] - e[e.length - 2]) + Math.abs(d[d.length - 1] - e[e.length - 1]) > Math.abs(d[0] - e[e.length - 2]) + Math.abs(d[1] - e[e.length - 1]) + Math.abs(d[d.length - 2] - e[0]) + Math.abs(d[d.length - 1] - e[1]) || c % 2) ? (n(e), t[s] = -1, u = !0) : "auto" === c ? t[s] = 0 : "reverse" === c && (t[s] = -1));
//       return t
//     },
//     t = function(a, b) {
//       var c = j(a[0]),
//         d = j(a[1]);
//       s(c, d, b || 0 === b ? b : "auto"), a[0] = l(c), a[1] = l(d)
//     },
//     u = function(a) {
//       return a || 0 === a ? function(b) {
//         t(b, a)
//       } : t
//     },
//     v = function(a, b) {
//       if (!b) return a;
//       var c, e, f, g = a.match(d) || [],
//         h = g.length,
//         i = "";
//       for ("reverse" === b ? (e = h - 1, c = -2) : (e = (2 * (parseInt(b, 10) || 0) + 1 + 100 * h) % h, c = 2), f = 0; h > f; f += 2) i += g[e - 1] + "," + g[e] + " ", e = (e + c) % h;
//       return i
//     },
//     w = function(a, b) {
//       var c, d, e, f, g, h, i, j = 0,
//         k = parseFloat(a[0]),
//         l = parseFloat(a[1]),
//         m = k + "," + l + " ",
//         n = .999999;
//       for (e = a.length, c = .5 * b / (.5 * e - 1), d = 0; e - 2 > d; d += 2) {
//         if (j += c, h = parseFloat(a[d + 2]), i = parseFloat(a[d + 3]), j > n)
//           for (g = 1 / (Math.floor(j) + 1), f = 1; j > n;) m += (k + (h - k) * g * f).toFixed(2) + "," + (l + (i - l) * g * f).toFixed(2) + " ", j--, f++;
//         m += h + "," + i + " ", k = h, l = i
//       }
//       return m
//     },
//     x = function(a) {
//       var b = a[0].match(d) || [],
//         c = a[1].match(d) || [],
//         e = c.length - b.length;
//       e > 0 ? a[0] = w(b, e) : a[1] = w(c, -e)
//     },
//     y = function(a) {
//       return isNaN(a) ? x : function(b) {
//         x(b), b[1] = v(b[1], parseInt(a, 10))
//       }
//     },
//     z = function(a, b) {
//       var c = document.createElementNS("http://www.w3.org/2000/svg", "path"),
//         d = Array.prototype.slice.call(a.attributes),
//         e = d.length;
//       for (b = "," + b + ","; --e > -1;) - 1 === b.indexOf("," + d[e].nodeName + ",") && c.setAttributeNS(null, d[e].nodeName, d[e].nodeValue);
//       return c
//     },
//     A = function(a, b) {
//       var c, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y = a.tagName.toLowerCase(),
//         A = .552284749831;
//       return "path" !== y && a.getBBox ? (i = z(a, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"), "rect" === y ? (g = +a.getAttribute("rx") || 0, h = +a.getAttribute("ry") || 0, e = +a.getAttribute("x") || 0, f = +a.getAttribute("y") || 0, m = (+a.getAttribute("width") || 0) - 2 * g, n = (+a.getAttribute("height") || 0) - 2 * h, g || h ? (o = e + g * (1 - A), p = e + g, q = p + m, r = q + g * A, s = q + g, t = f + h * (1 - A), u = f + h, v = u + n, w = v + h * A, x = v + h, c = "M" + s + "," + u + " V" + v + " C" + [s, w, r, x, q, x, q - (q - p) / 3, x, p + (q - p) / 3, x, p, x, o, x, e, w, e, v, e, v - (v - u) / 3, e, u + (v - u) / 3, e, u, e, t, o, f, p, f, p + (q - p) / 3, f, q - (q - p) / 3, f, q, f, r, f, s, t, s, u].join(",")) : c = "M" + (e + m) + "," + f + " v" + n + " h" + -m + " v" + -n + " h" + m + "z") : "circle" === y || "ellipse" === y ? ("circle" === y ? (g = h = +a.getAttribute("r") || 0, k = g * A) : (g = +a.getAttribute("rx") || 0, h = +a.getAttribute("ry") || 0, k = h * A), e = +a.getAttribute("cx") || 0, f = +a.getAttribute("cy") || 0, j = g * A, c = "M" + (e + g) + "," + f + " C" + [e + g, f + k, e + j, f + h, e, f + h, e - j, f + h, e - g, f + k, e - g, f, e - g, f - k, e - j, f - h, e, f - h, e + j, f - h, e + g, f - k, e + g, f].join(",")) : "line" === y ? c = "M" + a.getAttribute("x1") + "," + a.getAttribute("y1") + " L" + a.getAttribute("x2") + "," + a.getAttribute("y2") : ("polyline" === y || "polygon" === y) && (l = (a.getAttribute("points") + "").match(d) || [], e = l.shift(), f = l.shift(), c = "M" + e + "," + f + " L" + l.join(","), "polygon" === y && (c += "," + e + "," + f)), i.setAttribute("d", c), b && a.parentNode && (a.parentNode.insertBefore(i, a), a.parentNode.removeChild(a)), i) : a
//     },
//     B = function(a, b) {
//       var c, e;
//       return ("string" != typeof a || (a.match(d) || []).length < 3) && (c = f.selector(a), c && c[0] ? (c = c[0], e = c.nodeName.toUpperCase(), b && "PATH" !== e && (c = A(c, !1), e = "PATH"), a = c.getAttribute("PATH" === e ? "d" : "points") || "") : g("WARNING: invalid morph to: " + a)), a
//     },
//     C = "Use MorphSVGPlugin.convertToPath(elementOrSelectorText) to convert to a path before morphing.",
//     D = _gsScope._gsDefine.plugin({
//       propName: "morphSVG",
//       API: 2,
//       global: !0,
//       version: "0.2.0",
//       init: function(a, b, c) {
//         var d, f, h, i, j;
//         return "function" != typeof a.setAttribute ? !1 : (d = a.nodeName.toUpperCase(), j = "POLYLINE" === d || "POLYGON" === d, "PATH" === d || j ? (f = "PATH" === d ? "d" : "points", ("string" == typeof b || b.getBBox) && (b = {
//           shape: b
//         }), i = B(b.shape || b.d || b.points || "", "d" === f), j && e.test(i) ? (g("WARNING: a <" + d + "> cannot accept path data. " + C), !1) : (this._target = a, h = this._addTween(a, "setAttribute", a.getAttribute(f) + "", i + "", "morphSVG", !1, f, "d" === f ? u(b.shapeIndex) : y(b.shapeIndex)), h && (this._overwriteProps.push("morphSVG"), h.end = i, h.endProp = f), !0)) : (g("WARNING: cannot morph a <" + d + "> SVG element. " + C), !1))
//       },
//       set: function(a) {
//         var b;
//         if (this._super.setRatio.call(this, a), 1 === a)
//           for (b = this._firstPT; b;) b.end && this._target.setAttribute(b.endProp, b.end), b = b._next
//       }
//     });
//   D.pathFilter = t, D.pointsFilter = x, D.subdivideRawBezier = k, D.pathDataToRawBezier = function(a) {
//     return j(B(a, !0))
//   }, D.equalizeSegmentQuantity = s, D.convertToPath = function(a, b) {
//     "string" == typeof a && (a = f.selector(a));
//     for (var c = a && 0 !== a.length ? a.length && a[0] && a[0].nodeType ? a : [a] : [], d = c.length; --d > -1;) c[d] = A(c[d], b !== !1);
//     return c
//   }, D.pathDataToBezier = function(a, b) {
//     var c, d, e, f, g, h, i = j(B(a, !0))[0] || [];
//     if (b = b || {}, f = b.matrix, c = [], e = i.length, f)
//       for (b.relative && (f = f.slice(0), f[4] -= i[0], f[5] -= i[1]), d = 0; e > d; d += 2) c.push({
//         x: i[d] * f[0] + i[d + 1] * f[2] + f[4],
//         y: i[d] * f[1] + i[d + 1] * f[3] + f[5]
//       });
//     else
//       for (g = b.offsetX || 0, h = b.offsetY || 0, b.relative && (g -= i[0], h -= i[1]), d = 0; e > d; d += 2) c.push({
//         x: i[d] + g,
//         y: i[d + 1] + h
//       });
//     return c
//   }
// }), _gsScope._gsDefine && _gsScope._gsQueue.pop()();