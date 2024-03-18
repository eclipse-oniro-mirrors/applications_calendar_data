"use strict";
var e = require("path"), t = require("os"), n = require("fs"), r = require("child_process"), u = require("process"),
  o = require("tty"), i = require("util"), s = require("url"), c = require("constants"), a = require("stream"),
  l = require("assert"), f = require("zlib"), d = require("net"), D = require("crypto"),
  p = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {
  }, h = {}, E = {}, m = p && p.__importDefault || function (e) {
    return e && e.__esModule ? e : { default: e }
  };
Object.defineProperty(E, "__esModule", { value: !0 }), E.maxPathLength = E.isMac = E.isLinux = E.isWindows = void 0;
const y = m(t), C = "Windows_NT", F = "Darwin";

function g() {
  return y.default.type() === C
}

function A() {
  return y.default.type() === F
}

E.isWindows = g, E.isLinux = function () {
  return "Linux" === y.default.type()
}, E.isMac = A, E.maxPathLength = function () {
  return A() ? 1016 : g() ? 259 : 4095
}, Object.defineProperty(h, "__esModule", {
  value: !0
}), h.LOG_LEVEL = h.ANALYZE = h.PARALLEL = h.INCREMENTAL = h.DAEMON = h.DOT = h.PROPERTIES = h.HVIGOR_ARK_COMPILE_MAX_SIZE = h.HVIGOR_POOL_CACHE_TTL = h.HVIGOR_POOL_CACHE_CAPACITY = h.HVIGOR_POOL_MAX_CORE_SIZE = h.HVIGOR_POOL_MAX_SIZE = h.ENABLE_SIGN_TASK_KEY = h.HVIGOR_CACHE_DIR_KEY = h.WORK_SPACE = h.PROJECT_CACHES = h.HVIGOR_USER_HOME_DIR_NAME = h.DEFAULT_PACKAGE_JSON = h.DEFAULT_HVIGOR_CONFIG_JSON_FILE_NAME = h.PNPM = h.HVIGOR = h.NPM_TOOL = h.PNPM_TOOL = h.HVIGOR_ENGINE_PACKAGE_NAME = void 0;
const v = E;
h.HVIGOR_ENGINE_PACKAGE_NAME = "@ohos/hvigor", h.PNPM_TOOL = (0, v.isWindows)() ? "pnpm.cmd" : "pnpm", h.NPM_TOOL = (0, v.isWindows)() ? "npm.cmd" : "npm", h.HVIGOR = "hvigor", h.PNPM = "pnpm", h.DEFAULT_HVIGOR_CONFIG_JSON_FILE_NAME = "hvigor-config.json5", h.DEFAULT_PACKAGE_JSON = "package.json", h.HVIGOR_USER_HOME_DIR_NAME = ".hvigor", h.PROJECT_CACHES = "project_caches";
var S = h.WORK_SPACE = "workspace";
h.HVIGOR_CACHE_DIR_KEY = "hvigor.cacheDir", h.ENABLE_SIGN_TASK_KEY = "enableSignTask", h.HVIGOR_POOL_MAX_SIZE = "hvigor.pool.maxSize", h.HVIGOR_POOL_MAX_CORE_SIZE = "hvigor.pool.maxCoreSize", h.HVIGOR_POOL_CACHE_CAPACITY = "hvigor.pool.cache.capacity", h.HVIGOR_POOL_CACHE_TTL = "hvigor.pool.cache.ttl", h.HVIGOR_ARK_COMPILE_MAX_SIZE = "hvigor.arkCompile.maxSize", h.PROPERTIES = "properties", h.DOT = ".", h.DAEMON = "daemon", h.INCREMENTAL = "incremental", h.PARALLEL = "typeCheck", h.ANALYZE = "analyze", h.LOG_LEVEL = "logLevel";
var w = {}, O = {};
Object.defineProperty(O, "__esModule", {
  value: !0
}), O.logError = O.logInfo = O.logErrorAndExit = void 0, O.logErrorAndExit = function (e) {
  e instanceof Error ? console.error(e.message) : console.error(e), process.exit(-1)
}, O.logInfo = function (e) {
  console.log(e)
}, O.logError = function (e) {
  console.error(e)
};
var _ = p && p.__createBinding || (Object.create ? function (e, t, n, r) {
  void 0 === r && (r = n);
  var u = Object.getOwnPropertyDescriptor(t, n);
  u && !("get" in u ? !t.__esModule : u.writable || u.configurable) || (u = {
    enumerable: !0, get: function () {
      return t[n]
    }
  }), Object.defineProperty(e, r, u)
} : function (e, t, n, r) {
  void 0 === r && (r = n), e[r] = t[n]
}), b = p && p.__setModuleDefault || (Object.create ? function (e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t })
} : function (e, t) {
  e.default = t
}), B = p && p.__importStar || function (e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (null != e) for (var n in e) "default" !== n && Object.prototype.hasOwnProperty.call(e, n) && _(t, e, n);
  return b(t, e), t
};
Object.defineProperty(w, "__esModule", { value: !0 });
var P = w.executeBuild = void 0;
const k = B(n), I = B(e), x = O, N = r;
P = w.executeBuild = function (e) {
  const t = I.resolve(e, "node_modules", "@ohos", "hvigor", "bin", "hvigor.js");
  try {
    const e = k.realpathSync(t), n = process.argv.slice(2), r = (0, N.spawn)("node", [e, ...n], { env: process.env });
    r.stdout.on("data", (e => {
      (0, x.logInfo)(`${e.toString().trim()}`)
    })), r.stderr.on("data", (e => {
      (0, x.logError)(`${e.toString().trim()}`)
    })), r.on("exit", ((e, t) => {
      process.exit(null != e ? e : -1)
    }))
  } catch (n) {
    (0, x.logErrorAndExit)(`Error: ENOENT: no such file ${t},delete ${e} and retry.`)
  }
};
var R, T, M, L, j, $ = {}, H = {}, G = { exports: {} }, V = { exports: {} };

function U() {
  if (T) return R;
  T = 1;
  var e = 1e3, t = 60 * e, n = 60 * t, r = 24 * n, u = 7 * r, o = 365.25 * r;

  function i(e, t, n, r) {
    var u = t >= 1.5 * n;
    return Math.round(e / n) + " " + r + (u ? "s" : "")
  }

  return R = function (s, c) {
    c = c || {};
    var a = typeof s;
    if ("string" === a && s.length > 0) return function(i){
      if ((i = String(i)).length > 100) return;
      var s = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(i);
      if (!s) return;
      var c = parseFloat(s[1]);
      switch ((s[2] || "ms").toLowerCase()) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return c * o;
        case "weeks":
        case "week":
        case "w":
          return c * u;
        case "days":
        case "day":
        case "d":
          return c * r;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return c * n;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return c * t;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return c * e;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return c;
        default:
          return
      }
    }(s);
    if ("number" === a && isFinite(s)) return c.long ? function(u){
      var o = Math.abs(u);
      if (o >= r) return i(u, o, r, "day");
      if (o >= n) return i(u, o, n, "hour");
      if (o >= t) return i(u, o, t, "minute");
      if (o >= e) return i(u, o, e, "second");
      return u + " ms"
    }(s) : function(u){
      var o = Math.abs(u);
      if (o >= r) return Math.round(u / r) + "d";
      if (o >= n) return Math.round(u / n) + "h";
      if (o >= t) return Math.round(u / t) + "m";
      if (o >= e) return Math.round(u / e) + "s";
      return u + "ms"
    }(s);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(s))
  }
}

function J() {
  if (L) return M;
  return L = 1, M = function (e) {

    function t(e) {
      let r, u, o, i = null;

      function s(...e) {
        if (!s.enabled) return;
        const n = s, u = Number(new Date), o = u - (r || u);
        n.diff = o, n.prev = r, n.curr = u, r = u, e[0] = t.coerce(e[0]), "string" != typeof e[0] && e.unshift("%O");
        let i = 0;
        e[0] = e[0].replace(/%([a-zA-Z%])/g, ((r, u) => {
          if ("%%" === r) return "%";
          i++;
          const o = t.formatters[u];
          if ("function" == typeof o) {
            const t = e[i];
            r = o.call(n, t), e.splice(i, 1), i--
          }
          return r
        })), t.formatArgs.call(n, e);
        (n.log || t.log).apply(n, e)
      }

      return s.namespace = e, s.useColors = t.useColors(), s.color = t.selectColor(e), s.extend = n, s.destroy = t.destroy, Object.defineProperty(s, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => null !== i ? i : (u !== t.namespaces && (u = t.namespaces, o = t.enabled(e)), o),
        set: e => {
          i = e
        }
      }), "function" == typeof t.init && t.init(s), s
    }

    function n(e, n) {
      const r = t(this.namespace + (void 0 === n ? ":" : n) + e);
      return r.log = this.log, r
    }

    function r(e) {
      return e.toString().substring(2, e.toString().length - 2).replace(/\.\*\?$/, "*")
    }

    return t.debug = t, t.default = t, t.coerce = function (e) {
      if (e instanceof Error) return e.stack || e.message;
      return e
    }, t.disable = function () {
      const e = [...t.names.map(r), ...t.skips.map(r).map((e => "-" + e))].join(",");
      return t.enable(""), e
    }, t.enable = function (e) {
      let n;
      t.save(e), t.namespaces = e, t.names = [], t.skips = [];
      const r = ("string" == typeof e ? e : "").split(/[\s,]+/), u = r.length;
      for (n = 0; n < u; n++) r[n] && ("-" === (e = r[n].replace(/\*/g, ".*?"))[0] ? t.skips.push(new RegExp("^" + e.slice(1) + "$")) : t.names.push(new RegExp("^" + e + "$")))
    }, t.enabled = function (e) {
      if ("*" === e[e.length-1]) return !0;
      let n, r;
      for (n = 0, r = t.skips.length; n < r; n++) if (t.skips[n].test(e)) return !1;
      for (n = 0, r = t.names.length; n < r; n++) if (t.names[n].test(e)) return !0;
      return !1
    }, t.humanize = U(), t.destroy = function () {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")
    }, Object.keys(e).forEach((n => {
      t[n] = e[n]
    })), t.names = [], t.skips = [], t.formatters = {}, t.selectColor = function (e) {
      let n = 0;
      for (let t = 0; t < e.length; t++) n = (n << 5) - n + e.charCodeAt(t), n |= 0;
      return t.colors[Math.abs(n)%t.colors.length]
    }, t.enable(t.load()), t
  }, M
}

var W, z, K, q, Y, Z, X = { exports: {} };

function Q() {
  return z || (z = 1, W = (e, t) => {
    t = t || process.argv;
    const n = e.startsWith("-") ? "" : 1 === e.length ? "-" : "--", r = t.indexOf(n + e), u = t.indexOf("--");
    return -1 !== r && (-1 === u || r < u)
  }), W
}

