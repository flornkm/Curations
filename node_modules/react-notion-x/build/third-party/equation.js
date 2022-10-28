var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// ../../node_modules/lodash.throttle/index.js
var require_lodash = __commonJS({
  "../../node_modules/lodash.throttle/index.js"(exports, module) {
    var FUNC_ERROR_TEXT = "Expected a function";
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    var now = function() {
      return root.Date.now();
    };
    function debounce(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
        return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    function throttle2(func, wait, options) {
      var leading = true, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = "leading" in options ? !!options.leading : leading;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        "leading": leading,
        "maxWait": wait,
        "trailing": trailing
      });
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = throttle2;
  }
});

// src/third-party/equation.tsx
import * as React21 from "react";
import Katex from "@matejmazur/react-katex";
import { getBlockTitle as getBlockTitle4 } from "notion-utils";

// src/context.tsx
import * as React20 from "react";

// src/components/asset-wrapper.tsx
import * as React16 from "react";
import { parsePageId as parsePageId2 } from "notion-utils";

// src/utils.ts
import { isUrl, formatDate, formatNotionDateTime } from "notion-utils";

// src/map-image-url.ts
var defaultMapImageUrl = (url, block) => {
  if (!url) {
    return null;
  }
  if (url.startsWith("data:")) {
    return url;
  }
  if (url.startsWith("https://images.unsplash.com")) {
    return url;
  }
  try {
    const u = new URL(url);
    if (u.pathname.startsWith("/secure.notion-static.com") && u.hostname.endsWith(".amazonaws.com")) {
      if (u.searchParams.has("X-Amz-Credential") && u.searchParams.has("X-Amz-Signature") && u.searchParams.has("X-Amz-Algorithm")) {
        return url;
      }
    }
  } catch (e) {
  }
  if (url.startsWith("/images")) {
    url = `https://www.notion.so${url}`;
  }
  url = `https://www.notion.so${url.startsWith("/image") ? url : `/image/${encodeURIComponent(url)}`}`;
  const notionImageUrlV2 = new URL(url);
  let table = block.parent_table === "space" ? "block" : block.parent_table;
  if (table === "collection" || table === "team") {
    table = "block";
  }
  notionImageUrlV2.searchParams.set("table", table);
  notionImageUrlV2.searchParams.set("id", block.id);
  notionImageUrlV2.searchParams.set("cache", "v2");
  url = notionImageUrlV2.toString();
  return url;
};

// src/map-page-url.ts
var defaultMapPageUrl = (rootPageId) => (pageId) => {
  pageId = (pageId || "").replace(/-/g, "");
  if (rootPageId && pageId === rootPageId) {
    return "/";
  } else {
    return `/${pageId}`;
  }
};

// src/utils.ts
var cs = (...classes) => classes.filter((a) => !!a).join(" ");
var getHashFragmentValue = (url) => {
  return url.includes("#") ? url.replace(/^.+(#.+)$/, "$1") : "";
};
var isBrowser = typeof window !== "undefined";
var youtubeDomains = /* @__PURE__ */ new Set([
  "youtu.be",
  "youtube.com",
  "www.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com"
]);
var getYoutubeId = (url) => {
  try {
    const { hostname } = new URL(url);
    if (!youtubeDomains.has(hostname)) {
      return null;
    }
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/i;
    const match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    }
  } catch (e) {
  }
  return null;
};

// src/components/eoi.tsx
import * as React2 from "react";

// src/icons/type-github.tsx
import * as React from "react";
function SvgTypeGitHub(props) {
  return /* @__PURE__ */ React.createElement("svg", __spreadValues({
    viewBox: "0 0 260 260"
  }, props), /* @__PURE__ */ React.createElement("g", null, /* @__PURE__ */ React.createElement("path", {
    d: "M128.00106,0 C57.3172926,0 0,57.3066942 0,128.00106 C0,184.555281 36.6761997,232.535542 87.534937,249.460899 C93.9320223,250.645779 96.280588,246.684165 96.280588,243.303333 C96.280588,240.251045 96.1618878,230.167899 96.106777,219.472176 C60.4967585,227.215235 52.9826207,204.369712 52.9826207,204.369712 C47.1599584,189.574598 38.770408,185.640538 38.770408,185.640538 C27.1568785,177.696113 39.6458206,177.859325 39.6458206,177.859325 C52.4993419,178.762293 59.267365,191.04987 59.267365,191.04987 C70.6837675,210.618423 89.2115753,204.961093 96.5158685,201.690482 C97.6647155,193.417512 100.981959,187.77078 104.642583,184.574357 C76.211799,181.33766 46.324819,170.362144 46.324819,121.315702 C46.324819,107.340889 51.3250588,95.9223682 59.5132437,86.9583937 C58.1842268,83.7344152 53.8029229,70.715562 60.7532354,53.0843636 C60.7532354,53.0843636 71.5019501,49.6441813 95.9626412,66.2049595 C106.172967,63.368876 117.123047,61.9465949 128.00106,61.8978432 C138.879073,61.9465949 149.837632,63.368876 160.067033,66.2049595 C184.49805,49.6441813 195.231926,53.0843636 195.231926,53.0843636 C202.199197,70.715562 197.815773,83.7344152 196.486756,86.9583937 C204.694018,95.9223682 209.660343,107.340889 209.660343,121.315702 C209.660343,170.478725 179.716133,181.303747 151.213281,184.472614 C155.80443,188.444828 159.895342,196.234518 159.895342,208.176593 C159.895342,225.303317 159.746968,239.087361 159.746968,243.303333 C159.746968,246.709601 162.05102,250.70089 168.53925,249.443941 C219.370432,232.499507 256,184.536204 256,128.00106 C256,57.3066942 198.691187,0 128.00106,0 Z M47.9405593,182.340212 C47.6586465,182.976105 46.6581745,183.166873 45.7467277,182.730227 C44.8183235,182.312656 44.2968914,181.445722 44.5978808,180.80771 C44.8734344,180.152739 45.876026,179.97045 46.8023103,180.409216 C47.7328342,180.826786 48.2627451,181.702199 47.9405593,182.340212 Z M54.2367892,187.958254 C53.6263318,188.524199 52.4329723,188.261363 51.6232682,187.366874 C50.7860088,186.474504 50.6291553,185.281144 51.2480912,184.70672 C51.8776254,184.140775 53.0349512,184.405731 53.8743302,185.298101 C54.7115892,186.201069 54.8748019,187.38595 54.2367892,187.958254 Z M58.5562413,195.146347 C57.7719732,195.691096 56.4895886,195.180261 55.6968417,194.042013 C54.9125733,192.903764 54.9125733,191.538713 55.713799,190.991845 C56.5086651,190.444977 57.7719732,190.936735 58.5753181,192.066505 C59.3574669,193.22383 59.3574669,194.58888 58.5562413,195.146347 Z M65.8613592,203.471174 C65.1597571,204.244846 63.6654083,204.03712 62.5716717,202.981538 C61.4524999,201.94927 61.1409122,200.484596 61.8446341,199.710926 C62.5547146,198.935137 64.0575422,199.15346 65.1597571,200.200564 C66.2704506,201.230712 66.6095936,202.705984 65.8613592,203.471174 Z M75.3025151,206.281542 C74.9930474,207.284134 73.553809,207.739857 72.1039724,207.313809 C70.6562556,206.875043 69.7087748,205.700761 70.0012857,204.687571 C70.302275,203.678621 71.7478721,203.20382 73.2083069,203.659543 C74.6539041,204.09619 75.6035048,205.261994 75.3025151,206.281542 Z M86.046947,207.473627 C86.0829806,208.529209 84.8535871,209.404622 83.3316829,209.4237 C81.8013,209.457614 80.563428,208.603398 80.5464708,207.564772 C80.5464708,206.498591 81.7483088,205.631657 83.2786917,205.606221 C84.8005962,205.576546 86.046947,206.424403 86.046947,207.473627 Z M96.6021471,207.069023 C96.7844366,208.099171 95.7267341,209.156872 94.215428,209.438785 C92.7295577,209.710099 91.3539086,209.074206 91.1652603,208.052538 C90.9808515,206.996955 92.0576306,205.939253 93.5413813,205.66582 C95.054807,205.402984 96.4092596,206.021919 96.6021471,207.069023 Z",
    fill: "#161614"
  })));
}
var type_github_default = SvgTypeGitHub;

// src/components/eoi.tsx
var EOI = ({ block, inline, className }) => {
  var _a, _b, _c;
  const { components } = useNotionContext();
  const { original_url, attributes, domain } = (block == null ? void 0 : block.format) || {};
  if (!original_url || !attributes) {
    return null;
  }
  const title = (_a = attributes.find((attr) => attr.id === "title")) == null ? void 0 : _a.values[0];
  let owner = (_b = attributes.find((attr) => attr.id === "owner")) == null ? void 0 : _b.values[0];
  const lastUpdatedAt = (_c = attributes.find((attr) => attr.id === "updated_at")) == null ? void 0 : _c.values[0];
  const lastUpdated = lastUpdatedAt ? formatNotionDateTime(lastUpdatedAt) : null;
  let externalImage;
  switch (domain) {
    case "github.com":
      externalImage = /* @__PURE__ */ React2.createElement(type_github_default, null);
      if (owner) {
        const parts = owner.split("/");
        owner = parts[parts.length - 1];
      }
      break;
    default:
      if (true) {
        console.log(
          `Unsupported external_object_instance domain "${domain}"`,
          JSON.stringify(block, null, 2)
        );
      }
      return null;
  }
  return /* @__PURE__ */ React2.createElement(components.Link, {
    target: "_blank",
    rel: "noopener noreferrer",
    href: original_url,
    className: cs(
      "notion-external",
      inline ? "notion-external-mention" : "notion-external-block notion-row",
      className
    )
  }, externalImage && /* @__PURE__ */ React2.createElement("div", {
    className: "notion-external-image"
  }, externalImage), /* @__PURE__ */ React2.createElement("div", {
    className: "notion-external-description"
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "notion-external-title"
  }, title), (owner || lastUpdated) && /* @__PURE__ */ React2.createElement("div", {
    className: "notion-external-subtitle"
  }, owner && /* @__PURE__ */ React2.createElement("span", null, owner), owner && lastUpdated && /* @__PURE__ */ React2.createElement("span", null, " \u2022 "), lastUpdated && /* @__PURE__ */ React2.createElement("span", null, "Updated ", lastUpdated))));
};

