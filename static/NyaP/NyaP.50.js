(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

_Object$defineProperty(exports, "NyaPlayerCore", {
  enumerable: true,
  get: function () {
    return _core.NyaPlayerCore;
  }
});

_Object$defineProperty(exports, "DomTools", {
  enumerable: true,
  get: function () {
    return _domTools.DomTools;
  }
});

_Object$defineProperty(exports, "i18n", {
  enumerable: true,
  get: function () {
    return _i18n.i18n;
  }
});

_Object$defineProperty(exports, "Utils", {
  enumerable: true,
  get: function () {
    return _utils.Utils;
  }
});

var _core = require("./src/core.js");

var _domTools = require("./src/domTools.js");

var _i18n = require("./src/i18n.js");

var _utils = require("./src/utils.js");

},{"./src/core.js":4,"./src/domTools.js":5,"./src/i18n.js":6,"./src/utils.js":7,"@babel/runtime-corejs3/core-js-stable/object/define-property":32}],2:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.Object2HTML = Object2HTML;
exports.default = void 0;

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/entries"));

/*
Copyright luojia@luojia.me
LGPL license
*/
function Object2HTML(obj, func) {
  let ele,
      o = {},
      a = [];
  if (obj === null || typeof obj !== 'object') ele = document.createTextNode(String(obj)); //text node
  else if (obj instanceof Node) ele = obj;else {
      if (obj === undefined) throw new TypeError(`'undefined' received, object or string expect.`);
      if (!obj._) obj._ = 'div';
      ele || (ele = document.createElement(obj._)); //attributes

      for (let [attr, value] of (0, _entries.default)(obj.attr || obj.a || o)) ele.setAttribute(attr, value); //properties


      for (let [prop, value] of (0, _entries.default)(obj.prop || obj.p || o)) ele[prop] = value; //events


      for (let [e, cb] of (0, _entries.default)(obj.event || obj.e || o)) ele.addEventListener(e, cb); //childNodes


      for (let c of obj.child || obj.c || a) {
        let e = Object2HTML(c, func);
        e instanceof Node && ele.appendChild(e);
      }
    }
  func && func(ele);
  return ele;
}

var _default = Object2HTML;
exports.default = _default;

},{"@babel/runtime-corejs3/core-js-stable/object/define-property":32,"@babel/runtime-corejs3/core-js-stable/object/entries":33,"@babel/runtime-corejs3/helpers/interopRequireDefault":41}],3:[function(require,module,exports){
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.ResizeObserver = {}));
}(this, (function (exports) { 'use strict';

    var resizeObservers = [];

    var hasActiveObservations = function () {
        return resizeObservers.some(function (ro) { return ro.activeTargets.length > 0; });
    };

    var hasSkippedObservations = function () {
        return resizeObservers.some(function (ro) { return ro.skippedTargets.length > 0; });
    };

    var msg = 'ResizeObserver loop completed with undelivered notifications.';
    var deliverResizeLoopError = function () {
        var event;
        if (typeof ErrorEvent === 'function') {
            event = new ErrorEvent('error', {
                message: msg
            });
        }
        else {
            event = document.createEvent('Event');
            event.initEvent('error', false, false);
            event.message = msg;
        }
        window.dispatchEvent(event);
    };

    var ResizeObserverBoxOptions;
    (function (ResizeObserverBoxOptions) {
        ResizeObserverBoxOptions["BORDER_BOX"] = "border-box";
        ResizeObserverBoxOptions["CONTENT_BOX"] = "content-box";
        ResizeObserverBoxOptions["DEVICE_PIXEL_CONTENT_BOX"] = "device-pixel-content-box";
    })(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {}));

    var DOMRectReadOnly = (function () {
        function DOMRectReadOnly(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.top = this.y;
            this.left = this.x;
            this.bottom = this.top + this.height;
            this.right = this.left + this.width;
            return Object.freeze(this);
        }
        DOMRectReadOnly.prototype.toJSON = function () {
            var _a = this, x = _a.x, y = _a.y, top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left, width = _a.width, height = _a.height;
            return { x: x, y: y, top: top, right: right, bottom: bottom, left: left, width: width, height: height };
        };
        DOMRectReadOnly.fromRect = function (rectangle) {
            return new DOMRectReadOnly(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        };
        return DOMRectReadOnly;
    }());

    var isSVG = function (target) { return target instanceof SVGElement && 'getBBox' in target; };
    var isHidden = function (target) {
        if (isSVG(target)) {
            var _a = target.getBBox(), width = _a.width, height = _a.height;
            return !width && !height;
        }
        var _b = target, offsetWidth = _b.offsetWidth, offsetHeight = _b.offsetHeight;
        return !(offsetWidth || offsetHeight || target.getClientRects().length);
    };
    var isElement = function (obj) {
        var _a, _b;
        var scope = (_b = (_a = obj) === null || _a === void 0 ? void 0 : _a.ownerDocument) === null || _b === void 0 ? void 0 : _b.defaultView;
        return !!(scope && obj instanceof scope.Element);
    };
    var isReplacedElement = function (target) {
        switch (target.tagName) {
            case 'INPUT':
                if (target.type !== 'image') {
                    break;
                }
            case 'VIDEO':
            case 'AUDIO':
            case 'EMBED':
            case 'OBJECT':
            case 'CANVAS':
            case 'IFRAME':
            case 'IMG':
                return true;
        }
        return false;
    };

    var global = typeof window !== 'undefined' ? window : {};

    var cache = new Map();
    var scrollRegexp = /auto|scroll/;
    var verticalRegexp = /^tb|vertical/;
    var IE = (/msie|trident/i).test(global.navigator && global.navigator.userAgent);
    var parseDimension = function (pixel) { return parseFloat(pixel || '0'); };
    var size = function (inlineSize, blockSize, switchSizes) {
        if (inlineSize === void 0) { inlineSize = 0; }
        if (blockSize === void 0) { blockSize = 0; }
        if (switchSizes === void 0) { switchSizes = false; }
        return Object.freeze({
            inlineSize: (switchSizes ? blockSize : inlineSize) || 0,
            blockSize: (switchSizes ? inlineSize : blockSize) || 0
        });
    };
    var zeroBoxes = Object.freeze({
        devicePixelContentBoxSize: size(),
        borderBoxSize: size(),
        contentBoxSize: size(),
        contentRect: new DOMRectReadOnly(0, 0, 0, 0)
    });
    var calculateBoxSizes = function (target) {
        if (cache.has(target)) {
            return cache.get(target);
        }
        if (isHidden(target)) {
            cache.set(target, zeroBoxes);
            return zeroBoxes;
        }
        var cs = getComputedStyle(target);
        var svg = isSVG(target) && target.ownerSVGElement && target.getBBox();
        var removePadding = !IE && cs.boxSizing === 'border-box';
        var switchSizes = verticalRegexp.test(cs.writingMode || '');
        var canScrollVertically = !svg && scrollRegexp.test(cs.overflowY || '');
        var canScrollHorizontally = !svg && scrollRegexp.test(cs.overflowX || '');
        var paddingTop = svg ? 0 : parseDimension(cs.paddingTop);
        var paddingRight = svg ? 0 : parseDimension(cs.paddingRight);
        var paddingBottom = svg ? 0 : parseDimension(cs.paddingBottom);
        var paddingLeft = svg ? 0 : parseDimension(cs.paddingLeft);
        var borderTop = svg ? 0 : parseDimension(cs.borderTopWidth);
        var borderRight = svg ? 0 : parseDimension(cs.borderRightWidth);
        var borderBottom = svg ? 0 : parseDimension(cs.borderBottomWidth);
        var borderLeft = svg ? 0 : parseDimension(cs.borderLeftWidth);
        var horizontalPadding = paddingLeft + paddingRight;
        var verticalPadding = paddingTop + paddingBottom;
        var horizontalBorderArea = borderLeft + borderRight;
        var verticalBorderArea = borderTop + borderBottom;
        var horizontalScrollbarThickness = !canScrollHorizontally ? 0 : target.offsetHeight - verticalBorderArea - target.clientHeight;
        var verticalScrollbarThickness = !canScrollVertically ? 0 : target.offsetWidth - horizontalBorderArea - target.clientWidth;
        var widthReduction = removePadding ? horizontalPadding + horizontalBorderArea : 0;
        var heightReduction = removePadding ? verticalPadding + verticalBorderArea : 0;
        var contentWidth = svg ? svg.width : parseDimension(cs.width) - widthReduction - verticalScrollbarThickness;
        var contentHeight = svg ? svg.height : parseDimension(cs.height) - heightReduction - horizontalScrollbarThickness;
        var borderBoxWidth = contentWidth + horizontalPadding + verticalScrollbarThickness + horizontalBorderArea;
        var borderBoxHeight = contentHeight + verticalPadding + horizontalScrollbarThickness + verticalBorderArea;
        var boxes = Object.freeze({
            devicePixelContentBoxSize: size(Math.round(contentWidth * devicePixelRatio), Math.round(contentHeight * devicePixelRatio), switchSizes),
            borderBoxSize: size(borderBoxWidth, borderBoxHeight, switchSizes),
            contentBoxSize: size(contentWidth, contentHeight, switchSizes),
            contentRect: new DOMRectReadOnly(paddingLeft, paddingTop, contentWidth, contentHeight)
        });
        cache.set(target, boxes);
        return boxes;
    };
    var calculateBoxSize = function (target, observedBox) {
        var _a = calculateBoxSizes(target), borderBoxSize = _a.borderBoxSize, contentBoxSize = _a.contentBoxSize, devicePixelContentBoxSize = _a.devicePixelContentBoxSize;
        switch (observedBox) {
            case ResizeObserverBoxOptions.DEVICE_PIXEL_CONTENT_BOX:
                return devicePixelContentBoxSize;
            case ResizeObserverBoxOptions.BORDER_BOX:
                return borderBoxSize;
            default:
                return contentBoxSize;
        }
    };

    var ResizeObserverEntry = (function () {
        function ResizeObserverEntry(target) {
            var boxes = calculateBoxSizes(target);
            this.target = target;
            this.contentRect = boxes.contentRect;
            this.borderBoxSize = [boxes.borderBoxSize];
            this.contentBoxSize = [boxes.contentBoxSize];
            this.devicePixelContentBoxSize = [boxes.devicePixelContentBoxSize];
        }
        return ResizeObserverEntry;
    }());

    var calculateDepthForNode = function (node) {
        if (isHidden(node)) {
            return Infinity;
        }
        var depth = 0;
        var parent = node.parentNode;
        while (parent) {
            depth += 1;
            parent = parent.parentNode;
        }
        return depth;
    };

    var broadcastActiveObservations = function () {
        var shallowestDepth = Infinity;
        var callbacks = [];
        resizeObservers.forEach(function processObserver(ro) {
            if (ro.activeTargets.length === 0) {
                return;
            }
            var entries = [];
            ro.activeTargets.forEach(function processTarget(ot) {
                var entry = new ResizeObserverEntry(ot.target);
                var targetDepth = calculateDepthForNode(ot.target);
                entries.push(entry);
                ot.lastReportedSize = calculateBoxSize(ot.target, ot.observedBox);
                if (targetDepth < shallowestDepth) {
                    shallowestDepth = targetDepth;
                }
            });
            callbacks.push(function resizeObserverCallback() {
                ro.callback.call(ro.observer, entries, ro.observer);
            });
            ro.activeTargets.splice(0, ro.activeTargets.length);
        });
        for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
            var callback = callbacks_1[_i];
            callback();
        }
        return shallowestDepth;
    };

    var gatherActiveObservationsAtDepth = function (depth) {
        cache.clear();
        resizeObservers.forEach(function processObserver(ro) {
            ro.activeTargets.splice(0, ro.activeTargets.length);
            ro.skippedTargets.splice(0, ro.skippedTargets.length);
            ro.observationTargets.forEach(function processTarget(ot) {
                if (ot.isActive()) {
                    if (calculateDepthForNode(ot.target) > depth) {
                        ro.activeTargets.push(ot);
                    }
                    else {
                        ro.skippedTargets.push(ot);
                    }
                }
            });
        });
    };

    var process = function () {
        var depth = 0;
        gatherActiveObservationsAtDepth(depth);
        while (hasActiveObservations()) {
            depth = broadcastActiveObservations();
            gatherActiveObservationsAtDepth(depth);
        }
        if (hasSkippedObservations()) {
            deliverResizeLoopError();
        }
        return depth > 0;
    };

    var trigger;
    var callbacks = [];
    var notify = function () { return callbacks.splice(0).forEach(function (cb) { return cb(); }); };
    var queueMicroTask = function (callback) {
        if (!trigger) {
            var el_1 = document.createTextNode('');
            var config = { characterData: true };
            new MutationObserver(function () { return notify(); }).observe(el_1, config);
            trigger = function () { el_1.textContent = ''; };
        }
        callbacks.push(callback);
        trigger();
    };

    var queueResizeObserver = function (cb) {
        queueMicroTask(function ResizeObserver() {
            requestAnimationFrame(cb);
        });
    };

    var watching = 0;
    var isWatching = function () { return !!watching; };
    var CATCH_FRAMES = 60 / 5;
    var observerConfig = { attributes: true, characterData: true, childList: true, subtree: true };
    var events = [
        'resize',
        'load',
        'transitionend',
        'animationend',
        'animationstart',
        'animationiteration',
        'keyup',
        'keydown',
        'mouseup',
        'mousedown',
        'mouseover',
        'mouseout',
        'blur',
        'focus'
    ];
    var scheduled = false;
    var Scheduler = (function () {
        function Scheduler() {
            var _this = this;
            this.stopped = true;
            this.listener = function () { return _this.schedule(); };
        }
        Scheduler.prototype.run = function (frames) {
            var _this = this;
            if (scheduled) {
                return;
            }
            scheduled = true;
            queueResizeObserver(function () {
                var elementsHaveResized = false;
                try {
                    elementsHaveResized = process();
                }
                finally {
                    scheduled = false;
                    if (!isWatching()) {
                        return;
                    }
                    if (elementsHaveResized) {
                        _this.run(60);
                    }
                    else if (frames) {
                        _this.run(frames - 1);
                    }
                    else {
                        _this.start();
                    }
                }
            });
        };
        Scheduler.prototype.schedule = function () {
            this.stop();
            this.run(CATCH_FRAMES);
        };
        Scheduler.prototype.observe = function () {
            var _this = this;
            var cb = function () { return _this.observer && _this.observer.observe(document.body, observerConfig); };
            document.body ? cb() : global.addEventListener('DOMContentLoaded', cb);
        };
        Scheduler.prototype.start = function () {
            var _this = this;
            if (this.stopped) {
                this.stopped = false;
                this.observer = new MutationObserver(this.listener);
                this.observe();
                events.forEach(function (name) { return global.addEventListener(name, _this.listener, true); });
            }
        };
        Scheduler.prototype.stop = function () {
            var _this = this;
            if (!this.stopped) {
                this.observer && this.observer.disconnect();
                events.forEach(function (name) { return global.removeEventListener(name, _this.listener, true); });
                this.stopped = true;
            }
        };
        return Scheduler;
    }());
    var scheduler = new Scheduler();
    var updateCount = function (n) {
        !watching && n > 0 && scheduler.start();
        watching += n;
        !watching && scheduler.stop();
    };

    var skipNotifyOnElement = function (target) {
        return !isSVG(target)
            && !isReplacedElement(target)
            && getComputedStyle(target).display === 'inline';
    };
    var ResizeObservation = (function () {
        function ResizeObservation(target, observedBox) {
            this.target = target;
            this.observedBox = observedBox || ResizeObserverBoxOptions.CONTENT_BOX;
            this.lastReportedSize = {
                inlineSize: 0,
                blockSize: 0
            };
        }
        ResizeObservation.prototype.isActive = function () {
            var size = calculateBoxSize(this.target, this.observedBox);
            if (skipNotifyOnElement(this.target)) {
                this.lastReportedSize = size;
            }
            if (this.lastReportedSize.inlineSize !== size.inlineSize
                || this.lastReportedSize.blockSize !== size.blockSize) {
                return true;
            }
            return false;
        };
        return ResizeObservation;
    }());

    var ResizeObserverDetail = (function () {
        function ResizeObserverDetail(resizeObserver, callback) {
            this.activeTargets = [];
            this.skippedTargets = [];
            this.observationTargets = [];
            this.observer = resizeObserver;
            this.callback = callback;
        }
        return ResizeObserverDetail;
    }());

    var observerMap = new Map();
    var getObservationIndex = function (observationTargets, target) {
        for (var i = 0; i < observationTargets.length; i += 1) {
            if (observationTargets[i].target === target) {
                return i;
            }
        }
        return -1;
    };
    var ResizeObserverController = (function () {
        function ResizeObserverController() {
        }
        ResizeObserverController.connect = function (resizeObserver, callback) {
            var detail = new ResizeObserverDetail(resizeObserver, callback);
            resizeObservers.push(detail);
            observerMap.set(resizeObserver, detail);
        };
        ResizeObserverController.observe = function (resizeObserver, target, options) {
            if (observerMap.has(resizeObserver)) {
                var detail = observerMap.get(resizeObserver);
                if (getObservationIndex(detail.observationTargets, target) < 0) {
                    detail.observationTargets.push(new ResizeObservation(target, options && options.box));
                    updateCount(1);
                    scheduler.schedule();
                }
            }
        };
        ResizeObserverController.unobserve = function (resizeObserver, target) {
            if (observerMap.has(resizeObserver)) {
                var detail = observerMap.get(resizeObserver);
                var index = getObservationIndex(detail.observationTargets, target);
                if (index >= 0) {
                    detail.observationTargets.splice(index, 1);
                    updateCount(-1);
                }
            }
        };
        ResizeObserverController.disconnect = function (resizeObserver) {
            if (observerMap.has(resizeObserver)) {
                var detail = observerMap.get(resizeObserver);
                resizeObservers.splice(resizeObservers.indexOf(detail), 1);
                observerMap.delete(resizeObserver);
                updateCount(-detail.observationTargets.length);
            }
        };
        return ResizeObserverController;
    }());

    var ResizeObserver = (function () {
        function ResizeObserver(callback) {
            if (arguments.length === 0) {
                throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
            }
            if (typeof callback !== 'function') {
                throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
            }
            ResizeObserverController.connect(this, callback);
        }
        ResizeObserver.prototype.observe = function (target, options) {
            if (arguments.length === 0) {
                throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
            }
            if (!isElement(target)) {
                throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
            }
            ResizeObserverController.observe(this, target, options);
        };
        ResizeObserver.prototype.unobserve = function (target) {
            if (arguments.length === 0) {
                throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
            }
            if (!isElement(target)) {
                throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
            }
            ResizeObserverController.unobserve(this, target);
        };
        ResizeObserver.prototype.disconnect = function () {
            ResizeObserverController.disconnect(this);
        };
        ResizeObserver.toString = function () {
            return 'function ResizeObserver () { [polyfill code] }';
        };
        return ResizeObserver;
    }());

    exports.ResizeObserver = ResizeObserver;
    exports.ResizeObserverEntry = ResizeObserverEntry;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],4:[function(require,module,exports){
/*
Copyright luojia@luojia.me
LGPL license
*/
'use strict';

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.NyaPlayerCore = void 0;

var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/trim"));

var _sort = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/sort"));

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _now = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/date/now"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _i18n = require("./i18n.js");

var _domTools = require("./domTools.js");

var _utils = require("./utils.js");

//default options
const NyaPCoreOptions = {
  //for video
  muted: false,
  //set video muted
  volume: 1,
  //set volume (0 ~ 1) 
  loop: false,
  //set video loop
  videoSrc: '',
  plugins: [] //NyaP dynamic plugins list

};

class NyaPEventEmitter {
  constructor() {
    this._events = {};
  }

  emit(e, ...args) {
    this._resolve(e, ...args);

    this.globalListener(e, ...args);
    return this;
  }

  _resolve(e, ...args) {
    if (e in this._events) {
      const hs = this._events[e];

      try {
        for (let h of hs) {
          if (h.apply(this, args) === false) return;
        }
      } catch (err) {
        console.error(`NyaP event callback error for "${e}"`, err);
      }
    }
  }

  addEventListener(...args) {
    return this.on(...args);
  }

  on(e, handle, top = false) {
    if (!(handle instanceof Function)) return this;
    if (!(e in this._events)) this._events[e] = [];
    if (top) this._events[e].unshift(handle);else this._events[e].push(handle);
    return this;
  }

  removeEvent(e, handle) {
    var _context, _context2;

    if (!(e in this._events)) return this;

    if (arguments.length === 1) {
      delete this._events[e];
      return this;
    }

    let ind;
    if (ind = (0, _indexOf.default)(_context = this._events[e]).call(_context, handle) >= 0) (0, _splice.default)(_context2 = this._events[e]).call(_context2, ind, 1);
    if (this._events[e].length === 0) delete this._events[e];
    return this;
  }

  globalListener(name, ...args) {} //all events will be passed to this function


}

class NyaPlayerCore extends NyaPEventEmitter {
  //stats of the player. Item: [[time,name,promise or result],...]
  //debug messages. Item: [[time,...msgs],...]
  //loaded core plugins. name=>plugin object
  //core i18n instanse
  get video() {
    return this._.video;
  } //get video element


  get videoSize() {
    return [this.video.videoWidth, this.video.videoHeight];
  }

  get videoSrc() {
    return this._.videoSrc;
  } //get current video src


  constructor(opt) {
    super();
    (0, _defineProperty3.default)(this, "stats", []);
    (0, _defineProperty3.default)(this, "debugs", []);
    (0, _defineProperty3.default)(this, "plugins", {});
    (0, _defineProperty3.default)(this, "i18n", new _i18n.i18n());
    (0, _defineProperty3.default)(this, "_", {
      //for private variables, do not change vars here
      videoSrc: '',
      video: _domTools.DomTools.Object2HTML({
        _: 'video',
        attr: {
          id: 'main_video',
          'webkit-playsinline': '',
          'playsinline': '',
          'x5-playsinline': '',
          'x-webkit-airplay': 'allow',
          'controlsList': "nodownload",
          'x5-video-player-type': 'h5',
          'preload': 'auto',
          'poster': ''
        }
      }),
      urlResolvers: [] //functions to resolve urls. Item: [priority,func]

    });
    let _ = this.i18n;
    {
      let done = this.stat('loading_core');
      this.on('coreLoad', () => done());
      this.on('coreLoadError', e => done(e));
    }
    this.log('%c https://github.com/JiaJiaJiang/NyaP-Core/ ', 'log', "background:#6f8fa2;color:#ccc;padding:.3em");
    this.debug('Languages:' + this.i18n.langsArr.join(','));
    opt = this.opt = _utils.Utils.deepAssign({}, NyaPCoreOptions, opt); //add events

    {
      //video:video_loopChange
      let LoopDesc = (0, _getOwnPropertyDescriptor.default)(HTMLMediaElement.prototype, 'loop');
      (0, _defineProperty2.default)(this.video, 'loop', {
        get: LoopDesc.get,
        set: bool => {
          if (bool === this.video.loop) return;
          this.emit('video_loopChange', bool);
          LoopDesc.set.call(this.video, bool);
        }
      });
    }
    ;

    _domTools.DomTools.addEvents(this.video, {
      loadedmetadata: e => this.debug('Video loadded'),
      error: e => this.debug('Video error:', e),
      loadstart: e => {
        this.stat('loading_video');
      }
    }); //define default src resolver


    this.addURLResolver(url => {
      return _promise.default.resolve(url); //return the url
    }, 999); //most lower priority

    /*opts*/

    requestAnimationFrame(() => {
      var _context3;

      //active after events are attached
      (0, _forEach.default)(_context3 = ['muted', 'volume', 'loop']).call(_context3, o => {
        //dont change the order
        opt[o] !== undefined && (this.video[o] = opt[o]);
      });
      if (opt.videoSrc) this.setVideoSrc(opt.videoSrc); //videoSrc
    });

    if ((0, _isArray.default)(opt.plugins)) {
      //load plugins,opt.plugins is a list of url for plugins
      let done = this.stat('loading_plugin');
      let pluginList = [];

      for (let url of opt.plugins) {
        pluginList.push(this.loadPlugin(url));
      }

      _promise.default.all(pluginList).then(() => {
        done();
        this.emit('coreLoad');
      }).catch(e => {
        done(e);
        this.debug('coreLoadError', e);
        this.emit('coreLoadError', e);
      });

      return;
    }

    this.emit('coreLoad');
  }

  stat(statusName, cb) {
    let doneFunc, failFunc;

    let resultFunc = r => {
      if (r instanceof Error) {
        this.debug(r);
        failFunc(r.message);
      } else {
        doneFunc(r);
      }
    };

    let p = new _promise.default((ok, no) => {
      doneFunc = ok;
      failFunc = no;
    });
    p.catch(e => {
      this.debug(`fail stat:${e}`);
    });
    let s = [(0, _now.default)(), statusName, p, doneFunc, failFunc];
    this.stats.push(s); //add to core debug log

    if (cb) {
      (async () => {
        try {
          resultFunc((await cb()));
        } catch (err) {
          resultFunc(err);
        }
      })();
    }

    (0, _setTimeout2.default)(() => this.emit('stat', s), 0);
    return resultFunc;
  }

  statResult(statusName, result) {
    for (let i = this.stats.length, s; i--;) {
      s = this.stats[i];

      if (s[1] === statusName) {
        if (result instanceof Error) {
          s[4](result.message);
        } else {
          s[3](result);
        }

        return true;
      }
    }

    return false;
  }

  addURLResolver(func, priority = 0) {
    var _context4;

    this._.urlResolvers.push([priority, func]);

    (0, _sort.default)(_context4 = this._.urlResolvers).call(_context4, (a, b) => a[0] - b[0]); //sort by priority
  }

  async resolveURL(url) {
    //resolve the url by url resolvers
    for (let n of this._.urlResolvers) {
      let func = n[1];
      let r = await func(url);

      if (r === false) {
        this.debug(`Stop resolving url: ${url}`);
        return false; //stop resolving the url
      }

      if (r) {
        this.debug('URL resolver: [' + url + '] => [' + r + ']');
        return r;
      }
    }

    return _promise.default.reject('No url resolver hit');
  }

  async setVideoSrc(s) {
    s = (0, _trim.default)(s).call(s);
    let url = await this.resolveURL(s);
    if (url === false) return; //won't change the url if false returned

    this._.videoSrc = s;
    this.emit('srcChanged', s);
    this.video.src = url;
    return;
  }

  playToggle(Switch = this.video.paused) {
    return this.video[Switch ? 'play' : 'pause']();
  }

  loadPlugin(url, name) {
    //load js plugins for NyaP
    if (name && this.plugins[name]) {
      //check if exists
      this.debug(`Plugin already loaded: ${name}`);
      return this.plugins[name];
    }

    let p = fetch(url).then(res => res.text()).then(async script => {
      script = (0, _trim.default)(script).call(script);
      let plugin = eval(script);
      if (typeof plugin.name !== 'string' || !plugin.name) throw new TypeError('Invalid plugin name');

      if (this.plugins[plugin.name]) {
        //check if exists
        this.debug(`Plugin already loaded: ${plugin.name}`);
        return plugin;
      }

      if (typeof plugin.init === 'function') await plugin.init(this); //init the plugin

      this.plugins[plugin.name] = plugin;
      this.debug('Plugin loaded', plugin.name);
      return plugin;
    });
    p.catch(e => {
      this.debug('Plugin loading error:', e); // this.emit('pluginLoadError',e);
    });
    return p;
  }

  log(content, type = 'log', ...styles) {
    //log to console
    console[type](`%c NyaP %c${content}`, "background:#e0e0e0;padding:.2em", "background:unset", ...styles);
  }

  debug(...msg) {
    //debug messages
    console.debug('NyaP[debug]', ...msg);
    msg.unshift((0, _now.default)());
    this.debugs.push(msg);
    this.emit('debug', msg);
  }

}

exports.NyaPlayerCore = NyaPlayerCore;
(0, _defineProperty3.default)(NyaPlayerCore, "i18n", _i18n.i18n);
(0, _defineProperty3.default)(NyaPlayerCore, "Utils", _utils.Utils);
(0, _defineProperty3.default)(NyaPlayerCore, "DomTools", _domTools.DomTools);
(0, _defineProperty3.default)(NyaPlayerCore, "NyaPCoreOptions", NyaPCoreOptions);

},{"./domTools.js":5,"./i18n.js":6,"./utils.js":7,"@babel/runtime-corejs3/core-js-stable/array/is-array":17,"@babel/runtime-corejs3/core-js-stable/date/now":18,"@babel/runtime-corejs3/core-js-stable/instance/for-each":22,"@babel/runtime-corejs3/core-js-stable/instance/index-of":23,"@babel/runtime-corejs3/core-js-stable/instance/sort":26,"@babel/runtime-corejs3/core-js-stable/instance/splice":27,"@babel/runtime-corejs3/core-js-stable/instance/trim":29,"@babel/runtime-corejs3/core-js-stable/object/define-property":32,"@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor":34,"@babel/runtime-corejs3/core-js-stable/promise":35,"@babel/runtime-corejs3/core-js-stable/set-timeout":38,"@babel/runtime-corejs3/helpers/defineProperty":40,"@babel/runtime-corejs3/helpers/interopRequireDefault":41}],5:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.DomTools = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _resizeObserver = require("@juggle/resize-observer");

var _Object2HTML = require("../lib/Object2HTML.js");

var _utils = require("./utils.js");

class DomTools {
  static addEvents(target, events) {
    if (!(0, _isArray.default)(target)) target = [target];
    (0, _forEach.default)(target).call(target, function (t) {
      if (!_utils.Utils.isObject(t.__NyaPEvents__)) {
        t.__NyaPEvents__ = [];
      }

      for (let e in events) {
        var _context;

        (0, _forEach.default)(_context = e.split(/\,/g)).call(_context, function (e2) {
          t.addEventListener(e2, events[e]);

          t.__NyaPEvents__.push([e2, events[e]]);
        });
      }
    });
  }

  static fullscreenElement() {
    const d = document;
    return d.webkitFullscreenElement || d.msFullscreenElement || d.mozFullScreenElement || d.fullscreenElement;
  }

  static requestFullscreen(d = document) {
    try {
      return (d.requestFullscreen || d.msRequestFullscreen || d.mozRequestFullScreen || d.webkitRequestFullScreen || d.webkitEnterFullScreen).call(d);
    } catch (e) {
      return _promise.default.reject(e);
    }
  }

  static exitFullscreen(d = document) {
    try {
      return (d.exitFullscreen || d.msExitFullscreen || d.mozCancelFullScreen || d.webkitExitFullScreen || d.webkitCancelFullScreen).call(d);
    } catch (e) {
      return _promise.default.reject(e);
    }
  }

  static isFullscreen(d = document) {
    return !!(d.fullscreen || d.mozFullScreen || d.webkitIsFullScreen || d.msFullscreenElement || d.webkitDisplayingFullscreen);
  }

  static Object2HTML(...args) {
    return (0, _Object2HTML.Object2HTML)(...args);
  }

}

exports.DomTools = DomTools;
(0, _defineProperty2.default)(DomTools, "resizeEvent", {
  resizeObserverInstance: null,

  observe(dom) {
    if (!this.resizeObserverInstance) {
      let ResizeObserver = window.ResizeObserver;

      if (typeof ResizeObserver !== 'function') {
        ResizeObserver = _resizeObserver.ResizeObserver;
      }

      this.resizeObserverInstance = new ResizeObserver(entries => {
        for (let entry of entries) {
          let el = entry.target;
          let e = new Event('resize', {
            bubbles: false,
            cancelable: true
          });
          e.contentRect = entry.contentRect;
          el.dispatchEvent(e);
        }
      });
    }

    this.resizeObserverInstance.observe(dom);
  },

  unobserve(dom) {
    if (!this.resizeObserverInstance) throw new Error('resizeObserver not initialized');
    this.resizeObserverInstance.unobserve(dom);
  }

});

},{"../lib/Object2HTML.js":2,"./utils.js":7,"@babel/runtime-corejs3/core-js-stable/array/is-array":17,"@babel/runtime-corejs3/core-js-stable/instance/for-each":22,"@babel/runtime-corejs3/core-js-stable/object/define-property":32,"@babel/runtime-corejs3/core-js-stable/promise":35,"@babel/runtime-corejs3/helpers/defineProperty":40,"@babel/runtime-corejs3/helpers/interopRequireDefault":41,"@juggle/resize-observer":3}],6:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.i18n = void 0;

