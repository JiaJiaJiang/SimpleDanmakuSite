(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Object2HTML = Object2HTML;
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
Copyright luojia@luojia.me
LGPL license
*/
function _Obj(t) {
  return _typeof(t) == 'object';
}

function Object2HTML(obj, func) {
  var ele, o, e;
  if (typeof obj === 'string' || typeof obj === 'number') ele = document.createTextNode(obj); //text node
  else if (obj instanceof Node) ele = obj;else if (obj === null || _typeof(obj) !== 'object' || '_' in obj === false || typeof obj._ !== 'string' || obj._ == '') return; //if it dont have a _ prop to specify a tag

  ele || (ele = document.createElement(obj._)); //attributes

  if (_Obj(obj.attr)) for (o in obj.attr) {
    ele.setAttribute(o, obj.attr[o]);
  } //properties

  if (_Obj(obj.prop)) for (o in obj.prop) {
    ele[o] = obj.prop[o];
  } //events

  if (_Obj(obj.event)) for (o in obj.event) {
    ele.addEventListener(o, obj.event[o]);
  } //childNodes

  if (_Obj(obj.child) && obj.child.length > 0) obj.child.forEach(function (o) {
    e = Object2HTML(o, func);
    e instanceof Node && ele.appendChild(e);
  });
  func && func(ele);
  return ele;
}

var _default = Object2HTML;
exports.default = _default;

},{"core-js/modules/es6.symbol":125,"core-js/modules/es7.symbol.async-iterator":127,"core-js/modules/web.dom.iterable":128}],2:[function(require,module,exports){
"use strict";

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.to-string");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
;

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
    module.exports = factory();
  } else {
    root.ResizeSensor = factory();
  }
})(void 0, function () {
  // Make sure it does not throw in a SSR (Server Side Rendering) situation
  if (typeof window === "undefined") {
    return null;
  } // Only used for the dirty checking, so the event callback count is limited to max 1 call per fps per sensor.
  // In combination with the event based resize sensor this saves cpu time, because the sensor is too fast and
  // would generate too many unnecessary events.


  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
    return window.setTimeout(fn, 20);
  };
  /**
   * Iterate over each of the provided element(s).
   *
   * @param {HTMLElement|HTMLElement[]} elements
   * @param {Function}                  callback
   */


  function forEachElement(elements, callback) {
    var elementsType = Object.prototype.toString.call(elements);
    var isCollectionTyped = '[object Array]' === elementsType || '[object NodeList]' === elementsType || '[object HTMLCollection]' === elementsType || '[object Object]' === elementsType || 'undefined' !== typeof jQuery && elements instanceof jQuery //jquery
    || 'undefined' !== typeof Elements && elements instanceof Elements //mootools
    ;
    var i = 0,
        j = elements.length;

    if (isCollectionTyped) {
      for (; i < j; i++) {
        callback(elements[i]);
      }
    } else {
      callback(elements);
    }
  }
  /**
   * Class for dimension change detection.
   *
   * @param {Element|Element[]|Elements|jQuery} element
   * @param {Function} callback
   *
   * @constructor
   */


  var ResizeSensor = function ResizeSensor(element, callback) {
    /**
     *
     * @constructor
     */
    function EventQueue() {
      var q = [];

      this.add = function (ev) {
        q.push(ev);
      };

      var i, j;

      this.call = function () {
        for (i = 0, j = q.length; i < j; i++) {
          q[i].call();
        }
      };

      this.remove = function (ev) {
        var newQueue = [];

        for (i = 0, j = q.length; i < j; i++) {
          if (q[i] !== ev) newQueue.push(q[i]);
        }

        q = newQueue;
      };

      this.length = function () {
        return q.length;
      };
    }
    /**
     * @param {HTMLElement} element
     * @param {String}      prop
     * @returns {String|Number}
     */


    function getComputedStyle(element, prop) {
      if (element.currentStyle) {
        return element.currentStyle[prop];
      }

      if (window.getComputedStyle) {
        return window.getComputedStyle(element, null).getPropertyValue(prop);
      }

      return element.style[prop];
    }
    /**
     *
     * @param {HTMLElement} element
     * @param {Function}    resized
     */


    function attachResizeEvent(element, resized) {
      if (element.resizedAttached) {
        element.resizedAttached.add(resized);
        return;
      }

      element.resizedAttached = new EventQueue();
      element.resizedAttached.add(resized);
      element.resizeSensor = document.createElement('div');
      element.resizeSensor.className = 'resize-sensor';
      var style = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;';
      var styleChild = 'position: absolute; left: 0; top: 0; transition: 0s;';
      element.resizeSensor.style.cssText = style;
      element.resizeSensor.innerHTML = '<div class="resize-sensor-expand" style="' + style + '">' + '<div style="' + styleChild + '"></div>' + '</div>' + '<div class="resize-sensor-shrink" style="' + style + '">' + '<div style="' + styleChild + ' width: 200%; height: 200%"></div>' + '</div>';
      element.appendChild(element.resizeSensor);

      if (getComputedStyle(element, 'position') == 'static') {
        element.style.position = 'relative';
      }

      var expand = element.resizeSensor.childNodes[0];
      var expandChild = expand.childNodes[0];
      var shrink = element.resizeSensor.childNodes[1];
      var dirty, rafId, newWidth, newHeight;
      var lastWidth = element.offsetWidth;
      var lastHeight = element.offsetHeight;

      var reset = function reset() {
        expandChild.style.width = '100000px';
        expandChild.style.height = '100000px';
        expand.scrollLeft = 100000;
        expand.scrollTop = 100000;
        shrink.scrollLeft = 100000;
        shrink.scrollTop = 100000;
      };

      reset();

      var onResized = function onResized() {
        rafId = 0;
        if (!dirty) return;
        lastWidth = newWidth;
        lastHeight = newHeight;

        if (element.resizedAttached) {
          element.resizedAttached.call();
        }
      };

      var onScroll = function onScroll() {
        newWidth = element.offsetWidth;
        newHeight = element.offsetHeight;
        dirty = newWidth != lastWidth || newHeight != lastHeight;

        if (dirty && !rafId) {
          rafId = requestAnimationFrame(onResized);
        }

        reset();
      };

      var addEvent = function addEvent(el, name, cb) {
        if (el.attachEvent) {
          el.attachEvent('on' + name, cb);
        } else {
          el.addEventListener(name, cb);
        }
      };

      addEvent(expand, 'scroll', onScroll);
      addEvent(shrink, 'scroll', onScroll);
    }

    forEachElement(element, function (elem) {
      attachResizeEvent(elem, callback);
    });

    this.detach = function (ev) {
      ResizeSensor.detach(element, ev);
    };
  };

  ResizeSensor.detach = function (element, ev) {
    forEachElement(element, function (elem) {
      if (elem.resizedAttached && typeof ev == "function") {
        elem.resizedAttached.remove(ev);
        if (elem.resizedAttached.length()) return;
      }

      if (elem.resizeSensor) {
        if (elem.contains(elem.resizeSensor)) {
          elem.removeChild(elem.resizeSensor);
        }

        delete elem.resizeSensor;
        delete elem.resizedAttached;
      }
    });
  };

  return ResizeSensor;
});

},{"core-js/modules/es6.regexp.to-string":121,"core-js/modules/es6.symbol":125,"core-js/modules/es7.symbol.async-iterator":127}],3:[function(require,module,exports){
/*
Copyright luojia@luojia.me
LGPL license
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ResizeSensor", {
  enumerable: true,
  get: function get() {
    return _ResizeSensor.default;
  }
});
exports.DanmakuFrameModule = exports.DanmakuFrame = void 0;

require("core-js/modules/es6.regexp.split");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.function.name");

var _ResizeSensor = _interopRequireDefault(require("../lib/ResizeSensor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DanmakuFrame =
/*#__PURE__*/
function () {
  function DanmakuFrame(container) {
    _classCallCheck(this, DanmakuFrame);

    var F = this;
    F.container = container || document.createElement('div');
    F.rate = 1;
    F.timeBase = F.width = F.height = F.fps = 0;
    F.fpsTmp = 0;
    F.fpsRec = F.fps || 60;
    F.media = null;
    F.working = false;
    F.enabled = true;
    F.modules = {}; //constructed module list
    //F.moduleList=[];

    var style = document.createElement("style");
    document.head.appendChild(style);
    F.styleSheet = style.sheet;
    setTimeout(function () {
      //container size sensor
      F.container.ResizeSensor = new _ResizeSensor.default(F.container, function () {
        F.resize();
      });
      F.resize();
    }, 0);
    setInterval(function () {
      F.fpsRec = F.fpsTmp;
      F.fpsTmp = 0;
    }, 1000);
    F.draw = F.draw.bind(F);
  }

  _createClass(DanmakuFrame, [{
    key: "enable",
    value: function enable(name) {
      if (!name) {
        this.enabled = true;

        if (this.media) {
          this.media.paused || this.start();
        } else {
          this.start();
        }

        this.container.hidden = false;
        return;
      }

      var module = this.modules[name] || this.initModule(name);
      if (!module) return false;
      module.enabled = true;
      module.enable && module.enable();
      return true;
    }
  }, {
    key: "disable",
    value: function disable(name) {
      if (!name) {
        this.pause();
        this.moduleFunction('clear');
        this.enabled = false;
        this.container.hidden = true;
        return;
      }

      var module = this.modules[name];
      if (!module) return false;
      module.enabled = false;
      module.disable && module.disable();
      return true;
    }
  }, {
    key: "addStyle",
    value: function addStyle(s) {
      var _this = this;

      if (typeof s === 'string') s = [s];
      if (s instanceof Array === false) return;
      s.forEach(function (r) {
        return _this.styleSheet.insertRule(r, _this.styleSheet.cssRules.length);
      });
    }
  }, {
    key: "initModule",
    value: function initModule(name, arg) {
      if (this.modules[name]) {
        console.warn("The module [".concat(name, "] has already inited."));
        return this.modules[name];
      }

      var mod = DanmakuFrame.availableModules[name];
      if (!mod) throw 'Module [' + name + '] does not exist.';
      var module = new mod(this, arg);
      if (module instanceof DanmakuFrameModule === false) throw 'Constructor of ' + name + ' is not extended from DanmakuFrameModule';
      this.modules[name] = module;
      console.debug("Mod Inited: ".concat(name));
      return module;
    }
  }, {
    key: "draw",
    value: function draw(force) {
      var _this2 = this;

      if (!this.working) return;
      this.fpsTmp++;
      this.moduleFunction('draw', force);

      if (this.fps === 0) {
        requestAnimationFrame(function () {
          return _this2.draw();
        });
      } else {
        setTimeout(this.draw, 1000 / this.fps);
      }
    }
  }, {
    key: "load",
    value: function load() {
      for (var _len = arguments.length, danmakuObj = new Array(_len), _key = 0; _key < _len; _key++) {
        danmakuObj[_key] = arguments[_key];
      }

      this.moduleFunction.apply(this, ['load'].concat(danmakuObj));
    }
  }, {
    key: "loadList",
    value: function loadList(danmakuArray) {
      this.moduleFunction('loadList', danmakuArray);
    }
  }, {
    key: "unload",
    value: function unload(danmakuObj) {
      this.moduleFunction('unload', danmakuObj);
    }
  }, {
    key: "start",
    value: function start() {
      if (this.working || !this.enabled) return;
      this.working = true;
      this.moduleFunction('start');
      this.draw(true);
    }
  }, {
    key: "pause",
    value: function pause() {
      if (!this.enabled) return;
      this.working = false;
      this.moduleFunction('pause');
    }
  }, {
    key: "resize",
    value: function resize() {
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;
      this.moduleFunction('resize');
    }
  }, {
    key: "moduleFunction",
    value: function moduleFunction(name) {
      var m;

      for (var _len2 = arguments.length, arg = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        arg[_key2 - 1] = arguments[_key2];
      }

      for (var n in this.modules) {
        var _m;

        m = this.modules[n];
        if (m.enabled && m[name]) (_m = m)[name].apply(_m, arg);
      }
    }
  }, {
    key: "setMedia",
    value: function setMedia(media) {
      var F = this;
      F.media = media;
      addEvents(media, {
        playing: function playing() {
          return F.start();
        },
        'pause,stalled,seeking,waiting': function pauseStalledSeekingWaiting() {
          return F.pause();
        },
        ratechange: function ratechange() {
          F.rate = F.media.playbackRate;
          F.moduleFunction('rate', F.rate);
        }
      });
      F.moduleFunction('media', media);
    }
  }, {
    key: "time",
    set: function set(t) {
      //current media time (ms)
      this.media || (this.timeBase = Date.now() - t);
      this.moduleFunction('time', t); //let all mods know when the time be set
    },
    get: function get() {
      return this.media ? this.media.currentTime * 1000 | 0 : Date.now() - this.timeBase;
    }
  }], [{
    key: "addModule",
    value: function addModule(name, module) {
      if (name in this.availableModules) {
        console.warn('The module "' + name + '" has already been added.');
        return;
      }

      this.availableModules[name] = module;
    }
  }]);

  return DanmakuFrame;
}();

exports.DanmakuFrame = DanmakuFrame;
DanmakuFrame.availableModules = {};

var DanmakuFrameModule = function DanmakuFrameModule(frame) {
  _classCallCheck(this, DanmakuFrameModule);

  this.frame = frame;
  this.enabled = false;
};

exports.DanmakuFrameModule = DanmakuFrameModule;

function addEvents(target) {
  var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _loop = function _loop(e) {
    e.split(/\,/g).forEach(function (e2) {
      return target.addEventListener(e2, events[e]);
    });
  };

  for (var e in events) {
    _loop(e);
  }
}

},{"../lib/ResizeSensor.js":2,"core-js/modules/es6.function.name":111,"core-js/modules/es6.regexp.split":120,"core-js/modules/web.dom.iterable":128}],4:[function(require,module,exports){
/*
Copyright luojia@luojia.me
LGPL license
*/
'use strict';

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.typed.float32-array");

require("core-js/modules/es6.array.fill");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (f) {
  if (typeof define === "function" && define.amd) {
    define(f);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
    module.exports = f();
  } else {
    (0, eval)('this').Mat = f();
  }
})(function () {
  var global = (0, eval)('this');
  var TypedArray = global.Float32Array && global.Float32Array.prototype;

  function _createClass(Constructor) {
    var Matrix =
    /*#__PURE__*/
    function () {
      function Matrix(l, c) {
        var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, Matrix);

        this.array = new Constructor(l * c);
        Object.defineProperty(this.array, 'row', {
          value: l
        });
        Object.defineProperty(this.array, 'column', {
          value: c
        });

        if (arguments.length == 3) {
          if (Matrix._instanceofTypedArray && fill === 0) {} else if (typeof fill === 'number') {
            this.fill(fill);
          } else if (fill.length) {
            this.set(fill);
          }
        }
      }

      _createClass2(Matrix, [{
        key: "leftMultiply",
        value: function leftMultiply(m) {
          return this.set(Matrix.multiply(m, this, new Matrix(m.row, this.column)));
        }
      }, {
        key: "rightMultiply",
        value: function rightMultiply(m) {
          return this.set(Matrix.multiply(this, m, new Matrix(this.row, m, column)));
        }
      }, {
        key: "fill",
        value: function fill(n) {
          arguments.length || (n = 0);

          for (var i = this.length; i--;) {
            this.array[i] = n;
          }

          return this;
        }
      }, {
        key: "set",
        value: function set(arr, offset) {
          offset || (offset = 0);
          arr instanceof Matrix && (arr = arr.array);

          for (var i = arr.length + offset <= this.length ? arr.length : this.length - offset; i--;) {
            this.array[offset + i] = arr[i];
          }

          return this;
        }
      }, {
        key: "put",
        value: function put(m, row, column) {
          Matrix.put(this, m, row || 0, column || 0);
          return this;
        }
      }, {
        key: "rotate2d",
        value: function rotate2d(t) {
          return this.set(Matrix.rotate2d(this, t, Matrix.Matrixes.T3));
        }
      }, {
        key: "translate2d",
        value: function translate2d(x, y) {
          return this.set(Matrix.translate2d(this, x, y, Matrix.Matrixes.T3));
        }
      }, {
        key: "scale2d",
        value: function scale2d(x, y) {
          return this.set(Matrix.scale2d(this, x, y, Matrix.Matrixes.T3));
        }
      }, {
        key: "rotate3d",
        value: function rotate3d(tx, ty, tz) {
          return this.set(Matrix.rotate3d(this, tx, ty, tz, Matrix.Matrixes.T4));
        }
      }, {
        key: "scale3d",
        value: function scale3d(x, y, z) {
          return this.set(Matrix.scale3d(this, x, y, z, Matrix.Matrixes.T4));
        }
      }, {
        key: "translate3d",
        value: function translate3d(x, y, z) {
          return this.set(Matrix.translate3d(this, x, y, z, Matrix.Matrixes.T4));
        }
      }, {
        key: "rotateX",
        value: function rotateX(t) {
          return this.set(Matrix.rotateX(this, t, Matrix.Matrixes.T4));
        }
      }, {
        key: "rotateY",
        value: function rotateY(t) {
          return this.set(Matrix.rotateY(this, t, Matrix.Matrixes.T4));
        }
      }, {
        key: "rotateZ",
        value: function rotateZ(t) {
          return this.set(Matrix.rotateZ(this, t, Matrix.Matrixes.T4));
        }
      }, {
        key: "clone",
        value: function clone() {
          return new Matrix(this.row, this.column, this);
        }
      }, {
        key: "toString",
        value: function toString() {
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

      }, {
        key: "length",
        get: function get() {
          return this.array.length;
        }
      }, {
        key: "row",
        get: function get() {
          return this.array.row;
        }
      }, {
        key: "column",
        get: function get() {
          return this.array.column;
        }
      }], [{
        key: "Identity",
        value: function Identity(n) {
          //return a new Identity Matrix
          var m = new Matrix(n, n, 0);

          for (var i = n; i--;) {
            m.array[i * n + i] = 1;
          }

          return m;
        }
      }, {
        key: "Perspective",
        value: function Perspective(fovy, aspect, znear, zfar, result) {
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
      }, {
        key: "multiply",
        value: function multiply(a, b, result) {
          if (a.column !== b.row) throw 'wrong matrix';
          var row = a.row,
              column = Math.min(a.column, b.column),
              r = result || new Matrix(row, column),
              c,
              i,
              ind;

          for (var l = row; l--;) {
            for (c = column; c--;) {
              r.array[ind = l * r.column + c] = 0;

              for (i = a.column; i--;) {
                r.array[ind] += a.array[l * a.column + i] * b.array[c + i * b.column];
              }
            }
          }

          return r;
        }
      }, {
        key: "multiplyString",
        value: function multiplyString(a, b, array) {
          var ignoreZero = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
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
      }, {
        key: "add",
        value: function add(a, b, result) {
          if (a.column !== b.column || a.row !== b.row) throw 'wrong matrix';
          var r = result || new Matrix(a.row, b.column);

          for (var i = a.length; i--;) {
            r.array[i] = a.array[i] + b.array[i];
          }

          return r;
        }
      }, {
        key: "minus",
        value: function minus(a, b, result) {
          if (a.column !== b.column || a.row !== b.row) throw 'wrong matrix';
          var r = result || new Matrix(a.row, b.column);

          for (var i = a.length; i--;) {
            r.array[i] = a.array[i] - b.array[i];
          }

          return r;
        }
      }, {
        key: "rotate2d",
        value: function rotate2d(m, t, result) {
          var Mr = Matrix.Matrixes.rotate2d;
          Mr.array[0] = Mr.array[4] = Math.cos(t);
          Mr.array[1] = -(Mr.array[3] = Math.sin(t));
          return Matrix.multiply(Mr, m, result || new Matrix(3, 3));
        }
      }, {
        key: "scale2d",
        value: function scale2d(m, x, y, result) {
          var Mr = Matrix.Matrixes.scale2d;
          Mr.array[0] = x;
          Mr.array[4] = y;
          return Matrix.multiply(Mr, m, result || new Matrix(3, 3));
        }
      }, {
        key: "translate2d",
        value: function translate2d(m, x, y, result) {
          var Mr = Matrix.Matrixes.translate2d;
          Mr.array[2] = x;
          Mr.array[5] = y;
          return Matrix.multiply(Mr, m, result || new Matrix(3, 3));
        }
      }, {
        key: "rotate3d",
        value: function rotate3d(m, tx, ty, tz, result) {
          var Xc = Math.cos(tx),
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
      }, {
        key: "rotateX",
        value: function rotateX(m, t, result) {
          var Mr = Matrix.Matrixes.rotateX;
          Mr.array[10] = Mr.array[5] = Math.cos(t);
          Mr.array[6] = -(Mr.array[9] = Math.sin(t));
          return Matrix.multiply(Mr, m, result || new Matrix(4, 4));
        }
      }, {
        key: "rotateY",
        value: function rotateY(m, t, result) {
          var Mr = Matrix.Matrixes.rotateY;
          Mr.array[10] = Mr.array[0] = Math.cos(t);
          Mr.array[8] = -(Mr.array[2] = Math.sin(t));
          return Matrix.multiply(Mr, m, result || new Matrix(4, 4));
        }
      }, {
        key: "rotateZ",
        value: function rotateZ(m, t, result) {
          var Mr = Matrix.Matrixes.rotateZ;
          Mr.array[5] = Mr.array[0] = Math.cos(t);
          Mr.array[1] = -(Mr.array[4] = Math.sin(t));
          return Matrix.multiply(Mr, m, result || new Matrix(4, 4));
        }
      }, {
        key: "scale3d",
        value: function scale3d(m, x, y, z, result) {
          var Mr = Matrix.Matrixes.scale3d;
          Mr.array[0] = x;
          Mr.array[5] = y;
          Mr.array[10] = z;
          return Matrix.multiply(Mr, m, result || new Matrix(4, 4));
        }
      }, {
        key: "translate3d",
        value: function translate3d(m, x, y, z, result) {
          var Mr = Matrix.Matrixes.translate3d;
          Mr.array[12] = x;
          Mr.array[13] = y;
          Mr.array[14] = z;
          return Matrix.multiply(Mr, m, result || new Matrix(4, 4));
        }
      }, {
        key: "put",
        value: function put(m, sub, row, column) {
          var c, ind, i;
          row || (row = 0);
          column || (column = 0);

          for (var l = sub.row; l--;) {
            if (l + row >= m.row) continue;

            for (c = sub.column; c--;) {
              if (c + column >= m.column) continue;
              m.array[(l + row) * m.column + c + column] = sub.array[l * sub.column + c];
            }
          }
        }
      }, {
        key: "createClass",
        value: function createClass(Constructor) {
          return _createClass(Constructor);
        }
      }]);

      return Matrix;
    }();

    var testArray = new Constructor(1);
    Object.defineProperty(Matrix, '_instanceofTypedArray', {
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

  return _createClass(global.Float32Array ? Float32Array : Array);
});

},{"core-js/modules/es6.array.fill":108,"core-js/modules/es6.symbol":125,"core-js/modules/es6.typed.float32-array":126,"core-js/modules/es7.symbol.async-iterator":127}],5:[function(require,module,exports){
(function (process,global){
"use strict";

(function (global, undefined) {
  "use strict";

  if (global.setImmediate) {
    return;
  }

  var nextHandle = 1; // Spec says greater than zero

  var tasksByHandle = {};
  var currentlyRunningATask = false;
  var doc = global.document;
  var registerImmediate;

  function setImmediate(callback) {
    // Callback can either be a function or a string
    if (typeof callback !== "function") {
      callback = new Function("" + callback);
    } // Copy function arguments


    var args = new Array(arguments.length - 1);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i + 1];
    } // Store and register the task


    var task = {
      callback: callback,
      args: args
    };
    tasksByHandle[nextHandle] = task;
    registerImmediate(nextHandle);
    return nextHandle++;
  }

  function clearImmediate(handle) {
    delete tasksByHandle[handle];
  }

  function run(task) {
    var callback = task.callback;
    var args = task.args;

    switch (args.length) {
      case 0:
        callback();
        break;

      case 1:
        callback(args[0]);
        break;

      case 2:
        callback(args[0], args[1]);
        break;

      case 3:
        callback(args[0], args[1], args[2]);
        break;

      default:
        callback.apply(undefined, args);
        break;
    }
  }

  function runIfPresent(handle) {
    // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
    // So if we're currently running a task, we'll need to delay this invocation.
    if (currentlyRunningATask) {
      // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
      // "too much recursion" error.
      setTimeout(runIfPresent, 0, handle);
    } else {
      var task = tasksByHandle[handle];

      if (task) {
        currentlyRunningATask = true;

        try {
          run(task);
        } finally {
          clearImmediate(handle);
          currentlyRunningATask = false;
        }
      }
    }
  }

  function installNextTickImplementation() {
    registerImmediate = function registerImmediate(handle) {
      process.nextTick(function () {
        runIfPresent(handle);
      });
    };
  }

  function canUsePostMessage() {
    // The test against `importScripts` prevents this implementation from being installed inside a web worker,
    // where `global.postMessage` means something completely different and can't be used for this purpose.
    if (global.postMessage && !global.importScripts) {
      var postMessageIsAsynchronous = true;
      var oldOnMessage = global.onmessage;

      global.onmessage = function () {
        postMessageIsAsynchronous = false;
      };

      global.postMessage("", "*");
      global.onmessage = oldOnMessage;
      return postMessageIsAsynchronous;
    }
  }

  function installPostMessageImplementation() {
    // Installs an event handler on `global` for the `message` event: see
    // * https://developer.mozilla.org/en/DOM/window.postMessage
    // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
    var messagePrefix = "setImmediate$" + Math.random() + "$";

    var onGlobalMessage = function onGlobalMessage(event) {
      if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
        runIfPresent(+event.data.slice(messagePrefix.length));
      }
    };

    if (global.addEventListener) {
      global.addEventListener("message", onGlobalMessage, false);
    } else {
      global.attachEvent("onmessage", onGlobalMessage);
    }

    registerImmediate = function registerImmediate(handle) {
      global.postMessage(messagePrefix + handle, "*");
    };
  }

  function installMessageChannelImplementation() {
    var channel = new MessageChannel();

    channel.port1.onmessage = function (event) {
      var handle = event.data;
      runIfPresent(handle);
    };

    registerImmediate = function registerImmediate(handle) {
      channel.port2.postMessage(handle);
    };
  }

  function installReadyStateChangeImplementation() {
    var html = doc.documentElement;

    registerImmediate = function registerImmediate(handle) {
      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var script = doc.createElement("script");

      script.onreadystatechange = function () {
        runIfPresent(handle);
        script.onreadystatechange = null;
        html.removeChild(script);
        script = null;
      };

      html.appendChild(script);
    };
  }

  function installSetTimeoutImplementation() {
    registerImmediate = function registerImmediate(handle) {
      setTimeout(runIfPresent, 0, handle);
    };
  } // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.


  var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
  attachTo = attachTo && attachTo.setTimeout ? attachTo : global; // Don't get fooled by e.g. browserify environments.

  if ({}.toString.call(global.process) === "[object process]") {
    // For Node.js before 0.9
    installNextTickImplementation();
  } else if (canUsePostMessage()) {
    // For non-IE10 modern browsers
    installPostMessageImplementation();
  } else if (global.MessageChannel) {
    // For web workers, where supported
    installMessageChannelImplementation();
  } else if (doc && "onreadystatechange" in doc.createElement("script")) {
    // For IE 6–8
    installReadyStateChangeImplementation();
  } else {
    // For older browsers
    installSetTimeoutImplementation();
  }

  attachTo.setImmediate = setImmediate;
  attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? void 0 : global : self);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":129}],6:[function(require,module,exports){
(function (setImmediate){
/*
Copyright luojia@luojia.me
LGPL license

danmaku-frame text2d mod
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.fill");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.object.assign");

require("../lib/setImmediate/setImmediate.js");

var _text2d = _interopRequireDefault(require("./text2d.js"));

var _text3d = _interopRequireDefault(require("./text3d.js"));

var _textCanvas = _interopRequireDefault(require("./textCanvas.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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
function init(DanmakuFrame, DanmakuFrameModule) {
  var defProp = Object.defineProperty;
  var requestIdleCallback = window.requestIdleCallback || setImmediate;
  var useImageBitmap = false;

  var TextDanmaku =
  /*#__PURE__*/
  function (_DanmakuFrameModule) {
    _inherits(TextDanmaku, _DanmakuFrameModule);

    function TextDanmaku(frame) {
      var _this;

      var arg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, TextDanmaku);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(TextDanmaku).call(this, frame));

      var D = _assertThisInitialized(_assertThisInitialized(_this));

      D.list = []; //danmaku object array

      D.indexMark = 0; //to record the index of last danmaku in the list

      D.tunnel = new tunnelManager();
      D.paused = true;
      D.randomText = "danmaku_text_".concat(Math.random() * 999999 | 0); //opt time record

      D.cacheCleanTime = 0;
      D.danmakuMoveTime = 0;
      D.danmakuCheckTime = 0;
      D.danmakuCheckSwitch = true;
      D.defaultStyle = {
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

      };
      D.options = {
        allowLines: false,
        //allow multi-line danmaku
        screenLimit: 0,
        //the most number of danmaku on the screen
        clearWhenTimeReset: true,
        //clear danmaku on screen when the time is reset
        speed: 6.5,
        autoShiftRenderingMode: true //auto shift to a low load mode

      };
      if (arg.defaultStyle) Object.assign(_this.defaultStyle, arg.defaultStyle);
      if (arg.options) Object.assign(_this.options, arg.options);
      frame.addStyle(".".concat(D.randomText, "_fullfill{top:0;left:0;width:100%;height:100%;position:absolute;}"));
      defProp(D, 'rendererMode', {
        configurable: true
      });
      defProp(D, 'activeRendererMode', {
        configurable: true,
        value: null
      });
      var con = D.container = document.createElement('div');
      con.classList.add("".concat(D.randomText, "_fullfill"));
      frame.container.appendChild(con); //init modes

      D.text2d = new _text2d.default(D);
      D.text3d = new _text3d.default(D);
      D.textCanvas = new _textCanvas.default(D);
      D.textCanvasContainer.hidden = D.canvas.hidden = D.canvas3d.hidden = true;
      D.modes = {
        1: D.textCanvas,
        2: D.text2d,
        3: D.text3d
      };
      D.GraphCache = []; //text graph cache

      D.DanmakuText = [];
      D.renderingDanmakuManager = new renderingDanmakuManager(D);
      addEvents(document, {
        visibilitychange: function visibilitychange(e) {
          D.danmakuCheckSwitch = !document.hidden;
          if (!document.hidden) D.recheckIndexMark();
        }
      });
      D._checkNewDanmaku = D._checkNewDanmaku.bind(D);
      D._cleanCache = D._cleanCache.bind(D);
      setInterval(D._cleanCache, 5000); //set an interval for cache cleaning

      D.setRendererMode(1);
      return _this;
    }

    _createClass(TextDanmaku, [{
      key: "setRendererMode",
      value: function setRendererMode(n) {
        var D = this;
        if (D.rendererMode === n || !(n in D.modes) || !D.modes[n].supported) return false;
        D.activeRendererMode && D.activeRendererMode.disable();
        defProp(D, 'activeRendererMode', {
          value: D.modes[n]
        });
        defProp(D, 'rendererMode', {
          value: n
        });
        D.activeRendererMode.resize();
        D.activeRendererMode.enable();
        console.log('rendererMode:', D.rendererMode);
        return true;
      }
    }, {
      key: "media",
      value: function media(_media) {
        var D = this;
        addEvents(_media, {
          seeked: function seeked() {
            D.time();

            D._clearScreen(true);
          },
          seeking: function seeking() {
            return D.pause();
          }
        });
      }
    }, {
      key: "start",
      value: function start() {
        this.paused = false; //this.recheckIndexMark();

        this.activeRendererMode.start();
      }
    }, {
      key: "pause",
      value: function pause() {
        this.paused = true;
        this.activeRendererMode.pause();
      }
    }, {
      key: "load",
      value: function load(d, autoAddToScreen) {
        if (!d || d._ !== 'text') {
          return false;
        }

        if (typeof d.text !== 'string') {
          console.error('wrong danmaku object:', d);
          return false;
        }

        var t = d.time,
            ind,
            arr = this.list;
        ind = dichotomy(arr, d.time, 0, arr.length - 1, false);
        arr.splice(ind, 0, d);
        if (ind < this.indexMark) this.indexMark++; //round d.style.fontSize to prevent Iifinity loop in tunnel

        if (_typeof(d.style) !== 'object') d.style = {};
        d.style.fontSize = d.style.fontSize ? d.style.fontSize + 0.5 | 0 : this.defaultStyle.fontSize;
        if (isNaN(d.style.fontSize) || d.style.fontSize === Infinity || d.style.fontSize === 0) d.style.fontSize = this.defaultStyle.fontSize;
        if (typeof d.mode !== 'number') d.mode = 0;

        if (autoAddToScreen) {
          console.log(ind, this.indexMark);
        }

        if (autoAddToScreen && ind < this.indexMark) this._addNewDanmaku(d);
        return d;
      }
    }, {
      key: "loadList",
      value: function loadList(danmakuArray) {
        var _this2 = this;

        danmakuArray.forEach(function (d) {
          return _this2.load(d);
        });
      }
    }, {
      key: "unload",
      value: function unload(d) {
        if (!d || d._ !== 'text') return false;
        var D = this,
            i = D.list.indexOf(d);
        if (i < 0) return false;
        D.list.splice(i, 1);
        if (i < D.indexMark) D.indexMark--;
        return true;
      }
    }, {
      key: "_checkNewDanmaku",
      value: function _checkNewDanmaku(force) {
        if (this.paused && !force) return;
        var D = this,
            d,
            time = D.frame.time;
        if (D.danmakuCheckTime === time || !D.danmakuCheckSwitch) return;
        if (D.list.length) for (; D.indexMark < D.list.length && (d = D.list[D.indexMark]) && d.time <= time; D.indexMark++) {
          //add new danmaku
          if (D.options.screenLimit > 0 && D.DanmakuText.length >= D.options.screenLimit) {
            continue;
          } //continue if the number of danmaku on screen has up to limit or doc is not visible


          D._addNewDanmaku(d);
        }
        D.danmakuCheckTime = time;
      }
    }, {
      key: "_addNewDanmaku",
      value: function _addNewDanmaku(d) {
        var D = this,
            cHeight = D.height,
            cWidth = D.width;
        var t = D.GraphCache.length ? D.GraphCache.shift() : new TextGraph();
        t.danmaku = d;
        t.drawn = false;
        t.text = D.options.allowLines ? d.text : d.text.replace(/\n/g, ' ');
        t.time = d.time;
        t.font = Object.create(D.defaultStyle);
        Object.assign(t.font, d.style);
        if (!t.font.lineHeight) t.font.lineHeight = t.font.fontSize + 2 || 1;

        if (d.style.color) {
          if (t.font.color && t.font.color[0] !== '#') {
            t.font.color = '#' + d.style.color;
          }
        }

        if (d.mode > 1) t.font.textAlign = 'center';
        t.prepare(D.rendererMode === 3 ? false : true); //find tunnel number

        var tnum = D.tunnel.getTunnel(t, cHeight); //calc margin

        var margin = (tnum < 0 ? 0 : tnum) % cHeight;

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

        D.renderingDanmakuManager.add(t);
        D.activeRendererMode.newDanmaku(t);
      }
    }, {
      key: "_calcSideDanmakuPosition",
      value: function _calcSideDanmakuPosition(t) {
        var T = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.frame.time;
        var R = !t.danmaku.mode,
            style = t.style;
        return (R ? this.frame.width : -style.width) + (R ? -1 : 1) * this.frame.rate * (style.width + 1024) * (T - t.time) * this.options.speed / 60000;
      }
    }, {
      key: "_calcDanmakusPosition",
      value: function _calcDanmakusPosition(force) {
        var D = this,
            T = D.frame.time;
        if (D.paused && !force) return;
        var cWidth = D.width,
            rate = D.frame.rate;
        var R, i, t, style, X;
        D.danmakuMoveTime = T;

        for (i = D.DanmakuText.length; i--;) {
          t = D.DanmakuText[i];

          if (t.time > T) {
            D.removeText(t);
            continue;
          }

          style = t.style;

          switch (t.danmaku.mode) {
            case 0:
            case 1:
              {
                R = !t.danmaku.mode;
                style.x = X = D._calcSideDanmakuPosition(t, T);

                if (t.tunnelNumber >= 0 && (R && X + style.width + 10 < cWidth || !R && X > 10)) {
                  D.tunnel.removeMark(t);
                } else if (R && X < -style.width - 20 || !R && X > cWidth + style.width + 20) {
                  //go out the canvas
                  D.removeText(t);
                  continue;
                }

                break;
              }

            case 2:
            case 3:
              {
                if (T - t.time > D.options.speed * 1000 / rate) {
                  D.removeText(t);
                }
              }
          }
        }
      }
    }, {
      key: "_cleanCache",
      value: function _cleanCache(force) {
        //clean text object cache
        var D = this,
            now = Date.now();

        if (D.GraphCache.length > 30 || force) {
          //save 20 cached danmaku
          for (var ti = 0; ti < D.GraphCache.length; ti++) {
            if (force || now - D.GraphCache[ti].removeTime > 10000) {
              //delete cache which has not used for 10s
              D.activeRendererMode.deleteTextObject(D.GraphCache[ti]);
              D.GraphCache.splice(ti, 1);
            } else {
              break;
            }
          }
        }
      }
    }, {
      key: "draw",
      value: function draw(force) {
        var _this3 = this;

        if (!force && this.paused || !this.enabled) return;

        this._calcDanmakusPosition(force);

        this.activeRendererMode.draw(force);
        requestAnimationFrame(function () {
          _this3._checkNewDanmaku(force);
        });
      }
    }, {
      key: "removeText",
      value: function removeText(t) {
        //remove the danmaku from screen
        this.renderingDanmakuManager.remove(t);
        this.tunnel.removeMark(t);
        t._bitmap = t.danmaku = null;
        t.removeTime = Date.now();
        this.GraphCache.push(t);
        this.activeRendererMode.remove(t);
      }
    }, {
      key: "resize",
      value: function resize() {
        if (this.activeRendererMode) this.activeRendererMode.resize();
        this.draw(true);
      }
    }, {
      key: "_clearScreen",
      value: function _clearScreen(forceFull) {
        this.activeRendererMode && this.activeRendererMode.clear(forceFull);
      }
    }, {
      key: "clear",
      value: function clear() {
        //clear danmaku on the screen
        for (var i = this.DanmakuText.length, T; i--;) {
          T = this.DanmakuText[i];
          if (T.danmaku) this.removeText(T);
        }

        this.tunnel.reset();

        this._clearScreen(true);
      }
    }, {
      key: "recheckIndexMark",
      value: function recheckIndexMark() {
        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.frame.time;
        this.indexMark = dichotomy(this.list, t, 0, this.list.length - 1, true);
      }
    }, {
      key: "rate",
      value: function rate(r) {
        if (this.activeRendererMode) this.activeRendererMode.rate(r);
      }
    }, {
      key: "time",
      value: function time() {
        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.frame.time;
        //reset time,you should invoke it when the media has seeked to another time
        this.recheckIndexMark(t);

        if (this.options.clearWhenTimeReset) {
          this.clear();
        } else {
          this.resetTimeOfDanmakuOnScreen();
        }
      }
    }, {
      key: "resetTimeOfDanmakuOnScreen",
      value: function resetTimeOfDanmakuOnScreen(cTime) {
        var _this4 = this;

        //cause the position of the danmaku is based on time
        //and if you don't want these danmaku on the screen to disappear after seeking,their time should be reset
        if (cTime === undefined) cTime = this.frame.time;
        this.DanmakuText.forEach(function (t) {
          if (!t.danmaku) return;
          t.time = cTime - (_this4.danmakuMoveTime - t.time);
        });
      }
    }, {
      key: "danmakuAt",
      value: function danmakuAt(x, y) {
        //return a list of danmaku which covers this position
        var list = [];
        if (!this.enabled) return list;
        this.DanmakuText.forEach(function (t) {
          if (!t.danmaku) return;
          if (t.style.x <= x && t.style.x + t.style.width >= x && t.style.y <= y && t.style.y + t.style.height >= y) list.push(t.danmaku);
        });
        return list;
      }
    }, {
      key: "enable",
      value: function enable() {
        //enable the plugin
        this.textCanvasContainer.hidden = false;
        if (this.frame.working) this.start();
      }
    }, {
      key: "disable",
      value: function disable() {
        //disable the plugin
        this.textCanvasContainer.hidden = true;
        this.pause();
        this.clear();
      }
    }, {
      key: "useImageBitmap",
      set: function set(v) {
        useImageBitmap = typeof createImageBitmap === 'function' ? v : false;
      },
      get: function get() {
        return useImageBitmap;
      }
    }, {
      key: "width",
      get: function get() {
        return this.frame.width;
      }
    }, {
      key: "height",
      get: function get() {
        return this.frame.height;
      }
    }]);

    return TextDanmaku;
  }(DanmakuFrameModule);

  var TextGraph =
  /*#__PURE__*/
  function () {
    //code copied from CanvasObjLibrary
    function TextGraph() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      _classCallCheck(this, TextGraph);

      var G = this;
      G._fontString = '';
      G._renderList = null;
      G.style = {};
      G.font = {};
      G.text = text;
      G._renderToCache = G._renderToCache.bind(G);
      defProp(G, '_cache', {
        configurable: true
      });
    }

    _createClass(TextGraph, [{
      key: "prepare",
      value: function prepare() {
        var async = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        //prepare text details
        var G = this;

        if (!G._cache) {
          defProp(G, '_cache', {
            value: document.createElement("canvas")
          });
        }

        var ta = [];
        G.font.fontStyle && ta.push(G.font.fontStyle);
        G.font.fontVariant && ta.push(G.font.fontVariant);
        G.font.fontWeight && ta.push(G.font.fontWeight);
        ta.push("".concat(G.font.fontSize, "px"));
        G.font.fontFamily && ta.push(G.font.fontFamily);
        G._fontString = ta.join(' ');
        var imgobj = G._cache,
            ct = imgobj.ctx2d || (imgobj.ctx2d = imgobj.getContext("2d"));
        ct.font = G._fontString;
        G._renderList = G.text.split(/\n/g);
        G.estimatePadding = Math.max(G.font.shadowBlur + 5 + Math.max(Math.abs(G.font.shadowOffsetY), Math.abs(G.font.shadowOffsetX)), G.font.strokeWidth + 3);
        var w = 0,
            tw,
            lh = typeof G.font.lineHeight === 'number' ? G.font.lineHeight : G.font.fontSize;

        for (var i = G._renderList.length; i--;) {
          tw = ct.measureText(G._renderList[i]).width;
          tw > w && (w = tw); //max
        }

        imgobj.width = (G.style.width = w) + G.estimatePadding * 2;
        imgobj.height = (G.style.height = G._renderList.length * lh) + (lh < G.font.fontSize ? G.font.fontSize * 2 : 0) + G.estimatePadding * 2;
        ct.translate(G.estimatePadding, G.estimatePadding);

        if (async) {
          requestIdleCallback(G._renderToCache);
        } else {
          G._renderToCache();
        }
      }
    }, {
      key: "_renderToCache",
      value: function _renderToCache() {
        var G = this;
        if (!G.danmaku) return;
        G.render(G._cache.ctx2d);

        if (useImageBitmap) {
          //use ImageBitmap
          if (G._bitmap) {
            G._bitmap.close();

            G._bitmap = null;
          }

          createImageBitmap(G._cache).then(function (bitmap) {
            G._bitmap = bitmap;
          });
        }
      }
    }, {
      key: "render",
      value: function render(ct) {
        //render text
        var G = this;
        if (!G._renderList) return;
        ct.save();

        if (G.danmaku.highlight) {
          ct.fillStyle = 'rgba(255,255,255,0.3)';
          ct.beginPath();
          ct.rect(0, 0, G.style.width, G.style.height);
          ct.fill();
        }

        ct.font = G._fontString; //set font

        ct.textBaseline = 'middle';
        ct.lineWidth = G.font.strokeWidth;
        ct.fillStyle = G.font.color;
        ct.strokeStyle = G.font.strokeColor;
        ct.shadowBlur = G.font.shadowBlur;
        ct.shadowColor = G.font.shadowColor;
        ct.shadowOffsetX = G.font.shadowOffsetX;
        ct.shadowOffsetY = G.font.shadowOffsetY;
        ct.textAlign = G.font.textAlign;
        var lh = typeof G.font.lineHeight === 'number' ? G.font.lineHeight : G.font.fontSize,
            x;

        switch (G.font.textAlign) {
          case 'left':
          case 'start':
            {
              x = 0;
              break;
            }

          case 'center':
            {
              x = G.style.width / 2;
              break;
            }

          case 'right':
          case 'end':
            {
              x = G.style.width;
            }
        }

        for (var i = G._renderList.length; i--;) {
          G.font.strokeWidth && ct.strokeText(G._renderList[i], x, lh * (i + 0.5));
          G.font.fill && ct.fillText(G._renderList[i], x, lh * (i + 0.5));
        }

        ct.restore();
      }
    }]);

    return TextGraph;
  }();

  var tunnelManager =
  /*#__PURE__*/
  function () {
    function tunnelManager() {
      _classCallCheck(this, tunnelManager);

      this.reset();
    }

    _createClass(tunnelManager, [{
      key: "reset",
      value: function reset() {
        this.right = {};
        this.left = {};
        this.bottom = {};
        this.top = {};
      }
    }, {
      key: "getTunnel",
      value: function getTunnel(tobj, cHeight) {
        //get the tunnel index that can contain the danmaku of the sizes
        var tunnel = this.tunnel(tobj.danmaku.mode),
            size = tobj.style.height,
            ti = 0,
            tnum = -1;

        if (typeof size !== 'number' || size <= 0) {
          console.error('Incorrect size:' + size);
          size = 24;
        }

        if (size > cHeight) return 0;

        while (tnum < 0) {
          for (var t = ti + size - 1; ti <= t;) {
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
    }, {
      key: "addMark",
      value: function addMark(tobj) {
        var t = this.tunnel(tobj.danmaku.mode);
        if (!t[tobj.tunnelNumber]) t[tobj.tunnelNumber] = tobj;
      }
    }, {
      key: "removeMark",
      value: function removeMark(tobj) {
        var t,
            tun = tobj.tunnelNumber;

        if (tun >= 0 && (t = this.tunnel(tobj.danmaku.mode))[tun] === tobj) {
          delete t[tun];
          tobj.tunnelNumber = -1;
        }
      }
    }, {
      key: "tunnel",
      value: function tunnel(id) {
        return this[tunnels[id]];
      }
    }]);

    return tunnelManager;
  }();

  var tunnels = ['right', 'left', 'bottom', 'top'];

  var renderingDanmakuManager =
  /*#__PURE__*/
  function () {
    function renderingDanmakuManager(dText) {
      var _this5 = this;

      _classCallCheck(this, renderingDanmakuManager);

      this.dText = dText;
      this.totalArea = 0;
      this.limitArea = Infinity;
      if (dText.text2d.supported) this.timer = setInterval(function () {
        return _this5.rendererModeCheck();
      }, 1500);
    }

    _createClass(renderingDanmakuManager, [{
      key: "add",
      value: function add(t) {
        this.dText.DanmakuText.push(t);
        this.totalArea += t._cache.width * t._cache.height;
      }
    }, {
      key: "remove",
      value: function remove(t) {
        var ind = this.dText.DanmakuText.indexOf(t);

        if (ind >= 0) {
          this.dText.DanmakuText.splice(ind, 1);
          this.totalArea -= t._cache.width * t._cache.height;
        }
      }
    }, {
      key: "rendererModeCheck",
      value: function rendererModeCheck() {
        var D = this.dText;
        if (!this.dText.options.autoShiftRenderingMode || D.paused) return;

        if (D.frame.fpsRec < (D.frame.fps || 60) * 0.95) {
          this.limitArea > this.totalArea && (this.limitArea = this.totalArea);
        } else {
          this.limitArea < this.totalArea && (this.limitArea = this.totalArea);
        }

        if (D.rendererMode == 1 && this.totalArea > this.limitArea) {
          D.text2d.supported && D.setRendererMode(2);
        } else if (D.rendererMode == 2 && this.totalArea < this.limitArea * 0.5) {
          D.textCanvas.supported && D.setRendererMode(1);
        }
      }
    }]);

    return renderingDanmakuManager;
  }();

  function dichotomy(arr, t, start, end) {
    var position = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    if (arr.length === 0) return 0;
    var m = start,
        s = start,
        e = end;

    while (start <= end) {
      //dichotomy
      m = start + end >> 1;
      if (t <= arr[m].time) end = m - 1;else {
        start = m + 1;
      }
    }

    if (position) {
      //find to top
      while (start > 0 && arr[start - 1].time === t) {
        start--;
      }
    } else {
      //find to end
      while (start <= e && arr[start].time === t) {
        start++;
      }
    }

    return start;
  }

  DanmakuFrame.addModule('TextDanmaku', TextDanmaku);
}

;

function addEvents(target) {
  var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _loop = function _loop(e) {
    e.split(/\,/g).forEach(function (e2) {
      return target.addEventListener(e2, events[e]);
    });
  };

  for (var e in events) {
    _loop(e);
  }
}

function limitIn(num, min, max) {
  //limit the number in a range
  return num < min ? min : num > max ? max : num;
}

function emptyFunc() {}

var _default = init;
exports.default = _default;

}).call(this,require("timers").setImmediate)

},{"../lib/setImmediate/setImmediate.js":5,"./text2d.js":7,"./text3d.js":8,"./textCanvas.js":9,"core-js/modules/es6.array.fill":108,"core-js/modules/es6.object.assign":114,"core-js/modules/es6.regexp.replace":119,"core-js/modules/es6.regexp.split":120,"core-js/modules/es6.symbol":125,"core-js/modules/es7.symbol.async-iterator":127,"core-js/modules/web.dom.iterable":128,"timers":130}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

var _textModuleTemplate = _interopRequireDefault(require("./textModuleTemplate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Text2d =
/*#__PURE__*/
function (_Template) {
  _inherits(Text2d, _Template);

  function Text2d(dText) {
    var _this;

    _classCallCheck(this, Text2d);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Text2d).call(this, dText));
    _this.supported = false;
    dText.canvas = document.createElement('canvas'); //the canvas

    dText.context2d = dText.canvas.getContext('2d'); //the canvas contex

    if (!dText.context2d) {
      console.warn('text 2d not supported');
      return _possibleConstructorReturn(_this);
    }

    dText.canvas.classList.add("".concat(dText.randomText, "_fullfill"));
    dText.canvas.id = "".concat(dText.randomText, "_text2d");
    dText.container.appendChild(dText.canvas);
    _this.supported = true;
    return _this;
  }

  _createClass(Text2d, [{
    key: "draw",
    value: function draw(force) {
      var ctx = this.dText.context2d,
          cW = ctx.canvas.width,
          dT = this.dText.DanmakuText,
          i = dT.length,
          t,
          left,
          right,
          vW;
      var bitmap = this.dText.useImageBitmap;
      ctx.globalCompositeOperation = 'destination-over';
      this.clear(force);

      for (; i--;) {
        (t = dT[i]).drawn || (t.drawn = true);
        left = t.style.x - t.estimatePadding;
        right = left + t._cache.width;
        if (left > cW || right < 0) continue;

        if (!bitmap && cW >= t._cache.width) {
          //danmaku that smaller than canvas width
          ctx.drawImage(t._bitmap || t._cache, left, t.style.y - t.estimatePadding);
        } else {
          vW = t._cache.width + (left < 0 ? left : 0) - (right > cW ? right - cW : 0);
          ctx.drawImage(t._bitmap || t._cache, left < 0 ? -left : 0, 0, vW, t._cache.height, left < 0 ? 0 : left, t.style.y - t.estimatePadding, vW, t._cache.height);
        }
      }
    }
  }, {
    key: "clear",
    value: function clear(force) {
      var D = this.dText;

      if (force || this._evaluateIfFullClearMode()) {
        D.context2d.clearRect(0, 0, D.canvas.width, D.canvas.height);
        return;
      }

      for (var i = D.DanmakuText.length, t; i--;) {
        t = D.DanmakuText[i];
        if (t.drawn) D.context2d.clearRect(t.style.x - t.estimatePadding, t.style.y - t.estimatePadding, t._cache.width, t._cache.height);
      }
    }
  }, {
    key: "_evaluateIfFullClearMode",
    value: function _evaluateIfFullClearMode() {
      if (this.dText.DanmakuText.length > 3) return true;
      var l = this.dText.GraphCache[this.dText.GraphCache.length - 1];

      if (l && l.drawn) {
        l.drawn = false;
        return true;
      }

      return false;
    }
  }, {
    key: "resize",
    value: function resize() {
      var D = this.dText,
          C = D.canvas;
      C.width = D.width;
      C.height = D.height;
    }
  }, {
    key: "enable",
    value: function enable() {
      this.draw();
      this.dText.useImageBitmap = !(this.dText.canvas.hidden = false);
    }
  }, {
    key: "disable",
    value: function disable() {
      this.dText.canvas.hidden = true;
      this.clear(true);
    }
  }]);

  return Text2d;
}(_textModuleTemplate.default);

var _default = Text2d;
exports.default = _default;

},{"./textModuleTemplate.js":10,"core-js/modules/es6.symbol":125,"core-js/modules/es7.symbol.async-iterator":127}],8:[function(require,module,exports){
(function (setImmediate){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.typed.float32-array");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.function.name");

var _Mat = _interopRequireDefault(require("../lib/Mat/Mat.js"));

var _textModuleTemplate = _interopRequireDefault(require("./textModuleTemplate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var requestIdleCallback = window.requestIdleCallback || setImmediate;

var Text3d =
/*#__PURE__*/
function (_Template) {
  _inherits(Text3d, _Template);

  function Text3d(dText) {
    var _this;

    _classCallCheck(this, Text3d);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Text3d).call(this, dText));
    _this.supported = false;
    var c3d = _this.c3d = dText.canvas3d = document.createElement('canvas');
    c3d.classList.add("".concat(dText.randomText, "_fullfill"));
    c3d.id = "".concat(dText.randomText, "_text3d");
    dText.context3d = c3d.getContext('webgl') || c3d.getContext('experimental-webgl'); //the canvas3d context

    if (!dText.context3d) {
      console.warn('text 3d not supported');
      return _possibleConstructorReturn(_this);
    }

    dText.container.appendChild(c3d);
    var gl = _this.gl = dText.context3d,
        canvas = c3d; //init webgl
    //shader

    var shaders = {
      danmakuFrag: [gl.FRAGMENT_SHADER, "\n\t\t\t\t#pragma optimize(on)\n\t\t\t\tprecision lowp float;\n\t\t\t\tvarying lowp vec2 vDanmakuTexCoord;\n\t\t\t\tuniform sampler2D uSampler;\n\t\t\t\tvoid main(void) {\n\t\t\t\t\tvec4 co=texture2D(uSampler,vDanmakuTexCoord);\n\t\t\t\t\tif(co.a == 0.0)discard;\n\t\t\t\t\tgl_FragColor = co;\n\t\t\t\t}"],
      danmakuVert: [gl.VERTEX_SHADER, "\n\t\t\t\t#pragma optimize(on)\n\t\t\t\tattribute vec2 aVertexPosition;\n\t\t\t\tattribute vec2 aDanmakuTexCoord;\n\t\t\t\tuniform mat4 u2dCoordinate;\n\t\t\t\tvarying lowp vec2 vDanmakuTexCoord;\n\t\t\t\tvoid main(void) {\n\t\t\t\t\tgl_Position = u2dCoordinate * vec4(aVertexPosition,0,1);\n\t\t\t\t\tvDanmakuTexCoord = aDanmakuTexCoord;\n\t\t\t\t}"]
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
    var shaderProgram = _this.shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error("Unable to initialize the shader program.");
      return _possibleConstructorReturn(_this);
    }

    gl.useProgram(shaderProgram); //scene

    gl.clearColor(0, 0, 0, 0.0);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    _this.maxTexSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    _this.uSampler = gl.getUniformLocation(shaderProgram, "uSampler");
    _this.u2dCoord = gl.getUniformLocation(shaderProgram, "u2dCoordinate");
    _this.aVertexPosition = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    _this.atextureCoord = gl.getAttribLocation(shaderProgram, "aDanmakuTexCoord");
    gl.enableVertexAttribArray(_this.aVertexPosition);
    gl.enableVertexAttribArray(_this.atextureCoord);
    _this.commonTexCoordBuffer = gl.createBuffer();
    _this.commonVertCoordBuffer = gl.createBuffer();
    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(_this.uSampler, 0);
    _this.supported = true;
    return _this;
  }

  _createClass(Text3d, [{
    key: "draw",
    value: function draw(force) {
      var gl = this.gl,
          l = this.dText.DanmakuText.length;
      var cW = this.c3d.width,
          left,
          right,
          vW;

      for (var i = 0, t; i < l; i++) {
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
  }, {
    key: "clear",
    value: function clear() {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
  }, {
    key: "deleteTextObject",
    value: function deleteTextObject(t) {
      var gl = this.gl;
      if (t.texture) gl.deleteTexture(t.texture);
    }
  }, {
    key: "resize",
    value: function resize(w, h) {
      var gl = this.gl,
          C = this.c3d;
      C.width = this.dText.width;
      C.height = this.dText.height;
      gl.viewport(0, 0, C.width, C.height);
      gl.uniformMatrix4fv(this.u2dCoord, false, _Mat.default.Identity(4).translate3d(-1, 1, 0).scale3d(2 / C.width, -2 / C.height, 0).array);
    }
  }, {
    key: "enable",
    value: function enable() {
      var _this2 = this;

      this.dText.DanmakuText.forEach(function (t) {
        _this2.newDanmaku(t, false);
      });
      this.dText.useImageBitmap = this.c3d.hidden = false;
      requestAnimationFrame(function () {
        return _this2.draw();
      });
    }
  }, {
    key: "disable",
    value: function disable() {
      this.clear();
      this.c3d.hidden = true;
    }
  }, {
    key: "newDanmaku",
    value: function newDanmaku(t) {
      var async = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var gl = this.gl;
      t.glDanmaku = false;

      if (t._cache.height > this.maxTexSize || t._cache.width > this.maxTexSize) {
        //ignore too large danmaku image
        console.warn('Ignore a danmaku width too large size', t.danmaku);
        return;
      }

      var tex;

      if (!(tex = t.texture)) {
        tex = t.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      }

      if (async) {
        requestIdleCallback(function () {
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, t._cache);
          t.glDanmaku = true;
        });
      } else {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, t._cache);
        t.glDanmaku = true;
      } //vert


      var y = t.style.y - t.estimatePadding;
      t.vertCoord = new Float32Array([0, y, 0, y, 0, y + t._cache.height, 0, y + t._cache.height]);
    }
  }]);

  return Text3d;
}(_textModuleTemplate.default);

var commonTextureCoord = new Float32Array([0.0, 0.0, //↖
1.0, 0.0, //↗
0.0, 1.0, //↙
1.0, 1.0]);
var _default = Text3d;
exports.default = _default;

}).call(this,require("timers").setImmediate)

},{"../lib/Mat/Mat.js":4,"./textModuleTemplate.js":10,"core-js/modules/es6.function.name":111,"core-js/modules/es6.symbol":125,"core-js/modules/es6.typed.float32-array":126,"core-js/modules/es7.symbol.async-iterator":127,"core-js/modules/web.dom.iterable":128,"timers":130}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _textModuleTemplate = _interopRequireDefault(require("./textModuleTemplate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TextCanvas =
/*#__PURE__*/
function (_Template) {
  _inherits(TextCanvas, _Template);

  function TextCanvas(dText) {
    var _this;

    _classCallCheck(this, TextCanvas);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TextCanvas).call(this, dText));
    _this.supported = dText.text2d.supported;
    if (!_this.supported) return _possibleConstructorReturn(_this);
    dText.frame.addStyle(["#".concat(dText.randomText, "_textCanvasContainer canvas{will-change:transform;top:0;left:0;position:absolute;}"), "#".concat(dText.randomText, "_textCanvasContainer.moving canvas{transition:transform 500s linear;}"), "#".concat(dText.randomText, "_textCanvasContainer{will-change:transform;pointer-events:none;overflow:hidden;}")]);
    _this.container = dText.textCanvasContainer = document.createElement('div'); //for text canvas

    _this.container.classList.add("".concat(dText.randomText, "_fullfill"));

    _this.container.id = "".concat(dText.randomText, "_textCanvasContainer");
    dText.container.appendChild(_this.container);
    return _this;
  }

  _createClass(TextCanvas, [{
    key: "_toggle",
    value: function _toggle(s) {
      var _this2 = this;

      var D = this.dText,
          T = D.frame.time;
      this.container.classList[s ? 'add' : 'remove']('moving');

      var _loop = function _loop(i, _t) {
        if ((_t = D.DanmakuText[i]).danmaku.mode >= 2) {
          t = _t;
          return "continue";
        }

        if (s) {
          requestAnimationFrame(function () {
            return _this2._move(_t);
          });
        } else {
          _this2._move(_t, T);
        }

        t = _t;
      };

      for (var i = D.DanmakuText.length, t; i--;) {
        var _ret = _loop(i, t);

        if (_ret === "continue") continue;
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      this._toggle(false);
    }
  }, {
    key: "start",
    value: function start() {
      this._toggle(true);
    }
  }, {
    key: "rate",
    value: function rate() {
      this.resetPos();
    }
  }, {
    key: "_move",
    value: function _move(t, T) {
      if (!t.danmaku) return;
      if (T === undefined) T = this.dText.frame.time + 500000;
      t._cache.style.transform = "translate3d(".concat(((this.dText._calcSideDanmakuPosition(t, T) - t.estimatePadding) * 10 | 0) / 10, "px,").concat(t.style.y - t.estimatePadding, "px,0)");
    }
  }, {
    key: "resetPos",
    value: function resetPos() {
      var _this3 = this;

      this.pause();
      this.dText.paused || requestAnimationFrame(function () {
        return _this3.start();
      });
    }
  }, {
    key: "resize",
    value: function resize() {
      this.resetPos();
    }
  }, {
    key: "remove",
    value: function remove(t) {
      t._cache.parentNode && this.container.removeChild(t._cache);
    }
  }, {
    key: "enable",
    value: function enable() {
      var _this4 = this;

      requestAnimationFrame(function () {
        _this4.dText.DanmakuText.forEach(function (t) {
          return _this4.newDanmaku(t);
        });
      });
      this.container.hidden = false;
    }
  }, {
    key: "disable",
    value: function disable() {
      this.container.hidden = true;
      this.container.innerHTML = '';
    }
  }, {
    key: "newDanmaku",
    value: function newDanmaku(t) {
      var _this5 = this;

      t._cache.style.transform = "translate3d(".concat(t.style.x - t.estimatePadding, "px,").concat(t.style.y - t.estimatePadding, "px,0)");
      this.container.appendChild(t._cache);
      t.danmaku.mode < 2 && !this.dText.paused && requestAnimationFrame(function () {
        return _this5._move(t);
      });
    }
  }]);

  return TextCanvas;
}(_textModuleTemplate.default);

var _default = TextCanvas;
exports.default = _default;

},{"./textModuleTemplate.js":10,"core-js/modules/es6.symbol":125,"core-js/modules/es7.symbol.async-iterator":127,"core-js/modules/web.dom.iterable":128}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
Copyright luojia@luojia.me
LGPL license

*/
var textModuleTemplate =
/*#__PURE__*/
function () {
  function textModuleTemplate(dText) {
    _classCallCheck(this, textModuleTemplate);

    this.dText = dText;
  }

  _createClass(textModuleTemplate, [{
    key: "draw",
    value: function draw() {}
  }, {
    key: "rate",
    value: function rate() {}
  }, {
    key: "pause",
    value: function pause() {}
  }, {
    key: "start",
    value: function start() {}
  }, {
    key: "clear",
    value: function clear() {}
  }, {
    key: "resize",
    value: function resize() {}
  }, {
    key: "remove",
    value: function remove() {}
  }, {
    key: "enable",
    value: function enable() {}
  }, {
    key: "disable",
    value: function disable() {}
  }, {
    key: "newDanmaku",
    value: function newDanmaku() {}
  }, {
    key: "deleteTextObject",
    value: function deleteTextObject() {}
  }]);

  return textModuleTemplate;
}();

var _default = textModuleTemplate;
exports.default = _default;

},{}],11:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],12:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_hide":40,"./_wks":106}],13:[function(require,module,exports){
'use strict';
var at = require('./_string-at')(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};

},{"./_string-at":86}],14:[function(require,module,exports){
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],15:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":49}],16:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
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

},{"./_to-absolute-index":92,"./_to-length":96,"./_to-object":97}],17:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

},{"./_to-absolute-index":92,"./_to-length":96,"./_to-object":97}],18:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
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
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":92,"./_to-iobject":95,"./_to-length":96}],19:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_array-species-create":21,"./_ctx":26,"./_iobject":45,"./_to-length":96,"./_to-object":97}],20:[function(require,module,exports){
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-array":47,"./_is-object":49,"./_wks":106}],21:[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":20}],22:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":23,"./_wks":106}],23:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],24:[function(require,module,exports){
var core = module.exports = { version: '2.6.2' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],25:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":63,"./_property-desc":75}],26:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
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

},{"./_a-function":11}],27:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],28:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":34}],29:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":38,"./_is-object":49}],30:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],31:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-gops":68,"./_object-keys":71,"./_object-pie":72}],32:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":24,"./_ctx":26,"./_global":38,"./_hide":40,"./_redefine":77}],33:[function(require,module,exports){
var MATCH = require('./_wks')('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

},{"./_wks":106}],34:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],35:[function(require,module,exports){
'use strict';
require('./es6.regexp.exec');
var redefine = require('./_redefine');
var hide = require('./_hide');
var fails = require('./_fails');
var defined = require('./_defined');
var wks = require('./_wks');
var regexpExec = require('./_regexp-exec');

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"./_defined":27,"./_fails":34,"./_hide":40,"./_redefine":77,"./_regexp-exec":79,"./_wks":106,"./es6.regexp.exec":116}],36:[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"./_an-object":15}],37:[function(require,module,exports){
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_an-object":15,"./_ctx":26,"./_is-array-iter":46,"./_iter-call":51,"./_to-length":96,"./core.get-iterator-method":107}],38:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],39:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],40:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":28,"./_object-dp":63,"./_property-desc":75}],41:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":38}],42:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":28,"./_dom-create":29,"./_fails":34}],43:[function(require,module,exports){
var isObject = require('./_is-object');
var setPrototypeOf = require('./_set-proto').set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

},{"./_is-object":49,"./_set-proto":80}],44:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],45:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":23}],46:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":56,"./_wks":106}],47:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":23}],48:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object');
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"./_is-object":49}],49:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],50:[function(require,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object');
var cof = require('./_cof');
var MATCH = require('./_wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"./_cof":23,"./_is-object":49,"./_wks":106}],51:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":15}],52:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":40,"./_object-create":62,"./_property-desc":75,"./_set-to-string-tag":82,"./_wks":106}],53:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":32,"./_hide":40,"./_iter-create":52,"./_iterators":56,"./_library":57,"./_object-gpo":69,"./_redefine":77,"./_set-to-string-tag":82,"./_wks":106}],54:[function(require,module,exports){
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":106}],55:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],56:[function(require,module,exports){
module.exports = {};

},{}],57:[function(require,module,exports){
module.exports = false;

},{}],58:[function(require,module,exports){
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_fails":34,"./_has":39,"./_is-object":49,"./_object-dp":63,"./_uid":102}],59:[function(require,module,exports){
var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
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

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_cof":23,"./_global":38,"./_task":91}],60:[function(require,module,exports){
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":11}],61:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_fails":34,"./_iobject":45,"./_object-gops":68,"./_object-keys":71,"./_object-pie":72,"./_to-object":97}],62:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":15,"./_dom-create":29,"./_enum-bug-keys":30,"./_html":41,"./_object-dps":64,"./_shared-key":83}],63:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":15,"./_descriptors":28,"./_ie8-dom-define":42,"./_to-primitive":98}],64:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":15,"./_descriptors":28,"./_object-dp":63,"./_object-keys":71}],65:[function(require,module,exports){
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_descriptors":28,"./_has":39,"./_ie8-dom-define":42,"./_object-pie":72,"./_property-desc":75,"./_to-iobject":95,"./_to-primitive":98}],66:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":67,"./_to-iobject":95}],67:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":30,"./_object-keys-internal":70}],68:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],69:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":39,"./_shared-key":83,"./_to-object":97}],70:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":18,"./_has":39,"./_shared-key":83,"./_to-iobject":95}],71:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":30,"./_object-keys-internal":70}],72:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],73:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],74:[function(require,module,exports){
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":15,"./_is-object":49,"./_new-promise-capability":60}],75:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],76:[function(require,module,exports){
var redefine = require('./_redefine');
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};

},{"./_redefine":77}],77:[function(require,module,exports){
var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_core":24,"./_global":38,"./_has":39,"./_hide":40,"./_uid":102}],78:[function(require,module,exports){
'use strict';

var classof = require('./_classof');
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};

},{"./_classof":22}],79:[function(require,module,exports){
'use strict';

var regexpFlags = require('./_flags');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

},{"./_flags":36}],80:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"./_an-object":15,"./_ctx":26,"./_is-object":49,"./_object-gopd":65}],81:[function(require,module,exports){
'use strict';
var global = require('./_global');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_descriptors":28,"./_global":38,"./_object-dp":63,"./_wks":106}],82:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":39,"./_object-dp":63,"./_wks":106}],83:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":84,"./_uid":102}],84:[function(require,module,exports){
var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":24,"./_global":38,"./_library":57}],85:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_a-function":11,"./_an-object":15,"./_wks":106}],86:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":27,"./_to-integer":94}],87:[function(require,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp');
var defined = require('./_defined');

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

},{"./_defined":27,"./_is-regexp":50}],88:[function(require,module,exports){
'use strict';
var toInteger = require('./_to-integer');
var defined = require('./_defined');

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

},{"./_defined":27,"./_to-integer":94}],89:[function(require,module,exports){
var $export = require('./_export');
var defined = require('./_defined');
var fails = require('./_fails');
var spaces = require('./_string-ws');
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

},{"./_defined":27,"./_export":32,"./_fails":34,"./_string-ws":90}],90:[function(require,module,exports){
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],91:[function(require,module,exports){
var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_cof":23,"./_ctx":26,"./_dom-create":29,"./_global":38,"./_html":41,"./_invoke":44}],92:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":94}],93:[function(require,module,exports){
// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

},{"./_to-integer":94,"./_to-length":96}],94:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],95:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":27,"./_iobject":45}],96:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":94}],97:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":27}],98:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":49}],99:[function(require,module,exports){
'use strict';
if (require('./_descriptors')) {
  var LIBRARY = require('./_library');
  var global = require('./_global');
  var fails = require('./_fails');
  var $export = require('./_export');
  var $typed = require('./_typed');
  var $buffer = require('./_typed-buffer');
  var ctx = require('./_ctx');
  var anInstance = require('./_an-instance');
  var propertyDesc = require('./_property-desc');
  var hide = require('./_hide');
  var redefineAll = require('./_redefine-all');
  var toInteger = require('./_to-integer');
  var toLength = require('./_to-length');
  var toIndex = require('./_to-index');
  var toAbsoluteIndex = require('./_to-absolute-index');
  var toPrimitive = require('./_to-primitive');
  var has = require('./_has');
  var classof = require('./_classof');
  var isObject = require('./_is-object');
  var toObject = require('./_to-object');
  var isArrayIter = require('./_is-array-iter');
  var create = require('./_object-create');
  var getPrototypeOf = require('./_object-gpo');
  var gOPN = require('./_object-gopn').f;
  var getIterFn = require('./core.get-iterator-method');
  var uid = require('./_uid');
  var wks = require('./_wks');
  var createArrayMethod = require('./_array-methods');
  var createArrayIncludes = require('./_array-includes');
  var speciesConstructor = require('./_species-constructor');
  var ArrayIterators = require('./es6.array.iterator');
  var Iterators = require('./_iterators');
  var $iterDetect = require('./_iter-detect');
  var setSpecies = require('./_set-species');
  var arrayFill = require('./_array-fill');
  var arrayCopyWithin = require('./_array-copy-within');
  var $DP = require('./_object-dp');
  var $GOPD = require('./_object-gopd');
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };

},{"./_an-instance":14,"./_array-copy-within":16,"./_array-fill":17,"./_array-includes":18,"./_array-methods":19,"./_classof":22,"./_ctx":26,"./_descriptors":28,"./_export":32,"./_fails":34,"./_global":38,"./_has":39,"./_hide":40,"./_is-array-iter":46,"./_is-object":49,"./_iter-detect":54,"./_iterators":56,"./_library":57,"./_object-create":62,"./_object-dp":63,"./_object-gopd":65,"./_object-gopn":67,"./_object-gpo":69,"./_property-desc":75,"./_redefine-all":76,"./_set-species":81,"./_species-constructor":85,"./_to-absolute-index":92,"./_to-index":93,"./_to-integer":94,"./_to-length":96,"./_to-object":97,"./_to-primitive":98,"./_typed":101,"./_typed-buffer":100,"./_uid":102,"./_wks":106,"./core.get-iterator-method":107,"./es6.array.iterator":110}],100:[function(require,module,exports){
'use strict';
var global = require('./_global');
var DESCRIPTORS = require('./_descriptors');
var LIBRARY = require('./_library');
var $typed = require('./_typed');
var hide = require('./_hide');
var redefineAll = require('./_redefine-all');
var fails = require('./_fails');
var anInstance = require('./_an-instance');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var toIndex = require('./_to-index');
var gOPN = require('./_object-gopn').f;
var dP = require('./_object-dp').f;
var arrayFill = require('./_array-fill');
var setToStringTag = require('./_set-to-string-tag');
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

},{"./_an-instance":14,"./_array-fill":17,"./_descriptors":28,"./_fails":34,"./_global":38,"./_hide":40,"./_library":57,"./_object-dp":63,"./_object-gopn":67,"./_redefine-all":76,"./_set-to-string-tag":82,"./_to-index":93,"./_to-integer":94,"./_to-length":96,"./_typed":101}],101:[function(require,module,exports){
var global = require('./_global');
var hide = require('./_hide');
var uid = require('./_uid');
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

},{"./_global":38,"./_hide":40,"./_uid":102}],102:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],103:[function(require,module,exports){
var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":38}],104:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_core":24,"./_global":38,"./_library":57,"./_object-dp":63,"./_wks-ext":105}],105:[function(require,module,exports){
exports.f = require('./_wks');

},{"./_wks":106}],106:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":38,"./_shared":84,"./_uid":102}],107:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":22,"./_core":24,"./_iterators":56,"./_wks":106}],108:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { fill: require('./_array-fill') });