// src/components/text.tsx
import * as React8 from "react";
import { parsePageId } from "notion-utils";

// src/components/graceful-image.tsx
import * as React3 from "react";
import { Img } from "react-image";
var GracefulImage = (props) => {
  if (isBrowser) {
    return /* @__PURE__ */ React3.createElement(Img, __spreadValues({}, props));
  } else {
    return /* @__PURE__ */ React3.createElement("img", __spreadValues({}, props));
  }
};

// src/components/page-title.tsx
import * as React7 from "react";
import { getBlockTitle as getBlockTitle2 } from "notion-utils";

// src/components/page-icon.tsx
import * as React6 from "react";
import { getBlockIcon, getBlockTitle } from "notion-utils";

// src/icons/default-page-icon.tsx
import * as React4 from "react";
var DefaultPageIcon = (props) => {
  const _a = props, { className } = _a, rest = __objRest(_a, ["className"]);
  return /* @__PURE__ */ React4.createElement("svg", __spreadProps(__spreadValues({
    className
  }, rest), {
    viewBox: "0 0 30 30",
    width: "16"
  }), /* @__PURE__ */ React4.createElement("path", {
    d: "M16,1H4v28h22V11L16,1z M16,3.828L23.172,11H16V3.828z M24,27H6V3h8v10h10V27z M8,17h14v-2H8V17z M8,21h14v-2H8V21z M8,25h14v-2H8V25z"
  }));
};

// src/components/lazy-image.tsx
import * as React5 from "react";
import { normalizeUrl } from "notion-utils";
import { ImageState, LazyImageFull } from "react-lazy-images";
var LazyImage = (_a) => {
  var _b = _a, {
    src,
    alt,
    className,
    style,
    zoomable = false,
    priority = false,
    height
  } = _b, rest = __objRest(_b, [
    "src",
    "alt",
    "className",
    "style",
    "zoomable",
    "priority",
    "height"
  ]);
  var _a2, _b2, _c;
  const { recordMap, zoom, previewImages, forceCustomImages, components } = useNotionContext();
  const zoomRef = React5.useRef(zoom ? zoom.clone() : null);
  const previewImage = previewImages ? (_c = (_a2 = recordMap == null ? void 0 : recordMap.preview_images) == null ? void 0 : _a2[src]) != null ? _c : (_b2 = recordMap == null ? void 0 : recordMap.preview_images) == null ? void 0 : _b2[normalizeUrl(src)] : null;
  const onLoad = React5.useCallback(
    (e) => {
      if (zoomable && (e.target.src || e.target.srcset)) {
        if (zoomRef.current) {
          ;
          zoomRef.current.attach(e.target);
        }
      }
    },
    [zoomRef, zoomable]
  );
  const attachZoom = React5.useCallback(
    (image) => {
      if (zoomRef.current && image) {
        ;
        zoomRef.current.attach(image);
      }
    },
    [zoomRef]
  );
  const attachZoomRef = React5.useMemo(
    () => zoomable ? attachZoom : void 0,
    [zoomable, attachZoom]
  );
  if (previewImage) {
    const aspectRatio = previewImage.originalHeight / previewImage.originalWidth;
    if (components.Image) {
      return /* @__PURE__ */ React5.createElement(components.Image, {
        src,
        alt,
        style,
        className,
        width: previewImage.originalWidth,
        height: previewImage.originalHeight,
        blurDataURL: previewImage.dataURIBase64,
        placeholder: "blur",
        priority,
        onLoad
      });
    }
    return /* @__PURE__ */ React5.createElement(LazyImageFull, __spreadProps(__spreadValues({
      src
    }, rest), {
      experimentalDecode: true
    }), ({ imageState, ref }) => {
      const isLoaded = imageState === ImageState.LoadSuccess;
      const wrapperStyle = {
        width: "100%"
      };
      const imgStyle = {};
      if (height) {
        wrapperStyle.height = height;
      } else {
        imgStyle.position = "absolute";
        wrapperStyle.paddingBottom = `${aspectRatio * 100}%`;
      }
      return /* @__PURE__ */ React5.createElement("div", {
        className: cs(
          "lazy-image-wrapper",
          isLoaded && "lazy-image-loaded",
          className
        ),
        style: wrapperStyle
      }, /* @__PURE__ */ React5.createElement("img", {
        className: "lazy-image-preview",
        src: previewImage.dataURIBase64,
        alt,
        ref,
        style,
        decoding: "async"
      }), /* @__PURE__ */ React5.createElement("img", {
        className: "lazy-image-real",
        src,
        alt,
        ref: attachZoomRef,
        style: __spreadValues(__spreadValues({}, style), imgStyle),
        width: previewImage.originalWidth,
        height: previewImage.originalHeight,
        decoding: "async",
        loading: "lazy"
      }));
    });
  } else {
    if (components.Image && forceCustomImages) {
      return /* @__PURE__ */ React5.createElement(components.Image, {
        src,
        alt,
        className,
        style,
        width: null,
        height: height || null,
        priority,
        onLoad
      });
    }
    return /* @__PURE__ */ React5.createElement("img", __spreadValues({
      className,
      style,
      src,
      alt,
      ref: attachZoomRef,
      loading: "lazy",
      decoding: "async"
    }, rest));
  }
};