function ee() {
  if (q) return K;
  q = 1;
  const e = t, n = Q(), r = process.env;
  let u;

  function o(t) {
    const o = function(t){
      if (!1 === u) return 0;
      if (n("color=16m") || n("color=full") || n("color=truecolor")) return 3;
      if (n("color=256")) return 2;
      if (t && !t.isTTY && !0 !== u) return 0;
      const o = u ? 1 : 0;
      if ("win32" === process.platform) {
        const t = e.release().split(".");
        return Number(process.versions.node.split(".")[0]) >= 8 && Number(t[0]) >= 10 && Number(t[2]) >= 10586 ? Number(t[2]) >= 14931 ? 3 : 2 : 1
      }
      if ("CI" in r) return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((e => e in r)) || "codeship" === r.CI_NAME ? 1 : o;
      if ("TEAMCITY_VERSION" in r) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(r.TEAMCITY_VERSION) ? 1 : 0;
      if ("truecolor" === r.COLORTERM) return 3;
      if ("TERM_PROGRAM" in r) {
        const e = parseInt((r.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (r.TERM_PROGRAM) {
          case "iTerm.app":
            return e >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2
        }
      }
      return /-256(color)?$/i.test(r.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(r.TERM) || "COLORTERM" in r ? 1 : (r.TERM, o)
    }(t);
    return function(e){
      return 0 !== e && { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 }
    }(o)
  }

  return n("no-color") || n("no-colors") || n("color=false") ? u = !1 : (n("color") || n("colors") || n("color=true") || n("color=always")) && (u = !0), "FORCE_COLOR" in r && (u = 0 === r.FORCE_COLOR.length || 0 !== parseInt(r.FORCE_COLOR, 10)), K = {
    supportsColor: o,
    stdout: o(process.stdout),
    stderr: o(process.stderr)
  }
}

function te() {
  return Y || (Y = 1, function(e, t){
    const n = o, r = i;
    t.init = function (e) {
      e.inspectOpts = {};
      const n = Object.keys(t.inspectOpts);
      for (let r = 0; r < n.length; r++) e.inspectOpts[n[r]] = t.inspectOpts[n[r]]
    }, t.log = function (...e) {
      return process.stderr.write(r.format(...e) + "\n")
    }, t.formatArgs = function (n) {
      const { namespace:r, useColors:u } = this;
      if (u) {
        const t = this.color, u = "[3" + (t < 8 ? t : "8;5;" + t), o = `  ${u};1m${r} [0m`;
        n[0] = o + n[0].split("\n").join("\n" + o), n.push(u + "m+" + e.exports.humanize(this.diff) + "[0m")
      } else n[0] = function(){
        if (t.inspectOpts.hideDate) return "";
        return (new Date).toISOString() + " "
      }() + r + " " + n[0]
    }, t.save = function (e) {
      e ? process.env.DEBUG = e : delete process.env.DEBUG
    }, t.load = function () {
      return process.env.DEBUG
    }, t.useColors = function () {
      return "colors" in t.inspectOpts ? Boolean(t.inspectOpts.colors) : n.isatty(process.stderr.fd)
    }, t.destroy = r.deprecate((() => {
    }), "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const e = ee();
      e && (e.stderr || e).level >= 2 && (t.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221])
    } catch (e) {
    }
    t.inspectOpts = Object.keys(process.env).filter((e => /^debug_/i.test(e))).reduce(((e, t) => {
      const n = t.substring(6).toLowerCase().replace(/_([a-z])/g, ((e, t) => t.toUpperCase()));
      let r = process.env[t];
      return r = !!/^(yes|on|true|enabled)$/i.test(r) || !/^(no|off|false|disabled)$/i.test(r) && ("null" === r ? null : Number(r)), e[n] = r, e
    }), {}), e.exports = J()(t);
    const { formatters:u } = e.exports;
    u.o = function (e) {
      return this.inspectOpts.colors = this.useColors, r.inspect(e, this.inspectOpts).split("\n").map((e => e.trim())).join(" ")
    }, u.O = function (e) {
      return this.inspectOpts.colors = this.useColors, r.inspect(e, this.inspectOpts)
    }
  }(X, X.exports)), X.exports
}

Z = G, "undefined" == typeof process || "renderer" === process.type || !0 === process.browser || process.__nwjs ? Z.exports = (j || (j = 1, function(e, t){
  t.formatArgs = function (t) {
    if (t[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors) return;
    const n = "color: " + this.color;
    t.splice(1, 0, n, "color: inherit");
    let r = 0, u = 0;
    t[0].replace(/%[a-zA-Z%]/g, (e => {
      "%%" !== e && (r++, "%c" === e && (u = r))
    })), t.splice(u, 0, n)
  }, t.save = function (e) {
    try {
      e ? t.storage.setItem("debug", e) : t.storage.removeItem("debug")
    } catch (e) {
    }
  }, t.load = function () {
    let e;
    try {
      e = t.storage.getItem("debug")
    } catch (e) {
    }
    return!e && "undefined" != typeof process && "env" in process && (e = process.env.DEBUG), e
  }, t.useColors = function () {
    return!("undefined" == typeof window || !window.process || "renderer" !== window.process.type && !window.process.__nwjs) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
  }, t.storage = function(){
    try {
      return localStorage
    } catch (e) {
    }
  }(), t.destroy = (() => {
    let e = !1;
    return () => {
      e || (e = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))
    }
  })(), t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], t.log = console.debug || console.log || (() => {
  }), e.exports = J()(t);
  const { formatters:n } = e.exports;
  n.j = function (e) {
    try {
      return JSON.stringify(e)
    } catch (e) {
      return "[UnexpectedJSONParseError]: " + e.message
    }
  }
}(V, V.exports)), V.exports) : Z.exports = te();
var ne = function (e) {
  return (e = e || {}).circles ? function(e){
    var t = [], n = [];
    return e.proto ? function e(u) {
      if ("object" != typeof u || null === u) return u;
      if (u instanceof Date) return new Date(u);
      if (Array.isArray(u)) return r(u, e);
      if (u instanceof Map) return new Map(r(Array.from(u), e));
      if (u instanceof Set) return new Set(r(Array.from(u), e));
      var o = {};
      for (var i in t.push(u), n.push(o), u) {
        var s = u[i];
        if ("object" != typeof s || null === s) o[i] = s; else if (s instanceof Date) o[i] = new Date(s); else if (s instanceof Map) o[i] = new Map(r(Array.from(s), e)); else if (s instanceof Set) o[i] = new Set(r(Array.from(s), e)); else if (ArrayBuffer.isView(s)) o[i] = re(s); else {
          var c = t.indexOf(s);
          o[i] = -1 !== c ? n[c] : e(s)
        }
      }
      return t.pop(), n.pop(), o
    } : function e(u) {
      if ("object" != typeof u || null === u) return u;
      if (u instanceof Date) return new Date(u);
      if (Array.isArray(u)) return r(u, e);
      if (u instanceof Map) return new Map(r(Array.from(u), e));
      if (u instanceof Set) return new Set(r(Array.from(u), e));
      var o = {};
      for (var i in t.push(u), n.push(o), u) if (!1 !== Object.hasOwnProperty.call(u, i)) {
        var s = u[i];
        if ("object" != typeof s || null === s) o[i] = s; else if (s instanceof Date) o[i] = new Date(s); else if (s instanceof Map) o[i] = new Map(r(Array.from(s), e)); else if (s instanceof Set) o[i] = new Set(r(Array.from(s), e)); else if (ArrayBuffer.isView(s)) o[i] = re(s); else {
          var c = t.indexOf(s);
          o[i] = -1 !== c ? n[c] : e(s)
        }
      }
      return t.pop(), n.pop(), o
    };

    function r(e, r) {
      for (var u = Object.keys(e), o = new Array(u.length), i = 0; i < u.length; i++) {
        var s = u[i], c = e[s];
        if ("object" != typeof c || null === c) o[s] = c; else if (c instanceof Date) o[s] = new Date(c); else if (ArrayBuffer.isView(c)) o[s] = re(c); else {
          var a = t.indexOf(c);
          o[s] = -1 !== a ? n[a] : r(c)
        }
      }
      return o
    }
  }(e) : e.proto ? function e(n) {
    if ("object" != typeof n || null === n) return n;
    if (n instanceof Date) return new Date(n);
    if (Array.isArray(n)) return t(n, e);
    if (n instanceof Map) return new Map(t(Array.from(n), e));
    if (n instanceof Set) return new Set(t(Array.from(n), e));
    var r = {};
    for (var u in n) {
      var o = n[u];
      "object" != typeof o || null === o ? r[u] = o : o instanceof Date ? r[u] = new Date(o) : o instanceof Map ? r[u] = new Map(t(Array.from(o), e)) : o instanceof Set ? r[u] = new Set(t(Array.from(o), e)) : ArrayBuffer.isView(o) ? r[u] = re(o) : r[u] = e(o)
    }
    return r
  } : n;

  function t(e, t) {
    for (var n = Object.keys(e), r = new Array(n.length), u = 0; u < n.length; u++) {
      var o = n[u], i = e[o];
      "object" != typeof i || null === i ? r[o] = i : i instanceof Date ? r[o] = new Date(i) : ArrayBuffer.isView(i) ? r[o] = re(i) : r[o] = t(i)
    }
    return r
  }

  function n(e) {
    if ("object" != typeof e || null === e) return e;
    if (e instanceof Date) return new Date(e);
    if (Array.isArray(e)) return t(e, n);
    if (e instanceof Map) return new Map(t(Array.from(e), n));
    if (e instanceof Set) return new Set(t(Array.from(e), n));
    var r = {};
    for (var u in e) if (!1 !== Object.hasOwnProperty.call(e, u)) {
      var o = e[u];
      "object" != typeof o || null === o ? r[u] = o : o instanceof Date ? r[u] = new Date(o) : o instanceof Map ? r[u] = new Map(t(Array.from(o), n)) : o instanceof Set ? r[u] = new Set(t(Array.from(o), n)) : ArrayBuffer.isView(o) ? r[u] = re(o) : r[u] = n(o)
    }
    return r
  }
};

function re(e) {
  return e instanceof Buffer ? Buffer.from(e) : new e.constructor(e.buffer.slice(), e.byteOffset, e.length)
}

const ue = i, oe = G.exports("log4js:configuration"), ie = [], se = [], ce = e =>!e,
  ae = e => e && "object" == typeof e && !Array.isArray(e), le = (e, t, n) => {
    (Array.isArray(t) ? t : [t]).forEach((t => {
      if (t) throw new Error(`Problem with log4js configuration: (${ue.inspect(e, { depth: 5 })}) - ${n}`)
    }))
  };
var fe = {
  configure: e => {
    oe("New configuration to be validated: ", e), le(e, ce(ae(e)), "must be an object."), oe(`Calling pre-processing listeners (${ie.length})`), ie.forEach((t => t(e))), oe("Configuration pre-processing finished."), oe(`Calling configuration listeners (${se.length})`), se.forEach((t => t(e))), oe("Configuration finished.")
  },
  addListener: e => {
    se.push(e), oe(`Added listener, now ${se.length} listeners`)
  },
  addPreProcessingListener: e => {
    ie.push(e), oe(`Added pre-processing listener, now ${ie.length} listeners`)
  },
  throwExceptionIf: le,
  anObject: ae,
  anInteger: e => e && "number" == typeof e && Number.isInteger(e),
  validIdentifier: e => /^[A-Za-z][A-Za-z0-9_]*$/g.test(e),
  not: ce
}, de = { exports: {} };
!function(e){

  function t(e, t) {
    for (var n = e.toString(); n.length < t; ) n = "0" + n;
    return n
  }

  function n(e) {
    return t(e, 2)
  }

  function r(r, u) {
    "string" != typeof r && (u = r, r = e.exports.ISO8601_FORMAT), u || (u = e.exports.now());
    var o = n(u.getDate()), i = n(u.getMonth() + 1), s = n(u.getFullYear()), c = n(s.substring(2, 4)),
      a = r.indexOf("yyyy") > -1 ? s : c, l = n(u.getHours()), f = n(u.getMinutes()), d = n(u.getSeconds()),
      D = t(u.getMilliseconds(), 3), p = function(e){
        var t = Math.abs(e), n = String(Math.floor(t / 60)), r = String(t % 60);
        return n = ("0" + n).slice(-2), r = ("0" + r).slice(-2), 0 === e ? "Z" : (e < 0 ? "+" : "-") + n + ":" + r
      }(u.getTimezoneOffset());
    return r.replace(/dd/g, o).replace(/MM/g, i).replace(/y{1,4}/g, a).replace(/hh/g, l).replace(/mm/g, f).replace(/ss/g, d).replace(/SSS/g, D).replace(/O/g, p)
  }

  function u(e, t, n, r) {
    e["set" + (r ? "" : "UTC")+t](n)
  }

  e.exports = r, e.exports.asString = r, e.exports.parse = function (t, n, r) {
    if (!t) throw new Error("pattern must be supplied");
    return function(t, n, r){
      var o = t.indexOf("O") < 0, i = !1, s = [{
        pattern: /y{1,4}/, regexp: "\\d{1,4}", fn: function (e, t) {
          u(e, "FullYear", t, o)
        }
      }, {
        pattern: /MM/, regexp: "\\d{1,2}", fn: function (e, t) {
          u(e, "Month", t - 1, o), e.getMonth() !== t - 1 && (i = !0)
        }
      }, {
        pattern: /dd/, regexp: "\\d{1,2}", fn: function (e, t) {
          i && u(e, "Month", e.getMonth() - 1, o), u(e, "Date", t, o)
        }
      }, {
        pattern: /hh/, regexp: "\\d{1,2}", fn: function (e, t) {
          u(e, "Hours", t, o)
        }
      }, {
        pattern: /mm/, regexp: "\\d\\d", fn: function (e, t) {
          u(e, "Minutes", t, o)
        }
      }, {
        pattern: /ss/, regexp: "\\d\\d", fn: function (e, t) {
          u(e, "Seconds", t, o)
        }
      }, {
        pattern: /SSS/, regexp: "\\d\\d\\d", fn: function (e, t) {
          u(e, "Milliseconds", t, o)
        }
      }, {
        pattern: /O/, regexp: "[+-]\\d{1,2}:?\\d{2}?|Z", fn: function (e, t) {
          t = "Z" === t ? 0 : t.replace(":", "");
          var n = Math.abs(t), r = (t > 0 ? -1 : 1) * (n % 100 + 60 * Math.floor(n / 100));
          e.setUTCMinutes(e.getUTCMinutes() + r)
        }
      }], c = s.reduce((function (e, t) {
        return t.pattern.test(e.regexp) ? (t.index = e.regexp.match(t.pattern).index, e.regexp = e.regexp.replace(t.pattern, "(" + t.regexp + ")")) : t.index = -1, e
      }), { regexp: t, index: [] }), a = s.filter((function (e) {
        return e.index > -1
      }));
      a.sort((function (e, t) {
        return e.index - t.index
      }));
      var l = new RegExp(c.regexp).exec(n);
      if (l) {
        var f = r || e.exports.now();
        return a.forEach((function (e, t) {
          e.fn(f, l[t+1])
        })), f
      }
      throw new Error("String '" + n + "' could not be parsed as '" + t + "'")
    }(t, n, r)
  }, e.exports.now = function () {
    return new Date
  }, e.exports.ISO8601_FORMAT = "yyyy-MM-ddThh:mm:ss.SSS", e.exports.ISO8601_WITH_TZ_OFFSET_FORMAT = "yyyy-MM-ddThh:mm:ss.SSSO", e.exports.DATETIME_FORMAT = "dd MM yyyy hh:mm:ss.SSS", e.exports.ABSOLUTETIME_FORMAT = "hh:mm:ss.SSS"
}(de);
const De = de.exports, pe = t, he = i, Ee = e, me = s, ye = G.exports("log4js:layouts"), Ce = {
  bold: [1, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  white: [37, 39],
  grey: [90, 39],
  black: [90, 39],
  blue: [34, 39],
  cyan: [36, 39],
  green: [32, 39],
  magenta: [35, 39],
  red: [91, 39],
  yellow: [33, 39]
};

function Fe(e) {
  return e ? `[${Ce[e][0]}m` : ""
}

function ge(e) {
  return e ? `[${Ce[e][1]}m` : ""
}

function Ae(e, t) {
  return n = he.format("[%s] [%s] %s - ", De.asString(e.startTime), e.level.toString(), e.categoryName), Fe(r = t) + n + ge(r);
  var n, r
}

function ve(e) {
  return Ae(e) + he.format(...e.data)
}

function Se(e) {
  return Ae(e, e.level.colour) + he.format(...e.data)
}

function we(e) {
  return he.format(...e.data)
}

function Oe(e) {
  return e.data[0]
}

function _e(e, t) {
  const n = /%(-?[0-9]+)?(\.?-?[0-9]+)?([[\]cdhmnprzxXyflosCMAF%])(\{([^}]+)\})?|([^%]+)/;

  function r(e) {
    return e && e.pid ? e.pid.toString() : process.pid.toString()
  }

  e = e || "%r %p %c - %m%n";
  const u = {
    c: function (e, t) {
      let n = e.categoryName;
      if (t) {
        const e = parseInt(t, 10), r = n.split(".");
        e < r.length && (n = r.slice(r.length - e).join("."))
      }
      return n
    },
    d: function (e, t) {
      let n = De.ISO8601_FORMAT;
      if (t) switch (n = t, n) {
        case "ISO8601":
        case "ISO8601_FORMAT":
          n = De.ISO8601_FORMAT;
          break;
        case "ISO8601_WITH_TZ_OFFSET":
        case "ISO8601_WITH_TZ_OFFSET_FORMAT":
          n = De.ISO8601_WITH_TZ_OFFSET_FORMAT;
          break;
        case "ABSOLUTE":
          process.emitWarning("Pattern %d{ABSOLUTE} is deprecated in favor of %d{ABSOLUTETIME}. Please use %d{ABSOLUTETIME} instead.", "DeprecationWarning", "log4js-node-DEP0003"), ye("[log4js-node-DEP0003]", "DEPRECATION: Pattern %d{ABSOLUTE} is deprecated and replaced by %d{ABSOLUTETIME}.");
        case "ABSOLUTETIME":
        case "ABSOLUTETIME_FORMAT":
          n = De.ABSOLUTETIME_FORMAT;
          break;
        case "DATE":
          process.emitWarning("Pattern %d{DATE} is deprecated due to the confusion it causes when used. Please use %d{DATETIME} instead.", "DeprecationWarning", "log4js-node-DEP0004"), ye("[log4js-node-DEP0004]", "DEPRECATION: Pattern %d{DATE} is deprecated and replaced by %d{DATETIME}.");
        case "DATETIME":
        case "DATETIME_FORMAT":
          n = De.DATETIME_FORMAT
      }
      return De.asString(n, e.startTime)
    },
    h: function () {
      return pe.hostname().toString()
    },
    m: function (e) {
      return he.format(...e.data)
    },
    n: function () {
      return pe.EOL
    },
    p: function (e) {
      return e.level.toString()
    },
    r: function (e) {
      return De.asString("hh:mm:ss", e.startTime)
    },
    "[": function (e) {
      return Fe(e.level.colour)
    },
    "]": function (e) {
      return ge(e.level.colour)
    },
    y: function () {
      return r()
    },
    z: r,
    "%": function () {
      return "%"
    },
    x: function (e, n) {
      return void 0 !== t[n] ? "function" == typeof t[n] ? t[n](e) : t[n] : null
    },
    X: function (e, t) {
      const n = e.context[t];
      return void 0 !== n ? "function" == typeof n ? n(e) : n : null
    },
    f: function (e, t) {
      let n = e.fileName || "";
      if (n = function(e){
        const t = "file://";
        return e.startsWith(t) && ("function" == typeof me.fileURLToPath ? e = me.fileURLToPath(e) : (e = Ee.normalize(e.replace(new RegExp(`^${t}`), "")), "win32" === process.platform && (e = e.startsWith("\\") ? e.slice(1) : Ee.sep + Ee.sep + e))), e
      }(n), t) {
        const e = parseInt(t, 10), r = n.split(Ee.sep);
        r.length > e && (n = r.slice(-e).join(Ee.sep))
      }
      return n
    },
    l: function (e) {
      return e.lineNumber ? `${e.lineNumber}` : ""
    },
    o: function (e) {
      return e.columnNumber ? `${e.columnNumber}` : ""
    },
    s: function (e) {
      return e.callStack || ""
    },
    C: function (e) {
      return e.className || ""
    },
    M: function (e) {
      return e.functionName || ""
    },
    A: function (e) {
      return e.functionAlias || ""
    },
    F: function (e) {
      return e.callerName || ""
    }
  };

  function o(e, t, n) {
    return u[e](t, n)
  }

  function i(e, t, n) {
    let r = e;
    return r = function(e, t){
      let n;
      return e ? (n = parseInt(e.slice(1), 10), n > 0 ? t.slice(0, n) : t.slice(n)) : t
    }(t, r), r = function(e, t){
      let n;
      if (e) if ("-" === e.charAt(0)) for (n = parseInt(e.slice(1), 10); t.length < n; ) t += " "; else for (n = parseInt(e, 10); t.length < n; ) t = ` ${t}`;
      return t
    }(n, r), r
  }

  return function (t) {
    let r, u = "", s = e;
    for (; null !== (r = n.exec(s)); ) {
      const e = r[1], n = r[2], c = r[3], a = r[5], l = r[6];
      if (l) u += l.toString(); else {
        u += i(o(c, t, a), n, e)
      }
      s = s.slice(r.index + r[0].length)
    }
    return u
  }
}

const be = {
  messagePassThrough: () => we,
  basic: () => ve,
  colored: () => Se,
  coloured: () => Se,
  pattern: e => _e(e && e.pattern, e && e.tokens),
  dummy: () => Oe
};
var Be = {
  basicLayout: ve,
  messagePassThroughLayout: we,
  patternLayout: _e,
  colouredLayout: Se,
  coloredLayout: Se,
  dummyLayout: Oe,
  addLayout(e, t) {
    be[e] = t
  },
  layout: (e, t) => be[e] && be[e](t)
};
const Pe = fe, ke = ["white", "grey", "black", "blue", "cyan", "green", "magenta", "red", "yellow"];

class Ie {
  constructor(e, t, n) {
    this.level = e, this.levelStr = t, this.colour = n
  }

  toString() {
    return this.levelStr
  }

  static getLevel(e, t) {
    return e ? e instanceof Ie ? e : (e instanceof Object && e.levelStr && (e = e.levelStr), Ie[e.toString().toUpperCase()] || t) : t
  }

  static addLevels(e) {
    if (e) {
      Object.keys(e).forEach((t => {
        const n = t.toUpperCase();
        Ie[n] = new Ie(e[t].value, n, e[t].colour);
        const r = Ie.levels.findIndex((e => e.levelStr === n));
        r > -1 ? Ie.levels[r] = Ie[n] : Ie.levels.push(Ie[n])
      })), Ie.levels.sort(((e, t) => e.level - t.level))
    }
  }

  isLessThanOrEqualTo(e) {
    return "string" == typeof e && (e = Ie.getLevel(e)), this.level <= e.level
  }

  isGreaterThanOrEqualTo(e) {
    return "string" == typeof e && (e = Ie.getLevel(e)), this.level >= e.level
  }

  isEqualTo(e) {
    return "string" == typeof e && (e = Ie.getLevel(e)), this.level === e.level
  }
}

Ie.levels = [], Ie.addLevels({
  ALL: { value: Number.MIN_VALUE, colour: "grey" },
  TRACE: { value: 5e3, colour: "blue" },
  DEBUG: { value: 1e4, colour: "cyan" },
  INFO: { value: 2e4, colour: "green" },
  WARN: { value: 3e4, colour: "yellow" },
  ERROR: { value: 4e4, colour: "red" },
  FATAL: { value: 5e4, colour: "magenta" },
  MARK: { value: 9007199254740992, colour: "grey" },
  OFF: { value: Number.MAX_VALUE, colour: "grey" }
}), Pe.addListener((e => {
  const t = e.levels;
  if (t) {
    Pe.throwExceptionIf(e, Pe.not(Pe.anObject(t)), "levels must be an object");
    Object.keys(t).forEach((n => {
      Pe.throwExceptionIf(e, Pe.not(Pe.validIdentifier(n)), `level name "${n}" is not a valid identifier (must start with a letter, only contain A-Z,a-z,0-9,_)`), Pe.throwExceptionIf(e, Pe.not(Pe.anObject(t[n])), `level "${n}" must be an object`), Pe.throwExceptionIf(e, Pe.not(t[n].value), `level "${n}" must have a 'value' property`), Pe.throwExceptionIf(e, Pe.not(Pe.anInteger(t[n].value)), `level "${n}".value must have an integer value`), Pe.throwExceptionIf(e, Pe.not(t[n].colour), `level "${n}" must have a 'colour' property`), Pe.throwExceptionIf(e, Pe.not(ke.indexOf(t[n].colour) > -1), `level "${n}".colour must be one of ${ke.join(", ")}`)
    }))
  }
})), Pe.addListener((e => {
  Ie.addLevels(e.levels)
}));
var xe = Ie, Ne = { exports: {} }, Re = {};
const { parse:Te, stringify:Me } = JSON, { keys:Le } = Object, je = String, $e = "string", He = {}, Ge = "object",
  Ve = (e, t) => t, Ue = e => e instanceof je ? je(e) : e, Je = (e, t) => typeof t === $e ? new je(t) : t,
  We = (e, t, n, r) => {
    const u = [];
    for (let o = Le(n), { length:i } = o, s = 0; s < i; s++) {
      const i = o[s], c = n[i];
      if (c instanceof je) {
        const o = e[c];
        typeof o !== Ge || t.has(o) ? n[i] = r.call(n, i, o) : (t.add(o), n[i] = He, u.push({ k: i, a: [e, t, o, r] }))
      } else n[i] !== He && (n[i] = r.call(n, i, c))
    }
    for (let { length:e } = u, t = 0; t < e; t++) {
      const { k:e, a:o } = u[t];
      n[e] = r.call(n, e, We.apply(null, o))
    }
    return n
  }, ze = (e, t, n) => {
    const r = je(t.push(n) - 1);
    return e.set(n, r), r
  }, Ke = (e, t) => {
    const n = Te(e, Je).map(Ue), r = n[0], u = t || Ve, o = typeof r === Ge && r ? We(n, new Set, r, u) : r;
    return u.call({ "": o }, "", o)
  };
Re.parse = Ke;
const qe = (e, t, n) => {
  const r = t && typeof t === Ge ? (e, n) => "" === e || -1 < t.indexOf(e) ? n : void 0 : t || Ve, u = new Map, o = [],
    i = [];
  let s = +ze(u, o, r.call({ "": e }, "", e)), c = !s;
  for (; s < o.length; ) c = !0, i[s] = Me(o[s++], a, n);
  return "[" + i.join(",") + "]";

  function a(e, t) {
    if (c) return c = !c, t;
    const n = r.call(this, e, t);
    switch (typeof n) {
      case Ge:
        if (null === n) return n;
      case $e:
        return u.get(n) || ze(u, o, n)
    }
    return n
  }
};
Re.stringify = qe;
Re.toJSON = e => Te(qe(e));
Re.fromJSON = e => Ke(Me(e));
const Ye = Re, Ze = xe;
const Xe = new class {
  constructor() {
    const e = {
      __LOG4JS_undefined__: void 0,
      __LOG4JS_NaN__: Number("abc"),
      __LOG4JS_Infinity__: 1 / 0,
      "__LOG4JS_-Infinity__": -1 / 0
    };
    this.deMap = e, this.serMap = {}, Object.keys(this.deMap).forEach((e => {
      const t = this.deMap[e];
      this.serMap[t] = e
    }))
  }

  canSerialise(e) {
    return "string" != typeof e && e in this.serMap
  }

  serialise(e) {
    return this.canSerialise(e) ? this.serMap[e] : e
  }

  canDeserialise(e) {
    return e in this.deMap
  }

  deserialise(e) {
    return this.canDeserialise(e) ? this.deMap[e] : e
  }
};
let Qe = class {
  constructor(e, t, n, r, u, o) {
    if (this.startTime = new Date, this.categoryName = e, this.data = n, this.level = t, this.context = Object.assign({
    }, r), this.pid = process.pid, this.error = o, void 0 !== u) {
      if (!u || "object" != typeof u || Array.isArray(u)) throw new TypeError("Invalid location type passed to LoggingEvent constructor");
      this.constructor._getLocationKeys().forEach((e => {
        void 0 !== u[e] && (this[e] = u[e])
      }))
    }
  }

  static _getLocationKeys() {
    return ["fileName", "lineNumber", "columnNumber", "callStack", "className", "functionName", "functionAlias", "callerName"]
  }

  serialise() {
    return Ye.stringify(this, ((e, t) => (t instanceof Error && (t = Object.assign({
      message: t.message,
      stack: t.stack
    }, t)), Xe.serialise(t))))
  }

  static deserialise(e) {
    let t;
    try {
      const n = Ye.parse(e, ((e, t) => {
        if (t && t.message && t.stack) {
          const e = new Error(t);
          Object.keys(t).forEach((n => {
            e[n] = t[n]
          })), t = e
        }
        return Xe.deserialise(t)
      }));
      this._getLocationKeys().forEach((e => {
        void 0 !== n[e] && (n.location || (n.location = {}), n.location[e] = n[e])
      })), t = new Qe(n.categoryName, Ze.getLevel(n.level.levelStr), n.data, n.context, n.location, n.error), t.startTime = new Date(n.startTime), t.pid = n.pid, n.cluster && (t.cluster = n.cluster)
    } catch (n) {
      t = new Qe("log4js", Ze.ERROR, ["Unable to parse log:", e, "because: ", n])
    }
    return t
  }
};
var et = Qe;
const tt = G.exports("log4js:clustering"), nt = et, rt = fe;
let ut = !1, ot = null;
try {
  ot = require("cluster")
} catch (e) {
  tt("cluster module not present"), ut = !0
}
const it = [];
let st = !1, ct = "NODE_APP_INSTANCE";
const at = () => st && "0" === process.env[ct], lt = () => ut || ot && ot.isMaster || at(), ft = e => {
  it.forEach((t => t(e)))
}, dt = (e, t) => {
  if (tt("cluster message received from worker ", e, ": ", t), e.topic && e.data && (t = e, e = void 0), t && t.topic && "log4js:message" === t.topic) {
    tt("received message: ", t.data);
    const e = nt.deserialise(t.data);
    ft(e)
  }
};
ut || rt.addListener((e => {
  it.length = 0, ({
    pm2: st,
    disableClustering: ut,
    pm2InstanceVar: ct = "NODE_APP_INSTANCE"
  } = e), tt(`clustering disabled ? ${ut}`), tt(`cluster.isMaster ? ${ot && ot.isMaster}`), tt(`pm2 enabled ? ${st}`), tt(`pm2InstanceVar = ${ct}`), tt(`process.env[${ct}] = ${process.env[ct]}`), st && process.removeListener("message", dt), ot && ot.removeListener && ot.removeListener("message", dt), ut || e.disableClustering ? tt("Not listening for cluster messages, because clustering disabled.") : at() ? (tt("listening for PM2 broadcast messages"), process.on("message", dt)) : ot && ot.isMaster ? (tt("listening for cluster messages"), ot.on("message", dt)) : tt("not listening for messages, because we are not a master process")
}));
var Dt = {
  onlyOnMaster: (e, t) => lt() ? e() : t, isMaster: lt, send: e => {
    lt() ? ft(e) : (st || (e.cluster = { workerId: ot.worker.id, worker: process.pid }), process.send({
      topic: "log4js:message",
      data: e.serialise()
    }))
  }, onMessage: e => {
    it.push(e)
  }
}, pt = {};

function ht(e) {
  if ("number" == typeof e && Number.isInteger(e)) return e;
  const t = { K: 1024, M: 1048576, G: 1073741824 }, n = Object.keys(t), r = e.slice(-1).toLocaleUpperCase(),
    u = e.slice(0, -1).trim();
  if (n.indexOf(r) < 0 || !Number.isInteger(Number(u))) throw Error(`maxLogSize: "${e}" is invalid`);
  return u * t[r]
}

function Et(e) {
  return function(e, t){
    const n = Object.assign({}, t);
    return Object.keys(e).forEach((r => {
      n[r] && (n[r] = e[r](t[r]))
    })), n
  }({ maxLogSize: ht }, e)
}

const mt = { dateFile: Et, file: Et, fileSync: Et };
pt.modifyConfig = e => mt[e.type] ? mt[e.type](e) : e;
var yt = {};
const Ct = console.log.bind(console);
yt.configure = function (e, t) {
  let n = t.colouredLayout;
  return e.layout && (n = t.layout(e.layout.type, e.layout)), function(e, t){
    return n => {
      Ct(e(n, t))
    }
  }(n, e.timezoneOffset)
};
var Ft = {};
Ft.configure = function (e, t) {
  let n = t.colouredLayout;
  return e.layout && (n = t.layout(e.layout.type, e.layout)), function(e, t){
    return n => {
      process.stdout.write(`${e(n, t)}\n`)
    }
  }(n, e.timezoneOffset)
};
var gt = {};
gt.configure = function (e, t) {
  let n = t.colouredLayout;
  return e.layout && (n = t.layout(e.layout.type, e.layout)), function(e, t){
    return n => {
      process.stderr.write(`${e(n, t)}\n`)
    }
  }(n, e.timezoneOffset)
};
var At = {};
At.configure = function (e, t, n, r) {
  const u = n(e.appender);
  return function(e, t, n, r){
    const u = r.getLevel(e), o = r.getLevel(t, r.FATAL);
    return e => {
      const t = e.level;
      u.isLessThanOrEqualTo(t) && o.isGreaterThanOrEqualTo(t) && n(e)
    }
  }(e.level, e.maxLevel, u, r)
};
var vt = {};
const St = G.exports("log4js:categoryFilter");
vt.configure = function (e, t, n) {
  const r = n(e.appender);
  return function(e, t){
    return "string" == typeof e && (e = [e]), n => {
      St(`Checking ${n.categoryName} against ${e}`), -1 === e.indexOf(n.categoryName) && (St("Not excluded, sending to appender"), t(n))
    }
  }(e.exclude, r)
};
var wt = {};
const Ot = G.exports("log4js:noLogFilter");
wt.configure = function (e, t, n) {
  const r = n(e.appender);
  return function(e, t){
    return n => {
      Ot(`Checking data: ${n.data} against filters: ${e}`), "string" == typeof e && (e = [e]), e = e.filter((e => null != e && "" !== e));
      const r = new RegExp(e.join("|"), "i");
      (0 === e.length || n.data.findIndex((e => r.test(e))) < 0) && (Ot("Not excluded, sending to appender"), t(n))
    }
  }(e.exclude, r)
};
var _t = {}, bt = { exports: {} }, Bt = {}, Pt = {
  fromCallback: function (e) {
    return Object.defineProperty((function () {
      if ("function" != typeof arguments[arguments.length-1]) return new Promise(((t, n) => {
        arguments[arguments.length] = (e, r) => {
          if (e) return n(e);
          t(r)
        }, arguments.length++, e.apply(this, arguments)
      }));
      e.apply(this, arguments)
    }), "name", { value: e.name })
  }, fromPromise: function (e) {
    return Object.defineProperty((function () {
      const t = arguments[arguments.length-1];
      if ("function" != typeof t) return e.apply(this, arguments);
      e.apply(this, arguments).then((e => t(null, e)), t)
    }), "name", { value: e.name })
  }
}, kt = c, It = process.cwd, xt = null, Nt = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function () {
  return xt || (xt = It.call(process)), xt
};
try {
  process.cwd()
} catch (e) {
}
if ("function" == typeof process.chdir) {
  var Rt = process.chdir;
  process.chdir = function (e) {
    xt = null, Rt.call(process, e)
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Rt)
}
var Tt = function (e) {
  kt.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && function(e){
    e.lchmod = function (t, n, r) {
      e.open(t, kt.O_WRONLY | kt.O_SYMLINK, n, (function (t, u) {
        t ? r && r(t) : e.fchmod(u, n, (function (t) {
          e.close(u, (function (e) {
            r && r(t || e)
          }))
        }))
      }))
    }, e.lchmodSync = function (t, n) {
      var r, u = e.openSync(t, kt.O_WRONLY | kt.O_SYMLINK, n), o = !0;
      try {
        r = e.fchmodSync(u, n), o = !1
      } finally {
        if (o) try {
          e.closeSync(u)
        } catch (e) {
        } else e.closeSync(u)
      }
      return r
    }
  }(e);
  e.lutimes || function(e){
    kt.hasOwnProperty("O_SYMLINK") && e.futimes ? (e.lutimes = function (t, n, r, u) {
      e.open(t, kt.O_SYMLINK, (function (t, o) {
        t ? u && u(t) : e.futimes(o, n, r, (function (t) {
          e.close(o, (function (e) {
            u && u(t || e)
          }))
        }))
      }))
    }, e.lutimesSync = function (t, n, r) {
      var u, o = e.openSync(t, kt.O_SYMLINK), i = !0;
      try {
        u = e.futimesSync(o, n, r), i = !1
      } finally {
        if (i) try {
          e.closeSync(o)
        } catch (e) {
        } else e.closeSync(o)
      }
      return u
    }) : e.futimes && (e.lutimes = function (e, t, n, r) {
      r && process.nextTick(r)
    }, e.lutimesSync = function () {
    })
  }(e);
  e.chown = r(e.chown), e.fchown = r(e.fchown), e.lchown = r(e.lchown), e.chmod = t(e.chmod), e.fchmod = t(e.fchmod), e.lchmod = t(e.lchmod), e.chownSync = u(e.chownSync), e.fchownSync = u(e.fchownSync), e.lchownSync = u(e.lchownSync), e.chmodSync = n(e.chmodSync), e.fchmodSync = n(e.fchmodSync), e.lchmodSync = n(e.lchmodSync), e.stat = o(e.stat), e.fstat = o(e.fstat), e.lstat = o(e.lstat), e.statSync = i(e.statSync), e.fstatSync = i(e.fstatSync), e.lstatSync = i(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function (e, t, n) {
    n && process.nextTick(n)
  }, e.lchmodSync = function () {
  });
  e.chown && !e.lchown && (e.lchown = function (e, t, n, r) {
    r && process.nextTick(r)
  }, e.lchownSync = function () {
  });
  "win32" === Nt && (e.rename = "function" != typeof e.rename ? e.rename : function(t){

    function n(n, r, u) {
      var o = Date.now(), i = 0;
      t(n, r, (function s(c) {
        if (c && ("EACCES" === c.code || "EPERM" === c.code || "EBUSY" === c.code) && Date.now() - o < 6e4) return setTimeout((function () {
          e.stat(r, (function (e, o) {
            e && "ENOENT" === e.code ? t(n, r, s) : u(c)
          }))
        }), i), void (i < 100 && (i += 10));
        u && u(c)
      }))
    }

    return Object.setPrototypeOf && Object.setPrototypeOf(n, t), n
  }(e.rename));

  function t(t) {
    return t ? function (n, r, u) {
      return t.call(e, n, r, (function (e) {
        s(e) && (e = null), u && u.apply(this, arguments)
      }))
    } : t
  }

  function n(t) {
    return t ? function (n, r) {
      try {
        return t.call(e, n, r)
      } catch (e) {
        if (!s(e)) throw e
      }
    } : t
  }

  function r(t) {
    return t ? function (n, r, u, o) {
      return t.call(e, n, r, u, (function (e) {
        s(e) && (e = null), o && o.apply(this, arguments)
      }))
    } : t
  }

  function u(t) {
    return t ? function (n, r, u) {
      try {
        return t.call(e, n, r, u)
      } catch (e) {
        if (!s(e)) throw e
      }
    } : t
  }

  function o(t) {
    return t ? function (n, r, u) {

      function o(e, t) {
        t && (t.uid < 0 && (t.uid += 4294967296), t.gid < 0 && (t.gid += 4294967296)), u && u.apply(this, arguments)
      }

      return "function" == typeof r && (u = r, r = null), r ? t.call(e, n, r, o) : t.call(e, n, o)
    } : t
  }

  function i(t) {
    return t ? function (n, r) {
      var u = r ? t.call(e, n, r) : t.call(e, n);
      return u && (u.uid < 0 && (u.uid += 4294967296), u.gid < 0 && (u.gid += 4294967296)), u
    } : t
  }

  function s(e) {
    return!e || ("ENOSYS" === e.code || !(process.getuid && 0 === process.getuid() || "EINVAL" !== e.code && "EPERM" !== e.code))
  }

  e.read = "function" != typeof e.read ? e.read : function(t){

    function n(n, r, u, o, i, s) {
      var c;
      if (s && "function" == typeof s) {
        var a = 0;
        c = function (l, f, d) {
          if (l && "EAGAIN" === l.code && a < 10) return a++, t.call(e, n, r, u, o, i, c);
          s.apply(this, arguments)
        }
      }
      return t.call(e, n, r, u, o, i, c)
    }

    return Object.setPrototypeOf && Object.setPrototypeOf(n, t), n
  }(e.read), e.readSync = "function" != typeof e.readSync ? e.readSync : (c = e.readSync, function (t, n, r, u, o) {
    for (var i = 0;; ) try {
      return c.call(e, t, n, r, u, o)
    } catch (e) {
      if ("EAGAIN" === e.code && i < 10) {
        i++;
        continue
      }
      throw e
    }
  });
  var c
};
var Mt = a.Stream, Lt = function (e) {
  return {
    ReadStream: function t(n, r) {
      if (!(this instanceof t)) return new t(n, r);
      Mt.call(this);
      var u = this;
      this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 65536, r = r || {
      };
      for (var o = Object.keys(r), i = 0, s = o.length; i < s; i++) {
        var c = o[i];
        this[c] = r[c]
      }
      this.encoding && this.setEncoding(this.encoding);
      if (void 0 !== this.start) {
        if ("number" != typeof this.start) throw TypeError("start must be a Number");
        if (void 0 === this.end) this.end = 1 / 0; else if ("number" != typeof this.end) throw TypeError("end must be a Number");
        if (this.start > this.end) throw new Error("start must be <= end");
        this.pos = this.start
      }
      if (null !== this.fd) return void process.nextTick((function () {
        u._read()
      }));
      e.open(this.path, this.flags, this.mode, (function (e, t) {
        if (e) return u.emit("error", e), void (u.readable = !1);
        u.fd = t, u.emit("open", t), u._read()
      }))
    }, WriteStream: function t(n, r) {
      if (!(this instanceof t)) return new t(n, r);
      Mt.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, r = r || {
      };
      for (var u = Object.keys(r), o = 0, i = u.length; o < i; o++) {
        var s = u[o];
        this[s] = r[s]
      }
      if (void 0 !== this.start) {
        if ("number" != typeof this.start) throw TypeError("start must be a Number");
        if (this.start < 0) throw new Error("start must be >= zero");
        this.pos = this.start
      }
      this.busy = !1, this._queue = [], null === this.fd && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush())
    }
  }
};
var jt = function (e) {
  if (null === e || "object" != typeof e) return e;
  if (e instanceof Object) var t = { __proto__: $t(e) }; else t = Object.create(null);
  return Object.getOwnPropertyNames(e).forEach((function (n) {
    Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n))
  })), t
}, $t = Object.getPrototypeOf || function (e) {
  return e.__proto__
};
var Ht, Gt, Vt = n, Ut = Tt, Jt = Lt, Wt = jt, zt = i;