var _startsWith = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/starts-with"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

/*
Copyright luojia@luojia.me
LGPL license
*/
//polyfill
if (!navigator.languages) {
  navigator.languages = [navigator.language || navigator.browserLanguage];
}

class i18n {
  /*
  *@param{object}langs Language text object indexed by language code
  *@param{array}langsArr Language priority array
  */
  constructor(langs = {}, langsArr = [...navigator.languages]) {
    (0, _defineProperty2.default)(this, "langsArr", []);
    this.langs = langs; //defines texts

    this.langsArr = langsArr;
    this.langsArr.push('zh-CN'); //add zh-CN as default language
  }

  //language priority array
  _(str, ...args) {
    //translate
    let s = this.findTranslation(str);
    args.length && (0, _forEach.default)(args).call(args, (arg, ind) => {
      s = s.replace(`$${ind}`, arg);
    }); //fill args in the string

    return s;
  }

  findTranslation(text) {
    for (let lang of this.langsArr) {
      //find by language priority
      if (lang in this.langs && text in this.langs[lang]) {
        return this.langs[lang][text];
      } //fallback to other same main code


      let code = lang.match(/^\w+/)[0];

      for (let c in this.langs) {
        if ((0, _startsWith.default)(c).call(c, code) && text in this.langs[c]) {
          return this.langs[c][text];
        }
      }
    }

    return text;
  }

  add(langCode, texts) {
    this.langs[langCode] = texts;
  }

}

exports.i18n = i18n;

},{"@babel/runtime-corejs3/core-js-stable/instance/for-each":22,"@babel/runtime-corejs3/core-js-stable/instance/starts-with":28,"@babel/runtime-corejs3/core-js-stable/object/define-property":32,"@babel/runtime-corejs3/helpers/defineProperty":40,"@babel/runtime-corejs3/helpers/interopRequireDefault":41}],7:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.Utils = void 0;

var _setImmediate2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-immediate"));

var _bind = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/bind"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _window$requestIdleCa;

function padTime(n) {
  //pad number to 2 chars
  return n > 9 && n || `0${n}`;
}

class Utils {
  static clamp(num, min, max) {
    return num < min ? min : num > max ? max : num;
  }

  static isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  static deepAssign(target, ...args) {
    //本函数不处理循环引用
    let obj = args.shift();

    if (target === null || target === undefined || typeof target !== 'object') {
      throw new TypeError('target should be an object');
    }

    if (!Utils.isObject(obj)) {
      //obj不是对象则跳过
      if (args.length === 0) return target; //没有参数了就返回结果

      return Utils.deepAssign(target, ...args); //提取一个参数出来继续
    }

    for (let i in obj) {
      //遍历obj
      if (Utils.isObject(obj[i])) {
        //是个子对象
        if (!Utils.isObject(target[i])) target[i] = {};
        Utils.deepAssign(target[i], obj[i]); //递归
      } else {
        target[i] = obj[i]; //直接赋值
      }
    }

    if (args.length === 0) return target;
    return Utils.deepAssign(target, ...args);
  }

  static formatTime(sec, total) {
    if (total == undefined) total = sec;
    let r,
        s = sec | 0,
        h = s / 3600 | 0;
    if (total >= 3600) s = s % 3600;
    r = [padTime(s / 60 | 0), padTime(s % 60)];
    total >= 3600 && r.unshift(h);
    return r.join(':');
  }

  static setAttrs(ele, obj) {
    //set multi attrs to a Element
    for (let a in obj) ele.setAttribute(a, obj[a]);

    return ele;
  }

  static rand(min, max) {
    return min + Math.random() * (max - min) + 0.5 | 0;
  }

  static toArray(obj) {
    if (obj instanceof Array) return (0, _slice.default)(obj).call(obj);
    if (obj.length !== undefined) return (0, _slice.default)(Array.prototype).call(obj);
    return [...obj];
  }

  static animationFrameLoop(cb) {
    requestAnimationFrame(() => {
      if (cb() === false) return;
      ;
      Utils.animationFrameLoop(cb);
    });
  }

}