// src/components/page-icon.tsx
var isIconBlock = (value) => {
  return value.type === "page" || value.type === "callout" || value.type === "collection_view" || value.type === "collection_view_page";
};
var PageIconImpl = ({
  block,
  className,
  inline = true,
  hideDefaultIcon = false,
  defaultIcon
}) => {
  var _a;
  const { mapImageUrl, recordMap, darkMode } = useNotionContext();
  let isImage = false;
  let content = null;
  if (isIconBlock(block)) {
    const icon = ((_a = getBlockIcon(block, recordMap)) == null ? void 0 : _a.trim()) || defaultIcon;
    const title = getBlockTitle(block, recordMap);
    if (icon && isUrl(icon)) {
      const url = mapImageUrl(icon, block);
      isImage = true;
      content = /* @__PURE__ */ React6.createElement(LazyImage, {
        src: url,
        alt: title || "page icon",
        className: cs(className, "notion-page-icon")
      });
    } else if (icon && icon.startsWith("/icons/")) {
      const url = "https://www.notion.so" + icon + "?mode=" + (darkMode ? "dark" : "light");
      content = /* @__PURE__ */ React6.createElement(LazyImage, {
        src: url,
        alt: title || "page icon",
        className: cs(className, "notion-page-icon")
      });
    } else if (!icon) {
      if (!hideDefaultIcon) {
        isImage = true;
        content = /* @__PURE__ */ React6.createElement(DefaultPageIcon, {
          className: cs(className, "notion-page-icon"),
          alt: title ? title : "page icon"
        });
      }
    } else {
      isImage = false;
      content = /* @__PURE__ */ React6.createElement("span", {
        className: cs(className, "notion-page-icon"),
        role: "img",
        "aria-label": icon
      }, icon);
    }
  }
  if (!content) {
    return null;
  }
  return /* @__PURE__ */ React6.createElement("div", {
    className: cs(
      inline ? "notion-page-icon-inline" : "notion-page-icon-hero",
      isImage ? "notion-page-icon-image" : "notion-page-icon-span"
    )
  }, content);
};
var PageIcon = React6.memo(PageIconImpl);

// src/components/page-title.tsx
var PageTitleImpl = (_a) => {
  var _b = _a, { block, className, defaultIcon } = _b, rest = __objRest(_b, ["block", "className", "defaultIcon"]);
  var _a2, _b2;
  const { recordMap } = useNotionContext();
  if (!block)
    return null;
  if (block.type === "collection_view_page" || block.type === "collection_view") {
    const title = getBlockTitle2(block, recordMap);
    if (!title) {
      return null;
    }
    const titleDecoration = [[title]];
    return /* @__PURE__ */ React7.createElement("span", __spreadValues({
      className: cs("notion-page-title", className)
    }, rest), /* @__PURE__ */ React7.createElement(PageIcon, {
      block,
      defaultIcon,
      className: "notion-page-title-icon"
    }), /* @__PURE__ */ React7.createElement("span", {
      className: "notion-page-title-text"
    }, /* @__PURE__ */ React7.createElement(Text, {
      value: titleDecoration,
      block
    })));
  }
  if (!((_a2 = block.properties) == null ? void 0 : _a2.title)) {
    return null;
  }
  return /* @__PURE__ */ React7.createElement("span", __spreadValues({
    className: cs("notion-page-title", className)
  }, rest), /* @__PURE__ */ React7.createElement(PageIcon, {
    block,
    defaultIcon,
    className: "notion-page-title-icon"
  }), /* @__PURE__ */ React7.createElement("span", {
    className: "notion-page-title-text"
  }, /* @__PURE__ */ React7.createElement(Text, {
    value: (_b2 = block.properties) == null ? void 0 : _b2.title,
    block
  })));
};
var PageTitle = React7.memo(PageTitleImpl);

// src/components/text.tsx
var Text = ({ value, block, linkProps, linkProtocol }) => {
  const { components, recordMap, mapPageUrl, mapImageUrl, rootDomain } = useNotionContext();
  return /* @__PURE__ */ React8.createElement(React8.Fragment, null, value == null ? void 0 : value.map(([text, decorations], index) => {
    if (!decorations) {
      if (text === ",") {
        return /* @__PURE__ */ React8.createElement("span", {
          key: index,
          style: { padding: "0.5em" }
        });
      } else {
        return /* @__PURE__ */ React8.createElement(React8.Fragment, {
          key: index
        }, text);
      }
    }
    const formatted = decorations.reduce(
      (element, decorator) => {
        var _a, _b, _c, _d, _e;
        switch (decorator[0]) {
          case "p": {
            const blockId = decorator[1];
            const linkedBlock = (_a = recordMap.block[blockId]) == null ? void 0 : _a.value;
            if (!linkedBlock) {
              console.log('"p" missing block', blockId);
              return null;
            }
            return /* @__PURE__ */ React8.createElement(components.PageLink, {
              className: "notion-link",
              href: mapPageUrl(blockId)
            }, /* @__PURE__ */ React8.createElement(PageTitle, {
              block: linkedBlock
            }));
          }
          case "\u2023": {
            const linkType = decorator[1][0];
            const id = decorator[1][1];
            switch (linkType) {
              case "u": {
                const user = (_b = recordMap.notion_user[id]) == null ? void 0 : _b.value;
                if (!user) {
                  console.log('"\u2023" missing user', id);
                  return null;
                }
                const name = [user.given_name, user.family_name].filter(Boolean).join(" ");
                return /* @__PURE__ */ React8.createElement(GracefulImage, {
                  className: "notion-user",
                  src: mapImageUrl(user.profile_photo, block),
                  alt: name
                });
              }
              default: {
                const linkedBlock = (_c = recordMap.block[id]) == null ? void 0 : _c.value;
                if (!linkedBlock) {
                  console.log('"\u2023" missing block', linkType, id);
                  return null;
                }
                return /* @__PURE__ */ React8.createElement(components.PageLink, __spreadProps(__spreadValues({
                  className: "notion-link",
                  href: mapPageUrl(id)
                }, linkProps), {
                  target: "_blank",
                  rel: "noopener noreferrer"
                }), /* @__PURE__ */ React8.createElement(PageTitle, {
                  block: linkedBlock
                }));
              }
            }
          }
          case "h":
            return /* @__PURE__ */ React8.createElement("span", {
              className: `notion-${decorator[1]}`
            }, element);
          case "c":
            return /* @__PURE__ */ React8.createElement("code", {
              className: "notion-inline-code"
            }, element);
          case "b":
            return /* @__PURE__ */ React8.createElement("b", null, element);
          case "i":
            return /* @__PURE__ */ React8.createElement("em", null, element);
          case "s":
            return /* @__PURE__ */ React8.createElement("s", null, element);
          case "_":
            return /* @__PURE__ */ React8.createElement("span", {
              className: "notion-inline-underscore"
            }, element);
          case "e":
            return /* @__PURE__ */ React8.createElement(components.Equation, {
              math: decorator[1],
              inline: true
            });
          case "m":
            return element;
          case "a": {
            const v = decorator[1];
            const pathname = v.substr(1);
            const id = parsePageId(pathname, { uuid: true });
            if ((v[0] === "/" || v.includes(rootDomain)) && id) {
              const href = v.includes(rootDomain) ? v : `${mapPageUrl(id)}${getHashFragmentValue(v)}`;
              return /* @__PURE__ */ React8.createElement(components.PageLink, __spreadValues({
                className: "notion-link",
                href
              }, linkProps), element);
            } else {
              return /* @__PURE__ */ React8.createElement(components.Link, __spreadValues({
                className: "notion-link",
                href: linkProtocol ? `${linkProtocol}:${decorator[1]}` : decorator[1]
              }, linkProps), element);
            }
          }
          case "d": {
            const v = decorator[1];
            const type = v == null ? void 0 : v.type;
            if (type === "date") {
              const startDate = v.start_date;
              return formatDate(startDate);
            } else if (type === "daterange") {
              const startDate = v.start_date;
              const endDate = v.end_date;
              return `${formatDate(startDate)} \u2192 ${formatDate(endDate)}`;
            } else {
              return element;
            }
          }
          case "u": {
            const userId = decorator[1];
            const user = (_d = recordMap.notion_user[userId]) == null ? void 0 : _d.value;
            if (!user) {
              console.log("missing user", userId);
              return null;
            }
            const name = [user.given_name, user.family_name].filter(Boolean).join(" ");
            return /* @__PURE__ */ React8.createElement(GracefulImage, {
              className: "notion-user",
              src: mapImageUrl(user.profile_photo, block),
              alt: name
            });
          }
          case "eoi": {
            const blockId = decorator[1];
            const externalObjectInstance = (_e = recordMap.block[blockId]) == null ? void 0 : _e.value;
            return /* @__PURE__ */ React8.createElement(EOI, {
              block: externalObjectInstance,
              inline: true
            });
          }
          default:
            if (true) {
              console.log("unsupported text format", decorator);
            }
            return element;
        }
      },
      /* @__PURE__ */ React8.createElement(React8.Fragment, null, text)
    );
    return /* @__PURE__ */ React8.createElement(React8.Fragment, {
      key: index
    }, formatted);
  }));
};