function Kt(e, t) {
  Object.defineProperty(e, Ht, {
    get: function () {
      return t
    }
  })
}

"function" == typeof Symbol && "function" == typeof Symbol.for ? (Ht = Symbol.for("graceful-fs.queue"), Gt = Symbol.for("graceful-fs.previous")) : (Ht = "___graceful-fs.queue", Gt = "___graceful-fs.previous");
var qt = function () {
};
if (zt.debuglog ? qt = zt.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (qt = function () {
  var e = zt.format.apply(zt, arguments);
  e = "GFS4: " + e.split(/\n/).join("\nGFS4: "), console.error(e)
}), !Vt[Ht]) {
  var Yt = p[Ht] || [];
  Kt(Vt, Yt), Vt.close = function(e){

    function t(t, n) {
      return e.call(Vt, t, (function (e) {
        e || tn(), "function" == typeof n && n.apply(this, arguments)
      }))
    }

    return Object.defineProperty(t, Gt, { value: e }), t
  }(Vt.close), Vt.closeSync = function(e){

    function t(t) {
      e.apply(Vt, arguments), tn()
    }

    return Object.defineProperty(t, Gt, { value: e }), t
  }(Vt.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", (function () {
    qt(Vt[Ht]), l.equal(Vt[Ht].length, 0)
  }))
}
p[Ht] || Kt(p, Vt[Ht]);
var Zt, Xt = Qt(Wt(Vt));

function Qt(e) {
  Ut(e), e.gracefulify = Qt, e.createReadStream = function (t, n) {
    return new e.ReadStream(t, n)
  }, e.createWriteStream = function (t, n) {
    return new e.WriteStream(t, n)
  };
  var t = e.readFile;
  e.readFile = function (e, n, r) {
    "function" == typeof n && (r = n, n = null);
    return function e(n, r, u, o){
      return t(n, r, (function (t) {
        !t || "EMFILE" !== t.code && "ENFILE" !== t.code ? "function" == typeof u && u.apply(this, arguments) : en([e, [n, r, u], t, o || Date.now(), Date.now()])
      }))
    }(e, n, r)
  };
  var n = e.writeFile;
  e.writeFile = function (e, t, r, u) {
    "function" == typeof r && (u = r, r = null);
    return function e(t, r, u, o, i){
      return n(t, r, u, (function (n) {
        !n || "EMFILE" !== n.code && "ENFILE" !== n.code ? "function" == typeof o && o.apply(this, arguments) : en([e, [t, r, u, o], n, i || Date.now(), Date.now()])
      }))
    }(e, t, r, u)
  };
  var r = e.appendFile;
  r && (e.appendFile = function (e, t, n, u) {
    "function" == typeof n && (u = n, n = null);
    return function e(t, n, u, o, i){
      return r(t, n, u, (function (r) {
        !r || "EMFILE" !== r.code && "ENFILE" !== r.code ? "function" == typeof o && o.apply(this, arguments) : en([e, [t, n, u, o], r, i || Date.now(), Date.now()])
      }))
    }(e, t, n, u)
  });
  var u = e.copyFile;
  u && (e.copyFile = function (e, t, n, r) {
    "function" == typeof n && (r = n, n = 0);
    return function e(t, n, r, o, i){
      return u(t, n, r, (function (u) {
        !u || "EMFILE" !== u.code && "ENFILE" !== u.code ? "function" == typeof o && o.apply(this, arguments) : en([e, [t, n, r, o], u, i || Date.now(), Date.now()])
      }))
    }(e, t, n, r)
  });
  var o = e.readdir;
  e.readdir = function (e, t, n) {
    "function" == typeof t && (n = t, t = null);
    var r = i.test(process.version) ? function (e, t, n, r) {
      return o(e, u(e, t, n, r))
    } : function (e, t, n, r) {
      return o(e, t, u(e, t, n, r))
    };
    return r(e, t, n);

    function u(e, t, n, u) {
      return function (o, i) {
        !o || "EMFILE" !== o.code && "ENFILE" !== o.code ? (i && i.sort && i.sort(), "function" == typeof n && n.call(this, o, i)) : en([r, [e, t, n], o, u || Date.now(), Date.now()])
      }
    }
  };
  var i = /^v[0-5]\./;
  if ("v0.8" === process.version.substr(0, 4)) {
    var s = Jt(e);
    d = s.ReadStream, D = s.WriteStream
  }
  var c = e.ReadStream;
  c && (d.prototype = Object.create(c.prototype), d.prototype.open = function () {
    var e = this;
    h(e.path, e.flags, e.mode, (function (t, n) {
      t ? (e.autoClose && e.destroy(), e.emit("error", t)) : (e.fd = n, e.emit("open", n), e.read())
    }))
  });
  var a = e.WriteStream;
  a && (D.prototype = Object.create(a.prototype), D.prototype.open = function () {
    var e = this;
    h(e.path, e.flags, e.mode, (function (t, n) {
      t ? (e.destroy(), e.emit("error", t)) : (e.fd = n, e.emit("open", n))
    }))
  }), Object.defineProperty(e, "ReadStream", {
    get: function () {
      return d
    }, set: function (e) {
      d = e
    }, enumerable: !0, configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function () {
      return D
    }, set: function (e) {
      D = e
    }, enumerable: !0, configurable: !0
  });
  var l = d;
  Object.defineProperty(e, "FileReadStream", {
    get: function () {
      return l
    }, set: function (e) {
      l = e
    }, enumerable: !0, configurable: !0
  });
  var f = D;

  function d(e, t) {
    return this instanceof d ? (c.apply(this, arguments), this) : d.apply(Object.create(d.prototype), arguments)
  }

  function D(e, t) {
    return this instanceof D ? (a.apply(this, arguments), this) : D.apply(Object.create(D.prototype), arguments)
  }

  Object.defineProperty(e, "FileWriteStream", {
    get: function () {
      return f
    }, set: function (e) {
      f = e
    }, enumerable: !0, configurable: !0
  });
  var p = e.open;

  function h(e, t, n, r) {
    return "function" == typeof n && (r = n, n = null), function e(t, n, r, u, o){
      return p(t, n, r, (function (i, s) {
        !i || "EMFILE" !== i.code && "ENFILE" !== i.code ? "function" == typeof u && u.apply(this, arguments) : en([e, [t, n, r, u], i, o || Date.now(), Date.now()])
      }))
    }(e, t, n, r)
  }

  return e.open = h, e
}

function en(e) {
  qt("ENQUEUE", e[0].name, e[1]), Vt[Ht].push(e), nn()
}

function tn() {
  for (var e = Date.now(), t = 0; t < Vt[Ht].length; ++t) Vt[Ht][t].length > 2 && (Vt[Ht][t][3] = e, Vt[Ht][t][4] = e);
  nn()
}

function nn() {
  if (clearTimeout(Zt), Zt = void 0, 0 !== Vt[Ht].length) {
    var e = Vt[Ht].shift(), t = e[0], n = e[1], r = e[2], u = e[3], o = e[4];
    if (void 0 === u) qt("RETRY", t.name, n), t.apply(null, n); else if (Date.now() - u >= 6e4) {
      qt("TIMEOUT", t.name, n);
      var i = n.pop();
      "function" == typeof i && i.call(null, r)
    } else {
      var s = Date.now() - o, c = Math.max(o - u, 1);
      s >= Math.min(1.2 * c, 100) ? (qt("RETRY", t.name, n), t.apply(null, n.concat([u]))) : Vt[Ht].push(e)
    }
    void 0 === Zt && (Zt = setTimeout(nn, 0))
  }
}

process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !Vt.__patched && (Xt = Qt(Vt), Vt.__patched = !0), function(e){
  const t = Pt.fromCallback, n = Xt,
    r = ["access", "appendFile", "chmod", "chown", "close", "copyFile", "fchmod", "fchown", "fdatasync", "fstat", "fsync", "ftruncate", "futimes", "lchown", "lchmod", "link", "lstat", "mkdir", "mkdtemp", "open", "readFile", "readdir", "readlink", "realpath", "rename", "rmdir", "stat", "symlink", "truncate", "unlink", "utimes", "writeFile"].filter((e => "function" == typeof n[e]));
  Object.keys(n).forEach((t => {
    "promises" !== t && (e[t] = n[t])
  })), r.forEach((r => {
    e[r] = t(n[r])
  })), e.exists = function (e, t) {
    return "function" == typeof t ? n.exists(e, t) : new Promise((t => n.exists(e, t)))
  }, e.read = function (e, t, r, u, o, i) {
    return "function" == typeof i ? n.read(e, t, r, u, o, i) : new Promise(((i, s) => {
      n.read(e, t, r, u, o, ((e, t, n) => {
        if (e) return s(e);
        i({ bytesRead: t, buffer: n })
      }))
    }))
  }, e.write = function (e, t, ...r) {
    return "function" == typeof r[r.length-1] ? n.write(e, t, ...r) : new Promise(((u, o) => {
      n.write(e, t, ...r, ((e, t, n) => {
        if (e) return o(e);
        u({ bytesWritten: t, buffer: n })
      }))
    }))
  }, "function" == typeof n.realpath.native && (e.realpath.native = t(n.realpath.native))
}(Bt);
const rn = e;

function un(e) {
  return (e = rn.normalize(rn.resolve(e)).split(rn.sep)).length > 0 ? e[0] : null
}

const on = /[<>:"|?*]/;
var sn = function (e) {
  const t = un(e);
  return e = e.replace(t, ""), on.test(e)
};
const cn = Xt, an = e, ln = sn, fn = parseInt("0777", 8);
var dn = function e(t, n, r, u) {
  if ("function" == typeof n ? (r = n, n = {}) : n && "object" == typeof n || (n = {
    mode: n
  }), "win32" === process.platform && ln(t)) {
    const e = new Error(t + " contains invalid WIN32 path characters.");
    return e.code = "EINVAL", r(e)
  }
  let o = n.mode;
  const i = n.fs || cn;
  void 0 === o && (o = fn & ~process.umask()), u || (u = null), r = r || function () {
  }, t = an.resolve(t), i.mkdir(t, o, (o => {
    if (!o) return r(null, u = u || t);
    if ("ENOENT" === o.code) {
      if (an.dirname(t) === t) return r(o);
      e(an.dirname(t), n, ((u, o) => {
        u ? r(u, o) : e(t, n, r, o)
      }))
    } else i.stat(t, ((e, t) => {
      e || !t.isDirectory() ? r(o, u) : r(null, u)
    }))
  }))
};
const Dn = Xt, pn = e, hn = sn, En = parseInt("0777", 8);
var mn = function e(t, n, r) {
  n && "object" == typeof n || (n = { mode: n });
  let u = n.mode;
  const o = n.fs || Dn;
  if ("win32" === process.platform && hn(t)) {
    const e = new Error(t + " contains invalid WIN32 path characters.");
    throw e.code = "EINVAL", e
  }
  void 0 === u && (u = En & ~process.umask()), r || (r = null), t = pn.resolve(t);
  try {
    o.mkdirSync(t, u), r = r || t
  } catch (u) {
    if ("ENOENT" === u.code) {
      if (pn.dirname(t) === t) throw u;
      r = e(pn.dirname(t), n, r), e(t, n, r)
    } else {
      let e;
      try {
        e = o.statSync(t)
      } catch (e) {
        throw u
      }
      if (!e.isDirectory()) throw u
    }
  }
  return r
};
const yn = (0, Pt.fromCallback)(dn);
var Cn = {
  mkdirs: yn,
  mkdirsSync: mn,
  mkdirp: yn,
  mkdirpSync: mn,
  ensureDir: yn,
  ensureDirSync: mn
};
const Fn = Xt;
var gn = function (e, t, n, r) {
  Fn.open(e, "r+", ((e, u) => {
    if (e) return r(e);
    Fn.futimes(u, t, n, (e => {
      Fn.close(u, (t => {
        r && r(e || t)
      }))
    }))
  }))
}, An = function (e, t, n) {
  const r = Fn.openSync(e, "r+");
  return Fn.futimesSync(r, t, n), Fn.closeSync(r)
};
const vn = Xt, Sn = e, wn = 10, On = 5, _n = 0, bn = process.versions.node.split("."), Bn = Number.parseInt(bn[0], 10),
  Pn = Number.parseInt(bn[1], 10), kn = Number.parseInt(bn[2], 10);

function In() {
  if (Bn > wn) return !0;
  if (Bn === wn) {
    if (Pn > On) return !0;
    if (Pn === On && kn >= _n) return !0
  }
  return !1
}

function xn(e, t) {
  const n = Sn.resolve(e).split(Sn.sep).filter((e => e)), r = Sn.resolve(t).split(Sn.sep).filter((e => e));
  return n.reduce(((e, t, n) => e && r[n] === t), !0)
}

function Nn(e, t, n) {
  return `Cannot ${n} '${e}' to a subdirectory of itself, '${t}'.`
}

var Rn, Tn, Mn = {
  checkPaths: function (e, t, n, r) {
    !function(e, t, n){
      In() ? vn.stat(e, { bigint: !0 }, ((e, r) => {
        if (e) return n(e);
        vn.stat(t, { bigint: !0 }, ((e, t) => e ? "ENOENT" === e.code ? n(null, {
          srcStat: r,
          destStat: null
        }) : n(e) : n(null, { srcStat: r, destStat: t })))
      })) : vn.stat(e, ((e, r) => {
        if (e) return n(e);
        vn.stat(t, ((e, t) => e ? "ENOENT" === e.code ? n(null, { srcStat: r, destStat: null }) : n(e) : n(null, {
          srcStat: r,
          destStat: t
        })))
      }))
    }(e, t, ((u, o) => {
      if (u) return r(u);
      const { srcStat:i, destStat:s } = o;
      return s && s.ino && s.dev && s.ino === i.ino && s.dev === i.dev ? r(new Error("Source and destination must not be the same.")) : i.isDirectory() && xn(e, t) ? r(new Error(Nn(e, t, n))) : r(null, {
        srcStat: i,
        destStat: s
      })
    }))
  },
  checkPathsSync: function (e, t, n) {
    const { srcStat:r, destStat:u } = function(e, t){
      let n, r;
      n = In() ? vn.statSync(e, { bigint: !0 }) : vn.statSync(e);
      try {
        r = In() ? vn.statSync(t, { bigint: !0 }) : vn.statSync(t)
      } catch (e) {
        if ("ENOENT" === e.code) return { srcStat: n, destStat: null };
        throw e
      }
      return { srcStat: n, destStat: r }
    }(e, t);
    if (u && u.ino && u.dev && u.ino === r.ino && u.dev === r.dev) throw new Error("Source and destination must not be the same.");
    if (r.isDirectory() && xn(e, t)) throw new Error(Nn(e, t, n));
    return { srcStat: r, destStat: u }
  },
  checkParentPaths: function e(t, n, r, u, o) {
    const i = Sn.resolve(Sn.dirname(t)), s = Sn.resolve(Sn.dirname(r));
    if (s === i || s === Sn.parse(s).root) return o();
    In() ? vn.stat(s, {
      bigint: !0
    }, ((i, c) => i ? "ENOENT" === i.code ? o() : o(i) : c.ino && c.dev && c.ino === n.ino && c.dev === n.dev ? o(new Error(Nn(t, r, u))) : e(t, n, s, u, o))) : vn.stat(s, ((i, c) => i ? "ENOENT" === i.code ? o() : o(i) : c.ino && c.dev && c.ino === n.ino && c.dev === n.dev ? o(new Error(Nn(t, r, u))) : e(t, n, s, u, o)))
  },
  checkParentPathsSync: function e(t, n, r, u) {
    const o = Sn.resolve(Sn.dirname(t)), i = Sn.resolve(Sn.dirname(r));
    if (i === o || i === Sn.parse(i).root) return;
    let s;
    try {
      s = In() ? vn.statSync(i, { bigint: !0 }) : vn.statSync(i)
    } catch (e) {
      if ("ENOENT" === e.code) return;
      throw e
    }
    if (s.ino && s.dev && s.ino === n.ino && s.dev === n.dev) throw new Error(Nn(t, r, u));
    return e(t, n, i, u)
  },
  isSrcSubdir: xn
};
const Ln = Xt, jn = e, $n = Cn.mkdirsSync, Hn = An, Gn = Mn;

function Vn(e, t, n, r) {
  if (!r.filter || r.filter(t, n)) return function(e, t, n, r){
    const u = r.dereference ? Ln.statSync : Ln.lstatSync, o = u(t);
    if (o.isDirectory()) return function(e, t, n, r, u){
      if (!t) return function(e, t, n, r){
        return Ln.mkdirSync(n), Jn(t, n, r), Ln.chmodSync(n, e.mode)
      }(e, n, r, u);
      if (t && !t.isDirectory()) throw new Error(`Cannot overwrite non-directory '${r}' with directory '${n}'.`);
      return Jn(n, r, u)
    }(o, e, t, n, r);
    if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return function(e, t, n, r, u){
      return t ? function(e, t, n, r){
        if (r.overwrite) return Ln.unlinkSync(n), Un(e, t, n, r);
        if (r.errorOnExist) throw new Error(`'${n}' already exists`)
      }(e, n, r, u) : Un(e, n, r, u)
    }(o, e, t, n, r);
    if (o.isSymbolicLink()) return function(e, t, n, r){
      let u = Ln.readlinkSync(t);
      r.dereference && (u = jn.resolve(process.cwd(), u));
      if (e) {
        let e;
        try {
          e = Ln.readlinkSync(n)
        } catch (e) {
          if ("EINVAL" === e.code || "UNKNOWN" === e.code) return Ln.symlinkSync(u, n);
          throw e
        }
        if (r.dereference && (e = jn.resolve(process.cwd(), e)), Gn.isSrcSubdir(u, e)) throw new Error(`Cannot copy '${u}' to a subdirectory of itself, '${e}'.`);
        if (Ln.statSync(n).isDirectory() && Gn.isSrcSubdir(e, u)) throw new Error(`Cannot overwrite '${e}' with '${u}'.`);
        return function(e, t){
          return Ln.unlinkSync(t), Ln.symlinkSync(e, t)
        }(u, n)
      }
      return Ln.symlinkSync(u, n)
    }(e, t, n, r)
  }(e, t, n, r)
}

function Un(e, t, n, r) {
  return "function" == typeof Ln.copyFileSync ? (Ln.copyFileSync(t, n), Ln.chmodSync(n, e.mode), r.preserveTimestamps ? Hn(n, e.atime, e.mtime) : void 0) : function(e, t, n, r){
    const u = 65536, o = (Tn ? Rn : (Tn = 1, Rn = function (e) {
      if ("function" == typeof Buffer.allocUnsafe) try {
        return Buffer.allocUnsafe(e)
      } catch (t) {
        return new Buffer(e)
      }
      return new Buffer(e)
    }))(u), i = Ln.openSync(t, "r"), s = Ln.openSync(n, "w", e.mode);
    let c = 0;
    for (; c < e.size; ) {
      const e = Ln.readSync(i, o, 0, u, c);
      Ln.writeSync(s, o, 0, e), c += e
    }
    r.preserveTimestamps && Ln.futimesSync(s, e.atime, e.mtime);
    Ln.closeSync(i), Ln.closeSync(s)
  }(e, t, n, r)
}

function Jn(e, t, n) {
  Ln.readdirSync(e).forEach((r => function(e, t, n, r){
    const u = jn.join(t, e), o = jn.join(n, e), { destStat:i } = Gn.checkPathsSync(u, o, "copy");
    return Vn(i, u, o, r)
  }(r, e, t, n)))
}

var Wn = function (e, t, n) {
  "function" == typeof n && (n = { filter: n }), (n = n || {
  }).clobber = !("clobber" in n) || !!n.clobber, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && "ia32" === process.arch && console.warn("fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n\n    see https://github.com/jprichardson/node-fs-extra/issues/269");
  const { srcStat:r, destStat:u } = Gn.checkPathsSync(e, t, "copy");
  return Gn.checkParentPathsSync(e, r, t, "copy"), function(e, t, n, r){
    if (r.filter && !r.filter(t, n)) return;
    const u = jn.dirname(n);
    Ln.existsSync(u) || $n(u);
    return Vn(e, t, n, r)
  }(u, e, t, n)
}, zn = { copySync: Wn };
const Kn = Pt.fromPromise, qn = Bt;
var Yn = {
  pathExists: Kn((function (e) {
    return qn.access(e).then((() =>!0)).catch((() =>!1))
  })), pathExistsSync: qn.existsSync
};
const Zn = Xt, Xn = e, Qn = Cn.mkdirs, er = Yn.pathExists, tr = gn, nr = Mn;

function rr(e, t, n, r, u) {
  const o = Xn.dirname(n);
  er(o, ((i, s) => i ? u(i) : s ? or(e, t, n, r, u) : void Qn(o, (o => o ? u(o) : or(e, t, n, r, u)))))
}

function ur(e, t, n, r, u, o) {
  Promise.resolve(u.filter(n, r)).then((i => i ? e(t, n, r, u, o) : o()), (e => o(e)))
}

function or(e, t, n, r, u) {
  return r.filter ? ur(ir, e, t, n, r, u) : ir(e, t, n, r, u)
}

function ir(e, t, n, r, u) {
  (r.dereference ? Zn.stat : Zn.lstat)(t, ((o, i) => o ? u(o) : i.isDirectory() ? function(e, t, n, r, u, o){
    if (!t) return function(e, t, n, r, u){
      Zn.mkdir(n, (o => {
        if (o) return u(o);
        ar(t, n, r, (t => t ? u(t) : Zn.chmod(n, e.mode, u)))
      }))
    }(e, n, r, u, o);
    if (t && !t.isDirectory()) return o(new Error(`Cannot overwrite non-directory '${r}' with directory '${n}'.`));
    return ar(n, r, u, o)
  }(i, e, t, n, r, u) : i.isFile() || i.isCharacterDevice() || i.isBlockDevice() ? function(e, t, n, r, u, o){
    return t ? function(e, t, n, r, u){
      if (!r.overwrite) return r.errorOnExist ? u(new Error(`'${n}' already exists`)) : u();
      Zn.unlink(n, (o => o ? u(o) : sr(e, t, n, r, u)))
    }(e, n, r, u, o) : sr(e, n, r, u, o)
  }(i, e, t, n, r, u) : i.isSymbolicLink() ? function(e, t, n, r, u){
    Zn.readlink(t, ((t, o) => t ? u(t) : (r.dereference && (o = Xn.resolve(process.cwd(), o)), e ? void Zn.readlink(n, ((t, i) => t ? "EINVAL" === t.code || "UNKNOWN" === t.code ? Zn.symlink(o, n, u) : u(t) : (r.dereference && (i = Xn.resolve(process.cwd(), i)), nr.isSrcSubdir(o, i) ? u(new Error(`Cannot copy '${o}' to a subdirectory of itself, '${i}'.`)) : e.isDirectory() && nr.isSrcSubdir(i, o) ? u(new Error(`Cannot overwrite '${i}' with '${o}'.`)) : function(e, t, n){
      Zn.unlink(t, (r => r ? n(r) : Zn.symlink(e, t, n)))
    }(o, n, u)))) : Zn.symlink(o, n, u))))
  }(e, t, n, r, u) : void 0))
}

function sr(e, t, n, r, u) {
  return "function" == typeof Zn.copyFile ? Zn.copyFile(t, n, (t => t ? u(t) : cr(e, n, r, u))) : function(e, t, n, r, u){
    const o = Zn.createReadStream(t);
    o.on("error", (e => u(e))).once("open", (() => {
      const t = Zn.createWriteStream(n, { mode: e.mode });
      t.on("error", (e => u(e))).on("open", (() => o.pipe(t))).once("close", (() => cr(e, n, r, u)))
    }))
  }(e, t, n, r, u)
}

function cr(e, t, n, r) {
  Zn.chmod(t, e.mode, (u => u ? r(u) : n.preserveTimestamps ? tr(t, e.atime, e.mtime, r) : r()))
}

function ar(e, t, n, r) {
  Zn.readdir(e, ((u, o) => u ? r(u) : lr(o, e, t, n, r)))
}

function lr(e, t, n, r, u) {
  const o = e.pop();
  return o ? function(e, t, n, r, u, o){
    const i = Xn.join(n, t), s = Xn.join(r, t);
    nr.checkPaths(i, s, "copy", ((t, c) => {
      if (t) return o(t);
      const { destStat:a } = c;
      or(a, i, s, u, (t => t ? o(t) : lr(e, n, r, u, o)))
    }))
  }(e, o, t, n, r, u) : u()
}

var fr = function (e, t, n, r) {
  "function" != typeof n || r ? "function" == typeof n && (n = { filter: n }) : (r = n, n = {}), r = r || function () {
  }, (n = n || {
  }).clobber = !("clobber" in n) || !!n.clobber, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && "ia32" === process.arch && console.warn("fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n\n    see https://github.com/jprichardson/node-fs-extra/issues/269"), nr.checkPaths(e, t, "copy", ((u, o) => {
    if (u) return r(u);
    const { srcStat:i, destStat:s } = o;
    nr.checkParentPaths(e, i, t, "copy", (u => u ? r(u) : n.filter ? ur(rr, s, e, t, n, r) : rr(s, e, t, n, r)))
  }))
};
var dr = { copy: (0, Pt.fromCallback)(fr) };
const Dr = Xt, pr = e, hr = l, Er = "win32" === process.platform;

function mr(e) {
  ["unlink", "chmod", "stat", "lstat", "rmdir", "readdir"].forEach((t => {
    e[t] = e[t] || Dr[t], e[t+="Sync"] = e[t] || Dr[t]
  })), e.maxBusyTries = e.maxBusyTries || 3
}

function yr(e, t, n) {
  let r = 0;
  "function" == typeof t && (n = t, t = {
  }), hr(e, "rimraf: missing path"), hr.strictEqual(typeof e, "string", "rimraf: path should be a string"), hr.strictEqual(typeof n, "function", "rimraf: callback function required"), hr(t, "rimraf: invalid options argument provided"), hr.strictEqual(typeof t, "object", "rimraf: options should be object"), mr(t), Cr(e, t, (function u(o) {
    if (o) {
      if (("EBUSY" === o.code || "ENOTEMPTY" === o.code || "EPERM" === o.code) && r < t.maxBusyTries) {
        r++;
        return setTimeout((() => Cr(e, t, u)), 100 * r)
      }
      "ENOENT" === o.code && (o = null)
    }
    n(o)
  }))
}

function Cr(e, t, n) {
  hr(e), hr(t), hr("function" == typeof n), t.lstat(e, ((r, u) => r && "ENOENT" === r.code ? n(null) : r && "EPERM" === r.code && Er ? Fr(e, t, r, n) : u && u.isDirectory() ? Ar(e, t, r, n) : void t.unlink(e, (r => {
    if (r) {
      if ("ENOENT" === r.code) return n(null);
      if ("EPERM" === r.code) return Er ? Fr(e, t, r, n) : Ar(e, t, r, n);
      if ("EISDIR" === r.code) return Ar(e, t, r, n)
    }
    return n(r)
  }))))
}

function Fr(e, t, n, r) {
  hr(e), hr(t), hr("function" == typeof r), n && hr(n instanceof Error), t.chmod(e, 438, (u => {
    u ? r("ENOENT" === u.code ? null : n) : t.stat(e, ((u, o) => {
      u ? r("ENOENT" === u.code ? null : n) : o.isDirectory() ? Ar(e, t, n, r) : t.unlink(e, r)
    }))
  }))
}

function gr(e, t, n) {
  let r;
  hr(e), hr(t), n && hr(n instanceof Error);
  try {
    t.chmodSync(e, 438)
  } catch (e) {
    if ("ENOENT" === e.code) return;
    throw n
  }
  try {
    r = t.statSync(e)
  } catch (e) {
    if ("ENOENT" === e.code) return;
    throw n
  }
  r.isDirectory() ? Sr(e, t, n) : t.unlinkSync(e)
}

function Ar(e, t, n, r) {
  hr(e), hr(t), n && hr(n instanceof Error), hr("function" == typeof r), t.rmdir(e, (u => {
    !u || "ENOTEMPTY" !== u.code && "EEXIST" !== u.code && "EPERM" !== u.code ? u && "ENOTDIR" === u.code ? r(n) : r(u) : function(e, t, n){
      hr(e), hr(t), hr("function" == typeof n), t.readdir(e, ((r, u) => {
        if (r) return n(r);
        let o, i = u.length;
        if (0 === i) return t.rmdir(e, n);
        u.forEach((r => {
          yr(pr.join(e, r), t, (r => {
            if (!o) return r ? n(o = r) : void (0 == --i && t.rmdir(e, n))
          }))
        }))
      }))
    }(e, t, r)
  }))
}

function vr(e, t) {
  let n;
  mr(t = t || {
  }), hr(e, "rimraf: missing path"), hr.strictEqual(typeof e, "string", "rimraf: path should be a string"), hr(t, "rimraf: missing options"), hr.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    n = t.lstatSync(e)
  } catch (n) {
    if ("ENOENT" === n.code) return;
    "EPERM" === n.code && Er && gr(e, t, n)
  }
  try {
    n && n.isDirectory() ? Sr(e, t, null) : t.unlinkSync(e)
  } catch (n) {
    if ("ENOENT" === n.code) return;
    if ("EPERM" === n.code) return Er ? gr(e, t, n) : Sr(e, t, n);
    if ("EISDIR" !== n.code) throw n;
    Sr(e, t, n)
  }
}