require('./_add-to-unscopables')('fill');

},{"./_add-to-unscopables":12,"./_array-fill":17,"./_export":32}],109:[function(require,module,exports){
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":25,"./_ctx":26,"./_export":32,"./_is-array-iter":46,"./_iter-call":51,"./_iter-detect":54,"./_to-length":96,"./_to-object":97,"./core.get-iterator-method":107}],110:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":12,"./_iter-define":53,"./_iter-step":55,"./_iterators":56,"./_to-iobject":95}],111:[function(require,module,exports){
var dP = require('./_object-dp').f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

},{"./_descriptors":28,"./_object-dp":63}],112:[function(require,module,exports){
'use strict';
var global = require('./_global');
var has = require('./_has');
var cof = require('./_cof');
var inheritIfRequired = require('./_inherit-if-required');
var toPrimitive = require('./_to-primitive');
var fails = require('./_fails');
var gOPN = require('./_object-gopn').f;
var gOPD = require('./_object-gopd').f;
var dP = require('./_object-dp').f;
var $trim = require('./_string-trim').trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(require('./_object-create')(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = require('./_descriptors') ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}

},{"./_cof":23,"./_descriptors":28,"./_fails":34,"./_global":38,"./_has":39,"./_inherit-if-required":43,"./_object-create":62,"./_object-dp":63,"./_object-gopd":65,"./_object-gopn":67,"./_redefine":77,"./_string-trim":89,"./_to-primitive":98}],113:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', { isInteger: require('./_is-integer') });

},{"./_export":32,"./_is-integer":48}],114:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":32,"./_object-assign":61}],115:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var userAgent = require('./_user-agent');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
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
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_a-function":11,"./_an-instance":14,"./_classof":22,"./_core":24,"./_ctx":26,"./_export":32,"./_for-of":37,"./_global":38,"./_is-object":49,"./_iter-detect":54,"./_library":57,"./_microtask":59,"./_new-promise-capability":60,"./_perform":73,"./_promise-resolve":74,"./_redefine-all":76,"./_set-species":81,"./_set-to-string-tag":82,"./_species-constructor":85,"./_task":91,"./_user-agent":103,"./_wks":106}],116:[function(require,module,exports){
'use strict';
var regexpExec = require('./_regexp-exec');
require('./_export')({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});

},{"./_export":32,"./_regexp-exec":79}],117:[function(require,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
if (require('./_descriptors') && /./g.flags != 'g') require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});

},{"./_descriptors":28,"./_flags":36,"./_object-dp":63}],118:[function(require,module,exports){
'use strict';

var anObject = require('./_an-object');
var toLength = require('./_to-length');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');

// @@match logic
require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

},{"./_advance-string-index":13,"./_an-object":15,"./_fix-re-wks":35,"./_regexp-exec-abstract":78,"./_to-length":96}],119:[function(require,module,exports){
'use strict';

var anObject = require('./_an-object');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

},{"./_advance-string-index":13,"./_an-object":15,"./_fix-re-wks":35,"./_regexp-exec-abstract":78,"./_to-integer":94,"./_to-length":96,"./_to-object":97}],120:[function(require,module,exports){
'use strict';

var isRegExp = require('./_is-regexp');
var anObject = require('./_an-object');
var speciesConstructor = require('./_species-constructor');
var advanceStringIndex = require('./_advance-string-index');
var toLength = require('./_to-length');
var callRegExpExec = require('./_regexp-exec-abstract');
var regexpExec = require('./_regexp-exec');
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';

// eslint-disable-next-line no-empty
var SUPPORTS_Y = !!(function () { try { return new RegExp('x', 'y'); } catch (e) {} })();

// @@split logic
require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? 0xffffffff : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});

},{"./_advance-string-index":13,"./_an-object":15,"./_fix-re-wks":35,"./_is-regexp":50,"./_regexp-exec":79,"./_regexp-exec-abstract":78,"./_species-constructor":85,"./_to-length":96}],121:[function(require,module,exports){
'use strict';
require('./es6.regexp.flags');
var anObject = require('./_an-object');
var $flags = require('./_flags');
var DESCRIPTORS = require('./_descriptors');
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (require('./_fails')(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

},{"./_an-object":15,"./_descriptors":28,"./_fails":34,"./_flags":36,"./_redefine":77,"./es6.regexp.flags":117}],122:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":53,"./_string-at":86}],123:[function(require,module,exports){
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});

},{"./_export":32,"./_string-repeat":88}],124:[function(require,module,exports){
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"./_export":32,"./_fails-is-regexp":33,"./_string-context":87,"./_to-length":96}],125:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_an-object":15,"./_descriptors":28,"./_enum-keys":31,"./_export":32,"./_fails":34,"./_global":38,"./_has":39,"./_hide":40,"./_is-array":47,"./_is-object":49,"./_library":57,"./_meta":58,"./_object-create":62,"./_object-dp":63,"./_object-gopd":65,"./_object-gopn":67,"./_object-gopn-ext":66,"./_object-gops":68,"./_object-keys":71,"./_object-pie":72,"./_property-desc":75,"./_redefine":77,"./_set-to-string-tag":82,"./_shared":84,"./_to-iobject":95,"./_to-primitive":98,"./_uid":102,"./_wks":106,"./_wks-define":104,"./_wks-ext":105}],126:[function(require,module,exports){
require('./_typed-array')('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":99}],127:[function(require,module,exports){
require('./_wks-define')('asyncIterator');

},{"./_wks-define":104}],128:[function(require,module,exports){
var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./_global":38,"./_hide":40,"./_iterators":56,"./_object-keys":71,"./_redefine":77,"./_wks":106,"./es6.array.iterator":110}],129:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],130:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)

},{"process/browser.js":129,"timers":130}],131:[function(require,module,exports){
(function (setImmediate){
/*
Copyright luojia@luojia.me
LGPL license
*/
'use strict';

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.string.repeat");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.is-integer");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.object.assign");

var _i18n = require("./i18n.js");

var _Object2HTML = _interopRequireDefault(require("../lib/Object2HTML/Object2HTML.js"));

var _NyaPCore = require("./NyaPCore.js");

var _ResizeSensor = _interopRequireDefault(require("../lib/danmaku-frame/lib/ResizeSensor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var _ = _i18n.i18n._; //NyaP options

var NyaPOptions = {
  autoHideDanmakuInput: true,
  //hide danmakuinput after danmaku sending
  danmakuColors: ['fff', '6cf', 'ff0', 'f00', '0f0', '00f', 'f0f', '000'],
  //colors in the danmaku style pannel
  danmakuModes: [0, 3, 2, 1],
  //0:right	1:left	2:bottom	3:top
  danmakuSizes: [20, 24, 36] //normal player

};

var NyaP =
/*#__PURE__*/
function (_NyaPlayerCore) {
  _inherits(NyaP, _NyaPlayerCore);

  function NyaP(opt) {
    var _this;

    _classCallCheck(this, NyaP);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NyaP).call(this, Object.assign({}, NyaPOptions, opt)));
    opt = _this.opt;

    var NP = _assertThisInitialized(_assertThisInitialized(_this)),
        $ = _this.$,
        video = _this.video;

    var icons = _this.icons = {
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
    };
    Object.assign(icons, opt.icons);

    function icon(name, event) {
      var attr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var ico = icons[name];
      return (0, _Object2HTML.default)({
        _: 'span',
        event: event,
        attr: attr,
        prop: {
          id: "icon_span_".concat(name),
          innerHTML: "<svg height=".concat(ico[1], " width=").concat(ico[0], " id=\"icon_").concat(name, "\"\">").concat(ico[2], "</svg>")
        }
      });
    }

    var _licp = NP.loadingInfo(_('Creating player'), true);

    NP._.player = (0, _Object2HTML.default)({
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
              click: function click(e) {
                return NP.playToggle();
              }
            }, {
              title: _('play')
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
                      placeholder: _('hex color'),
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
                  placeholder: _('Input danmaku here')
                }
              }, {
                _: 'span',
                prop: {
                  id: 'danmaku_submit',
                  innerHTML: _('Send')
                }
              }]
            }]
          }, {
            _: 'span',
            attr: {
              id: 'control_right'
            },
            child: [icon('addDanmaku', {
              click: function click(e) {
                return NP.danmakuInput();
              }
            }, {
              title: _('danmaku input(Enter)')
            }), icon('danmakuToggle', {
              click: function click(e) {
                return NP.Danmaku.toggle();
              }
            }, {
              title: _('danmaku toggle(D)'),
              class: 'active_icon'
            }), icon('volume', {}, {
              title: "".concat(_('volume'), ":(").concat(video.muted ? _('muted') : (video.volume * 100 | 0) + '%', ")([shift]+\u2191\u2193)(").concat(_('wheeling'), ")")
            }), icon('loop', {
              click: function click(e) {
                video.loop = !video.loop;
              }
            }, {
              title: _('loop') + '(L)'
            }), {
              _: 'span',
              prop: {
                id: 'player_mode'
              },
              child: [icon('fullScreen', {
                click: function click(e) {
                  return NP.playerMode('fullScreen');
                }
              }, {
                title: _('full screen(F)')
              }), icon('fullPage', {
                click: function click(e) {
                  return NP.playerMode('fullPage');
                }
              }, {
                title: _('full page(P)')
              })]
            }]
          }]
        }]
      }]
    }); //msg box

    NP.videoFrame.appendChild((0, _Object2HTML.default)({
      _: 'div',
      attr: {
        id: 'msg_box'
      }
    })); //add elements with id to $ prop

    NP.collectEles(NP._.player);
    Object.assign(NP._, {
      volumeBox: new MsgBox('', 'info', $.msg_box)
    });

    if (_this._danmakuEnabled) {
      //danmaku sizes
      opt.danmakuSizes && opt.danmakuSizes.forEach(function (s, ind) {
        var e = (0, _Object2HTML.default)({
          _: 'span',
          attr: {
            style: "font-size:".concat(12 + ind * 3, "px;"),
            title: s
          },
          prop: {
            size: s
          },
          child: ['A']
        });
        $.danmaku_size_box.appendChild(e);
      }); //danmaku colors

      opt.danmakuColors && opt.danmakuColors.forEach(function (c) {
        var e = (0, _Object2HTML.default)({
          _: 'span',
          attr: {
            style: "background-color:#".concat(c, ";"),
            title: c
          },
          prop: {
            color: c
          }
        });
        $.danmaku_color_box.appendChild(e);
      }); //danmaku modes

      opt.danmakuModes && opt.danmakuModes.forEach(function (m) {
        $.danmaku_mode_box.appendChild(icon("danmakuMode".concat(m)));
      });
      NP.collectEles($.danmaku_mode_box);
    } else {
      for (var i in $) {
        if (i.match(/danmaku/i)) {
          $[i].parentNode.removeChild($[i]);
        }
      }
    } //progress


    setTimeout(function () {
      //ResizeSensor
      $.control.ResizeSensor = new _ResizeSensor.default($.control, function () {
        return NP.refreshProgress();
      });
      NP.refreshProgress();
    }, 0);
    NP._.progressContext = $.progress.getContext('2d'); //events

    var events = {
      NyaP: {
        keydown: function keydown(e) {
          return NP._playerKeyHandle(e);
        },
        mousemove: function mousemove(e) {
          _this._userActiveWatcher(true);
        }
      },
      document: {
        'fullscreenchange,mozfullscreenchange,webkitfullscreenchange,msfullscreenchange': function fullscreenchangeMozfullscreenchangeWebkitfullscreenchangeMsfullscreenchange(e) {
          if (NP._.playerMode == 'fullScreen' && !_this.isFullscreen()) NP.playerMode('normal');
        }
      },
      main_video: {
        playing: function playing(e) {
          return NP._iconActive('play', true);
        },
        'pause,stalled': function pauseStalled(e) {
          NP._iconActive('play', false);
        },
        timeupdate: function timeupdate(e) {
          if (Date.now() - NP._.lastTimeUpdate < 30) return;

          NP._setTimeInfo((0, _NyaPCore.formatTime)(video.currentTime, video.duration));

          NP.drawProgress();
          NP._.lastTimeUpdate = Date.now();
        },
        loadedmetadata: function loadedmetadata(e) {
          NP._setTimeInfo(null, (0, _NyaPCore.formatTime)(video.duration, video.duration));
        },
        volumechange: function volumechange(e) {
          NP._.volumeBox.renew("".concat(_('volume'), ":").concat((video.volume * 100).toFixed(0), "%") + "".concat(video.muted ? '(' + _('muted') + ')' : ''), 3000);

          (0, _NyaPCore.setAttrs)($.volume_circle, {
            'stroke-dasharray': "".concat(video.volume * 12 * Math.PI, " 90"),
            style: "fill-opacity:".concat(video.muted ? .2 : .6, "!important")
          });
          $.icon_span_volume.setAttribute('title', "".concat(_('volume'), ":(").concat(video.muted ? _('muted') : (video.volume * 100 | 0) + '%', ")([shift]+\u2191\u2193)(").concat(_('wheeling'), ")"));
        },
        progress: function progress(e) {
          return NP.drawProgress();
        },
        _loopChange: function _loopChange(e) {
          return NP._iconActive('loop', e.value);
        },
        click: function click(e) {
          return NP.playToggle();
        },
        contextmenu: function contextmenu(e) {
          return e.preventDefault();
        },
        error: function error(e) {
          NP.msg("\u89C6\u9891\u52A0\u8F7D\u9519\u8BEF:".concat(e.message), 'error');

          _this.log('video error', 'error', e);
        }
      },
      danmaku_container: {
        click: function click(e) {
          return NP.playToggle();
        },
        contextmenu: function contextmenu(e) {
          return e.preventDefault();
        }
      },
      progress: {
        'mousemove,click': function mousemoveClick(e) {
          var t = e.target,
              pre = (0, _NyaPCore.limitIn)((e.offsetX - t.pad) / (t.offsetWidth - 2 * t.pad), 0, 1);

          if (e.type === 'mousemove') {
            NP._.progressX = e.offsetX;
            NP.drawProgress();

            NP._setTimeInfo(null, (0, _NyaPCore.formatTime)(pre * video.duration, video.duration));
          } else if (e.type === 'click') {
            video.currentTime = pre * video.duration;
          }
        },
        mouseout: function mouseout(e) {
          NP._.progressX = undefined;
          NP.drawProgress();

          NP._setTimeInfo(null, (0, _NyaPCore.formatTime)(video.duration, video.duration));
        }
      },
      danmaku_style_pannel: {
        click: function click(e) {
          if (e.target.tagName !== 'INPUT') setImmediate(function (a) {
            return NP.$.danmaku_input.focus();
          });
        }
      },
      danmaku_color: {
        'input,change': function inputChange(e) {
          var i = e.target,
              c = NP.Danmaku.isVaildColor(i.value);

          if (c) {
            //match valid hex color code
            i.style.backgroundColor = "#".concat(c);
            NP._.danmakuColor = c;
          } else {
            NP._.danmakuColor = undefined;
            c = NP.Danmaku.isVaildColor(NP.opt.defaultDanmakuColor);
            i.style.backgroundColor = c ? "#".concat(c) : '';
          }
        }
      },
      icon_span_volume: {
        click: function click(e) {
          return video.muted = !video.muted;
        },
        wheel: function wheel(e) {
          e.preventDefault();
          if (e.deltaMode !== 0) return;
          var delta;
          if (e.deltaY > 10 || e.deltaY < -10) delta = -e.deltaY / 10;else {
            delta = e.deltaY;
          }
          if (e.shiftKey) delta = delta > 0 ? 10 : -10;
          video.volume = (0, _NyaPCore.limitIn)(video.volume + delta / 100, 0, 1);
        }
      },
      danmaku_input: {
        keydown: function keydown(e) {
          if (e.key === 'Enter') {
            NP.send();
          } else if (e.key === 'Escape') {
            NP.danmakuInput(false);
          }
        }
      },
      danmaku_submit: {
        click: function click(e) {
          return NP.send();
        }
      },
      danmaku_mode_box: {
        click: function click(e) {
          var t = e.target;

          if (t.id.startsWith('icon_span_danmakuMode')) {
            var m = 1 * t.id.match(/\d$/)[0];
            if (NP._.danmakuMode !== undefined) $["icon_span_danmakuMode".concat(NP._.danmakuMode)].classList.remove('active');
            $["icon_span_danmakuMode".concat(m)].classList.add('active');
            NP._.danmakuMode = m;
          }
        }
      },
      danmaku_size_box: {
        click: function click(e) {
          var t = e.target;
          if (!t.size) return;
          (0, _NyaPCore.toArray)($.danmaku_size_box.childNodes).forEach(function (sp) {
            if (NP._.danmakuSize === sp.size) sp.classList.remove('active');
          });
          t.classList.add('active');
          NP._.danmakuSize = t.size;
        }
      },
      danmaku_color_box: {
        click: function click(e) {
          if (e.target.color) {
            $.danmaku_color.value = e.target.color;
            $.danmaku_color.dispatchEvent(new Event('change'));
          }
        }
      },
      NP: {
        danmakuFrameToggle: function danmakuFrameToggle(bool) {
          return NP._iconActive('danmakuToggle', bool);
        },
        //listen danmakuToggle event to change button style
        playerModeChange: function playerModeChange(mode) {
          ['fullPage', 'fullScreen'].forEach(function (m) {
            NP._iconActive(m, mode === m);
          });
        }
      }
    };

    for (var eleid in $) {
      //add events to elements
      var eves = events[eleid];
      eves && (0, _NyaPCore.addEvents)($[eleid], eves);
    }

    if (NP._danmakuEnabled) {
      Number.isInteger(opt.defaultDanmakuMode) && $['icon_span_danmakuMode' + opt.defaultDanmakuMode].click(); //init to default danmaku mode

      typeof opt.defaultDanmakuSize === 'number' && (0, _NyaPCore.toArray)($.danmaku_size_box.childNodes).forEach(function (sp) {
        if (sp.size === opt.defaultDanmakuSize) sp.click();
      });
    }

    if (opt.playerFrame instanceof HTMLElement) opt.playerFrame.appendChild(NP.player);

    _licp.append(_this.opt.loadingInfo.doneText);

    return _this;
  }

  _createClass(NyaP, [{
    key: "_userActiveWatcher",
    value: function _userActiveWatcher() {
      var _this2 = this;

      var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var delay = 5000,
          t = Date.now();

      if (active) {
        this.stats.lastUserActive = t;

        if (this.stats.userInactive) {
          this.stats.userInactive = false;
          this.player.classList.remove('user-inactive');
        }
      }

      if (this.stats.userActiveTimer) return;
      this.stats.userActiveTimer = setTimeout(function () {
        _this2.stats.userActiveTimer = 0;
        var now = Date.now();

        if (now - _this2.stats.lastUserActive < delay) {
          _this2._userActiveWatcher();
        } else {
          _this2.player.classList.add('user-inactive');

          _this2.stats.userInactive = true;
        }
      }, delay - t + this.stats.lastUserActive);
    }
  }, {
    key: "_iconActive",
    value: function _iconActive(name, bool) {
      this.$["icon_span_".concat(name)].classList[bool ? 'add' : 'remove']('active_icon');
    }
  }, {
    key: "_setTimeInfo",
    value: function _setTimeInfo() {
      var _this3 = this;

      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      requestAnimationFrame(function () {
        if (a !== null) {
          _this3.$.current_time.innerHTML = a;
        }

        if (b !== null) {
          _this3.$.total_time.innerHTML = b;
        }
      });
    }
  }, {
    key: "_playerKeyHandle",
    value: function _playerKeyHandle(e) {
      //hot keys
      if (e.target.tagName === 'INPUT') return;
      var V = this.video,
          _SH = e.shiftKey,
          _RE = e.repeat; //to prevent default,use break.otherwise,use return.

      switch (e.key) {
        case ' ':
          {
            if (_RE) return;
            this.playToggle();
            break;
          }

        case 'ArrowRight':
          {
            //seek to after time
            V.currentTime += 3 * (_SH ? 2 : 1);
            break;
          }

        case 'ArrowLeft':
          {
            //seek to before time
            V.currentTime -= 1.5 * (_SH ? 2 : 1);
            break;
          }

        case 'ArrowUp':
          {
            //volume up
            V.volume = (0, _NyaPCore.limitIn)(V.volume + 0.03 * (_SH ? 2 : 1), 0, 1);
            break;
          }

        case 'ArrowDown':
          {
            //volume down
            V.volume = (0, _NyaPCore.limitIn)(V.volume - 0.03 * (_SH ? 2 : 1), 0, 1);
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
            if (this._.playerMode === 'fullPage') {
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
  }, {
    key: "danmakuInput",
    value: function danmakuInput() {
      var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !this.$.danmaku_input_frame.offsetHeight;
      var $ = this.$;
      $.danmaku_input_frame.style.display = bool ? 'flex' : '';

      this._iconActive('addDanmaku', bool);

      setImmediate(function () {
        bool ? $.danmaku_input.focus() : $.NyaP.focus();
      });
    }
  }, {
    key: "refreshProgress",
    value: function refreshProgress() {
      var c = this.$.progress;
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
      this.drawProgress();
      this.emit('progressRefresh');
    }
  }, {
    key: "send",
    value: function send() {
      var _this4 = this;

      var color = this._.danmakuColor || this.opt.defaultDanmakuColor,
          text = this.$.danmaku_input.value,
          size = this._.danmakuSize,
          mode = this._.danmakuMode,
          time = this.danmakuFrame.time,
          d = {
        color: color,
        text: text,
        size: size,
        mode: mode,
        time: time
      };
      var S = this.Danmaku.send(d, function (danmaku) {
        if (danmaku && danmaku._ === 'text') _this4.$.danmaku_input.value = '';
        danmaku.highlight = true;

        _this4.danmakuFrame.load(danmaku, true);

        if (_this4.opt.autoHideDanmakuInput) {
          _this4.danmakuInput(false);
        }
      });

      if (!S) {
        this.danmakuInput(false);
        return;
      }
    }
  }, {
    key: "_progressDrawer",
    value: function _progressDrawer() {
      var ctx = this._.progressContext,
          c = this.$.progress,
          w = c.width,
          h = c.height,
          v = this.video,
          d = v.duration,
          cT = v.currentTime,
          pad = c.pad,
          len = w - 2 * pad;
      var i;
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
      var tr = v.buffered;

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
        ctx.lineTo((0, _NyaPCore.limitIn)(this._.progressX, pad, pad + len), 15);
        ctx.stroke();
      }

      this._.drawingProgress = false;
    }
  }, {
    key: "drawProgress",
    value: function drawProgress() {
      var _this5 = this;

      if (this._.drawingProgress) return;
      this._.drawingProgress = true;
      requestAnimationFrame(function () {
        return _this5._progressDrawer();
      });
    }
  }, {
    key: "msg",
    value: function msg(text) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'tip';
      //type:tip|info|error
      var msg = new MsgBox(text, type, this.$.msg_box);
      requestAnimationFrame(function () {
        return msg.show();
      });
    }
  }]);

  return NyaP;
}(_NyaPCore.NyaPlayerCore);

var MsgBox =
/*#__PURE__*/
function () {
  function MsgBox(text, type, parentNode) {
    var _this6 = this;

    _classCallCheck(this, MsgBox);

    this.using = false;
    var msg = this.msg = (0, _Object2HTML.default)({
      _: 'div',
      attr: {
        class: "msg_type_".concat(type)
      }
    });
    msg.addEventListener('click', function () {
      return _this6.remove();
    });
    this.parentNode = parentNode;
    this.setText(text);
  }

  _createClass(MsgBox, [{
    key: "setTimeout",
    value: function (_setTimeout) {
      function setTimeout(_x) {
        return _setTimeout.apply(this, arguments);
      }

      setTimeout.toString = function () {
        return _setTimeout.toString();
      };

      return setTimeout;
    }(function (time) {
      var _this7 = this;

      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        return _this7.remove();
      }, time || Math.max((this.texts ? this.texts.length : 0) * 0.6 * 1000, 5000));
    })
  }, {
    key: "setText",
    value: function setText(text) {
      this.msg.innerHTML = '';
      var e = (0, _Object2HTML.default)(text);
      e && this.msg.appendChild(e);
      if (text instanceof HTMLElement) text = text.textContent;
      var texts = String(text).match(/\w+|\S/g);
      this.text = text;
      this.texts = texts;
    }
  }, {
    key: "renew",
    value: function renew(text, time) {
      this.setText(text);
      this.setTimeout(time);
      if (!this.using) this.show();
    }
  }, {
    key: "show",
    value: function show() {
      var _this8 = this;

      if (this.using) return;
      this.msg.style.opacity = 0;

      if (this.parentNode && this.parentNode !== this.msg.parentNode) {
        this.parentNode.appendChild(this.msg);
      }

      this.msg.parentNode && setTimeout(function () {
        _this8.using = true;
        _this8.msg.style.opacity = 1;
      }, 0);
      this.setTimeout();
    }
  }, {
    key: "remove",
    value: function remove() {
      var _this9 = this;

      if (!this.using) return;
      this.using = false;
      this.msg.style.opacity = 0;

      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = 0;
      }

      setTimeout(function () {
        _this9.msg.parentNode && _this9.msg.parentNode.removeChild(_this9.msg);
      }, 600);
    }
  }]);

  return MsgBox;
}();