// src/components/header.tsx
import * as React13 from "react";
import { getPageBreadcrumbs } from "notion-utils";
import { useHotkeys } from "react-hotkeys-hook";

// src/icons/search-icon.tsx
import * as React9 from "react";
var SearchIcon = (props) => {
  const _a = props, { className } = _a, rest = __objRest(_a, ["className"]);
  return /* @__PURE__ */ React9.createElement("svg", __spreadValues({
    className: cs("notion-icon", className),
    viewBox: "0 0 17 17"
  }, rest), /* @__PURE__ */ React9.createElement("path", {
    d: "M6.78027 13.6729C8.24805 13.6729 9.60156 13.1982 10.709 12.4072L14.875 16.5732C15.0684 16.7666 15.3232 16.8633 15.5957 16.8633C16.167 16.8633 16.5713 16.4238 16.5713 15.8613C16.5713 15.5977 16.4834 15.3516 16.29 15.1582L12.1504 11.0098C13.0205 9.86719 13.5391 8.45215 13.5391 6.91406C13.5391 3.19629 10.498 0.155273 6.78027 0.155273C3.0625 0.155273 0.0214844 3.19629 0.0214844 6.91406C0.0214844 10.6318 3.0625 13.6729 6.78027 13.6729ZM6.78027 12.2139C3.87988 12.2139 1.48047 9.81445 1.48047 6.91406C1.48047 4.01367 3.87988 1.61426 6.78027 1.61426C9.68066 1.61426 12.0801 4.01367 12.0801 6.91406C12.0801 9.81445 9.68066 12.2139 6.78027 12.2139Z"
  }));
};

// src/components/search-dialog.tsx
var import_lodash = __toESM(require_lodash(), 1);
import * as React12 from "react";
import { getBlockParentPage, getBlockTitle as getBlockTitle3 } from "notion-utils";

// src/icons/clear-icon.tsx
import * as React10 from "react";
var ClearIcon = (props) => {
  const _a = props, { className } = _a, rest = __objRest(_a, ["className"]);
  return /* @__PURE__ */ React10.createElement("svg", __spreadProps(__spreadValues({
    className: cs("notion-icon", className)
  }, rest), {
    viewBox: "0 0 30 30"
  }), /* @__PURE__ */ React10.createElement("path", {
    d: "M15,0C6.716,0,0,6.716,0,15s6.716,15,15,15s15-6.716,15-15S23.284,0,15,0z M22,20.6L20.6,22L15,16.4L9.4,22L8,20.6l5.6-5.6 L8,9.4L9.4,8l5.6,5.6L20.6,8L22,9.4L16.4,15L22,20.6z"
  }));
};

// src/icons/loading-icon.tsx
import * as React11 from "react";
var LoadingIcon = (props) => {
  const _a = props, { className } = _a, rest = __objRest(_a, ["className"]);
  return /* @__PURE__ */ React11.createElement("svg", __spreadProps(__spreadValues({
    className: cs("notion-icon", className)
  }, rest), {
    viewBox: "0 0 24 24"
  }), /* @__PURE__ */ React11.createElement("defs", null, /* @__PURE__ */ React11.createElement("linearGradient", {
    x1: "28.1542969%",
    y1: "63.7402344%",
    x2: "74.6289062%",
    y2: "17.7832031%",
    id: "linearGradient-1"
  }, /* @__PURE__ */ React11.createElement("stop", {
    stopColor: "rgba(164, 164, 164, 1)",
    offset: "0%"
  }), /* @__PURE__ */ React11.createElement("stop", {
    stopColor: "rgba(164, 164, 164, 0)",
    stopOpacity: "0",
    offset: "100%"
  }))), /* @__PURE__ */ React11.createElement("g", {
    id: "Page-1",
    stroke: "none",
    strokeWidth: "1",
    fill: "none"
  }, /* @__PURE__ */ React11.createElement("g", {
    transform: "translate(-236.000000, -286.000000)"
  }, /* @__PURE__ */ React11.createElement("g", {
    transform: "translate(238.000000, 286.000000)"
  }, /* @__PURE__ */ React11.createElement("circle", {
    id: "Oval-2",
    stroke: "url(#linearGradient-1)",
    strokeWidth: "4",
    cx: "10",
    cy: "12",
    r: "10"
  }), /* @__PURE__ */ React11.createElement("path", {
    d: "M10,2 C4.4771525,2 0,6.4771525 0,12",
    id: "Oval-2",
    stroke: "rgba(164, 164, 164, 1)",
    strokeWidth: "4"
  }), /* @__PURE__ */ React11.createElement("rect", {
    id: "Rectangle-1",
    fill: "rgba(164, 164, 164, 1)",
    x: "8",
    y: "0",
    width: "4",
    height: "4",
    rx: "8"
  })))));
};