function Sr(e, t, n) {
  hr(e), hr(t), n && hr(n instanceof Error);
  try {
    t.rmdirSync(e)
  } catch (r) {
    if ("ENOTDIR" === r.code) throw n;
    if ("ENOTEMPTY" === r.code || "EEXIST" === r.code || "EPERM" === r.code) !function(e, t){
      if (hr(e), hr(t), t.readdirSync(e).forEach((n => vr(pr.join(e, n), t))), !Er) {
        return t.rmdirSync(e, t)
      }
      {
        const n = Date.now();
        do {
          try {
            return t.rmdirSync(e, t)
          } catch (e) {
          }
        } while (Date.now() - n < 500)
      }
    }(e, t); else if ("ENOENT" !== r.code) throw r
  }
}

var wr = yr;
yr.sync = vr;
const Or = wr;
var _r = { remove: (0, Pt.fromCallback)(Or), removeSync: Or.sync };
const br = Pt.fromCallback, Br = Xt, Pr = e, kr = Cn, Ir = _r, xr = br((function (e, t) {
  t = t || function () {
  }, Br.readdir(e, ((n, r) => {
    if (n) return kr.mkdirs(e, t);
    r = r.map((t => Pr.join(e, t))), function e(){
      const n = r.pop();
      if (!n) return t();
      Ir.remove(n, (n => {
        if (n) return t(n);
        e()
      }))
    }()
  }))
}));

function Nr(e) {
  let t;
  try {
    t = Br.readdirSync(e)
  } catch (t) {
    return kr.mkdirsSync(e)
  }
  t.forEach((t => {
    t = Pr.join(e, t), Ir.removeSync(t)
  }))
}

var Rr = { emptyDirSync: Nr, emptydirSync: Nr, emptyDir: xr, emptydir: xr };
const Tr = Pt.fromCallback, Mr = e, Lr = Xt, jr = Cn, $r = Yn.pathExists;
var Hr = {
  createFile: Tr((function (e, t) {

    function n() {
      Lr.writeFile(e, "", (e => {
        if (e) return t(e);
        t()
      }))
    }

    Lr.stat(e, ((r, u) => {
      if (!r && u.isFile()) return t();
      const o = Mr.dirname(e);
      $r(o, ((e, r) => e ? t(e) : r ? n() : void jr.mkdirs(o, (e => {
        if (e) return t(e);
        n()
      }))))
    }))
  })), createFileSync: function (e) {
    let t;
    try {
      t = Lr.statSync(e)
    } catch (e) {
    }
    if (t && t.isFile()) return;
    const n = Mr.dirname(e);
    Lr.existsSync(n) || jr.mkdirsSync(n), Lr.writeFileSync(e, "")
  }
};
const Gr = Pt.fromCallback, Vr = e, Ur = Xt, Jr = Cn, Wr = Yn.pathExists;
var zr = {
  createLink: Gr((function (e, t, n) {

    function r(e, t) {
      Ur.link(e, t, (e => {
        if (e) return n(e);
        n(null)
      }))
    }

    Wr(t, ((u, o) => u ? n(u) : o ? n(null) : void Ur.lstat(e, (u => {
      if (u) return u.message = u.message.replace("lstat", "ensureLink"), n(u);
      const o = Vr.dirname(t);
      Wr(o, ((u, i) => u ? n(u) : i ? r(e, t) : void Jr.mkdirs(o, (u => {
        if (u) return n(u);
        r(e, t)
      }))))
    }))))
  })), createLinkSync: function (e, t) {
    if (Ur.existsSync(t)) return;
    try {
      Ur.lstatSync(e)
    } catch (e) {
      throw e.message = e.message.replace("lstat", "ensureLink"), e
    }
    const n = Vr.dirname(t);
    return Ur.existsSync(n) || Jr.mkdirsSync(n), Ur.linkSync(e, t)
  }
};
const Kr = e, qr = Xt, Yr = Yn.pathExists;
var Zr = {
  symlinkPaths: function (e, t, n) {
    if (Kr.isAbsolute(e)) return qr.lstat(e, (t => t ? (t.message = t.message.replace("lstat", "ensureSymlink"), n(t)) : n(null, {
      toCwd: e,
      toDst: e
    })));
    {
      const r = Kr.dirname(t), u = Kr.join(r, e);
      return Yr(u, ((t, o) => t ? n(t) : o ? n(null, {
        toCwd: u,
        toDst: e
      }) : qr.lstat(e, (t => t ? (t.message = t.message.replace("lstat", "ensureSymlink"), n(t)) : n(null, {
        toCwd: e,
        toDst: Kr.relative(r, e)
      })))))
    }
  }, symlinkPathsSync: function (e, t) {
    let n;
    if (Kr.isAbsolute(e)) {
      if (n = qr.existsSync(e), !n) throw new Error("absolute srcpath does not exist");
      return { toCwd: e, toDst: e }
    }
    {
      const r = Kr.dirname(t), u = Kr.join(r, e);
      if (n = qr.existsSync(u), n) return { toCwd: u, toDst: e };
      if (n = qr.existsSync(e), !n) throw new Error("relative srcpath does not exist");
      return { toCwd: e, toDst: Kr.relative(r, e) }
    }
  }
};
const Xr = Xt;
var Qr = {
  symlinkType: function (e, t, n) {
    if (n = "function" == typeof t ? t : n, t = "function" != typeof t && t) return n(null, t);
    Xr.lstat(e, ((e, r) => {
      if (e) return n(null, "file");
      t = r && r.isDirectory() ? "dir" : "file", n(null, t)
    }))
  }, symlinkTypeSync: function (e, t) {
    let n;
    if (t) return t;
    try {
      n = Xr.lstatSync(e)
    } catch (e) {
      return "file"
    }
    return n && n.isDirectory() ? "dir" : "file"
  }
};
const eu = Pt.fromCallback, tu = e, nu = Xt, ru = Cn.mkdirs, uu = Cn.mkdirsSync, ou = Zr.symlinkPaths,
  iu = Zr.symlinkPathsSync, su = Qr.symlinkType, cu = Qr.symlinkTypeSync, au = Yn.pathExists;
var lu = {
  createSymlink: eu((function (e, t, n, r) {
    r = "function" == typeof n ? n : r, n = "function" != typeof n && n, au(t, ((u, o) => u ? r(u) : o ? r(null) : void ou(e, t, ((u, o) => {
      if (u) return r(u);
      e = o.toDst, su(o.toCwd, n, ((n, u) => {
        if (n) return r(n);
        const o = tu.dirname(t);
        au(o, ((n, i) => n ? r(n) : i ? nu.symlink(e, t, u, r) : void ru(o, (n => {
          if (n) return r(n);
          nu.symlink(e, t, u, r)
        }))))
      }))
    }))))
  })), createSymlinkSync: function (e, t, n) {
    if (nu.existsSync(t)) return;
    const r = iu(e, t);
    e = r.toDst, n = cu(r.toCwd, n);
    const u = tu.dirname(t);
    return nu.existsSync(u) || uu(u), nu.symlinkSync(e, t, n)
  }
};
var fu, du = {
  createFile: Hr.createFile,
  createFileSync: Hr.createFileSync,
  ensureFile: Hr.createFile,
  ensureFileSync: Hr.createFileSync,
  createLink: zr.createLink,
  createLinkSync: zr.createLinkSync,
  ensureLink: zr.createLink,
  ensureLinkSync: zr.createLinkSync,
  createSymlink: lu.createSymlink,
  createSymlinkSync: lu.createSymlinkSync,
  ensureSymlink: lu.createSymlink,
  ensureSymlinkSync: lu.createSymlinkSync
};
try {
  fu = Xt
} catch (e) {
  fu = n
}

function Du(e, t) {
  var n, r = "\n";
  return "object" == typeof t && null !== t && (t.spaces && (n = t.spaces), t.EOL && (r = t.EOL)), JSON.stringify(e, t ? t.replacer : null, n).replace(/\n/g, r) + r
}

function pu(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e = e.replace(/^\uFEFF/, "")
}

var hu = {
  readFile: function (e, t, n) {
    null == n && (n = t, t = {}), "string" == typeof t && (t = { encoding: t });
    var r = (t = t || {}).fs || fu, u = !0;
    "throws" in t && (u = t.throws), r.readFile(e, t, (function (r, o) {
      if (r) return n(r);
      var i;
      o = pu(o);
      try {
        i = JSON.parse(o, t ? t.reviver : null)
      } catch (t) {
        return u ? (t.message = e + ": " + t.message, n(t)) : n(null, null)
      }
      n(null, i)
    }))
  }, readFileSync: function (e, t) {
    "string" == typeof (t = t || {}) && (t = { encoding: t });
    var n = t.fs || fu, r = !0;
    "throws" in t && (r = t.throws);
    try {
      var u = n.readFileSync(e, t);
      return u = pu(u), JSON.parse(u, t.reviver)
    } catch (t) {
      if (r) throw t.message = e + ": " + t.message, t;
      return null
    }
  }, writeFile: function (e, t, n, r) {
    null == r && (r = n, n = {});
    var u = (n = n || {}).fs || fu, o = "";
    try {
      o = Du(t, n)
    } catch (e) {
      return void (r && r(e, null))
    }
    u.writeFile(e, o, n, r)
  }, writeFileSync: function (e, t, n) {
    var r = (n = n || {}).fs || fu, u = Du(t, n);
    return r.writeFileSync(e, u, n)
  }
}, Eu = hu;
const mu = Pt.fromCallback, yu = Eu;
var Cu = {
  readJson: mu(yu.readFile),
  readJsonSync: yu.readFileSync,
  writeJson: mu(yu.writeFile),
  writeJsonSync: yu.writeFileSync
};
const Fu = e, gu = Cn, Au = Yn.pathExists, vu = Cu;
var Su = function (e, t, n, r) {
  "function" == typeof n && (r = n, n = {});
  const u = Fu.dirname(e);
  Au(u, ((o, i) => o ? r(o) : i ? vu.writeJson(e, t, n, r) : void gu.mkdirs(u, (u => {
    if (u) return r(u);
    vu.writeJson(e, t, n, r)
  }))))
};
const wu = Xt, Ou = e, _u = Cn, bu = Cu;
var Bu = function (e, t, n) {
  const r = Ou.dirname(e);
  wu.existsSync(r) || _u.mkdirsSync(r), bu.writeJsonSync(e, t, n)
};
const Pu = Pt.fromCallback, ku = Cu;
ku.outputJson = Pu(Su), ku.outputJsonSync = Bu, ku.outputJSON = ku.outputJson, ku.outputJSONSync = ku.outputJsonSync, ku.writeJSON = ku.writeJson, ku.writeJSONSync = ku.writeJsonSync, ku.readJSON = ku.readJson, ku.readJSONSync = ku.readJsonSync;
var Iu = ku;
const xu = Xt, Nu = e, Ru = zn.copySync, Tu = _r.removeSync, Mu = Cn.mkdirpSync, Lu = Mn;

function ju(e, t, n) {
  try {
    xu.renameSync(e, t)
  } catch (r) {
    if ("EXDEV" !== r.code) throw r;
    return function(e, t, n){
      const r = { overwrite: n, errorOnExist: !0 };
      return Ru(e, t, r), Tu(e)
    }(e, t, n)
  }
}

var $u = function (e, t, n) {
  const r = (n = n || {}).overwrite || n.clobber || !1, { srcStat:u } = Lu.checkPathsSync(e, t, "move");
  return Lu.checkParentPathsSync(e, u, t, "move"), Mu(Nu.dirname(t)), function(e, t, n){
    if (n) return Tu(t), ju(e, t, n);
    if (xu.existsSync(t)) throw new Error("dest already exists.");
    return ju(e, t, n)
  }(e, t, r)
}, Hu = { moveSync: $u };
const Gu = Xt, Vu = e, Uu = dr.copy, Ju = _r.remove, Wu = Cn.mkdirp, zu = Yn.pathExists, Ku = Mn;

function qu(e, t, n, r) {
  Gu.rename(e, t, (u => u ? "EXDEV" !== u.code ? r(u) : function(e, t, n, r){
    const u = { overwrite: n, errorOnExist: !0 };
    Uu(e, t, u, (t => t ? r(t) : Ju(e, r)))
  }(e, t, n, r) : r()))
}

var Yu = function (e, t, n, r) {
  "function" == typeof n && (r = n, n = {});
  const u = n.overwrite || n.clobber || !1;
  Ku.checkPaths(e, t, "move", ((n, o) => {
    if (n) return r(n);
    const { srcStat:i } = o;
    Ku.checkParentPaths(e, i, t, "move", (n => {
      if (n) return r(n);
      Wu(Vu.dirname(t), (n => n ? r(n) : function(e, t, n, r){
        if (n) return Ju(t, (u => u ? r(u) : qu(e, t, n, r)));
        zu(t, ((u, o) => u ? r(u) : o ? r(new Error("dest already exists.")) : qu(e, t, n, r)))
      }(e, t, u, r)))
    }))
  }))
};
var Zu = { move: (0, Pt.fromCallback)(Yu) };
const Xu = Pt.fromCallback, Qu = Xt, eo = e, to = Cn, no = Yn.pathExists;
var ro = {
  outputFile: Xu((function (e, t, n, r) {
    "function" == typeof n && (r = n, n = "utf8");
    const u = eo.dirname(e);
    no(u, ((o, i) => o ? r(o) : i ? Qu.writeFile(e, t, n, r) : void to.mkdirs(u, (u => {
      if (u) return r(u);
      Qu.writeFile(e, t, n, r)
    }))))
  })), outputFileSync: function (e, ...t) {
    const n = eo.dirname(e);
    if (Qu.existsSync(n)) return Qu.writeFileSync(e, ...t);
    to.mkdirsSync(n), Qu.writeFileSync(e, ...t)
  }
};
!function(e){
  e.exports = Object.assign({}, Bt, zn, dr, Rr, du, Iu, Cn, Hu, Zu, ro, Yn, _r);
  const t = n;
  Object.getOwnPropertyDescriptor(t, "promises") && Object.defineProperty(e.exports, "promises", {
    get: () => t.promises
  })
}(bt);
const uo = G.exports("streamroller:fileNameFormatter"), oo = e;
const io = G.exports("streamroller:fileNameParser"), so = de.exports;
const co = G.exports("streamroller:moveAndMaybeCompressFile"), ao = bt.exports, lo = f;
var fo = async (e, t, n) => {
  if (n = function(e){
    const t = { mode: parseInt("0600", 8), compress: !1 }, n = Object.assign({}, t, e);
    return co(`_parseOption: moveAndMaybeCompressFile called with option=${JSON.stringify(n)}`), n
  }(n), e !== t) {
    if (await ao.pathExists(e)) if (co(`moveAndMaybeCompressFile: moving file from ${e} to ${t} ${n.compress ? "with" : "without"} compress`), n.compress) await new Promise(((r, u) => {
      let o = !1;
      const i = ao.createWriteStream(t, { mode: n.mode, flags: "wx" }).on("open", (() => {
        o = !0;
        const t = ao.createReadStream(e).on("open", (() => {
          t.pipe(lo.createGzip()).pipe(i)
        })).on("error", (t => {
          co(`moveAndMaybeCompressFile: error reading ${e}`, t), i.destroy(t)
        }))
      })).on("finish", (() => {
        co(`moveAndMaybeCompressFile: finished compressing ${t}, deleting ${e}`), ao.unlink(e).then(r).catch((t => {
          co(`moveAndMaybeCompressFile: error deleting ${e}, truncating instead`, t), ao.truncate(e).then(r).catch((t => {
            co(`moveAndMaybeCompressFile: error truncating ${e}`, t), u(t)
          }))
        }))
      })).on("error", (e => {
        o ? (co(`moveAndMaybeCompressFile: error writing ${t}, deleting`, e), ao.unlink(t).then((() => {
          u(e)
        })).catch((e => {
          co(`moveAndMaybeCompressFile: error deleting ${t}`, e), u(e)
        }))) : (co(`moveAndMaybeCompressFile: error creating ${t}`, e), u(e))
      }))
    })).catch((() => {
    })); else {
      co(`moveAndMaybeCompressFile: renaming ${e} to ${t}`);
      try {
        await ao.move(e, t, { overwrite: !0 })
      } catch (n) {
        if (co(`moveAndMaybeCompressFile: error renaming ${e} to ${t}`, n), "ENOENT" !== n.code) {
          co("moveAndMaybeCompressFile: trying copy+truncate instead");
          try {
            await ao.copy(e, t, { overwrite: !0 }), await ao.truncate(e)
          } catch (e) {
            co("moveAndMaybeCompressFile: error copy+truncate", e)
          }
        }
      }
    }
  } else co("moveAndMaybeCompressFile: source and target are the same, not doing anything")
};
const Do = G.exports("streamroller:RollingFileWriteStream"), po = bt.exports, ho = e, Eo = t, mo = () => new Date,
  yo = de.exports, { Writable:Co } = a,
  Fo = ({ file:e, keepFileExt:t, needsIndex:n, alwaysIncludeDate:r, compress:u, fileNameSep:o }) => {
    let i = o || ".";
    const s = oo.join(e.dir, e.name), c = t => t + e.ext, a = (e, t, r) =>!n && r || !t ? e : e + i + t,
      l = (e, t, n) => (t > 0 || r) && n ? e + i + n : e, f = (e, t) => t && u ? e + ".gz" : e,
      d = t ? [l, a, c, f] : [c, l, a, f];
    return ({ date:e, index:t }) => (uo(`_formatFileName: date=${e}, index=${t}`), d.reduce(((n, r) => r(n, t, e)), s))
  }, go = ({ file:e, keepFileExt:t, pattern:n, fileNameSep:r }) => {
    let u = r || ".";
    const o = "__NOT_MATCHING__";
    let i = [(e, t) => e.endsWith(".gz") ? (io("it is gzipped"), t.isCompressed = !0, e.slice(0, -3)) : e, t ? t => t.startsWith(e.name) && t.endsWith(e.ext) ? (io("it starts and ends with the right things"), t.slice(e.name.length + 1, -1 * e.ext.length)) : o : t => t.startsWith(e.base) ? (io("it starts with the right things"), t.slice(e.base.length + 1)) : o, n ? (e, t) => {
      const r = e.split(u);
      let o = r[r.length-1];
      io("items: ", r, ", indexStr: ", o);
      let i = e;
      void 0 !== o && o.match(/^\d+$/) ? (i = e.slice(0, -1 * (o.length + 1)), io(`dateStr is ${i}`), n && !i && (i = o, o = "0")) : o = "0";
      try {
        const r = so.parse(n, i, new Date(0, 0));
        return so.asString(n, r) !== i ? e : (t.index = parseInt(o, 10), t.date = i, t.timestamp = r.getTime(), "")
      } catch (t) {
        return io(`Problem parsing ${i} as ${n}, error was: `, t), e
      }
    } : (e, t) => e.match(/^\d+$/) ? (io("it has an index"), t.index = parseInt(e, 10), "") : e];
    return e => {
      let t = { filename: e, index: 0, isCompressed: !1 };
      return i.reduce(((e, n) => n(e, t)), e) ? null : t
    }
  }, Ao = fo;
