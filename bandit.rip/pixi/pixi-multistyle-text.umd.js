!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : (t.MultiStyleText = e());
})(this, function () {
  var t = function (e, n) {
    return (t =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (t, e) {
          t.__proto__ = e;
        }) ||
      function (t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      })(e, n);
  };
  var e = [
    "pointerover",
    "pointerenter",
    "pointerdown",
    "pointermove",
    "pointerup",
    "pointercancel",
    "pointerout",
    "pointerleave",
    "gotpointercapture",
    "lostpointercapture",
    "mouseover",
    "mouseenter",
    "mousedown",
    "mousemove",
    "mouseup",
    "mousecancel",
    "mouseout",
    "mouseleave",
    "touchover",
    "touchenter",
    "touchdown",
    "touchmove",
    "touchup",
    "touchcancel",
    "touchout",
    "touchleave",
  ];
  return (function (n) {
    function o(t, o) {
      var i = n.call(this, t) || this;
      return (
        (i.styles = o),
        e.forEach(function (t) {
          i.on(t, function (t) {
            return i.handleInteraction(t);
          });
        }),
        i
      );
    }
    return (
      (function (e, n) {
        function o() {
          this.constructor = e;
        }
        t(e, n),
          (e.prototype =
            null === n
              ? Object.create(n)
              : ((o.prototype = n.prototype), new o()));
      })(o, n),
      (o.prototype.handleInteraction = function (t) {
        var e = t,
          n = t.data.getLocalPosition(this),
          o = this.hitboxes.reduce(function (t, e) {
            return void 0 !== t ? t : e.hitbox.contains(n.x, n.y) ? e : void 0;
          }, void 0);
        e.targetTag = void 0 === o ? void 0 : o.tag;
      }),
      Object.defineProperty(o.prototype, "styles", {
        set: function (t) {
          for (var e in ((this.textStyles = {}),
          (this.textStyles.default = this.assign({}, o.DEFAULT_TAG_STYLE)),
          t))
            "default" === e
              ? this.assign(this.textStyles.default, t[e])
              : (this.textStyles[e] = this.assign({}, t[e]));
          (this._style = new PIXI.TextStyle(this.textStyles.default)),
            (this.dirty = !0);
        },
        enumerable: !0,
        configurable: !0,
      }),
      (o.prototype.setTagStyle = function (t, e) {
        t in this.textStyles
          ? this.assign(this.textStyles[t], e)
          : (this.textStyles[t] = this.assign({}, e)),
          (this._style = new PIXI.TextStyle(this.textStyles.default)),
          (this.dirty = !0);
      }),
      (o.prototype.deleteTagStyle = function (t) {
        "default" === t
          ? (this.textStyles.default = this.assign({}, o.DEFAULT_TAG_STYLE))
          : delete this.textStyles[t],
          (this._style = new PIXI.TextStyle(this.textStyles.default)),
          (this.dirty = !0);
      }),
      (o.prototype.getTagRegex = function (t, e) {
        var n = Object.keys(this.textStyles).join("|"),
          o =
            "<" +
            (n = t ? "(" + n + ")" : "(?:" + n + ")") +
            "(?:\\s+[A-Za-z0-9_\\-]+=(?:\"(?:[^\"]+|\\\\\")*\"|'(?:[^']+|\\\\')*'))*\\s*>|</" +
            n +
            "\\s*>";
        return e && (o = "(" + o + ")"), new RegExp(o, "g");
      }),
      (o.prototype.getPropertyRegex = function () {
        return new RegExp(
          "([A-Za-z0-9_\\-]+)=(?:\"((?:[^\"]+|\\\\\")*)\"|'((?:[^']+|\\\\')*)')",
          "g"
        );
      }),
      (o.prototype._getTextDataPerLine = function (t) {
        for (
          var e = [],
            n = this.getTagRegex(!0, !1),
            o = [this.assign({}, this.textStyles.default)],
            i = [{ name: "default", properties: {} }],
            s = 0;
          s < t.length;
          s++
        ) {
          for (var r = [], a = [], h = void 0; (h = n.exec(t[s])); ) a.push(h);
          if (0 === a.length)
            r.push(this.createTextData(t[s], o[o.length - 1], i[i.length - 1]));
          else {
            for (var l = 0, c = 0; c < a.length; c++) {
              if (
                (a[c].index > l &&
                  r.push(
                    this.createTextData(
                      t[s].substring(l, a[c].index),
                      o[o.length - 1],
                      i[i.length - 1]
                    )
                  ),
                "/" === a[c][0][1])
              )
                o.length > 1 && (o.pop(), i.pop());
              else {
                o.push(
                  this.assign({}, o[o.length - 1], this.textStyles[a[c][1]])
                );
                for (
                  var d = {}, x = this.getPropertyRegex(), u = void 0;
                  (u = x.exec(a[c][0]));

                )
                  d[u[1]] = u[2] || u[3];
                i.push({ name: a[c][1], properties: d });
              }
              l = a[c].index + a[c][0].length;
            }
            l < t[s].length &&
              r.push(
                this.createTextData(
                  t[s].substring(l),
                  o[o.length - 1],
                  i[i.length - 1]
                )
              );
          }
          e.push(r);
        }
        return e;
      }),
      (o.prototype.getFontString = function (t) {
        return new PIXI.TextStyle(t).toFontString();
      }),
      (o.prototype.createTextData = function (t, e, n) {
        return {
          text: t,
          style: e,
          width: 0,
          height: 0,
          fontProperties: void 0,
          tag: n,
        };
      }),
      (o.prototype.getDropShadowPadding = function () {
        var t = this,
          e = 0,
          n = 0;
        return (
          Object.keys(this.textStyles).forEach(function (o) {
            var i = t.textStyles[o],
              s = i.dropShadowBlur;
            (e = Math.max(e, i.dropShadowDistance || 0)),
              (n = Math.max(n, s || 0));
          }),
          e + n
        );
      }),
      (o.prototype.updateText = function () {
        var t = this;
        if (this.dirty) {
          (this.hitboxes = []),
            (this.texture.baseTexture.resolution = this.resolution);
          var e = this.textStyles,
            n = this.text;
          this._style.wordWrap && (n = this.wordWrap(this.text));
          for (
            var i = n.split(/(?:\r\n|\r|\n)/),
              s = this._getTextDataPerLine(i),
              r = [],
              a = [],
              h = [],
              l = 0,
              c = 0;
            c < i.length;
            c++
          ) {
            for (var d = 0, x = 0, u = 0, p = 0; p < s[c].length; p++) {
              var g = s[c][p].style;
              (this.context.font = this.getFontString(g)),
                (s[c][p].width = this.context.measureText(s[c][p].text).width),
                0 !== s[c][p].text.length &&
                  ((s[c][p].width +=
                    (s[c][p].text.length - 1) * g.letterSpacing),
                  p > 0 && (d += g.letterSpacing / 2),
                  p < s[c].length - 1 && (d += g.letterSpacing / 2)),
                (d += s[c][p].width),
                (s[c][p].fontProperties = PIXI.TextMetrics.measureFont(
                  this.context.font
                )),
                (s[c][p].height = s[c][p].fontProperties.fontSize),
                "number" == typeof g.valign
                  ? ((x = Math.min(
                      x,
                      g.valign - s[c][p].fontProperties.descent
                    )),
                    (u = Math.max(u, g.valign + s[c][p].fontProperties.ascent)))
                  : ((x = Math.min(x, -s[c][p].fontProperties.descent)),
                    (u = Math.max(u, s[c][p].fontProperties.ascent)));
            }
            (r[c] = d), (a[c] = x), (h[c] = u), (l = Math.max(l, d));
          }
          var f = Object.keys(e)
              .map(function (t) {
                return e[t];
              })
              .reduce(function (t, e) {
                return Math.max(t, e.strokeThickness || 0);
              }, 0),
            y = this.getDropShadowPadding(),
            b = l + 2 * f + 2 * y,
            v =
              h.reduce(function (t, e) {
                return t + e;
              }, 0) -
              a.reduce(function (t, e) {
                return t + e;
              }, 0) +
              2 * f +
              2 * y;
          (this.canvas.width = b * this.resolution),
            (this.canvas.height = v * this.resolution),
            this.context.scale(this.resolution, this.resolution),
            (this.context.textBaseline = "alphabetic"),
            (this.context.lineJoin = "round");
          var S = y + f,
            T = [];
          for (c = 0; c < s.length; c++) {
            var w = s[c],
              m = void 0;
            switch (this._style.align) {
              case "left":
                m = y + f;
                break;
              case "center":
                m = y + f + (l - r[c]) / 2;
                break;
              case "right":
                m = y + f + l - r[c];
            }
            for (p = 0; p < w.length; p++) {
              var P = w[p],
                k = P.style,
                _ = P.text,
                I = P.fontProperties,
                O = P.width,
                F = P.tag,
                A = S + I.ascent;
              switch (k.valign) {
                case "top":
                  break;
                case "baseline":
                  A += h[c] - I.ascent;
                  break;
                case "middle":
                  A += (h[c] - a[c] - I.ascent - I.descent) / 2;
                  break;
                case "bottom":
                  A += h[c] - a[c] - I.ascent - I.descent;
                  break;
                default:
                  A += h[c] - I.ascent - k.valign;
              }
              if (0 === k.letterSpacing)
                T.push({
                  text: _,
                  style: k,
                  x: m,
                  y: A,
                  width: O,
                  ascent: I.ascent,
                  descent: I.descent,
                  tag: F,
                }),
                  (m += w[p].width);
              else {
                this.context.font = this.getFontString(w[p].style);
                for (var D = 0; D < _.length; D++) {
                  (D > 0 || p > 0) && (m += k.letterSpacing / 2);
                  var E = this.context.measureText(_.charAt(D)).width;
                  T.push({
                    text: _.charAt(D),
                    style: k,
                    x: m,
                    y: A,
                    width: E,
                    ascent: I.ascent,
                    descent: I.descent,
                    tag: F,
                  }),
                    (m += E),
                    (D < _.length - 1 || p < w.length - 1) &&
                      (m += k.letterSpacing / 2);
                }
              }
            }
            S += h[c] - a[c];
          }
          this.context.save(),
            T.forEach(function (e) {
              var n = e.style,
                o = e.text,
                i = e.x,
                s = e.y;
              if (n.dropShadow) {
                t.context.font = t.getFontString(n);
                var r = n.dropShadowColor;
                "number" == typeof r && (r = PIXI.utils.hex2string(r)),
                  (t.context.shadowColor = r),
                  (t.context.shadowBlur = n.dropShadowBlur),
                  (t.context.shadowOffsetX =
                    Math.cos(n.dropShadowAngle) *
                    n.dropShadowDistance *
                    t.resolution),
                  (t.context.shadowOffsetY =
                    Math.sin(n.dropShadowAngle) *
                    n.dropShadowDistance *
                    t.resolution),
                  t.context.fillText(o, i, s);
              }
            }),
            this.context.restore(),
            T.forEach(function (e) {
              var n = e.style,
                o = e.text,
                i = e.x,
                s = e.y;
              if (void 0 !== n.stroke && n.strokeThickness) {
                t.context.font = t.getFontString(n);
                var r = n.stroke;
                "number" == typeof r && (r = PIXI.utils.hex2string(r)),
                  (t.context.strokeStyle = r),
                  (t.context.lineWidth = n.strokeThickness),
                  t.context.strokeText(o, i, s);
              }
            }),
            T.forEach(function (e) {
              var n = e.style,
                o = e.text,
                i = e.x,
                s = e.y;
              if (void 0 !== n.fill) {
                t.context.font = t.getFontString(n);
                var r = n.fill;
                if ("number" == typeof r) r = PIXI.utils.hex2string(r);
                else if (Array.isArray(r))
                  for (var a = 0; a < r.length; a++) {
                    var h = r[a];
                    "number" == typeof h && (r[a] = PIXI.utils.hex2string(h));
                  }
                (t.context.fillStyle = t._generateFillStyle(
                  new PIXI.TextStyle(n),
                  [o]
                )),
                  t.context.fillText(o, i, s);
              }
            }),
            T.forEach(function (e) {
              var n = e.style,
                i = e.x,
                s = e.y,
                r = e.width,
                a = e.ascent,
                h = e.descent,
                l = e.tag,
                c = -t._style.padding - t.getDropShadowPadding();
              t.hitboxes.push({
                tag: l,
                hitbox: new PIXI.Rectangle(i + c, s - a + c, r, a + h),
              }),
                (void 0 === n.debug ? o.debugOptions.spans.enabled : n.debug) &&
                  ((t.context.lineWidth = 1),
                  o.debugOptions.spans.bounding &&
                    ((t.context.fillStyle = o.debugOptions.spans.bounding),
                    (t.context.strokeStyle = o.debugOptions.spans.bounding),
                    t.context.beginPath(),
                    t.context.rect(i, s - a, r, a + h),
                    t.context.fill(),
                    t.context.stroke(),
                    t.context.stroke()),
                  o.debugOptions.spans.baseline &&
                    ((t.context.strokeStyle = o.debugOptions.spans.baseline),
                    t.context.beginPath(),
                    t.context.moveTo(i, s),
                    t.context.lineTo(i + r, s),
                    t.context.closePath(),
                    t.context.stroke()),
                  o.debugOptions.spans.top &&
                    ((t.context.strokeStyle = o.debugOptions.spans.top),
                    t.context.beginPath(),
                    t.context.moveTo(i, s - a),
                    t.context.lineTo(i + r, s - a),
                    t.context.closePath(),
                    t.context.stroke()),
                  o.debugOptions.spans.bottom &&
                    ((t.context.strokeStyle = o.debugOptions.spans.bottom),
                    t.context.beginPath(),
                    t.context.moveTo(i, s + h),
                    t.context.lineTo(i + r, s + h),
                    t.context.closePath(),
                    t.context.stroke()),
                  o.debugOptions.spans.text &&
                    ((t.context.fillStyle = "#ffffff"),
                    (t.context.strokeStyle = "#000000"),
                    (t.context.lineWidth = 2),
                    (t.context.font = "8px monospace"),
                    t.context.strokeText(l.name, i, s - a + 8),
                    t.context.fillText(l.name, i, s - a + 8),
                    t.context.strokeText(
                      r.toFixed(2) + "x" + (a + h).toFixed(2),
                      i,
                      s - a + 16
                    ),
                    t.context.fillText(
                      r.toFixed(2) + "x" + (a + h).toFixed(2),
                      i,
                      s - a + 16
                    )));
            }),
            o.debugOptions.objects.enabled &&
              (o.debugOptions.objects.bounding &&
                ((this.context.fillStyle = o.debugOptions.objects.bounding),
                this.context.beginPath(),
                this.context.rect(0, 0, b, v),
                this.context.fill()),
              o.debugOptions.objects.text &&
                ((this.context.fillStyle = "#ffffff"),
                (this.context.strokeStyle = "#000000"),
                (this.context.lineWidth = 2),
                (this.context.font = "8px monospace"),
                this.context.strokeText(
                  b.toFixed(2) + "x" + v.toFixed(2),
                  0,
                  8,
                  b
                ),
                this.context.fillText(
                  b.toFixed(2) + "x" + v.toFixed(2),
                  0,
                  8,
                  b
                ))),
            this.updateTexture();
        }
      }),
      (o.prototype.wordWrap = function (t) {
        var e = "",
          n = this.getTagRegex(!0, !0),
          o = t.split("\n"),
          i = this._style.wordWrapWidth,
          s = [this.assign({}, this.textStyles.default)];
        this.context.font = this.getFontString(this.textStyles.default);
        for (var r = 0; r < o.length; r++) {
          for (var a = i, h = o[r].split(n), l = !0, c = 0; c < h.length; c++)
            if (n.test(h[c]))
              (e += h[c]),
                "/" === h[c][1]
                  ? ((c += 2), s.pop())
                  : (s.push(
                      this.assign({}, s[s.length - 1], this.textStyles[h[++c]])
                    ),
                    c++),
                (this.context.font = this.getFontString(s[s.length - 1]));
            else
              for (var d = h[c].split(" "), x = 0; x < d.length; x++) {
                var u = this.context.measureText(d[x]).width;
                if (this._style.breakWords && u > a) {
                  var p = d[x].split("");
                  x > 0 &&
                    ((e += " "), (a -= this.context.measureText(" ").width));
                  for (var g = 0; g < p.length; g++) {
                    var f = this.context.measureText(p[g]).width;
                    f > a
                      ? ((e += "\n" + p[g]), (a = i - f))
                      : ((e += p[g]), (a -= f));
                  }
                } else if (this._style.breakWords) (e += d[x]), (a -= u);
                else {
                  var y = u + (x > 0 ? this.context.measureText(" ").width : 0);
                  y > a
                    ? (l || (e += "\n"), (e += d[x]), (a = i - u))
                    : ((a -= y), x > 0 && (e += " "), (e += d[x]));
                }
                l = !1;
              }
          r < o.length - 1 && (e += "\n");
        }
        return e;
      }),
      (o.prototype.updateTexture = function () {
        var t = this._texture,
          e = this.getDropShadowPadding();
        (t.baseTexture.hasLoaded = !0),
          (t.baseTexture.resolution = this.resolution),
          (t.baseTexture.realWidth = this.canvas.width),
          (t.baseTexture.realHeight = this.canvas.height),
          (t.baseTexture.width = this.canvas.width / this.resolution),
          (t.baseTexture.height = this.canvas.height / this.resolution),
          (t.trim.width = t.frame.width = this.canvas.width / this.resolution),
          (t.trim.height = t.frame.height =
            this.canvas.height / this.resolution),
          (t.trim.x = -this._style.padding - e),
          (t.trim.y = -this._style.padding - e),
          (t.orig.width = t.frame.width - 2 * (this._style.padding + e)),
          (t.orig.height = t.frame.height - 2 * (this._style.padding + e)),
          this._onTextureUpdate(),
          t.baseTexture.emit("update", t.baseTexture),
          (this.dirty = !1);
      }),
      (o.prototype.assign = function (t) {
        for (var e = [], n = 1; n < arguments.length; n++)
          e[n - 1] = arguments[n];
        for (var o = 0, i = e; o < i.length; o++) {
          var s = i[o];
          for (var r in s) t[r] = s[r];
        }
        return t;
      }),
      (o.DEFAULT_TAG_STYLE = {
        align: "left",
        breakWords: !1,
        dropShadow: !1,
        dropShadowAngle: Math.PI / 6,
        dropShadowBlur: 0,
        dropShadowColor: "#000000",
        dropShadowDistance: 5,
        fill: "black",
        fillGradientType: PIXI.TEXT_GRADIENT.LINEAR_VERTICAL,
        fontFamily: "Arial",
        fontSize: 26,
        fontStyle: "normal",
        fontVariant: "normal",
        fontWeight: "normal",
        letterSpacing: 0,
        lineHeight: 0,
        lineJoin: "miter",
        miterLimit: 10,
        padding: 0,
        stroke: "black",
        strokeThickness: 0,
        textBaseline: "alphabetic",
        valign: "baseline",
        wordWrap: !1,
        wordWrapWidth: 100,
      }),
      (o.debugOptions = {
        spans: {
          enabled: !1,
          baseline: "#44BB44",
          top: "#BB4444",
          bottom: "#4444BB",
          bounding: "rgba(255, 255, 255, 0.1)",
          text: !0,
        },
        objects: {
          enabled: !1,
          bounding: "rgba(255, 255, 255, 0.05)",
          text: !0,
        },
      }),
      o
    );
  })(PIXI.Text);
});
//# sourceMappingURL=pixi-multistyle-text.umd.js.map