// src/components/search-dialog.tsx
var SearchDialog = class extends React12.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      query: "",
      searchResult: null,
      searchError: null
    };
    this._onAfterOpen = () => {
      if (this._inputRef.current) {
        this._inputRef.current.focus();
      }
    };
    this._onChangeQuery = (e) => {
      const query = e.target.value;
      this.setState({ query });
      if (!query.trim()) {
        this.setState({ isLoading: false, searchResult: null, searchError: null });
        return;
      } else {
        this._search();
      }
    };
    this._onClearQuery = () => {
      this._onChangeQuery({ target: { value: "" } });
    };
    this._warmupSearch = () => __async(this, null, function* () {
      const { searchNotion, rootBlockId } = this.props;
      yield searchNotion({
        query: "",
        ancestorId: rootBlockId
      });
    });
    this._searchImpl = () => __async(this, null, function* () {
      const { searchNotion, rootBlockId } = this.props;
      const { query } = this.state;
      if (!query.trim()) {
        this.setState({ isLoading: false, searchResult: null, searchError: null });
        return;
      }
      this.setState({ isLoading: true });
      const result = yield searchNotion({
        query,
        ancestorId: rootBlockId
      });
      console.log("search", query, result);
      let searchResult = null;
      let searchError = null;
      if (result.error || result.errorId) {
        searchError = result;
      } else {
        searchResult = __spreadValues({}, result);
        const results = searchResult.results.map((result2) => {
          var _a, _b;
          const block = (_a = searchResult.recordMap.block[result2.id]) == null ? void 0 : _a.value;
          if (!block)
            return;
          const title = getBlockTitle3(block, searchResult.recordMap);
          if (!title) {
            return;
          }
          result2.title = title;
          result2.block = block;
          result2.recordMap = searchResult.recordMap;
          result2.page = getBlockParentPage(block, searchResult.recordMap, {
            inclusive: true
          }) || block;
          if (!result2.page.id) {
            return;
          }
          if ((_b = result2.highlight) == null ? void 0 : _b.text) {
            result2.highlight.html = result2.highlight.text.replace(/<gzkNfoUU>/gi, "<b>").replace(/<\/gzkNfoUU>/gi, "</b>");
          }
          return result2;
        }).filter(Boolean);
        const searchResultsMap = results.reduce(
          (map, result2) => __spreadProps(__spreadValues({}, map), {
            [result2.page.id]: result2
          }),
          {}
        );
        searchResult.results = Object.values(searchResultsMap);
      }
      if (this.state.query === query) {
        this.setState({ isLoading: false, searchResult, searchError });
      }
    });
    this._inputRef = React12.createRef();
  }
  componentDidMount() {
    this._search = (0, import_lodash.default)(this._searchImpl.bind(this), 1e3);
    this._warmupSearch();
  }
  render() {
    const { isOpen, onClose } = this.props;
    const { isLoading, query, searchResult, searchError } = this.state;
    const hasQuery = !!query.trim();
    return /* @__PURE__ */ React12.createElement(NotionContextConsumer, null, (ctx2) => {
      const { components, defaultPageIcon, mapPageUrl } = ctx2;
      return /* @__PURE__ */ React12.createElement(components.Modal, {
        isOpen,
        contentLabel: "Search",
        className: "notion-search",
        overlayClassName: "notion-search-overlay",
        onRequestClose: onClose,
        onAfterOpen: this._onAfterOpen
      }, /* @__PURE__ */ React12.createElement("div", {
        className: "quickFindMenu"
      }, /* @__PURE__ */ React12.createElement("div", {
        className: "searchBar"
      }, /* @__PURE__ */ React12.createElement("div", {
        className: "inlineIcon"
      }, isLoading ? /* @__PURE__ */ React12.createElement(LoadingIcon, {
        className: "loadingIcon"
      }) : /* @__PURE__ */ React12.createElement(SearchIcon, null)), /* @__PURE__ */ React12.createElement("input", {
        className: "searchInput",
        placeholder: "Search",
        value: query,
        ref: this._inputRef,
        onChange: this._onChangeQuery
      }), query && /* @__PURE__ */ React12.createElement("div", {
        role: "button",
        className: "clearButton",
        onClick: this._onClearQuery
      }, /* @__PURE__ */ React12.createElement(ClearIcon, {
        className: "clearIcon"
      }))), hasQuery && searchResult && /* @__PURE__ */ React12.createElement(React12.Fragment, null, searchResult.results.length ? /* @__PURE__ */ React12.createElement(NotionContextProvider, __spreadProps(__spreadValues({}, ctx2), {
        recordMap: searchResult.recordMap
      }), /* @__PURE__ */ React12.createElement("div", {
        className: "resultsPane"
      }, searchResult.results.map((result) => {
        var _a;
        return /* @__PURE__ */ React12.createElement(components.PageLink, {
          key: result.id,
          className: cs("result", "notion-page-link"),
          href: mapPageUrl(
            result.page.id,
            searchResult.recordMap
          )
        }, /* @__PURE__ */ React12.createElement(PageTitle, {
          block: result.page,
          defaultIcon: defaultPageIcon
        }), ((_a = result.highlight) == null ? void 0 : _a.html) && /* @__PURE__ */ React12.createElement("div", {
          className: "notion-search-result-highlight",
          dangerouslySetInnerHTML: {
            __html: result.highlight.html
          }
        }));
      })), /* @__PURE__ */ React12.createElement("footer", {
        className: "resultsFooter"
      }, /* @__PURE__ */ React12.createElement("div", null, /* @__PURE__ */ React12.createElement("span", {
        className: "resultsCount"
      }, searchResult.total), searchResult.total === 1 ? " result" : " results"))) : /* @__PURE__ */ React12.createElement("div", {
        className: "noResultsPane"
      }, /* @__PURE__ */ React12.createElement("div", {
        className: "noResults"
      }, "No results"), /* @__PURE__ */ React12.createElement("div", {
        className: "noResultsDetail"
      }, "Try different search terms"))), hasQuery && !searchResult && searchError && /* @__PURE__ */ React12.createElement("div", {
        className: "noResultsPane"
      }, /* @__PURE__ */ React12.createElement("div", {
        className: "noResults"
      }, "Search error"))));
    });
  }
};