var vo = class extends Co {
  constructor(e, t) {
    if (Do(`constructor: creating RollingFileWriteStream. path=${e}`), "string" != typeof e || 0 === e.length) throw new Error(`Invalid filename: ${e}`);
    if (e.endsWith(ho.sep)) throw new Error(`Filename is a directory: ${e}`);
    0 === e.indexOf(`~${ho.sep}`) && (e = e.replace("~", Eo.homedir())), super(t), this.options = this._parseOption(t), this.fileObject = ho.parse(e), "" === this.fileObject.dir && (this.fileObject = ho.parse(ho.join(process.cwd(), e))), this.fileFormatter = Fo({
      file: this.fileObject,
      alwaysIncludeDate: this.options.alwaysIncludePattern,
      needsIndex: this.options.maxSize < Number.MAX_SAFE_INTEGER,
      compress: this.options.compress,
      keepFileExt: this.options.keepFileExt,
      fileNameSep: this.options.fileNameSep
    }), this.fileNameParser = go({
      file: this.fileObject,
      keepFileExt: this.options.keepFileExt,
      pattern: this.options.pattern,
      fileNameSep: this.options.fileNameSep
    }), this.state = {
      currentSize: 0
    }, this.options.pattern && (this.state.currentDate = yo(this.options.pattern, mo())), this.filename = this.fileFormatter({
      index: 0,
      date: this.state.currentDate
    }), ["a", "a+", "as", "as+"].includes(this.options.flags) && this._setExistingSizeAndDate(), Do(`constructor: create new file ${this.filename}, state=${JSON.stringify(this.state)}`), this._renewWriteStream()
  }

  _setExistingSizeAndDate() {
    try {
      const e = po.statSync(this.filename);
      this.state.currentSize = e.size, this.options.pattern && (this.state.currentDate = yo(this.options.pattern, e.mtime))
    } catch (e) {
      return
    }
  }

  _parseOption(e) {
    const t = {
      maxSize: 0,
      numToKeep: Number.MAX_SAFE_INTEGER,
      encoding: "utf8",
      mode: parseInt("0600", 8),
      flags: "a",
      compress: !1,
      keepFileExt: !1,
      alwaysIncludePattern: !1
    }, n = Object.assign({}, t, e);
    if (n.maxSize) {
      if (n.maxSize <= 0) throw new Error(`options.maxSize (${n.maxSize}) should be > 0`)
    } else delete n.maxSize;
    if (n.numBackups || 0 === n.numBackups) {
      if (n.numBackups < 0) throw new Error(`options.numBackups (${n.numBackups}) should be >= 0`);
      if (n.numBackups >= Number.MAX_SAFE_INTEGER) throw new Error(`options.numBackups (${n.numBackups}) should be < Number.MAX_SAFE_INTEGER`);
      n.numToKeep = n.numBackups + 1
    } else if (n.numToKeep <= 0) throw new Error(`options.numToKeep (${n.numToKeep}) should be > 0`);
    return Do(`_parseOption: creating stream with option=${JSON.stringify(n)}`), n
  }

  _final(e) {
    this.currentFileStream.end("", this.options.encoding, e)
  }

  _write(e, t, n) {
    this._shouldRoll().then((() => {
      Do(`_write: writing chunk. file=${this.currentFileStream.path} state=${JSON.stringify(this.state)} chunk=${e}`), this.currentFileStream.write(e, t, (t => {
        this.state.currentSize += e.length, n(t)
      }))
    }))
  }

  async _shouldRoll() {
    (this._dateChanged() || this._tooBig()) && (Do(`_shouldRoll: rolling because dateChanged? ${this._dateChanged()} or tooBig? ${this._tooBig()}`), await this._roll())
  }

  _dateChanged() {
    return this.state.currentDate && this.state.currentDate !== yo(this.options.pattern, mo())
  }

  _tooBig() {
    return this.state.currentSize >= this.options.maxSize
  }

  _roll() {
    return Do("_roll: closing the current stream"), new Promise(((e, t) => {
      this.currentFileStream.end("", this.options.encoding, (() => {
        this._moveOldFiles().then(e).catch(t)
      }))
    }))
  }

  async _moveOldFiles() {
    const e = await this._getExistingFiles();
    for (let t = (this.state.currentDate ? e.filter((e => e.date === this.state.currentDate)) : e).length; t >= 0; t--) {
      Do(`_moveOldFiles: i = ${t}`);
      const e = this.fileFormatter({ date: this.state.currentDate, index: t }),
        n = this.fileFormatter({ date: this.state.currentDate, index: t + 1 }),
        r = { compress: this.options.compress && 0 === t, mode: this.options.mode };
      await Ao(e, n, r)
    }
    this.state.currentSize = 0, this.state.currentDate = this.state.currentDate ? yo(this.options.pattern, mo()) : null, Do(`_moveOldFiles: finished rolling files. state=${JSON.stringify(this.state)}`), this._renewWriteStream(), await new Promise(((e, t) => {
      this.currentFileStream.write("", "utf8", (() => {
        this._clean().then(e).catch(t)
      }))
    }))
  }

  async _getExistingFiles() {
    const e = await po.readdir(this.fileObject.dir).catch((() => []));
    Do(`_getExistingFiles: files=${e}`);
    const t = e.map((e => this.fileNameParser(e))).filter((e => e)),
      n = e => (e.timestamp ? e.timestamp : mo().getTime()) - e.index;
    return t.sort(((e, t) => n(e) - n(t))), t
  }

  _renewWriteStream() {
    const e = this.fileFormatter({ date: this.state.currentDate, index: 0 }), t = e => {
      try {
        return po.mkdirSync(e, { recursive: !0 })
      } catch (n) {
        if ("ENOENT" === n.code) return t(ho.dirname(e)), t(e);
        if ("EEXIST" !== n.code && "EROFS" !== n.code) throw n;
        try {
          if (po.statSync(e).isDirectory()) return e;
          throw n
        } catch (e) {
          throw n
        }
      }
    };
    t(this.fileObject.dir);
    const n = { flags: this.options.flags, encoding: this.options.encoding, mode: this.options.mode };
    var r, u;
    po.appendFileSync(e, "", (r = {
      ...n
    }, u = "flags", r["flag"] = r[u], delete r[u], r)), this.currentFileStream = po.createWriteStream(e, n), this.currentFileStream.on("error", (e => {
      this.emit("error", e)
    }))
  }

  async _clean() {
    const e = await this._getExistingFiles();
    if (Do(`_clean: numToKeep = ${this.options.numToKeep}, existingFiles = ${e.length}`), Do("_clean: existing files are: ", e), this._tooManyFiles(e.length)) {
      const n = e.slice(0, e.length - this.options.numToKeep).map((e => ho.format({
        dir: this.fileObject.dir,
        base: e.filename
      })));
      await (t = n, Do(`deleteFiles: files to delete: ${t}`), Promise.all(t.map((e => po.unlink(e).catch((t => {
        Do(`deleteFiles: error when unlinking ${e}, ignoring. Error was ${t}`)
      }))))))
    }
    var t
  }

  _tooManyFiles(e) {
    return this.options.numToKeep > 0 && e > this.options.numToKeep
  }
};
const So = vo;
var wo = class extends So {
  constructor(e, t, n, r) {
    r || (r = {
    }), t && (r.maxSize = t), r.numBackups || 0 === r.numBackups || (n || 0 === n || (n = 1), r.numBackups = n), super(e, r), this.backups = r.numBackups, this.size = this.options.maxSize
  }

  get theStream() {
    return this.currentFileStream
  }
};
const Oo = vo;
var _o = {
  RollingFileWriteStream: vo, RollingFileStream: wo, DateRollingFileStream: class extends Oo {
    constructor(e, t, n) {
      t && "object" == typeof t && (n = t, t = null), n || (n = {
      }), t || (t = "yyyy-MM-dd"), n.pattern = t, n.numBackups || 0 === n.numBackups ? n.daysToKeep = n.numBackups : (n.daysToKeep || 0 === n.daysToKeep ? process.emitWarning("options.daysToKeep is deprecated due to the confusion it causes when used together with file size rolling. Please use options.numBackups instead.", "DeprecationWarning", "streamroller-DEP0001") : n.daysToKeep = 1, n.numBackups = n.daysToKeep), super(e, n), this.mode = this.options.mode
    }

    get theStream() {
      return this.currentFileStream
    }
  }
};
const bo = G.exports("log4js:file"), Bo = e, Po = _o, ko = t, Io = ko.EOL;
let xo = !1;
const No = new Set;

function Ro() {
  No.forEach((e => {
    e.sighupHandler()
  }))
}

_t.configure = function (e, t) {
  let n = t.basicLayout;
  return e.layout && (n = t.layout(e.layout.type, e.layout)), e.mode = e.mode || 384, function(e, t, n, r, u, o){
    if ("string" != typeof e || 0 === e.length) throw new Error(`Invalid filename: ${e}`);
    if (e.endsWith(Bo.sep)) throw new Error(`Filename is a directory: ${e}`);

    function i(e, t, n, r) {
      const u = new Po.RollingFileStream(e, t, n, r);
      return u.on("error", (t => {
        console.error("log4js.fileAppender - Writing to file %s, error happened ", e, t)
      })), u.on("drain", (() => {
        process.emit("log4js:pause", !1)
      })), u
    }

    e = e.replace(new RegExp(`^~(?=${Bo.sep}.+)`), ko.homedir()), e = Bo.normalize(e), bo("Creating file appender (", e, ", ", n, ", ", r = r || 0 === r ? r : 5, ", ", u, ", ", o, ")");
    let s = i(e, n, r, u);
    const c = function (e) {
      if (s.writable) {
        if (!0 === u.removeColor) {
          const t = /\x1b[[0-9;]*m/g;
          e.data = e.data.map((e => "string" == typeof e ? e.replace(t, "") : e))
        }
        s.write(t(e, o) + Io, "utf8") || process.emit("log4js:pause", !0)
      }
    };
    return c.reopen = function () {
      s.end((() => {
        s = i(e, n, r, u)
      }))
    }, c.sighupHandler = function () {
      bo("SIGHUP handler called."), c.reopen()
    }, c.shutdown = function (e) {
      No.delete(c), 0 === No.size && xo && (process.removeListener("SIGHUP", Ro), xo = !1), s.end("", "utf-8", e)
    }, No.add(c), xo || (process.on("SIGHUP", Ro), xo = !0), c
  }(e.filename, n, e.maxLogSize, e.backups, e, e.timezoneOffset)
};
var To = {};
const Mo = _o, Lo = t.EOL;

function jo(e, t, n, r, u) {
  r.maxSize = r.maxLogSize;
  const o = function(e, t, n){
    const r = new Mo.DateRollingFileStream(e, t, n);
    return r.on("error", (t => {
      console.error("log4js.dateFileAppender - Writing to file %s, error happened ", e, t)
    })), r.on("drain", (() => {
      process.emit("log4js:pause", !1)
    })), r
  }(e, t, r), i = function (e) {
    o.writable && (o.write(n(e, u) + Lo, "utf8") || process.emit("log4js:pause", !0))
  };
  return i.shutdown = function (e) {
    o.end("", "utf-8", e)
  }, i
}

To.configure = function (e, t) {
  let n = t.basicLayout;
  return e.layout && (n = t.layout(e.layout.type, e.layout)), e.alwaysIncludePattern || (e.alwaysIncludePattern = !1), e.mode = e.mode || 384, jo(e.filename, e.pattern, n, e, e.timezoneOffset)
};
var $o = {};
const Ho = G.exports("log4js:fileSync"), Go = e, Vo = n, Uo = t, Jo = Uo.EOL;

function Wo(e, t) {
  const n = e => {
    try {
      return Vo.mkdirSync(e, { recursive: !0 })
    } catch (t) {
      if ("ENOENT" === t.code) return n(Go.dirname(e)), n(e);
      if ("EEXIST" !== t.code && "EROFS" !== t.code) throw t;
      try {
        if (Vo.statSync(e).isDirectory()) return e;
        throw t
      } catch (e) {
        throw t
      }
    }
  };
  n(Go.dirname(e)), Vo.appendFileSync(e, "", { mode: t.mode, flag: t.flags })
}

class zo {
  constructor(e, t, n, r) {
    if (Ho("In RollingFileStream"), t < 0) throw new Error(`maxLogSize (${t}) should be > 0`);
    this.filename = e, this.size = t, this.backups = n, this.options = r, this.currentSize = 0, this.currentSize = function(e){
      let t = 0;
      try {
        t = Vo.statSync(e).size
      } catch (t) {
        Wo(e, r)
      }
      return t
    }(this.filename)
  }

  shouldRoll() {
    return Ho("should roll with current size %d, and max size %d", this.currentSize, this.size), this.currentSize >= this.size
  }

  roll(e) {
    const t = this, n = new RegExp(`^${Go.basename(e)}`);

    function r(e) {
      return n.test(e)
    }

    function u(t) {
      return parseInt(t.slice(`${Go.basename(e)}.`.length), 10) || 0
    }

    function o(e, t) {
      return u(e) - u(t)
    }

    function i(n) {
      const r = u(n);
      if (Ho(`Index of ${n} is ${r}`), 0 === t.backups) Vo.truncateSync(e, 0); else if (r < t.backups) {
        try {
          Vo.unlinkSync(`${e}.${r + 1}`)
        } catch (e) {
        }
        Ho(`Renaming ${n} -> ${e}.${r + 1}`), Vo.renameSync(Go.join(Go.dirname(e), n), `${e}.${r + 1}`)
      }
    }

    Ho("Rolling, rolling, rolling"), Ho("Renaming the old files"), Vo.readdirSync(Go.dirname(e)).filter(r).sort(o).reverse().forEach(i)
  }

  write(e, t) {
    const n = this;
    Ho("in write"), this.shouldRoll() && (this.currentSize = 0, this.roll(this.filename)), Ho("writing the chunk to the file"), n.currentSize += e.length, Vo.appendFileSync(n.filename, e)
  }
}

$o.configure = function (e, t) {
  let n = t.basicLayout;
  e.layout && (n = t.layout(e.layout.type, e.layout));
  const r = { flags: e.flags || "a", encoding: e.encoding || "utf8", mode: e.mode || 384 };
  return function(e, t, n, r, u, o){
    if ("string" != typeof e || 0 === e.length) throw new Error(`Invalid filename: ${e}`);
    if (e.endsWith(Go.sep)) throw new Error(`Filename is a directory: ${e}`);
    e = e.replace(new RegExp(`^~(?=${Go.sep}.+)`), Uo.homedir()), e = Go.normalize(e), Ho("Creating fileSync appender (", e, ", ", n, ", ", r = r || 0 === r ? r : 5, ", ", u, ", ", o, ")");
    const i = function(e, t, n){
      let r;
      var o;
      return t ? r = new zo(e, t, n, u) : (Wo(o = e, u), r = {
        write(e) {
          Vo.appendFileSync(o, e)
        }
      }), r
    }(e, n, r);
    return e => {
      i.write(t(e, o) + Jo)
    }
  }(e.filename, n, e.maxLogSize, e.backups, r, e.timezoneOffset)
};
var Ko = {};
const qo = G.exports("log4js:tcp"), Yo = d;
Ko.configure = function (e, t) {
  qo(`configure with config = ${e}`);
  let n = function (e) {
    return e.serialise()
  };
  return e.layout && (n = t.layout(e.layout.type, e.layout)), function(e, t){
    let n = !1;
    const r = [];
    let u, o = 3, i = "__LOG4JS__";

    function s(e) {
      qo("Writing log event to socket"), n = u.write(`${t(e)}${i}`, "utf8")
    }

    function c() {
      let e;
      for (qo("emptying buffer"); e = r.shift(); ) s(e)
    }

    function a(e) {
      n ? s(e) : (qo("buffering log event because it cannot write at the moment"), r.push(e))
    }

    return function t(){
      qo(`appender creating socket to ${e.host || "localhost"}:${e.port || 5e3}`), i = `${e.endMsg || "__LOG4JS__"}`, u = Yo.createConnection(e.port || 5e3, e.host || "localhost"), u.on("connect", (() => {
        qo("socket connected"), c(), n = !0
      })), u.on("drain", (() => {
        qo("drain event received, emptying buffer"), n = !0, c()
      })), u.on("timeout", u.end.bind(u)), u.on("error", (e => {
        qo("connection error", e), n = !1, c()
      })), u.on("close", t)
    }(), a.shutdown = function (e) {
      qo("shutdown called"), r.length && o ? (qo("buffer has items, waiting 100ms to empty"), o -= 1, setTimeout((() => {
        a.shutdown(e)
      }), 100)) : (u.removeAllListeners("close"), u.end(e))
    }, a
  }(e, n)
};
const Zo = e, Xo = G.exports("log4js:appenders"), Qo = fe, ei = Dt, ti = xe, ni = Be, ri = pt, ui = new Map;
ui.set("console", yt), ui.set("stdout", Ft), ui.set("stderr", gt), ui.set("logLevelFilter", At), ui.set("categoryFilter", vt), ui.set("noLogFilter", wt), ui.set("file", _t), ui.set("dateFile", To), ui.set("fileSync", $o), ui.set("tcp", Ko);
const oi = new Map, ii = (e, t) => {
  let n;
  try {
    const t = `${e}.cjs`;
    n = require.resolve(t), Xo("Loading module from ", t)
  } catch (t) {
    n = e, Xo("Loading module from ", e)
  }
  try {
    return require(n)
  } catch (n) {
    return void Qo.throwExceptionIf(t, "MODULE_NOT_FOUND" !== n.code, `appender "${e}" could not be loaded (error was: ${n})`)
  }
}, si = new Set, ci = (e, t) => {
  if (oi.has(e)) return oi.get(e);
  if (!t.appenders[e]) return !1;
  if (si.has(e)) throw new Error(`Dependency loop detected for appender ${e}.`);
  si.add(e), Xo(`Creating appender ${e}`);
  const n = ai(e, t);
  return si.delete(e), oi.set(e, n), n
}, ai = (e, t) => {
  const n = t.appenders[e],
    r = n.type.configure ? n.type : ((e, t) => ui.get(e) || ii(`./${e}`, t) || ii(e, t) || require.main && require.main.filename && ii(Zo.join(Zo.dirname(require.main.filename), e), t) || ii(Zo.join(process.cwd(), e), t))(n.type, t);
  return Qo.throwExceptionIf(t, Qo.not(r), `appender "${e}" is not valid (type "${n.type}" could not be found)`), r.appender && (process.emitWarning(`Appender ${n.type} exports an appender function.`, "DeprecationWarning", "log4js-node-DEP0001"), Xo("[log4js-node-DEP0001]", `DEPRECATION: Appender ${n.type} exports an appender function.`)), r.shutdown && (process.emitWarning(`Appender ${n.type} exports a shutdown function.`, "DeprecationWarning", "log4js-node-DEP0002"), Xo("[log4js-node-DEP0002]", `DEPRECATION: Appender ${n.type} exports a shutdown function.`)), Xo(`${e}: clustering.isMaster ? ${ei.isMaster()}`), Xo(`${e}: appenderModule is ${i.inspect(r)}`), ei.onlyOnMaster((() => (Xo(`calling appenderModule.configure for ${e} / ${n.type}`), r.configure(ri.modifyConfig(n), ni, (e => ci(e, t)), ti))), (() => {
  }))
}, li = e => {
  if (oi.clear(), si.clear(), !e) return;
  const t = [];
  Object.values(e.categories).forEach((e => {
    t.push(...e.appenders)
  })), Object.keys(e.appenders).forEach((n => {
    (t.includes(n) || "tcp-server" === e.appenders[n].type || "multiprocess" === e.appenders[n].type) && ci(n, e)
  }))
}, fi = () => {
  li()
};
fi(), Qo.addListener((e => {
  Qo.throwExceptionIf(e, Qo.not(Qo.anObject(e.appenders)), 'must have a property "appenders" of type object.');
  const t = Object.keys(e.appenders);
  Qo.throwExceptionIf(e, Qo.not(t.length), "must define at least one appender."), t.forEach((t => {
    Qo.throwExceptionIf(e, Qo.not(e.appenders[t].type), `appender "${t}" is not valid (must be an object with property "type")`)
  }))
})), Qo.addListener(li), Ne.exports = oi, Ne.exports.init = fi;
var di = { exports: {} };
!function(e){
  const t = G.exports("log4js:categories"), n = fe, r = xe, u = Ne.exports, o = new Map;

  function i(e, t, n) {
    if (!1 === t.inherit) return;
    const r = n.lastIndexOf(".");
    if (r < 0) return;
    const u = n.slice(0, r);
    let o = e.categories[u];
    o || (o = {
      inherit: !0,
      appenders: []
    }), i(e, o, u),!e.categories[u] && o.appenders && o.appenders.length && o.level && (e.categories[u] = o), t.appenders = t.appenders || [], t.level = t.level || o.level, o.appenders.forEach((e => {
      t.appenders.includes(e) || t.appenders.push(e)
    })), t.parent = o
  }

  function s(e) {
    if (!e.categories) return;
    Object.keys(e.categories).forEach((t => {
      const n = e.categories[t];
      i(e, n, t)
    }))
  }

  n.addPreProcessingListener((e => s(e))), n.addListener((e => {
    n.throwExceptionIf(e, n.not(n.anObject(e.categories)), 'must have a property "categories" of type object.');
    const t = Object.keys(e.categories);
    n.throwExceptionIf(e, n.not(t.length), "must define at least one category."), t.forEach((t => {
      const o = e.categories[t];
      n.throwExceptionIf(e, [n.not(o.appenders), n.not(o.level)], `category "${t}" is not valid (must be an object with properties "appenders" and "level")`), n.throwExceptionIf(e, n.not(Array.isArray(o.appenders)), `category "${t}" is not valid (appenders must be an array of appender names)`), n.throwExceptionIf(e, n.not(o.appenders.length), `category "${t}" is not valid (appenders must contain at least one appender name)`), Object.prototype.hasOwnProperty.call(o, "enableCallStack") && n.throwExceptionIf(e, "boolean" != typeof o.enableCallStack, `category "${t}" is not valid (enableCallStack must be boolean type)`), o.appenders.forEach((r => {
        n.throwExceptionIf(e, n.not(u.get(r)), `category "${t}" is not valid (appender "${r}" is not defined)`)
      })), n.throwExceptionIf(e, n.not(r.getLevel(o.level)), `category "${t}" is not valid (level "${o.level}" not recognised; valid levels are ${r.levels.join(", ")})`)
    })), n.throwExceptionIf(e, n.not(e.categories.default), 'must define a "default" category.')
  }));
  const c = e => {
    if (o.clear(), !e) return;
    Object.keys(e.categories).forEach((n => {
      const i = e.categories[n], s = [];
      i.appenders.forEach((e => {
        s.push(u.get(e)), t(`Creating category ${n}`), o.set(n, {
          appenders: s,
          level: r.getLevel(i.level),
          enableCallStack: i.enableCallStack || !1
        })
      }))
    }))
  }, a = () => {
    c()
  };
  a(), n.addListener(c);
  const l = e => {
    if (t(`configForCategory: searching for config for ${e}`), o.has(e)) return t(`configForCategory: ${e} exists in config, returning it`), o.get(e);
    let n;
    return e.indexOf(".") > 0 ? (t(`configForCategory: ${e} has hierarchy, cloning from parents`), n = {
      ...l(e.slice(0, e.lastIndexOf(".")))
    }) : (o.has("default") || c({
      categories: { default: { appenders: ["out"], level: "OFF" } }
    }), t("configForCategory: cloning default category"), n = { ...o.get("default") }), o.set(e, n), n
  };
  e.exports = o, e.exports = Object.assign(e.exports, {
    appendersForCategory: e => l(e).appenders,
    getLevelForCategory: e => l(e).level,
    setLevelForCategory: (e, t) => {
      l(e).level = t
    },
    getEnableCallStackForCategory: e =>!0 === l(e).enableCallStack,
    setEnableCallStackForCategory: (e, t) => {
      l(e).enableCallStack = t
    },
    init: a
  })
}(di);
const Di = G.exports("log4js:logger"), pi = et, hi = xe, Ei = Dt, mi = di.exports, yi = fe,
  Ci = /at (?:(.+)\s+\()?(?:(.+?):(\d+)(?::(\d+))?|([^)]+))\)?/;

function Fi(e, t = 4) {
  try {
    const n = e.stack.split("\n").slice(t);
    if (!n.length) return null;
    const r = Ci.exec(n[0]);
    if (r && 6 === r.length) {
      let e = "", t = "", u = "";
      return r[1] && "" !== r[1] && ([t, u] = r[1].replace(/[[\]]/g, "").split(" as "), u = u || "", t.includes(".") && ([e, t] = t.split("."))), {
        fileName: r[2],
        lineNumber: parseInt(r[3], 10),
        columnNumber: parseInt(r[4], 10),
        callStack: n.join("\n"),
        className: e,
        functionName: t,
        functionAlias: u,
        callerName: r[1] || ""
      }
    }
    console.error("log4js.logger - defaultParseCallStack error")
  } catch (e) {
    console.error("log4js.logger - defaultParseCallStack error", e)
  }
  return null
}