exports.Utils = Utils;
(0, _defineProperty2.default)(Utils, "requestIdleCallback", ((_window$requestIdleCa = window.requestIdleCallback) === null || _window$requestIdleCa === void 0 ? void 0 : (0, _bind.default)(_window$requestIdleCa).call(_window$requestIdleCa, window)) || _setImmediate2.default);

},{"@babel/runtime-corejs3/core-js-stable/instance/bind":19,"@babel/runtime-corejs3/core-js-stable/instance/slice":25,"@babel/runtime-corejs3/core-js-stable/object/define-property":32,"@babel/runtime-corejs3/core-js-stable/set-immediate":36,"@babel/runtime-corejs3/helpers/defineProperty":40,"@babel/runtime-corejs3/helpers/interopRequireDefault":41}],8:[function(require,module,exports){
/*
Copyright luojia@luojia.me
LGPL license
*/
'use strict';

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _index = require("../NyaP-Core/index.js");

var _danmakuFrame = require("./src/danmaku-frame.js");

var _danmakuText = _interopRequireDefault(require("./src/danmaku-text/danmaku-text.js"));

//load DomTools from NyaP-Core project
(0, _danmakuText.default)(_danmakuFrame.DanmakuFrame); //init TextDanmaku mod

const colorChars = '0123456789abcdef';
const danmakuProp = ['color', 'text', 'size', 'mode', 'time'];

class NyaPDanmaku extends _danmakuFrame.DanmakuFrame {
  get opt() {
    return this.core.opt.danmaku;
  }

  constructor(core) {
    super(core, core.opt.danmaku); //init mods

    for (let mod in _danmakuFrame.DanmakuFrame.availableModules) {
      var _this$opt$modules$mod;

      if (((_this$opt$modules$mod = this.opt.modules[mod]) === null || _this$opt$modules$mod === void 0 ? void 0 : _this$opt$modules$mod.enable) === true) this.initModule(mod);
      this.enable(mod);
    }

    this.setMedia(core.video);
  }

  toggle(name, bool) {
    if (typeof name === 'boolean' || name == undefined) {
      //danmaku frame switch mode
      bool = name != undefined ? name : !this.enabled;
      this[bool ? 'enable' : 'disable']();
      return bool;
    }

    try {
      var _this$module;

      //module switch mode
      if (bool == undefined) bool = !this.module(name).enabled;
      this[bool ? 'enable' : 'disable'](name);
      this.core.emit('danmakuModuleToggle', name, (_this$module = this.module(name)) === null || _this$module === void 0 ? void 0 : _this$module.enabled);
    } catch (e) {
      this.core.log('', 'error', e);
      return false;
    }

    return true;
  }

  module(name) {
    return super.modules[name];
  }

  send(obj, callback) {
    for (let i of danmakuProp) if (i in obj === false) return false;

    if ((obj.text || '').match(/^\s*$/)) return false;
    obj.color = this.isVaildColor(obj.color);

    if (obj.color) {
      obj.color = obj.color.replace(/\$/g, () => {
        return colorChars[_index.Utils.clamp(16 * Math.random() | 0, 0, 15)];
      });
    } else {
      obj.color = null;
    }

    if (this.opt.send instanceof Function) {
      this.opt.send(obj, callback || (() => {}));
      return true;
    }

    return false;
  }

  isVaildColor(co) {
    if (typeof co !== 'string') return false;
    return (co = co.match(/^\#?(([\da-f\$]{3}){1,2})$/i)) ? co[1] : false;
  }

}

var _default = NyaPDanmaku;
exports.default = _default;

},{"../NyaP-Core/index.js":1,"./src/danmaku-frame.js":10,"./src/danmaku-text/danmaku-text.js":15,"@babel/runtime-corejs3/core-js-stable/object/define-property":32,"@babel/runtime-corejs3/helpers/interopRequireDefault":41}],9:[function(require,module,exports){
/*
Copyright luojia@luojia.me
LGPL license
*/
'use strict';

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _fill = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/fill"));

var _defineProperty = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

(function (f) {
  if (typeof define === "function" && define.amd) {
    define(f);
  } else if (typeof exports === "object") {
    module.exports = f();
  } else {
    (0, eval)('this').Mat = f();
  }
})(function () {
  const global = (0, eval)('this');
  const TypedArray = global.Float32Array && global.Float32Array.prototype;

  function createClass(Constructor) {
    class Matrix {
      constructor(l, c, fill = 0) {
        this.array = new Constructor(l * c);
        (0, _defineProperty.default)(this.array, 'row', {
          value: l
        });
        (0, _defineProperty.default)(this.array, 'column', {
          value: c
        });

        if (arguments.length == 3) {
          if (Matrix._instanceofTypedArray && fill === 0) {} else if (typeof fill === 'number') {
            var _context;

            (0, _fill.default)(_context = this).call(_context, fill);
          } else if (fill.length) {
            this.set(fill);
          }
        }
      }

      get length() {
        return this.array.length;
      }

      get row() {
        return this.array.row;
      }

      get column() {
        return this.array.column;
      }

      leftMultiply(m) {
        return this.set(Matrix.multiply(m, this, new Matrix(m.row, this.column)));
      }

      rightMultiply(m) {
        return this.set(Matrix.multiply(this, m, new Matrix(this.row, m, column)));
      }

      fill(n) {
        arguments.length || (n = 0);

        for (let i = this.length; i--;) this.array[i] = n;

        return this;
      }

      set(arr, offset) {
        offset || (offset = 0);
        arr instanceof Matrix && (arr = arr.array);

        for (let i = arr.length + offset <= this.length ? arr.length : this.length - offset; i--;) this.array[offset + i] = arr[i];

        return this;
      }

      put(m, row, column) {
        Matrix.put(this, m, row || 0, column || 0);
        return this;
      }

      rotate2d(t) {
        return this.set(Matrix.rotate2d(this, t, Matrix.Matrixes.T3));
      }

      translate2d(x, y) {
        return this.set(Matrix.translate2d(this, x, y, Matrix.Matrixes.T3));
      }

      scale2d(x, y) {
        return this.set(Matrix.scale2d(this, x, y, Matrix.Matrixes.T3));
      }

      rotate3d(tx, ty, tz) {
        return this.set(Matrix.rotate3d(this, tx, ty, tz, Matrix.Matrixes.T4));
      }

      scale3d(x, y, z) {
        return this.set(Matrix.scale3d(this, x, y, z, Matrix.Matrixes.T4));
      }

      translate3d(x, y, z) {
        return this.set(Matrix.translate3d(this, x, y, z, Matrix.Matrixes.T4));
      }

      rotateX(t) {
        return this.set(Matrix.rotateX(this, t, Matrix.Matrixes.T4));
      }

      rotateY(t) {
        return this.set(Matrix.rotateY(this, t, Matrix.Matrixes.T4));
      }

      rotateZ(t) {
        return this.set(Matrix.rotateZ(this, t, Matrix.Matrixes.T4));
      }

      clone() {
        return new Matrix(this.row, this.column, this);
      }

      toString() {
        if (this.length === 0) return '';

        for (var i = 0, lines = [], tmp = []; i < this.length; i++) {
          if (i && i % this.column === 0) {
            lines.push(tmp.join('\t'));
            tmp.length = 0;
          }

          tmp.push(this.array[i] || 0);
        }

        lines.push(tmp.join('	'));
        return lines.join('\n');
      } //static methods


      static Identity(n) {
        //return a new Identity Matrix
        let m = new Matrix(n, n, 0);

        for (let i = n; i--;) m.array[i * n + i] = 1;

        return m;
      }

      static Perspective(fovy, aspect, znear, zfar, result) {
        var y1 = znear * Math.tan(fovy * Math.PI / 360.0),
            x1 = y1 * aspect,
            m = result || new Matrix(4, 4, 0),
            arr = m.array;
        arr[0] = 2 * znear / (x1 + x1);
        arr[5] = 2 * znear / (y1 + y1);
        arr[10] = -(zfar + znear) / (zfar - znear);
        arr[14] = -2 * zfar * znear / (zfar - znear);
        arr[11] = -1;
        if (result) arr[1] = arr[2] = arr[3] = arr[4] = arr[6] = arr[7] = arr[8] = arr[9] = arr[12] = arr[13] = arr[15] = 0;
        return m;
      }

      static multiply(a, b, result) {
        if (a.column !== b.row) throw 'wrong matrix';
        let row = a.row,
            column = Math.min(a.column, b.column),
            r = result || new Matrix(row, column),
            c,
            i,
            ind;

        for (let l = row; l--;) {
          for (c = column; c--;) {
            r.array[ind = l * r.column + c] = 0;

            for (i = a.column; i--;) {
              r.array[ind] += a.array[l * a.column + i] * b.array[c + i * b.column];
            }
          }
        }

        return r;
      }

      static multiplyString(a, b, array, ignoreZero = true) {
        //work out the equation for every elements,only for debug and only works with Array matrixes
        if (a.column !== b.row) throw 'wrong matrix';
        var r = array || new Matrix(a.row, b.column),
            l,
            c,
            i,
            ind;

        for (l = a.row; l--;) {
          for (c = b.column; c--;) {
            r.array[ind = l * b.column + c] = '';

            for (i = 0; i < a.column; i++) {
              if (ignoreZero && (a.array[l * a.column + i] == 0 || b.array[c + i * b.column] == 0)) continue;
              r.array[ind] += (i && r.array[ind] ? '+' : '') + '(' + a.array[l * a.column + i] + ')*(' + b.array[c + i * b.column] + ')';
            }
          }
        }

        return r;
      }

      static add(a, b, result) {
        if (a.column !== b.column || a.row !== b.row) throw 'wrong matrix';
        let r = result || new Matrix(a.row, b.column);

        for (let i = a.length; i--;) r.array[i] = a.array[i] + b.array[i];

        return r;
      }

      static minus(a, b, result) {
        if (a.column !== b.column || a.row !== b.row) throw 'wrong matrix';
        let r = result || new Matrix(a.row, b.column);

        for (let i = a.length; i--;) r.array[i] = a.array[i] - b.array[i];

        return r;
      }

      static rotate2d(m, t, result) {
        const Mr = Matrix.Matrixes.rotate2d;
        Mr.array[0] = Mr.array[4] = Math.cos(t);
        Mr.array[1] = -(Mr.array[3] = Math.sin(t));
        return Matrix.multiply(Mr, m, result || new Matrix(3, 3));
      }

      static scale2d(m, x, y, result) {
        const Mr = Matrix.Matrixes.scale2d;
        Mr.array[0] = x;
        Mr.array[4] = y;
        return Matrix.multiply(Mr, m, result || new Matrix(3, 3));
      }

      static translate2d(m, x, y, result) {
        const Mr = Matrix.Matrixes.translate2d;
        Mr.array[2] = x;
        Mr.array[5] = y;
        return Matrix.multiply(Mr, m, result || new Matrix(3, 3));
      }

      static rotate3d(m, tx, ty, tz, result) {
        const Xc = Math.cos(tx),
              Xs = Math.sin(tx),
              Yc = Math.cos(ty),
              Ys = Math.sin(ty),
              Zc = Math.cos(tz),
              Zs = Math.sin(tz),
              Mr = Matrix.Matrixes.rotate3d;
        Mr.array[0] = Zc * Yc;
        Mr.array[1] = Zc * Ys * Xs - Zs * Xc;
        Mr.array[2] = Zc * Ys * Xc + Zs * Xs;
        Mr.array[4] = Zs * Yc;
        Mr.array[5] = Zs * Ys * Xs + Zc * Xc;
        Mr.array[6] = Zs * Ys * Xc - Zc * Xs;
        Mr.array[8] = -Ys;
        Mr.array[9] = Yc * Xs;
        Mr.array[10] = Yc * Xc;
        return Matrix.multiply(Mr, m, result || new Matrix(4, 4));
      }

      static rotateX(m, t, result) {
        const Mr = Matrix.Matrixes.rotateX;
        Mr.array[10] = Mr.array[5] = Math.cos(t);
        Mr.array[6] = -(Mr.array[9] = Math.sin(t));
        return Matrix.multiply(Mr, m, result || new Matrix(4, 4));
      }

      static rotateY(m, t, result) {
        const Mr = Matrix.Matrixes.rotateY;
        Mr.array[10] = Mr.array[0] = Math.cos(t);
        Mr.array[8] = -(Mr.array[2] = Math.sin(t));
        return Matrix.multiply(Mr, m, result || new Matrix(4, 4));
      }

      static rotateZ(m, t, result) {
        const Mr = Matrix.Matrixes.rotateZ;
        Mr.array[5] = Mr.array[0] = Math.cos(t);
        Mr.array[1] = -(Mr.array[4] = Math.sin(t));
        return Matrix.multiply(Mr, m, result || new Matrix(4, 4));
      }

      static scale3d(m, x, y, z, result) {
        const Mr = Matrix.Matrixes.scale3d;
        Mr.array[0] = x;
        Mr.array[5] = y;
        Mr.array[10] = z;
        return Matrix.multiply(Mr, m, result || new Matrix(4, 4));
      }

      static translate3d(m, x, y, z, result) {
        const Mr = Matrix.Matrixes.translate3d;
        Mr.array[12] = x;
        Mr.array[13] = y;
        Mr.array[14] = z;
        return Matrix.multiply(Mr, m, result || new Matrix(4, 4));
      }

      static put(m, sub, row, column) {
        let c, ind, i;
        row || (row = 0);
        column || (column = 0);

        for (let l = sub.row; l--;) {
          if (l + row >= m.row) continue;

          for (c = sub.column; c--;) {
            if (c + column >= m.column) continue;
            m.array[(l + row) * m.column + c + column] = sub.array[l * sub.column + c];
          }
        }
      }

      static createClass(Constructor) {
        return createClass(Constructor);
      }

    }

    var testArray = new Constructor(1);
    (0, _defineProperty.default)(Matrix, '_instanceofTypedArray', {
      value: !!(TypedArray && TypedArray.isPrototypeOf(testArray))
    });
    testArray = null;
    Matrix.Matrixes = {
      //do not modify these matrixes manually and dont use them
      I2: Matrix.Identity(2),
      I3: Matrix.Identity(3),
      I4: Matrix.Identity(4),
      T3: new Matrix(3, 3, 0),
      T4: new Matrix(4, 4, 0),
      rotate2d: Matrix.Identity(3),
      translate2d: Matrix.Identity(3),
      scale2d: Matrix.Identity(3),
      translate3d: Matrix.Identity(4),
      rotate3d: Matrix.Identity(4),
      rotateX: Matrix.Identity(4),
      rotateY: Matrix.Identity(4),
      rotateZ: Matrix.Identity(4),
      scale3d: Matrix.Identity(4)
    };
    return Matrix;
  }

  return createClass(global.Float32Array ? Float32Array : Array);
});

},{"@babel/runtime-corejs3/core-js-stable/instance/fill":21,"@babel/runtime-corejs3/core-js-stable/object/define-property":32,"@babel/runtime-corejs3/helpers/interopRequireDefault":41}],10:[function(require,module,exports){
/*
Copyright luojia@luojia.me
LGPL license
*/
'use strict';

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

_Object$defineProperty(exports, "DomTools", {
  enumerable: true,
  get: function () {
    return _index.DomTools;
  }
});

_Object$defineProperty(exports, "Utils", {
  enumerable: true,
  get: function () {
    return _index.Utils;
  }
});

exports.DanmakuFrameModule = exports.DanmakuFrame = void 0;

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _bind = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/bind"));

var _copyWithin = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/copy-within"));

var _setImmediate2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-immediate"));

var _now = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/date/now"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _index = require("../../NyaP-Core/index.js");

//load from NyaP-Core project
class DanmakuFrameModule {
  constructor(frame) {
    this.frame = frame;
    this.enabled = false;
  }

  get width() {
    return this.frame.width;
  }

  get height() {
    return this.frame.height;
  }

}

exports.DanmakuFrameModule = DanmakuFrameModule;

class DanmakuFrame {
  static addModule(name, module) {
    if (name in this.availableModules) {
      console.warn('The module "' + name + '" has already been added.');
      return;
    }

    this.availableModules[name] = module;
  }

  get availableModules() {
    return this.constructor.availableModules;
  }

  get opt() {
    return this._opt || {};
  }

  set time(t) {
    //current media time (ms)
    this.media || (this.timeBase = (0, _now.default)() - t);
    this.moduleFunction('time', t); //let all mods know when the time be set
  }

  get time() {
    return this.media ? this.media.currentTime * 1000 : (0, _now.default)() - this.timeBase;
  }

  get area() {
    return this.width * this.height;
  }

  //constructed module list
  constructor(core, opt) {
    var _context;

    (0, _defineProperty2.default)(this, "_opt", void 0);
    (0, _defineProperty2.default)(this, "rate", 1);
    (0, _defineProperty2.default)(this, "timeBase", 0);
    (0, _defineProperty2.default)(this, "width", 0);
    (0, _defineProperty2.default)(this, "height", 0);
    (0, _defineProperty2.default)(this, "fpsLimit", 0);
    (0, _defineProperty2.default)(this, "fps", 0);
    (0, _defineProperty2.default)(this, "fpsRec", new Uint32Array(9));
    (0, _defineProperty2.default)(this, "media", null);
    (0, _defineProperty2.default)(this, "working", false);
    (0, _defineProperty2.default)(this, "enabled", true);
    (0, _defineProperty2.default)(this, "modules", {});
    this.core = core;
    this._opt = opt;
    this.container = core.danmakuContainer || document.createElement('div'); // create a styleSheet

    const style = document.createElement("style");
    document.head.appendChild(style);
    this.styleSheet = style.sheet;
    (0, _setImmediate2.default)(() => {
      //container size sensor
      _index.DomTools.resizeEvent.observe(this.container);

      _index.DomTools.addEvents(this.container, {
        resize: e => this.resize(e.contentRect)
      });

      this.resize();
    }, 0);

    _index.Utils.animationFrameLoop(() => {
      //fps recorder
      let rec = this.fpsRec,
          length = rec.length; //move left

      (0, _copyWithin.default)(rec).call(rec, rec, 1);
      rec[length - 1] = (0, _now.default)(); //set this frame's time

      let result = 0;

      for (let i = 1; i < length; i++) {
        //weighted average
        result += i * (rec[i] - rec[i - 1]);
      }

      result /= length * (length - 1) / 2;
      this.fps = 1000 / result;
    });

    this.draw = (0, _bind.default)(_context = this.draw).call(_context, this);
  }

  enable(name) {
    //enable a amdule
    if (name === undefined) {
      //no name means enable this frame
      this.enabled = true;

      if (this.media) {
        this.media.paused || this.play();
      }

      this.container.style.display = '';
      this.core.emit('danmakuFrameToggle', true);
      this.core.debug('danmaku frame enabled');
      return;
    } else if (!name) {
      throw new Error(`Wrong name: ${name}`);
    }

    let module = this.modules[name] || this.initModule(name);
    if (!module) return false;
    module.enabled = true;
    module.enable && module.enable();
    return true;
  }

  disable(name) {
    if (name === undefined) {
      this.pause();
      this.moduleFunction('clear');
      this.enabled = false;
      this.container.style.display = 'none';
      this.core.emit('danmakuFrameToggle', false);
      this.core.debug('danmaku frame disabled');
      return;
    }

    let module = this.modules[name];
    if (!module) return false;
    module.enabled = false;
    module.disable && module.disable();
    return true;
  }

  addStyle(s) {
    if (typeof s === 'string') s = [s];
    if (s instanceof Array === false) return;
    (0, _forEach.default)(s).call(s, r => this.styleSheet.insertRule(r, this.styleSheet.cssRules.length));
  }

  initModule(name, arg = this.opt.modules[name]) {
    if (this.modules[name]) {
      console.warn(`The module [${name}] has already inited.`);
      return this.modules[name];
    }

    let mod = DanmakuFrame.availableModules[name];
    if (!mod) throw 'Module [' + name + '] does not exist.';
    let module = new mod(this, arg);
    if (module instanceof DanmakuFrameModule === false) throw 'Constructor of ' + name + ' is not child class of DanmakuFrameModule';
    this.modules[name] = module;
    console.debug(`Mod Inited: ${name}`);
    return module;
  }

  draw(force) {
    if (!this.working) return;
    this.moduleFunction('draw', force);

    if (this.fpsLimit <= 0) {
      requestAnimationFrame(() => this.draw());
    } else {
      (0, _setTimeout2.default)(this.draw, 1000 / this.fpsLimit);
    }
  }

  load(...danmakuObj) {
    this.moduleFunction('load', ...danmakuObj);
  }

  loadList(danmakuArray) {
    this.moduleFunction('loadList', danmakuArray);
  }

  unload(danmakuObj) {
    this.moduleFunction('unload', danmakuObj);
  }

  play() {
    if (this.working || !this.enabled) return;
    this.working = true;
    this.moduleFunction('play');
    this.draw(true);
  }

  pause() {
    if (!this.enabled) return;
    this.working = false;
    this.moduleFunction('pause');
  }

  resize(rect = this.container.getBoundingClientRect()) {
    this.width = rect.width;
    this.height = rect.height;
    this.moduleFunction('resize', rect);
  }

  moduleFunction(name, ...arg) {
    let m;

    for (let n in this.modules) {
      m = this.modules[n];
      if (m.enabled && m[name]) m[name](...arg);
    }
  }

  setMedia(media) {
    const F = this;
    F.media = media;

    _index.DomTools.addEvents(media, {
      playing: () => F.play(),
      'pause,stalled,seeking,waiting': () => F.pause(),
      ratechange: () => {
        F.rate = F.media.playbackRate;
        F.moduleFunction('rate', F.rate);
      }
    });

    F.moduleFunction('media', media);
  }

}

exports.DanmakuFrame = DanmakuFrame;
(0, _defineProperty2.default)(DanmakuFrame, "availableModules", {});

},{"../../NyaP-Core/index.js":1,"@babel/runtime-corejs3/core-js-stable/date/now":18,"@babel/runtime-corejs3/core-js-stable/instance/bind":19,"@babel/runtime-corejs3/core-js-stable/instance/copy-within":20,"@babel/runtime-corejs3/core-js-stable/instance/for-each":22,"@babel/runtime-corejs3/core-js-stable/object/define-property":32,"@babel/runtime-corejs3/core-js-stable/set-immediate":36,"@babel/runtime-corejs3/core-js-stable/set-timeout":38,"@babel/runtime-corejs3/helpers/defineProperty":40,"@babel/runtime-corejs3/helpers/interopRequireDefault":41}],11:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _textModuleTemplate = _interopRequireDefault(require("./textModuleTemplate.js"));

/*
Copyright luojia@luojia.me
LGPL license
*/
class TextCanvas2D extends _textModuleTemplate.default {
  get container() {
    return this.canvas;
  }

  constructor(dText) {
    super(dText);
    (0, _defineProperty2.default)(this, "canvas", void 0);
    (0, _defineProperty2.default)(this, "context2d", void 0);
    this.canvas = document.createElement('canvas'); //the canvas

    this.context2d = this.canvas.getContext('2d'); //the canvas contex

    if (!this.context2d) {
      console.warn('text 2d not supported');
      return;
    }

    this.canvas.classList.add(`${dText.randomText}_fullfill`);
    this.canvas.id = `${dText.randomText}_text2d`;
    this.supported = true;
  }

  draw(force) {
    let ctx = this.context2d,
        cW = ctx.canvas.width,
        dT = this.dText.DanmakuText,
        i = dT.length,
        t,
        left,
        right,
        vW;
    let debug = false;
    ctx.globalCompositeOperation = 'destination-over';
    this.clear(force);

    for (; i--;) {
      if (!(t = dT[i]).drawn) t.drawn = true;
      left = t.style.x - t.estimatePadding;
      right = left + t._cache.width;

      if (left > cW || right < 0) {
        continue;
      } //ignore danmakus out of the screen


      if (debug) {
        ctx.save();
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillRect(left, t.style.y - t.estimatePadding, t._cache.width, t._cache.height);
        ctx.restore();
      }

      if (cW >= t._cache.width) {
        //danmaku which is smaller than canvas width
        ctx.drawImage(t._bitmap || t._cache, left, t.style.y - t.estimatePadding);
      } else {
        //only draw the part on screen if the danmau overflow
        vW = t._cache.width + (left < 0 ? left : 0) - (right > cW ? right - cW : 0);
        ctx.drawImage(t._bitmap || t._cache, left < 0 ? -left : 0, 0, vW, t._cache.height, left < 0 ? 0 : left, t.style.y - t.estimatePadding, vW, t._cache.height);
      }
    }
  }

  clear(force) {
    const D = this.dText;

    if (force || this._evaluateIfFullClearMode()) {
      this.context2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return;
    }

    for (let i = D.DanmakuText.length, t; i--;) {
      t = D.DanmakuText[i];
      if (t.drawn) this.context2d.clearRect(t.style.x - t.estimatePadding, t.style.y - t.estimatePadding, t._cache.width, t._cache.height);
    }
  }

  _evaluateIfFullClearMode() {
    if (this.dText.DanmakuText.length > 3) return true;
    return false;
  }

  deleteRelatedTextObject(t) {
    if (t._bitmap) {
      t._bitmap.close();

      t._bitmap = null;
    }
  }

  resize() {
    let D = this.dText,
        C = this.canvas;
    C.width = D.width;
    C.height = D.height;
  }

  enable() {
    this.draw();
    this.dText.useImageBitmap = true;
  }

  disable() {
    for (let tobj of this.dText.DanmakuText) {
      this.deleteRelatedTextObject(tobj);
    }

    this.clear(true);
  }

}

var _default = TextCanvas2D;
exports.default = _default;

},{"./textModuleTemplate.js":16,"@babel/runtime-corejs3/core-js-stable/object/define-property":32,"@babel/runtime-corejs3/helpers/defineProperty":40,"@babel/runtime-corejs3/helpers/interopRequireDefault":41}],12:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _textModuleTemplate = _interopRequireDefault(require("./textModuleTemplate.js"));

/*
Copyright luojia@luojia.me
LGPL license
*/
class TextCss extends _textModuleTemplate.default {
  constructor(dText) {
    super(dText);
    this.supported = dText.text2d.supported;
    if (!this.supported) return;
    dText.frame.addStyle([`#${dText.randomText}_textCanvasContainer canvas{will-change:transform;top:0;left:0;position:absolute;}`, `#${dText.randomText}_textCanvasContainer.moving canvas{transition:transform 500s linear;}`, `#${dText.randomText}_textCanvasContainer{will-change:transform;pointer-events:none;overflow:hidden;}`]);
    this.container = document.createElement('div'); //for text canvas

    this.container.classList.add(`${dText.randomText}_fullfill`);
    this.container.id = `${dText.randomText}_textCanvasContainer`;
  }

  _toggle(s) {
    let D = this.dText,
        T = D.frame.time;
    this.container.classList[s ? 'add' : 'remove']('moving');

    for (let i = D.DanmakuText.length, t; i--;) {
      if ((t = D.DanmakuText[i]).danmaku.mode >= 2) continue;

      if (s) {
        requestAnimationFrame(() => this._move(t));
      } else {
        this._move(t, T);
      }
    }
  }

  clear() {
    this.container.innerHTML = '';
  }

  pause() {
    this._toggle(false);
  }

  play() {
    this._toggle(true);
  }

  rate() {
    this.resetPos();
  }

  _move(t, T) {
    if (!t.danmaku) return;
    if (T === undefined) T = this.dText.frame.time + 500000;
    t._cache.style.transform = `translate(${((this.dText._calcSideDanmakuPosition(t, T) - t.estimatePadding) * 10 | 0) / 10}px,${t.style.y - t.estimatePadding}px)`;
  }

  resetPos() {
    this.pause();
    this.dText.paused || requestAnimationFrame(() => this.play());
  }

  resize() {
    this.resetPos();
  }

  remove(t) {
    t._cache.parentNode && this.container.removeChild(t._cache);
  }

  enable() {
    this.dText.useImageBitmap = false;
    requestAnimationFrame(() => {
      var _context;

      (0, _forEach.default)(_context = this.dText.DanmakuText).call(_context, t => this.newDanmaku(t));
    });
  }

  disable() {
    this.container.innerHTML = '';
  }

  newDanmaku(t) {
    t._cache.style.transform = `translate(${t.style.x - t.estimatePadding}px,${t.style.y - t.estimatePadding}px)`;
    this.container.appendChild(t._cache);
    t.danmaku.mode < 2 && !this.dText.paused && requestAnimationFrame(() => this._move(t));
  }

}

var _default = TextCss;
exports.default = _default;

},{"./textModuleTemplate.js":16,"@babel/runtime-corejs3/core-js-stable/instance/for-each":22,"@babel/runtime-corejs3/core-js-stable/object/define-property":32,"@babel/runtime-corejs3/helpers/interopRequireDefault":41}],13:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _Mat = _interopRequireDefault(require("../../lib/Mat/Mat.js"));

var _textModuleTemplate = _interopRequireDefault(require("./textModuleTemplate.js"));

var _danmakuFrame = require("../danmaku-frame.js");

/*
Copyright luojia@luojia.me
LGPL license
*/
class TextWebGL extends _textModuleTemplate.default {
  get container() {
    return this.c3d;
  }

  constructor(dText) {
    super(dText);
    let c3d = this.c3d = document.createElement('canvas');
    c3d.classList.add(`${dText.randomText}_fullfill`);
    c3d.id = `${dText.randomText}_text3d`; //init webgl

    const gl = this.gl = c3d.getContext('webgl') || c3d.getContext('experimental-webgl'); //the canvas3d context

    if (!gl) {
      console.warn('text 3d not supported');
      return;
    } //shader


    var shaders = {
      danmakuFrag: [gl.FRAGMENT_SHADER, `
				#pragma optimize(on)
				precision lowp float;
				varying lowp vec2 vDanmakuTexCoord;
				uniform sampler2D uSampler;
				void main(void) {
					vec4 co=texture2D(uSampler,vDanmakuTexCoord);
					if(co.a == 0.0)discard;
					gl_FragColor = co;
				}`],
      danmakuVert: [gl.VERTEX_SHADER, `
				#pragma optimize(on)
				attribute vec2 aVertexPosition;
				attribute vec2 aDanmakuTexCoord;
				uniform mat4 u2dCoordinate;
				varying lowp vec2 vDanmakuTexCoord;
				void main(void) {
					gl_Position = u2dCoordinate * vec4(aVertexPosition,0,1);
					vDanmakuTexCoord = aDanmakuTexCoord;
				}`]
    };

    function shader(name) {
      var s = gl.createShader(shaders[name][0]);
      gl.shaderSource(s, shaders[name][1]);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw "An error occurred compiling the shaders: " + gl.getShaderInfoLog(s);
      return s;
    }

    var fragmentShader = shader("danmakuFrag");
    var vertexShader = shader("danmakuVert");
    var shaderProgram = this.shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error("Unable to initialize the shader program.");
      return;
    }

    gl.useProgram(shaderProgram); //scene