// src/components/header.tsx
var Header = ({ block }) => {
  return /* @__PURE__ */ React13.createElement("header", {
    className: "notion-header"
  }, /* @__PURE__ */ React13.createElement("div", {
    className: "notion-nav-header"
  }, /* @__PURE__ */ React13.createElement(Breadcrumbs, {
    block
  }), /* @__PURE__ */ React13.createElement(Search, {
    block
  })));
};
var Breadcrumbs = ({ block, rootOnly = false }) => {
  const { recordMap, mapPageUrl, components } = useNotionContext();
  const breadcrumbs = React13.useMemo(() => {
    const breadcrumbs2 = getPageBreadcrumbs(recordMap, block.id);
    if (rootOnly) {
      return [breadcrumbs2[0]].filter(Boolean);
    }
    return breadcrumbs2;
  }, [recordMap, block.id, rootOnly]);
  return /* @__PURE__ */ React13.createElement("div", {
    className: "breadcrumbs",
    key: "breadcrumbs"
  }, breadcrumbs.map((breadcrumb, index) => {
    if (!breadcrumb) {
      return null;
    }
    const pageLinkProps = {};
    const componentMap = {
      pageLink: components.PageLink
    };
    if (breadcrumb.active) {
      componentMap.pageLink = (props) => /* @__PURE__ */ React13.createElement("div", __spreadValues({}, props));
    } else {
      pageLinkProps.href = mapPageUrl(breadcrumb.pageId);
    }
    return /* @__PURE__ */ React13.createElement(React13.Fragment, {
      key: breadcrumb.pageId
    }, /* @__PURE__ */ React13.createElement(componentMap.pageLink, __spreadValues({
      className: cs("breadcrumb", breadcrumb.active && "active")
    }, pageLinkProps), breadcrumb.icon && /* @__PURE__ */ React13.createElement(PageIcon, {
      className: "icon",
      block: breadcrumb.block
    }), breadcrumb.title && /* @__PURE__ */ React13.createElement("span", {
      className: "title"
    }, breadcrumb.title)), index < breadcrumbs.length - 1 && /* @__PURE__ */ React13.createElement("span", {
      className: "spacer"
    }, "/"));
  }));
};
var Search = ({ block, search, title = "Search" }) => {
  const { searchNotion, rootPageId, isShowingSearch, onHideSearch } = useNotionContext();
  const onSearchNotion = search || searchNotion;
  const [isSearchOpen, setIsSearchOpen] = React13.useState(isShowingSearch);
  React13.useEffect(() => {
    setIsSearchOpen(isShowingSearch);
  }, [isShowingSearch]);
  const onOpenSearch = React13.useCallback(() => {
    setIsSearchOpen(true);
  }, []);
  const onCloseSearch = React13.useCallback(() => {
    setIsSearchOpen(false);
    if (onHideSearch) {
      onHideSearch();
    }
  }, [onHideSearch]);
  useHotkeys("cmd+p", (event) => {
    onOpenSearch();
    event.preventDefault();
    event.stopPropagation();
  });
  useHotkeys("cmd+k", (event) => {
    onOpenSearch();
    event.preventDefault();
    event.stopPropagation();
  });
  const hasSearch = !!onSearchNotion;
  return /* @__PURE__ */ React13.createElement(React13.Fragment, null, hasSearch && /* @__PURE__ */ React13.createElement("div", {
    role: "button",
    className: cs("breadcrumb", "button", "notion-search-button"),
    onClick: onOpenSearch
  }, /* @__PURE__ */ React13.createElement(SearchIcon, {
    className: "searchIcon"
  }), title && /* @__PURE__ */ React13.createElement("span", {
    className: "title"
  }, title)), isSearchOpen && hasSearch && /* @__PURE__ */ React13.createElement(SearchDialog, {
    isOpen: isSearchOpen,
    rootBlockId: rootPageId || (block == null ? void 0 : block.id),
    onClose: onCloseSearch,
    searchNotion: onSearchNotion
  }));
};

// src/components/asset.tsx
import * as React15 from "react";
import { getTextContent } from "notion-utils";

// src/components/lite-youtube-embed.tsx
import * as React14 from "react";
var qs = (params) => {
  return Object.keys(params).map(
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  ).join("&");
};
var LiteYouTubeEmbed = ({
  id,
  defaultPlay = false,
  mute = false,
  lazyImage = false,
  iframeTitle = "YouTube video",
  alt = "Video preview",
  params = {},
  adLinksPreconnect = true,
  style,
  className
}) => {
  const muteParam = mute || defaultPlay ? "1" : "0";
  const queryString = React14.useMemo(
    () => qs(__spreadValues({ autoplay: "1", mute: muteParam }, params)),
    [muteParam, params]
  );
  const resolution = "hqdefault";
  const posterUrl = `https://i.ytimg.com/vi/${id}/${resolution}.jpg`;
  const ytUrl = "https://www.youtube-nocookie.com";
  const iframeSrc = `${ytUrl}/embed/${id}?${queryString}`;
  const [isPreconnected, setIsPreconnected] = React14.useState(false);
  const [iframeInitialized, setIframeInitialized] = React14.useState(defaultPlay);
  const [isIframeLoaded, setIsIframeLoaded] = React14.useState(false);
  const warmConnections = React14.useCallback(() => {
    if (isPreconnected)
      return;
    setIsPreconnected(true);
  }, [isPreconnected]);
  const onLoadIframe = React14.useCallback(() => {
    if (iframeInitialized)
      return;
    setIframeInitialized(true);
  }, [iframeInitialized]);
  const onIframeLoaded = React14.useCallback(() => {
    setIsIframeLoaded(true);
  }, []);
  return /* @__PURE__ */ React14.createElement(React14.Fragment, null, /* @__PURE__ */ React14.createElement("link", {
    rel: "preload",
    href: posterUrl,
    as: "image"
  }), isPreconnected && /* @__PURE__ */ React14.createElement(React14.Fragment, null, /* @__PURE__ */ React14.createElement("link", {
    rel: "preconnect",
    href: ytUrl
  }), /* @__PURE__ */ React14.createElement("link", {
    rel: "preconnect",
    href: "https://www.google.com"
  })), isPreconnected && adLinksPreconnect && /* @__PURE__ */ React14.createElement(React14.Fragment, null, /* @__PURE__ */ React14.createElement("link", {
    rel: "preconnect",
    href: "https://static.doubleclick.net"
  }), /* @__PURE__ */ React14.createElement("link", {
    rel: "preconnect",
    href: "https://googleads.g.doubleclick.net"
  })), /* @__PURE__ */ React14.createElement("div", {
    onClick: onLoadIframe,
    onPointerOver: warmConnections,
    className: cs(
      "notion-yt-lite",
      isIframeLoaded && "notion-yt-loaded",
      iframeInitialized && "notion-yt-initialized",
      className
    ),
    style
  }, /* @__PURE__ */ React14.createElement("img", {
    src: posterUrl,
    className: "notion-yt-thumbnail",
    loading: lazyImage ? "lazy" : void 0,
    alt
  }), /* @__PURE__ */ React14.createElement("div", {
    className: "notion-yt-playbtn"
  }), iframeInitialized && /* @__PURE__ */ React14.createElement("iframe", {
    width: "560",
    height: "315",
    frameBorder: "0",
    allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
    allowFullScreen: true,
    title: iframeTitle,
    src: iframeSrc,
    onLoad: onIframeLoaded
  })));
};