let gi = class {
  constructor(e) {
    if (!e) throw new Error("No category provided.");
    this.category = e, this.context = {
    }, this.callStackSkipIndex = 0, this.parseCallStack = Fi, Di(`Logger created (${this.category}, ${this.level})`)
  }

  get level() {
    return hi.getLevel(mi.getLevelForCategory(this.category), hi.OFF)
  }

  set level(e) {
    mi.setLevelForCategory(this.category, hi.getLevel(e, this.level))
  }

  get useCallStack() {
    return mi.getEnableCallStackForCategory(this.category)
  }

  set useCallStack(e) {
    mi.setEnableCallStackForCategory(this.category,!0 === e)
  }

  get callStackLinesToSkip() {
    return this.callStackSkipIndex
  }

  set callStackLinesToSkip(e) {
    if ("number" != typeof e) throw new TypeError("Must be a number");
    if (e < 0) throw new RangeError("Must be >= 0");
    this.callStackSkipIndex = e
  }

  log(e, ...t) {
    const n = hi.getLevel(e);
    n ? this.isLevelEnabled(n) && this._log(n, t) : yi.validIdentifier(e) && t.length > 0 ? (this.log(hi.WARN, "log4js:logger.log: valid log-level not found as first parameter given:", e), this.log(hi.INFO, `[${e}]`, ...t)) : this.log(hi.INFO, e, ...t)
  }

  isLevelEnabled(e) {
    return this.level.isLessThanOrEqualTo(e)
  }

  _log(e, t) {
    Di(`sending log data (${e}) to appenders`);
    const n = t.find((e => e instanceof Error));
    let r;
    if (this.useCallStack) {
      try {
        n && (r = this.parseCallStack(n, this.callStackSkipIndex + 1))
      } catch (e) {
      }
      r = r || this.parseCallStack(new Error, this.callStackSkipIndex + 3 + 1)
    }
    const u = new pi(this.category, e, t, this.context, r, n);
    Ei.send(u)
  }

  addContext(e, t) {
    this.context[e] = t
  }

  removeContext(e) {
    delete this.context[e]
  }

  clearContext() {
    this.context = {}
  }

  setParseCallStackFunction(e) {
    if ("function" == typeof e) this.parseCallStack = e; else {
      if (void 0 !== e) throw new TypeError("Invalid type passed to setParseCallStackFunction");
      this.parseCallStack = Fi
    }
  }
};

function Ai(e) {
  const t = hi.getLevel(e), n = t.toString().toLowerCase().replace(/_([a-z])/g, (e => e[1].toUpperCase())),
    r = n[0].toUpperCase() + n.slice(1);
  gi.prototype[`is${r}Enabled`] = function () {
    return this.isLevelEnabled(t)
  }, gi.prototype[n] = function (...e) {
    this.log(t, ...e)
  }
}

hi.levels.forEach(Ai), yi.addListener((() => {
  hi.levels.forEach(Ai)
}));
var vi = gi;
const Si = xe;

function wi(e) {
  return e.originalUrl || e.url
}

function Oi(e, t) {
  for (let n = 0; n < t.length; n++) e = e.replace(t[n].token, t[n].replacement);
  return e
}

const _i = G.exports("log4js:recording"), bi = [];

function Bi() {
  return bi.slice()
}

function Pi() {
  bi.length = 0
}

var ki = {
  configure: function () {
    return function (e) {
      _i(`received logEvent, number of events now ${bi.length + 1}`), _i("log event was ", e), bi.push(e)
    }
  },
  replay: Bi,
  playback: Bi,
  reset: Pi,
  erase: Pi
};
const Ii = G.exports("log4js:main"), xi = n, Ni = ne({ proto: !0 }), Ri = fe, Ti = Be, Mi = xe, Li = Ne.exports,
  ji = di.exports, $i = vi, Hi = Dt, Gi = function (e, t) {
    t = "string" == typeof t || "function" == typeof t ? { format: t } : t || {};
    const n = e;
    let r = Si.getLevel(t.level, Si.INFO);
    const u = t.format || ':remote-addr - - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent"';
    return (e, o, i) => {
      if (void 0 !== e._logging) return i();
      if ("function" != typeof t.nolog) {
        const n = function(e){
          let t = null;
          if (e instanceof RegExp && (t = e), "string" == typeof e && (t = new RegExp(e)), Array.isArray(e)) {
            const n = e.map((e => e.source ? e.source : e));
            t = new RegExp(n.join("|"))
          }
          return t
        }(t.nolog);
        if (n && n.test(e.originalUrl)) return i()
      }
      if (n.isLevelEnabled(r) || "auto" === t.level) {
        const i = new Date, { writeHead:s } = o;
        e._logging = !0, o.writeHead = (e, t) => {
          o.writeHead = s, o.writeHead(e, t), o.__statusCode = e, o.__headers = t || {}
        };
        let c = !1;
        const a = () => {
          if (c) return;
          if (c = !0, "function" == typeof t.nolog && !0 === t.nolog(e, o)) return void (e._logging = !1);
          o.responseTime = new Date - i, o.statusCode && "auto" === t.level && (r = Si.INFO, o.statusCode >= 300 && (r = Si.WARN), o.statusCode >= 400 && (r = Si.ERROR)), r = function(e, t, n){
            let r = t;
            if (n) {
              const t = n.find((t => {
                let n = !1;
                return n = t.from && t.to ? e >= t.from && e <= t.to : -1 !== t.codes.indexOf(e), n
              }));
              t && (r = Si.getLevel(t.level, r))
            }
            return r
          }(o.statusCode, r, t.statusRules);
          const s = function(e, t, n){
            const r = [];
            return r.push({ token: ":url", replacement: wi(e) }), r.push({
              token: ":protocol",
              replacement: e.protocol
            }), r.push({ token: ":hostname", replacement: e.hostname }), r.push({
              token: ":method",
              replacement: e.method
            }), r.push({ token: ":status", replacement: t.__statusCode || t.statusCode }), r.push({
              token: ":response-time",
              replacement: t.responseTime
            }), r.push({ token: ":date", replacement: (new Date).toUTCString() }), r.push({
              token: ":referrer",
              replacement: e.headers.referer || e.headers.referrer || ""
            }), r.push({ token: ":http-version", replacement: `${e.httpVersionMajor}.${e.httpVersionMinor}` }), r.push({
              token: ":remote-addr",
              replacement: e.headers["x-forwarded-for"] || e.ip || e._remoteAddress || e.socket && (e.socket.remoteAddress || e.socket.socket && e.socket.socket.remoteAddress)
            }), r.push({ token: ":user-agent", replacement: e.headers["user-agent"] }), r.push({
              token: ":content-length",
              replacement: t.getHeader("content-length") || t.__headers && t.__headers["Content-Length"] || "-"
            }), r.push({ token: /:req\[([^\]]+)]/g, replacement: (t, n) => e.headers[n.toLowerCase()] }), r.push({
              token: /:res\[([^\]]+)]/g,
              replacement: (e, n) => t.getHeader(n.toLowerCase()) || t.__headers && t.__headers[n]
            }), (e => {
              const t = e.concat();
              for (let e = 0; e < t.length; ++e) for (let n = e + 1; n < t.length; ++n) t[e].token == t[n].token && t.splice(n--, 1);
              return t
            })(n.concat(r))
          }(e, o, t.tokens || []);
          if (t.context && n.addContext("res", o), "function" == typeof u) {
            const t = u(e, o, (e => Oi(e, s)));
            t && n.log(r, t)
          } else n.log(r, Oi(u, s));
          t.context && n.removeContext("res")
        };
        o.on("end", a), o.on("finish", a), o.on("error", a), o.on("close", a)
      }
      return i()
    }
  }, Vi = ki;
let Ui = !1;

function Ji(e) {
  if (!Ui) return;
  Ii("Received log event ", e);
  ji.appendersForCategory(e.categoryName).forEach((t => {
    t(e)
  }))
}

function Wi(e) {
  Ui && zi();
  let t = e;
  return "string" == typeof t && (t = function(e){
    Ii(`Loading configuration from ${e}`);
    try {
      return JSON.parse(xi.readFileSync(e, "utf8"))
    } catch (t) {
      throw new Error(`Problem reading config from file "${e}". Error was ${t.message}`, t)
    }
  }(e)), Ii(`Configuration is ${t}`), Ri.configure(Ni(t)), Hi.onMessage(Ji), Ui = !0, Ki
}

function zi(e = (() => {
})) {
  if ("function" != typeof e) throw new TypeError("Invalid callback passed to shutdown");
  Ii("Shutdown called. Disabling all log writing."), Ui = !1;
  const t = Array.from(Li.values());
  Li.init(), ji.init();
  const n = t.reduce(((e, t) => t.shutdown ? e + 1 : e), 0);
  0 === n && (Ii("No appenders with shutdown functions found."), e());
  let r, u = 0;

  function o(t) {
    r = r || t, u += 1, Ii(`Appender shutdowns complete: ${u} / ${n}`), u >= n && (Ii("All shutdown functions completed."), e(r))
  }

  Ii(`Found ${n} appenders with shutdown functions.`), t.filter((e => e.shutdown)).forEach((e => e.shutdown(o)))
}

const Ki = {
  getLogger: function (e) {
    return Ui || Wi(process.env.LOG4JS_CONFIG || {
      appenders: { out: { type: "stdout" } },
      categories: { default: { appenders: ["out"], level: "OFF" } }
    }), new $i(e || "default")
  },
  configure: Wi,
  shutdown: zi,
  connectLogger: Gi,
  levels: Mi,
  addLayout: Ti.addLayout,
  recording: function () {
    return Vi
  }
};
var qi = Ki;
!function(e){
  Object.defineProperty(e, "__esModule", { value: !0 }), e.addCustomPlugin = e.addCustomTask = e.hvigorTrace = void 0;
  const t = qi;
  e.hvigorTrace = {
    totalTime: 0,
    moduleNum: 0,
    taskTime: {},
    isIncremental: !0,
    hasIncremental: !1,
    isParallel: !0,
    IS_DAEMON: !0,
    LOG_LEVEL: t.levels.INFO.levelStr,
    IS_HVIGORFILE_TYPE_CHECK: !1
  }, e.addCustomTask = function (t) {
    let n = e.hvigorTrace.CUSTOM_TASKS ?? [];
    n.length > 0 && (n = n.filter((e => e.NAME !== t.NAME))), n.push(t), e.hvigorTrace.CUSTOM_TASKS = n
  }, e.addCustomPlugin = function (t) {
    let n = e.hvigorTrace.CUSTOM_PLUGINS ?? [];
    n.length > 0 && (n = n.filter((e => e.PLUGIN_ID !== t.PLUGIN_ID))), n.push({
      PLUGIN_ID: t.PLUGIN_ID
    }), e.hvigorTrace.CUSTOM_PLUGINS = n
  }
}(H);
var Yi, Zi = {};
Yi = Zi, Object.defineProperty(Yi, "__esModule", { value: !0 }), Yi.isCI = void 0, Yi.isCI = function () {
  return !("false" === process.env.CI || !(process.env.BUILD_ID || process.env.BUILD_NUMBER || process.env.CI || process.env.CI_APP_ID || process.env.CI_BUILD_ID || process.env.CI_BUILD_NUMBER || process.env.CI_NAME || process.env.CONTINUOUS_INTEGRATION || process.env.RUN_ID || Yi.name))
};
var Xi = {};
!function(e){
  var t = p && p.__importDefault || function (e) {
    return e && e.__esModule ? e : { default: e }
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.hashFile = e.hash = e.createHash = void 0;
  const r = t(D), u = t(n);
  e.createHash = (e = "MD5") => r.default.createHash(e);
  e.hash = (t, n) => (0, e.createHash)(n).update(t).digest("hex");
  e.hashFile = (t, n) => {
    if (u.default.existsSync(t)) return (0, e.hash)(u.default.readFileSync(t, "utf-8"), n)
  }
}(Xi);
var Qi = {}, es = {}, ts = {};
Object.defineProperty(ts, "__esModule", { value: !0 }), ts.Unicode = void 0;

class ns {
}

ts.Unicode = ns, ns.SPACE_SEPARATOR = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/, ns.ID_START = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/, ns.ID_CONTINUE = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/, Object.defineProperty(es, "__esModule", {
  value: !0
}), es.JudgeUtil = void 0;
const rs = ts;
es.JudgeUtil = class {
  static isIgnoreChar(e) {
    return "string" == typeof e && ("\t" === e || "\v" === e || "\f" === e || " " === e || " " === e || "\ufeff" === e || "\n" === e || "\r" === e || "\u2028" === e || "\u2029" === e)
  }

  static isSpaceSeparator(e) {
    return "string" == typeof e && rs.Unicode.SPACE_SEPARATOR.test(e)
  }

  static isIdStartChar(e) {
    return "string" == typeof e && (e >= "a" && e <= "z" || e >= "A" && e <= "Z" || "$" === e || "_" === e || rs.Unicode.ID_START.test(e))
  }

  static isIdContinueChar(e) {
    return "string" == typeof e && (e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e >= "0" && e <= "9" || "$" === e || "_" === e || "‌" === e || "‍" === e || rs.Unicode.ID_CONTINUE.test(e))
  }

  static isDigitWithoutZero(e) {
    return /[1-9]/.test(e)
  }

  static isDigit(e) {
    return "string" == typeof e && /[0-9]/.test(e)
  }

  static isHexDigit(e) {
    return "string" == typeof e && /[0-9A-Fa-f]/.test(e)
  }
};
var us = p && p.__importDefault || function (e) {
  return e && e.__esModule ? e : { default: e }
};
Object.defineProperty(Qi, "__esModule", { value: !0 }), Qi.parseJsonText = Qi.parseJsonFile = void 0;
const os = us(n), is = us(t), ss = us(e), cs = es;
var as;
!function(e){
  e[e.Char=0] = "Char", e[e.EOF=1] = "EOF", e[e.Identifier=2] = "Identifier"
}(as || (as = {}));
let ls, fs, ds, Ds, ps, hs, Es = "start", ms = [], ys = 0, Cs = 1, Fs = 0, gs = !1, As = "default", vs = "'", Ss = 1;

function ws(e, t = !1) {
  fs = String(e), Es = "start", ms = [], ys = 0, Cs = 1, Fs = 0, Ds = void 0, gs = t;
  do {
    ls = Os(), xs[Es]()
  } while ("eof" !== ls.type);
  return Ds
}

function Os() {
  for (As = "default", ps = "", vs = "'", Ss = 1;; ) {
    hs = _s();
    const e = Bs[As]();
    if (e) return e
  }
}

function _s() {
  if (fs[ys]) return String.fromCodePoint(fs.codePointAt(ys))
}

function bs() {
  const e = _s();
  return "\n" === e ? (Cs++, Fs = 0) : e ? Fs += e.length : Fs++, e && (ys += e.length), e
}

Qi.parseJsonFile = function (e, t = !1, n = "utf-8") {
  const r = os.default.readFileSync(ss.default.resolve(e), { encoding: n });
  try {
    return ws(r, t)
  } catch (t) {
    if (t instanceof SyntaxError) {
      const n = t.message.split("at");
      if (2 === n.length) throw new Error(`${n[0].trim()}${is.default.EOL}\t at ${e}:${n[1].trim()}`)
    }
    throw new Error(`${e} is not in valid JSON/JSON5 format.`)
  }
}, Qi.parseJsonText = ws;
const Bs = {
  default() {
    switch (hs) {
      case "/":
        return bs(), void (As = "comment");
      case void 0:
        return bs(), Ps("eof")
    }
    if (!cs.JudgeUtil.isIgnoreChar(hs) && !cs.JudgeUtil.isSpaceSeparator(hs)) return Bs[Es]();
    bs()
  },
  start() {
    As = "value"
  },
  beforePropertyName() {
    switch (hs) {
      case "$":
      case "_":
        return ps = bs(), void (As = "identifierName");
      case "\\":
        return bs(), void (As = "identifierNameStartEscape");
      case "}":
        return Ps("punctuator", bs());
      case '"':
      case "'":
        return vs = hs, bs(), void (As = "string")
    }
    if (cs.JudgeUtil.isIdStartChar(hs)) return ps += bs(), void (As = "identifierName");
    throw Ms(as.Char, bs())
  },
  afterPropertyName() {
    if (":" === hs) return Ps("punctuator", bs());
    throw Ms(as.Char, bs())
  },
  beforePropertyValue() {
    As = "value"
  },
  afterPropertyValue() {
    switch (hs) {
      case ",":
      case "}":
        return Ps("punctuator", bs())
    }
    throw Ms(as.Char, bs())
  },
  beforeArrayValue() {
    if ("]" === hs) return Ps("punctuator", bs());
    As = "value"
  },
  afterArrayValue() {
    switch (hs) {
      case ",":
      case "]":
        return Ps("punctuator", bs())
    }
    throw Ms(as.Char, bs())
  },
  end() {
    throw Ms(as.Char, bs())
  },
  comment() {
    switch (hs) {
      case "*":
        return bs(), void (As = "multiLineComment");
      case "/":
        return bs(), void (As = "singleLineComment")
    }
    throw Ms(as.Char, bs())
  },
  multiLineComment() {
    switch (hs) {
      case "*":
        return bs(), void (As = "multiLineCommentAsterisk");
      case void 0:
        throw Ms(as.Char, bs())
    }
    bs()
  },
  multiLineCommentAsterisk() {
    switch (hs) {
      case "*":
        return void bs();
      case "/":
        return bs(), void (As = "default");
      case void 0:
        throw Ms(as.Char, bs())
    }
    bs(), As = "multiLineComment"
  },
  singleLineComment() {
    switch (hs) {
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
        return bs(), void (As = "default");
      case void 0:
        return bs(), Ps("eof")
    }
    bs()
  },
  value() {
    switch (hs) {
      case "{":
      case "[":
        return Ps("punctuator", bs());
      case "n":
        return bs(), ks("ull"), Ps("null", null);
      case "t":
        return bs(), ks("rue"), Ps("boolean", !0);
      case "f":
        return bs(), ks("alse"), Ps("boolean", !1);
      case "-":
      case "+":
        return "-" === bs() && (Ss = -1), void (As = "numerical");
      case ".":
      case "0":
      case "I":
      case "N":
        return void (As = "numerical");
      case '"':
      case "'":
        return vs = hs, bs(), ps = "", void (As = "string")
    }
    if (void 0 === hs || !cs.JudgeUtil.isDigitWithoutZero(hs)) throw Ms(as.Char, bs());
    As = "numerical"
  },
  numerical() {
    switch (hs) {
      case ".":
        return ps = bs(), void (As = "decimalPointLeading");
      case "0":
        return ps = bs(), void (As = "zero");
      case "I":
        return bs(), ks("nfinity"), Ps("numeric", Ss * (1 / 0));
      case "N":
        return bs(), ks("aN"), Ps("numeric", NaN)
    }
    if (void 0 !== hs && cs.JudgeUtil.isDigitWithoutZero(hs)) return ps = bs(), void (As = "decimalInteger");
    throw Ms(as.Char, bs())
  },
  zero() {
    switch (hs) {
      case ".":
      case "e":
      case "E":
        return void (As = "decimal");
      case "x":
      case "X":
        return ps += bs(), void (As = "hexadecimal")
    }
    return Ps("numeric", 0)
  },
  decimalInteger() {
    switch (hs) {
      case ".":
      case "e":
      case "E":
        return void (As = "decimal")
    }
    if (!cs.JudgeUtil.isDigit(hs)) return Ps("numeric", Ss * Number(ps));
    ps += bs()
  },
  decimal() {
    switch (hs) {
      case ".":
        ps += bs(), As = "decimalFraction";
        break;
      case "e":
      case "E":
        ps += bs(), As = "decimalExponent"
    }
  },
  decimalPointLeading() {
    if (cs.JudgeUtil.isDigit(hs)) return ps += bs(), void (As = "decimalFraction");
    throw Ms(as.Char, bs())
  },
  decimalFraction() {
    switch (hs) {
      case "e":
      case "E":
        return ps += bs(), void (As = "decimalExponent")
    }
    if (!cs.JudgeUtil.isDigit(hs)) return Ps("numeric", Ss * Number(ps));
    ps += bs()
  },
  decimalExponent() {
    switch (hs) {
      case "+":
      case "-":
        return ps += bs(), void (As = "decimalExponentSign")
    }
    if (cs.JudgeUtil.isDigit(hs)) return ps += bs(), void (As = "decimalExponentInteger");
    throw Ms(as.Char, bs())
  },
  decimalExponentSign() {
    if (cs.JudgeUtil.isDigit(hs)) return ps += bs(), void (As = "decimalExponentInteger");
    throw Ms(as.Char, bs())
  },
  decimalExponentInteger() {
    if (!cs.JudgeUtil.isDigit(hs)) return Ps("numeric", Ss * Number(ps));
    ps += bs()
  },
  hexadecimal() {
    if (cs.JudgeUtil.isHexDigit(hs)) return ps += bs(), void (As = "hexadecimalInteger");
    throw Ms(as.Char, bs())
  },
  hexadecimalInteger() {
    if (!cs.JudgeUtil.isHexDigit(hs)) return Ps("numeric", Ss * Number(ps));
    ps += bs()
  },
  identifierNameStartEscape() {
    if ("u" !== hs) throw Ms(as.Char, bs());
    bs();
    const e = Is();
    switch (e) {
      case "$":
      case "_":
        break;
      default:
        if (!cs.JudgeUtil.isIdStartChar(e)) throw Ms(as.Identifier)
    }
    ps += e, As = "identifierName"
  },
  identifierName() {
    switch (hs) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        return void (ps += bs());
      case "\\":
        return bs(), void (As = "identifierNameEscape")
    }
    if (!cs.JudgeUtil.isIdContinueChar(hs)) return Ps("identifier", ps);
    ps += bs()
  },
  identifierNameEscape() {
    if ("u" !== hs) throw Ms(as.Char, bs());
    bs();
    const e = Is();
    switch (e) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        break;
      default:
        if (!cs.JudgeUtil.isIdContinueChar(e)) throw Ms(as.Identifier)
    }
    ps += e, As = "identifierName"
  },
  string() {
    switch (hs) {
      case "\\":
        return bs(), void (ps += function(){
          const e = _s(), t = function(){
            switch (_s()) {
              case "b":
                return bs(), "\b";
              case "f":
                return bs(), "\f";
              case "n":
                return bs(), "\n";
              case "r":
                return bs(), "\r";
              case "t":
                return bs(), "\t";
              case "v":
                return bs(), "\v"
            }
            return
          }();
          if (t) return t;
          switch (e) {
            case "0":
              if (bs(), cs.JudgeUtil.isDigit(_s())) throw Ms(as.Char, bs());
              return "\0";
            case "x":
              return bs(), function(){
                let e = "", t = _s();
                if (!cs.JudgeUtil.isHexDigit(t)) throw Ms(as.Char, bs());
                if (e += bs(), t = _s(), !cs.JudgeUtil.isHexDigit(t)) throw Ms(as.Char, bs());
                return e += bs(), String.fromCodePoint(parseInt(e, 16))
              }();
            case "u":
              return bs(), Is();
            case "\n":
            case "\u2028":
            case "\u2029":
              return bs(), "";
            case "\r":
              return bs(), "\n" === _s() && bs(), ""
          }
          if (void 0 === e || cs.JudgeUtil.isDigitWithoutZero(e)) throw Ms(as.Char, bs());
          return bs()
        }());
      case '"':
      case "'":
        if (hs === vs) {
          const e = Ps("string", ps);
          return bs(), e
        }
        return void (ps += bs());
      case "\n":
      case "\r":
      case void 0:
        throw Ms(as.Char, bs());
      case "\u2028":
      case "\u2029":
        !function(e){
          console.warn(`JSON5: '${Ts(e)}' in strings is not valid ECMAScript; consider escaping.`)
        }(hs)
    }
    ps += bs()
  }
};

function Ps(e, t) {
  return { type: e, value: t, line: Cs, column: Fs }
}

function ks(e) {
  for (const t of e) {
    if (_s() !== t) throw Ms(as.Char, bs());
    bs()
  }
}

function Is() {
  let e = "", t = 4;
  for (; t-- > 0; ) {
    const t = _s();
    if (!cs.JudgeUtil.isHexDigit(t)) throw Ms(as.Char, bs());
    e += bs()
  }
  return String.fromCodePoint(parseInt(e, 16))
}

const xs = {
  start() {
    if ("eof" === ls.type) throw Ms(as.EOF);
    Ns()
  },
  beforePropertyName() {
    switch (ls.type) {
      case "identifier":
      case "string":
        return ds = ls.value, void (Es = "afterPropertyName");
      case "punctuator":
        return void Rs();
      case "eof":
        throw Ms(as.EOF)
    }
  },
  afterPropertyName() {
    if ("eof" === ls.type) throw Ms(as.EOF);
    Es = "beforePropertyValue"
  },
  beforePropertyValue() {
    if ("eof" === ls.type) throw Ms(as.EOF);
    Ns()
  },
  afterPropertyValue() {
    if ("eof" === ls.type) throw Ms(as.EOF);
    switch (ls.value) {
      case ",":
        return void (Es = "beforePropertyName");
      case "}":
        Rs()
    }
  },
  beforeArrayValue() {
    if ("eof" === ls.type) throw Ms(as.EOF);
    "punctuator" !== ls.type || "]" !== ls.value ? Ns() : Rs()
  },
  afterArrayValue() {
    if ("eof" === ls.type) throw Ms(as.EOF);
    switch (ls.value) {
      case ",":
        return void (Es = "beforeArrayValue");
      case "]":
        Rs()
    }
  },
  end() {
  }
};