    gl.clearColor(0, 0, 0, 0.0);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    this.maxTexSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    this.uSampler = gl.getUniformLocation(shaderProgram, "uSampler");
    this.u2dCoord = gl.getUniformLocation(shaderProgram, "u2dCoordinate");
    this.aVertexPosition = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    this.atextureCoord = gl.getAttribLocation(shaderProgram, "aDanmakuTexCoord");
    gl.enableVertexAttribArray(this.aVertexPosition);
    gl.enableVertexAttribArray(this.atextureCoord);
    this.commonTexCoordBuffer = gl.createBuffer();
    this.commonVertCoordBuffer = gl.createBuffer();
    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(this.uSampler, 0);
    this.supported = true;
  }

  draw(force) {
    const gl = this.gl,
          l = this.dText.DanmakuText.length;
    let cW = this.c3d.width,
        left,
        right,
        vW;

    for (let i = 0, t; i < l; i++) {
      t = this.dText.DanmakuText[i];
      if (!t || !t.glDanmaku) continue;
      left = t.style.x - t.estimatePadding;
      right = left + t._cache.width, vW = t._cache.width + (left < 0 ? left : 0) - (right > cW ? right - cW : 0);
      if (left > cW || right < 0) continue; //vert

      t.vertCoord[0] = t.vertCoord[4] = left < 0 ? 0 : left;
      t.vertCoord[2] = t.vertCoord[6] = t.vertCoord[0] + vW;
      gl.bindBuffer(gl.ARRAY_BUFFER, this.commonVertCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, t.vertCoord, gl.DYNAMIC_DRAW);
      gl.vertexAttribPointer(this.aVertexPosition, 2, gl.FLOAT, false, 0, 0); //tex

      commonTextureCoord[0] = commonTextureCoord[4] = left < 0 ? -left / t._cache.width : 0;
      commonTextureCoord[2] = commonTextureCoord[6] = commonTextureCoord[0] + vW / t._cache.width;
      gl.bindBuffer(gl.ARRAY_BUFFER, this.commonTexCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, commonTextureCoord, gl.DYNAMIC_DRAW);
      gl.vertexAttribPointer(this.atextureCoord, 2, gl.FLOAT, false, 0, 0);
      gl.bindTexture(gl.TEXTURE_2D, t.texture);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    gl.flush();
  }

  clear() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  deleteRelatedTextObject(t) {
    if (t.texture) this.gl.deleteTexture(t.texture);
    t.texture = null;
    t.vertCoord = null;
    delete t.glDanmaku;
  }

  resize(w, h) {
    const gl = this.gl,
          C = this.c3d;
    C.width = this.dText.width;
    C.height = this.dText.height;
    gl.viewport(0, 0, C.width, C.height);
    gl.uniformMatrix4fv(this.u2dCoord, false, _Mat.default.Identity(4).translate3d(-1, 1, 0).scale3d(2 / C.width, -2 / C.height, 0).array);
  }

  enable() {
    var _context;

    (0, _forEach.default)(_context = this.dText.DanmakuText).call(_context, t => {
      this.newDanmaku(t, false);
    });
    this.dText.useImageBitmap = false;
    requestAnimationFrame(() => this.draw());
  }

  disable() {
    //clean related objects
    for (let tobj of this.dText.DanmakuText) {
      this.deleteRelatedTextObject(tobj);
    }

    this.clear();
  }

  newDanmaku(t, async = true) {
    const gl = this.gl;
    t.glDanmaku = false;

    if (t._cache.height > this.maxTexSize || t._cache.width > this.maxTexSize) {
      //ignore too large danmaku image
      console.warn('Ignore a danmaku width too large size', t.danmaku);
      return;
    }

    let tex;

    if (!(tex = t.texture)) {
      tex = t.texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    if (async) {
      _danmakuFrame.Utils.requestIdleCallback(() => {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, t._cache);
        t.glDanmaku = true;
      });
    } else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, t._cache);
      t.glDanmaku = true;
    } //vert


    let y = t.style.y - t.estimatePadding;
    t.vertCoord = new Float32Array([0, y, 0, y, 0, y + t._cache.height, 0, y + t._cache.height]);
  }

}

const commonTextureCoord = new Float32Array([0.0, 0.0, //↖
1.0, 0.0, //↗
0.0, 1.0, //↙
1.0, 1.0 //↘
]);
var _default = TextWebGL;
exports.default = _default;

},{"../../lib/Mat/Mat.js":9,"../danmaku-frame.js":10,"./textModuleTemplate.js":16,"@babel/runtime-corejs3/core-js-stable/instance/for-each":22,"@babel/runtime-corejs3/core-js-stable/object/define-property":32,"@babel/runtime-corejs3/helpers/interopRequireDefault":41}],14:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _textModuleTemplate = _interopRequireDefault(require("./textModuleTemplate.js"));

/*
Copyright luojia@luojia.me
LGPL license
*/
class TextOff extends _textModuleTemplate.default {
  constructor(dText) {
    super(dText);
    this.supported = true;
    this.container = document.createElement('div');
    this.container.style.display = 'none';
  }

}

var _default = TextOff;
exports.default = _default;

},{"./textModuleTemplate.js":16,"@babel/runtime-corejs3/core-js-stable/object/define-property":32,"@babel/runtime-corejs3/helpers/interopRequireDefault":41}],15:[function(require,module,exports){
/*
Copyright luojia@luojia.me
LGPL license

danmaku-frame mod
*/
'use strict';

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = init;

var _fill = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/fill"));

var _now = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/date/now"));

var _create = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/create"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _setInterval2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-interval"));

var _bind = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/bind"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/assign"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _danmakuFrame = require("../danmaku-frame.js");

var _TextCanvas2D = _interopRequireDefault(require("./TextCanvas2D.js"));

var _TextWebGL = _interopRequireDefault(require("./TextWebGL.js"));

var _TextCss = _interopRequireDefault(require("./TextCss.js"));

var _Textoff = _interopRequireDefault(require("./Textoff.js"));

/*
danmaku obj struct
{
	_:'text',
	time:(number)msec time,
	text:(string),
	style:(object)to be combined whit default style,
	mode:(number)
}

danmaku mode
	0:right
	1:left
	2:bottom
	3:top
*/
const defProp = _defineProperty3.default;
let useImageBitmap = false;

class TextDanmaku extends _danmakuFrame.DanmakuFrameModule {
  get paused() {
    return !this.frame.working;
  }

  constructor(frame, arg = {}) {
    var _context, _context2;

    super(frame);
    (0, _defineProperty2.default)(this, "list", []);
    (0, _defineProperty2.default)(this, "indexMark", 0);
    (0, _defineProperty2.default)(this, "randomText", `danmaku_text_${Math.random() * 999999 | 0}`);
    (0, _defineProperty2.default)(this, "lastRendererMode", 0);
    (0, _defineProperty2.default)(this, "cacheCleanTime", 0);
    (0, _defineProperty2.default)(this, "danmakuMoveTime", 0);
    (0, _defineProperty2.default)(this, "danmakuCheckTime", 0);
    (0, _defineProperty2.default)(this, "danmakuCheckSwitch", true);
    (0, _defineProperty2.default)(this, "GraphCache", []);
    (0, _defineProperty2.default)(this, "DanmakuText", []);
    (0, _defineProperty2.default)(this, "defaultStyle", {
      //these styles can be overwrote by the 'font' property of danmaku object
      fontStyle: null,
      fontWeight: 300,
      fontVariant: null,
      color: "#fff",
      fontSize: 24,
      fontFamily: "Arial",
      strokeWidth: 1,
      //outline width
      strokeColor: "#888",
      shadowBlur: 5,
      textAlign: 'start',
      //left right center start end
      shadowColor: "#000",
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      fill: true //if the text should be filled

    });
    (0, _defineProperty2.default)(this, "options", {
      allowLines: false,
      //allow multi-line danmaku
      screenLimit: 0,
      //the most area% of danmaku on the screen
      clearWhenTimeReset: true,
      //clear danmaku on screen when the time is reset
      speed: 6.5,
      danmakuSizeScale: 1,
      //scale for the default size
      autoShiftRenderingMode: true,
      //auto shift to a low load mode
      renderingMode: 1 //default to css mode

    });
    if (arg.defaultStyle) (0, _assign.default)(this.defaultStyle, arg.defaultStyle);
    if (arg.options) _danmakuFrame.Utils.deepAssign(this.options, arg.options);
    frame.addStyle(`.${this.randomText}_fullfill{top:0;left:0;width:100%;height:100%;position:absolute;}`);
    defProp(this, 'rendererMode', {
      configurable: true
    });
    defProp(this, 'activeRendererMode', {
      configurable: true,
      value: null
    });
    const con = this.container = document.createElement('div');
    con.id = `${this.randomText}_textDanmakuContainer`;
    con.classList.add(`${this.randomText}_fullfill`); //init modes

    this.modes = {
      0: this.textoff = new _Textoff.default(this),
      //off
      2: this.text2d = new _TextCanvas2D.default(this),
      1: this.textCss = new _TextCss.default(this),
      3: this.text3d = new _TextWebGL.default(this)
    };
    this.rendering = new RenderingDanmakuManager(this);

    _danmakuFrame.DomTools.addEvents(document, {
      visibilitychange: e => {//?
      }
    });

    this._checkNewDanmaku = (0, _bind.default)(_context = this._checkNewDanmaku).call(_context, this);
    this._cleanCache = (0, _bind.default)(_context2 = this._cleanCache).call(_context2, this);
    (0, _setInterval2.default)(this._cleanCache, 5000); //set an interval for cache cleaning

    this.setRendererMode(this.lastRendererMode = this.options.renderingMode || 1);
  }

  setRendererMode(n) {
    if (this.rendererMode === n || !(n in this.modes) || !this.modes[n].supported) return false;

    if (this.activeRendererMode) {
      this.lastRendererMode = this.rendererMode;
      this.activeRendererMode.disable();
      this.container.removeChild(this.activeRendererMode.container);
    }

    defProp(this, 'activeRendererMode', {
      value: this.modes[n]
    });
    defProp(this, 'rendererMode', {
      value: n
    });
    this.container.appendChild(this.activeRendererMode.container);
    this.activeRendererMode.resize();
    this.activeRendererMode.enable();
    this.frame.core.debug('rendererMode:', this.rendererMode);
    return true;
  }

  media(media) {
    _danmakuFrame.DomTools.addEvents(media, {
      seeked: () => this.time(),
      seeking: () => this.pause()
    });
  }

  play() {
    this.recheckIndexMark();
    this.activeRendererMode.play();
  }

  pause() {
    this.activeRendererMode.pause();
  }

  load(d, autoAddToScreen) {
    if ((d === null || d === void 0 ? void 0 : d._) !== 'text') {
      return false;
    }

    if (typeof d.text !== 'string') {
      console.error('wrong danmaku object:', d);
      return false;
    }

    let ind,
        arr = this.list;
    ind = dichotomy(arr, d.time, 0, arr.length - 1, false); //find a place for this obj in the list in time order

    (0, _splice.default)(arr).call(arr, ind, 0, d); //insert the obj

    if (ind < this.indexMark) this.indexMark++; //round d.style.fontSize to prevent Iifinity loop in tunnel

    if (typeof d.style !== 'object') d.style = {};
    d.style.fontSize = Math.round((d.style.fontSize || this.defaultStyle.fontSize) * this.options.danmakuSizeScale);
    if (isNaN(d.style.fontSize) || d.style.fontSize === Infinity || d.style.fontSize === 0) d.style.fontSize = this.defaultStyle.fontSize * this.options.danmakuSizeScale;
    if (typeof d.mode !== 'number') d.mode = 0;
    if (autoAddToScreen && ind < this.indexMark) this._addNewDanmaku(d);
    return d;
  }

  loadList(danmakuArray) {
    (0, _forEach.default)(danmakuArray).call(danmakuArray, d => this.load(d));
  }

  unload(d) {
    var _context3, _context4;

    if (!d || d._ !== 'text') return false;
    const i = (0, _indexOf.default)(_context3 = this.list).call(_context3, d);
    if (i < 0) return false;
    (0, _splice.default)(_context4 = this.list).call(_context4, i, 1);
    if (i < this.indexMark) this.indexMark--;
    return true;
  }

  _checkNewDanmaku(force) {
    if (this.paused && !force) return;
    let d,
        time = this.frame.time;
    if (this.danmakuCheckTime === time || !this.danmakuCheckSwitch) return;
    if (this.list.length) for (; this.indexMark < this.list.length && (d = this.list[this.indexMark]) && d.time <= time; this.indexMark++) {
      //add new danmaku
      if (this.options.screenLimit > 0 && this.rendering.onScreenArea >= this.options.screenLimit / 100 * this.frame.area) {
        continue;
      } //continue if the number of danmaku on screen has up to limit or doc is not visible


      this._addNewDanmaku(d);
    }
    this.danmakuCheckTime = time;
  }

  _addNewDanmaku(d) {
    const cHeight = this.height,
          cWidth = this.width;
    let t = this.GraphCache.length ? this.GraphCache.shift() : new TextGraph();

    if (!this.options.allowLines) {
      d = (0, _create.default)(d);
      d.text = d.text.replace(/\n/g, ' ');
    }

    let font = (0, _create.default)(this.defaultStyle);
    t.init(d, (0, _assign.default)(font, d.style));
    t.prepare(false); //find tunnel number

    const tnum = this.rendering.tunnelManager.getTunnel(t, cHeight); //calc margin

    let margin = (tnum < 0 ? 0 : tnum) % cHeight;

    switch (d.mode) {
      case 0:
      case 1:
      case 3:
        {
          t.style.y = margin;
          break;
        }

      case 2:
        {
          t.style.y = cHeight - margin - t.style.height - 1;
        }
    }

    switch (d.mode) {
      case 0:
        {
          t.style.x = cWidth;
          break;
        }

      case 1:
        {
          t.style.x = -t.style.width;
          break;
        }

      case 2:
      case 3:
        {
          t.style.x = (cWidth - t.style.width) / 2;
        }
    }

    this.rendering.add(t);
  }

  _calcSideDanmakuPosition(t, T = this.frame.time) {
    let R = !t.danmaku.mode,
        style = t.style; //R:from right

    return (R ? this.frame.width : -style.width) + (R ? -1 : 1) * this.frame.rate * (style.width + 1024) * (T - t.time) * this.options.speed / 60000;
  }

  _calcDanmakusPosition(force) {
    let T = this.frame.time;
    if (this.paused && !force) return;
    const cWidth = this.width,
          rate = this.frame.rate;
    let R, i, t, style, X;
    this.danmakuMoveTime = T;

    for (i = this.DanmakuText.length; i--;) {
      t = this.DanmakuText[i];

      if (t.time > T) {
        this.removeText(t);
        continue;
      }

      style = t.style;

      switch (t.danmaku.mode) {
        case 0:
        case 1:
          {
            R = !t.danmaku.mode;
            style.x = X = this._calcSideDanmakuPosition(t, T);

            if (t.tunnelNumber >= 0 && (R && X + style.width + 10 < cWidth || !R && X > 10)) {
              this.rendering.tunnelManager.removeMark(t);
            } else if (R && X < -style.width - 20 || !R && X > cWidth + style.width + 20) {
              //go out the canvas
              this.removeText(t);
              continue;
            }

            break;
          }

        case 2:
        case 3:
          {
            if (T - t.time > this.options.speed * 1000 / rate) {
              this.removeText(t);
            }
          }
      }
    }
  }

  _cleanCache(force) {
    //clean text object cache
    force && this.frame.core.debug('force cleaning graph cache');
    const now = (0, _now.default)();

    if (this.GraphCache.length > 30 || force) {
      //save 30 cached danmaku
      for (let ti = 0; ti < this.GraphCache.length; ti++) {
        if (force || now - this.GraphCache[ti].removeTime > 10000) {
          var _context5;

          //delete cache which has not been used for 10s
          this.GraphCache[ti].destructor();
          (0, _splice.default)(_context5 = this.GraphCache).call(_context5, ti, 1);
        } else {
          break;
        }
      }
    }
  }

  draw(force) {
    if (!force && this.paused || !this.enabled) return;

    this._calcDanmakusPosition(force);

    this.activeRendererMode.draw(force);
    requestAnimationFrame(() => {
      this._checkNewDanmaku(force);
    });
  }

  removeText(t) {
    //remove the danmaku from screen
    this.rendering.remove(t);
  }

  resize() {
    if (this.activeRendererMode) this.activeRendererMode.resize();
    this.draw(true);
  }

  _clearScreen(forceFull) {
    this.activeRendererMode && this.activeRendererMode.clear(forceFull);
  }

  clear() {
    //clear danmaku on the screen
    this.rendering.clear();

    this._clearScreen(true);
  }

  recheckIndexMark(t = this.frame.time) {
    this.indexMark = dichotomy(this.list, t, 0, this.list.length - 1, true);
  }

  rate(r) {
    if (this.activeRendererMode) this.activeRendererMode.rate(r);
  }

  time(t = this.frame.time) {
    //reset time,you should invoke it when the media has seeked to another time
    this.recheckIndexMark(t);

    if (this.options.clearWhenTimeReset) {
      this.clear();
    } else {
      this.resetTimeOfDanmakuOnScreen();
    }
  }

  resetTimeOfDanmakuOnScreen(cTime) {
    var _context6;

    //cause the position of the danmaku is based on time
    //and if you don't want these danmaku on the screen to disappear after seeking,their time should be reset
    if (cTime === undefined) cTime = this.frame.time;
    (0, _forEach.default)(_context6 = this.DanmakuText).call(_context6, t => {
      if (!t.danmaku) return;
      t.time = cTime - (this.danmakuMoveTime - t.time);
    });
  }

  danmakuAt(x, y) {
    var _context7;

    //return a list of danmaku which covers this position
    const list = [];
    if (!this.enabled) return list;
    (0, _forEach.default)(_context7 = this.DanmakuText).call(_context7, t => {
      if (!t.danmaku) return;
      if (t.style.x <= x && t.style.x + t.style.width >= x && t.style.y <= y && t.style.y + t.style.height >= y) list.push(t.danmaku);
    });
    return list;
  }

  enable() {
    //enable the plugin
    this.setRendererMode(this.lastRendererMode);
    this.frame.container.appendChild(this.container);
    if (this.frame.working) this.play();
  }

  disable() {
    //disable the plugin
    this.frame.container.removeChild(this.container);
    this.pause();
    this.clear();
    this.setRendererMode(0);
  }

  set useImageBitmap(v) {
    useImageBitmap = typeof createImageBitmap === 'function' ? v : false;
  }

  get useImageBitmap() {
    return useImageBitmap;
  }

}

class TextGraph {
  //code copied from CanvasObjLibrary
  //bool: 
  //number: remove time of the danmaku
  //number: tunnel number in the tunner manager
  //number: tunnel height
  //number: padding of the canvas
  get text() {
    return this.danmaku.text;
  }

  constructor(danmakuObj, font) {
    var _context8;

    (0, _defineProperty2.default)(this, "_fontString", '');
    (0, _defineProperty2.default)(this, "_renderList", void 0);
    (0, _defineProperty2.default)(this, "_cache", void 0);
    (0, _defineProperty2.default)(this, "_bitmap", void 0);
    (0, _defineProperty2.default)(this, "font", {});
    (0, _defineProperty2.default)(this, "time", void 0);
    (0, _defineProperty2.default)(this, "style", {});
    (0, _defineProperty2.default)(this, "drawn", false);
    (0, _defineProperty2.default)(this, "danmaku", void 0);
    (0, _defineProperty2.default)(this, "removeTime", void 0);
    (0, _defineProperty2.default)(this, "tunnelNumber", void 0);
    (0, _defineProperty2.default)(this, "tunnelHeight", void 0);
    (0, _defineProperty2.default)(this, "estimatePadding", void 0);
    this._renderToCache = (0, _bind.default)(_context8 = this._renderToCache).call(_context8, this);
    danmakuObj && this.init(danmakuObj, font);
  }

  init(d, font) {
    this.danmaku = d;
    this.drawn = false;
    this.time = d.time;
    this.font = font;
    if (!this.font.lineHeight) this.font.lineHeight = this.font.fontSize + 2 || 1;

    if (d.style.color) {
      if (this.font.color && this.font.color[0] !== '#') {
        this.font.color = '#' + d.style.color;
      }
    }

    if (d.mode > 1) this.font.textAlign = 'center';
  }

  prepare(async = false) {
    //prepare text details
    if (!this._cache) {
      this._cache = document.createElement("canvas");
    }

    let ta = [];
    this.font.fontStyle && ta.push(this.font.fontStyle);
    this.font.fontVariant && ta.push(this.font.fontVariant);
    this.font.fontWeight && ta.push(this.font.fontWeight);
    ta.push(`${this.font.fontSize}px`);
    this.font.fontFamily && ta.push(this.font.fontFamily);
    this._fontString = ta.join(' ');
    const canvas = this._cache,
          ct = canvas.ctx2d || (canvas.ctx2d = canvas.getContext("2d"));
    ct.font = this._fontString;
    this._renderList = this.text.split(/\n/g);
    this.estimatePadding = Math.max(this.font.shadowBlur + 5 + Math.max(Math.abs(this.font.shadowOffsetY), Math.abs(this.font.shadowOffsetX)), this.font.strokeWidth + 3);
    let w = 0,
        tw,
        lh = typeof this.font.lineHeight === 'number' ? this.font.lineHeight : this.font.fontSize;

    for (let i = this._renderList.length; i--;) {
      tw = ct.measureText(this._renderList[i]).width;
      tw > w && (w = tw); //max
    }

    canvas.width = (this.style.width = w) + this.estimatePadding * 2;
    canvas.height = (this.style.height = this._renderList.length * lh) + (lh < this.font.fontSize ? this.font.fontSize * 2 : 0) + this.estimatePadding * 2;
    ct.translate(this.estimatePadding, this.estimatePadding);

    if (async) {
      _danmakuFrame.Utils.requestIdleCallback(this._renderToCache);
    } else {
      this._renderToCache();
    }
  }

  _renderToCache() {
    if (!this.danmaku) return;
    this.render(this._cache.ctx2d);

    if (useImageBitmap) {
      //use ImageBitmap
      if (this._bitmap) {
        this._bitmap.close();

        this._bitmap = null;
      }

      createImageBitmap(this._cache).then(bitmap => {
        this._bitmap = bitmap;
      });
    }
  }