window.NyaP = NyaP;

}).call(this,require("timers").setImmediate)

},{"../lib/Object2HTML/Object2HTML.js":1,"../lib/danmaku-frame/lib/ResizeSensor.js":2,"./NyaPCore.js":132,"./i18n.js":134,"core-js/modules/es6.function.name":111,"core-js/modules/es6.number.constructor":112,"core-js/modules/es6.number.is-integer":113,"core-js/modules/es6.object.assign":114,"core-js/modules/es6.regexp.match":118,"core-js/modules/es6.regexp.to-string":121,"core-js/modules/es6.string.repeat":123,"core-js/modules/es6.string.starts-with":124,"core-js/modules/es6.symbol":125,"core-js/modules/es7.symbol.async-iterator":127,"core-js/modules/web.dom.iterable":128,"timers":130}],132:[function(require,module,exports){
/*
Copyright luojia@luojia.me
LGPL license
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEvents = addEvents;
exports.requestFullscreen = requestFullscreen;
exports.exitFullscreen = exitFullscreen;
exports.isFullscreen = isFullscreen;
exports.formatTime = formatTime;
exports.rand = rand;
exports.padTime = padTime;
exports.setAttrs = setAttrs;
exports.limitIn = limitIn;
exports.toArray = toArray;
exports.NyaPlayerCore = exports.default = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.is-integer");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _i18n = require("./i18n.js");

var _danmaku = _interopRequireDefault(require("./danmaku.js"));

var _Object2HTML = _interopRequireDefault(require("../lib/Object2HTML/Object2HTML.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _ = _i18n.i18n._; //default options

var NyaPCoreOptions = {
  //for video
  muted: false,
  volume: 1,
  loop: false,
  //for danmaku
  enableDanmaku: true,
  danmakuModule: ['TextDanmaku'],
  danmakuModuleArg: {
    TextDanmaku: {
      defaultStyle: {},
      options: {}
    }
  },
  loadingInfo: {
    doneText: 'ok',
    contentSpliter: '...'
  },
  //for sending danmaku
  defaultDanmakuColor: null,
  //a hex color(without #),when the color inputed is invalid,this color will be applied
  defaultDanmakuMode: 0,
  //right
  defaultDanmakuSize: 24,
  danmakuSend: function danmakuSend(d, callback) {
    callback(false);
  },
  //the func for sending danmaku
  //for player
  source: function source(name, address, callback) {
    return callback(name, address);
  }
};

var NyaPEventEmitter =
/*#__PURE__*/
function () {
  function NyaPEventEmitter() {
    _classCallCheck(this, NyaPEventEmitter);

    this._events = {};
  }

  _createClass(NyaPEventEmitter, [{
    key: "emit",
    value: function emit(e) {
      for (var _len = arguments.length, arg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        arg[_key - 1] = arguments[_key];
      }

      this._resolve.apply(this, [e].concat(arg));

      this.globalHandle.apply(this, [e].concat(arg));
    }
  }, {
    key: "_resolve",
    value: function _resolve(e) {
      if (e in this._events) {
        var hs = this._events[e];

        try {
          for (var _len2 = arguments.length, arg = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            arg[_key2 - 1] = arguments[_key2];
          }

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = hs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var h = _step.value;
              if (h.apply(this, arg) === false) return;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        } catch (e) {
          this.log('', 'error', e);
        }
      }
    }
  }, {
    key: "addEventListener",
    value: function addEventListener() {
      this.on.apply(this, arguments);
    }
  }, {
    key: "on",
    value: function on(e, handle) {
      var top = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (!(handle instanceof Function)) return;
      if (!(e in this._events)) this._events[e] = [];
      if (top) this._events[e].unshift(handle);else this._events[e].push(handle);
    }
  }, {
    key: "removeEvent",
    value: function removeEvent(e, handle) {
      if (!(e in this._events)) return;

      if (arguments.length === 1) {
        delete this._events[e];
        return;
      }

      var ind;
      if (ind = this._events[e].indexOf(handle) >= 0) this._events[e].splice(ind, 1);
      if (this._events[e].length === 0) delete this._events[e];
    }
  }, {
    key: "globalHandle",
    value: function globalHandle(name) {} //所有事件会触发这个函数

  }, {
    key: "log",
    value: function log() {}
  }]);

  return NyaPEventEmitter;
}();

var NyaPlayerCore =
/*#__PURE__*/
function (_NyaPEventEmitter) {
  _inherits(NyaPlayerCore, _NyaPEventEmitter);

  function NyaPlayerCore(opt) {
    var _this;

    _classCallCheck(this, NyaPlayerCore);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NyaPlayerCore).call(this));

    _this.log('%c https://dev.tencent.com/u/luojia/p/NyaP/git ', 'log', "background:#6f8fa2;color:#ccc;padding:.3em");

    _this.log('Language:' + _i18n.i18n.lang, 'debug');

    opt = _this.opt = Object.assign({}, NyaPCoreOptions, opt);
    var $ = _this.$ = {
      document: document,
      window: window,
      NP: _assertThisInitialized(_assertThisInitialized(_this))
    }; //for save elements that has an id

    _this.plugins = {};
    _this.stats = {};
    _this.i18n = _i18n.i18n;
    _this._ = {
      //for private variables
      video: (0, _Object2HTML.default)({
        _: 'video',
        attr: {
          id: 'main_video'
        }
      }),
      playerMode: 'normal'
    };
    _this.videoFrame = (0, _Object2HTML.default)({
      _: 'div',
      attr: {
        id: 'video_frame'
      },
      child: [_this.video, //this.container,
      {
        _: 'div',
        attr: {
          id: 'loading_frame'
        },
        child: [{
          _: 'div',
          attr: {
            id: 'loading_anime'
          },
          child: ['(๑•́ ω •̀๑)']
        }, {
          _: 'div',
          attr: {
            id: 'loading_info'
          }
        }]
      }]
    });

    _this.collectEles(_this.videoFrame);

    var _lilc = _this.loadingInfo(_('Loading core'), true);

    if (_this._danmakuEnabled) {
      _this.danmakuContainer = (0, _Object2HTML.default)({
        _: 'div',
        prop: {
          id: 'danmaku_container'
        }
      });

      var _lildf = _this.loadingInfo(_('Loading danmaku frame'), true);

      _this.Danmaku = new _danmaku.default(_assertThisInitialized(_assertThisInitialized(_this)));

      _this.videoFrame.insertBefore(_this.danmakuContainer, $.loading_frame);

      _this.collectEles(_this.danmakuContainer);

      _lildf.append(_this.opt.loadingInfo.doneText);
    }

    _this._.loadingAnimeInterval = setInterval(function () {
      $.loading_anime.style.transform = "translate(" + rand(-20, 20) + "px," + rand(-20, 20) + "px) rotate(" + rand(-10, 10) + "deg)";
    }, 80); //options

    setTimeout(function (a) {
      ['muted', 'volume', 'loop'].forEach(function (o) {
        //dont change the order
        opt[o] !== undefined && (_this.video[o] = opt[o]);
      });
    }, 0); //define events

    {
      //video:_loopChange
      var LoopDesc = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'loop');
      Object.defineProperty(_this.video, 'loop', {
        get: LoopDesc.get,
        set: function set(bool) {
          if (bool === this.loop) return;
          this.dispatchEvent(Object.assign(new Event('_loopChange'), {
            value: bool
          }));
          LoopDesc.set.call(this, bool);
        }
      });
    }
    addEvents(_this.video, {
      loadedmetadata: function loadedmetadata(e) {
        clearInterval(_this._.loadingAnimeInterval);
        if ($.loading_frame.parentNode) //remove loading animation
          $.loading_frame.parentNode.removeChild($.loading_frame);
      },
      error: function error(e) {
        clearInterval(_this._.loadingAnimeInterval);
        loading_anime.style.transform = "";
        loading_anime.innerHTML = '(๑• . •๑)';
      }
    }); //define default video src handle

    _this.on('setVideoSrc', function (src) {
      _this.video.src = src;
      return false; //stop the event
    });

    if (opt.src) _this.src = opt.src;

    _this.on('coreLoad', function () {
      _this.stats.coreLoaded = true;

      _lilc.append(_this.opt.loadingInfo.doneText); //this.loadingInfo(_('Core loaded'));

    });

    if (Array.isArray(opt.plugins)) {
      //load plugins,opt.plugins is a list of url for plugins
      var _lilp = _this.loadingInfo(_('Loading plugin'), true);

      var pluginList = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = opt.plugins[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var url = _step2.value;
          pluginList.push(_this.loadPlugin(url));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      Promise.all(pluginList).then(function () {
        _lilp.append(_this.opt.loadingInfo.doneText);

        _this.emit('coreLoad');
      }).catch(function (e) {
        _this.log('', 'error', e);

        _this.emit('coreLoadingError', e);
      });
      return _possibleConstructorReturn(_this);
    }

    _this.emit('coreLoad');

    return _this;
  }

  _createClass(NyaPlayerCore, [{
    key: "playToggle",
    value: function playToggle() {
      var Switch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.video.paused;
      this.video[Switch ? 'play' : 'pause']();
    }
  }, {
    key: "loadingInfo",
    value: function loadingInfo(text) {
      var spliter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var d = (0, _Object2HTML.default)({
        _: 'div',
        child: [text]
      });
      if (spliter) d.append(this.opt.loadingInfo.contentSpliter);
      this.$.loading_info.appendChild(d);
      return d;
    }
  }, {
    key: "collectEles",
    value: function collectEles(ele) {
      var $ = this.$;
      if (ele.id && !$[ele.id]) $[ele.id] = ele;
      toArray(ele.querySelectorAll('*')).forEach(function (e) {
        if (e.id && !$[e.id]) $[e.id] = e;
      });
    }
  }, {
    key: "playerMode",
    value: function playerMode() {
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'normal';
      if (mode === 'normal' && this._.playerMode === mode) return;

      if (this._.playerMode === 'fullPage') {
        this.player.style.position = '';
      } else if (this._.playerMode === 'fullScreen') {
        exitFullscreen();
      }

      if (mode !== 'normal' && this._.playerMode === mode) mode = 'normal'; //back to normal mode

      switch (mode) {
        case 'fullPage':
          {
            this.player.style.position = 'fixed';
            this.player.setAttribute('playerMode', 'fullPage');
            break;
          }

        case 'fullScreen':
          {
            this.player.setAttribute('playerMode', 'fullScreen');
            requestFullscreen(this.player);
            break;
          }

        default:
          {
            this.player.setAttribute('playerMode', 'normal');
          }
      }

      this._.playerMode = mode;
      this.emit('playerModeChange', mode);
    }
  }, {
    key: "isFullscreen",
    value: function isFullscreen() {
      var d = document;
      return (d.webkitFullscreenElement || d.msFullscreenElement || d.mozFullScreenElement || d.fullscreenElement) == this.player;
    }
  }, {
    key: "loadPlugin",
    value: function loadPlugin(url) {
      var _this2 = this;

      //load a js plugin for NyaP
      var p = fetch(url).then(function (res) {
        return res.text();
      }).then(function (script) {
        'use strict';

        script = script.trim();
        var plugin = eval(script);
        if (typeof plugin.name !== 'string' || !plugin.name) throw new TypeError('Invalid plugin name');
        if (_this2.plugins[plugin.name]) throw "Plugin already loaded: ".concat(plugin.name);
        _this2.plugins[plugin.name] = plugin;
        plugin.init(_this2);

        _this2.emit('pluginLoaded', plugin.name);

        return plugin.name;
      });
      p.catch(function (e) {
        _this2.log('pluginLoadingError', 'error', e);

        _this2.emit('pluginLoadingError', e);
      });
      return p;
    }
  }, {
    key: "log",
    value: function log(content) {
      var _console;

      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'log';

      for (var _len3 = arguments.length, styles = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        styles[_key3 - 2] = arguments[_key3];
      }

      (_console = console)[type].apply(_console, ["%c NyaP %c".concat(content), "background:#e0e0e0;padding:.2em", "background:unset"].concat(styles));
    }
  }, {
    key: "danmakuFrame",
    get: function get() {
      return this.Danmaku.danmakuFrame;
    }
  }, {
    key: "player",
    get: function get() {
      return this._.player;
    }
  }, {
    key: "video",
    get: function get() {
      return this._.video;
    }
  }, {
    key: "src",
    get: function get() {
      return this.video.src;
    },
    set: function set(s) {
      var _this3 = this;

      s = s.trim();
      if (!this.stats.coreLoaded) this.on('coreLoad', function () {
        _this3.src = s;
      });else {
        this.emit('setVideoSrc', s);
      }
    }
  }, {
    key: "TextDanmaku",
    get: function get() {
      return this.danmakuFrame.modules.TextDanmaku;
    }
  }, {
    key: "videoSize",
    get: function get() {
      return [this.video.videoWidth, this.video.videoHeight];
    }
  }, {
    key: "_danmakuEnabled",
    get: function get() {
      return this.opt.enableDanmaku == true;
    }
  }]);

  return NyaPlayerCore;
}(NyaPEventEmitter); //other functions