function Ns() {
  const e = function(){
    let e;
    switch (ls.type) {
      case "punctuator":
        switch (ls.value) {
          case "{":
            e = {};
            break;
          case "[":
            e = []
        }
        break;
      case "null":
      case "boolean":
      case "numeric":
      case "string":
        e = ls.value
    }
    return e
  }();
  if (gs && "object" == typeof e && (e._line = Cs, e._column = Fs), void 0 === Ds) Ds = e; else {
    const t = ms[ms.length-1];
    Array.isArray(t) ? gs && "object" != typeof e ? t.push({
      value: e,
      _line: Cs,
      _column: Fs
    }) : t.push(e) : t[ds] = gs && "object" != typeof e ? { value: e, _line: Cs, _column: Fs } : e
  }
  !function(e){
    if (e && "object" == typeof e) ms.push(e), Es = Array.isArray(e) ? "beforeArrayValue" : "beforePropertyName"; else {
      const e = ms[ms.length-1];
      Es = e ? Array.isArray(e) ? "afterArrayValue" : "afterPropertyValue" : "end"
    }
  }(e)
}

function Rs() {
  ms.pop();
  const e = ms[ms.length-1];
  Es = e ? Array.isArray(e) ? "afterArrayValue" : "afterPropertyValue" : "end"
}

function Ts(e) {
  const t = {
    "'": "\\'",
    '"': '\\"',
    "\\": "\\\\",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\v": "\\v",
    "\0": "\\0",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
  };
  if (t[e]) return t[e];
  if (e < " ") {
    const t = e.charCodeAt(0).toString(16);
    return `\\x${`00${t}`.substring(t.length)}`
  }
  return e
}

function Ms(e, t) {
  let n = "";
  switch (e) {
    case as.Char:
      n = void 0 === t ? `JSON5: invalid end of input at ${Cs}:${Fs}` : `JSON5: invalid character '${Ts(t)}' at ${Cs}:${Fs}`;
      break;
    case as.EOF:
      n = `JSON5: invalid end of input at ${Cs}:${Fs}`;
      break;
    case as.Identifier:
      Fs -= 5, n = `JSON5: invalid identifier character at ${Cs}:${Fs}`
  }
  const r = new Ls(n);
  return r.lineNumber = Cs, r.columnNumber = Fs, r
}

class Ls extends SyntaxError {
}