  render(ct) {
    //render text
    if (!this._renderList) return;
    ct.save();

    if (this.danmaku.highlight) {
      ct.fillStyle = 'rgba(255,255,255,0.3)';
      ct.beginPath();
      ct.rect(0, 0, this.style.width, this.style.height);
      (0, _fill.default)(ct).call(ct);
    }

    ct.font = this._fontString; //set font

    ct.textBaseline = 'middle';
    ct.lineWidth = this.font.strokeWidth;
    ct.fillStyle = this.font.color;
    ct.strokeStyle = this.font.strokeColor;
    ct.shadowBlur = this.font.shadowBlur;
    ct.shadowColor = this.font.shadowColor;
    ct.shadowOffsetX = this.font.shadowOffsetX;
    ct.shadowOffsetY = this.font.shadowOffsetY;
    ct.textAlign = this.font.textAlign;
    let lh = typeof this.font.lineHeight === 'number' ? this.font.lineHeight : this.font.fontSize,
        x;

    switch (this.font.textAlign) {
      case 'left':
      case 'start':
        {
          x = 0;
          break;
        }

      case 'center':
        {
          x = this.style.width / 2;
          break;
        }

      case 'right':
      case 'end':
        {
          x = this.style.width;
        }
    }

    for (let i = this._renderList.length; i--;) {
      this.font.strokeWidth && ct.strokeText(this._renderList[i], x, lh * (i + 0.5));
      (0, _fill.default)(this.font) && ct.fillText(this._renderList[i], x, lh * (i + 0.5));
    }

    ct.restore();
    this._renderList = undefined;
  }

  destructor() {
    this._fontString = undefined;
    this._renderList = undefined;
    this.danmaku = undefined;
    this.style = undefined;
    this.font = undefined;

    if (this._bitmap) {
      this._bitmap.close();

      this._bitmap = null;
    }
  }

}

const tunnels = ['right', 'left', 'bottom', 'top'];

class TunnelManager {
  constructor() {
    this.reset();
  }

  reset() {
    this.right = {};
    this.left = {};
    this.bottom = {};
    this.top = {};
  }

  getTunnel(tobj, cHeight) {
    //get the tunnel index that can contain the danmaku of the sizes
    let tunnel = this.tunnel(tobj.danmaku.mode),
        size = tobj.style.height,
        ti = 0,
        tnum = -1;

    if (typeof size !== 'number' || size <= 0) {
      console.error('Incorrect size:' + size);
      size = 24;
    }

    if (size > cHeight) return 0;

    while (tnum < 0) {
      for (let t = ti + size - 1; ti <= t;) {
        if (tunnel[ti]) {
          //used
          ti += tunnel[ti].tunnelHeight;
          break;
        } else if (ti !== 0 && ti % (cHeight - 1) === 0) {
          //new page
          ti++;
          break;
        } else if (ti === t) {
          //get
          tnum = ti - size + 1;
          break;
        } else {
          ti++;
        }
      }
    }

    tobj.tunnelNumber = tnum;
    tobj.tunnelHeight = tobj.style.y + size > cHeight ? 1 : size;
    this.addMark(tobj);
    return tnum;
  }

  addMark(tobj) {
    let t = this.tunnel(tobj.danmaku.mode);
    if (!t[tobj.tunnelNumber]) t[tobj.tunnelNumber] = tobj;
  }

  removeMark(tobj) {
    let t,
        tun = tobj.tunnelNumber;

    if (tun >= 0 && (t = this.tunnel(tobj.danmaku.mode))[tun] === tobj) {
      delete t[tun];
      tobj.tunnelNumber = -1;
    }
  }

  tunnel(id) {
    return this[tunnels[id]];
  }

}

class RenderingDanmakuManager {
  //limit danmaku area on the screen(auto change)
  constructor(dText) {
    (0, _defineProperty2.default)(this, "totalArea", 0);
    (0, _defineProperty2.default)(this, "onScreenArea", 0);
    (0, _defineProperty2.default)(this, "limitArea", Infinity);
    (0, _defineProperty2.default)(this, "tunnelManager", new TunnelManager());
    //dText:TextDanmaku
    this.dText = dText;
    if (dText.text2d.supported) this.timer = (0, _setInterval2.default)(() => this.rendererModeCheck(), 1500);
  }

  add(t) {
    this.dText.DanmakuText.push(t);
    this.totalArea += t._cache.width * t._cache.height; //cumulate danmaku area

    this.onScreenArea += Math.min(t._cache.width, this.dText.frame.width) * Math.min(t._cache.height, this.dText.frame.height);
    this.dText.activeRendererMode.newDanmaku(t);
  }

  remove(t) {
    var _context9;

    let ind = (0, _indexOf.default)(_context9 = this.dText.DanmakuText).call(_context9, t);

    if (ind >= 0) {
      var _context10;

      (0, _splice.default)(_context10 = this.dText.DanmakuText).call(_context10, ind, 1);
      this.totalArea -= t._cache.width * t._cache.height;
      this.onScreenArea -= Math.min(t._cache.width, this.dText.frame.width) * Math.min(t._cache.height, this.dText.frame.height);
    }

    this.tunnelManager.removeMark(t);
    this.dText.activeRendererMode.remove(t);
    this.dText.activeRendererMode.deleteRelatedTextObject(t);
    t.removeTime = (0, _now.default)();
    t.danmaku = null;
    this.dText.GraphCache.push(t);
  }

  clear() {
    for (let i = 0, T; i < this.dText.DanmakuText.length; i++) {
      T = this.dText.DanmakuText[i];
      this.remove(T);
    }

    this.tunnelManager.reset();
  }

  rendererModeCheck() {
    //auto shift rendering mode
    let D = this.dText;
    if (!this.dText.options.autoShiftRenderingMode || D.paused) return;

    if (D.frame.fps < (D.frame.fpsLimit || 60) * 0.9) {
      //when frame rate low
      if (this.limitArea > this.totalArea) this.limitArea = this.totalArea; //reduce area limit
    } else if (this.limitArea < this.totalArea) {
      //increase area limit
      this.limitArea = this.totalArea;
    }

    if (D.rendererMode === 1 && this.totalArea > this.limitArea) {
      //switch to canvas mode when fps low
      D.text2d.supported && D.setRendererMode(2);
    } else if (D.rendererMode === 2 && this.totalArea < this.limitArea * 0.5) {
      //recover to css mode when animation is fluent enough
      D.textCss.supported && D.setRendererMode(1);
    }
  }

}

function dichotomy(arr, t, start, end, position = false) {
  if (arr.length === 0) return 0;
  let m = start
  /* ,s=start,e=end */
  ;

  while (start <= end) {
    //dichotomy
    m = start + end >> 1;
    if (t <= arr[m].time) end = m - 1;else {
      start = m + 1;
    }
  }

  if (position) {
    //find to top
    while (start > 0 && arr[start - 1].time === t) start--;
  } else {
    //find to end
    while (start <= end && arr[start].time === t) start++;
  }

  return start;
}

function init(DanmakuFrame) {
  DanmakuFrame.addModule('TextDanmaku', TextDanmaku);
}

;
;

},{"../danmaku-frame.js":10,"./TextCanvas2D.js":11,"./TextCss.js":12,"./TextWebGL.js":13,"./Textoff.js":14,"@babel/runtime-corejs3/core-js-stable/date/now":18,"@babel/runtime-corejs3/core-js-stable/instance/bind":19,"@babel/runtime-corejs3/core-js-stable/instance/fill":21,"@babel/runtime-corejs3/core-js-stable/instance/for-each":22,"@babel/runtime-corejs3/core-js-stable/instance/index-of":23,"@babel/runtime-corejs3/core-js-stable/instance/splice":27,"@babel/runtime-corejs3/core-js-stable/object/assign":30,"@babel/runtime-corejs3/core-js-stable/object/create":31,"@babel/runtime-corejs3/core-js-stable/object/define-property":32,"@babel/runtime-corejs3/core-js-stable/set-interval":37,"@babel/runtime-corejs3/helpers/defineProperty":40,"@babel/runtime-corejs3/helpers/interopRequireDefault":41}],16:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

/*
Copyright luojia@luojia.me
LGPL license
*/
class textModuleTemplate {
  constructor(dText) {
    (0, _defineProperty2.default)(this, "supported", false);
    this.dText = dText;
  }

  draw() {} //draw call from danmaku-frame on every animation frame


  rate() {} //playback rate


  pause() {} //the media is paused


  play() {} //the media is starting


  clear() {} //clear all danmaku on screen


  resize() {} //the container is resized


  remove() {} //remove a danmaku freom the screen


  enable() {} //this module is enabled


  disable() {} //this module is disabled


  newDanmaku() {} //add danmaku to the screen


  deleteRelatedTextObject() {}

}

var _default = textModuleTemplate;
exports.default = _default;

},{"@babel/runtime-corejs3/core-js-stable/object/define-property":32,"@babel/runtime-corejs3/helpers/defineProperty":40,"@babel/runtime-corejs3/helpers/interopRequireDefault":41}],17:[function(require,module,exports){
module.exports = require("core-js-pure/stable/array/is-array");
},{"core-js-pure/stable/array/is-array":204}],18:[function(require,module,exports){
module.exports = require("core-js-pure/stable/date/now");
},{"core-js-pure/stable/date/now":206}],19:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/bind");
},{"core-js-pure/stable/instance/bind":207}],20:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/copy-within");
},{"core-js-pure/stable/instance/copy-within":208}],21:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/fill");
},{"core-js-pure/stable/instance/fill":209}],22:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/for-each");
},{"core-js-pure/stable/instance/for-each":210}],23:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/index-of");
},{"core-js-pure/stable/instance/index-of":211}],24:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/repeat");
},{"core-js-pure/stable/instance/repeat":212}],25:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/slice");
},{"core-js-pure/stable/instance/slice":213}],26:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/sort");
},{"core-js-pure/stable/instance/sort":214}],27:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/splice");
},{"core-js-pure/stable/instance/splice":215}],28:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/starts-with");
},{"core-js-pure/stable/instance/starts-with":216}],29:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/trim");
},{"core-js-pure/stable/instance/trim":217}],30:[function(require,module,exports){
module.exports = require("core-js-pure/stable/object/assign");
},{"core-js-pure/stable/object/assign":218}],31:[function(require,module,exports){
module.exports = require("core-js-pure/stable/object/create");
},{"core-js-pure/stable/object/create":219}],32:[function(require,module,exports){
module.exports = require("core-js-pure/stable/object/define-property");
},{"core-js-pure/stable/object/define-property":220}],33:[function(require,module,exports){
module.exports = require("core-js-pure/stable/object/entries");
},{"core-js-pure/stable/object/entries":221}],34:[function(require,module,exports){
module.exports = require("core-js-pure/stable/object/get-own-property-descriptor");
},{"core-js-pure/stable/object/get-own-property-descriptor":222}],35:[function(require,module,exports){
module.exports = require("core-js-pure/stable/promise");
},{"core-js-pure/stable/promise":223}],36:[function(require,module,exports){
module.exports = require("core-js-pure/stable/set-immediate");
},{"core-js-pure/stable/set-immediate":224}],37:[function(require,module,exports){
module.exports = require("core-js-pure/stable/set-interval");
},{"core-js-pure/stable/set-interval":225}],38:[function(require,module,exports){
module.exports = require("core-js-pure/stable/set-timeout");
},{"core-js-pure/stable/set-timeout":226}],39:[function(require,module,exports){
module.exports = require("core-js-pure/features/object/define-property");
},{"core-js-pure/features/object/define-property":71}],40:[function(require,module,exports){
var _Object$defineProperty = require("../core-js/object/define-property");

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _Object$defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
},{"../core-js/object/define-property":39}],41:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
},{}],42:[function(require,module,exports){
require('../../modules/es.array.is-array');
var path = require('../../internals/path');

module.exports = path.Array.isArray;

},{"../../internals/path":148,"../../modules/es.array.is-array":181}],43:[function(require,module,exports){
require('../../../modules/es.array.copy-within');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').copyWithin;

},{"../../../internals/entry-virtual":103,"../../../modules/es.array.copy-within":177}],44:[function(require,module,exports){
require('../../../modules/es.array.fill');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').fill;

},{"../../../internals/entry-virtual":103,"../../../modules/es.array.fill":178}],45:[function(require,module,exports){
require('../../../modules/es.array.for-each');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').forEach;

},{"../../../internals/entry-virtual":103,"../../../modules/es.array.for-each":179}],46:[function(require,module,exports){
require('../../../modules/es.array.index-of');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').indexOf;

},{"../../../internals/entry-virtual":103,"../../../modules/es.array.index-of":180}],47:[function(require,module,exports){
require('../../../modules/es.array.slice');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').slice;

},{"../../../internals/entry-virtual":103,"../../../modules/es.array.slice":183}],48:[function(require,module,exports){
require('../../../modules/es.array.sort');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').sort;

},{"../../../internals/entry-virtual":103,"../../../modules/es.array.sort":184}],49:[function(require,module,exports){
require('../../../modules/es.array.splice');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').splice;

},{"../../../internals/entry-virtual":103,"../../../modules/es.array.splice":185}],50:[function(require,module,exports){
require('../../modules/es.date.now');
var path = require('../../internals/path');

module.exports = path.Date.now;

},{"../../internals/path":148,"../../modules/es.date.now":186}],51:[function(require,module,exports){
require('../../../modules/es.function.bind');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Function').bind;

},{"../../../internals/entry-virtual":103,"../../../modules/es.function.bind":187}],52:[function(require,module,exports){
var bind = require('../function/virtual/bind');

var FunctionPrototype = Function.prototype;

module.exports = function (it) {
  var own = it.bind;
  return it === FunctionPrototype || (it instanceof Function && own === FunctionPrototype.bind) ? bind : own;
};

},{"../function/virtual/bind":51}],53:[function(require,module,exports){
var copyWithin = require('../array/virtual/copy-within');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.copyWithin;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.copyWithin) ? copyWithin : own;
};

},{"../array/virtual/copy-within":43}],54:[function(require,module,exports){
var fill = require('../array/virtual/fill');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.fill;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.fill) ? fill : own;
};

},{"../array/virtual/fill":44}],55:[function(require,module,exports){
var indexOf = require('../array/virtual/index-of');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.indexOf;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.indexOf) ? indexOf : own;
};

},{"../array/virtual/index-of":46}],56:[function(require,module,exports){
var repeat = require('../string/virtual/repeat');

var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.repeat;
  return typeof it === 'string' || it === StringPrototype
    || (it instanceof String && own === StringPrototype.repeat) ? repeat : own;
};

},{"../string/virtual/repeat":68}],57:[function(require,module,exports){
var slice = require('../array/virtual/slice');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.slice;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.slice) ? slice : own;
};

},{"../array/virtual/slice":47}],58:[function(require,module,exports){
var sort = require('../array/virtual/sort');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.sort;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.sort) ? sort : own;
};

},{"../array/virtual/sort":48}],59:[function(require,module,exports){
var splice = require('../array/virtual/splice');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.splice;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.splice) ? splice : own;
};

},{"../array/virtual/splice":49}],60:[function(require,module,exports){
var startsWith = require('../string/virtual/starts-with');

var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.startsWith;
  return typeof it === 'string' || it === StringPrototype
    || (it instanceof String && own === StringPrototype.startsWith) ? startsWith : own;
};

},{"../string/virtual/starts-with":69}],61:[function(require,module,exports){
var trim = require('../string/virtual/trim');

var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.trim;
  return typeof it === 'string' || it === StringPrototype
    || (it instanceof String && own === StringPrototype.trim) ? trim : own;
};

},{"../string/virtual/trim":70}],62:[function(require,module,exports){
require('../../modules/es.object.assign');
var path = require('../../internals/path');

module.exports = path.Object.assign;

},{"../../internals/path":148,"../../modules/es.object.assign":188}],63:[function(require,module,exports){
require('../../modules/es.object.create');
var path = require('../../internals/path');

var Object = path.Object;

module.exports = function create(P, D) {
  return Object.create(P, D);
};

},{"../../internals/path":148,"../../modules/es.object.create":189}],64:[function(require,module,exports){
require('../../modules/es.object.define-property');
var path = require('../../internals/path');

var Object = path.Object;

var defineProperty = module.exports = function defineProperty(it, key, desc) {
  return Object.defineProperty(it, key, desc);
};

if (Object.defineProperty.sham) defineProperty.sham = true;

},{"../../internals/path":148,"../../modules/es.object.define-property":190}],65:[function(require,module,exports){
require('../../modules/es.object.entries');
var path = require('../../internals/path');

module.exports = path.Object.entries;

},{"../../internals/path":148,"../../modules/es.object.entries":191}],66:[function(require,module,exports){
require('../../modules/es.object.get-own-property-descriptor');
var path = require('../../internals/path');

var Object = path.Object;

var getOwnPropertyDescriptor = module.exports = function getOwnPropertyDescriptor(it, key) {
  return Object.getOwnPropertyDescriptor(it, key);
};

if (Object.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor.sham = true;

},{"../../internals/path":148,"../../modules/es.object.get-own-property-descriptor":192}],67:[function(require,module,exports){
require('../../modules/es.object.to-string');
require('../../modules/es.string.iterator');
require('../../modules/web.dom-collections.iterator');
require('../../modules/es.promise');
require('../../modules/es.promise.all-settled');
require('../../modules/es.promise.finally');
var path = require('../../internals/path');

module.exports = path.Promise;

},{"../../internals/path":148,"../../modules/es.object.to-string":193,"../../modules/es.promise":196,"../../modules/es.promise.all-settled":194,"../../modules/es.promise.finally":195,"../../modules/es.string.iterator":197,"../../modules/web.dom-collections.iterator":201}],68:[function(require,module,exports){
require('../../../modules/es.string.repeat');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('String').repeat;

},{"../../../internals/entry-virtual":103,"../../../modules/es.string.repeat":198}],69:[function(require,module,exports){
require('../../../modules/es.string.starts-with');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('String').startsWith;

},{"../../../internals/entry-virtual":103,"../../../modules/es.string.starts-with":199}],70:[function(require,module,exports){
require('../../../modules/es.string.trim');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('String').trim;

},{"../../../internals/entry-virtual":103,"../../../modules/es.string.trim":200}],71:[function(require,module,exports){
var parent = require('../../es/object/define-property');

module.exports = parent;

},{"../../es/object/define-property":64}],72:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

},{}],73:[function(require,module,exports){
var isObject = require('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

},{"../internals/is-object":123}],74:[function(require,module,exports){
module.exports = function () { /* empty */ };

},{}],75:[function(require,module,exports){
module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

},{}],76:[function(require,module,exports){
var isObject = require('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

},{"../internals/is-object":123}],77:[function(require,module,exports){
'use strict';
var toObject = require('../internals/to-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toLength = require('../internals/to-length');

var min = Math.min;

// `Array.prototype.copyWithin` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin
module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

},{"../internals/to-absolute-index":166,"../internals/to-length":169,"../internals/to-object":170}],78:[function(require,module,exports){
'use strict';
var toObject = require('../internals/to-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toLength = require('../internals/to-length');

// `Array.prototype.fill` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

},{"../internals/to-absolute-index":166,"../internals/to-length":169,"../internals/to-object":170}],79:[function(require,module,exports){
'use strict';
var $forEach = require('../internals/array-iteration').forEach;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

},{"../internals/array-iteration":81,"../internals/array-method-is-strict":83,"../internals/array-method-uses-to-length":84}],80:[function(require,module,exports){
var toIndexedObject = require('../internals/to-indexed-object');
var toLength = require('../internals/to-length');
var toAbsoluteIndex = require('../internals/to-absolute-index');

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

},{"../internals/to-absolute-index":166,"../internals/to-indexed-object":167,"../internals/to-length":169}],81:[function(require,module,exports){
var bind = require('../internals/function-bind-context');
var IndexedObject = require('../internals/indexed-object');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var arraySpeciesCreate = require('../internals/array-species-create');

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};

},{"../internals/array-species-create":85,"../internals/function-bind-context":107,"../internals/indexed-object":117,"../internals/to-length":169,"../internals/to-object":170}],82:[function(require,module,exports){
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/engine-v8-version');

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

},{"../internals/engine-v8-version":102,"../internals/fails":106,"../internals/well-known-symbol":175}],83:[function(require,module,exports){
'use strict';
var fails = require('../internals/fails');

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

},{"../internals/fails":106}],84:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var has = require('../internals/has');

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};

},{"../internals/descriptors":97,"../internals/fails":106,"../internals/has":112}],85:[function(require,module,exports){
var isObject = require('../internals/is-object');
var isArray = require('../internals/is-array');
var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

},{"../internals/is-array":121,"../internals/is-object":123,"../internals/well-known-symbol":175}],86:[function(require,module,exports){
var anObject = require('../internals/an-object');

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

},{"../internals/an-object":76}],87:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

},{"../internals/well-known-symbol":175}],88:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],89:[function(require,module,exports){
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var classofRaw = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

},{"../internals/classof-raw":88,"../internals/to-string-tag-support":172,"../internals/well-known-symbol":175}],90:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};

},{"../internals/well-known-symbol":175}],91:[function(require,module,exports){
var fails = require('../internals/fails');

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

},{"../internals/fails":106}],92:[function(require,module,exports){
'use strict';
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var create = require('../internals/object-create');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var setToStringTag = require('../internals/set-to-string-tag');
var Iterators = require('../internals/iterators');

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

},{"../internals/create-property-descriptor":94,"../internals/iterators":128,"../internals/iterators-core":127,"../internals/object-create":136,"../internals/set-to-string-tag":156}],93:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"../internals/create-property-descriptor":94,"../internals/descriptors":97,"../internals/object-define-property":138}],94:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],95:[function(require,module,exports){
'use strict';
var toPrimitive = require('../internals/to-primitive');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

},{"../internals/create-property-descriptor":94,"../internals/object-define-property":138,"../internals/to-primitive":171}],96:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var createIteratorConstructor = require('../internals/create-iterator-constructor');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var setToStringTag = require('../internals/set-to-string-tag');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');
var Iterators = require('../internals/iterators');
var IteratorsCore = require('../internals/iterators-core');

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

},{"../internals/create-iterator-constructor":92,"../internals/create-non-enumerable-property":93,"../internals/export":105,"../internals/is-pure":124,"../internals/iterators":128,"../internals/iterators-core":127,"../internals/object-get-prototype-of":141,"../internals/object-set-prototype-of":145,"../internals/redefine":152,"../internals/set-to-string-tag":156,"../internals/well-known-symbol":175}],97:[function(require,module,exports){
var fails = require('../internals/fails');

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

},{"../internals/fails":106}],98:[function(require,module,exports){
var global = require('../internals/global');
var isObject = require('../internals/is-object');

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

},{"../internals/global":111,"../internals/is-object":123}],99:[function(require,module,exports){
// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

},{}],100:[function(require,module,exports){
var userAgent = require('../internals/engine-user-agent');

module.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);

},{"../internals/engine-user-agent":101}],101:[function(require,module,exports){
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('navigator', 'userAgent') || '';

},{"../internals/get-built-in":109}],102:[function(require,module,exports){
var global = require('../internals/global');
var userAgent = require('../internals/engine-user-agent');

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;

},{"../internals/engine-user-agent":101,"../internals/global":111}],103:[function(require,module,exports){
var path = require('../internals/path');

module.exports = function (CONSTRUCTOR) {
  return path[CONSTRUCTOR + 'Prototype'];
};

},{"../internals/path":148}],104:[function(require,module,exports){
// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

},{}],105:[function(require,module,exports){
'use strict';
var global = require('../internals/global');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var isForced = require('../internals/is-forced');
var path = require('../internals/path');
var bind = require('../internals/function-bind-context');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var has = require('../internals/has');

var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof NativeConstructor) {
      switch (arguments.length) {
        case 0: return new NativeConstructor();
        case 1: return new NativeConstructor(a);
        case 2: return new NativeConstructor(a, b);
      } return new NativeConstructor(a, b, c);
    } return NativeConstructor.apply(this, arguments);
  };
  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;

  var nativeSource = GLOBAL ? global : STATIC ? global[TARGET] : (global[TARGET] || {}).prototype;

  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
  var targetPrototype = target.prototype;

  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contains in native
    USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);

    targetProperty = target[key];

    if (USE_NATIVE) if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key];

    // export native or implementation
    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

    // bind timers to global for call from export context
    if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, global);
    // wrap global constructors for prevent changs in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
    // make static versions for prototype methods
    else if (PROTO && typeof sourceProperty == 'function') resultProperty = bind(Function.call, sourceProperty);
    // default case
    else resultProperty = sourceProperty;

    // add a flag to not completely full polyfills
    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(resultProperty, 'sham', true);
    }

    target[key] = resultProperty;

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
      if (!has(path, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
      }
      // export virtual prototype methods
      path[VIRTUAL_PROTOTYPE][key] = sourceProperty;
      // export real prototype methods
      if (options.real && targetPrototype && !targetPrototype[key]) {
        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
      }
    }
  }
};

},{"../internals/create-non-enumerable-property":93,"../internals/function-bind-context":107,"../internals/global":111,"../internals/has":112,"../internals/is-forced":122,"../internals/object-get-own-property-descriptor":139,"../internals/path":148}],106:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

},{}],107:[function(require,module,exports){
var aFunction = require('../internals/a-function');

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"../internals/a-function":72}],108:[function(require,module,exports){
'use strict';
var aFunction = require('../internals/a-function');
var isObject = require('../internals/is-object');

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = slice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};

},{"../internals/a-function":72,"../internals/is-object":123}],109:[function(require,module,exports){
var path = require('../internals/path');
var global = require('../internals/global');

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

},{"../internals/global":111,"../internals/path":148}],110:[function(require,module,exports){
var classof = require('../internals/classof');
var Iterators = require('../internals/iterators');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"../internals/classof":89,"../internals/iterators":128,"../internals/well-known-symbol":175}],111:[function(require,module,exports){
(function (global){
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],112:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],113:[function(require,module,exports){
module.exports = {};

},{}],114:[function(require,module,exports){
var global = require('../internals/global');

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

},{"../internals/global":111}],115:[function(require,module,exports){
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('document', 'documentElement');

},{"../internals/get-built-in":109}],116:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var createElement = require('../internals/document-create-element');

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

},{"../internals/descriptors":97,"../internals/document-create-element":98,"../internals/fails":106}],117:[function(require,module,exports){
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

},{"../internals/classof-raw":88,"../internals/fails":106}],118:[function(require,module,exports){
var store = require('../internals/shared-store');

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;

},{"../internals/shared-store":158}],119:[function(require,module,exports){
var NATIVE_WEAK_MAP = require('../internals/native-weak-map');
var global = require('../internals/global');
var isObject = require('../internals/is-object');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var objectHas = require('../internals/has');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

},{"../internals/create-non-enumerable-property":93,"../internals/global":111,"../internals/has":112,"../internals/hidden-keys":113,"../internals/is-object":123,"../internals/native-weak-map":132,"../internals/shared-key":157}],120:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

},{"../internals/iterators":128,"../internals/well-known-symbol":175}],121:[function(require,module,exports){
var classof = require('../internals/classof-raw');

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};

},{"../internals/classof-raw":88}],122:[function(require,module,exports){
var fails = require('../internals/fails');

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;

},{"../internals/fails":106}],123:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],124:[function(require,module,exports){
module.exports = true;

},{}],125:[function(require,module,exports){
var isObject = require('../internals/is-object');
var classof = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};

},{"../internals/classof-raw":88,"../internals/is-object":123,"../internals/well-known-symbol":175}],126:[function(require,module,exports){
var anObject = require('../internals/an-object');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var toLength = require('../internals/to-length');
var bind = require('../internals/function-bind-context');
var getIteratorMethod = require('../internals/get-iterator-method');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};

},{"../internals/an-object":76,"../internals/call-with-safe-iteration-closing":86,"../internals/function-bind-context":107,"../internals/get-iterator-method":110,"../internals/is-array-iterator-method":120,"../internals/to-length":169}],127:[function(require,module,exports){
'use strict';
var getPrototypeOf = require('../internals/object-get-prototype-of');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var has = require('../internals/has');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

},{"../internals/create-non-enumerable-property":93,"../internals/has":112,"../internals/is-pure":124,"../internals/object-get-prototype-of":141,"../internals/well-known-symbol":175}],128:[function(require,module,exports){
arguments[4][113][0].apply(exports,arguments)
},{"dup":113}],129:[function(require,module,exports){
var global = require('../internals/global');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var classof = require('../internals/classof-raw');
var macrotask = require('../internals/task').set;
var IS_IOS = require('../internals/engine-is-ios');

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var IS_NODE = classof(process) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver && !IS_IOS) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};

},{"../internals/classof-raw":88,"../internals/engine-is-ios":100,"../internals/global":111,"../internals/object-get-own-property-descriptor":139,"../internals/task":165}],130:[function(require,module,exports){
var global = require('../internals/global');

module.exports = global.Promise;

},{"../internals/global":111}],131:[function(require,module,exports){
var fails = require('../internals/fails');

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

},{"../internals/fails":106}],132:[function(require,module,exports){
var global = require('../internals/global');
var inspectSource = require('../internals/inspect-source');

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

},{"../internals/global":111,"../internals/inspect-source":118}],133:[function(require,module,exports){
'use strict';
var aFunction = require('../internals/a-function');

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"../internals/a-function":72}],134:[function(require,module,exports){
var isRegExp = require('../internals/is-regexp');

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};

},{"../internals/is-regexp":125}],135:[function(require,module,exports){
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var objectKeys = require('../internals/object-keys');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var toObject = require('../internals/to-object');
var IndexedObject = require('../internals/indexed-object');

var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
module.exports = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;

},{"../internals/descriptors":97,"../internals/fails":106,"../internals/indexed-object":117,"../internals/object-get-own-property-symbols":140,"../internals/object-keys":143,"../internals/object-property-is-enumerable":144,"../internals/to-object":170}],136:[function(require,module,exports){
var anObject = require('../internals/an-object');
var defineProperties = require('../internals/object-define-properties');
var enumBugKeys = require('../internals/enum-bug-keys');
var hiddenKeys = require('../internals/hidden-keys');
var html = require('../internals/html');
var documentCreateElement = require('../internals/document-create-element');
var sharedKey = require('../internals/shared-key');

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

},{"../internals/an-object":76,"../internals/document-create-element":98,"../internals/enum-bug-keys":104,"../internals/hidden-keys":113,"../internals/html":115,"../internals/object-define-properties":137,"../internals/shared-key":157}],137:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var anObject = require('../internals/an-object');
var objectKeys = require('../internals/object-keys');

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};

},{"../internals/an-object":76,"../internals/descriptors":97,"../internals/object-define-property":138,"../internals/object-keys":143}],138:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');
var anObject = require('../internals/an-object');
var toPrimitive = require('../internals/to-primitive');

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"../internals/an-object":76,"../internals/descriptors":97,"../internals/ie8-dom-define":116,"../internals/to-primitive":171}],139:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var toIndexedObject = require('../internals/to-indexed-object');
var toPrimitive = require('../internals/to-primitive');
var has = require('../internals/has');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

},{"../internals/create-property-descriptor":94,"../internals/descriptors":97,"../internals/has":112,"../internals/ie8-dom-define":116,"../internals/object-property-is-enumerable":144,"../internals/to-indexed-object":167,"../internals/to-primitive":171}],140:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],141:[function(require,module,exports){
var has = require('../internals/has');
var toObject = require('../internals/to-object');
var sharedKey = require('../internals/shared-key');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};

},{"../internals/correct-prototype-getter":91,"../internals/has":112,"../internals/shared-key":157,"../internals/to-object":170}],142:[function(require,module,exports){
var has = require('../internals/has');
var toIndexedObject = require('../internals/to-indexed-object');
var indexOf = require('../internals/array-includes').indexOf;
var hiddenKeys = require('../internals/hidden-keys');

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

},{"../internals/array-includes":80,"../internals/has":112,"../internals/hidden-keys":113,"../internals/to-indexed-object":167}],143:[function(require,module,exports){
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

},{"../internals/enum-bug-keys":104,"../internals/object-keys-internal":142}],144:[function(require,module,exports){
'use strict';
var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

},{}],145:[function(require,module,exports){
var anObject = require('../internals/an-object');
var aPossiblePrototype = require('../internals/a-possible-prototype');

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

},{"../internals/a-possible-prototype":73,"../internals/an-object":76}],146:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var objectKeys = require('../internals/object-keys');
var toIndexedObject = require('../internals/to-indexed-object');
var propertyIsEnumerable = require('../internals/object-property-is-enumerable').f;