// src/components/asset.tsx
var isServer = typeof window === "undefined";
var supportedAssetTypes = [
  "video",
  "image",
  "embed",
  "figma",
  "typeform",
  "excalidraw",
  "maps",
  "tweet",
  "pdf",
  "gist",
  "codepen",
  "drive"
];
var Asset = ({ block, zoomable = true, children }) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const { recordMap, mapImageUrl, components } = useNotionContext();
  if (!block || !supportedAssetTypes.includes(block.type)) {
    return null;
  }
  const style = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    maxWidth: "100%",
    flexDirection: "column"
  };
  const assetStyle = {};
  if (block.format) {
    const {
      block_aspect_ratio,
      block_height,
      block_width,
      block_full_width,
      block_page_width,
      block_preserve_scale
    } = block.format;
    if (block_full_width || block_page_width) {
      if (block_full_width) {
        style.width = "100vw";
      } else {
        style.width = "100%";
      }
      if (block.type === "video") {
        if (block_height) {
          style.height = block_height;
        } else if (block_aspect_ratio) {
          style.paddingBottom = `${block_aspect_ratio * 100}%`;
        } else if (block_preserve_scale) {
          style.objectFit = "contain";
        }
      } else if (block_aspect_ratio && block.type !== "image") {
        style.paddingBottom = `${block_aspect_ratio * 100}%`;
      } else if (block_height) {
        style.height = block_height;
      } else if (block_preserve_scale) {
        if (block.type === "image") {
          style.height = "100%";
        } else {
          style.paddingBottom = "75%";
          style.minHeight = 100;
        }
      }
    } else {
      switch ((_a = block.format) == null ? void 0 : _a.block_alignment) {
        case "center": {
          style.alignSelf = "center";
          break;
        }
        case "left": {
          style.alignSelf = "start";
          break;
        }
        case "right": {
          style.alignSelf = "end";
          break;
        }
      }
      if (block_width) {
        style.width = block_width;
      }
      if (block_preserve_scale && block.type !== "image") {
        style.paddingBottom = "50%";
        style.minHeight = 100;
      } else {
        if (block_height && block.type !== "image") {
          style.height = block_height;
        }
      }
    }
    if (block.type === "image") {
      assetStyle.objectFit = "cover";
    } else if (block_preserve_scale) {
      assetStyle.objectFit = "contain";
    }
  }
  const source = ((_b = recordMap.signed_urls) == null ? void 0 : _b[block.id]) || ((_e = (_d = (_c = block.properties) == null ? void 0 : _c.source) == null ? void 0 : _d[0]) == null ? void 0 : _e[0]);
  let content = null;
  if (!source) {
    return null;
  }
  if (block.type === "tweet") {
    const src = source;
    if (!src)
      return null;
    const id = src.split("?")[0].split("/").pop();
    if (!id)
      return null;
    content = /* @__PURE__ */ React15.createElement("div", {
      style: __spreadProps(__spreadValues({}, assetStyle), {
        maxWidth: 420,
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto"
      })
    }, /* @__PURE__ */ React15.createElement(components.Tweet, {
      id
    }));
  } else if (block.type === "pdf") {
    style.overflow = "auto";
    style.background = "rgb(226, 226, 226)";
    if (!style.padding) {
      style.padding = "8px 16px";
    }
    if (!isServer) {
      content = /* @__PURE__ */ React15.createElement(components.Pdf, {
        file: source
      });
    }
  } else if (block.type === "embed" || block.type === "video" || block.type === "figma" || block.type === "typeform" || block.type === "gist" || block.type === "maps" || block.type === "excalidraw" || block.type === "codepen" || block.type === "drive") {
    if (block.type === "video" && source && source.indexOf("youtube") < 0 && source.indexOf("youtu.be") < 0 && source.indexOf("vimeo") < 0 && source.indexOf("wistia") < 0 && source.indexOf("loom") < 0 && source.indexOf("videoask") < 0 && source.indexOf("getcloudapp") < 0) {
      style.paddingBottom = void 0;
      content = /* @__PURE__ */ React15.createElement("video", {
        playsInline: true,
        controls: true,
        preload: "metadata",
        style: assetStyle,
        src: source,
        title: block.type
      });
    } else {
      let src = ((_f = block.format) == null ? void 0 : _f.display_source) || source;
      if (src) {
        const youtubeVideoId = block.type === "video" ? getYoutubeId(src) : null;
        if (youtubeVideoId) {
          content = /* @__PURE__ */ React15.createElement(LiteYouTubeEmbed, {
            id: youtubeVideoId,
            style: assetStyle,
            className: "notion-asset-object-fit"
          });
        } else if (block.type === "gist") {
          if (!src.endsWith(".pibb")) {
            src = `${src}.pibb`;
          }
          assetStyle.width = "100%";
          style.paddingBottom = "50%";
          content = /* @__PURE__ */ React15.createElement("iframe", {
            style: assetStyle,
            className: "notion-asset-object-fit",
            src,
            title: "GitHub Gist",
            frameBorder: "0",
            loading: "lazy",
            scrolling: "auto"
          });
        } else {
          content = /* @__PURE__ */ React15.createElement("iframe", {
            className: "notion-asset-object-fit",
            style: assetStyle,
            src,
            title: `iframe ${block.type}`,
            frameBorder: "0",
            allowFullScreen: true,
            loading: "lazy",
            scrolling: "auto"
          });
        }
      }
    }
  } else if (block.type === "image") {
    const src = mapImageUrl(source, block);
    const caption = getTextContent((_g = block.properties) == null ? void 0 : _g.caption);
    const alt = caption || "notion image";
    content = /* @__PURE__ */ React15.createElement(LazyImage, {
      src,
      alt,
      zoomable,
      height: style.height,
      style: assetStyle
    });
  }
  return /* @__PURE__ */ React15.createElement(React15.Fragment, null, /* @__PURE__ */ React15.createElement("div", {
    style
  }, content, block.type === "image" && children), block.type !== "image" && children);
};

// src/components/asset-wrapper.tsx
var urlStyle = { width: "100%" };
var AssetWrapper = ({ blockId, block }) => {
  var _a, _b, _c, _d, _e, _f;
  const value = block;
  const { components, mapPageUrl, rootDomain, zoom } = useNotionContext();
  let isURL = false;
  if (block.type === "image") {
    const caption = (_c = (_b = (_a = value == null ? void 0 : value.properties) == null ? void 0 : _a.caption) == null ? void 0 : _b[0]) == null ? void 0 : _c[0];
    if (caption) {
      const id = parsePageId2(caption, { uuid: true });
      const isPage = caption.charAt(0) === "/" && id;
      if (isPage || isValidURL(caption)) {
        isURL = true;
      }
    }
  }
  const figure = /* @__PURE__ */ React16.createElement("figure", {
    className: cs(
      "notion-asset-wrapper",
      `notion-asset-wrapper-${block.type}`,
      ((_d = value.format) == null ? void 0 : _d.block_full_width) && "notion-asset-wrapper-full",
      blockId
    )
  }, /* @__PURE__ */ React16.createElement(Asset, {
    block: value,
    zoomable: zoom && !isURL
  }, ((_e = value == null ? void 0 : value.properties) == null ? void 0 : _e.caption) && !isURL && /* @__PURE__ */ React16.createElement("figcaption", {
    className: "notion-asset-caption"
  }, /* @__PURE__ */ React16.createElement(Text, {
    value: value.properties.caption,
    block
  }))));
  if (isURL) {
    const caption = (_f = value == null ? void 0 : value.properties) == null ? void 0 : _f.caption[0][0];
    const id = parsePageId2(caption, { uuid: true });
    const isPage = caption.charAt(0) === "/" && id;
    const captionHostname = extractHostname(caption);
    return /* @__PURE__ */ React16.createElement(components.PageLink, {
      style: urlStyle,
      href: isPage ? mapPageUrl(id) : caption,
      target: captionHostname && captionHostname !== rootDomain && !caption.startsWith("/") ? "blank_" : null
    }, figure);
  }
  return figure;
};
function isValidURL(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(str);
}
function extractHostname(url) {
  try {
    const hostname = new URL(url).hostname;
    return hostname;
  } catch (err) {
    return "";
  }
}

// src/components/checkbox.tsx
import * as React18 from "react";

// src/icons/check.tsx
import * as React17 from "react";
function SvgCheck(props) {
  return /* @__PURE__ */ React17.createElement("svg", __spreadValues({
    viewBox: "0 0 14 14"
  }, props), /* @__PURE__ */ React17.createElement("path", {
    d: "M5.5 12L14 3.5 12.5 2l-7 7-4-4.003L0 6.499z"
  }));
}
var check_default = SvgCheck;

// src/components/checkbox.tsx
var Checkbox = ({ isChecked }) => {
  let content = null;
  if (isChecked) {
    content = /* @__PURE__ */ React18.createElement("div", {
      className: "notion-property-checkbox-checked"
    }, /* @__PURE__ */ React18.createElement(check_default, null));
  } else {
    content = /* @__PURE__ */ React18.createElement("div", {
      className: "notion-property-checkbox-unchecked"
    });
  }
  return /* @__PURE__ */ React18.createElement("span", {
    className: "notion-property notion-property-checkbox"
  }, content);
};