var js = {}, $s = {}, Hs = {}, Gs = {}, Vs = {
  fromCallback: function (e) {
    return Object.defineProperty((function (...t) {
      if ("function" != typeof t[t.length-1]) return new Promise(((n, r) => {
        t.push(((e, t) => null != e ? r(e) : n(t))), e.apply(this, t)
      }));
      e.apply(this, t)
    }), "name", { value: e.name })
  }, fromPromise: function (e) {
    return Object.defineProperty((function (...t) {
      const n = t[t.length-1];
      if ("function" != typeof n) return e.apply(this, t);
      t.pop(), e.apply(this, t).then((e => n(null, e)), n)
    }), "name", { value: e.name })
  }
};
!function(e){
  const t = Vs.fromCallback, n = Xt,
    r = ["access", "appendFile", "chmod", "chown", "close", "copyFile", "fchmod", "fchown", "fdatasync", "fstat", "fsync", "ftruncate", "futimes", "lchmod", "lchown", "link", "lstat", "mkdir", "mkdtemp", "open", "opendir", "readdir", "readFile", "readlink", "realpath", "rename", "rm", "rmdir", "stat", "symlink", "truncate", "unlink", "utimes", "writeFile"].filter((e => "function" == typeof n[e]));
  Object.assign(e, n), r.forEach((r => {
    e[r] = t(n[r])
  })), e.exists = function (e, t) {
    return "function" == typeof t ? n.exists(e, t) : new Promise((t => n.exists(e, t)))
  }, e.read = function (e, t, r, u, o, i) {
    return "function" == typeof i ? n.read(e, t, r, u, o, i) : new Promise(((i, s) => {
      n.read(e, t, r, u, o, ((e, t, n) => {
        if (e) return s(e);
        i({ bytesRead: t, buffer: n })
      }))
    }))
  }, e.write = function (e, t, ...r) {
    return "function" == typeof r[r.length-1] ? n.write(e, t, ...r) : new Promise(((u, o) => {
      n.write(e, t, ...r, ((e, t, n) => {
        if (e) return o(e);
        u({ bytesWritten: t, buffer: n })
      }))
    }))
  }, e.readv = function (e, t, ...r) {
    return "function" == typeof r[r.length-1] ? n.readv(e, t, ...r) : new Promise(((u, o) => {
      n.readv(e, t, ...r, ((e, t, n) => {
        if (e) return o(e);
        u({ bytesRead: t, buffers: n })
      }))
    }))
  }, e.writev = function (e, t, ...r) {
    return "function" == typeof r[r.length-1] ? n.writev(e, t, ...r) : new Promise(((u, o) => {
      n.writev(e, t, ...r, ((e, t, n) => {
        if (e) return o(e);
        u({ bytesWritten: t, buffers: n })
      }))
    }))
  }, "function" == typeof n.realpath.native ? e.realpath.native = t(n.realpath.native) : process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?", "Warning", "fs-extra-WARN0003")
}(Gs);
var Us = {}, Js = {};
const Ws = e;
Js.checkPath = function (e) {
  if ("win32" === process.platform) {
    if (/[<>:"|?*]/.test(e.replace(Ws.parse(e).root, ""))) {
      const t = new Error(`Path contains invalid characters: ${e}`);
      throw t.code = "EINVAL", t
    }
  }
};
const zs = Gs, { checkPath:Ks } = Js, qs = e => "number" == typeof e ? e : {mode: 511,...e}.mode;
Us.makeDir = async (e, t) => (Ks(e), zs.mkdir(e, {
  mode: qs(t),
  recursive: !0
})), Us.makeDirSync = (e, t) => (Ks(e), zs.mkdirSync(e, { mode: qs(t), recursive: !0 }));
const Ys = Vs.fromPromise, { makeDir:Zs, makeDirSync:Xs } = Us, Qs = Ys(Zs);
var ec = {
  mkdirs: Qs,
  mkdirsSync: Xs,
  mkdirp: Qs,
  mkdirpSync: Xs,
  ensureDir: Qs,
  ensureDirSync: Xs
};
const tc = Vs.fromPromise, nc = Gs;
var rc = {
  pathExists: tc((function (e) {
    return nc.access(e).then((() =>!0)).catch((() =>!1))
  })), pathExistsSync: nc.existsSync
};
const uc = Xt;
var oc = function (e, t, n, r) {
  uc.open(e, "r+", ((e, u) => {
    if (e) return r(e);
    uc.futimes(u, t, n, (e => {
      uc.close(u, (t => {
        r && r(e || t)
      }))
    }))
  }))
}, ic = function (e, t, n) {
  const r = uc.openSync(e, "r+");
  return uc.futimesSync(r, t, n), uc.closeSync(r)
};
const sc = Gs, cc = e, ac = i;

function lc(e, t, n) {
  const r = n.dereference ? e => sc.stat(e, { bigint: !0 }) : e => sc.lstat(e, { bigint: !0 });
  return Promise.all([r(e), r(t).catch((e => {
    if ("ENOENT" === e.code) return null;
    throw e
  }))]).then((([e, t]) => ({ srcStat: e, destStat: t })))
}

function fc(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev
}

function dc(e, t) {
  const n = cc.resolve(e).split(cc.sep).filter((e => e)), r = cc.resolve(t).split(cc.sep).filter((e => e));
  return n.reduce(((e, t, n) => e && r[n] === t), !0)
}

function Dc(e, t, n) {
  return `Cannot ${n} '${e}' to a subdirectory of itself, '${t}'.`
}

var pc = {
  checkPaths: function (e, t, n, r, u) {
    ac.callbackify(lc)(e, t, r, ((r, o) => {
      if (r) return u(r);
      const { srcStat:i, destStat:s } = o;
      if (s) {
        if (fc(i, s)) {
          const r = cc.basename(e), o = cc.basename(t);
          return "move" === n && r !== o && r.toLowerCase() === o.toLowerCase() ? u(null, {
            srcStat: i,
            destStat: s,
            isChangingCase: !0
          }) : u(new Error("Source and destination must not be the same."))
        }
        if (i.isDirectory() && !s.isDirectory()) return u(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
        if (!i.isDirectory() && s.isDirectory()) return u(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`))
      }
      return i.isDirectory() && dc(e, t) ? u(new Error(Dc(e, t, n))) : u(null, { srcStat: i, destStat: s })
    }))
  },
  checkPathsSync: function (e, t, n, r) {
    const { srcStat:u, destStat:o } = function(e, t, n){
      let r;
      const u = n.dereference ? e => sc.statSync(e, { bigint: !0 }) : e => sc.lstatSync(e, { bigint: !0 }), o = u(e);
      try {
        r = u(t)
      } catch (e) {
        if ("ENOENT" === e.code) return { srcStat: o, destStat: null };
        throw e
      }
      return { srcStat: o, destStat: r }
    }(e, t, r);
    if (o) {
      if (fc(u, o)) {
        const r = cc.basename(e), i = cc.basename(t);
        if ("move" === n && r !== i && r.toLowerCase() === i.toLowerCase()) return {
          srcStat: u,
          destStat: o,
          isChangingCase: !0
        };
        throw new Error("Source and destination must not be the same.")
      }
      if (u.isDirectory() && !o.isDirectory()) throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
      if (!u.isDirectory() && o.isDirectory()) throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`)
    }
    if (u.isDirectory() && dc(e, t)) throw new Error(Dc(e, t, n));
    return { srcStat: u, destStat: o }
  },
  checkParentPaths: function e(t, n, r, u, o) {
    const i = cc.resolve(cc.dirname(t)), s = cc.resolve(cc.dirname(r));
    if (s === i || s === cc.parse(s).root) return o();
    sc.stat(s, {
      bigint: !0
    }, ((i, c) => i ? "ENOENT" === i.code ? o() : o(i) : fc(n, c) ? o(new Error(Dc(t, r, u))) : e(t, n, s, u, o)))
  },
  checkParentPathsSync: function e(t, n, r, u) {
    const o = cc.resolve(cc.dirname(t)), i = cc.resolve(cc.dirname(r));
    if (i === o || i === cc.parse(i).root) return;
    let s;
    try {
      s = sc.statSync(i, { bigint: !0 })
    } catch (e) {
      if ("ENOENT" === e.code) return;
      throw e
    }
    if (fc(n, s)) throw new Error(Dc(t, r, u));
    return e(t, n, i, u)
  },
  isSrcSubdir: dc,
  areIdentical: fc
};
const hc = Xt, Ec = e, mc = ec.mkdirs, yc = rc.pathExists, Cc = oc, Fc = pc;

function gc(e, t, n, r) {
  if (!n.filter) return r(null, !0);
  Promise.resolve(n.filter(e, t)).then((e => r(null, e)), (e => r(e)))
}

function Ac(e, t, n, r, u) {
  (r.dereference ? hc.stat : hc.lstat)(t, ((o, i) => o ? u(o) : i.isDirectory() ? function(e, t, n, r, u, o){
    return t ? Oc(n, r, u, o) : function(e, t, n, r, u){
      hc.mkdir(n, (o => {
        if (o) return u(o);
        Oc(t, n, r, (t => t ? u(t) : wc(n, e, u)))
      }))
    }(e.mode, n, r, u, o)
  }(i, e, t, n, r, u) : i.isFile() || i.isCharacterDevice() || i.isBlockDevice() ? function(e, t, n, r, u, o){
    return t ? function(e, t, n, r, u){
      if (!r.overwrite) return r.errorOnExist ? u(new Error(`'${n}' already exists`)) : u();
      hc.unlink(n, (o => o ? u(o) : vc(e, t, n, r, u)))
    }(e, n, r, u, o) : vc(e, n, r, u, o)
  }(i, e, t, n, r, u) : i.isSymbolicLink() ? function(e, t, n, r, u){
    hc.readlink(t, ((t, o) => t ? u(t) : (r.dereference && (o = Ec.resolve(process.cwd(), o)), e ? void hc.readlink(n, ((e, t) => e ? "EINVAL" === e.code || "UNKNOWN" === e.code ? hc.symlink(o, n, u) : u(e) : (r.dereference && (t = Ec.resolve(process.cwd(), t)), Fc.isSrcSubdir(o, t) ? u(new Error(`Cannot copy '${o}' to a subdirectory of itself, '${t}'.`)) : Fc.isSrcSubdir(t, o) ? u(new Error(`Cannot overwrite '${t}' with '${o}'.`)) : function(e, t, n){
      hc.unlink(t, (r => r ? n(r) : hc.symlink(e, t, n)))
    }(o, n, u)))) : hc.symlink(o, n, u))))
  }(e, t, n, r, u) : i.isSocket() ? u(new Error(`Cannot copy a socket file: ${t}`)) : i.isFIFO() ? u(new Error(`Cannot copy a FIFO pipe: ${t}`)) : u(new Error(`Unknown file: ${t}`))))
}

function vc(e, t, n, r, u) {
  hc.copyFile(t, n, (o => o ? u(o) : r.preserveTimestamps ? function(e, t, n, r){
    if (function(e){
      return 0 == (128 & e)
    }(e)) return function(e, t, n){
      return wc(e, 128 | t, n)
    }(n, e, (u => u ? r(u) : Sc(e, t, n, r)));
    return Sc(e, t, n, r)
  }(e.mode, t, n, u) : wc(n, e.mode, u)))
}

function Sc(e, t, n, r) {
  !function(e, t, n){
    hc.stat(e, ((e, r) => e ? n(e) : Cc(t, r.atime, r.mtime, n)))
  }(t, n, (t => t ? r(t) : wc(n, e, r)))
}

function wc(e, t, n) {
  return hc.chmod(e, t, n)
}

function Oc(e, t, n, r) {
  hc.readdir(e, ((u, o) => u ? r(u) : _c(o, e, t, n, r)))
}

function _c(e, t, n, r, u) {
  const o = e.pop();
  return o ? function(e, t, n, r, u, o){
    const i = Ec.join(n, t), s = Ec.join(r, t);
    gc(i, s, u, ((t, c) => t ? o(t) : c ? void Fc.checkPaths(i, s, "copy", u, ((t, c) => {
      if (t) return o(t);
      const { destStat:a } = c;
      Ac(a, i, s, u, (t => t ? o(t) : _c(e, n, r, u, o)))
    })) : _c(e, n, r, u, o)))
  }(e, o, t, n, r, u) : u()
}

var bc = function (e, t, n, r) {
  "function" != typeof n || r ? "function" == typeof n && (n = { filter: n }) : (r = n, n = {}), r = r || function () {
  }, (n = n || {
  }).clobber = !("clobber" in n) || !!n.clobber, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && "ia32" === process.arch && process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n\tsee https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0001"), Fc.checkPaths(e, t, "copy", n, ((u, o) => {
    if (u) return r(u);
    const { srcStat:i, destStat:s } = o;
    Fc.checkParentPaths(e, i, t, "copy", (u => {
      if (u) return r(u);
      gc(e, t, n, ((u, o) => u ? r(u) : o ? void function(e, t, n, r, u){
        const o = Ec.dirname(n);
        yc(o, ((i, s) => i ? u(i) : s ? Ac(e, t, n, r, u) : void mc(o, (o => o ? u(o) : Ac(e, t, n, r, u)))))
      }(s, e, t, n, r) : r()))
    }))
  }))
};
const Bc = Xt, Pc = e, kc = ec.mkdirsSync, Ic = ic, xc = pc;

function Nc(e, t, n, r) {
  const u = (r.dereference ? Bc.statSync : Bc.lstatSync)(t);
  if (u.isDirectory()) return function(e, t, n, r, u){
    return t ? Mc(n, r, u) : function(e, t, n, r){
      return Bc.mkdirSync(n), Mc(t, n, r), Tc(n, e)
    }(e.mode, n, r, u)
  }(u, e, t, n, r);
  if (u.isFile() || u.isCharacterDevice() || u.isBlockDevice()) return function(e, t, n, r, u){
    return t ? function(e, t, n, r){
      if (r.overwrite) return Bc.unlinkSync(n), Rc(e, t, n, r);
      if (r.errorOnExist) throw new Error(`'${n}' already exists`)
    }(e, n, r, u) : Rc(e, n, r, u)
  }(u, e, t, n, r);
  if (u.isSymbolicLink()) return function(e, t, n, r){
    let u = Bc.readlinkSync(t);
    r.dereference && (u = Pc.resolve(process.cwd(), u));
    if (e) {
      let e;
      try {
        e = Bc.readlinkSync(n)
      } catch (e) {
        if ("EINVAL" === e.code || "UNKNOWN" === e.code) return Bc.symlinkSync(u, n);
        throw e
      }
      if (r.dereference && (e = Pc.resolve(process.cwd(), e)), xc.isSrcSubdir(u, e)) throw new Error(`Cannot copy '${u}' to a subdirectory of itself, '${e}'.`);
      if (xc.isSrcSubdir(e, u)) throw new Error(`Cannot overwrite '${e}' with '${u}'.`);
      return function(e, t){
        return Bc.unlinkSync(t), Bc.symlinkSync(e, t)
      }(u, n)
    }
    return Bc.symlinkSync(u, n)
  }(e, t, n, r);
  if (u.isSocket()) throw new Error(`Cannot copy a socket file: ${t}`);
  if (u.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${t}`);
  throw new Error(`Unknown file: ${t}`)
}

function Rc(e, t, n, r) {
  return Bc.copyFileSync(t, n), r.preserveTimestamps && function(e, t, n){
    (function (e) {
      return 0 == (128 & e)
    })(e) && function(e, t){
      Tc(e, 128 | t)
    }(n, e);
    (function (e, t) {
      const n = Bc.statSync(e);
      Ic(t, n.atime, n.mtime)
    })(t, n)
  }(e.mode, t, n), Tc(n, e.mode)
}

function Tc(e, t) {
  return Bc.chmodSync(e, t)
}

function Mc(e, t, n) {
  Bc.readdirSync(e).forEach((r => function(e, t, n, r){
    const u = Pc.join(t, e), o = Pc.join(n, e);
    if (r.filter && !r.filter(u, o)) return;
    const { destStat:i } = xc.checkPathsSync(u, o, "copy", r);
    return Nc(i, u, o, r)
  }(r, e, t, n)))
}

var Lc = function (e, t, n) {
  "function" == typeof n && (n = { filter: n }), (n = n || {
  }).clobber = !("clobber" in n) || !!n.clobber, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && "ia32" === process.arch && process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n\tsee https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0002");
  const { srcStat:r, destStat:u } = xc.checkPathsSync(e, t, "copy", n);
  if (xc.checkParentPathsSync(e, r, t, "copy"), n.filter && !n.filter(e, t)) return;
  const o = Pc.dirname(t);
  return Bc.existsSync(o) || kc(o), Nc(u, e, t, n)
};
var jc = { copy: (0, Vs.fromCallback)(bc), copySync: Lc };
const $c = Xt;
var Hc = {
  remove: (0, Vs.fromCallback)((function (e, t) {
    $c.rm(e, { recursive: !0, force: !0 }, t)
  })), removeSync: function (e) {
    $c.rmSync(e, { recursive: !0, force: !0 })
  }
};
const Gc = Vs.fromPromise, Vc = Gs, Uc = e, Jc = ec, Wc = Hc, zc = Gc((async function (e) {
  let t;
  try {
    t = await Vc.readdir(e)
  } catch {
    return Jc.mkdirs(e)
  }
  return Promise.all(t.map((t => Wc.remove(Uc.join(e, t)))))
}));

function Kc(e) {
  let t;
  try {
    t = Vc.readdirSync(e)
  } catch {
    return Jc.mkdirsSync(e)
  }
  t.forEach((t => {
    t = Uc.join(e, t), Wc.removeSync(t)
  }))
}

var qc = { emptyDirSync: Kc, emptydirSync: Kc, emptyDir: zc, emptydir: zc };
const Yc = Vs.fromCallback, Zc = e, Xc = Xt, Qc = ec;
var ea = {
  createFile: Yc((function (e, t) {

    function n() {
      Xc.writeFile(e, "", (e => {
        if (e) return t(e);
        t()
      }))
    }

    Xc.stat(e, ((r, u) => {
      if (!r && u.isFile()) return t();
      const o = Zc.dirname(e);
      Xc.stat(o, ((e, r) => {
        if (e) return "ENOENT" === e.code ? Qc.mkdirs(o, (e => {
          if (e) return t(e);
          n()
        })) : t(e);
        r.isDirectory() ? n() : Xc.readdir(o, (e => {
          if (e) return t(e)
        }))
      }))
    }))
  })), createFileSync: function (e) {
    let t;
    try {
      t = Xc.statSync(e)
    } catch {
    }
    if (t && t.isFile()) return;
    const n = Zc.dirname(e);
    try {
      Xc.statSync(n).isDirectory() || Xc.readdirSync(n)
    } catch (e) {
      if (!e || "ENOENT" !== e.code) throw e;
      Qc.mkdirsSync(n)
    }
    Xc.writeFileSync(e, "")
  }
};
const ta = Vs.fromCallback, na = e, ra = Xt, ua = ec, oa = rc.pathExists, { areIdentical:ia } = pc;
var sa = {
  createLink: ta((function (e, t, n) {

    function r(e, t) {
      ra.link(e, t, (e => {
        if (e) return n(e);
        n(null)
      }))
    }

    ra.lstat(t, ((u, o) => {
      ra.lstat(e, ((u, i) => {
        if (u) return u.message = u.message.replace("lstat", "ensureLink"), n(u);
        if (o && ia(i, o)) return n(null);
        const s = na.dirname(t);
        oa(s, ((u, o) => u ? n(u) : o ? r(e, t) : void ua.mkdirs(s, (u => {
          if (u) return n(u);
          r(e, t)
        }))))
      }))
    }))
  })), createLinkSync: function (e, t) {
    let n;
    try {
      n = ra.lstatSync(t)
    } catch {
    }
    try {
      const t = ra.lstatSync(e);
      if (n && ia(t, n)) return
    } catch (e) {
      throw e.message = e.message.replace("lstat", "ensureLink"), e
    }
    const r = na.dirname(t);
    return ra.existsSync(r) || ua.mkdirsSync(r), ra.linkSync(e, t)
  }
};
const ca = e, aa = Xt, la = rc.pathExists;
var fa = {
  symlinkPaths: function (e, t, n) {
    if (ca.isAbsolute(e)) return aa.lstat(e, (t => t ? (t.message = t.message.replace("lstat", "ensureSymlink"), n(t)) : n(null, {
      toCwd: e,
      toDst: e
    })));
    {
      const r = ca.dirname(t), u = ca.join(r, e);
      return la(u, ((t, o) => t ? n(t) : o ? n(null, {
        toCwd: u,
        toDst: e
      }) : aa.lstat(e, (t => t ? (t.message = t.message.replace("lstat", "ensureSymlink"), n(t)) : n(null, {
        toCwd: e,
        toDst: ca.relative(r, e)
      })))))
    }
  }, symlinkPathsSync: function (e, t) {
    let n;
    if (ca.isAbsolute(e)) {
      if (n = aa.existsSync(e), !n) throw new Error("absolute srcpath does not exist");
      return { toCwd: e, toDst: e }
    }
    {
      const r = ca.dirname(t), u = ca.join(r, e);
      if (n = aa.existsSync(u), n) return { toCwd: u, toDst: e };
      if (n = aa.existsSync(e), !n) throw new Error("relative srcpath does not exist");
      return { toCwd: e, toDst: ca.relative(r, e) }
    }
  }
};
const da = Xt;
var Da = {
  symlinkType: function (e, t, n) {
    if (n = "function" == typeof t ? t : n, t = "function" != typeof t && t) return n(null, t);
    da.lstat(e, ((e, r) => {
      if (e) return n(null, "file");
      t = r && r.isDirectory() ? "dir" : "file", n(null, t)
    }))
  }, symlinkTypeSync: function (e, t) {
    let n;
    if (t) return t;
    try {
      n = da.lstatSync(e)
    } catch {
      return "file"
    }
    return n && n.isDirectory() ? "dir" : "file"
  }
};
const pa = Vs.fromCallback, ha = e, Ea = Gs, ma = ec.mkdirs, ya = ec.mkdirsSync, Ca = fa.symlinkPaths,
  Fa = fa.symlinkPathsSync, ga = Da.symlinkType, Aa = Da.symlinkTypeSync, va = rc.pathExists, { areIdentical:Sa } = pc;

function wa(e, t, n, r) {
  Ca(e, t, ((u, o) => {
    if (u) return r(u);
    e = o.toDst, ga(o.toCwd, n, ((n, u) => {
      if (n) return r(n);
      const o = ha.dirname(t);
      va(o, ((n, i) => n ? r(n) : i ? Ea.symlink(e, t, u, r) : void ma(o, (n => {
        if (n) return r(n);
        Ea.symlink(e, t, u, r)
      }))))
    }))
  }))
}

var Oa = {
  createSymlink: pa((function (e, t, n, r) {
    r = "function" == typeof n ? n : r, n = "function" != typeof n && n, Ea.lstat(t, ((u, o) => {
      !u && o.isSymbolicLink() ? Promise.all([Ea.stat(e), Ea.stat(t)]).then((([u, o]) => {
        if (Sa(u, o)) return r(null);
        wa(e, t, n, r)
      })) : wa(e, t, n, r)
    }))
  })), createSymlinkSync: function (e, t, n) {
    let r;
    try {
      r = Ea.lstatSync(t)
    } catch {
    }
    if (r && r.isSymbolicLink()) {
      const n = Ea.statSync(e), r = Ea.statSync(t);
      if (Sa(n, r)) return
    }
    const u = Fa(e, t);
    e = u.toDst, n = Aa(u.toCwd, n);
    const o = ha.dirname(t);
    return Ea.existsSync(o) || ya(o), Ea.symlinkSync(e, t, n)
  }
};
const { createFile:_a, createFileSync:ba } = ea, { createLink:Ba, createLinkSync:Pa } = sa,
  { createSymlink:ka, createSymlinkSync:Ia } = Oa;
var xa = {
  createFile: _a,
  createFileSync: ba,
  ensureFile: _a,
  ensureFileSync: ba,
  createLink: Ba,
  createLinkSync: Pa,
  ensureLink: Ba,
  ensureLinkSync: Pa,
  createSymlink: ka,
  createSymlinkSync: Ia,
  ensureSymlink: ka,
  ensureSymlinkSync: Ia
};
var Na = {
  stringify: function (e, { EOL:t = "\n", finalEOL:n = !0, replacer:r = null, spaces:u }={}) {
    const o = n ? t : "";
    return JSON.stringify(e, r, u).replace(/\n/g, t) + o
  }, stripBom: function (e) {
    return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "")
  }
};
let Ra;
try {
  Ra = Xt
} catch (e) {
  Ra = n
}
const Ta = Vs, { stringify:Ma, stripBom:La } = Na;
const ja = Ta.fromPromise((async function (e, t = {}) {
  "string" == typeof t && (t = { encoding: t });
  const n = t.fs || Ra, r = !("throws" in t) || t.throws;
  let u, o = await Ta.fromCallback(n.readFile)(e, t);
  o = La(o);
  try {
    u = JSON.parse(o, t ? t.reviver : null)
  } catch (t) {
    if (r) throw t.message = `${e}: ${t.message}`, t;
    return null
  }
  return u
}));
const $a = Ta.fromPromise((async function (e, t, n = {}) {
  const r = n.fs || Ra, u = Ma(t, n);
  await Ta.fromCallback(r.writeFile)(e, u, n)
}));
const Ha = {
  readFile: ja, readFileSync: function (e, t = {}) {
    "string" == typeof t && (t = { encoding: t });
    const n = t.fs || Ra, r = !("throws" in t) || t.throws;
    try {
      let r = n.readFileSync(e, t);
      return r = La(r), JSON.parse(r, t.reviver)
    } catch (t) {
      if (r) throw t.message = `${e}: ${t.message}`, t;
      return null
    }
  }, writeFile: $a, writeFileSync: function (e, t, n = {}) {
    const r = n.fs || Ra, u = Ma(t, n);
    return r.writeFileSync(e, u, n)
  }
};
var Ga = {
  readJson: Ha.readFile,
  readJsonSync: Ha.readFileSync,
  writeJson: Ha.writeFile,
  writeJsonSync: Ha.writeFileSync
};
const Va = Vs.fromCallback, Ua = Xt, Ja = e, Wa = ec, za = rc.pathExists;
var Ka = {
  outputFile: Va((function (e, t, n, r) {
    "function" == typeof n && (r = n, n = "utf8");
    const u = Ja.dirname(e);
    za(u, ((o, i) => o ? r(o) : i ? Ua.writeFile(e, t, n, r) : void Wa.mkdirs(u, (u => {
      if (u) return r(u);
      Ua.writeFile(e, t, n, r)
    }))))
  })), outputFileSync: function (e, ...t) {
    const n = Ja.dirname(e);
    if (Ua.existsSync(n)) return Ua.writeFileSync(e, ...t);
    Wa.mkdirsSync(n), Ua.writeFileSync(e, ...t)
  }
};
const { stringify:qa } = Na, { outputFile:Ya } = Ka;
var Za = async function (e, t, n = {}) {
  const r = qa(t, n);
  await Ya(e, r, n)
};
const { stringify:Xa } = Na, { outputFileSync:Qa } = Ka;
var el = function (e, t, n) {
  const r = Xa(t, n);
  Qa(e, r, n)
};
const tl = Vs.fromPromise, nl = Ga;
nl.outputJson = tl(Za), nl.outputJsonSync = el, nl.outputJSON = nl.outputJson, nl.outputJSONSync = nl.outputJsonSync, nl.writeJSON = nl.writeJson, nl.writeJSONSync = nl.writeJsonSync, nl.readJSON = nl.readJson, nl.readJSONSync = nl.readJsonSync;
var rl = nl;
const ul = Xt, ol = e, il = jc.copy, sl = Hc.remove, cl = ec.mkdirp, al = rc.pathExists, ll = pc;

function fl(e, t, n, r, u) {
  return r ? dl(e, t, n, u) : n ? sl(t, (r => r ? u(r) : dl(e, t, n, u))) : void al(t, ((r, o) => r ? u(r) : o ? u(new Error("dest already exists.")) : dl(e, t, n, u)))
}

function dl(e, t, n, r) {
  ul.rename(e, t, (u => u ? "EXDEV" !== u.code ? r(u) : function(e, t, n, r){
    const u = { overwrite: n, errorOnExist: !0 };
    il(e, t, u, (t => t ? r(t) : sl(e, r)))
  }(e, t, n, r) : r()))
}

var Dl = function (e, t, n, r) {
  "function" == typeof n && (r = n, n = {});
  const u = (n = n || {}).overwrite || n.clobber || !1;
  ll.checkPaths(e, t, "move", n, ((n, o) => {
    if (n) return r(n);
    const { srcStat:i, isChangingCase:s = !1 } = o;
    ll.checkParentPaths(e, i, t, "move", (n => n ? r(n) : function(e){
      const t = ol.dirname(e);
      return ol.parse(t).root === t
    }(t) ? fl(e, t, u, s, r) : void cl(ol.dirname(t), (n => n ? r(n) : fl(e, t, u, s, r)))))
  }))
};
const pl = Xt, hl = e, El = jc.copySync, ml = Hc.removeSync, yl = ec.mkdirpSync, Cl = pc;

function Fl(e, t, n) {
  try {
    pl.renameSync(e, t)
  } catch (r) {
    if ("EXDEV" !== r.code) throw r;
    return function(e, t, n){
      const r = { overwrite: n, errorOnExist: !0 };
      return El(e, t, r), ml(e)
    }(e, t, n)
  }
}

var gl = function (e, t, n) {
  const r = (n = n || {}).overwrite || n.clobber || !1,
    { srcStat:u, isChangingCase:o = !1 } = Cl.checkPathsSync(e, t, "move", n);
  return Cl.checkParentPathsSync(e, u, t, "move"), function(e){
    const t = hl.dirname(e);
    return hl.parse(t).root === t
  }(t) || yl(hl.dirname(t)), function(e, t, n, r){
    if (r) return Fl(e, t, n);
    if (n) return ml(t), Fl(e, t, n);
    if (pl.existsSync(t)) throw new Error("dest already exists.");
    return Fl(e, t, n)
  }(e, t, r, o)
};
var Al = { move: (0, Vs.fromCallback)(Dl), moveSync: gl }, vl = {
  ...Gs,
  ...jc,
  ...qc,
  ...xa,
  ...rl,
  ...ec,
  ...Al,
  ...Ka,
  ...rc,
  ...Hc
}, Sl = p && p.__importDefault || function (e) {
  return e && e.__esModule ? e : { default: e }
};
Object.defineProperty(Hs, "__esModule", { value: !0 }), Hs.getHvigorUserHomeCacheDir = void 0;
const wl = Sl(vl), Ol = Sl(t), _l = Sl(e), bl = h;
Hs.getHvigorUserHomeCacheDir = function () {
  const e = _l.default.resolve(Ol.default.homedir(), bl.HVIGOR_USER_HOME_DIR_NAME), t = process.env.HVIGOR_USER_HOME;
  return void 0 !== t && _l.default.isAbsolute(t) ? (wl.default.ensureDirSync(t), t) : e
}, function(t){
  var n = p && p.__importDefault || function (e) {
    return e && e.__esModule ? e : { default: e }
  };
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.HVIGOR_PROJECT_WRAPPER_HOME = t.HVIGOR_PROJECT_ROOT_DIR = t.HVIGOR_PROJECT_CACHES_HOME = t.HVIGOR_PNPM_STORE_PATH = t.HVIGOR_WRAPPER_PNPM_SCRIPT_PATH = t.HVIGOR_WRAPPER_TOOLS_HOME = t.HVIGOR_USER_HOME = void 0;
  const r = n(e), u = Hs, o = h;
  t.HVIGOR_USER_HOME = (0, u.getHvigorUserHomeCacheDir)(), t.HVIGOR_WRAPPER_TOOLS_HOME = r.default.resolve(t.HVIGOR_USER_HOME, "wrapper", "tools"), t.HVIGOR_WRAPPER_PNPM_SCRIPT_PATH = r.default.resolve(t.HVIGOR_WRAPPER_TOOLS_HOME, "node_modules", ".bin", o.PNPM_TOOL), t.HVIGOR_PNPM_STORE_PATH = r.default.resolve(t.HVIGOR_USER_HOME, "caches"), t.HVIGOR_PROJECT_CACHES_HOME = r.default.resolve(t.HVIGOR_USER_HOME, o.PROJECT_CACHES), t.HVIGOR_PROJECT_ROOT_DIR = process.cwd(), t.HVIGOR_PROJECT_WRAPPER_HOME = r.default.resolve(t.HVIGOR_PROJECT_ROOT_DIR, o.HVIGOR)
}($s);
var Bl = {}, Pl = p && p.__createBinding || (Object.create ? function (e, t, n, r) {
  void 0 === r && (r = n);
  var u = Object.getOwnPropertyDescriptor(t, n);
  u && !("get" in u ? !t.__esModule : u.writable || u.configurable) || (u = {
    enumerable: !0, get: function () {
      return t[n]
    }
  }), Object.defineProperty(e, r, u)
} : function (e, t, n, r) {
  void 0 === r && (r = n), e[r] = t[n]
}), kl = p && p.__setModuleDefault || (Object.create ? function (e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t })
} : function (e, t) {
  e.default = t
}), Il = p && p.__importStar || function (e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (null != e) for (var n in e) "default" !== n && Object.prototype.hasOwnProperty.call(e, n) && Pl(t, e, n);
  return kl(t, e), t
}, xl = p && p.__importDefault || function (e) {
  return e && e.__esModule ? e : { default: e }
};
Object.defineProperty(Bl, "__esModule", {
  value: !0
}), Bl.isFileExists = Bl.offlinePluginConversion = Bl.executeCommand = Bl.getNpmPath = Bl.hasNpmPackInPaths = void 0;
const Nl = r, Rl = xl(n), Tl = Il(e), Ml = h, Ll = O;
Bl.hasNpmPackInPaths = function (e, t) {
  try {
    return require.resolve(e, { paths: [...t] }), !0
  } catch (e) {
    return !1
  }
}, Bl.getNpmPath = function () {
  const e = process.execPath;
  return Tl.join(Tl.dirname(e), Ml.NPM_TOOL)
}, Bl.executeCommand = function (e, t, n) {
  0 !== (0, Nl.spawnSync)(e, t, n).status && (0, Ll.logErrorAndExit)(`Error: ${e} ${t} execute failed.See above for details.`)
}, Bl.offlinePluginConversion = function (e, t) {
  return t.startsWith("file:") || t.endsWith(".tgz") ? Tl.resolve(e, Ml.HVIGOR, t.replace("file:", "")) : t
}, Bl.isFileExists = function (e) {
  return Rl.default.existsSync(e) && Rl.default.statSync(e).isFile()
}, function(u){
  var o = p && p.__createBinding || (Object.create ? function (e, t, n, r) {
    void 0 === r && (r = n);
    var u = Object.getOwnPropertyDescriptor(t, n);
    u && !("get" in u ? !t.__esModule : u.writable || u.configurable) || (u = {
      enumerable: !0, get: function () {
        return t[n]
      }
    }), Object.defineProperty(e, r, u)
  } : function (e, t, n, r) {
    void 0 === r && (r = n), e[r] = t[n]
  }), i = p && p.__setModuleDefault || (Object.create ? function (e, t) {
    Object.defineProperty(e, "default", { enumerable: !0, value: t })
  } : function (e, t) {
    e.default = t
  }), s = p && p.__importStar || function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) "default" !== n && Object.prototype.hasOwnProperty.call(e, n) && o(t, e, n);
    return i(t, e), t
  }, c = p && p.__importDefault || function (e) {
    return e && e.__esModule ? e : { default: e }
  };
  Object.defineProperty(u, "__esModule", {
    value: !0
  }), u.executeInstallPnpm = u.isPnpmInstalled = u.environmentHandler = u.checkNpmConifg = u.PNPM_VERSION = void 0;
  const a = r, l = s(n), f = c(t), d = s(e), D = h, E = $s, m = $s, y = O, C = Bl;
  u.PNPM_VERSION = "7.30.0", u.checkNpmConifg = function () {
    const e = d.resolve(E.HVIGOR_PROJECT_ROOT_DIR, ".npmrc"), t = d.resolve(f.default.homedir(), ".npmrc");
    if ((0, C.isFileExists)(e) || (0, C.isFileExists)(t)) return;
    const n = (0, C.getNpmPath)(),
      r = (0, a.spawnSync)(n, ["config", "get", "prefix"], { cwd: E.HVIGOR_PROJECT_ROOT_DIR });
    if (0 !== r.status || !r.stdout) return void (0, y.logErrorAndExit)("Error: The hvigor depends on the npmrc file. Configure the npmrc file first.");
    const u = d.resolve(`${r.stdout}`.replace(/[\r\n]/gi, ""), ".npmrc");
    (0, C.isFileExists)(u) || (0, y.logErrorAndExit)("Error: The hvigor depends on the npmrc file. Configure the npmrc file first.")
  }, u.environmentHandler = function () {
    process.env["npm_config_update-notifier"] = "false"
  }, u.isPnpmInstalled = function () {
    return!!l.existsSync(m.HVIGOR_WRAPPER_PNPM_SCRIPT_PATH) && (0, C.hasNpmPackInPaths)("pnpm", [m.HVIGOR_WRAPPER_TOOLS_HOME])
  }, u.executeInstallPnpm = function () {
    (0, y.logInfo)(`Installing pnpm@${u.PNPM_VERSION}...`);
    const e = (0, C.getNpmPath)();
    !function(){
      const e = d.resolve(m.HVIGOR_WRAPPER_TOOLS_HOME, D.DEFAULT_PACKAGE_JSON);
      try {
        l.existsSync(m.HVIGOR_WRAPPER_TOOLS_HOME) || l.mkdirSync(m.HVIGOR_WRAPPER_TOOLS_HOME, { recursive: !0 });
        const t = { dependencies: {} };
        t.dependencies[D.PNPM] = u.PNPM_VERSION, l.writeFileSync(e, JSON.stringify(t))
      } catch (t) {
        (0, y.logErrorAndExit)(`Error: EPERM: operation not permitted,create ${e} failed.`)
      }
    }(), (0, C.executeCommand)(e, ["install", "pnpm"], {
      cwd: m.HVIGOR_WRAPPER_TOOLS_HOME,
      stdio: ["inherit", "inherit", "inherit"],
      env: process.env
    }), (0, y.logInfo)("Pnpm install success.")
  }
}(js);
var jl = {}, $l = {}, Hl = p && p.__importDefault || function (e) {
  return e && e.__esModule ? e : { default: e }
};
Object.defineProperty($l, "__esModule", { value: !0 }), $l.getHvigorUserHomeCacheDir = void 0;
const Gl = Hl(vl), Vl = Hl(t), Ul = Hl(e), Jl = h, Wl = O;
let zl = !1;
$l.getHvigorUserHomeCacheDir = function () {
  const e = Ul.default.resolve(Vl.default.homedir(), Jl.HVIGOR_USER_HOME_DIR_NAME), t = process.env.HVIGOR_USER_HOME;
  return void 0 === t ? e : Ul.default.isAbsolute(t) ? Gl.default.existsSync(t) && Gl.default.statSync(t).isFile() ? ((0, Wl.logInfo)(`File already exists: ${t}`), e) : (Gl.default.ensureDirSync(t), t) : (zl || ((0, Wl.logInfo)(`Invalid custom userhome hvigor data dir:${t}`), zl = !0), e)
}, function(t){
  var n = p && p.__importDefault || function (e) {
    return e && e.__esModule ? e : { default: e }
  };
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.HVIGOR_PROJECT_WRAPPER_HOME = t.HVIGOR_PROJECT_ROOT_DIR = t.HVIGOR_PNPM_STORE_PATH = t.HVIGOR_WRAPPER_PNPM_SCRIPT_PATH = t.HVIGOR_WRAPPER_TOOLS_HOME = t.HVIGOR_USER_HOME = void 0;
  const r = n(e), u = h, o = $l;
  t.HVIGOR_USER_HOME = (0, o.getHvigorUserHomeCacheDir)(), t.HVIGOR_WRAPPER_TOOLS_HOME = r.default.resolve(t.HVIGOR_USER_HOME, "wrapper", "tools"), t.HVIGOR_WRAPPER_PNPM_SCRIPT_PATH = r.default.resolve(t.HVIGOR_WRAPPER_TOOLS_HOME, "node_modules", ".bin", u.PNPM_TOOL), t.HVIGOR_PNPM_STORE_PATH = r.default.resolve(t.HVIGOR_USER_HOME, "caches"), t.HVIGOR_PROJECT_ROOT_DIR = process.cwd(), t.HVIGOR_PROJECT_WRAPPER_HOME = r.default.resolve(t.HVIGOR_PROJECT_ROOT_DIR, u.HVIGOR)
}(jl);
var Kl = p && p.__createBinding || (Object.create ? function (e, t, n, r) {
  void 0 === r && (r = n);
  var u = Object.getOwnPropertyDescriptor(t, n);
  u && !("get" in u ? !t.__esModule : u.writable || u.configurable) || (u = {
    enumerable: !0, get: function () {
      return t[n]
    }
  }), Object.defineProperty(e, r, u)
} : function (e, t, n, r) {
  void 0 === r && (r = n), e[r] = t[n]
}), ql = p && p.__setModuleDefault || (Object.create ? function (e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t })
} : function (e, t) {
  e.default = t
}), Yl = p && p.__importStar || function (e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (null != e) for (var n in e) "default" !== n && Object.prototype.hasOwnProperty.call(e, n) && Kl(t, e, n);
  return ql(t, e), t
}, Zl = p && p.__importDefault || function (e) {
  return e && e.__esModule ? e : { default: e }
};
Object.defineProperty($, "__esModule", { value: !0 });
var Xl = $.initProjectWorkSpace = void 0;
const Ql = Yl(n), ef = Yl(e), tf = Zl(u), nf = H, rf = h, uf = Zi, of = Xi, sf = Qi, cf = O, af = js, lf = Bl, ff = jl;
let df, Df, pf;

function hf(e, t, n) {
  return void 0 !== n.dependencies && (0, lf.offlinePluginConversion)(ff.HVIGOR_PROJECT_ROOT_DIR, t.dependencies[e]) === ef.normalize(n.dependencies[e])
}

Xl = $.initProjectWorkSpace = function () {
  if (df = function(){
    const e = ef.resolve(ff.HVIGOR_PROJECT_WRAPPER_HOME, rf.DEFAULT_HVIGOR_CONFIG_JSON_FILE_NAME);
    Ql.existsSync(e) || (0, cf.logErrorAndExit)(`Error: Hvigor config file ${e} does not exist.`);
    return (0, sf.parseJsonFile)(e)
  }(), pf = function(e){
    let t;
    t = function(e){
      const t = e.hvigorVersion;
      if (t.startsWith("file:") || t.endsWith(".tgz")) return !1;
      const n = function(){
        const e = tf.default.argv.slice(2), t = /^(--config|-c).*/, n = /^(--config|-c)$/, r = {};
        for (const [u, o] of e.entries()) if (n.test(o)) {
          const t = e[u+1].split("=");
          2 === t.length && (r[t[0]] = t[t.length-1])
        } else if (t.test(o)) {
          const e = o.match(t);
          if (e && e[0].length < o.length) {
            const t = o.substring(e[0].length).split("=");
            2 === t.length && (r[t[0]] = t[t.length-1])
          }
        }
        return r
      }();
      if ((0, uf.isCI)() || "false" === n.hvigorWorkSingleton) return !1;
      const r = e.dependencies, u = Object.getOwnPropertyNames(r);
      for (const e of u) {
        const t = r[e];
        if (t.startsWith("file:") || t.endsWith(".tgz")) return !1
      }
      if (1 === u.length && "@ohos/hvigor-ohos-plugin" === u[0]) return t > "2.5.0";
      return !1
    }(e) ? function(e){
      let t = `${rf.HVIGOR_ENGINE_PACKAGE_NAME}@${e.hvigorVersion}`;
      const n = e.dependencies;
      if (n) {
        Object.getOwnPropertyNames(n).sort().forEach((e => {
          t += `,${e}@${n[e]}`
        }))
      }
      return (0, of.hash)(t)
    }(e) : (0, of.hash)(tf.default.cwd());
    return ef.resolve(ff.HVIGOR_USER_HOME, "project_caches", t)
  }(df), Df = function(){
    const e = ef.resolve(pf, rf.WORK_SPACE, rf.DEFAULT_PACKAGE_JSON);
    return Ql.existsSync(e) ? (0, sf.parseJsonFile)(e) : { dependencies: {} }
  }(), function(){
    const e = ef.resolve(ff.HVIGOR_USER_HOME, rf.DEFAULT_HVIGOR_CONFIG_JSON_FILE_NAME);
    if (Ql.existsSync(e)) (0, sf.parseJsonFile)(e)
  }(),!(0, lf.hasNpmPackInPaths)(rf.HVIGOR_ENGINE_PACKAGE_NAME, [ef.join(pf, rf.WORK_SPACE)]) || (0, lf.offlinePluginConversion)(ff.HVIGOR_PROJECT_ROOT_DIR, df.hvigorVersion) !== Df.dependencies[rf.HVIGOR_ENGINE_PACKAGE_NAME] || !function(){

    function e(e) {
      const t = null == e ? void 0 : e.dependencies;
      return void 0 === t ? 0 : Object.getOwnPropertyNames(t).length
    }

    const t = e(df), n = e(Df);
    if (t + 1 !== n) return !1;
    for (const e in null == df ? void 0 : df.dependencies) if (!(0, lf.hasNpmPackInPaths)(e, [ef.join(pf, rf.WORK_SPACE)]) || !hf(e, df, Df)) return !1;
    return !0
  }()) try {
    const e = tf.default.hrtime();
    (0, af.checkNpmConifg)(), function(){
      (0, cf.logInfo)("Hvigor installing...");
      for (const e in df.dependencies) df.dependencies[e] && (df.dependencies[e] = (0, lf.offlinePluginConversion)(ff.HVIGOR_PROJECT_ROOT_DIR, df.dependencies[e]));
      const e = { dependencies: { ...df.dependencies } };
      e.dependencies[rf.HVIGOR_ENGINE_PACKAGE_NAME] = (0, lf.offlinePluginConversion)(ff.HVIGOR_PROJECT_ROOT_DIR, df.hvigorVersion);
      const t = ef.join(pf, rf.WORK_SPACE);
      try {
        Ql.mkdirSync(t, { recursive: !0 });
        const n = ef.resolve(t, rf.DEFAULT_PACKAGE_JSON);
        Ql.writeFileSync(n, JSON.stringify(e))
      } catch (e) {
        (0, cf.logErrorAndExit)(e)
      }
      (function () {
        const e = ["config", "set", "store-dir", ff.HVIGOR_PNPM_STORE_PATH],
          t = { cwd: ef.join(pf, rf.WORK_SPACE), stdio: ["inherit", "inherit", "inherit"] };
        (0, lf.executeCommand)(ff.HVIGOR_WRAPPER_PNPM_SCRIPT_PATH, e, t)
      })(), function(){
        const e = ["install"];
        (0, uf.isCI)() && e.push("--no-frozen-lockfile");
        const t = { cwd: ef.join(pf, rf.WORK_SPACE), stdio: ["inherit", "inherit", "inherit"] };
        (0, lf.executeCommand)(ff.HVIGOR_WRAPPER_PNPM_SCRIPT_PATH, e, t)
      }(), (0, cf.logInfo)("Hvigor install success.")
    }();
    const t = tf.default.hrtime(e);
    nf.hvigorTrace.HVIGOR_INSTALL_TIME = 1e9 * t[0] + t[1]
  } catch (e) {
    !function(){
      const e = ef.join(pf, rf.WORK_SPACE);
      if ((0, cf.logInfo)("Hvigor cleaning..."), !Ql.existsSync(e)) return;
      const t = Ql.readdirSync(e);
      if (!t || 0 === t.length) return;
      const n = ef.resolve(pf, "node_modules", "@ohos", "hvigor", "bin", "hvigor.js");
      Ql.existsSync(n) && (0, lf.executeCommand)(tf.default.argv[0], [n, "--stop-daemon"], {});
      try {
        t.forEach((t => {
          Ql.rmSync(ef.resolve(e, t), { recursive: !0 })
        }))
      } catch (t) {
        (0, cf.logErrorAndExit)(`The hvigor build tool cannot be installed. Please manually clear the workspace directory and synchronize the project again.\n\n      Workspace Path: ${e}.`)
      }
    }()
  }
  return pf
}, function(){
  js.environmentHandler(), js.isPnpmInstalled() || (js.checkNpmConifg(), js.executeInstallPnpm());
  const t = Xl();
  P(e.join(t, S))
}();