// `Object.{ entries, values }` methods implementation
var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.github.io/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  values: createMethod(false)
};

},{"../internals/descriptors":97,"../internals/object-keys":143,"../internals/object-property-is-enumerable":144,"../internals/to-indexed-object":167}],147:[function(require,module,exports){
'use strict';
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var classof = require('../internals/classof');

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

},{"../internals/classof":89,"../internals/to-string-tag-support":172}],148:[function(require,module,exports){
arguments[4][113][0].apply(exports,arguments)
},{"dup":113}],149:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

},{}],150:[function(require,module,exports){
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var newPromiseCapability = require('../internals/new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"../internals/an-object":76,"../internals/is-object":123,"../internals/new-promise-capability":133}],151:[function(require,module,exports){
var redefine = require('../internals/redefine');

module.exports = function (target, src, options) {
  for (var key in src) {
    if (options && options.unsafe && target[key]) target[key] = src[key];
    else redefine(target, key, src[key], options);
  } return target;
};

},{"../internals/redefine":152}],152:[function(require,module,exports){
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

module.exports = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;
  else createNonEnumerableProperty(target, key, value);
};

},{"../internals/create-non-enumerable-property":93}],153:[function(require,module,exports){
// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

},{}],154:[function(require,module,exports){
var global = require('../internals/global');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};

},{"../internals/create-non-enumerable-property":93,"../internals/global":111}],155:[function(require,module,exports){
'use strict';
var getBuiltIn = require('../internals/get-built-in');
var definePropertyModule = require('../internals/object-define-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var DESCRIPTORS = require('../internals/descriptors');

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

},{"../internals/descriptors":97,"../internals/get-built-in":109,"../internals/object-define-property":138,"../internals/well-known-symbol":175}],156:[function(require,module,exports){
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var defineProperty = require('../internals/object-define-property').f;
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var has = require('../internals/has');
var toString = require('../internals/object-to-string');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;
    if (!has(target, TO_STRING_TAG)) {
      defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
    }
    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
      createNonEnumerableProperty(target, 'toString', toString);
    }
  }
};

},{"../internals/create-non-enumerable-property":93,"../internals/has":112,"../internals/object-define-property":138,"../internals/object-to-string":147,"../internals/to-string-tag-support":172,"../internals/well-known-symbol":175}],157:[function(require,module,exports){
var shared = require('../internals/shared');
var uid = require('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":159,"../internals/uid":173}],158:[function(require,module,exports){
var global = require('../internals/global');
var setGlobal = require('../internals/set-global');

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;

},{"../internals/global":111,"../internals/set-global":154}],159:[function(require,module,exports){
var IS_PURE = require('../internals/is-pure');
var store = require('../internals/shared-store');

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.4',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

},{"../internals/is-pure":124,"../internals/shared-store":158}],160:[function(require,module,exports){
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};

},{"../internals/a-function":72,"../internals/an-object":76,"../internals/well-known-symbol":175}],161:[function(require,module,exports){
var toInteger = require('../internals/to-integer');
var requireObjectCoercible = require('../internals/require-object-coercible');

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

},{"../internals/require-object-coercible":153,"../internals/to-integer":168}],162:[function(require,module,exports){
'use strict';
var toInteger = require('../internals/to-integer');
var requireObjectCoercible = require('../internals/require-object-coercible');

// `String.prototype.repeat` method implementation
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
module.exports = ''.repeat || function repeat(count) {
  var str = String(requireObjectCoercible(this));
  var result = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};

},{"../internals/require-object-coercible":153,"../internals/to-integer":168}],163:[function(require,module,exports){
var fails = require('../internals/fails');
var whitespaces = require('../internals/whitespaces');

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

},{"../internals/fails":106,"../internals/whitespaces":176}],164:[function(require,module,exports){
var requireObjectCoercible = require('../internals/require-object-coercible');
var whitespaces = require('../internals/whitespaces');

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};

},{"../internals/require-object-coercible":153,"../internals/whitespaces":176}],165:[function(require,module,exports){
var global = require('../internals/global');
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');
var bind = require('../internals/function-bind-context');
var html = require('../internals/html');
var createElement = require('../internals/document-create-element');
var IS_IOS = require('../internals/engine-is-ios');

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (classof(process) == 'process') {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    typeof postMessage == 'function' &&
    !global.importScripts &&
    !fails(post) &&
    location.protocol !== 'file:'
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};

},{"../internals/classof-raw":88,"../internals/document-create-element":98,"../internals/engine-is-ios":100,"../internals/fails":106,"../internals/function-bind-context":107,"../internals/global":111,"../internals/html":115}],166:[function(require,module,exports){
var toInteger = require('../internals/to-integer');

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"../internals/to-integer":168}],167:[function(require,module,exports){
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object');
var requireObjectCoercible = require('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":117,"../internals/require-object-coercible":153}],168:[function(require,module,exports){
var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

},{}],169:[function(require,module,exports){
var toInteger = require('../internals/to-integer');

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer":168}],170:[function(require,module,exports){
var requireObjectCoercible = require('../internals/require-object-coercible');

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

},{"../internals/require-object-coercible":153}],171:[function(require,module,exports){
var isObject = require('../internals/is-object');

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"../internals/is-object":123}],172:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';

},{"../internals/well-known-symbol":175}],173:[function(require,module,exports){
var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

},{}],174:[function(require,module,exports){
var NATIVE_SYMBOL = require('../internals/native-symbol');

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';

},{"../internals/native-symbol":131}],175:[function(require,module,exports){
var global = require('../internals/global');
var shared = require('../internals/shared');
var has = require('../internals/has');
var uid = require('../internals/uid');
var NATIVE_SYMBOL = require('../internals/native-symbol');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

},{"../internals/global":111,"../internals/has":112,"../internals/native-symbol":131,"../internals/shared":159,"../internals/uid":173,"../internals/use-symbol-as-uid":174}],176:[function(require,module,exports){
// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],177:[function(require,module,exports){
var $ = require('../internals/export');
var copyWithin = require('../internals/array-copy-within');
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.copyWithin` method
// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin
$({ target: 'Array', proto: true }, {
  copyWithin: copyWithin
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('copyWithin');

},{"../internals/add-to-unscopables":74,"../internals/array-copy-within":77,"../internals/export":105}],178:[function(require,module,exports){
var $ = require('../internals/export');
var fill = require('../internals/array-fill');
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
$({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('fill');

},{"../internals/add-to-unscopables":74,"../internals/array-fill":78,"../internals/export":105}],179:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var forEach = require('../internals/array-for-each');

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});

},{"../internals/array-for-each":79,"../internals/export":105}],180:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var $indexOf = require('../internals/array-includes').indexOf;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/array-includes":80,"../internals/array-method-is-strict":83,"../internals/array-method-uses-to-length":84,"../internals/export":105}],181:[function(require,module,exports){
var $ = require('../internals/export');
var isArray = require('../internals/is-array');

// `Array.isArray` method
// https://tc39.github.io/ecma262/#sec-array.isarray
$({ target: 'Array', stat: true }, {
  isArray: isArray
});

},{"../internals/export":105,"../internals/is-array":121}],182:[function(require,module,exports){
'use strict';
var toIndexedObject = require('../internals/to-indexed-object');
var addToUnscopables = require('../internals/add-to-unscopables');
var Iterators = require('../internals/iterators');
var InternalStateModule = require('../internals/internal-state');
var defineIterator = require('../internals/define-iterator');

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"../internals/add-to-unscopables":74,"../internals/define-iterator":96,"../internals/internal-state":119,"../internals/iterators":128,"../internals/to-indexed-object":167}],183:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var isObject = require('../internals/is-object');
var isArray = require('../internals/is-array');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toLength = require('../internals/to-length');
var toIndexedObject = require('../internals/to-indexed-object');
var createProperty = require('../internals/create-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});

},{"../internals/array-method-has-species-support":82,"../internals/array-method-uses-to-length":84,"../internals/create-property":95,"../internals/export":105,"../internals/is-array":121,"../internals/is-object":123,"../internals/to-absolute-index":166,"../internals/to-indexed-object":167,"../internals/to-length":169,"../internals/well-known-symbol":175}],184:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var aFunction = require('../internals/a-function');
var toObject = require('../internals/to-object');
var fails = require('../internals/fails');
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var test = [];
var nativeSort = test.sort;

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD;

// `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? nativeSort.call(toObject(this))
      : nativeSort.call(toObject(this), aFunction(comparefn));
  }
});

},{"../internals/a-function":72,"../internals/array-method-is-strict":83,"../internals/export":105,"../internals/fails":106,"../internals/to-object":170}],185:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toInteger = require('../internals/to-integer');
var toLength = require('../internals/to-length');
var toObject = require('../internals/to-object');
var arraySpeciesCreate = require('../internals/array-species-create');
var createProperty = require('../internals/create-property');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

},{"../internals/array-method-has-species-support":82,"../internals/array-method-uses-to-length":84,"../internals/array-species-create":85,"../internals/create-property":95,"../internals/export":105,"../internals/to-absolute-index":166,"../internals/to-integer":168,"../internals/to-length":169,"../internals/to-object":170}],186:[function(require,module,exports){
var $ = require('../internals/export');

// `Date.now` method
// https://tc39.github.io/ecma262/#sec-date.now
$({ target: 'Date', stat: true }, {
  now: function now() {
    return new Date().getTime();
  }
});

},{"../internals/export":105}],187:[function(require,module,exports){
var $ = require('../internals/export');
var bind = require('../internals/function-bind');

// `Function.prototype.bind` method
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
$({ target: 'Function', proto: true }, {
  bind: bind
});

},{"../internals/export":105,"../internals/function-bind":108}],188:[function(require,module,exports){
var $ = require('../internals/export');
var assign = require('../internals/object-assign');

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});

},{"../internals/export":105,"../internals/object-assign":135}],189:[function(require,module,exports){
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var create = require('../internals/object-create');

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  create: create
});

},{"../internals/descriptors":97,"../internals/export":105,"../internals/object-create":136}],190:[function(require,module,exports){
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var objectDefinePropertyModile = require('../internals/object-define-property');

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperty: objectDefinePropertyModile.f
});

},{"../internals/descriptors":97,"../internals/export":105,"../internals/object-define-property":138}],191:[function(require,module,exports){
var $ = require('../internals/export');
var $entries = require('../internals/object-to-array').entries;

// `Object.entries` method
// https://tc39.github.io/ecma262/#sec-object.entries
$({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});

},{"../internals/export":105,"../internals/object-to-array":146}],192:[function(require,module,exports){
var $ = require('../internals/export');
var fails = require('../internals/fails');
var toIndexedObject = require('../internals/to-indexed-object');
var nativeGetOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var DESCRIPTORS = require('../internals/descriptors');

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});

},{"../internals/descriptors":97,"../internals/export":105,"../internals/fails":106,"../internals/object-get-own-property-descriptor":139,"../internals/to-indexed-object":167}],193:[function(require,module,exports){
// empty

},{}],194:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var aFunction = require('../internals/a-function');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var iterate = require('../internals/iterate');

// `Promise.allSettled` method
// https://github.com/tc39/proposal-promise-allSettled
$({ target: 'Promise', stat: true }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'fulfilled', value: value };
          --remaining || resolve(values);
        }, function (e) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'rejected', reason: e };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/a-function":72,"../internals/export":105,"../internals/iterate":126,"../internals/new-promise-capability":133,"../internals/perform":149}],195:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var NativePromise = require('../internals/native-promise-constructor');
