(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Object2HTML = Object2HTML;
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

/*
Copyright luojia@luojia.me
LGPL license
*/
function _Obj(t) {
  return typeof t == 'object';
}

function Object2HTML(obj, func) {
  let ele, o, e;
  if (typeof obj === 'string' || typeof obj === 'number') ele = document.createTextNode(obj); //text node
  else if (obj instanceof Node) ele = obj;else if (obj === null || typeof obj !== 'object' || '_' in obj === false || typeof obj._ !== 'string' || obj._ == '') return; //if it dont have a _ prop to specify a tag

  ele || (ele = document.createElement(obj._)); //attributes

  if (_Obj(obj.attr)) for (o in obj.attr) ele.setAttribute(o, obj.attr[o]); //properties

  if (_Obj(obj.prop)) for (o in obj.prop) ele[o] = obj.prop[o]; //events

  if (_Obj(obj.event)) for (o in obj.event) ele.addEventListener(o, obj.event[o]); //childNodes

  if (_Obj(obj.child) && obj.child.length > 0) obj.child.forEach(o => {
    e = Object2HTML(o, func);
    e instanceof Node && ele.appendChild(e);
  });
  func && func(ele);
  return ele;
}

var _default = Object2HTML;
exports.default = _default;

},{"core-js/modules/web.dom.iterable":56}],2:[function(require,module,exports){
"use strict";

/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
;

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if (typeof exports === "object") {
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


  var ResizeSensor = function (element, callback) {
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

      var reset = function () {
        expandChild.style.width = '100000px';
        expandChild.style.height = '100000px';
        expand.scrollLeft = 100000;
        expand.scrollTop = 100000;
        shrink.scrollLeft = 100000;
        shrink.scrollTop = 100000;
      };

      reset();

      var onResized = function () {
        rafId = 0;
        if (!dirty) return;
        lastWidth = newWidth;
        lastHeight = newHeight;

        if (element.resizedAttached) {
          element.resizedAttached.call();
        }
      };

      var onScroll = function () {
        newWidth = element.offsetWidth;
        newHeight = element.offsetHeight;
        dirty = newWidth != lastWidth || newHeight != lastHeight;

        if (dirty && !rafId) {
          rafId = requestAnimationFrame(onResized);
        }

        reset();
      };

      var addEvent = function (el, name, cb) {
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

},{}],3:[function(require,module,exports){
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
  get: function () {
    return _ResizeSensor.default;
  }
});
exports.DanmakuFrameModule = exports.DanmakuFrame = void 0;

require("core-js/modules/web.dom.iterable");

var _ResizeSensor = _interopRequireDefault(require("../lib/ResizeSensor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DanmakuFrame {
  constructor(container) {
    const F = this;
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

    const style = document.createElement("style");
    document.head.appendChild(style);
    F.styleSheet = style.sheet;
    setTimeout(() => {
      //container size sensor
      F.container.ResizeSensor = new _ResizeSensor.default(F.container, () => {
        F.resize();
      });
      F.resize();
    }, 0);
    setInterval(() => {
      F.fpsRec = F.fpsTmp;
      F.fpsTmp = 0;
    }, 1000);
    F.draw = F.draw.bind(F);
  }

  enable(name) {
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

    let module = this.modules[name] || this.initModule(name);
    if (!module) return false;
    module.enabled = true;
    module.enable && module.enable();
    return true;
  }

  disable(name) {
    if (!name) {
      this.pause();
      this.moduleFunction('clear');
      this.enabled = false;
      this.container.hidden = true;
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
    s.forEach(r => this.styleSheet.insertRule(r, this.styleSheet.cssRules.length));
  }

  initModule(name, arg) {
    if (this.modules[name]) {
      console.warn(`The module [${name}] has already inited.`);
      return this.modules[name];
    }

    let mod = DanmakuFrame.availableModules[name];
    if (!mod) throw 'Module [' + name + '] does not exist.';
    let module = new mod(this, arg);
    if (module instanceof DanmakuFrameModule === false) throw 'Constructor of ' + name + ' is not extended from DanmakuFrameModule';
    this.modules[name] = module;
    console.debug(`Mod Inited: ${name}`);
    return module;
  }

  set time(t) {
    //current media time (ms)
    this.media || (this.timeBase = Date.now() - t);
    this.moduleFunction('time', t); //let all mods know when the time be set
  }

  get time() {
    return this.media ? this.media.currentTime * 1000 | 0 : Date.now() - this.timeBase;
  }

  draw(force) {
    if (!this.working) return;
    this.fpsTmp++;
    this.moduleFunction('draw', force);

    if (this.fps === 0) {
      requestAnimationFrame(() => this.draw());
    } else {
      setTimeout(this.draw, 1000 / this.fps);
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

  start() {
    if (this.working || !this.enabled) return;
    this.working = true;
    this.moduleFunction('start');
    this.draw(true);
  }

  pause() {
    if (!this.enabled) return;
    this.working = false;
    this.moduleFunction('pause');
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.moduleFunction('resize');
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
    addEvents(media, {
      playing: () => F.start(),
      'pause,stalled,seeking,waiting': () => F.pause(),
      ratechange: () => {
        F.rate = F.media.playbackRate;
        F.moduleFunction('rate', F.rate);
      }
    });
    F.moduleFunction('media', media);
  }

  static addModule(name, module) {
    if (name in this.availableModules) {
      console.warn('The module "' + name + '" has already been added.');
      return;
    }

    this.availableModules[name] = module;
  }

}

exports.DanmakuFrame = DanmakuFrame;
DanmakuFrame.availableModules = {};

class DanmakuFrameModule {
  constructor(frame) {
    this.frame = frame;
    this.enabled = false;
  }

}

exports.DanmakuFrameModule = DanmakuFrameModule;

function addEvents(target, events = {}) {
  for (let e in events) e.split(/\,/g).forEach(e2 => target.addEventListener(e2, events[e]));
}

},{"../lib/ResizeSensor.js":2,"core-js/modules/web.dom.iterable":56}],4:[function(require,module,exports){
/*
Copyright luojia@luojia.me
LGPL license
*/
'use strict';

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

  return createClass(global.Float32Array ? Float32Array : Array);
});

},{}],5:[function(require,module,exports){
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
    registerImmediate = function (handle) {
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

    var onGlobalMessage = function (event) {
      if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
        runIfPresent(+event.data.slice(messagePrefix.length));
      }
    };

    if (global.addEventListener) {
      global.addEventListener("message", onGlobalMessage, false);
    } else {
      global.attachEvent("onmessage", onGlobalMessage);
    }

    registerImmediate = function (handle) {
      global.postMessage(messagePrefix + handle, "*");
    };
  }

  function installMessageChannelImplementation() {
    var channel = new MessageChannel();

    channel.port1.onmessage = function (event) {
      var handle = event.data;
      runIfPresent(handle);
    };

    registerImmediate = function (handle) {
      channel.port2.postMessage(handle);
    };
  }

  function installReadyStateChangeImplementation() {
    var html = doc.documentElement;

    registerImmediate = function (handle) {
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
    registerImmediate = function (handle) {
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

},{"_process":57}],6:[function(require,module,exports){
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

require("core-js/modules/web.dom.iterable");

require("../lib/setImmediate/setImmediate.js");

var _text2d = _interopRequireDefault(require("./text2d.js"));

var _text3d = _interopRequireDefault(require("./text3d.js"));

var _textCanvas = _interopRequireDefault(require("./textCanvas.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  const defProp = Object.defineProperty;
  const requestIdleCallback = window.requestIdleCallback || setImmediate;
  let useImageBitmap = false;

  class TextDanmaku extends DanmakuFrameModule {
    constructor(frame, arg = {}) {
      super(frame);
      const D = this;
      D.list = []; //danmaku object array

      D.indexMark = 0; //to record the index of last danmaku in the list

      D.tunnel = new tunnelManager();
      D.paused = true;
      D.randomText = `danmaku_text_${Math.random() * 999999 | 0}`; //opt time record

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
      if (arg.defaultStyle) Object.assign(this.defaultStyle, arg.defaultStyle);
      if (arg.options) Object.assign(this.options, arg.options);
      frame.addStyle(`.${D.randomText}_fullfill{top:0;left:0;width:100%;height:100%;position:absolute;}`);
      defProp(D, 'rendererMode', {
        configurable: true
      });
      defProp(D, 'activeRendererMode', {
        configurable: true,
        value: null
      });
      const con = D.container = document.createElement('div');
      con.classList.add(`${D.randomText}_fullfill`);
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
        visibilitychange: e => {
          D.danmakuCheckSwitch = !document.hidden;
          if (!document.hidden) D.recheckIndexMark();
        }
      });
      D._checkNewDanmaku = D._checkNewDanmaku.bind(D);
      D._cleanCache = D._cleanCache.bind(D);
      setInterval(D._cleanCache, 5000); //set an interval for cache cleaning

      D.setRendererMode(1);
    }

    setRendererMode(n) {
      const D = this;
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

    media(media) {
      const D = this;
      addEvents(media, {
        seeked: () => {
          D.time();

          D._clearScreen(true);
        },
        seeking: () => D.pause()
      });
    }

    start() {
      this.paused = false; //this.recheckIndexMark();

      this.activeRendererMode.start();
    }

    pause() {
      this.paused = true;
      this.activeRendererMode.pause();
    }

    load(d, autoAddToScreen) {
      if (!d || d._ !== 'text') {
        return false;
      }

      if (typeof d.text !== 'string') {
        console.error('wrong danmaku object:', d);
        return false;
      }

      let t = d.time,
          ind,
          arr = this.list;
      ind = dichotomy(arr, d.time, 0, arr.length - 1, false);
      arr.splice(ind, 0, d);
      if (ind < this.indexMark) this.indexMark++; //round d.style.fontSize to prevent Iifinity loop in tunnel

      if (typeof d.style !== 'object') d.style = {};
      d.style.fontSize = d.style.fontSize ? d.style.fontSize + 0.5 | 0 : this.defaultStyle.fontSize;
      if (isNaN(d.style.fontSize) || d.style.fontSize === Infinity || d.style.fontSize === 0) d.style.fontSize = this.defaultStyle.fontSize;
      if (typeof d.mode !== 'number') d.mode = 0;

      if (autoAddToScreen) {
        console.log(ind, this.indexMark);
      }

      if (autoAddToScreen && ind < this.indexMark) this._addNewDanmaku(d);
      return d;
    }

    loadList(danmakuArray) {
      danmakuArray.forEach(d => this.load(d));
    }

    unload(d) {
      if (!d || d._ !== 'text') return false;
      const D = this,
            i = D.list.indexOf(d);
      if (i < 0) return false;
      D.list.splice(i, 1);
      if (i < D.indexMark) D.indexMark--;
      return true;
    }

    _checkNewDanmaku(force) {
      if (this.paused && !force) return;
      let D = this,
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

    _addNewDanmaku(d) {
      const D = this,
            cHeight = D.height,
            cWidth = D.width;
      let t = D.GraphCache.length ? D.GraphCache.shift() : new TextGraph();
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

      const tnum = D.tunnel.getTunnel(t, cHeight); //calc margin

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

      D.renderingDanmakuManager.add(t);
      D.activeRendererMode.newDanmaku(t);
    }

    _calcSideDanmakuPosition(t, T = this.frame.time) {
      let R = !t.danmaku.mode,
          style = t.style;
      return (R ? this.frame.width : -style.width) + (R ? -1 : 1) * this.frame.rate * (style.width + 1024) * (T - t.time) * this.options.speed / 60000;
    }

    _calcDanmakusPosition(force) {
      let D = this,
          T = D.frame.time;
      if (D.paused && !force) return;
      const cWidth = D.width,
            rate = D.frame.rate;
      let R, i, t, style, X;
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

    _cleanCache(force) {
      //clean text object cache
      const D = this,
            now = Date.now();

      if (D.GraphCache.length > 30 || force) {
        //save 20 cached danmaku
        for (let ti = 0; ti < D.GraphCache.length; ti++) {
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
      this.renderingDanmakuManager.remove(t);
      this.tunnel.removeMark(t);
      t._bitmap = t.danmaku = null;
      t.removeTime = Date.now();
      this.GraphCache.push(t);
      this.activeRendererMode.remove(t);
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
      for (let i = this.DanmakuText.length, T; i--;) {
        T = this.DanmakuText[i];
        if (T.danmaku) this.removeText(T);
      }

      this.tunnel.reset();

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
      //cause the position of the danmaku is based on time
      //and if you don't want these danmaku on the screen to disappear after seeking,their time should be reset
      if (cTime === undefined) cTime = this.frame.time;
      this.DanmakuText.forEach(t => {
        if (!t.danmaku) return;
        t.time = cTime - (this.danmakuMoveTime - t.time);
      });
    }

    danmakuAt(x, y) {
      //return a list of danmaku which covers this position
      const list = [];
      if (!this.enabled) return list;
      this.DanmakuText.forEach(t => {
        if (!t.danmaku) return;
        if (t.style.x <= x && t.style.x + t.style.width >= x && t.style.y <= y && t.style.y + t.style.height >= y) list.push(t.danmaku);
      });
      return list;
    }

    enable() {
      //enable the plugin
      this.textCanvasContainer.hidden = false;
      if (this.frame.working) this.start();
    }

    disable() {
      //disable the plugin
      this.textCanvasContainer.hidden = true;
      this.pause();
      this.clear();
    }

    set useImageBitmap(v) {
      useImageBitmap = typeof createImageBitmap === 'function' ? v : false;
    }

    get useImageBitmap() {
      return useImageBitmap;
    }

    get width() {
      return this.frame.width;
    }

    get height() {
      return this.frame.height;
    }

  }

  class TextGraph {
    //code copied from CanvasObjLibrary
    constructor(text = '') {
      const G = this;
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

    prepare(async = false) {
      //prepare text details
      const G = this;

      if (!G._cache) {
        defProp(G, '_cache', {
          value: document.createElement("canvas")
        });
      }

      let ta = [];
      G.font.fontStyle && ta.push(G.font.fontStyle);
      G.font.fontVariant && ta.push(G.font.fontVariant);
      G.font.fontWeight && ta.push(G.font.fontWeight);
      ta.push(`${G.font.fontSize}px`);
      G.font.fontFamily && ta.push(G.font.fontFamily);
      G._fontString = ta.join(' ');
      const imgobj = G._cache,
            ct = imgobj.ctx2d || (imgobj.ctx2d = imgobj.getContext("2d"));
      ct.font = G._fontString;
      G._renderList = G.text.split(/\n/g);
      G.estimatePadding = Math.max(G.font.shadowBlur + 5 + Math.max(Math.abs(G.font.shadowOffsetY), Math.abs(G.font.shadowOffsetX)), G.font.strokeWidth + 3);
      let w = 0,
          tw,
          lh = typeof G.font.lineHeight === 'number' ? G.font.lineHeight : G.font.fontSize;

      for (let i = G._renderList.length; i--;) {
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

    _renderToCache() {
      const G = this;
      if (!G.danmaku) return;
      G.render(G._cache.ctx2d);

      if (useImageBitmap) {
        //use ImageBitmap
        if (G._bitmap) {
          G._bitmap.close();

          G._bitmap = null;
        }

        createImageBitmap(G._cache).then(bitmap => {
          G._bitmap = bitmap;
        });
      }
    }

    render(ct) {
      //render text
      const G = this;
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
      let lh = typeof G.font.lineHeight === 'number' ? G.font.lineHeight : G.font.fontSize,
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

      for (let i = G._renderList.length; i--;) {
        G.font.strokeWidth && ct.strokeText(G._renderList[i], x, lh * (i + 0.5));
        G.font.fill && ct.fillText(G._renderList[i], x, lh * (i + 0.5));
      }

      ct.restore();
    }

  }

  class tunnelManager {
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

  const tunnels = ['right', 'left', 'bottom', 'top'];

  class renderingDanmakuManager {
    constructor(dText) {
      this.dText = dText;
      this.totalArea = 0;
      this.limitArea = Infinity;
      if (dText.text2d.supported) this.timer = setInterval(() => this.rendererModeCheck(), 1500);
    }

    add(t) {
      this.dText.DanmakuText.push(t);
      this.totalArea += t._cache.width * t._cache.height;
    }

    remove(t) {
      let ind = this.dText.DanmakuText.indexOf(t);

      if (ind >= 0) {
        this.dText.DanmakuText.splice(ind, 1);
        this.totalArea -= t._cache.width * t._cache.height;
      }
    }

    rendererModeCheck() {
      let D = this.dText;
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

  }

  function dichotomy(arr, t, start, end, position = false) {
    if (arr.length === 0) return 0;
    let m = start,
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

function addEvents(target, events = {}) {
  for (let e in events) e.split(/\,/g).forEach(e2 => target.addEventListener(e2, events[e]));
}

function limitIn(num, min, max) {
  //limit the number in a range
  return num < min ? min : num > max ? max : num;
}

function emptyFunc() {}

var _default = init;
exports.default = _default;

}).call(this,require("timers").setImmediate)

},{"../lib/setImmediate/setImmediate.js":5,"./text2d.js":7,"./text3d.js":8,"./textCanvas.js":9,"core-js/modules/web.dom.iterable":56,"timers":58}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _textModuleTemplate = _interopRequireDefault(require("./textModuleTemplate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Copyright luojia@luojia.me
LGPL license
*/
class Text2d extends _textModuleTemplate.default {
  constructor(dText) {
    super(dText);
    this.supported = false;
    dText.canvas = document.createElement('canvas'); //the canvas

    dText.context2d = dText.canvas.getContext('2d'); //the canvas contex

    if (!dText.context2d) {
      console.warn('text 2d not supported');
      return;
    }

    dText.canvas.classList.add(`${dText.randomText}_fullfill`);
    dText.canvas.id = `${dText.randomText}_text2d`;
    dText.container.appendChild(dText.canvas);
    this.supported = true;
  }

  draw(force) {
    let ctx = this.dText.context2d,
        cW = ctx.canvas.width,
        dT = this.dText.DanmakuText,
        i = dT.length,
        t,
        left,
        right,
        vW;
    const bitmap = this.dText.useImageBitmap;
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

  clear(force) {
    const D = this.dText;

    if (force || this._evaluateIfFullClearMode()) {
      D.context2d.clearRect(0, 0, D.canvas.width, D.canvas.height);
      return;
    }

    for (let i = D.DanmakuText.length, t; i--;) {
      t = D.DanmakuText[i];
      if (t.drawn) D.context2d.clearRect(t.style.x - t.estimatePadding, t.style.y - t.estimatePadding, t._cache.width, t._cache.height);
    }
  }

  _evaluateIfFullClearMode() {
    if (this.dText.DanmakuText.length > 3) return true;
    let l = this.dText.GraphCache[this.dText.GraphCache.length - 1];

    if (l && l.drawn) {
      l.drawn = false;
      return true;
    }

    return false;
  }

  resize() {
    let D = this.dText,
        C = D.canvas;
    C.width = D.width;
    C.height = D.height;
  }

  enable() {
    this.draw();
    this.dText.useImageBitmap = !(this.dText.canvas.hidden = false);
  }

  disable() {
    this.dText.canvas.hidden = true;
    this.clear(true);
  }

}

var _default = Text2d;
exports.default = _default;

},{"./textModuleTemplate.js":10}],8:[function(require,module,exports){
(function (setImmediate){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

var _Mat = _interopRequireDefault(require("../lib/Mat/Mat.js"));

var _textModuleTemplate = _interopRequireDefault(require("./textModuleTemplate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Copyright luojia@luojia.me
LGPL license
*/
const requestIdleCallback = window.requestIdleCallback || setImmediate;

class Text3d extends _textModuleTemplate.default {
  constructor(dText) {
    super(dText);
    this.supported = false;
    let c3d = this.c3d = dText.canvas3d = document.createElement('canvas');
    c3d.classList.add(`${dText.randomText}_fullfill`);
    c3d.id = `${dText.randomText}_text3d`;
    dText.context3d = c3d.getContext('webgl') || c3d.getContext('experimental-webgl'); //the canvas3d context

    if (!dText.context3d) {
      console.warn('text 3d not supported');
      return;
    }

    dText.container.appendChild(c3d);
    const gl = this.gl = dText.context3d,
          canvas = c3d; //init webgl
    //shader

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

  deleteTextObject(t) {
    const gl = this.gl;
    if (t.texture) gl.deleteTexture(t.texture);
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
    this.dText.DanmakuText.forEach(t => {
      this.newDanmaku(t, false);
    });
    this.dText.useImageBitmap = this.c3d.hidden = false;
    requestAnimationFrame(() => this.draw());
  }

  disable() {
    this.clear();
    this.c3d.hidden = true;
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
      requestIdleCallback(() => {
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
1.0, 1.0]);
var _default = Text3d;
exports.default = _default;

}).call(this,require("timers").setImmediate)

},{"../lib/Mat/Mat.js":4,"./textModuleTemplate.js":10,"core-js/modules/web.dom.iterable":56,"timers":58}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

var _textModuleTemplate = _interopRequireDefault(require("./textModuleTemplate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Copyright luojia@luojia.me
LGPL license
*/
class TextCanvas extends _textModuleTemplate.default {
  constructor(dText) {
    super(dText);
    this.supported = dText.text2d.supported;
    if (!this.supported) return;
    dText.frame.addStyle([`#${dText.randomText}_textCanvasContainer canvas{will-change:transform;top:0;left:0;position:absolute;}`, `#${dText.randomText}_textCanvasContainer.moving canvas{transition:transform 500s linear;}`, `#${dText.randomText}_textCanvasContainer{will-change:transform;pointer-events:none;overflow:hidden;}`]);
    this.container = dText.textCanvasContainer = document.createElement('div'); //for text canvas

    this.container.classList.add(`${dText.randomText}_fullfill`);
    this.container.id = `${dText.randomText}_textCanvasContainer`;
    dText.container.appendChild(this.container);
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

  pause() {
    this._toggle(false);
  }

  start() {
    this._toggle(true);
  }

  rate() {
    this.resetPos();
  }

  _move(t, T) {
    if (!t.danmaku) return;
    if (T === undefined) T = this.dText.frame.time + 500000;
    t._cache.style.transform = `translate3d(${((this.dText._calcSideDanmakuPosition(t, T) - t.estimatePadding) * 10 | 0) / 10}px,${t.style.y - t.estimatePadding}px,0)`;
  }

  resetPos() {
    this.pause();
    this.dText.paused || requestAnimationFrame(() => this.start());
  }

  resize() {
    this.resetPos();
  }

  remove(t) {
    t._cache.parentNode && this.container.removeChild(t._cache);
  }

  enable() {
    requestAnimationFrame(() => {
      this.dText.DanmakuText.forEach(t => this.newDanmaku(t));
    });
    this.container.hidden = false;
  }

  disable() {
    this.container.hidden = true;
    this.container.innerHTML = '';
  }

  newDanmaku(t) {
    t._cache.style.transform = `translate3d(${t.style.x - t.estimatePadding}px,${t.style.y - t.estimatePadding}px,0)`;
    this.container.appendChild(t._cache);
    t.danmaku.mode < 2 && !this.dText.paused && requestAnimationFrame(() => this._move(t));
  }

}

var _default = TextCanvas;
exports.default = _default;

},{"./textModuleTemplate.js":10,"core-js/modules/web.dom.iterable":56}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
Copyright luojia@luojia.me
LGPL license

*/
class textModuleTemplate {
  constructor(dText) {
    this.dText = dText;
  }

  draw() {}

  rate() {}

  pause() {}

  start() {}

  clear() {}

  resize() {}

  remove() {}

  enable() {}

  disable() {}

  newDanmaku() {}

  deleteTextObject() {}

}

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

},{"./_hide":26,"./_wks":54}],13:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":30}],14:[function(require,module,exports){
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

},{"./_to-absolute-index":47,"./_to-iobject":49,"./_to-length":50}],15:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],16:[function(require,module,exports){
var core = module.exports = { version: '2.6.2' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],17:[function(require,module,exports){
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

},{"./_a-function":11}],18:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],19:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":23}],20:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":24,"./_is-object":30}],21:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],22:[function(require,module,exports){
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

},{"./_core":16,"./_ctx":17,"./_global":24,"./_hide":26,"./_redefine":43}],23:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],24:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],25:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],26:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":19,"./_object-dp":37,"./_property-desc":42}],27:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":24}],28:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":19,"./_dom-create":20,"./_fails":23}],29:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":15}],30:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],31:[function(require,module,exports){
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

},{"./_hide":26,"./_object-create":36,"./_property-desc":42,"./_set-to-string-tag":44,"./_wks":54}],32:[function(require,module,exports){
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

},{"./_export":22,"./_hide":26,"./_iter-create":31,"./_iterators":34,"./_library":35,"./_object-gpo":39,"./_redefine":43,"./_set-to-string-tag":44,"./_wks":54}],33:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],34:[function(require,module,exports){
module.exports = {};

},{}],35:[function(require,module,exports){
module.exports = false;

},{}],36:[function(require,module,exports){
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

},{"./_an-object":13,"./_dom-create":20,"./_enum-bug-keys":21,"./_html":27,"./_object-dps":38,"./_shared-key":45}],37:[function(require,module,exports){
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

},{"./_an-object":13,"./_descriptors":19,"./_ie8-dom-define":28,"./_to-primitive":52}],38:[function(require,module,exports){
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

},{"./_an-object":13,"./_descriptors":19,"./_object-dp":37,"./_object-keys":41}],39:[function(require,module,exports){
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

},{"./_has":25,"./_shared-key":45,"./_to-object":51}],40:[function(require,module,exports){
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

},{"./_array-includes":14,"./_has":25,"./_shared-key":45,"./_to-iobject":49}],41:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":21,"./_object-keys-internal":40}],42:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],43:[function(require,module,exports){
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

},{"./_core":16,"./_global":24,"./_has":25,"./_hide":26,"./_uid":53}],44:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":25,"./_object-dp":37,"./_wks":54}],45:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":46,"./_uid":53}],46:[function(require,module,exports){
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

},{"./_core":16,"./_global":24,"./_library":35}],47:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":48}],48:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],49:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":18,"./_iobject":29}],50:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":48}],51:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":18}],52:[function(require,module,exports){
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

},{"./_is-object":30}],53:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],54:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":24,"./_shared":46,"./_uid":53}],55:[function(require,module,exports){
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

},{"./_add-to-unscopables":12,"./_iter-define":32,"./_iter-step":33,"./_iterators":34,"./_to-iobject":49}],56:[function(require,module,exports){
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

},{"./_global":24,"./_hide":26,"./_iterators":34,"./_object-keys":41,"./_redefine":43,"./_wks":54,"./es6.array.iterator":55}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{"process/browser.js":57,"timers":58}],59:[function(require,module,exports){
(function (setImmediate){
/*
Copyright luojia@luojia.me
LGPL license
*/
'use strict';

require("core-js/modules/web.dom.iterable");

var _i18n = require("./i18n.js");

var _Object2HTML = _interopRequireDefault(require("../lib/Object2HTML/Object2HTML.js"));

var _NyaPCore = require("./NyaPCore.js");

var _ResizeSensor = _interopRequireDefault(require("../lib/danmaku-frame/lib/ResizeSensor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _ = _i18n.i18n._; //NyaP options

const NyaPOptions = {
  autoHideDanmakuInput: true,
  //hide danmakuinput after danmaku sending
  danmakuColors: ['fff', '6cf', 'ff0', 'f00', '0f0', '00f', 'f0f', '000'],
  //colors in the danmaku style pannel
  danmakuModes: [0, 3, 2, 1],
  //0:right	1:left	2:bottom	3:top
  danmakuSizes: [20, 24, 36] //normal player

};

class NyaP extends _NyaPCore.NyaPlayerCore {
  constructor(opt) {
    super(Object.assign({}, NyaPOptions, opt));
    opt = this.opt;
    const NP = this,
          $ = this.$,
          video = this.video;
    const icons = this.icons = {
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

    function icon(name, event, attr = {}) {
      const ico = icons[name];
      return (0, _Object2HTML.default)({
        _: 'span',
        event,
        attr,
        prop: {
          id: `icon_span_${name}`,
          innerHTML: `<svg height=${ico[1]} width=${ico[0]} id="icon_${name}"">${ico[2]}</svg>`
        }
      });
    }

    let _licp = NP.loadingInfo(_('Creating player'), true);

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
              click: e => NP.playToggle()
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
              click: e => NP.danmakuInput()
            }, {
              title: _('danmaku input(Enter)')
            }), icon('danmakuToggle', {
              click: e => NP.Danmaku.toggle()
            }, {
              title: _('danmaku toggle(D)'),
              class: 'active_icon'
            }), icon('volume', {}, {
              title: `${_('volume')}:(${video.muted ? _('muted') : (video.volume * 100 | 0) + '%'})([shift]+↑↓)(${_('wheeling')})`
            }), icon('loop', {
              click: e => {
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
                click: e => NP.playerMode('fullScreen')
              }, {
                title: _('full screen(F)')
              }), icon('fullPage', {
                click: e => NP.playerMode('fullPage')
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

    if (this._danmakuEnabled) {
      //danmaku sizes
      opt.danmakuSizes && opt.danmakuSizes.forEach((s, ind) => {
        let e = (0, _Object2HTML.default)({
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
        $.danmaku_size_box.appendChild(e);
      }); //danmaku colors

      opt.danmakuColors && opt.danmakuColors.forEach(c => {
        let e = (0, _Object2HTML.default)({
          _: 'span',
          attr: {
            style: `background-color:#${c};`,
            title: c
          },
          prop: {
            color: c
          }
        });
        $.danmaku_color_box.appendChild(e);
      }); //danmaku modes

      opt.danmakuModes && opt.danmakuModes.forEach(m => {
        $.danmaku_mode_box.appendChild(icon(`danmakuMode${m}`));
      });
      NP.collectEles($.danmaku_mode_box);
    } else {
      for (let i in $) {
        if (i.match(/danmaku/i)) {
          $[i].parentNode.removeChild($[i]);
        }
      }
    } //progress


    setTimeout(() => {
      //ResizeSensor
      $.control.ResizeSensor = new _ResizeSensor.default($.control, () => NP.refreshProgress());
      NP.refreshProgress();
    }, 0);
    NP._.progressContext = $.progress.getContext('2d'); //events

    const events = {
      NyaP: {
        keydown: e => NP._playerKeyHandle(e),
        mousemove: e => {
          this._userActiveWatcher(true);
        }
      },
      document: {
        'fullscreenchange,mozfullscreenchange,webkitfullscreenchange,msfullscreenchange': e => {
          if (NP._.playerMode == 'fullScreen' && !this.isFullscreen()) NP.playerMode('normal');
        }
      },
      main_video: {
        playing: e => NP._iconActive('play', true),
        'pause,stalled': e => {
          NP._iconActive('play', false);
        },
        timeupdate: e => {
          if (Date.now() - NP._.lastTimeUpdate < 30) return;

          NP._setTimeInfo((0, _NyaPCore.formatTime)(video.currentTime, video.duration));

          NP.drawProgress();
          NP._.lastTimeUpdate = Date.now();
        },
        loadedmetadata: e => {
          NP._setTimeInfo(null, (0, _NyaPCore.formatTime)(video.duration, video.duration));
        },
        volumechange: e => {
          NP._.volumeBox.renew(`${_('volume')}:${(video.volume * 100).toFixed(0)}%` + `${video.muted ? '(' + _('muted') + ')' : ''}`, 3000);

          (0, _NyaPCore.setAttrs)($.volume_circle, {
            'stroke-dasharray': `${video.volume * 12 * Math.PI} 90`,
            style: `fill-opacity:${video.muted ? .2 : .6}!important`
          });
          $.icon_span_volume.setAttribute('title', `${_('volume')}:(${video.muted ? _('muted') : (video.volume * 100 | 0) + '%'})([shift]+↑↓)(${_('wheeling')})`);
        },
        progress: e => NP.drawProgress(),
        _loopChange: e => NP._iconActive('loop', e.value),
        click: e => NP.playToggle(),
        contextmenu: e => e.preventDefault(),
        error: e => {
          NP.msg(`视频加载错误:${e.message}`, 'error');
          this.log('video error', 'error', e);
        }
      },
      danmaku_container: {
        click: e => NP.playToggle(),
        contextmenu: e => e.preventDefault()
      },
      progress: {
        'mousemove,click': e => {
          let t = e.target,
              pre = (0, _NyaPCore.limitIn)((e.offsetX - t.pad) / (t.offsetWidth - 2 * t.pad), 0, 1);

          if (e.type === 'mousemove') {
            NP._.progressX = e.offsetX;
            NP.drawProgress();

            NP._setTimeInfo(null, (0, _NyaPCore.formatTime)(pre * video.duration, video.duration));
          } else if (e.type === 'click') {
            video.currentTime = pre * video.duration;
          }
        },
        mouseout: e => {
          NP._.progressX = undefined;
          NP.drawProgress();

          NP._setTimeInfo(null, (0, _NyaPCore.formatTime)(video.duration, video.duration));
        }
      },
      danmaku_style_pannel: {
        click: e => {
          if (e.target.tagName !== 'INPUT') setImmediate(a => NP.$.danmaku_input.focus());
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
          if (e.deltaMode !== 0) return;
          let delta;
          if (e.deltaY > 10 || e.deltaY < -10) delta = -e.deltaY / 10;else {
            delta = e.deltaY;
          }
          if (e.shiftKey) delta = delta > 0 ? 10 : -10;
          video.volume = (0, _NyaPCore.limitIn)(video.volume + delta / 100, 0, 1);
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
          let t = e.target;

          if (t.id.startsWith('icon_span_danmakuMode')) {
            let m = 1 * t.id.match(/\d$/)[0];
            if (NP._.danmakuMode !== undefined) $[`icon_span_danmakuMode${NP._.danmakuMode}`].classList.remove('active');
            $[`icon_span_danmakuMode${m}`].classList.add('active');
            NP._.danmakuMode = m;
          }
        }
      },
      danmaku_size_box: {
        click: e => {
          let t = e.target;
          if (!t.size) return;
          (0, _NyaPCore.toArray)($.danmaku_size_box.childNodes).forEach(sp => {
            if (NP._.danmakuSize === sp.size) sp.classList.remove('active');
          });
          t.classList.add('active');
          NP._.danmakuSize = t.size;
        }
      },
      danmaku_color_box: {
        click: e => {
          if (e.target.color) {
            $.danmaku_color.value = e.target.color;
            $.danmaku_color.dispatchEvent(new Event('change'));
          }
        }
      },
      NP: {
        danmakuFrameToggle: bool => NP._iconActive('danmakuToggle', bool),
        //listen danmakuToggle event to change button style
        playerModeChange: mode => {
          ['fullPage', 'fullScreen'].forEach(m => {
            NP._iconActive(m, mode === m);
          });
        }
      }
    };

    for (let eleid in $) {
      //add events to elements
      let eves = events[eleid];
      eves && (0, _NyaPCore.addEvents)($[eleid], eves);
    }

    if (NP._danmakuEnabled) {
      Number.isInteger(opt.defaultDanmakuMode) && $['icon_span_danmakuMode' + opt.defaultDanmakuMode].click(); //init to default danmaku mode

      typeof opt.defaultDanmakuSize === 'number' && (0, _NyaPCore.toArray)($.danmaku_size_box.childNodes).forEach(sp => {
        if (sp.size === opt.defaultDanmakuSize) sp.click();
      });
    }

    if (opt.playerFrame instanceof HTMLElement) opt.playerFrame.appendChild(NP.player);

    _licp.append(this.opt.loadingInfo.doneText);
  }

  _userActiveWatcher(active = false) {
    let delay = 5000,
        t = Date.now();

    if (active) {
      this.stats.lastUserActive = t;

      if (this.stats.userInactive) {
        this.stats.userInactive = false;
        this.player.classList.remove('user-inactive');
      }
    }

    if (this.stats.userActiveTimer) return;
    this.stats.userActiveTimer = setTimeout(() => {
      this.stats.userActiveTimer = 0;
      let now = Date.now();

      if (now - this.stats.lastUserActive < delay) {
        this._userActiveWatcher();
      } else {
        this.player.classList.add('user-inactive');
        this.stats.userInactive = true;
      }
    }, delay - t + this.stats.lastUserActive);
  }

  _iconActive(name, bool) {
    this.$[`icon_span_${name}`].classList[bool ? 'add' : 'remove']('active_icon');
  }

  _setTimeInfo(a = null, b = null) {
    requestAnimationFrame(() => {
      if (a !== null) {
        this.$.current_time.innerHTML = a;
      }

      if (b !== null) {
        this.$.total_time.innerHTML = b;
      }
    });
  }

  _playerKeyHandle(e) {
    //hot keys
    if (e.target.tagName === 'INPUT') return;
    const V = this.video,
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

  danmakuInput(bool = !this.$.danmaku_input_frame.offsetHeight) {
    let $ = this.$;
    $.danmaku_input_frame.style.display = bool ? 'flex' : '';

    this._iconActive('addDanmaku', bool);

    setImmediate(() => {
      bool ? $.danmaku_input.focus() : $.NyaP.focus();
    });
  }

  refreshProgress() {
    const c = this.$.progress;
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
    this.drawProgress();
    this.emit('progressRefresh');
  }

  send() {
    let color = this._.danmakuColor || this.opt.defaultDanmakuColor,
        text = this.$.danmaku_input.value,
        size = this._.danmakuSize,
        mode = this._.danmakuMode,
        time = this.danmakuFrame.time,
        d = {
      color,
      text,
      size,
      mode,
      time
    };
    let S = this.Danmaku.send(d, danmaku => {
      if (danmaku && danmaku._ === 'text') this.$.danmaku_input.value = '';
      danmaku.highlight = true;
      this.danmakuFrame.load(danmaku, true);

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
          c = this.$.progress,
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
      ctx.lineTo((0, _NyaPCore.limitIn)(this._.progressX, pad, pad + len), 15);
      ctx.stroke();
    }

    this._.drawingProgress = false;
  }

  drawProgress() {
    if (this._.drawingProgress) return;
    this._.drawingProgress = true;
    requestAnimationFrame(() => this._progressDrawer());
  }

  msg(text, type = 'tip') {
    //type:tip|info|error
    let msg = new MsgBox(text, type, this.$.msg_box);
    requestAnimationFrame(() => msg.show());
  }

}

class MsgBox {
  constructor(text, type, parentNode) {
    this.using = false;
    let msg = this.msg = (0, _Object2HTML.default)({
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
    this.timeout = setTimeout(() => this.remove(), time || Math.max((this.texts ? this.texts.length : 0) * 0.6 * 1000, 5000));
  }

  setText(text) {
    this.msg.innerHTML = '';
    let e = (0, _Object2HTML.default)(text);
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

    this.msg.parentNode && setTimeout(() => {
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

    setTimeout(() => {
      this.msg.parentNode && this.msg.parentNode.removeChild(this.msg);
    }, 600);
  }

}

window.NyaP = NyaP;

}).call(this,require("timers").setImmediate)

},{"../lib/Object2HTML/Object2HTML.js":1,"../lib/danmaku-frame/lib/ResizeSensor.js":2,"./NyaPCore.js":60,"./i18n.js":62,"core-js/modules/web.dom.iterable":56,"timers":58}],60:[function(require,module,exports){
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

require("core-js/modules/web.dom.iterable");

var _i18n = require("./i18n.js");

var _danmaku = _interopRequireDefault(require("./danmaku.js"));

var _Object2HTML = _interopRequireDefault(require("../lib/Object2HTML/Object2HTML.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _ = _i18n.i18n._; //default options

const NyaPCoreOptions = {
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
  danmakuSend: (d, callback) => {
    callback(false);
  },
  //the func for sending danmaku
  //for player
  source: (name, address, callback) => callback(name, address)
};

class NyaPEventEmitter {
  constructor() {
    this._events = {};
  }

  emit(e, ...arg) {
    this._resolve(e, ...arg);

    this.globalHandle(e, ...arg);
  }

  _resolve(e, ...arg) {
    if (e in this._events) {
      const hs = this._events[e];

      try {
        for (let h of hs) {
          if (h.apply(this, arg) === false) return;
        }
      } catch (e) {
        this.log('', 'error', e);
      }
    }
  }

  addEventListener(...args) {
    this.on(...args);
  }

  on(e, handle, top = false) {
    if (!(handle instanceof Function)) return;
    if (!(e in this._events)) this._events[e] = [];
    if (top) this._events[e].unshift(handle);else this._events[e].push(handle);
  }

  removeEvent(e, handle) {
    if (!(e in this._events)) return;

    if (arguments.length === 1) {
      delete this._events[e];
      return;
    }

    let ind;
    if (ind = this._events[e].indexOf(handle) >= 0) this._events[e].splice(ind, 1);
    if (this._events[e].length === 0) delete this._events[e];
  }

  globalHandle(name, ...arg) {} //所有事件会触发这个函数


  log() {}

}

class NyaPlayerCore extends NyaPEventEmitter {
  constructor(opt) {
    super();
    this.log('%c https://dev.tencent.com/u/luojia/p/NyaP/git ', 'log', "background:#6f8fa2;color:#ccc;padding:.3em");
    this.log('Language:' + _i18n.i18n.lang, 'debug');
    opt = this.opt = Object.assign({}, NyaPCoreOptions, opt);
    const $ = this.$ = {
      document,
      window,
      NP: this
    }; //for save elements that has an id

    this.plugins = {};
    this.stats = {};
    this.i18n = _i18n.i18n;
    this._ = {
      //for private variables
      video: (0, _Object2HTML.default)({
        _: 'video',
        attr: {
          id: 'main_video'
        }
      }),
      playerMode: 'normal'
    };
    this.videoFrame = (0, _Object2HTML.default)({
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
    this.collectEles(this.videoFrame);

    let _lilc = this.loadingInfo(_('Loading core'), true);

    if (this._danmakuEnabled) {
      this.danmakuContainer = (0, _Object2HTML.default)({
        _: 'div',
        prop: {
          id: 'danmaku_container'
        }
      });

      let _lildf = this.loadingInfo(_('Loading danmaku frame'), true);

      this.Danmaku = new _danmaku.default(this);
      this.videoFrame.insertBefore(this.danmakuContainer, $.loading_frame);
      this.collectEles(this.danmakuContainer);

      _lildf.append(this.opt.loadingInfo.doneText);
    }

    this._.loadingAnimeInterval = setInterval(() => {
      $.loading_anime.style.transform = "translate(" + rand(-20, 20) + "px," + rand(-20, 20) + "px) rotate(" + rand(-10, 10) + "deg)";
    }, 80); //options

    setTimeout(a => {
      ['muted', 'volume', 'loop'].forEach(o => {
        //dont change the order
        opt[o] !== undefined && (this.video[o] = opt[o]);
      });
    }, 0); //define events

    {
      //video:_loopChange
      let LoopDesc = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'loop');
      Object.defineProperty(this.video, 'loop', {
        get: LoopDesc.get,
        set: function (bool) {
          if (bool === this.loop) return;
          this.dispatchEvent(Object.assign(new Event('_loopChange'), {
            value: bool
          }));
          LoopDesc.set.call(this, bool);
        }
      });
    }
    addEvents(this.video, {
      loadedmetadata: e => {
        clearInterval(this._.loadingAnimeInterval);
        if ($.loading_frame.parentNode) //remove loading animation
          $.loading_frame.parentNode.removeChild($.loading_frame);
      },
      error: e => {
        clearInterval(this._.loadingAnimeInterval);
        loading_anime.style.transform = "";
        loading_anime.innerHTML = '(๑• . •๑)';
      }
    }); //define default video src handle

    this.on('setVideoSrc', src => {
      this.video.src = src;
      return false; //stop the event
    });
    if (opt.src) this.src = opt.src;
    this.on('coreLoad', () => {
      this.stats.coreLoaded = true;

      _lilc.append(this.opt.loadingInfo.doneText); //this.loadingInfo(_('Core loaded'));

    });

    if (Array.isArray(opt.plugins)) {
      //load plugins,opt.plugins is a list of url for plugins
      let _lilp = this.loadingInfo(_('Loading plugin'), true);

      let pluginList = [];

      for (let url of opt.plugins) {
        pluginList.push(this.loadPlugin(url));
      }

      Promise.all(pluginList).then(() => {
        _lilp.append(this.opt.loadingInfo.doneText);

        this.emit('coreLoad');
      }).catch(e => {
        this.log('', 'error', e);
        this.emit('coreLoadingError', e);
      });
      return;
    }

    this.emit('coreLoad');
  }

  playToggle(Switch = this.video.paused) {
    this.video[Switch ? 'play' : 'pause']();
  }

  loadingInfo(text, spliter = false) {
    let d = (0, _Object2HTML.default)({
      _: 'div',
      child: [text]
    });
    if (spliter) d.append(this.opt.loadingInfo.contentSpliter);
    this.$.loading_info.appendChild(d);
    return d;
  }

  collectEles(ele) {
    const $ = this.$;
    if (ele.id && !$[ele.id]) $[ele.id] = ele;
    toArray(ele.querySelectorAll('*')).forEach(e => {
      if (e.id && !$[e.id]) $[e.id] = e;
    });
  }

  playerMode(mode = 'normal') {
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

  isFullscreen() {
    const d = document;
    return (d.webkitFullscreenElement || d.msFullscreenElement || d.mozFullScreenElement || d.fullscreenElement) == this.player;
  }

  loadPlugin(url) {
    //load a js plugin for NyaP
    let p = fetch(url).then(res => res.text()).then(script => {
      'use strict';

      script = script.trim();
      let plugin = eval(script);
      if (typeof plugin.name !== 'string' || !plugin.name) throw new TypeError('Invalid plugin name');
      if (this.plugins[plugin.name]) throw `Plugin already loaded: ${plugin.name}`;
      this.plugins[plugin.name] = plugin;
      plugin.init(this);
      this.emit('pluginLoaded', plugin.name);
      return plugin.name;
    });
    p.catch(e => {
      this.log('pluginLoadingError', 'error', e);
      this.emit('pluginLoadingError', e);
    });
    return p;
  }

  log(content, type = 'log', ...styles) {
    console[type](`%c NyaP %c${content}`, "background:#e0e0e0;padding:.2em", "background:unset", ...styles);
  }

  get danmakuFrame() {
    return this.Danmaku.danmakuFrame;
  }

  get player() {
    return this._.player;
  }

  get video() {
    return this._.video;
  }

  get src() {
    return this.video.src;
  }

  set src(s) {
    s = s.trim();
    if (!this.stats.coreLoaded) this.on('coreLoad', () => {
      this.src = s;
    });else {
      this.emit('setVideoSrc', s);
    }
  }

  get TextDanmaku() {
    return this.danmakuFrame.modules.TextDanmaku;
  }

  get videoSize() {
    return [this.video.videoWidth, this.video.videoHeight];
  }

  get _danmakuEnabled() {
    return this.opt.enableDanmaku == true;
  }

} //other functions


exports.NyaPlayerCore = NyaPlayerCore;

function addEvents(target, events) {
  if (!Array.isArray(target)) target = [target];

  for (let e in events) e.split(/\,/g).forEach(function (e2) {
    target.forEach(function (t) {
      t.addEventListener(e2, events[e]);
    });
  });
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
  const d = document;
  (d.exitFullscreen || d.msExitFullscreen || d.mozCancelFullScreen || d.webkitCancelFullScreen).call(d);
}

function isFullscreen() {
  const d = document;
  return !!(d.fullscreen || d.mozFullScreen || d.webkitIsFullScreen || d.msFullscreenElement);
}

function formatTime(sec, total) {
  if (total == undefined) total = sec;
  let r,
      s = sec | 0,
      h = s / 3600 | 0;
  if (total >= 3600) s = s % 3600;
  r = [padTime(s / 60 | 0), padTime(s % 60)];
  total >= 3600 && r.unshift(h);
  return r.join(':');
}

function padTime(n) {
  //pad number to 2 chars
  return n > 9 && n || `0${n}`;
}

function setAttrs(ele, obj) {
  //set multi attrs to a Element
  for (let a in obj) ele.setAttribute(a, obj[a]);
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
  return [...obj];
} //Polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


if (!String.prototype.startsWith) String.prototype.startsWith = function (searchString, position = 0) {
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

  for (var i = a.length; i--;) r[i] = func ? func(a[i], i) : a[i];

  return r;
}; //Polyfill Number.isInteger

if (!Number.isInteger) Number.isInteger = function (v) {
  return (v | 0) === v;
};
var _default = NyaPlayerCore;
exports.default = _default;

},{"../lib/Object2HTML/Object2HTML.js":1,"./danmaku.js":61,"./i18n.js":62,"core-js/modules/web.dom.iterable":56}],61:[function(require,module,exports){
/*
Copyright luojia@luojia.me
LGPL license
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

var _danmakuFrame = require("../lib/danmaku-frame/src/danmaku-frame.js");

var _danmakuText = _interopRequireDefault(require("../lib/danmaku-text/src/danmaku-text.js"));

var _NyaPCore = require("./NyaPCore.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _danmakuText.default)(_danmakuFrame.DanmakuFrame, _danmakuFrame.DanmakuFrameModule); //init TextDanmaku mod

const colorChars = '0123456789abcdef';
const danmakuProp = ['color', 'text', 'size', 'mode', 'time'];

class Danmaku {
  constructor(core) {
    this.core = core;
    this.danmakuFrame = new _danmakuFrame.DanmakuFrame(core.danmakuContainer);

    if (core.opt.danmakuModule instanceof Array) {
      core.opt.danmakuModule.forEach(m => {
        this.initModule(m);
        this.danmakuFrame.enable(m);
      });
    }

    this.danmakuFrame.setMedia(core.video);
  }

  initModule(name) {
    return this.danmakuFrame.initModule(name, this.core.opt.danmakuModuleArg[name]);
  }

  load(obj) {
    return this.danmakuFrame.load(obj);
  }

  loadList(list) {
    this.danmakuFrame.loadList(list);
  }

  remove(obj) {
    this.danmakuFrame.unload(obj);
  }

  enable() {
    this.danmakuFrame.enable();
    this.core.emit('danmakuFrameToggle', name, this.module(name).enabled);
  }

  disable() {
    this.danmakuFrame.enable();
  }

  toggle(name, bool) {
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

  at(x, y) {
    return this.module('TextDanmaku').danmakuAt(x, y);
  }

  module(name) {
    return this.danmakuFrame.modules[name];
  }

  send(obj, callback) {
    for (let i of danmakuProp) if (i in obj === false) return false;

    if ((obj.text || '').match(/^\s*$/)) return false;
    obj.color = this.isVaildColor(obj.color);

    if (obj.color) {
      obj.color = obj.color.replace(/\$/g, () => {
        return colorChars[(0, _NyaPCore.limitIn)(16 * Math.random() | 0, 0, 15)];
      });
    } else {
      obj.color = null;
    }

    if (this.core.opt.danmakuSend instanceof Function) {
      this.core.opt.danmakuSend(obj, callback || (() => {}));
      return true;
    }

    return false;
  }

  isVaildColor(co) {
    if (typeof co !== 'string') return false;
    return (co = co.match(/^\#?(([\da-f\$]{3}){1,2})$/i)) ? co[1] : false;
  }

}

var _default = Danmaku;
exports.default = _default;

},{"../lib/danmaku-frame/src/danmaku-frame.js":3,"../lib/danmaku-text/src/danmaku-text.js":6,"./NyaPCore.js":60,"core-js/modules/web.dom.iterable":56}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i18n = void 0;

require("core-js/modules/web.dom.iterable");

/*
Copyright luojia@luojia.me
LGPL license
*/
const i18n = {
  lang: null,
  langs: {},
  _: (str, ...args) => {
    let s = i18n.lang && i18n.langs[i18n.lang][str] || str;
    args.length && args.forEach((arg, ind) => {
      s = s.replace(`$${ind}`, arg);
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

for (let lang of [...navigator.languages]) {
  if (i18n.langs[lang]) {
    i18n.lang = lang;
    break;
  }

  let code = lang.match(/^\w+/)[0];

  for (let cod in i18n.langs) {
    if (cod.startsWith(code)) {
      i18n.lang = cod;
      break;
    }
  }

  if (i18n.lang) break;
}

},{"core-js/modules/web.dom.iterable":56}]},{},[59])

//# sourceMappingURL=NyaP.50.js.map