// src/next.tsx
import * as React19 from "react";
import isEqual from "react-fast-compare";
var wrapNextImage = (NextImage) => {
  return React19.memo(function ReactNotionXNextImage(_a) {
    var _b = _a, {
      src,
      alt,
      width,
      height,
      className,
      style,
      layout
    } = _b, rest = __objRest(_b, [
      "src",
      "alt",
      "width",
      "height",
      "className",
      "style",
      "layout"
    ]);
    if (!layout) {
      layout = width && height ? "intrinsic" : "fill";
    }
    return /* @__PURE__ */ React19.createElement(NextImage, __spreadValues({
      className,
      src,
      alt,
      width: layout === "intrinsic" && width,
      height: layout === "intrinsic" && height,
      objectFit: style == null ? void 0 : style.objectFit,
      objectPosition: style == null ? void 0 : style.objectPosition,
      layout
    }, rest));
  }, isEqual);
};
var wrapNextLink = (NextLink) => function ReactNotionXNextLink(_a) {
  var _b = _a, {
    href,
    as,
    passHref,
    prefetch,
    replace,
    scroll,
    shallow,
    locale
  } = _b, linkProps = __objRest(_b, [
    "href",
    "as",
    "passHref",
    "prefetch",
    "replace",
    "scroll",
    "shallow",
    "locale"
  ]);
  return /* @__PURE__ */ React19.createElement(NextLink, {
    href,
    as,
    passHref,
    prefetch,
    replace,
    scroll,
    shallow,
    locale
  }, /* @__PURE__ */ React19.createElement("a", __spreadValues({}, linkProps)));
};

// src/context.tsx
var DefaultLink = (props) => /* @__PURE__ */ React20.createElement("a", __spreadValues({
  target: "_blank",
  rel: "noopener noreferrer"
}, props));
var DefaultLinkMemo = React20.memo(DefaultLink);
var DefaultPageLink = (props) => /* @__PURE__ */ React20.createElement("a", __spreadValues({}, props));
var DefaultPageLinkMemo = React20.memo(DefaultPageLink);
var DefaultEmbed = (props) => /* @__PURE__ */ React20.createElement(AssetWrapper, __spreadValues({}, props));
var DefaultHeader = Header;
var dummyComponent = (name) => () => {
  console.warn(
    `Warning: using empty component "${name}" (you should override this in NotionRenderer.components)`
  );
  return null;
};
var dummyOverrideFn = (_, defaultValueFn) => defaultValueFn();
var defaultComponents = {
  Image: null,
  Link: DefaultLinkMemo,
  PageLink: DefaultPageLinkMemo,
  Checkbox,
  Callout: void 0,
  Code: dummyComponent("Code"),
  Equation: dummyComponent("Equation"),
  Collection: dummyComponent("Collection"),
  Property: void 0,
  propertyTextValue: dummyOverrideFn,
  propertySelectValue: dummyOverrideFn,
  propertyRelationValue: dummyOverrideFn,
  propertyFormulaValue: dummyOverrideFn,
  propertyTitleValue: dummyOverrideFn,
  propertyPersonValue: dummyOverrideFn,
  propertyFileValue: dummyOverrideFn,
  propertyCheckboxValue: dummyOverrideFn,
  propertyUrlValue: dummyOverrideFn,
  propertyEmailValue: dummyOverrideFn,
  propertyPhoneNumberValue: dummyOverrideFn,
  propertyNumberValue: dummyOverrideFn,
  propertyLastEditedTimeValue: dummyOverrideFn,
  propertyCreatedTimeValue: dummyOverrideFn,
  propertyDateValue: dummyOverrideFn,
  Pdf: dummyComponent("Pdf"),
  Tweet: dummyComponent("Tweet"),
  Modal: dummyComponent("Modal"),
  Header: DefaultHeader,
  Embed: DefaultEmbed
};
var defaultNotionContext = {
  recordMap: {
    block: {},
    collection: {},
    collection_view: {},
    collection_query: {},
    notion_user: {},
    signed_urls: {}
  },
  components: defaultComponents,
  mapPageUrl: defaultMapPageUrl(),
  mapImageUrl: defaultMapImageUrl,
  searchNotion: null,
  isShowingSearch: false,
  onHideSearch: null,
  fullPage: false,
  darkMode: false,
  previewImages: false,
  forceCustomImages: false,
  showCollectionViewDropdown: true,
  linkTableTitleProperties: true,
  isLinkCollectionToUrlProperty: false,
  showTableOfContents: false,
  minTableOfContentsItems: 3,
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,
  zoom: null
};
var ctx = React20.createContext(defaultNotionContext);
var NotionContextProvider = (_a) => {
  var _b = _a, {
    components: themeComponents = {},
    children,
    mapPageUrl,
    mapImageUrl,
    rootPageId
  } = _b, rest = __objRest(_b, [
    "components",
    "children",
    "mapPageUrl",
    "mapImageUrl",
    "rootPageId"
  ]);
  for (const key of Object.keys(rest)) {
    if (rest[key] === void 0) {
      delete rest[key];
    }
  }
  const wrappedThemeComponents = React20.useMemo(
    () => __spreadValues({}, themeComponents),
    [themeComponents]
  );
  if (wrappedThemeComponents.nextImage) {
    wrappedThemeComponents.Image = wrapNextImage(themeComponents.nextImage);
  }
  if (wrappedThemeComponents.nextLink) {
    wrappedThemeComponents.nextLink = wrapNextLink(themeComponents.nextLink);
  }
  for (const key of Object.keys(wrappedThemeComponents)) {
    if (!wrappedThemeComponents[key]) {
      delete wrappedThemeComponents[key];
    }
  }
  const value = React20.useMemo(
    () => __spreadProps(__spreadValues(__spreadValues({}, defaultNotionContext), rest), {
      rootPageId,
      mapPageUrl: mapPageUrl != null ? mapPageUrl : defaultMapPageUrl(rootPageId),
      mapImageUrl: mapImageUrl != null ? mapImageUrl : defaultMapImageUrl,
      components: __spreadValues(__spreadValues({}, defaultComponents), wrappedThemeComponents)
    }),
    [mapImageUrl, mapPageUrl, wrappedThemeComponents, rootPageId, rest]
  );
  return /* @__PURE__ */ React20.createElement(ctx.Provider, {
    value
  }, children);
};
var NotionContextConsumer = ctx.Consumer;
var useNotionContext = () => {
  return React20.useContext(ctx);
};

// src/third-party/equation.tsx
var katexSettings = {
  throwOnError: false,
  strict: false
};
var Equation = (_a) => {
  var _b = _a, { block, math, inline = false, className } = _b, rest = __objRest(_b, ["block", "math", "inline", "className"]);
  const { recordMap } = useNotionContext();
  math = math || getBlockTitle4(block, recordMap);
  if (!math)
    return null;
  return /* @__PURE__ */ React21.createElement("span", {
    role: "button",
    tabIndex: 0,
    className: cs(
      "notion-equation",
      inline ? "notion-equation-inline" : "notion-equation-block",
      className
    )
  }, /* @__PURE__ */ React21.createElement(Katex, __spreadValues({
    math,
    settings: katexSettings
  }, rest)));
};
export {
  Equation
};