var fails = require('../internals/fails');
var getBuiltIn = require('../internals/get-built-in');
var speciesConstructor = require('../internals/species-constructor');
var promiseResolve = require('../internals/promise-resolve');
var redefine = require('../internals/redefine');

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromise && fails(function () {
  NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.github.io/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// patch native Promise.prototype for native async functions
if (!IS_PURE && typeof NativePromise == 'function' && !NativePromise.prototype['finally']) {
  redefine(NativePromise.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
}

},{"../internals/export":105,"../internals/fails":106,"../internals/get-built-in":109,"../internals/is-pure":124,"../internals/native-promise-constructor":130,"../internals/promise-resolve":150,"../internals/redefine":152,"../internals/species-constructor":160}],196:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var global = require('../internals/global');
var getBuiltIn = require('../internals/get-built-in');
var NativePromise = require('../internals/native-promise-constructor');
var redefine = require('../internals/redefine');
var redefineAll = require('../internals/redefine-all');
var setToStringTag = require('../internals/set-to-string-tag');
var setSpecies = require('../internals/set-species');
var isObject = require('../internals/is-object');
var aFunction = require('../internals/a-function');
var anInstance = require('../internals/an-instance');
var classof = require('../internals/classof-raw');
var inspectSource = require('../internals/inspect-source');
var iterate = require('../internals/iterate');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');
var speciesConstructor = require('../internals/species-constructor');
var task = require('../internals/task').set;
var microtask = require('../internals/microtask');
var promiseResolve = require('../internals/promise-resolve');
var hostReportErrors = require('../internals/host-report-errors');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var InternalStateModule = require('../internals/internal-state');
var isForced = require('../internals/is-forced');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/engine-v8-version');

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = NativePromise;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var IS_NODE = classof(process) == 'process';
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (V8_VERSION === 66) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    if (!IS_NODE && typeof PromiseRejectionEvent != 'function') return true;
  }
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructor.prototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task.call(global, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task.call(global, function () {
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, promise, wrapper, state),
            bind(internalReject, promise, wrapper, state)
          );
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, { done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function') {
    nativeThen = NativePromise.prototype.then;

    // wrap native Promise#then for native async functions
    redefine(NativePromise.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected);
    // https://github.com/zloirock/core-js/issues/640
    }, { unsafe: true });

    // wrap fetch result
    if (typeof $fetch == 'function') $({ global: true, enumerable: true, forced: true }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function fetch(input /* , init */) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
      }
    });
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/a-function":72,"../internals/an-instance":75,"../internals/check-correctness-of-iteration":87,"../internals/classof-raw":88,"../internals/engine-v8-version":102,"../internals/export":105,"../internals/get-built-in":109,"../internals/global":111,"../internals/host-report-errors":114,"../internals/inspect-source":118,"../internals/internal-state":119,"../internals/is-forced":122,"../internals/is-object":123,"../internals/is-pure":124,"../internals/iterate":126,"../internals/microtask":129,"../internals/native-promise-constructor":130,"../internals/new-promise-capability":133,"../internals/perform":149,"../internals/promise-resolve":150,"../internals/redefine":152,"../internals/redefine-all":151,"../internals/set-species":155,"../internals/set-to-string-tag":156,"../internals/species-constructor":160,"../internals/task":165,"../internals/well-known-symbol":175}],197:[function(require,module,exports){
'use strict';
var charAt = require('../internals/string-multibyte').charAt;
var InternalStateModule = require('../internals/internal-state');
var defineIterator = require('../internals/define-iterator');

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

},{"../internals/define-iterator":96,"../internals/internal-state":119,"../internals/string-multibyte":161}],198:[function(require,module,exports){
var $ = require('../internals/export');
var repeat = require('../internals/string-repeat');

// `String.prototype.repeat` method
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
$({ target: 'String', proto: true }, {
  repeat: repeat
});

},{"../internals/export":105,"../internals/string-repeat":162}],199:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var toLength = require('../internals/to-length');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');
var IS_PURE = require('../internals/is-pure');

var nativeStartsWith = ''.startsWith;
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.startsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.startswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = String(requireObjectCoercible(this));
    notARegExp(searchString);
    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return nativeStartsWith
      ? nativeStartsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"../internals/correct-is-regexp-logic":90,"../internals/export":105,"../internals/is-pure":124,"../internals/not-a-regexp":134,"../internals/object-get-own-property-descriptor":139,"../internals/require-object-coercible":153,"../internals/to-length":169}],200:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var $trim = require('../internals/string-trim').trim;
var forcedStringTrimMethod = require('../internals/string-trim-forced');

// `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});

},{"../internals/export":105,"../internals/string-trim":164,"../internals/string-trim-forced":163}],201:[function(require,module,exports){
require('./es.array.iterator');
var DOMIterables = require('../internals/dom-iterables');
var global = require('../internals/global');
var classof = require('../internals/classof');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var Iterators = require('../internals/iterators');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
  }
  Iterators[COLLECTION_NAME] = Iterators.Array;
}

},{"../internals/classof":89,"../internals/create-non-enumerable-property":93,"../internals/dom-iterables":99,"../internals/global":111,"../internals/iterators":128,"../internals/well-known-symbol":175,"./es.array.iterator":182}],202:[function(require,module,exports){
var $ = require('../internals/export');
var global = require('../internals/global');
var task = require('../internals/task');

var FORCED = !global.setImmediate || !global.clearImmediate;

// http://w3c.github.io/setImmediate/
$({ global: true, bind: true, enumerable: true, forced: FORCED }, {
  // `setImmediate` method
  // http://w3c.github.io/setImmediate/#si-setImmediate
  setImmediate: task.set,
  // `clearImmediate` method
  // http://w3c.github.io/setImmediate/#si-clearImmediate
  clearImmediate: task.clear
});

},{"../internals/export":105,"../internals/global":111,"../internals/task":165}],203:[function(require,module,exports){
var $ = require('../internals/export');
var global = require('../internals/global');
var userAgent = require('../internals/engine-user-agent');

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
$({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
});

},{"../internals/engine-user-agent":101,"../internals/export":105,"../internals/global":111}],204:[function(require,module,exports){
var parent = require('../../es/array/is-array');

module.exports = parent;

},{"../../es/array/is-array":42}],205:[function(require,module,exports){
var parent = require('../../../es/array/virtual/for-each');

module.exports = parent;

},{"../../../es/array/virtual/for-each":45}],206:[function(require,module,exports){
var parent = require('../../es/date/now');

module.exports = parent;

},{"../../es/date/now":50}],207:[function(require,module,exports){
var parent = require('../../es/instance/bind');

module.exports = parent;

},{"../../es/instance/bind":52}],208:[function(require,module,exports){
var parent = require('../../es/instance/copy-within');

module.exports = parent;

},{"../../es/instance/copy-within":53}],209:[function(require,module,exports){
var parent = require('../../es/instance/fill');

module.exports = parent;

},{"../../es/instance/fill":54}],210:[function(require,module,exports){
require('../../modules/web.dom-collections.iterator');
var forEach = require('../array/virtual/for-each');
var classof = require('../../internals/classof');
var ArrayPrototype = Array.prototype;

var DOMIterables = {
  DOMTokenList: true,
  NodeList: true
};

module.exports = function (it) {
  var own = it.forEach;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.forEach)
    // eslint-disable-next-line no-prototype-builtins
    || DOMIterables.hasOwnProperty(classof(it)) ? forEach : own;
};

},{"../../internals/classof":89,"../../modules/web.dom-collections.iterator":201,"../array/virtual/for-each":205}],211:[function(require,module,exports){
var parent = require('../../es/instance/index-of');

module.exports = parent;

},{"../../es/instance/index-of":55}],212:[function(require,module,exports){
var parent = require('../../es/instance/repeat');

module.exports = parent;

},{"../../es/instance/repeat":56}],213:[function(require,module,exports){
var parent = require('../../es/instance/slice');

module.exports = parent;

},{"../../es/instance/slice":57}],214:[function(require,module,exports){
var parent = require('../../es/instance/sort');

module.exports = parent;

},{"../../es/instance/sort":58}],215:[function(require,module,exports){
var parent = require('../../es/instance/splice');

module.exports = parent;

},{"../../es/instance/splice":59}],216:[function(require,module,exports){
var parent = require('../../es/instance/starts-with');

module.exports = parent;

},{"../../es/instance/starts-with":60}],217:[function(require,module,exports){
var parent = require('../../es/instance/trim');

module.exports = parent;

},{"../../es/instance/trim":61}],218:[function(require,module,exports){
var parent = require('../../es/object/assign');

module.exports = parent;

},{"../../es/object/assign":62}],219:[function(require,module,exports){
var parent = require('../../es/object/create');

module.exports = parent;

},{"../../es/object/create":63}],220:[function(require,module,exports){
arguments[4][71][0].apply(exports,arguments)
},{"../../es/object/define-property":64,"dup":71}],221:[function(require,module,exports){
var parent = require('../../es/object/entries');

module.exports = parent;

},{"../../es/object/entries":65}],222:[function(require,module,exports){
var parent = require('../../es/object/get-own-property-descriptor');

module.exports = parent;

},{"../../es/object/get-own-property-descriptor":66}],223:[function(require,module,exports){
var parent = require('../../es/promise');

module.exports = parent;

},{"../../es/promise":67}],224:[function(require,module,exports){
require('../modules/web.immediate');
var path = require('../internals/path');

module.exports = path.setImmediate;

},{"../internals/path":148,"../modules/web.immediate":202}],225:[function(require,module,exports){
require('../modules/web.timers');
var path = require('../internals/path');

module.exports = path.setInterval;

},{"../internals/path":148,"../modules/web.timers":203}],226:[function(require,module,exports){
require('../modules/web.timers');
var path = require('../internals/path');

module.exports = path.setTimeout;

},{"../internals/path":148,"../modules/web.timers":203}],227:[function(require,module,exports){
/*
Copyright luojia@luojia.me
LGPL license
*/
'use strict';

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _repeat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/repeat"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _startsWith = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/starts-with"));

var _setImmediate2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-immediate"));

var _now = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/date/now"));

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _NyaPCommon = require("./NyaPCommon.js");

const O2H = _NyaPCommon.DomTools.Object2HTML; //NyaP options

const NyaPOptions = {
  autoHideDanmakuInput: true,
  //hide danmakuinput after danmaku sending
  danmakuColors: ['fff', '6cf', 'ff0', 'f00', '0f0', '00f', 'f0f', '000'],
  //colors in the danmaku style pannel
  danmakuModes: [0, 3, 2, 1],
  //0:right	1:left	2:bottom	3:top  ;; mode in the danmaku style pannel
  danmakuSizes: [20, 24, 36] //danmaku size buttons in the danmaku style pannel

}; //normal player

class NyaP extends _NyaPCommon.NyaPCommon {
  get icons() {
    return this.opt.icons;
  }

  constructor(opt) {
    super(_NyaPCommon.Utils.deepAssign({}, NyaPOptions, opt));
    opt = this.opt;
    const NP = this,
          _t = this._t,
          $ = this.$,
          video = this.video; //set icons

    function icon(name, event, attr = {}) {
      const ico = opt.icons[name];
      return O2H({
        _: 'span',
        event,
        attr,
        prop: {
          id: `icon_span_${name}`,
          innerHTML: `<svg height=${ico[1]} width=${ico[0]} id="icon_${name}"">${ico[2]}</svg>`
        }
      });
    }

    this.stat('creating_player'); //create player elements

    NP._.player = O2H({
      _: 'div',
      attr: {
        class: 'NyaP',
        id: 'NyaP',
        tabindex: 0
      },
      child: [NP.videoFrame, {
        _: 'div',
        attr: {
          id: 'controls'
        },
        child: [{
          _: 'div',
          attr: {
            id: 'control'
          },
          child: [{
            _: 'span',
            attr: {
              id: 'control_left'
            },
            child: [icon('play', {
              click: e => NP.playToggle()
            }, {
              title: _t('play')
            })]
          }, {
            _: 'span',
            attr: {
              id: 'control_center'
            },
            child: [{
              _: 'div',
              prop: {
                id: 'progress_info'
              },
              child: [{
                _: 'span',
                child: [{
                  _: 'canvas',
                  prop: {
                    id: 'progress',
                    pad: 10
                  }
                }]
              }, {
                _: 'span',
                prop: {
                  id: 'time'
                },
                child: [{
                  _: 'span',
                  prop: {
                    id: 'current_time'
                  },
                  child: ['00:00']
                }, '/', {
                  _: 'span',
                  prop: {
                    id: 'total_time'
                  },
                  child: ['00:00']
                }]
              }]
            }, {
              _: 'div',
              prop: {
                id: 'danmaku_input_frame'
              },
              child: [{
                _: 'span',
                prop: {
                  id: 'danmaku_style'
                },
                child: [{
                  _: 'div',
                  attr: {
                    id: 'danmaku_style_pannel'
                  },
                  child: [{
                    _: 'div',
                    attr: {
                      id: 'danmaku_color_box'
                    }
                  }, {
                    _: 'input',
                    attr: {
                      id: 'danmaku_color',
                      placeholder: _t('hex color'),
                      maxlength: "6"
                    }
                  }, {
                    _: 'span',
                    attr: {
                      id: 'danmaku_mode_box'
                    }
                  }, {
                    _: 'span',
                    attr: {
                      id: 'danmaku_size_box'
                    }
                  }]
                }, icon('danmakuStyle')]
              }, {
                _: 'input',
                attr: {
                  id: 'danmaku_input',
                  placeholder: _t('Input danmaku here')
                }
              }, {
                _: 'span',
                prop: {
                  id: 'danmaku_submit',
                  innerHTML: _t('Send')
                }
              }]
            }]
          }, {
            _: 'span',
            attr: {
              id: 'control_right'
            },
            child: [icon('addDanmaku', {
              click: e => NP.danmakuInput()
            }, {
              title: _t('danmaku input(Enter)')
            }), icon('danmakuToggle', {
              click: e => NP.Danmaku.toggle()
            }, {
              title: _t('danmaku toggle(D)'),
              class: 'active_icon'
            }), icon('volume', {}, {
              title: `${_t('volume')}:(${video.muted ? _t('muted') : (video.volume * 100 | 0) + '%'})([shift]+↑↓)(${_t('wheeling')})`
            }), icon('loop', {
              click: e => {
                video.loop = !video.loop;
              }
            }, {
              title: _t('loop') + '(L)'
            }), {
              _: 'span',
              prop: {
                id: 'player_mode'
              },
              child: [icon('fullScreen', {
                click: e => NP.playerMode('fullScreen')
              }, {
                title: _t('full screen(F)')
              }), icon('fullPage', {
                click: e => NP.playerMode('fullPage')
              }, {
                title: _t('full page(P)')
              })]
            }]
          }]
        }]
      }]
    }); //progress

    (0, _setTimeout2.default)(() => {
      //add resize event
      _NyaPCommon.DomTools.resizeEvent.observe($('#control'));

      _NyaPCommon.DomTools.addEvents($('#control'), {
        resize: e => NP.resizeProgress()
      });

      NP.resizeProgress();
    }, 0);
    NP._.progressContext = $('#progress').getContext('2d'); //events

    const events = {
      main_video: {
        playing: e => NP._iconActive('play', true),
        pause: e => {
          NP._iconActive('play', false);
        },
        timeupdate: e => {
          if ((0, _now.default)() - NP._.lastTimeUpdate < 30) return;

          NP._setDisplayTime(_NyaPCommon.Utils.formatTime(video.currentTime, video.duration));

          NP.drawProgress();
          NP._.lastTimeUpdate = (0, _now.default)();
        },
        loadedmetadata: e => {
          NP._setDisplayTime(null, _NyaPCommon.Utils.formatTime(video.duration, video.duration));
        },
        volumechange: e => {
          //show volume msg
          NP._.volumeBox.renew(`${_t('volume')}:${(video.volume * 100).toFixed(0)}%` + `${video.muted ? '(' + _t('muted') + ')' : ''}`, 3000); //change icon style


          _NyaPCommon.Utils.setAttrs($('#volume_circle'), {
            'stroke-dasharray': `${video.volume * 12 * Math.PI} 90`,
            style: `fill-opacity:${video.muted ? .2 : .6}!important`
          }); //change icon tip


          $('#icon_span_volume').setAttribute('title', `${_t('volume')}:(${video.muted ? _t('muted') : (video.volume * 100 | 0) + '%'})([shift]+↑↓)(${_t('wheeling')})`);
        },
        progress: e => NP.drawProgress(),
        click: e => NP.playToggle(),
        contextmenu: e => e.preventDefault(),
        error: () => {
          NP.msg(`视频加载错误`, 'error');
          this.log('video error', 'error');
        }
      },
      danmaku_container: {
        click: e => NP.playToggle(),
        contextmenu: e => e.preventDefault()
      },
      progress: {
        'mousemove,click': e => {
          let t = e.target,
              pre = _NyaPCommon.Utils.clamp((e.offsetX - t.pad) / (t.offsetWidth - 2 * t.pad), 0, 1);

          if (e.type === 'mousemove') {
            NP._.progressX = e.offsetX;
            NP.drawProgress();

            NP._setDisplayTime(null, _NyaPCommon.Utils.formatTime(pre * video.duration, video.duration));
          } else if (e.type === 'click') {
            video.currentTime = pre * video.duration;
          }
        },
        mouseout: e => {
          NP._.progressX = undefined;
          NP.drawProgress();

          NP._setDisplayTime(null, _NyaPCommon.Utils.formatTime(video.duration, video.duration));
        }
      },
      danmaku_style_pannel: {
        click: e => {
          if (e.target.tagName !== 'INPUT') (0, _setImmediate2.default)(a => NP.$('#danmaku_input').focus());
        }
      },
      danmaku_color: {
        'input,change': e => {
          let i = e.target,
              c = NP.Danmaku.isVaildColor(i.value);

          if (c) {
            //match valid hex color code
            i.style.backgroundColor = `#${c}`;
            NP._.danmakuColor = c;
          } else {
            NP._.danmakuColor = undefined;
            c = NP.Danmaku.isVaildColor(NP.opt.defaultDanmakuColor);
            i.style.backgroundColor = c ? `#${c}` : '';
          }
        }
      },
      icon_span_volume: {
        click: e => video.muted = !video.muted,
        wheel: e => {
          e.preventDefault();
          let d = e.wheelDeltaY;
          if (e.shiftKey) d = d > 0 ? 10 : -10;
          video.volume = _NyaPCommon.Utils.clamp(video.volume + d / 900, 0, 1);
        }
      },
      danmaku_input: {
        keydown: e => {
          if (e.key === 'Enter') {
            NP.send();
          } else if (e.key === 'Escape') {
            NP.danmakuInput(false);
          }
        }
      },
      danmaku_submit: {
        click: e => NP.send()
      },
      danmaku_mode_box: {
        click: e => {
          var _context;

          let t = e.target;

          if ((0, _startsWith.default)(_context = t.id).call(_context, 'icon_span_danmakuMode')) {
            let m = 1 * t.id.match(/\d$/)[0];
            if (NP._.danmakuMode !== undefined) $(`#icon_span_danmakuMode${NP._.danmakuMode}`).classList.remove('active');
            $(`#icon_span_danmakuMode${m}`).classList.add('active');
            NP._.danmakuMode = m;
          }
        }
      },
      danmaku_size_box: {
        click: e => {
          var _context2;

          let t = e.target;
          if (!t.size) return;
          (0, _forEach.default)(_context2 = _NyaPCommon.Utils.toArray($('#danmaku_size_box').childNodes)).call(_context2, sp => {
            if (NP._.danmakuSize === sp.size) sp.classList.remove('active');
          });
          t.classList.add('active');
          NP._.danmakuSize = t.size;
        }
      },
      danmaku_color_box: {
        click: e => {
          if (e.target.color) {
            $('#danmaku_color').value = e.target.color;
            $('#danmaku_color').dispatchEvent(new Event('change'));
          }
        }
      }
    };

    for (let eleid in events) {
      //add events to elements
      let el = $(`#${eleid}`);
      if (!el) continue;
      let eves = events[eleid];
      eves && _NyaPCommon.DomTools.addEvents($(`#${eleid}`), eves);
    }

    _NyaPCommon.DomTools.addEvents(this, {
      danmakuFrameToggle: bool => NP._iconActive('danmakuToggle', bool),
      //listen danmakuToggle event to change button style
      playerModeChange: mode => {
        var _context3;

        (0, _forEach.default)(_context3 = ['fullPage', 'fullScreen']).call(_context3, m => {
          NP._iconActive(m, mode === m);
        });
      },
      video_loopChange: value => NP._iconActive('loop', value)
    });

    _NyaPCommon.DomTools.addEvents(this._.player, {
      keydown: e => NP._playerKeyHandle(e),
      mousemove: e => {
        this._userActiveWatcher(true);
      }
    });

    _NyaPCommon.DomTools.addEvents(document, {
      'fullscreenchange,mozfullscreenchange,webkitfullscreenchange,msfullscreenchange': e => {
        if (NP.currentPlayerMode == 'fullScreen' && !_NyaPCommon.DomTools.isFullscreen()) NP.playerMode('normal');
      }
    }); //danmaku ui


    if (this._danmakuEnabled) {
      var _context4, _context5, _opt2, _opt2$uiOptions, _context6;

      //danmaku sizes
      opt.danmakuSizes && (0, _forEach.default)(_context4 = opt.danmakuSizes).call(_context4, (s, ind) => {
        var _opt, _opt$uiOptions;

        let e = O2H({
          _: 'span',
          attr: {
            style: `font-size:${12 + ind * 3}px;`,
            title: s
          },
          prop: {
            size: s
          },
          child: ['A']
        });
        $('#danmaku_size_box').appendChild(e);

        if (s === ((_opt = opt) === null || _opt === void 0 ? void 0 : (_opt$uiOptions = _opt.uiOptions) === null || _opt$uiOptions === void 0 ? void 0 : _opt$uiOptions.danmakuSize)) {
          //click specified button
          e.click();
        }
      }); //danmaku colors

      opt.danmakuColors && (0, _forEach.default)(_context5 = opt.danmakuColors).call(_context5, c => {
        let e = O2H({
          _: 'span',
          attr: {
            style: `background-color:#${c};`,
            title: c
          },
          prop: {
            color: c
          }
        });
        $('#danmaku_color_box').appendChild(e);
      });

      if ((_opt2 = opt) === null || _opt2 === void 0 ? void 0 : (_opt2$uiOptions = _opt2.uiOptions) === null || _opt2$uiOptions === void 0 ? void 0 : _opt2$uiOptions.danmakuColor) {
        //set default color
        $('#danmaku_color').value = opt.uiOptions.danmakuColor;
      } //danmaku modes


      opt.danmakuModes && (0, _forEach.default)(_context6 = opt.danmakuModes).call(_context6, m => {
        var _opt3, _opt3$uiOptions;

        let e = icon(`danmakuMode${m}`);
        $('#danmaku_mode_box').appendChild(e);

        if (m === ((_opt3 = opt) === null || _opt3 === void 0 ? void 0 : (_opt3$uiOptions = _opt3.uiOptions) === null || _opt3$uiOptions === void 0 ? void 0 : _opt3$uiOptions.danmakuMode)) {
          //click specified button
          e.click();
        }
      });
    } else {
      var _context7;

      (0, _forEach.default)(_context7 = this.$$('[id*=danmaku]')).call(_context7, el => {
        //remove danmaku buttons
        el.parentNode, removeChild(el);
      });
    } //put into the container


    if (opt.playerContainer instanceof HTMLElement) opt.playerContainer.appendChild(NP.player);
    this.statResult('creating_player');
  }