exports.NyaPlayerCore = NyaPlayerCore;

function addEvents(target, events) {
  if (!Array.isArray(target)) target = [target];

  var _loop = function _loop(e) {
    e.split(/\,/g).forEach(function (e2) {
      target.forEach(function (t) {
        t.addEventListener(e2, events[e]);
      });
    });
  };

  for (var e in events) {
    _loop(e);
  }
}

function requestFullscreen(d) {
  try {
    (d.requestFullscreen || d.msRequestFullscreen || d.mozRequestFullScreen || d.webkitRequestFullscreen).call(d);
  } catch (e) {
    console.error(e);
    alert(_('Failed to change to fullscreen mode'));
  }
}

function exitFullscreen() {
  var d = document;
  (d.exitFullscreen || d.msExitFullscreen || d.mozCancelFullScreen || d.webkitCancelFullScreen).call(d);
}

function isFullscreen() {
  var d = document;
  return !!(d.fullscreen || d.mozFullScreen || d.webkitIsFullScreen || d.msFullscreenElement);
}

function formatTime(sec, total) {
  if (total == undefined) total = sec;
  var r,
      s = sec | 0,
      h = s / 3600 | 0;
  if (total >= 3600) s = s % 3600;
  r = [padTime(s / 60 | 0), padTime(s % 60)];
  total >= 3600 && r.unshift(h);
  return r.join(':');
}