  _userActiveWatcher(active = false) {
    //watch user active,for auto hiding ui
    let delay = 5000,
        t = (0, _now.default)();

    if (active) {
      this._.lastUserActive = t;

      if (this._.userInactive) {
        this._.userInactive = false;
        this.player.classList.remove('user-inactive');
      }
    }

    if (this._.userActiveTimer) return;
    this._.userActiveTimer = (0, _setTimeout2.default)(() => {
      this._.userActiveTimer = 0;
      let now = (0, _now.default)();

      if (now - this._.lastUserActive < delay) {
        this._userActiveWatcher();
      } else {
        this.player.classList.add('user-inactive');
        this._.userInactive = true;
      }
    }, delay - t + this._.lastUserActive);
  }

  _playerKeyHandle(e) {
    //hot keys
    if (e.target.tagName === 'INPUT') return;

    const V = this.video,
          _SH = e.shiftKey,
          _RE = (0, _repeat.default)(e); //to prevent default,use break.otherwise,use return.


    switch (e.key) {
      case ' ':
        {
          if (_RE) return; //ignore repeat keys

          this.playToggle();
          break;
        }

      case 'ArrowRight':
        {
          //seek forward
          V.currentTime += 3 * (_SH ? 2 : 1);
          break;
        }

      case 'ArrowLeft':
        {
          //seek backward
          V.currentTime -= 1.5 * (_SH ? 2 : 1);
          break;
        }

      case 'ArrowUp':
        {
          //volume up
          V.volume = _NyaPCommon.Utils.clamp(V.volume + 0.03 * (_SH ? 2 : 1), 0, 1);
          break;
        }

      case 'ArrowDown':
        {
          //volume down
          V.volume = _NyaPCommon.Utils.clamp(V.volume - 0.03 * (_SH ? 2 : 1), 0, 1);
          break;
        }

      case 'p':
        {
          //full page
          if (_RE) return;
          this.playerMode('fullPage');
          break;
        }

      case 'f':
        {
          //fullscreen
          this.playerMode('fullScreen');
          break;
        }

      case 'd':
        {
          //danmaku toggle
          if (_RE) return;
          this._danmakuEnabled && this.Danmaku.toggle();
          break;
        }

      case 'm':
        {
          //mute
          if (_RE) return;
          this.video.muted = !this.video.muted;
          break;
        }

      case 'l':
        {
          //loop
          this.video.loop = !this.video.loop;
          break;
        }

      case 'Enter':
        {
          //danmaku input toggle
          if (_RE) return;
          this._danmakuEnabled && this.danmakuInput();
          break;
        }

      case 'Escape':
        {
          //exit full page mode
          if (this.currentPlayerMode === 'fullPage') {
            this.playerMode('normal');
            break;
          }

          return;
        }

      default:
        return;
    }

    e.preventDefault();
  }

  danmakuInput(bool = !this.$('#danmaku_input_frame').offsetHeight) {
    //hide or show danmaku input
    let $ = this.$;
    $('#danmaku_input_frame').style.display = bool ? 'flex' : '';

    this._iconActive('addDanmaku', bool);

    (0, _setImmediate2.default)(() => {
      bool ? $('#danmaku_input').focus() : this._.player.focus();
    });
  }

  resizeProgress() {
    const c = this.$('#progress');
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
    this.drawProgress();
    this.emit('progressRefresh');
  }

  send() {
    let color = this._.danmakuColor || this.opt.defaultDanmakuColor,
        text = this.$('#danmaku_input').value,
        size = this._.danmakuSize,
        mode = this._.danmakuMode,
        time = this.time,
        d = {
      color,
      text,
      size,
      mode,
      time
    };
    let S = this.Danmaku.send(d, danmaku => {
      if (danmaku && danmaku._ === 'text') this.$('#danmaku_input').value = '';
      danmaku.highlight = true;
      this.load(danmaku, true);

      if (this.opt.autoHideDanmakuInput) {
        this.danmakuInput(false);
      }
    });

    if (!S) {
      this.danmakuInput(false);
      return;
    }
  }

  _progressDrawer() {
    const ctx = this._.progressContext,
          c = this.$('#progress'),
          w = c.width,
          h = c.height,
          v = this.video,
          d = v.duration,
          cT = v.currentTime,
          pad = c.pad,
          len = w - 2 * pad;
    let i;
    ctx.clearRect(0, 0, w, h);
    ctx.lineCap = "round"; //background

    ctx.beginPath();
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 7;
    ctx.moveTo(pad, 15);
    ctx.lineTo(pad + len, 15);
    ctx.stroke(); //buffered

    ctx.beginPath();
    ctx.strokeStyle = '#C0BBBB';
    ctx.lineWidth = 2;
    let tr = v.buffered;

    for (i = tr.length; i--;) {
      ctx.moveTo(pad + tr.start(i) / d * len, 18);
      ctx.lineTo(pad + tr.end(i) / d * len, 18);
    }

    ctx.stroke(); //progress

    ctx.beginPath();
    ctx.strokeStyle = '#6cf';
    ctx.lineWidth = 5;
    ctx.moveTo(pad, 15);
    ctx.lineTo(pad + len * cT / d, 15);
    ctx.stroke(); //already played

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,.3)';
    ctx.lineWidth = 5;
    tr = v.played;

    for (i = tr.length; i--;) {
      ctx.moveTo(pad + tr.start(i) / d * len, 15);
      ctx.lineTo(pad + tr.end(i) / d * len, 15);
    }

    ctx.stroke(); //mouse

    if (this._.progressX) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0,0,0,.05)';
      ctx.moveTo(pad + len * cT / d, 15);
      ctx.lineTo(_NyaPCommon.Utils.clamp(this._.progressX, pad, pad + len), 15);
      ctx.stroke();
    }

    this._.drawingProgress = false;
  }

  drawProgress() {
    if (this._.drawingProgress) return;
    this._.drawingProgress = true;
    requestAnimationFrame(() => this._progressDrawer()); //prevent progress bar drawing multi times in a frame
  }

}

window.NyaP = NyaP;

},{"./NyaPCommon.js":228,"@babel/runtime-corejs3/core-js-stable/date/now":18,"@babel/runtime-corejs3/core-js-stable/instance/for-each":22,"@babel/runtime-corejs3/core-js-stable/instance/repeat":24,"@babel/runtime-corejs3/core-js-stable/instance/starts-with":28,"@babel/runtime-corejs3/core-js-stable/set-immediate":36,"@babel/runtime-corejs3/core-js-stable/set-timeout":38,"@babel/runtime-corejs3/helpers/interopRequireDefault":41}],228:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

_Object$defineProperty(exports, "DomTools", {
  enumerable: true,
  get: function () {
    return _index.DomTools;
  }
});

_Object$defineProperty(exports, "Utils", {
  enumerable: true,
  get: function () {
    return _index.Utils;
  }
});

exports.NyaPCommon = void 0;

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _setInterval2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-interval"));

var _bind = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/bind"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _index = require("../component/NyaP-Core/index.js");

var _index2 = _interopRequireDefault(require("../component/NyaP-Danmaku/index.js"));

const O2H = _index.DomTools.Object2HTML; //default options

const NyaPCommonOptions = {
  //for danmaku frame
  danmaku: {
    enable: true,
    modules: {
      TextDanmaku: {
        enable: true,
        defaultStyles: {},
        options: {}
      }
    },
    send: d => {
      return _promise.default.reject();
    } //the method for sending danmaku

  },
  // for ui
  uiOptions: {
    danmakuColor: null,
    //a hex color(without #),when the color inputed is invalid,this color will be applied
    danmakuMode: 0,
    //0: right to left.
    danmakuSize: 24
  },
  loadingInfo: {
    //text replacement at loading time (for left-bottom message)
    doneText: 'ok',
    failText: 'failed',
    contentSpliter: '...'
  },
  loadingAnimation: true,
  //other common options
  playerContainer: null,
  //the element for containing the player
  icons: {
    play: [30, 30, '<path d="m10.063,8.856l9.873,6.143l-9.873,6.143v-12.287z" stroke-width="3" stroke-linejoin="round"/>'],
    addDanmaku: [30, 30, '<path style="fill-opacity:0!important;" stroke-width="1.4" d="m21.004,8.995c-0.513,-0.513 -1.135,-0.770 -1.864,-0.770l-8.281,0c-0.729,0 -1.350,0.256 -1.864,0.770c-0.513,0.513 -0.770,1.135 -0.770,1.864l0,8.281c0,0.721 0.256,1.341 0.770,1.858c0.513,0.517 1.135,0.776 1.864,0.776l8.281,0c0.729,0 1.350,-0.258 1.864,-0.776c0.513,-0.517 0.770,-1.136 0.770,-1.858l0,-8.281c0,-0.729 -0.257,-1.350 -0.770,-1.864z" stroke-linejoin="round"/>' + '<path d="m12.142,14.031l1.888,0l0,-1.888l1.937,0l0,1.888l1.888,0l0,1.937l-1.888,0l0,1.888l-1.937,0l0,-1.888l-1.888,0l0,-1.937z" stroke-width="1"/>'],
    danmakuToggle: [30, 30, '<path d="m8.569,10.455l0,0c0,-0.767 0.659,-1.389 1.473,-1.389l0.669,0l0,0l3.215,0l6.028,0c0.390,0 0.765,0.146 1.041,0.406c0.276,0.260 0.431,0.613 0.431,0.982l0,3.473l0,0l0,2.083l0,0c0,0.767 -0.659,1.389 -1.473,1.389l-6.028,0l-4.200,3.532l0.985,-3.532l-0.669,0c-0.813,0 -1.473,-0.621 -1.473,-1.389l0,0l0,-2.083l0,0l0,-3.473z"/>'],
    danmakuStyle: [30, 30, '<path style="fill-opacity:1!important" d="m21.781,9.872l-1.500,-1.530c-0.378,-0.385 -0.997,-0.391 -1.384,-0.012l-0.959,0.941l2.870,2.926l0.960,-0.940c0.385,-0.379 0.392,-0.998 0.013,-1.383zm-12.134,7.532l2.871,2.926l7.593,-7.448l-2.872,-2.927l-7.591,7.449l0.000,0.000zm-1.158,2.571l-0.549,1.974l1.984,-0.511l1.843,-0.474l-2.769,-2.824l-0.509,1.835z" stroke-width="0"/>'],
    fullScreen: [30, 30, '<path stroke-linejoin="round" d="m11.166,9.761l-5.237,5.239l5.237,5.238l1.905,-1.905l-3.333,-3.333l3.332,-3.333l-1.904,-1.906zm7.665,0l-1.903,1.905l3.332,3.333l-3.332,3.332l1.903,1.905l5.238,-5.238l-5.238,-5.237z" stroke-width="1.3" />'],
    fullPage: [30, 30, '<rect stroke-linejoin="round" height="11.169" width="17.655" y="9.415" x="6.172" stroke-width="1.5"/>' + '<path stroke-linejoin="round" d="m12.361,11.394l-3.604,3.605l3.605,3.605l1.311,-1.311l-2.294,-2.294l2.293,-2.294l-1.311,-1.311zm5.275,0l-1.310,1.311l2.293,2.294l-2.293,2.293l1.310,1.311l3.605,-3.605l-3.605,-3.605z"/>'],
    loop: [30, 30, '<path stroke-linejoin="round" stroke-width="1" d="m20.945,15.282c-0.204,-0.245 -0.504,-0.387 -0.823,-0.387c-0.583,0 -1.079,0.398 -1.205,0.969c-0.400,1.799 -2.027,3.106 -3.870,3.106c-2.188,0 -3.969,-1.780 -3.969,-3.969c0,-2.189 1.781,-3.969 3.969,-3.969c0.720,0 1.412,0.192 2.024,0.561l-0.334,0.338c-0.098,0.100 -0.127,0.250 -0.073,0.380c0.055,0.130 0.183,0.213 0.324,0.212l2.176,0.001c0.255,-0.002 0.467,-0.231 0.466,-0.482l-0.008,-2.183c-0.000,-0.144 -0.085,-0.272 -0.217,-0.325c-0.131,-0.052 -0.280,-0.022 -0.379,0.077l-0.329,0.334c-1.058,-0.765 -2.340,-1.182 -3.649,-1.182c-3.438,0 -6.236,2.797 -6.236,6.236c0,3.438 2.797,6.236 6.236,6.236c2.993,0 5.569,-2.133 6.126,-5.072c0.059,-0.314 -0.022,-0.635 -0.227,-0.882z"/>'],
    volume: [30, 30, '<ellipse id="volume_circle" style="fill-opacity:.6!important" ry="6" rx="6" cy="15" cx="15" stroke-dasharray="38 90" stroke-width="1.8"/>'],
    danmakuMode0: [30, 30, '<path style="fill-opacity:1!important" stroke-width="0" d="m14.981,17.821l-7.937,-2.821l7.937,-2.821l0,1.409l7.975,0l0,2.821l-7.975,0l0,1.409l0,0.002z"/>'],
    danmakuMode1: [30, 30, '<path style="fill-opacity:1!important" stroke-width="0" d="m15.019,12.178l7.937,2.821l-7.937,2.821l0,-1.409l-7.975,0l0,-2.821l7.975,0l0,-1.409l0,-0.002z"/>'],
    danmakuMode3: [30, 30, '<path stroke-width="3" d="m7.972,7.486l14.054,0"/>'],
    danmakuMode2: [30, 30, '<path stroke-width="3" d="m7.972,22.513l14.054,0"/>']
  }
}; //NyaP classic theme Core

class NyaPCommon extends _index.NyaPlayerCore {
  get frame() {
    return this._.player || this.videoFrame;
  }

  get player() {
    return this._.player;
  }

  get currentPlayerMode() {
    return this.player.getAttribute('playerMode') || 'normal';
  }

  get _danmakuEnabled() {
    return this.opt.danmaku.enable;
  }

  constructor(opt) {
    var _context, _context2, _context3;

    super(_index.Utils.deepAssign({}, NyaPCommonOptions, opt));
    this.log('%c https://github.com/JiaJiaJiang/NyaP/ ', 'log', "background:#6f8fa2;color:#ccc;padding:.3em");
    opt = this.opt;
    this.$ = (0, _bind.default)(_context = this.$).call(_context, this);
    this.$$ = (0, _bind.default)(_context2 = this.$$).call(_context2, this); //language

    const _t = this._t = (0, _bind.default)(_context3 = this.i18n._).call(_context3, this.i18n); //translate
    //load languages to the core


    let langs = require('./langs.json');

    for (let l in langs) {
      this.i18n.add(l, langs[l]);
    } //the video frame for NyaP and NyaPTouch


    this.videoFrame = O2H({
      _: 'div',
      attr: {
        id: 'video_frame'
      },
      child: [this.video, //this.container,
      {
        _: 'div',
        attr: {
          id: 'loading_frame'
        },
        child: [{
          _: 'div',
          attr: {
            id: 'loading_anime'
          }
        }, {
          _: 'div',
          attr: {
            id: 'loading_info'
          }
        }]
      }, {
        _: 'div',
        attr: {
          id: 'msg_box'
        }
      }]
    }); //add private vars

    this._.selectorCache = {};
    this._.volumeBox = new MsgBox('', 'info', this.$('#msg_box'));
    this._.ios = !!navigator.userAgent.match(/i[A-z]+?; CPU .+?like Mac OS/);
    this._.mobileX5 = !!navigator.userAgent.match(/MQQBrowser/); //receive stat requests

    this.on('stat', stat => {
      let name = _t(stat[1]);

      this.debug('stat:', name);
      let d = O2H({
        _: 'div',
        child: [name]
      });
      d.append(this.opt.loadingInfo.contentSpliter);
      this.$('#loading_info').appendChild(d);
      stat[2].then(result => {
        //wait for the result
        d.append(result || this.opt.loadingInfo.doneText);
      }).catch(e => {
        d.append(e.message || e || this.opt.loadingInfo.failText);
      });
    }); //loading animation

    if (opt.loadingAnimation) {
      this.$('#loading_anime').innerHTML = '(๑•́ ω •̀๑)';
      this._.loadingAnimationInterval = (0, _setInterval2.default)(() => {
        //loading animation
        this.$('#loading_anime').style.transform = "translate(" + _index.Utils.rand(-20, 20) + "px," + _index.Utils.rand(-20, 20) + "px) rotate(" + _index.Utils.rand(-10, 10) + "deg)";
      }, 80);
    }

    _index.DomTools.addEvents(this.video, {
      loadedmetadata: e => {
        this.statResult('loading_video', null);
        clearInterval(this._.loadingAnimationInterval);
        let lf = this.$('#loading_frame');
        if (lf.parentNode) //remove loading animation
          lf.parentNode.removeChild(lf);
      },
      error: e => {
        this.statResult('loading_video', e === null || e === void 0 ? void 0 : e.message);
        clearInterval(this._.loadingAnimationInterval);
        this.$('#loading_anime').innerHTML = '(๑• . •๑)';
        this.$('#loading_anime').style.transform = "";
      }
    }); //load danmaku frame


    if (this._danmakuEnabled) {
      this.danmakuContainer = O2H({
        _: 'div',
        prop: {
          id: 'danmaku_container'
        }
      });
      this.stat('loading_danmakuFrame', () => {
        this.Danmaku = new _index2.default(this);
        this.videoFrame.insertBefore(this.danmakuContainer, this.$('#loading_frame'));
      });
    } //stupid x5 core


    if (this._.mobileX5) {
      try {
        this.Danmaku.modules.TextDanmaku.setRendererMode(1); //force css mode

        this.Danmaku.modules.TextDanmaku.text2d.supported = false;
      } catch (e) {
        alert(e.message);
      }
    }
  }

  $(selector, useCache = true) {
    //querySelector for the frame element
    if (useCache && this._.selectorCache[selector]) return this._.selectorCache[selector];
    let el = this.frame.querySelector(selector);
    if (el) this._.selectorCache[selector] = el;
    return el;
  }

  $$(selector) {
    //querySelectorAll for the frame element
    return this.frame.querySelectorAll(selector);
  }

  playerMode(mode = 'normal') {
    let ios = this._.ios;
    if (mode === 'normal' && this.currentPlayerMode === mode) return;

    if (this.currentPlayerMode === 'fullScreen') {
      ios || _index.DomTools.exitFullscreen().catch(e => {});
    }

    if (mode !== 'normal' && this.currentPlayerMode === mode) mode = 'normal'; //back to normal mode

    switch (mode) {
      case 'fullPage':
        {
          this.player.setAttribute('playerMode', 'fullPage');
          this.emit('playerModeChange', mode);
          break;
        }

      case 'fullScreen':
        {
          if (ios) {
            //for ios, only fullscreen video, not the player
            _index.DomTools.requestFullscreen(this.video);

            break;
          }

          _index.DomTools.requestFullscreen(this.player).then(() => {
            this.player.setAttribute('playerMode', 'fullScreen');
            this.emit('playerModeChange', mode);
          }).catch(e => {
            alert('Failed to enter screen mode');
          });

          break;
        }

      default:
        {
          this.player.setAttribute('playerMode', 'normal');
          this.emit('playerModeChange', mode);
        }
    }
  }

  msg(text, type = 'tip') {
    //type:tip|info|error
    let msg = new MsgBox(text, type, this.$('#msg_box'));
    requestAnimationFrame(() => msg.show());
  }

  _iconActive(name, bool) {
    if (name === 'loop') this.$(`#icon_span_${name}`).classList[bool ? 'add' : 'remove']('active_icon');
  }

  _setDisplayTime(current = null, total = null) {
    if (current !== null) this.$('#current_time').innerHTML = current;
    if (total !== null) this.$('#total_time').innerHTML = total;
  }

}

exports.NyaPCommon = NyaPCommon;

class MsgBox {
  constructor(text, type, parentNode) {
    this.using = false;
    let msg = this.msg = O2H({
      _: 'div',
      attr: {
        class: `msg_type_${type}`
      }
    });
    msg.addEventListener('click', () => this.remove());
    this.parentNode = parentNode;
    this.setText(text);
  }

  setTimeout(time) {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = (0, _setTimeout2.default)(() => this.remove(), time || Math.max((this.texts ? this.texts.length : 0) * 0.6 * 1000, 5000));
  }

  setText(text) {
    this.msg.innerHTML = '';
    let e = O2H(text);
    e && this.msg.appendChild(e);
    if (text instanceof HTMLElement) text = text.textContent;
    let texts = String(text).match(/\w+|\S/g);
    this.text = text;
    this.texts = texts;
  }

  renew(text, time) {
    this.setText(text);
    this.setTimeout(time);
    if (!this.using) this.show();
  }

  show() {
    if (this.using) return;
    this.msg.style.opacity = 0;

    if (this.parentNode && this.parentNode !== this.msg.parentNode) {
      this.parentNode.appendChild(this.msg);
    }

    this.msg.parentNode && (0, _setTimeout2.default)(() => {
      this.using = true;
      this.msg.style.opacity = 1;
    }, 0);
    this.setTimeout();
  }

  remove() {
    if (!this.using) return;
    this.using = false;
    this.msg.style.opacity = 0;

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = 0;
    }

    (0, _setTimeout2.default)(() => {
      this.msg.parentNode && this.msg.parentNode.removeChild(this.msg);
    }, 600);
  }

}

},{"../component/NyaP-Core/index.js":1,"../component/NyaP-Danmaku/index.js":8,"./langs.json":229,"@babel/runtime-corejs3/core-js-stable/instance/bind":19,"@babel/runtime-corejs3/core-js-stable/object/define-property":32,"@babel/runtime-corejs3/core-js-stable/promise":35,"@babel/runtime-corejs3/core-js-stable/set-interval":37,"@babel/runtime-corejs3/core-js-stable/set-timeout":38,"@babel/runtime-corejs3/helpers/interopRequireDefault":41}],229:[function(require,module,exports){
module.exports={"zh-CN":{"play":"播放","Send":"发送","Done":"完成","loop":"循环","pause":"暂停","muted":"静音","volume":"音量","settings":"设置","wheeling":"滚轮","hex color":"Hex颜色","Loading core":"加载核心","Loading video":"加载视频","Loading plugin":"加载插件","full page(P)":"全页模式(P)","Loading danmaku":"加载弹幕","Creating player":"创建播放器","full screen(F)":"全屏模式(F)","danmaku toggle(D)":"弹幕开关(D)","Input danmaku here":"在这里输入弹幕","Loading danmaku frame":"加载弹幕框架","danmaku input(Enter)":"弹幕输入框(回车)","Failed to change to fullscreen mode":"无法切换到全屏模式","loading_core":"加载核心","loading_plugin":"加载插件","loading_danmakuFrame":"加载弹幕框架","creating_player":"创建播放器","loading_danmaku":"加载弹幕","loading_video":"加载视频"}}
},{}]},{},[227])

//# sourceMappingURL=NyaP.50.js.map