function padTime(n) {
  //pad number to 2 chars
  return n > 9 && n || "0".concat(n);
}

function setAttrs(ele, obj) {
  //set multi attrs to a Element
  for (var a in obj) {
    ele.setAttribute(a, obj[a]);
  }
}

function limitIn(num, min, max) {
  //limit the number in a range
  return num < min ? min : num > max ? max : num;
}

function rand(min, max) {
  return min + Math.random() * (max - min) + 0.5 | 0;
}

function toArray(obj) {
  if (obj instanceof Array) return obj.slice();
  if (obj.length !== undefined) return Array.prototype.slice.call(obj);
  return _toConsumableArray(obj);
} //Polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


if (!String.prototype.startsWith) String.prototype.startsWith = function (searchString) {
  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return this.substr(position, searchString.length) === searchString;
}; //Polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

if (!Object.assign) Object.assign = function (target, varArgs) {
  'use strict';

  if (target == null) throw new TypeError('Cannot convert undefined or null to object');
  var to = Object(target);

  for (var index = 1; index < arguments.length; index++) {
    var nextSource = arguments[index];

    if (nextSource != null) {
      for (var nextKey in nextSource) {
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }

  return to;
}; //Polyfill Array.from

if (!Array.from) Array.from = function (a, func) {
  if (!(a instanceof Array)) a = toArray(a);
  var r = new Array(a.length);

  for (var i = a.length; i--;) {
    r[i] = func ? func(a[i], i) : a[i];
  }

  return r;
}; //Polyfill Number.isInteger

if (!Number.isInteger) Number.isInteger = function (v) {
  return (v | 0) === v;
};
var _default = NyaPlayerCore;
exports.default = _default;

},{"../lib/Object2HTML/Object2HTML.js":1,"./danmaku.js":133,"./i18n.js":134,"core-js/modules/es6.array.from":109,"core-js/modules/es6.array.iterator":110,"core-js/modules/es6.function.name":111,"core-js/modules/es6.number.constructor":112,"core-js/modules/es6.number.is-integer":113,"core-js/modules/es6.object.assign":114,"core-js/modules/es6.promise":115,"core-js/modules/es6.regexp.split":120,"core-js/modules/es6.regexp.to-string":121,"core-js/modules/es6.string.iterator":122,"core-js/modules/es6.string.starts-with":124,"core-js/modules/es6.symbol":125,"core-js/modules/es7.symbol.async-iterator":127,"core-js/modules/web.dom.iterable":128}],133:[function(require,module,exports){
/*
Copyright luojia@luojia.me
LGPL license
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

var _danmakuFrame = require("../lib/danmaku-frame/src/danmaku-frame.js");

var _danmakuText = _interopRequireDefault(require("../lib/danmaku-text/src/danmaku-text.js"));

var _NyaPCore = require("./NyaPCore.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(0, _danmakuText.default)(_danmakuFrame.DanmakuFrame, _danmakuFrame.DanmakuFrameModule); //init TextDanmaku mod

var colorChars = '0123456789abcdef';
var danmakuProp = ['color', 'text', 'size', 'mode', 'time'];

var Danmaku =
/*#__PURE__*/
function () {
  function Danmaku(core) {
    var _this = this;

    _classCallCheck(this, Danmaku);

    this.core = core;
    this.danmakuFrame = new _danmakuFrame.DanmakuFrame(core.danmakuContainer);

    if (core.opt.danmakuModule instanceof Array) {
      core.opt.danmakuModule.forEach(function (m) {
        _this.initModule(m);

        _this.danmakuFrame.enable(m);
      });
    }

    this.danmakuFrame.setMedia(core.video);
  }

  _createClass(Danmaku, [{
    key: "initModule",
    value: function initModule(name) {
      return this.danmakuFrame.initModule(name, this.core.opt.danmakuModuleArg[name]);
    }
  }, {
    key: "load",
    value: function load(obj) {
      return this.danmakuFrame.load(obj);
    }
  }, {
    key: "loadList",
    value: function loadList(list) {
      this.danmakuFrame.loadList(list);
    }
  }, {
    key: "remove",
    value: function remove(obj) {
      this.danmakuFrame.unload(obj);
    }
  }, {
    key: "enable",
    value: function enable() {
      this.danmakuFrame.enable();
      this.core.emit('danmakuFrameToggle', name, this.module(name).enabled);
    }
  }, {
    key: "disable",
    value: function disable() {
      this.danmakuFrame.enable();
    }
  }, {
    key: "toggle",
    value: function toggle(name, bool) {
      if (typeof name === 'boolean' || name == undefined) {
        //frame switch mode
        bool = name != undefined ? name : !this.danmakuFrame.enabled;
        this.danmakuFrame[bool ? 'enable' : 'disable']();
        this.core.emit('danmakuFrameToggle', bool);
        return;
      }

      try {
        if (bool == undefined) bool = !this.module(name).enabled;
        this.danmakuFrame[bool ? 'enable' : 'disable'](name);
        this.core.emit('danmakuModuleToggle', name, this.module(name).enabled);
      } catch (e) {
        this.core.log('', 'error', e);
        return false;
      }

      return true;
    }
  }, {
    key: "at",
    value: function at(x, y) {
      return this.module('TextDanmaku').danmakuAt(x, y);
    }
  }, {
    key: "module",
    value: function module(name) {
      return this.danmakuFrame.modules[name];
    }
  }, {
    key: "send",
    value: function send(obj, callback) {
      for (var _i = 0; _i < danmakuProp.length; _i++) {
        var i = danmakuProp[_i];
        if (i in obj === false) return false;
      }

      if ((obj.text || '').match(/^\s*$/)) return false;
      obj.color = this.isVaildColor(obj.color);

      if (obj.color) {
        obj.color = obj.color.replace(/\$/g, function () {
          return colorChars[(0, _NyaPCore.limitIn)(16 * Math.random() | 0, 0, 15)];
        });
      } else {
        obj.color = null;
      }

      if (this.core.opt.danmakuSend instanceof Function) {
        this.core.opt.danmakuSend(obj, callback || function () {});
        return true;
      }

      return false;
    }
  }, {
    key: "isVaildColor",
    value: function isVaildColor(co) {
      if (typeof co !== 'string') return false;
      return (co = co.match(/^\#?(([\da-f\$]{3}){1,2})$/i)) ? co[1] : false;
    }
  }]);

  return Danmaku;
}();

var _default = Danmaku;
exports.default = _default;

},{"../lib/danmaku-frame/src/danmaku-frame.js":3,"../lib/danmaku-text/src/danmaku-text.js":6,"./NyaPCore.js":132,"core-js/modules/es6.function.name":111,"core-js/modules/es6.regexp.match":118,"core-js/modules/es6.regexp.replace":119,"core-js/modules/web.dom.iterable":128}],134:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i18n = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/web.dom.iterable");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
Copyright luojia@luojia.me
LGPL license
*/
var i18n = {
  lang: null,
  langs: {},
  _: function _(str) {
    var s = i18n.lang && i18n.langs[i18n.lang][str] || str;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    args.length && args.forEach(function (arg, ind) {
      s = s.replace("$".concat(ind), arg);
    });
    return s;
  }
};
exports.i18n = i18n;
i18n.langs['zh-CN'] = {
  'play': '播放',
  'Send': '发送',
  'Done': '完成',
  'loop': '循环',
  'pause': '暂停',
  'muted': '静音',
  'volume': '音量',
  'settings': '设置',
  'wheeling': '滚轮',
  'hex color': 'Hex颜色',
  'Loading core': '加载核心',
  'Loading video': '加载视频',
  'Loading plugin': '加载插件',
  'full page(P)': '全页模式(P)',
  'Loading danmaku': '加载弹幕',
  'Creating player': '创建播放器',
  'full screen(F)': '全屏模式(F)',
  'danmaku toggle(D)': '弹幕开关(D)',
  'Input danmaku here': '在这里输入弹幕',
  'Loading danmaku frame': '加载弹幕框架',
  'danmaku input(Enter)': '弹幕输入框(回车)',
  'Failed to change to fullscreen mode': '无法切换到全屏模式' //automatically select a language

};

if (!navigator.languages) {
  navigator.languages = [navigator.language || navigator.browserLanguage];
}

var _arr = _toConsumableArray(navigator.languages);

for (var _i = 0; _i < _arr.length; _i++) {
  var lang = _arr[_i];

  if (i18n.langs[lang]) {
    i18n.lang = lang;
    break;
  }

  var code = lang.match(/^\w+/)[0];

  for (var cod in i18n.langs) {
    if (cod.startsWith(code)) {
      i18n.lang = cod;
      break;
    }
  }

  if (i18n.lang) break;
}

},{"core-js/modules/es6.array.from":109,"core-js/modules/es6.regexp.match":118,"core-js/modules/es6.regexp.replace":119,"core-js/modules/es6.regexp.to-string":121,"core-js/modules/es6.string.iterator":122,"core-js/modules/es6.string.starts-with":124,"core-js/modules/es6.symbol":125,"core-js/modules/es7.symbol.async-iterator":127,"core-js/modules/web.dom.iterable":128}]},{},[131])

//# sourceMappingURL=NyaP.80.js.map
