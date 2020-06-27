(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

_Object$defineProperty(exports, "NyaPlayerCore", {
  enumerable: true,
  get: function get() {
    return _core.NyaPlayerCore;
  }
});

_Object$defineProperty(exports, "DomTools", {
  enumerable: true,
  get: function get() {
    return _domTools.DomTools;
  }
});

_Object$defineProperty(exports, "i18n", {
  enumerable: true,
  get: function get() {
    return _i18n.i18n;
  }
});

_Object$defineProperty(exports, "Utils", {
  enumerable: true,
  get: function get() {
    return _utils.Utils;
  }
});

var _core = require("./src/core.js");

var _domTools = require("./src/domTools.js");

var _i18n = require("./src/i18n.js");

var _utils = require("./src/utils.js");

},{"./src/core.js":3,"./src/domTools.js":4,"./src/i18n.js":5,"./src/utils.js":6,"@babel/runtime-corejs3/core-js-stable/object/define-property":33}],2:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.Object2HTML = Object2HTML;
exports["default"] = void 0;

var _getIteratorMethod2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator-method"));

var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator"));

var _isIterable2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/is-iterable"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _iterator2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol/iterator"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/entries"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof _symbol["default"] === "undefined" || (0, _getIteratorMethod2["default"])(o) == null) {
    if ((0, _isArray["default"])(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e3) {
          throw _e3;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = (0, _getIterator2["default"])(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e4) {
      didErr = true;
      err = _e4;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  var _context;

  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = (0, _slice["default"])(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return (0, _from["default"])(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof _symbol["default"] === "undefined" || !(0, _isIterable2["default"])(Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = (0, _getIterator2["default"])(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if ((0, _isArray["default"])(arr)) return arr;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof _symbol["default"] === "function" && typeof _iterator2["default"] === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof _symbol["default"] === "function" && obj.constructor === _symbol["default"] && obj !== _symbol["default"].prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
/*
Copyright luojia@luojia.me
LGPL license
*/


function Object2HTML(obj, func) {
  var ele,
      o = {},
      a = [];
  if (obj === null || _typeof(obj) !== 'object') ele = document.createTextNode(String(obj)); //text node
  else if (obj instanceof Node) ele = obj;else {
      if (obj === undefined) throw new TypeError("'undefined' received, object or string expect.");
      if (!obj._) obj._ = 'div';
      ele || (ele = document.createElement(obj._)); //attributes

      for (var _i = 0, _Object$entries = (0, _entries["default"])(obj.attr || obj.a || o); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            attr = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        ele.setAttribute(attr, value);
      } //properties


      for (var _i2 = 0, _Object$entries3 = (0, _entries["default"])(obj.prop || obj.p || o); _i2 < _Object$entries3.length; _i2++) {
        var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i2], 2),
            prop = _Object$entries3$_i[0],
            _value = _Object$entries3$_i[1];

        ele[prop] = _value;
      } //events


      for (var _i3 = 0, _Object$entries4 = (0, _entries["default"])(obj.event || obj.e || o); _i3 < _Object$entries4.length; _i3++) {
        var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i3], 2),
            e = _Object$entries4$_i[0],
            cb = _Object$entries4$_i[1];

        ele.addEventListener(e, cb);
      } //childNodes


      var _iterator = _createForOfIteratorHelper(obj.child || obj.c || a),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var c = _step.value;

          var _e2 = Object2HTML(c, func);

          _e2 instanceof Node && ele.appendChild(_e2);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  func && func(ele);
  return ele;
}

var _default = Object2HTML;
exports["default"] = _default;

},{"@babel/runtime-corejs3/core-js-stable/array/from":16,"@babel/runtime-corejs3/core-js-stable/array/is-array":17,"@babel/runtime-corejs3/core-js-stable/instance/slice":25,"@babel/runtime-corejs3/core-js-stable/object/define-property":33,"@babel/runtime-corejs3/core-js-stable/object/entries":34,"@babel/runtime-corejs3/core-js-stable/symbol":44,"@babel/runtime-corejs3/core-js-stable/symbol/iterator":45,"@babel/runtime-corejs3/core-js/get-iterator":47,"@babel/runtime-corejs3/core-js/get-iterator-method":46,"@babel/runtime-corejs3/core-js/is-iterable":48,"core-js/modules/es.function.name":405,"core-js/modules/es.object.to-string":407,"core-js/modules/es.regexp.to-string":410,"core-js/modules/es.symbol":416,"core-js/modules/es.symbol.description":415}],3:[function(require,module,exports){
/*
Copyright luojia@luojia.me
LGPL license
*/
'use strict';

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.NyaPlayerCore = void 0;

var _iterator4 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol/iterator"));

var _create = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/create"));

var _construct = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/reflect/construct"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-prototype-of"));

var _setPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/set-prototype-of"));

var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/trim"));

var _sort = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/sort"));

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

require("regenerator-runtime/runtime");

var _now = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/date/now"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _getIteratorMethod2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator-method"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));

var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _i18n = require("./i18n.js");

var _domTools = require("./domTools.js");

var _utils = require("./utils.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof _symbol["default"] === "function" && typeof _iterator4["default"] === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof _symbol["default"] === "function" && obj.constructor === _symbol["default"] && obj !== _symbol["default"].prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    _promise["default"].resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new _promise["default"](function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = (0, _create["default"])(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = _setPrototypeOf2["default"] || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = (0, _construct["default"])(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !_construct["default"]) return false;
  if (_construct["default"].sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call((0, _construct["default"])(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = _setPrototypeOf2["default"] ? _getPrototypeOf2["default"] : function _getPrototypeOf(o) {
    return o.__proto__ || (0, _getPrototypeOf2["default"])(o);
  };
  return _getPrototypeOf(o);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _Object$defineProperty2(obj, key, {
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

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof _symbol["default"] === "undefined" || (0, _getIteratorMethod2["default"])(o) == null) {
    if ((0, _isArray["default"])(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = (0, _getIterator2["default"])(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _unsupportedIterableToArray(o, minLen) {
  var _context5;

  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = (0, _slice["default"])(_context5 = Object.prototype.toString.call(o)).call(_context5, 8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return (0, _from["default"])(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    (0, _defineProperty2["default"])(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
} //default options


var NyaPCoreOptions = {
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

var NyaPEventEmitter = /*#__PURE__*/function () {
  function NyaPEventEmitter() {
    _classCallCheck(this, NyaPEventEmitter);

    this._events = {};
  }

  _createClass(NyaPEventEmitter, [{
    key: "emit",
    value: function emit(e) {
      var _context, _context2;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this._resolve.apply(this, (0, _concat["default"])(_context = [e]).call(_context, args));

      this.globalListener.apply(this, (0, _concat["default"])(_context2 = [e]).call(_context2, args));
      return this;
    }
  }, {
    key: "_resolve",
    value: function _resolve(e) {
      if (e in this._events) {
        var hs = this._events[e];

        try {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          var _iterator = _createForOfIteratorHelper(hs),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var h = _step.value;
              if (h.apply(this, args) === false) return;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } catch (err) {
          console.error("NyaP event callback error for \"".concat(e, "\""), err);
        }
      }
    }
  }, {
    key: "addEventListener",
    value: function addEventListener() {
      return this.on.apply(this, arguments);
    }
  }, {
    key: "on",
    value: function on(e, handle) {
      var top = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (!(handle instanceof Function)) return this;
      if (!(e in this._events)) this._events[e] = [];
      if (top) this._events[e].unshift(handle);else this._events[e].push(handle);
      return this;
    }
  }, {
    key: "removeEvent",
    value: function removeEvent(e, handle) {
      var _context3, _context4;

      if (!(e in this._events)) return this;

      if (arguments.length === 1) {
        delete this._events[e];
        return this;
      }

      var ind;
      if (ind = (0, _indexOf["default"])(_context3 = this._events[e]).call(_context3, handle) >= 0) (0, _splice["default"])(_context4 = this._events[e]).call(_context4, ind, 1);
      if (this._events[e].length === 0) delete this._events[e];
      return this;
    }
  }, {
    key: "globalListener",
    value: function globalListener(name) {} //all events will be passed to this function

  }]);

  return NyaPEventEmitter;
}();

var NyaPlayerCore = /*#__PURE__*/function (_NyaPEventEmitter) {
  _inherits(NyaPlayerCore, _NyaPEventEmitter);

  var _super = _createSuper(NyaPlayerCore);

  _createClass(NyaPlayerCore, [{
    key: "video",
    //stats of the player. Item: [[time,name,promise or result],...]
    //debug messages. Item: [[time,...msgs],...]
    //loaded core plugins. name=>plugin object
    //core i18n instanse
    get: function get() {
      return this._.video;
    } //get video element

  }, {
    key: "videoSize",
    get: function get() {
      return [this.video.videoWidth, this.video.videoHeight];
    }
  }, {
    key: "videoSrc",
    get: function get() {
      return this._.videoSrc;
    } //get current video src

  }]);

  function NyaPlayerCore(opt) {
    var _this;

    _classCallCheck(this, NyaPlayerCore);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "stats", []);

    _defineProperty(_assertThisInitialized(_this), "debugs", []);

    _defineProperty(_assertThisInitialized(_this), "plugins", {});

    _defineProperty(_assertThisInitialized(_this), "i18n", new _i18n.i18n());

    _defineProperty(_assertThisInitialized(_this), "_", {
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

    var _ = _this.i18n;
    {
      var done = _this.stat('loading_core');

      _this.on('coreLoad', function () {
        return done();
      });

      _this.on('coreLoadError', function (e) {
        return done(e);
      });
    }

    _this.debug('Languages:' + _this.i18n.langsArr.join(','));

    opt = _this.opt = _utils.Utils.deepAssign({}, NyaPCoreOptions, opt); //add events

    {
      //video:video_loopChange
      var LoopDesc = (0, _getOwnPropertyDescriptor["default"])(HTMLMediaElement.prototype, 'loop');
      (0, _defineProperty2["default"])(_this.video, 'loop', {
        get: LoopDesc.get,
        set: function set(bool) {
          if (bool === _this.video.loop) return;

          _this.emit('video_loopChange', bool);

          LoopDesc.set.call(_this.video, bool);
        }
      });
    }
    ;

    _domTools.DomTools.addEvents(_this.video, {
      loadedmetadata: function loadedmetadata(e) {
        return _this.debug('Video loadded');
      },
      error: function error(e) {
        return _this.debug('Video error:', e);
      },
      loadstart: function loadstart(e) {
        _this.stat('loading_video');
      }
    }); //define default src resolver


    _this.addURLResolver(function (url) {
      return _promise["default"].resolve(url); //return the url
    }, 999); //most lower priority

    /*opts*/


    requestAnimationFrame(function () {
      var _context6; //active after events are attached


      (0, _forEach["default"])(_context6 = ['muted', 'volume', 'loop']).call(_context6, function (o) {
        //dont change the order
        opt[o] !== undefined && (_this.video[o] = opt[o]);
      });
      if (opt.videoSrc) _this.setVideoSrc(opt.videoSrc); //videoSrc
    });

    if ((0, _isArray["default"])(opt.plugins)) {
      //load plugins,opt.plugins is a list of url for plugins
      var _done = _this.stat('loading_plugin');

      var pluginList = [];

      var _iterator2 = _createForOfIteratorHelper(opt.plugins),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var url = _step2.value;
          pluginList.push(_this.loadPlugin(url));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      _promise["default"].all(pluginList).then(function () {
        _done();

        _this.emit('coreLoad');
      })["catch"](function (e) {
        _done(e);

        _this.debug('coreLoadError', e);

        _this.emit('coreLoadError', e);
      });

      return _possibleConstructorReturn(_this);
    }

    _this.emit('coreLoad');

    return _this;
  }

  _createClass(NyaPlayerCore, [{
    key: "stat",
    value: function stat(statusName, cb) {
      var _this2 = this;

      var doneFunc, failFunc;

      var resultFunc = function resultFunc(r) {
        if (r instanceof Error) {
          _this2.debug(r);

          failFunc(r.message);
        } else {
          doneFunc(r);
        }
      };

      var p = new _promise["default"](function (ok, no) {
        doneFunc = ok;
        failFunc = no;
      });
      p["catch"](function (e) {
        _this2.debug("fail stat:".concat(e));
      });
      var s = [(0, _now["default"])(), statusName, p, doneFunc, failFunc];
      this.stats.push(s); //add to core debug log

      if (cb) {
        _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
          return _regenerator["default"].wrap(function _callee$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.prev = 0;
                  _context7.t0 = resultFunc;
                  _context7.next = 4;
                  return cb();

                case 4:
                  _context7.t1 = _context7.sent;
                  (0, _context7.t0)(_context7.t1);
                  _context7.next = 11;
                  break;

                case 8:
                  _context7.prev = 8;
                  _context7.t2 = _context7["catch"](0);
                  resultFunc(_context7.t2);

                case 11:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee, null, [[0, 8]]);
        }))();
      }

      (0, _setTimeout2["default"])(function () {
        return _this2.emit('stat', s);
      }, 0);
      return resultFunc;
    }
  }, {
    key: "statResult",
    value: function statResult(statusName, result) {
      for (var i = this.stats.length, s; i--;) {
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
  }, {
    key: "addURLResolver",
    value: function addURLResolver(func) {
      var _context8;

      var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._.urlResolvers.push([priority, func]);

      (0, _sort["default"])(_context8 = this._.urlResolvers).call(_context8, function (a, b) {
        return a[0] - b[0];
      }); //sort by priority
    }
  }, {
    key: "resolveURL",
    value: function () {
      var _resolveURL = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(url) {
        var _iterator3, _step3, n, func, r;

        return _regenerator["default"].wrap(function _callee2$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                //resolve the url by url resolvers
                _iterator3 = _createForOfIteratorHelper(this._.urlResolvers);
                _context9.prev = 1;

                _iterator3.s();

              case 3:
                if ((_step3 = _iterator3.n()).done) {
                  _context9.next = 17;
                  break;
                }

                n = _step3.value;
                func = n[1];
                _context9.next = 8;
                return func(url);

              case 8:
                r = _context9.sent;

                if (!(r === false)) {
                  _context9.next = 12;
                  break;
                }

                this.debug("Stop resolving url: ".concat(url));
                return _context9.abrupt("return", false);

              case 12:
                if (!r) {
                  _context9.next = 15;
                  break;
                }

                this.debug('URL resolver: [' + url + '] => [' + r + ']');
                return _context9.abrupt("return", r);

              case 15:
                _context9.next = 3;
                break;

              case 17:
                _context9.next = 22;
                break;

              case 19:
                _context9.prev = 19;
                _context9.t0 = _context9["catch"](1);

                _iterator3.e(_context9.t0);

              case 22:
                _context9.prev = 22;

                _iterator3.f();

                return _context9.finish(22);

              case 25:
                return _context9.abrupt("return", _promise["default"].reject('No url resolver hit'));

              case 26:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee2, this, [[1, 19, 22, 25]]);
      }));

      function resolveURL(_x) {
        return _resolveURL.apply(this, arguments);
      }

      return resolveURL;
    }()
  }, {
    key: "setVideoSrc",
    value: function () {
      var _setVideoSrc = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3(s) {
        var url;
        return _regenerator["default"].wrap(function _callee3$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                s = (0, _trim["default"])(s).call(s);
                _context10.next = 3;
                return this.resolveURL(s);

              case 3:
                url = _context10.sent;

                if (!(url === false)) {
                  _context10.next = 6;
                  break;
                }

                return _context10.abrupt("return");

              case 6:
                //won't change the url if false returned
                this._.videoSrc = s;
                this.emit('srcChanged', s);
                this.video.src = url;
                return _context10.abrupt("return");

              case 10:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee3, this);
      }));

      function setVideoSrc(_x2) {
        return _setVideoSrc.apply(this, arguments);
      }

      return setVideoSrc;
    }()
  }, {
    key: "playToggle",
    value: function playToggle() {
      var Switch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.video.paused;
      return this.video[Switch ? 'play' : 'pause']();
    }
  }, {
    key: "loadPlugin",
    value: function loadPlugin(url, name) {
      var _this3 = this; //load js plugins for NyaP


      if (name && this.plugins[name]) {
        //check if exists
        this.debug("Plugin already loaded: ".concat(name));
        return this.plugins[name];
      }

      var p = fetch(url).then(function (res) {
        return res.text();
      }).then( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(script) {
          var plugin;
          return _regenerator["default"].wrap(function _callee4$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  script = (0, _trim["default"])(script).call(script);
                  plugin = eval(script);

                  if (!(typeof plugin.name !== 'string' || !plugin.name)) {
                    _context11.next = 4;
                    break;
                  }

                  throw new TypeError('Invalid plugin name');

                case 4:
                  if (!_this3.plugins[plugin.name]) {
                    _context11.next = 7;
                    break;
                  } //check if exists


                  _this3.debug("Plugin already loaded: ".concat(plugin.name));

                  return _context11.abrupt("return", plugin);

                case 7:
                  if (!(typeof plugin.init === 'function')) {
                    _context11.next = 10;
                    break;
                  }

                  _context11.next = 10;
                  return plugin.init(_this3);

                case 10:
                  //init the plugin
                  _this3.plugins[plugin.name] = plugin;

                  _this3.debug('Plugin loaded', plugin.name);

                  return _context11.abrupt("return", plugin);

                case 13:
                case "end":
                  return _context11.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x3) {
          return _ref2.apply(this, arguments);
        };
      }());
      p["catch"](function (e) {
        _this3.debug('Plugin loading error:', e); // this.emit('pluginLoadError',e);

      });
      return p;
    }
  }, {
    key: "log",
    value: function log(content) {
      var _console, _context12;

      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'log';

      for (var _len3 = arguments.length, styles = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        styles[_key3 - 2] = arguments[_key3];
      } //log to console


      (_console = console)[type].apply(_console, (0, _concat["default"])(_context12 = ["%c NyaP %c".concat(content), "background:#e0e0e0;padding:.2em", "background:unset"]).call(_context12, styles));
    }
  }, {
    key: "debug",
    value: function debug() {
      var _console2, _context13;

      for (var _len4 = arguments.length, msg = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        msg[_key4] = arguments[_key4];
      } //debug messages


      (_console2 = console).debug.apply(_console2, (0, _concat["default"])(_context13 = ['NyaP[debug]']).call(_context13, msg));

      msg.unshift((0, _now["default"])());
      this.debugs.push(msg);
      this.emit('debug', msg);
    }
  }]);

  return NyaPlayerCore;
}(NyaPEventEmitter);

exports.NyaPlayerCore = NyaPlayerCore;

_defineProperty(NyaPlayerCore, "i18n", _i18n.i18n);

_defineProperty(NyaPlayerCore, "Utils", _utils.Utils);

_defineProperty(NyaPlayerCore, "DomTools", _domTools.DomTools);

_defineProperty(NyaPlayerCore, "NyaPCoreOptions", NyaPCoreOptions);

},{"./domTools.js":4,"./i18n.js":5,"./utils.js":6,"@babel/runtime-corejs3/core-js-stable/array/from":16,"@babel/runtime-corejs3/core-js-stable/array/is-array":17,"@babel/runtime-corejs3/core-js-stable/date/now":18,"@babel/runtime-corejs3/core-js-stable/instance/concat":20,"@babel/runtime-corejs3/core-js-stable/instance/for-each":23,"@babel/runtime-corejs3/core-js-stable/instance/index-of":24,"@babel/runtime-corejs3/core-js-stable/instance/slice":25,"@babel/runtime-corejs3/core-js-stable/instance/sort":26,"@babel/runtime-corejs3/core-js-stable/instance/splice":27,"@babel/runtime-corejs3/core-js-stable/instance/trim":29,"@babel/runtime-corejs3/core-js-stable/object/create":32,"@babel/runtime-corejs3/core-js-stable/object/define-property":33,"@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor":35,"@babel/runtime-corejs3/core-js-stable/object/get-prototype-of":36,"@babel/runtime-corejs3/core-js-stable/object/set-prototype-of":37,"@babel/runtime-corejs3/core-js-stable/promise":38,"@babel/runtime-corejs3/core-js-stable/reflect/construct":39,"@babel/runtime-corejs3/core-js-stable/set-timeout":43,"@babel/runtime-corejs3/core-js-stable/symbol":44,"@babel/runtime-corejs3/core-js-stable/symbol/iterator":45,"@babel/runtime-corejs3/core-js/get-iterator":47,"@babel/runtime-corejs3/core-js/get-iterator-method":46,"@babel/runtime-corejs3/regenerator":49,"core-js/modules/es.array.iterator":403,"core-js/modules/es.array.join":404,"core-js/modules/es.function.name":405,"core-js/modules/es.object.to-string":407,"core-js/modules/es.promise":408,"core-js/modules/es.regexp.to-string":410,"core-js/modules/es.string.iterator":411,"core-js/modules/es.symbol":416,"core-js/modules/es.symbol.description":415,"core-js/modules/web.dom-collections.iterator":442,"regenerator-runtime/runtime":443}],4:[function(require,module,exports){
"use strict";

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.split");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.DomTools = void 0;

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator"));

var _getIteratorMethod2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator-method"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));

var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _resizeObserver = require("@juggle/resize-observer");

var _Object2HTML = require("../lib/Object2HTML.js");

var _utils = require("./utils.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof _symbol["default"] === "undefined" || (0, _getIteratorMethod2["default"])(o) == null) {
    if ((0, _isArray["default"])(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = (0, _getIterator2["default"])(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _unsupportedIterableToArray(o, minLen) {
  var _context2;

  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = (0, _slice["default"])(_context2 = Object.prototype.toString.call(o)).call(_context2, 8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return (0, _from["default"])(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    (0, _defineProperty2["default"])(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2["default"])(obj, key, {
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

var DomTools = /*#__PURE__*/function () {
  function DomTools() {
    _classCallCheck(this, DomTools);
  }

  _createClass(DomTools, null, [{
    key: "addEvents",
    value: function addEvents(target, events) {
      if (!(0, _isArray["default"])(target)) target = [target];
      (0, _forEach["default"])(target).call(target, function (t) {
        if (!_utils.Utils.isObject(t.__NyaPEvents__)) {
          t.__NyaPEvents__ = [];
        }

        var _loop = function _loop(e) {
          var _context;

          (0, _forEach["default"])(_context = e.split(/\,/g)).call(_context, function (e2) {
            t.addEventListener(e2, events[e]);

            t.__NyaPEvents__.push([e2, events[e]]);
          });
        };

        for (var e in events) {
          _loop(e);
        }
      });
    }
  }, {
    key: "setAttrs",
    value: function setAttrs(ele, obj) {
      //set multi attrs to a Element
      for (var a in obj) {
        ele.setAttribute(a, obj[a]);
      }

      return ele;
    }
  }, {
    key: "fullscreenElement",
    value: function fullscreenElement() {
      var d = document;
      return d.webkitFullscreenElement || d.msFullscreenElement || d.mozFullScreenElement || d.fullscreenElement;
    }
  }, {
    key: "requestFullscreen",
    value: function requestFullscreen() {
      var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

      try {
        return (d.requestFullscreen || d.msRequestFullscreen || d.mozRequestFullScreen || d.webkitRequestFullScreen || d.webkitEnterFullScreen).call(d);
      } catch (e) {
        return _promise["default"].reject(e);
      }
    }
  }, {
    key: "exitFullscreen",
    value: function exitFullscreen() {
      var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

      try {
        return (d.exitFullscreen || d.msExitFullscreen || d.mozCancelFullScreen || d.webkitExitFullScreen || d.webkitCancelFullScreen).call(d);
      } catch (e) {
        return _promise["default"].reject(e);
      }
    }
  }, {
    key: "isFullscreen",
    value: function isFullscreen() {
      var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
      return !!(d.fullscreen || d.mozFullScreen || d.webkitIsFullScreen || d.msFullscreenElement || d.webkitDisplayingFullscreen);
    }
  }, {
    key: "Object2HTML",
    value: function Object2HTML() {
      return _Object2HTML.Object2HTML.apply(void 0, arguments);
    }
  }]);

  return DomTools;
}();

exports.DomTools = DomTools;

_defineProperty(DomTools, "resizeEvent", {
  resizeObserverInstance: null,
  observe: function observe(dom) {
    if (!this.resizeObserverInstance) {
      var ResizeObserver = window.ResizeObserver;

      if (typeof ResizeObserver !== 'function') {
        ResizeObserver = _resizeObserver.ResizeObserver;
      }

      this.resizeObserverInstance = new ResizeObserver(function (entries) {
        var _iterator = _createForOfIteratorHelper(entries),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;
            var el = entry.target;
            var e = new Event('resize', {
              bubbles: false,
              cancelable: true
            });
            e.contentRect = entry.contentRect;
            el.dispatchEvent(e);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
    }

    this.resizeObserverInstance.observe(dom);
  },
  unobserve: function unobserve(dom) {
    if (!this.resizeObserverInstance) throw new Error('resizeObserver not initialized');
    this.resizeObserverInstance.unobserve(dom);
  }
});

},{"../lib/Object2HTML.js":2,"./utils.js":6,"@babel/runtime-corejs3/core-js-stable/array/from":16,"@babel/runtime-corejs3/core-js-stable/array/is-array":17,"@babel/runtime-corejs3/core-js-stable/instance/for-each":23,"@babel/runtime-corejs3/core-js-stable/instance/slice":25,"@babel/runtime-corejs3/core-js-stable/object/define-property":33,"@babel/runtime-corejs3/core-js-stable/promise":38,"@babel/runtime-corejs3/core-js-stable/symbol":44,"@babel/runtime-corejs3/core-js/get-iterator":47,"@babel/runtime-corejs3/core-js/get-iterator-method":46,"@juggle/resize-observer":50,"core-js/modules/es.function.name":405,"core-js/modules/es.object.to-string":407,"core-js/modules/es.promise":408,"core-js/modules/es.regexp.exec":409,"core-js/modules/es.regexp.to-string":410,"core-js/modules/es.string.split":414}],5:[function(require,module,exports){
"use strict";

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.i18n = void 0;

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator"));

var _getIteratorMethod2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator-method"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));

var _isIterable2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/is-iterable"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/assign"));

var _startsWith = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/starts-with"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof _symbol["default"] === "undefined" || (0, _getIteratorMethod2["default"])(o) == null) {
    if ((0, _isArray["default"])(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = (0, _getIterator2["default"])(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  var _context;

  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = (0, _slice["default"])(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return (0, _from["default"])(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof _symbol["default"] !== "undefined" && (0, _isIterable2["default"])(Object(iter))) return (0, _from["default"])(iter);
}

function _arrayWithoutHoles(arr) {
  if ((0, _isArray["default"])(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    (0, _defineProperty2["default"])(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2["default"])(obj, key, {
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
/*
Copyright luojia@luojia.me
LGPL license
*/
//polyfill


if (!navigator.languages) {
  navigator.languages = [navigator.language || navigator.browserLanguage];
}

var i18n = /*#__PURE__*/function () {
  /*
  *@param{object}langs Language text object indexed by language code
  *@param{array}langsArr Language priority array
  */
  function i18n() {
    var langs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var langsArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _toConsumableArray(navigator.languages);

    _classCallCheck(this, i18n);

    _defineProperty(this, "langsArr", []);

    this.langs = langs; //defines texts

    this.langsArr = langsArr;
    this.langsArr.push('zh-CN'); //add zh-CN as default language
  }

  _createClass(i18n, [{
    key: "_",
    //language priority array
    value: function _(str) {
      //translate
      var s = this.findTranslation(str);

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      args.length && (0, _forEach["default"])(args).call(args, function (arg, ind) {
        s = s.replace("$".concat(ind), arg);
      }); //fill args in the string

      return s;
    }
  }, {
    key: "findTranslation",
    value: function findTranslation(text) {
      var _iterator = _createForOfIteratorHelper(this.langsArr),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var lang = _step.value; //find by language priority

          if (lang in this.langs && text in this.langs[lang]) {
            return this.langs[lang][text];
          } //fallback to other same main code


          var code = lang.match(/^\w+/)[0];

          for (var c in this.langs) {
            if ((0, _startsWith["default"])(c).call(c, code) && text in this.langs[c]) {
              return this.langs[c][text];
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return text;
    }
  }, {
    key: "add",
    value: function add(langCode, texts) {
      if (!this.langs[langCode]) this.langs[langCode] = {};
      (0, _assign["default"])(this.langs[langCode], texts);
    }
  }]);

  return i18n;
}();

exports.i18n = i18n;

},{"@babel/runtime-corejs3/core-js-stable/array/from":16,"@babel/runtime-corejs3/core-js-stable/array/is-array":17,"@babel/runtime-corejs3/core-js-stable/instance/for-each":23,"@babel/runtime-corejs3/core-js-stable/instance/slice":25,"@babel/runtime-corejs3/core-js-stable/instance/starts-with":28,"@babel/runtime-corejs3/core-js-stable/object/assign":31,"@babel/runtime-corejs3/core-js-stable/object/define-property":33,"@babel/runtime-corejs3/core-js-stable/symbol":44,"@babel/runtime-corejs3/core-js/get-iterator":47,"@babel/runtime-corejs3/core-js/get-iterator-method":46,"@babel/runtime-corejs3/core-js/is-iterable":48,"core-js/modules/es.function.name":405,"core-js/modules/es.object.to-string":407,"core-js/modules/es.regexp.exec":409,"core-js/modules/es.regexp.to-string":410,"core-js/modules/es.string.match":412,"core-js/modules/es.string.replace":413}],6:[function(require,module,exports){
"use strict";

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.join");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.Utils = void 0;

var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));

var _isIterable2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/is-iterable"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _iterator = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol/iterator"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));

var _setImmediate2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-immediate"));

var _bind = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/bind"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _window$requestIdleCa;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  var _context3;

  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = (0, _slice["default"])(_context3 = Object.prototype.toString.call(o)).call(_context3, 8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return (0, _from["default"])(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof _symbol["default"] !== "undefined" && (0, _isIterable2["default"])(Object(iter))) return (0, _from["default"])(iter);
}

function _arrayWithoutHoles(arr) {
  if ((0, _isArray["default"])(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof _symbol["default"] === "function" && typeof _iterator["default"] === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof _symbol["default"] === "function" && obj.constructor === _symbol["default"] && obj !== _symbol["default"].prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    (0, _defineProperty2["default"])(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2["default"])(obj, key, {
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

function padTime(n) {
  //pad number to 2 chars
  return n > 9 && n || "0".concat(n);
}

var Utils = /*#__PURE__*/function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "clamp",
    value: function clamp(num, min, max) {
      return num < min ? min : num > max ? max : num;
    }
  }, {
    key: "isObject",
    value: function isObject(obj) {
      return Object.prototype.toString.call(obj) === '[object Object]';
    }
  }, {
    key: "deepAssign",
    value: function deepAssign(target) {
      var _context2;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      } //本函数不处理循环引用


      var obj = args.shift();

      if (target === null || target === undefined || _typeof(target) !== 'object') {
        throw new TypeError('target should be an object');
      }

      if (!Utils.isObject(obj)) {
        var _context; //obj不是对象则跳过


        if (args.length === 0) return target; //没有参数了就返回结果

        return Utils.deepAssign.apply(Utils, (0, _concat["default"])(_context = [target]).call(_context, args)); //提取一个参数出来继续
      }

      for (var i in obj) {
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
      return Utils.deepAssign.apply(Utils, (0, _concat["default"])(_context2 = [target]).call(_context2, args));
    }
  }, {
    key: "formatTime",
    value: function formatTime(sec, total) {
      if (total == undefined) total = sec;
      var r,
          s = sec | 0,
          h = s / 3600 | 0;
      if (total >= 3600) s = s % 3600;
      r = [padTime(s / 60 | 0), padTime(s % 60)];
      total >= 3600 && r.unshift(h);
      return r.join(':');
    }
  }, {
    key: "rand",
    value: function rand(min, max) {
      return min + Math.random() * (max - min) + 0.5 | 0;
    }
  }, {
    key: "toArray",
    value: function toArray(obj) {
      if (obj instanceof Array) return (0, _slice["default"])(obj).call(obj);
      if (obj.length !== undefined) return (0, _slice["default"])(Array.prototype).call(obj);
      return _toConsumableArray(obj);
    }
  }, {
    key: "animationFrameLoop",
    value: function animationFrameLoop(cb) {
      requestAnimationFrame(function () {
        if (cb() === false) return;
        ;
        Utils.animationFrameLoop(cb);
      });
    }
  }]);

  return Utils;
}();

exports.Utils = Utils;

_defineProperty(Utils, "requestIdleCallback", ((_window$requestIdleCa = window.requestIdleCallback) === null || _window$requestIdleCa === void 0 ? void 0 : (0, _bind["default"])(_window$requestIdleCa).call(_window$requestIdleCa, window)) || _setImmediate2["default"]);

},{"@babel/runtime-corejs3/core-js-stable/array/from":16,"@babel/runtime-corejs3/core-js-stable/array/is-array":17,"@babel/runtime-corejs3/core-js-stable/instance/bind":19,"@babel/runtime-corejs3/core-js-stable/instance/concat":20,"@babel/runtime-corejs3/core-js-stable/instance/slice":25,"@babel/runtime-corejs3/core-js-stable/object/define-property":33,"@babel/runtime-corejs3/core-js-stable/set-immediate":41,"@babel/runtime-corejs3/core-js-stable/symbol":44,"@babel/runtime-corejs3/core-js-stable/symbol/iterator":45,"@babel/runtime-corejs3/core-js/is-iterable":48,"core-js/modules/es.array.join":404,"core-js/modules/es.function.name":405,"core-js/modules/es.object.to-string":407,"core-js/modules/es.regexp.to-string":410,"core-js/modules/es.symbol":416,"core-js/modules/es.symbol.description":415}],7:[function(require,module,exports){
/*
Copyright luojia@luojia.me
LGPL license
*/
'use strict';

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _iterator2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol/iterator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _getIteratorMethod2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator-method"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));

var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _get2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/reflect/get"));

var _defineProperty = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _create = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/create"));

var _construct = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/reflect/construct"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-prototype-of"));

var _setPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/set-prototype-of"));

var _index = require("../NyaP-Core/index.js");

var _danmakuFrame = require("./src/danmaku-frame.js");

var _danmakuText = _interopRequireDefault(require("./src/danmaku-text/danmaku-text.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof _symbol["default"] === "function" && typeof _iterator2["default"] === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof _symbol["default"] === "function" && obj.constructor === _symbol["default"] && obj !== _symbol["default"].prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof _symbol["default"] === "undefined" || (0, _getIteratorMethod2["default"])(o) == null) {
    if ((0, _isArray["default"])(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = (0, _getIterator2["default"])(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _unsupportedIterableToArray(o, minLen) {
  var _context;

  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = (0, _slice["default"])(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return (0, _from["default"])(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && _get2["default"]) {
    _get = _get2["default"];
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = (0, _getOwnPropertyDescriptor["default"])(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    (0, _defineProperty["default"])(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = (0, _create["default"])(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = _setPrototypeOf2["default"] || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = (0, _construct["default"])(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !_construct["default"]) return false;
  if (_construct["default"].sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call((0, _construct["default"])(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = _setPrototypeOf2["default"] ? _getPrototypeOf2["default"] : function _getPrototypeOf(o) {
    return o.__proto__ || (0, _getPrototypeOf2["default"])(o);
  };
  return _getPrototypeOf(o);
}

(0, _danmakuText["default"])(_danmakuFrame.DanmakuFrame); //init TextDanmaku mod

var colorChars = '0123456789abcdef';
var danmakuProp = ['color', 'text', 'size', 'mode', 'time'];

var NyaPDanmaku = /*#__PURE__*/function (_DanmakuFrame) {
  _inherits(NyaPDanmaku, _DanmakuFrame);

  var _super = _createSuper(NyaPDanmaku);

  _createClass(NyaPDanmaku, [{
    key: "opt",
    get: function get() {
      return this.core.opt.danmaku;
    }
  }]);

  function NyaPDanmaku(core) {
    var _this;

    _classCallCheck(this, NyaPDanmaku);

    _this = _super.call(this, core, core.opt.danmaku); //init mods

    for (var mod in _danmakuFrame.DanmakuFrame.availableModules) {
      var _this$opt$modules$mod;

      if (((_this$opt$modules$mod = _this.opt.modules[mod]) === null || _this$opt$modules$mod === void 0 ? void 0 : _this$opt$modules$mod.enable) === true) _this.initModule(mod);

      _this.enable(mod);
    }

    _this.setMedia(core.video);

    return _this;
  }

  _createClass(NyaPDanmaku, [{
    key: "toggle",
    value: function toggle(name, bool) {
      if (typeof name === 'boolean' || name == undefined) {
        //danmaku frame switch mode
        bool = name != undefined ? name : !this.enabled;
        this[bool ? 'enable' : 'disable']();
        return bool;
      }

      try {
        var _this$module; //module switch mode


        if (bool == undefined) bool = !this.module(name).enabled;
        this[bool ? 'enable' : 'disable'](name);
        this.core.emit('danmakuModuleToggle', name, (_this$module = this.module(name)) === null || _this$module === void 0 ? void 0 : _this$module.enabled);
      } catch (e) {
        this.core.log('', 'error', e);
        return false;
      }

      return true;
    }
  }, {
    key: "module",
    value: function module(name) {
      return _get(_getPrototypeOf(NyaPDanmaku.prototype), "modules", this)[name];
    }
  }, {
    key: "send",
    value: function send(obj, callback) {
      var _iterator = _createForOfIteratorHelper(danmakuProp),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var i = _step.value;
          if (i in obj === false) return false;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if ((obj.text || '').match(/^\s*$/)) return false;
      obj.color = this.isVaildColor(obj.color);

      if (obj.color) {
        obj.color = obj.color.replace(/\$/g, function () {
          return colorChars[_index.Utils.clamp(16 * Math.random() | 0, 0, 15)];
        });
      } else {
        obj.color = null;
      }

      if (this.opt.send instanceof Function) {
        this.opt.send(obj, callback || function () {});
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

  return NyaPDanmaku;
}(_danmakuFrame.DanmakuFrame);

var _default = NyaPDanmaku;
exports["default"] = _default;

},{"../NyaP-Core/index.js":1,"./src/danmaku-frame.js":9,"./src/danmaku-text/danmaku-text.js":14,"@babel/runtime-corejs3/core-js-stable/array/from":16,"@babel/runtime-corejs3/core-js-stable/array/is-array":17,"@babel/runtime-corejs3/core-js-stable/instance/slice":25,"@babel/runtime-corejs3/core-js-stable/object/create":32,"@babel/runtime-corejs3/core-js-stable/object/define-property":33,"@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor":35,"@babel/runtime-corejs3/core-js-stable/object/get-prototype-of":36,"@babel/runtime-corejs3/core-js-stable/object/set-prototype-of":37,"@babel/runtime-corejs3/core-js-stable/reflect/construct":39,"@babel/runtime-corejs3/core-js-stable/reflect/get":40,"@babel/runtime-corejs3/core-js-stable/symbol":44,"@babel/runtime-corejs3/core-js-stable/symbol/iterator":45,"@babel/runtime-corejs3/core-js/get-iterator":47,"@babel/runtime-corejs3/core-js/get-iterator-method":46,"core-js/modules/es.function.name":405,"core-js/modules/es.object.to-string":407,"core-js/modules/es.regexp.exec":409,"core-js/modules/es.regexp.to-string":410,"core-js/modules/es.string.match":412,"core-js/modules/es.string.replace":413,"core-js/modules/es.symbol":416,"core-js/modules/es.symbol.description":415}],8:[function(require,module,exports){
/*
Copyright luojia@luojia.me
LGPL license
*/
'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.typed-array.float32-array");

require("core-js/modules/es.typed-array.copy-within");

require("core-js/modules/es.typed-array.every");

require("core-js/modules/es.typed-array.fill");

require("core-js/modules/es.typed-array.filter");

require("core-js/modules/es.typed-array.find");

require("core-js/modules/es.typed-array.find-index");

require("core-js/modules/es.typed-array.for-each");

require("core-js/modules/es.typed-array.includes");

require("core-js/modules/es.typed-array.index-of");

require("core-js/modules/es.typed-array.iterator");

require("core-js/modules/es.typed-array.join");

require("core-js/modules/es.typed-array.last-index-of");

require("core-js/modules/es.typed-array.map");

require("core-js/modules/es.typed-array.reduce");

require("core-js/modules/es.typed-array.reduce-right");

require("core-js/modules/es.typed-array.reverse");

require("core-js/modules/es.typed-array.set");

require("core-js/modules/es.typed-array.slice");

require("core-js/modules/es.typed-array.some");

require("core-js/modules/es.typed-array.sort");

require("core-js/modules/es.typed-array.subarray");

require("core-js/modules/es.typed-array.to-locale-string");

require("core-js/modules/es.typed-array.to-string");

var _iterator = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol/iterator"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));

var _fill = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/fill"));

var _defineProperty = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    (0, _defineProperty["default"])(target, descriptor.key, descriptor);
  }
}

function _createClass2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof _symbol["default"] === "function" && typeof _iterator["default"] === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof _symbol["default"] === "function" && obj.constructor === _symbol["default"] && obj !== _symbol["default"].prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

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
    var Matrix = /*#__PURE__*/function () {
      function Matrix(l, c) {
        var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, Matrix);

        this.array = new Constructor(l * c);
        (0, _defineProperty["default"])(this.array, 'row', {
          value: l
        });
        (0, _defineProperty["default"])(this.array, 'column', {
          value: c
        });

        if (arguments.length == 3) {
          if (Matrix._instanceofTypedArray && fill === 0) {} else if (typeof fill === 'number') {
            var _context;

            (0, _fill["default"])(_context = this).call(_context, fill);
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
          var ignoreZero = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true; //work out the equation for every elements,only for debug and only works with Array matrixes

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
    (0, _defineProperty["default"])(Matrix, '_instanceofTypedArray', {
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

},{"@babel/runtime-corejs3/core-js-stable/instance/fill":22,"@babel/runtime-corejs3/core-js-stable/object/define-property":33,"@babel/runtime-corejs3/core-js-stable/symbol":44,"@babel/runtime-corejs3/core-js-stable/symbol/iterator":45,"core-js/modules/es.array.iterator":403,"core-js/modules/es.array.join":404,"core-js/modules/es.object.to-string":407,"core-js/modules/es.symbol":416,"core-js/modules/es.symbol.description":415,"core-js/modules/es.typed-array.copy-within":417,"core-js/modules/es.typed-array.every":418,"core-js/modules/es.typed-array.fill":419,"core-js/modules/es.typed-array.filter":420,"core-js/modules/es.typed-array.find":422,"core-js/modules/es.typed-array.find-index":421,"core-js/modules/es.typed-array.float32-array":423,"core-js/modules/es.typed-array.for-each":424,"core-js/modules/es.typed-array.includes":425,"core-js/modules/es.typed-array.index-of":426,"core-js/modules/es.typed-array.iterator":427,"core-js/modules/es.typed-array.join":428,"core-js/modules/es.typed-array.last-index-of":429,"core-js/modules/es.typed-array.map":430,"core-js/modules/es.typed-array.reduce":432,"core-js/modules/es.typed-array.reduce-right":431,"core-js/modules/es.typed-array.reverse":433,"core-js/modules/es.typed-array.set":434,"core-js/modules/es.typed-array.slice":435,"core-js/modules/es.typed-array.some":436,"core-js/modules/es.typed-array.sort":437,"core-js/modules/es.typed-array.subarray":438,"core-js/modules/es.typed-array.to-locale-string":439,"core-js/modules/es.typed-array.to-string":440}],9:[function(require,module,exports){
/*
Copyright luojia@luojia.me
LGPL license
*/
'use strict';

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.typed-array.uint32-array");

require("core-js/modules/es.typed-array.copy-within");

require("core-js/modules/es.typed-array.every");

require("core-js/modules/es.typed-array.fill");

require("core-js/modules/es.typed-array.filter");

require("core-js/modules/es.typed-array.find");

require("core-js/modules/es.typed-array.find-index");

require("core-js/modules/es.typed-array.for-each");

require("core-js/modules/es.typed-array.includes");

require("core-js/modules/es.typed-array.index-of");

require("core-js/modules/es.typed-array.iterator");

require("core-js/modules/es.typed-array.join");

require("core-js/modules/es.typed-array.last-index-of");

require("core-js/modules/es.typed-array.map");

require("core-js/modules/es.typed-array.reduce");

require("core-js/modules/es.typed-array.reduce-right");

require("core-js/modules/es.typed-array.reverse");

require("core-js/modules/es.typed-array.set");

require("core-js/modules/es.typed-array.slice");

require("core-js/modules/es.typed-array.some");

require("core-js/modules/es.typed-array.sort");

require("core-js/modules/es.typed-array.subarray");

require("core-js/modules/es.typed-array.to-locale-string");

require("core-js/modules/es.typed-array.to-string");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

_Object$defineProperty2(exports, "DomTools", {
  enumerable: true,
  get: function get() {
    return _index.DomTools;
  }
});

_Object$defineProperty2(exports, "Utils", {
  enumerable: true,
  get: function get() {
    return _index.Utils;
  }
});

exports.DanmakuFrameModule = exports.DanmakuFrame = void 0;

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _bind = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/bind"));

var _copyWithin = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/copy-within"));

var _setImmediate2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-immediate"));

var _now = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/date/now"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _index = require("../../NyaP-Core/index.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _Object$defineProperty2(obj, key, {
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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    (0, _defineProperty2["default"])(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var DanmakuFrameModule = /*#__PURE__*/function () {
  function DanmakuFrameModule(frame) {
    _classCallCheck(this, DanmakuFrameModule);

    this.frame = frame;
    this.enabled = false;
  }

  _createClass(DanmakuFrameModule, [{
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

  return DanmakuFrameModule;
}();

exports.DanmakuFrameModule = DanmakuFrameModule;

var DanmakuFrame = /*#__PURE__*/function () {
  _createClass(DanmakuFrame, [{
    key: "availableModules",
    get: function get() {
      return this.constructor.availableModules;
    }
  }, {
    key: "opt",
    get: function get() {
      return this._opt || {};
    }
  }, {
    key: "time",
    set: function set(t) {
      //current media time (ms)
      this.media || (this.timeBase = (0, _now["default"])() - t);
      this.moduleFunction('time', t); //let all mods know when the time be set
    },
    get: function get() {
      return this.media ? this.media.currentTime * 1000 : (0, _now["default"])() - this.timeBase;
    }
  }, {
    key: "area",
    get: function get() {
      return this.width * this.height;
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
  }]); //constructed module list


  function DanmakuFrame(core, opt) {
    var _this = this,
        _context;

    _classCallCheck(this, DanmakuFrame);

    _defineProperty(this, "_opt", void 0);

    _defineProperty(this, "rate", 1);

    _defineProperty(this, "timeBase", 0);

    _defineProperty(this, "width", 0);

    _defineProperty(this, "height", 0);

    _defineProperty(this, "fpsLimit", 0);

    _defineProperty(this, "fps", 0);

    _defineProperty(this, "fpsRec", new Uint32Array(9));

    _defineProperty(this, "media", null);

    _defineProperty(this, "working", false);

    _defineProperty(this, "enabled", true);

    _defineProperty(this, "modules", {});

    this.core = core;
    this._opt = opt;
    this.container = core.danmakuContainer || document.createElement('div'); // create a styleSheet

    var style = document.createElement("style");
    document.head.appendChild(style);
    this.styleSheet = style.sheet;
    (0, _setImmediate2["default"])(function () {
      //container size sensor
      _index.DomTools.resizeEvent.observe(_this.container);

      _index.DomTools.addEvents(_this.container, {
        resize: function resize(e) {
          return _this.resize(e.contentRect);
        }
      });

      _this.resize();
    }, 0);

    _index.Utils.animationFrameLoop(function () {
      //fps recorder
      var rec = _this.fpsRec,
          length = rec.length; //move left

      (0, _copyWithin["default"])(rec).call(rec, rec, 1);
      rec[length - 1] = (0, _now["default"])(); //set this frame's time

      var result = 0;

      for (var i = 1; i < length; i++) {
        //weighted average
        result += i * (rec[i] - rec[i - 1]);
      }

      result /= length * (length - 1) / 2;
      _this.fps = 1000 / result;
    });

    this.draw = (0, _bind["default"])(_context = this.draw).call(_context, this);
  }

  _createClass(DanmakuFrame, [{
    key: "enable",
    value: function enable(name) {
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
        throw new Error("Wrong name: ".concat(name));
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
      if (name === undefined) {
        this.pause();
        this.moduleFunction('clear');
        this.enabled = false;
        this.container.style.display = 'none';
        this.core.emit('danmakuFrameToggle', false);
        this.core.debug('danmaku frame disabled');
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
      var _this2 = this;

      if (typeof s === 'string') s = [s];
      if (s instanceof Array === false) return;
      (0, _forEach["default"])(s).call(s, function (r) {
        return _this2.styleSheet.insertRule(r, _this2.styleSheet.cssRules.length);
      });
    }
  }, {
    key: "initModule",
    value: function initModule(name) {
      var arg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.opt.modules[name];

      if (this.modules[name]) {
        console.warn("The module [".concat(name, "] has already inited."));
        return this.modules[name];
      }

      var mod = DanmakuFrame.availableModules[name];
      if (!mod) throw 'Module [' + name + '] does not exist.';
      var module = new mod(this, arg);
      if (module instanceof DanmakuFrameModule === false) throw 'Constructor of ' + name + ' is not child class of DanmakuFrameModule';
      this.modules[name] = module;
      console.debug("Mod Inited: ".concat(name));
      return module;
    }
  }, {
    key: "draw",
    value: function draw(force) {
      var _this3 = this;

      if (!this.working) return;
      this.moduleFunction('draw', force);

      if (this.fpsLimit <= 0) {
        requestAnimationFrame(function () {
          return _this3.draw();
        });
      } else {
        (0, _setTimeout2["default"])(this.draw, 1000 / this.fpsLimit);
      }
    }
  }, {
    key: "load",
    value: function load() {
      var _context2;

      for (var _len = arguments.length, danmakuObj = new Array(_len), _key = 0; _key < _len; _key++) {
        danmakuObj[_key] = arguments[_key];
      }

      this.moduleFunction.apply(this, (0, _concat["default"])(_context2 = ['load']).call(_context2, danmakuObj));
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
    key: "play",
    value: function play() {
      if (this.working || !this.enabled) return;
      this.working = true;
      this.moduleFunction('play');
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
      var rect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.container.getBoundingClientRect();
      this.width = rect.width;
      this.height = rect.height;
      this.moduleFunction('resize', rect);
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

      _index.DomTools.addEvents(media, {
        playing: function playing() {
          return F.play();
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
  }]);

  return DanmakuFrame;
}();

exports.DanmakuFrame = DanmakuFrame;

_defineProperty(DanmakuFrame, "availableModules", {});

},{"../../NyaP-Core/index.js":1,"@babel/runtime-corejs3/core-js-stable/date/now":18,"@babel/runtime-corejs3/core-js-stable/instance/bind":19,"@babel/runtime-corejs3/core-js-stable/instance/concat":20,"@babel/runtime-corejs3/core-js-stable/instance/copy-within":21,"@babel/runtime-corejs3/core-js-stable/instance/for-each":23,"@babel/runtime-corejs3/core-js-stable/object/define-property":33,"@babel/runtime-corejs3/core-js-stable/set-immediate":41,"@babel/runtime-corejs3/core-js-stable/set-timeout":43,"core-js/modules/es.array.iterator":403,"core-js/modules/es.object.to-string":407,"core-js/modules/es.typed-array.copy-within":417,"core-js/modules/es.typed-array.every":418,"core-js/modules/es.typed-array.fill":419,"core-js/modules/es.typed-array.filter":420,"core-js/modules/es.typed-array.find":422,"core-js/modules/es.typed-array.find-index":421,"core-js/modules/es.typed-array.for-each":424,"core-js/modules/es.typed-array.includes":425,"core-js/modules/es.typed-array.index-of":426,"core-js/modules/es.typed-array.iterator":427,"core-js/modules/es.typed-array.join":428,"core-js/modules/es.typed-array.last-index-of":429,"core-js/modules/es.typed-array.map":430,"core-js/modules/es.typed-array.reduce":432,"core-js/modules/es.typed-array.reduce-right":431,"core-js/modules/es.typed-array.reverse":433,"core-js/modules/es.typed-array.set":434,"core-js/modules/es.typed-array.slice":435,"core-js/modules/es.typed-array.some":436,"core-js/modules/es.typed-array.sort":437,"core-js/modules/es.typed-array.subarray":438,"core-js/modules/es.typed-array.to-locale-string":439,"core-js/modules/es.typed-array.to-string":440,"core-js/modules/es.typed-array.uint32-array":441}],10:[function(require,module,exports){
"use strict";

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _iterator2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol/iterator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _getIteratorMethod2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator-method"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));

var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _create = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/create"));

var _construct = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/reflect/construct"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-prototype-of"));

var _setPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/set-prototype-of"));

var _textModuleTemplate = _interopRequireDefault(require("./textModuleTemplate.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof _symbol["default"] === "function" && typeof _iterator2["default"] === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof _symbol["default"] === "function" && obj.constructor === _symbol["default"] && obj !== _symbol["default"].prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof _symbol["default"] === "undefined" || (0, _getIteratorMethod2["default"])(o) == null) {
    if ((0, _isArray["default"])(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = (0, _getIterator2["default"])(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _unsupportedIterableToArray(o, minLen) {
  var _context;

  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = (0, _slice["default"])(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return (0, _from["default"])(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    (0, _defineProperty2["default"])(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = (0, _create["default"])(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = _setPrototypeOf2["default"] || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = (0, _construct["default"])(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !_construct["default"]) return false;
  if (_construct["default"].sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call((0, _construct["default"])(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = _setPrototypeOf2["default"] ? _getPrototypeOf2["default"] : function _getPrototypeOf(o) {
    return o.__proto__ || (0, _getPrototypeOf2["default"])(o);
  };
  return _getPrototypeOf(o);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2["default"])(obj, key, {
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

var TextCanvas2D = /*#__PURE__*/function (_Template) {
  _inherits(TextCanvas2D, _Template);

  var _super = _createSuper(TextCanvas2D);

  _createClass(TextCanvas2D, [{
    key: "container",
    get: function get() {
      return this.canvas;
    }
  }]);

  function TextCanvas2D(dText) {
    var _this;

    _classCallCheck(this, TextCanvas2D);

    _this = _super.call(this, dText);

    _defineProperty(_assertThisInitialized(_this), "canvas", void 0);

    _defineProperty(_assertThisInitialized(_this), "context2d", void 0);

    _this.canvas = document.createElement('canvas'); //the canvas

    _this.context2d = _this.canvas.getContext('2d'); //the canvas contex

    if (!_this.context2d) {
      console.warn('text 2d not supported');
      return _possibleConstructorReturn(_this);
    }

    _this.canvas.classList.add("".concat(dText.randomText, "_fullfill"));

    _this.canvas.id = "".concat(dText.randomText, "_text2d");
    _this.supported = true;
    return _this;
  }

  _createClass(TextCanvas2D, [{
    key: "draw",
    value: function draw(force) {
      var ctx = this.context2d,
          cW = ctx.canvas.width,
          dT = this.dText.DanmakuText,
          i = dT.length,
          t,
          left,
          right,
          vW;
      var debug = false;
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
  }, {
    key: "clear",
    value: function clear(force) {
      var D = this.dText;

      if (force || this._evaluateIfFullClearMode()) {
        this.context2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return;
      }

      for (var i = D.DanmakuText.length, t; i--;) {
        t = D.DanmakuText[i];
        if (t.drawn) this.context2d.clearRect(t.style.x - t.estimatePadding, t.style.y - t.estimatePadding, t._cache.width, t._cache.height);
      }
    }
  }, {
    key: "_evaluateIfFullClearMode",
    value: function _evaluateIfFullClearMode() {
      if (this.dText.DanmakuText.length > 3) return true;
      return false;
    }
  }, {
    key: "deleteRelatedTextObject",
    value: function deleteRelatedTextObject(t) {
      if (t._bitmap) {
        t._bitmap.close();

        t._bitmap = null;
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      var D = this.dText,
          C = this.canvas;
      C.width = D.width;
      C.height = D.height;
    }
  }, {
    key: "enable",
    value: function enable() {
      this.draw();
      this.dText.useImageBitmap = true;
    }
  }, {
    key: "disable",
    value: function disable() {
      var _iterator = _createForOfIteratorHelper(this.dText.DanmakuText),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var tobj = _step.value;
          this.deleteRelatedTextObject(tobj);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.clear(true);
    }
  }]);

  return TextCanvas2D;
}(_textModuleTemplate["default"]);

var _default = TextCanvas2D;
exports["default"] = _default;

},{"./textModuleTemplate.js":15,"@babel/runtime-corejs3/core-js-stable/array/from":16,"@babel/runtime-corejs3/core-js-stable/array/is-array":17,"@babel/runtime-corejs3/core-js-stable/instance/slice":25,"@babel/runtime-corejs3/core-js-stable/object/create":32,"@babel/runtime-corejs3/core-js-stable/object/define-property":33,"@babel/runtime-corejs3/core-js-stable/object/get-prototype-of":36,"@babel/runtime-corejs3/core-js-stable/object/set-prototype-of":37,"@babel/runtime-corejs3/core-js-stable/reflect/construct":39,"@babel/runtime-corejs3/core-js-stable/symbol":44,"@babel/runtime-corejs3/core-js-stable/symbol/iterator":45,"@babel/runtime-corejs3/core-js/get-iterator":47,"@babel/runtime-corejs3/core-js/get-iterator-method":46,"core-js/modules/es.function.name":405,"core-js/modules/es.object.to-string":407,"core-js/modules/es.regexp.to-string":410,"core-js/modules/es.symbol":416,"core-js/modules/es.symbol.description":415}],11:[function(require,module,exports){
"use strict";

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _iterator = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol/iterator"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));

var _defineProperty = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _create = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/create"));

var _construct = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/reflect/construct"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-prototype-of"));

var _setPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/set-prototype-of"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _textModuleTemplate = _interopRequireDefault(require("./textModuleTemplate.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof _symbol["default"] === "function" && typeof _iterator["default"] === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof _symbol["default"] === "function" && obj.constructor === _symbol["default"] && obj !== _symbol["default"].prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    (0, _defineProperty["default"])(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = (0, _create["default"])(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = _setPrototypeOf2["default"] || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = (0, _construct["default"])(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !_construct["default"]) return false;
  if (_construct["default"].sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call((0, _construct["default"])(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = _setPrototypeOf2["default"] ? _getPrototypeOf2["default"] : function _getPrototypeOf(o) {
    return o.__proto__ || (0, _getPrototypeOf2["default"])(o);
  };
  return _getPrototypeOf(o);
}

var TextCss = /*#__PURE__*/function (_Template) {
  _inherits(TextCss, _Template);

  var _super = _createSuper(TextCss);

  function TextCss(dText) {
    var _this;

    _classCallCheck(this, TextCss);

    _this = _super.call(this, dText);
    _this.supported = dText.text2d.supported;
    if (!_this.supported) return _possibleConstructorReturn(_this);
    dText.frame.addStyle(["#".concat(dText.randomText, "_textCanvasContainer canvas{will-change:transform;top:0;left:0;position:absolute;}"), "#".concat(dText.randomText, "_textCanvasContainer.moving canvas{transition:transform 500s linear;}"), "#".concat(dText.randomText, "_textCanvasContainer{will-change:transform;pointer-events:none;overflow:hidden;}")]);
    _this.container = document.createElement('div'); //for text canvas

    _this.container.classList.add("".concat(dText.randomText, "_fullfill"));

    _this.container.id = "".concat(dText.randomText, "_textCanvasContainer");
    return _this;
  }

  _createClass(TextCss, [{
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
    key: "clear",
    value: function clear() {
      this.container.innerHTML = '';
    }
  }, {
    key: "pause",
    value: function pause() {
      this._toggle(false);
    }
  }, {
    key: "play",
    value: function play() {
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
      var _context;

      if (!t.danmaku) return;
      if (T === undefined) T = this.dText.frame.time + 500000;
      t._cache.style.transform = (0, _concat["default"])(_context = "translate(".concat(((this.dText._calcSideDanmakuPosition(t, T) - t.estimatePadding) * 10 | 0) / 10, "px,")).call(_context, t.style.y - t.estimatePadding, "px)");
    }
  }, {
    key: "resetPos",
    value: function resetPos() {
      var _this3 = this;

      this.pause();
      this.dText.paused || requestAnimationFrame(function () {
        return _this3.play();
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

      this.dText.useImageBitmap = false;
      requestAnimationFrame(function () {
        var _context2;

        (0, _forEach["default"])(_context2 = _this4.dText.DanmakuText).call(_context2, function (t) {
          return _this4.newDanmaku(t);
        });
      });
    }
  }, {
    key: "disable",
    value: function disable() {
      this.container.innerHTML = '';
    }
  }, {
    key: "newDanmaku",
    value: function newDanmaku(t) {
      var _context3,
          _this5 = this;

      t._cache.style.transform = (0, _concat["default"])(_context3 = "translate(".concat(t.style.x - t.estimatePadding, "px,")).call(_context3, t.style.y - t.estimatePadding, "px)");
      this.container.appendChild(t._cache);
      t.danmaku.mode < 2 && !this.dText.paused && requestAnimationFrame(function () {
        return _this5._move(t);
      });
    }
  }]);

  return TextCss;
}(_textModuleTemplate["default"]);

var _default = TextCss;
exports["default"] = _default;

},{"./textModuleTemplate.js":15,"@babel/runtime-corejs3/core-js-stable/instance/concat":20,"@babel/runtime-corejs3/core-js-stable/instance/for-each":23,"@babel/runtime-corejs3/core-js-stable/object/create":32,"@babel/runtime-corejs3/core-js-stable/object/define-property":33,"@babel/runtime-corejs3/core-js-stable/object/get-prototype-of":36,"@babel/runtime-corejs3/core-js-stable/object/set-prototype-of":37,"@babel/runtime-corejs3/core-js-stable/reflect/construct":39,"@babel/runtime-corejs3/core-js-stable/symbol":44,"@babel/runtime-corejs3/core-js-stable/symbol/iterator":45,"core-js/modules/es.object.to-string":407,"core-js/modules/es.regexp.to-string":410,"core-js/modules/es.symbol":416,"core-js/modules/es.symbol.description":415}],12:[function(require,module,exports){
"use strict";

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.typed-array.float32-array");

require("core-js/modules/es.typed-array.copy-within");

require("core-js/modules/es.typed-array.every");

require("core-js/modules/es.typed-array.fill");

require("core-js/modules/es.typed-array.filter");

require("core-js/modules/es.typed-array.find");

require("core-js/modules/es.typed-array.find-index");

require("core-js/modules/es.typed-array.for-each");

require("core-js/modules/es.typed-array.includes");

require("core-js/modules/es.typed-array.index-of");

require("core-js/modules/es.typed-array.iterator");

require("core-js/modules/es.typed-array.join");

require("core-js/modules/es.typed-array.last-index-of");

require("core-js/modules/es.typed-array.map");

require("core-js/modules/es.typed-array.reduce");

require("core-js/modules/es.typed-array.reduce-right");

require("core-js/modules/es.typed-array.reverse");

require("core-js/modules/es.typed-array.set");

require("core-js/modules/es.typed-array.slice");

require("core-js/modules/es.typed-array.some");

require("core-js/modules/es.typed-array.sort");

require("core-js/modules/es.typed-array.subarray");

require("core-js/modules/es.typed-array.to-locale-string");

require("core-js/modules/es.typed-array.to-string");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _iterator2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol/iterator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _getIteratorMethod2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/get-iterator-method"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));

var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _defineProperty = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _create = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/create"));

var _construct = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/reflect/construct"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-prototype-of"));

var _setPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/set-prototype-of"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _Mat = _interopRequireDefault(require("../../lib/Mat/Mat.js"));

var _textModuleTemplate = _interopRequireDefault(require("./textModuleTemplate.js"));

var _danmakuFrame = require("../danmaku-frame.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof _symbol["default"] === "function" && typeof _iterator2["default"] === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof _symbol["default"] === "function" && obj.constructor === _symbol["default"] && obj !== _symbol["default"].prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof _symbol["default"] === "undefined" || (0, _getIteratorMethod2["default"])(o) == null) {
    if ((0, _isArray["default"])(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = (0, _getIterator2["default"])(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _unsupportedIterableToArray(o, minLen) {
  var _context2;

  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = (0, _slice["default"])(_context2 = Object.prototype.toString.call(o)).call(_context2, 8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return (0, _from["default"])(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    (0, _defineProperty["default"])(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = (0, _create["default"])(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = _setPrototypeOf2["default"] || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = (0, _construct["default"])(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !_construct["default"]) return false;
  if (_construct["default"].sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call((0, _construct["default"])(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = _setPrototypeOf2["default"] ? _getPrototypeOf2["default"] : function _getPrototypeOf(o) {
    return o.__proto__ || (0, _getPrototypeOf2["default"])(o);
  };
  return _getPrototypeOf(o);
}

var TextWebGL = /*#__PURE__*/function (_Template) {
  _inherits(TextWebGL, _Template);

  var _super = _createSuper(TextWebGL);

  _createClass(TextWebGL, [{
    key: "container",
    get: function get() {
      return this.c3d;
    }
  }]);

  function TextWebGL(dText) {
    var _this;

    _classCallCheck(this, TextWebGL);

    _this = _super.call(this, dText);
    var c3d = _this.c3d = document.createElement('canvas');
    c3d.classList.add("".concat(dText.randomText, "_fullfill"));
    c3d.id = "".concat(dText.randomText, "_text3d"); //init webgl

    var gl = _this.gl = c3d.getContext('webgl') || c3d.getContext('experimental-webgl'); //the canvas3d context

    if (!gl) {
      console.warn('text 3d not supported');
      return _possibleConstructorReturn(_this);
    } //shader


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

  _createClass(TextWebGL, [{
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
    key: "deleteRelatedTextObject",
    value: function deleteRelatedTextObject(t) {
      if (t.texture) this.gl.deleteTexture(t.texture);
      t.texture = null;
      t.vertCoord = null;
      delete t.glDanmaku;
    }
  }, {
    key: "resize",
    value: function resize(w, h) {
      var gl = this.gl,
          C = this.c3d;
      C.width = this.dText.width;
      C.height = this.dText.height;
      gl.viewport(0, 0, C.width, C.height);
      gl.uniformMatrix4fv(this.u2dCoord, false, _Mat["default"].Identity(4).translate3d(-1, 1, 0).scale3d(2 / C.width, -2 / C.height, 0).array);
    }
  }, {
    key: "enable",
    value: function enable() {
      var _context,
          _this2 = this;

      (0, _forEach["default"])(_context = this.dText.DanmakuText).call(_context, function (t) {
        _this2.newDanmaku(t, false);
      });
      this.dText.useImageBitmap = false;
      requestAnimationFrame(function () {
        return _this2.draw();
      });
    }
  }, {
    key: "disable",
    value: function disable() {
      //clean related objects
      var _iterator = _createForOfIteratorHelper(this.dText.DanmakuText),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var tobj = _step.value;
          this.deleteRelatedTextObject(tobj);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.clear();
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
        _danmakuFrame.Utils.requestIdleCallback(function () {
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

  return TextWebGL;
}(_textModuleTemplate["default"]);

var commonTextureCoord = new Float32Array([0.0, 0.0, //↖
1.0, 0.0, //↗
0.0, 1.0, //↙
1.0, 1.0 //↘
]);
var _default = TextWebGL;
exports["default"] = _default;

},{"../../lib/Mat/Mat.js":8,"../danmaku-frame.js":9,"./textModuleTemplate.js":15,"@babel/runtime-corejs3/core-js-stable/array/from":16,"@babel/runtime-corejs3/core-js-stable/array/is-array":17,"@babel/runtime-corejs3/core-js-stable/instance/for-each":23,"@babel/runtime-corejs3/core-js-stable/instance/slice":25,"@babel/runtime-corejs3/core-js-stable/object/create":32,"@babel/runtime-corejs3/core-js-stable/object/define-property":33,"@babel/runtime-corejs3/core-js-stable/object/get-prototype-of":36,"@babel/runtime-corejs3/core-js-stable/object/set-prototype-of":37,"@babel/runtime-corejs3/core-js-stable/reflect/construct":39,"@babel/runtime-corejs3/core-js-stable/symbol":44,"@babel/runtime-corejs3/core-js-stable/symbol/iterator":45,"@babel/runtime-corejs3/core-js/get-iterator":47,"@babel/runtime-corejs3/core-js/get-iterator-method":46,"core-js/modules/es.array.iterator":403,"core-js/modules/es.function.name":405,"core-js/modules/es.object.to-string":407,"core-js/modules/es.regexp.to-string":410,"core-js/modules/es.symbol":416,"core-js/modules/es.symbol.description":415,"core-js/modules/es.typed-array.copy-within":417,"core-js/modules/es.typed-array.every":418,"core-js/modules/es.typed-array.fill":419,"core-js/modules/es.typed-array.filter":420,"core-js/modules/es.typed-array.find":422,"core-js/modules/es.typed-array.find-index":421,"core-js/modules/es.typed-array.float32-array":423,"core-js/modules/es.typed-array.for-each":424,"core-js/modules/es.typed-array.includes":425,"core-js/modules/es.typed-array.index-of":426,"core-js/modules/es.typed-array.iterator":427,"core-js/modules/es.typed-array.join":428,"core-js/modules/es.typed-array.last-index-of":429,"core-js/modules/es.typed-array.map":430,"core-js/modules/es.typed-array.reduce":432,"core-js/modules/es.typed-array.reduce-right":431,"core-js/modules/es.typed-array.reverse":433,"core-js/modules/es.typed-array.set":434,"core-js/modules/es.typed-array.slice":435,"core-js/modules/es.typed-array.some":436,"core-js/modules/es.typed-array.sort":437,"core-js/modules/es.typed-array.subarray":438,"core-js/modules/es.typed-array.to-locale-string":439,"core-js/modules/es.typed-array.to-string":440}],13:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _iterator = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol/iterator"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));

var _create = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/create"));

var _construct = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/reflect/construct"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-prototype-of"));

var _setPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/set-prototype-of"));

var _textModuleTemplate = _interopRequireDefault(require("./textModuleTemplate.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof _symbol["default"] === "function" && typeof _iterator["default"] === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof _symbol["default"] === "function" && obj.constructor === _symbol["default"] && obj !== _symbol["default"].prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = (0, _create["default"])(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = _setPrototypeOf2["default"] || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = (0, _construct["default"])(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !_construct["default"]) return false;
  if (_construct["default"].sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call((0, _construct["default"])(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = _setPrototypeOf2["default"] ? _getPrototypeOf2["default"] : function _getPrototypeOf(o) {
    return o.__proto__ || (0, _getPrototypeOf2["default"])(o);
  };
  return _getPrototypeOf(o);
}

var TextOff = /*#__PURE__*/function (_Template) {
  _inherits(TextOff, _Template);

  var _super = _createSuper(TextOff);

  function TextOff(dText) {
    var _this;

    _classCallCheck(this, TextOff);

    _this = _super.call(this, dText);
    _this.supported = true;
    _this.container = document.createElement('div');
    _this.container.style.display = 'none';
    return _this;
  }

  return TextOff;
}(_textModuleTemplate["default"]);

var _default = TextOff;
exports["default"] = _default;

},{"./textModuleTemplate.js":15,"@babel/runtime-corejs3/core-js-stable/object/create":32,"@babel/runtime-corejs3/core-js-stable/object/define-property":33,"@babel/runtime-corejs3/core-js-stable/object/get-prototype-of":36,"@babel/runtime-corejs3/core-js-stable/object/set-prototype-of":37,"@babel/runtime-corejs3/core-js-stable/reflect/construct":39,"@babel/runtime-corejs3/core-js-stable/symbol":44,"@babel/runtime-corejs3/core-js-stable/symbol/iterator":45,"core-js/modules/es.object.to-string":407,"core-js/modules/es.regexp.to-string":410,"core-js/modules/es.symbol":416,"core-js/modules/es.symbol.description":415}],14:[function(require,module,exports){
/*
Copyright luojia@luojia.me
LGPL license

danmaku-frame mod
*/
'use strict';

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.join");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports["default"] = init;

var _fill = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/fill"));

var _iterator = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol/iterator"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));

var _construct = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/reflect/construct"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-prototype-of"));

var _setPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/set-prototype-of"));

var _now = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/date/now"));

var _create = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/create"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _setInterval2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-interval"));

var _bind = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/bind"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/assign"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _danmakuFrame = require("../danmaku-frame.js");

var _TextCanvas2D = _interopRequireDefault(require("./TextCanvas2D.js"));

var _TextWebGL = _interopRequireDefault(require("./TextWebGL.js"));

var _TextCss = _interopRequireDefault(require("./TextCss.js"));

var _Textoff = _interopRequireDefault(require("./Textoff.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof _symbol["default"] === "function" && typeof _iterator["default"] === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof _symbol["default"] === "function" && obj.constructor === _symbol["default"] && obj !== _symbol["default"].prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    (0, _defineProperty2["default"])(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = (0, _create["default"])(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = _setPrototypeOf2["default"] || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = (0, _construct["default"])(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !_construct["default"]) return false;
  if (_construct["default"].sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call((0, _construct["default"])(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = _setPrototypeOf2["default"] ? _getPrototypeOf2["default"] : function _getPrototypeOf(o) {
    return o.__proto__ || (0, _getPrototypeOf2["default"])(o);
  };
  return _getPrototypeOf(o);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2["default"])(obj, key, {
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
/*
danmaku obj struct
{
	_:'text',
	time:(number)msec time,
	text:(string),
	style:(object)to be combined whit default style,
	mode:(number),
	onScreen:(bool)on the screen
}

danmaku mode
	0:right
	1:left
	2:bottom
	3:top
*/


var defProp = _defineProperty2["default"];
var useImageBitmap = false;

var TextDanmaku = /*#__PURE__*/function (_DanmakuFrameModule) {
  _inherits(TextDanmaku, _DanmakuFrameModule);

  var _super = _createSuper(TextDanmaku);

  _createClass(TextDanmaku, [{
    key: "paused",
    get: function get() {
      return !this.frame.working;
    }
  }]);

  function TextDanmaku(frame) {
    var _context, _context2;

    var _this;

    var arg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TextDanmaku);

    _this = _super.call(this, frame);

    _defineProperty(_assertThisInitialized(_this), "list", []);

    _defineProperty(_assertThisInitialized(_this), "indexMark", 0);

    _defineProperty(_assertThisInitialized(_this), "randomText", "danmaku_text_".concat(Math.random() * 999999 | 0));

    _defineProperty(_assertThisInitialized(_this), "lastRendererMode", 0);

    _defineProperty(_assertThisInitialized(_this), "cacheCleanTime", 0);

    _defineProperty(_assertThisInitialized(_this), "danmakuMoveTime", 0);

    _defineProperty(_assertThisInitialized(_this), "danmakuCheckTime", 0);

    _defineProperty(_assertThisInitialized(_this), "danmakuCheckSwitch", true);

    _defineProperty(_assertThisInitialized(_this), "GraphCache", []);

    _defineProperty(_assertThisInitialized(_this), "DanmakuText", []);

    _defineProperty(_assertThisInitialized(_this), "defaultStyle", {
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

    _defineProperty(_assertThisInitialized(_this), "options", {
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

    if (arg.defaultStyle) (0, _assign["default"])(_this.defaultStyle, arg.defaultStyle);
    if (arg.options) _danmakuFrame.Utils.deepAssign(_this.options, arg.options);
    frame.addStyle(".".concat(_this.randomText, "_fullfill{top:0;left:0;width:100%;height:100%;position:absolute;}"));
    defProp(_assertThisInitialized(_this), 'rendererMode', {
      configurable: true
    });
    defProp(_assertThisInitialized(_this), 'activeRendererMode', {
      configurable: true,
      value: null
    });
    var con = _this.container = document.createElement('div');
    con.id = "".concat(_this.randomText, "_textDanmakuContainer");
    con.classList.add("".concat(_this.randomText, "_fullfill")); //init modes

    _this.modes = {
      0: _this.textoff = new _Textoff["default"](_assertThisInitialized(_this)),
      //off
      2: _this.text2d = new _TextCanvas2D["default"](_assertThisInitialized(_this)),
      1: _this.textCss = new _TextCss["default"](_assertThisInitialized(_this)),
      3: _this.text3d = new _TextWebGL["default"](_assertThisInitialized(_this))
    };
    _this.rendering = new RenderingDanmakuManager(_assertThisInitialized(_this));

    _danmakuFrame.DomTools.addEvents(document, {
      visibilitychange: function visibilitychange(e) {//?
      }
    });

    _this._checkNewDanmaku = (0, _bind["default"])(_context = _this._checkNewDanmaku).call(_context, _assertThisInitialized(_this));
    _this._cleanCache = (0, _bind["default"])(_context2 = _this._cleanCache).call(_context2, _assertThisInitialized(_this));
    (0, _setInterval2["default"])(_this._cleanCache, 5000); //set an interval for cache cleaning

    _this.setRendererMode(_this.lastRendererMode = _this.options.renderingMode || 1);

    return _this;
  }

  _createClass(TextDanmaku, [{
    key: "setRendererMode",
    value: function setRendererMode(n) {
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
  }, {
    key: "media",
    value: function media(_media) {
      var _this2 = this;

      _danmakuFrame.DomTools.addEvents(_media, {
        seeked: function seeked() {
          return _this2.time();
        },
        seeking: function seeking() {
          return _this2.pause();
        }
      });
    }
  }, {
    key: "play",
    value: function play() {
      this.recheckIndexMark();
      this.activeRendererMode.play();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.activeRendererMode.pause();
    }
  }, {
    key: "load",
    value: function load(d, autoAddToScreen) {
      if ((d === null || d === void 0 ? void 0 : d._) !== 'text') {
        return false;
      }

      if (typeof d.text !== 'string') {
        console.error('wrong danmaku object:', d);
        return false;
      }

      var ind,
          arr = this.list;
      ind = dichotomy(arr, d.time, 0, arr.length - 1, false); //find a place for this obj in the list in time order

      (0, _splice["default"])(arr).call(arr, ind, 0, d); //insert the obj

      if (ind < this.indexMark) this.indexMark++; //round d.style.fontSize to prevent Iifinity loop in tunnel

      if (_typeof(d.style) !== 'object') d.style = {};
      d.style.fontSize = Math.round((d.style.fontSize || this.defaultStyle.fontSize) * this.options.danmakuSizeScale);
      if (isNaN(d.style.fontSize) || d.style.fontSize === Infinity || d.style.fontSize === 0) d.style.fontSize = this.defaultStyle.fontSize * this.options.danmakuSizeScale;
      if (typeof d.mode !== 'number') d.mode = 0;
      if (autoAddToScreen) this._addNewDanmaku(d);
      return d;
    }
  }, {
    key: "loadList",
    value: function loadList(danmakuArray) {
      var _this3 = this;

      (0, _forEach["default"])(danmakuArray).call(danmakuArray, function (d) {
        return _this3.load(d);
      });
    }
  }, {
    key: "unload",
    value: function unload(d) {
      var _context3, _context4;

      if (!d || d._ !== 'text') return false;
      var i = (0, _indexOf["default"])(_context3 = this.list).call(_context3, d);
      if (i < 0) return false;
      (0, _splice["default"])(_context4 = this.list).call(_context4, i, 1);
      if (i < this.indexMark) this.indexMark--;
      return true;
    }
  }, {
    key: "_checkNewDanmaku",
    value: function _checkNewDanmaku(force) {
      if (this.paused && !force) return;
      var d,
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
  }, {
    key: "_addNewDanmaku",
    value: function _addNewDanmaku(d) {
      var cHeight = this.height,
          cWidth = this.width;
      var t = this.GraphCache.length ? this.GraphCache.shift() : new TextGraph();

      if (!this.options.allowLines) {
        d = (0, _create["default"])(d);
        d.text = d.text.replace(/\n/g, ' ');
      }

      var font = (0, _create["default"])(this.defaultStyle);
      t.init(d, (0, _assign["default"])(font, d.style));
      t.prepare(false); //find tunnel number

      var tnum = this.rendering.tunnelManager.getTunnel(t, cHeight); //calc margin

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

      this.rendering.add(t);
    }
  }, {
    key: "_calcSideDanmakuPosition",
    value: function _calcSideDanmakuPosition(t) {
      var T = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.frame.time;
      var R = !t.danmaku.mode,
          style = t.style; //R:from right

      return (R ? this.frame.width : -style.width) + (R ? -1 : 1) * this.frame.rate * (style.width + 1024) * (T - t.time) * this.options.speed / 60000;
    }
  }, {
    key: "_calcDanmakusPosition",
    value: function _calcDanmakusPosition(force) {
      var T = this.frame.time;
      if (this.paused && !force) return;
      var cWidth = this.width,
          rate = this.frame.rate;
      var R, i, t, style, X;
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
  }, {
    key: "_cleanCache",
    value: function _cleanCache(force) {
      //clean text object cache
      force && this.frame.core.debug('force cleaning graph cache');
      var now = (0, _now["default"])();

      if (this.GraphCache.length > 30 || force) {
        //save 30 cached danmaku
        for (var ti = 0; ti < this.GraphCache.length; ti++) {
          if (force || now - this.GraphCache[ti].removeTime > 10000) {
            var _context5; //delete cache which has not been used for 10s


            this.GraphCache[ti].destructor();
            (0, _splice["default"])(_context5 = this.GraphCache).call(_context5, ti, 1);
          } else {
            break;
          }
        }
      }
    }
  }, {
    key: "draw",
    value: function draw(force) {
      var _this4 = this;

      if (!force && this.paused || !this.enabled) return;

      this._calcDanmakusPosition(force);

      this.activeRendererMode.draw(force);
      requestAnimationFrame(function () {
        _this4._checkNewDanmaku(force);
      });
    }
  }, {
    key: "removeText",
    value: function removeText(t) {
      //remove the danmaku from screen
      this.rendering.remove(t);
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
      this.rendering.clear();

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
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.frame.time; //reset time,you should invoke it when the media has seeked to another time

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
      var _context6,
          _this5 = this; //cause the position of the danmaku is based on time
      //and if you don't want these danmaku on the screen to disappear after seeking,their time should be reset


      if (cTime === undefined) cTime = this.frame.time;
      (0, _forEach["default"])(_context6 = this.DanmakuText).call(_context6, function (t) {
        if (!t.danmaku) return;
        t.time = cTime - (_this5.danmakuMoveTime - t.time);
      });
    }
  }, {
    key: "danmakuAt",
    value: function danmakuAt(x, y) {
      var _context7; //return a list of danmaku which covers this position


      var list = [];
      if (!this.enabled) return list;
      (0, _forEach["default"])(_context7 = this.DanmakuText).call(_context7, function (t) {
        if (!t.danmaku) return;
        if (t.style.x <= x && t.style.x + t.style.width >= x && t.style.y <= y && t.style.y + t.style.height >= y) list.push(t.danmaku);
      });
      return list;
    }
  }, {
    key: "enable",
    value: function enable() {
      //enable the plugin
      this.setRendererMode(this.lastRendererMode);
      this.frame.container.appendChild(this.container);
      if (this.frame.working) this.play();
    }
  }, {
    key: "disable",
    value: function disable() {
      //disable the plugin
      this.frame.container.removeChild(this.container);
      this.pause();
      this.clear();
      this.setRendererMode(0);
    }
  }, {
    key: "useImageBitmap",
    set: function set(v) {
      useImageBitmap = typeof createImageBitmap === 'function' ? v : false;
    },
    get: function get() {
      return useImageBitmap;
    }
  }]);

  return TextDanmaku;
}(_danmakuFrame.DanmakuFrameModule);

var TextGraph = /*#__PURE__*/function () {
  _createClass(TextGraph, [{
    key: "text",
    //code copied from CanvasObjLibrary
    //bool: 
    //number: remove time of the danmaku
    //number: tunnel number in the tunner manager
    //number: tunnel height
    //number: padding of the canvas
    get: function get() {
      return this.danmaku.text;
    }
  }]);

  function TextGraph(danmakuObj, font) {
    var _context8;

    _classCallCheck(this, TextGraph);

    _defineProperty(this, "_fontString", '');

    _defineProperty(this, "_renderList", void 0);

    _defineProperty(this, "_cache", void 0);

    _defineProperty(this, "_bitmap", void 0);

    _defineProperty(this, "font", {});

    _defineProperty(this, "time", void 0);

    _defineProperty(this, "style", {});

    _defineProperty(this, "drawn", false);

    _defineProperty(this, "danmaku", void 0);

    _defineProperty(this, "removeTime", void 0);

    _defineProperty(this, "tunnelNumber", void 0);

    _defineProperty(this, "tunnelHeight", void 0);

    _defineProperty(this, "estimatePadding", void 0);

    this._renderToCache = (0, _bind["default"])(_context8 = this._renderToCache).call(_context8, this);
    danmakuObj && this.init(danmakuObj, font);
  }

  _createClass(TextGraph, [{
    key: "init",
    value: function init(d, font) {
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
  }, {
    key: "prepare",
    value: function prepare() {
      var async = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false; //prepare text details

      if (!this._cache) {
        this._cache = document.createElement("canvas");
      }

      var ta = [];
      this.font.fontStyle && ta.push(this.font.fontStyle);
      this.font.fontVariant && ta.push(this.font.fontVariant);
      this.font.fontWeight && ta.push(this.font.fontWeight);
      ta.push("".concat(this.font.fontSize, "px"));
      this.font.fontFamily && ta.push(this.font.fontFamily);
      this._fontString = ta.join(' ');
      var canvas = this._cache,
          ct = canvas.ctx2d || (canvas.ctx2d = canvas.getContext("2d"));
      ct.font = this._fontString;
      this._renderList = this.text.split(/\n/g);
      this.estimatePadding = Math.max(this.font.shadowBlur + 5 + Math.max(Math.abs(this.font.shadowOffsetY), Math.abs(this.font.shadowOffsetX)), this.font.strokeWidth + 3);
      var w = 0,
          tw,
          lh = typeof this.font.lineHeight === 'number' ? this.font.lineHeight : this.font.fontSize;

      for (var i = this._renderList.length; i--;) {
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
  }, {
    key: "_renderToCache",
    value: function _renderToCache() {
      var _this6 = this;

      if (!this.danmaku) return;
      this.render(this._cache.ctx2d);

      if (useImageBitmap) {
        //use ImageBitmap
        if (this._bitmap) {
          this._bitmap.close();

          this._bitmap = null;
        }

        createImageBitmap(this._cache).then(function (bitmap) {
          _this6._bitmap = bitmap;
        });
      }
    }
  }, {
    key: "render",
    value: function render(ct) {
      //render text
      if (!this._renderList) return;
      ct.save();

      if (this.danmaku.highlight) {
        ct.fillStyle = 'rgba(255,255,255,0.3)';
        ct.beginPath();
        ct.rect(0, 0, this.style.width, this.style.height);
        (0, _fill["default"])(ct).call(ct);
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
      var lh = typeof this.font.lineHeight === 'number' ? this.font.lineHeight : this.font.fontSize,
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

      for (var i = this._renderList.length; i--;) {
        this.font.strokeWidth && ct.strokeText(this._renderList[i], x, lh * (i + 0.5));
        (0, _fill["default"])(this.font) && ct.fillText(this._renderList[i], x, lh * (i + 0.5));
      }

      ct.restore();
      this._renderList = undefined;
    }
  }, {
    key: "destructor",
    value: function destructor() {
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
  }]);

  return TextGraph;
}();

var tunnels = ['right', 'left', 'bottom', 'top'];

var TunnelManager = /*#__PURE__*/function () {
  function TunnelManager() {
    _classCallCheck(this, TunnelManager);

    this.reset();
  }

  _createClass(TunnelManager, [{
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

  return TunnelManager;
}();

var RenderingDanmakuManager = /*#__PURE__*/function () {
  //limit danmaku area on the screen(auto change)
  function RenderingDanmakuManager(dText) {
    var _this7 = this;

    _classCallCheck(this, RenderingDanmakuManager);

    _defineProperty(this, "totalArea", 0);

    _defineProperty(this, "onScreenArea", 0);

    _defineProperty(this, "limitArea", Infinity);

    _defineProperty(this, "tunnelManager", new TunnelManager()); //dText:TextDanmaku


    this.dText = dText;
    if (dText.text2d.supported) this.timer = (0, _setInterval2["default"])(function () {
      return _this7.rendererModeCheck();
    }, 1500);
  }

  _createClass(RenderingDanmakuManager, [{
    key: "add",
    value: function add(t) {
      if (t.danmaku.onScreen) return;
      t.danmaku.onScreen = true;
      this.dText.DanmakuText.push(t);
      this.totalArea += t._cache.width * t._cache.height; //cumulate danmaku area

      this.onScreenArea += Math.min(t._cache.width, this.dText.frame.width) * Math.min(t._cache.height, this.dText.frame.height);
      this.dText.activeRendererMode.newDanmaku(t);
    }
  }, {
    key: "remove",
    value: function remove(t) {
      var _context9;

      t.danmaku.onScreen = false;
      var ind = (0, _indexOf["default"])(_context9 = this.dText.DanmakuText).call(_context9, t);

      if (ind >= 0) {
        var _context10;

        (0, _splice["default"])(_context10 = this.dText.DanmakuText).call(_context10, ind, 1);
        this.totalArea -= t._cache.width * t._cache.height;
        this.onScreenArea -= Math.min(t._cache.width, this.dText.frame.width) * Math.min(t._cache.height, this.dText.frame.height);
      }

      this.tunnelManager.removeMark(t);
      this.dText.activeRendererMode.remove(t);
      this.dText.activeRendererMode.deleteRelatedTextObject(t);
      t.removeTime = (0, _now["default"])();
      t.danmaku = null;
      this.dText.GraphCache.push(t);
    }
  }, {
    key: "clear",
    value: function clear() {
      for (var i = 0, T; i < this.dText.DanmakuText.length; i++) {
        T = this.dText.DanmakuText[i];
        this.remove(T);
      }

      this.tunnelManager.reset();
    }
  }, {
    key: "rendererModeCheck",
    value: function rendererModeCheck() {
      //auto shift rendering mode
      var D = this.dText;
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
  }]);

  return RenderingDanmakuManager;
}();

function dichotomy(arr, t, start, end) {
  var position = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (arr.length === 0) return 0;
  var m = start
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
    while (start > 0 && arr[start - 1].time === t) {
      start--;
    }
  } else {
    //find to end
    while (start <= end && arr[start].time === t) {
      start++;
    }
  }

  return start;
}

function init(DanmakuFrame) {
  DanmakuFrame.addModule('TextDanmaku', TextDanmaku);
}

;
;

},{"../danmaku-frame.js":9,"./TextCanvas2D.js":10,"./TextCss.js":11,"./TextWebGL.js":12,"./Textoff.js":13,"@babel/runtime-corejs3/core-js-stable/date/now":18,"@babel/runtime-corejs3/core-js-stable/instance/bind":19,"@babel/runtime-corejs3/core-js-stable/instance/fill":22,"@babel/runtime-corejs3/core-js-stable/instance/for-each":23,"@babel/runtime-corejs3/core-js-stable/instance/index-of":24,"@babel/runtime-corejs3/core-js-stable/instance/splice":27,"@babel/runtime-corejs3/core-js-stable/object/assign":31,"@babel/runtime-corejs3/core-js-stable/object/create":32,"@babel/runtime-corejs3/core-js-stable/object/define-property":33,"@babel/runtime-corejs3/core-js-stable/object/get-prototype-of":36,"@babel/runtime-corejs3/core-js-stable/object/set-prototype-of":37,"@babel/runtime-corejs3/core-js-stable/reflect/construct":39,"@babel/runtime-corejs3/core-js-stable/set-interval":42,"@babel/runtime-corejs3/core-js-stable/symbol":44,"@babel/runtime-corejs3/core-js-stable/symbol/iterator":45,"core-js/modules/es.array.join":404,"core-js/modules/es.object.to-string":407,"core-js/modules/es.regexp.exec":409,"core-js/modules/es.regexp.to-string":410,"core-js/modules/es.string.replace":413,"core-js/modules/es.string.split":414,"core-js/modules/es.symbol":416,"core-js/modules/es.symbol.description":415}],15:[function(require,module,exports){
"use strict";

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    (0, _defineProperty2["default"])(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2["default"])(obj, key, {
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
/*
Copyright luojia@luojia.me
LGPL license
*/


var textModuleTemplate = /*#__PURE__*/function () {
  function textModuleTemplate(dText) {
    _classCallCheck(this, textModuleTemplate);

    _defineProperty(this, "supported", false);

    this.dText = dText;
  }

  _createClass(textModuleTemplate, [{
    key: "draw",
    value: function draw() {} //draw call from danmaku-frame on every animation frame

  }, {
    key: "rate",
    value: function rate() {} //playback rate

  }, {
    key: "pause",
    value: function pause() {} //the media is paused

  }, {
    key: "play",
    value: function play() {} //the media is starting

  }, {
    key: "clear",
    value: function clear() {} //clear all danmaku on screen

  }, {
    key: "resize",
    value: function resize() {} //the container is resized

  }, {
    key: "remove",
    value: function remove() {} //remove a danmaku freom the screen

  }, {
    key: "enable",
    value: function enable() {} //this module is enabled

  }, {
    key: "disable",
    value: function disable() {} //this module is disabled

  }, {
    key: "newDanmaku",
    value: function newDanmaku() {} //add danmaku to the screen

  }, {
    key: "deleteRelatedTextObject",
    value: function deleteRelatedTextObject() {}
  }]);

  return textModuleTemplate;
}();

var _default = textModuleTemplate;
exports["default"] = _default;

},{"@babel/runtime-corejs3/core-js-stable/object/define-property":33}],16:[function(require,module,exports){
module.exports = require("core-js-pure/stable/array/from");
},{"core-js-pure/stable/array/from":253}],17:[function(require,module,exports){
module.exports = require("core-js-pure/stable/array/is-array");
},{"core-js-pure/stable/array/is-array":254}],18:[function(require,module,exports){
module.exports = require("core-js-pure/stable/date/now");
},{"core-js-pure/stable/date/now":256}],19:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/bind");
},{"core-js-pure/stable/instance/bind":257}],20:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/concat");
},{"core-js-pure/stable/instance/concat":258}],21:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/copy-within");
},{"core-js-pure/stable/instance/copy-within":259}],22:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/fill");
},{"core-js-pure/stable/instance/fill":260}],23:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/for-each");
},{"core-js-pure/stable/instance/for-each":261}],24:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/index-of");
},{"core-js-pure/stable/instance/index-of":262}],25:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/slice");
},{"core-js-pure/stable/instance/slice":263}],26:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/sort");
},{"core-js-pure/stable/instance/sort":264}],27:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/splice");
},{"core-js-pure/stable/instance/splice":265}],28:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/starts-with");
},{"core-js-pure/stable/instance/starts-with":266}],29:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/trim");
},{"core-js-pure/stable/instance/trim":267}],30:[function(require,module,exports){
module.exports = require("core-js-pure/stable/number/is-integer");
},{"core-js-pure/stable/number/is-integer":268}],31:[function(require,module,exports){
module.exports = require("core-js-pure/stable/object/assign");
},{"core-js-pure/stable/object/assign":269}],32:[function(require,module,exports){
module.exports = require("core-js-pure/stable/object/create");
},{"core-js-pure/stable/object/create":270}],33:[function(require,module,exports){
module.exports = require("core-js-pure/stable/object/define-property");
},{"core-js-pure/stable/object/define-property":271}],34:[function(require,module,exports){
module.exports = require("core-js-pure/stable/object/entries");
},{"core-js-pure/stable/object/entries":272}],35:[function(require,module,exports){
module.exports = require("core-js-pure/stable/object/get-own-property-descriptor");
},{"core-js-pure/stable/object/get-own-property-descriptor":273}],36:[function(require,module,exports){
module.exports = require("core-js-pure/stable/object/get-prototype-of");
},{"core-js-pure/stable/object/get-prototype-of":274}],37:[function(require,module,exports){
module.exports = require("core-js-pure/stable/object/set-prototype-of");
},{"core-js-pure/stable/object/set-prototype-of":275}],38:[function(require,module,exports){
module.exports = require("core-js-pure/stable/promise");
},{"core-js-pure/stable/promise":276}],39:[function(require,module,exports){
module.exports = require("core-js-pure/stable/reflect/construct");
},{"core-js-pure/stable/reflect/construct":277}],40:[function(require,module,exports){
module.exports = require("core-js-pure/stable/reflect/get");
},{"core-js-pure/stable/reflect/get":278}],41:[function(require,module,exports){
module.exports = require("core-js-pure/stable/set-immediate");
},{"core-js-pure/stable/set-immediate":279}],42:[function(require,module,exports){
module.exports = require("core-js-pure/stable/set-interval");
},{"core-js-pure/stable/set-interval":280}],43:[function(require,module,exports){
module.exports = require("core-js-pure/stable/set-timeout");
},{"core-js-pure/stable/set-timeout":281}],44:[function(require,module,exports){
module.exports = require("core-js-pure/stable/symbol");
},{"core-js-pure/stable/symbol":282}],45:[function(require,module,exports){
module.exports = require("core-js-pure/stable/symbol/iterator");
},{"core-js-pure/stable/symbol/iterator":283}],46:[function(require,module,exports){
module.exports = require("core-js-pure/features/get-iterator-method");
},{"core-js-pure/features/get-iterator-method":88}],47:[function(require,module,exports){
module.exports = require("core-js-pure/features/get-iterator");
},{"core-js-pure/features/get-iterator":89}],48:[function(require,module,exports){
module.exports = require("core-js-pure/features/is-iterable");
},{"core-js-pure/features/is-iterable":90}],49:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":443}],50:[function(require,module,exports){
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

    var cache = new WeakMap();
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
    var calculateBoxSizes = function (target, forceRecalculation) {
        if (forceRecalculation === void 0) { forceRecalculation = false; }
        if (cache.has(target) && !forceRecalculation) {
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
    var calculateBoxSize = function (target, observedBox, forceRecalculation) {
        var _a = calculateBoxSizes(target, forceRecalculation), borderBoxSize = _a.borderBoxSize, contentBoxSize = _a.contentBoxSize, devicePixelContentBoxSize = _a.devicePixelContentBoxSize;
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
            var toggle_1 = 0;
            var el_1 = document.createTextNode('');
            var config = { characterData: true };
            new MutationObserver(function () { return notify(); }).observe(el_1, config);
            trigger = function () { el_1.textContent = "" + (toggle_1 ? toggle_1-- : toggle_1++); };
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
    var CATCH_PERIOD = 250;
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
    var time = function (timeout) {
        if (timeout === void 0) { timeout = 0; }
        return Date.now() + timeout;
    };
    var scheduled = false;
    var Scheduler = (function () {
        function Scheduler() {
            var _this = this;
            this.stopped = true;
            this.listener = function () { return _this.schedule(); };
        }
        Scheduler.prototype.run = function (timeout) {
            var _this = this;
            if (timeout === void 0) { timeout = CATCH_PERIOD; }
            if (scheduled) {
                return;
            }
            scheduled = true;
            var until = time(timeout);
            queueResizeObserver(function () {
                var elementsHaveResized = false;
                try {
                    elementsHaveResized = process();
                }
                finally {
                    scheduled = false;
                    timeout = until - time();
                    if (!isWatching()) {
                        return;
                    }
                    if (elementsHaveResized) {
                        _this.run(1000);
                    }
                    else if (timeout > 0) {
                        _this.run(timeout);
                    }
                    else {
                        _this.start();
                    }
                }
            });
        };
        Scheduler.prototype.schedule = function () {
            this.stop();
            this.run();
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
            var size = calculateBoxSize(this.target, this.observedBox, true);
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

    var observerMap = new WeakMap();
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
            observerMap.set(resizeObserver, detail);
        };
        ResizeObserverController.observe = function (resizeObserver, target, options) {
            var detail = observerMap.get(resizeObserver);
            var firstObservation = detail.observationTargets.length === 0;
            if (getObservationIndex(detail.observationTargets, target) < 0) {
                firstObservation && resizeObservers.push(detail);
                detail.observationTargets.push(new ResizeObservation(target, options && options.box));
                updateCount(1);
                scheduler.schedule();
            }
        };
        ResizeObserverController.unobserve = function (resizeObserver, target) {
            var detail = observerMap.get(resizeObserver);
            var index = getObservationIndex(detail.observationTargets, target);
            var lastObservation = detail.observationTargets.length === 1;
            if (index >= 0) {
                lastObservation && resizeObservers.splice(resizeObservers.indexOf(detail), 1);
                detail.observationTargets.splice(index, 1);
                updateCount(-1);
            }
        };
        ResizeObserverController.disconnect = function (resizeObserver) {
            var _this = this;
            var detail = observerMap.get(resizeObserver);
            detail.observationTargets.slice().forEach(function (ot) { return _this.unobserve(resizeObserver, ot.target); });
            detail.activeTargets.splice(0, detail.activeTargets.length);
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

},{}],51:[function(require,module,exports){
require('../../modules/es.string.iterator');
require('../../modules/es.array.from');
var path = require('../../internals/path');

module.exports = path.Array.from;

},{"../../internals/path":174,"../../modules/es.array.from":207,"../../modules/es.string.iterator":232}],52:[function(require,module,exports){
require('../../modules/es.array.is-array');
var path = require('../../internals/path');

module.exports = path.Array.isArray;

},{"../../internals/path":174,"../../modules/es.array.is-array":209}],53:[function(require,module,exports){
require('../../../modules/es.array.concat');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').concat;

},{"../../../internals/entry-virtual":124,"../../../modules/es.array.concat":203}],54:[function(require,module,exports){
require('../../../modules/es.array.copy-within');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').copyWithin;

},{"../../../internals/entry-virtual":124,"../../../modules/es.array.copy-within":204}],55:[function(require,module,exports){
require('../../../modules/es.array.fill');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').fill;

},{"../../../internals/entry-virtual":124,"../../../modules/es.array.fill":205}],56:[function(require,module,exports){
require('../../../modules/es.array.for-each');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').forEach;

},{"../../../internals/entry-virtual":124,"../../../modules/es.array.for-each":206}],57:[function(require,module,exports){
require('../../../modules/es.array.index-of');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').indexOf;

},{"../../../internals/entry-virtual":124,"../../../modules/es.array.index-of":208}],58:[function(require,module,exports){
require('../../../modules/es.array.slice');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').slice;

},{"../../../internals/entry-virtual":124,"../../../modules/es.array.slice":211}],59:[function(require,module,exports){
require('../../../modules/es.array.sort');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').sort;

},{"../../../internals/entry-virtual":124,"../../../modules/es.array.sort":212}],60:[function(require,module,exports){
require('../../../modules/es.array.splice');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').splice;

},{"../../../internals/entry-virtual":124,"../../../modules/es.array.splice":213}],61:[function(require,module,exports){
require('../../modules/es.date.now');
var path = require('../../internals/path');

module.exports = path.Date.now;

},{"../../internals/path":174,"../../modules/es.date.now":214}],62:[function(require,module,exports){
require('../../../modules/es.function.bind');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Function').bind;

},{"../../../internals/entry-virtual":124,"../../../modules/es.function.bind":215}],63:[function(require,module,exports){
var bind = require('../function/virtual/bind');

var FunctionPrototype = Function.prototype;

module.exports = function (it) {
  var own = it.bind;
  return it === FunctionPrototype || (it instanceof Function && own === FunctionPrototype.bind) ? bind : own;
};

},{"../function/virtual/bind":62}],64:[function(require,module,exports){
var concat = require('../array/virtual/concat');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.concat;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.concat) ? concat : own;
};

},{"../array/virtual/concat":53}],65:[function(require,module,exports){
var copyWithin = require('../array/virtual/copy-within');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.copyWithin;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.copyWithin) ? copyWithin : own;
};

},{"../array/virtual/copy-within":54}],66:[function(require,module,exports){
var fill = require('../array/virtual/fill');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.fill;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.fill) ? fill : own;
};

},{"../array/virtual/fill":55}],67:[function(require,module,exports){
var indexOf = require('../array/virtual/index-of');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.indexOf;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.indexOf) ? indexOf : own;
};

},{"../array/virtual/index-of":57}],68:[function(require,module,exports){
var slice = require('../array/virtual/slice');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.slice;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.slice) ? slice : own;
};

},{"../array/virtual/slice":58}],69:[function(require,module,exports){
var sort = require('../array/virtual/sort');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.sort;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.sort) ? sort : own;
};

},{"../array/virtual/sort":59}],70:[function(require,module,exports){
var splice = require('../array/virtual/splice');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.splice;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.splice) ? splice : own;
};

},{"../array/virtual/splice":60}],71:[function(require,module,exports){
var startsWith = require('../string/virtual/starts-with');

var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.startsWith;
  return typeof it === 'string' || it === StringPrototype
    || (it instanceof String && own === StringPrototype.startsWith) ? startsWith : own;
};

},{"../string/virtual/starts-with":84}],72:[function(require,module,exports){
var trim = require('../string/virtual/trim');

var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.trim;
  return typeof it === 'string' || it === StringPrototype
    || (it instanceof String && own === StringPrototype.trim) ? trim : own;
};

},{"../string/virtual/trim":85}],73:[function(require,module,exports){
require('../../modules/es.number.is-integer');
var path = require('../../internals/path');

module.exports = path.Number.isInteger;

},{"../../internals/path":174,"../../modules/es.number.is-integer":218}],74:[function(require,module,exports){
require('../../modules/es.object.assign');
var path = require('../../internals/path');

module.exports = path.Object.assign;

},{"../../internals/path":174,"../../modules/es.object.assign":219}],75:[function(require,module,exports){
require('../../modules/es.object.create');
var path = require('../../internals/path');

var Object = path.Object;

module.exports = function create(P, D) {
  return Object.create(P, D);
};

},{"../../internals/path":174,"../../modules/es.object.create":220}],76:[function(require,module,exports){
require('../../modules/es.object.define-property');
var path = require('../../internals/path');

var Object = path.Object;

var defineProperty = module.exports = function defineProperty(it, key, desc) {
  return Object.defineProperty(it, key, desc);
};

if (Object.defineProperty.sham) defineProperty.sham = true;

},{"../../internals/path":174,"../../modules/es.object.define-property":221}],77:[function(require,module,exports){
require('../../modules/es.object.entries');
var path = require('../../internals/path');

module.exports = path.Object.entries;

},{"../../internals/path":174,"../../modules/es.object.entries":222}],78:[function(require,module,exports){
require('../../modules/es.object.get-own-property-descriptor');
var path = require('../../internals/path');

var Object = path.Object;

var getOwnPropertyDescriptor = module.exports = function getOwnPropertyDescriptor(it, key) {
  return Object.getOwnPropertyDescriptor(it, key);
};

if (Object.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor.sham = true;

},{"../../internals/path":174,"../../modules/es.object.get-own-property-descriptor":223}],79:[function(require,module,exports){
require('../../modules/es.object.get-prototype-of');
var path = require('../../internals/path');

module.exports = path.Object.getPrototypeOf;

},{"../../internals/path":174,"../../modules/es.object.get-prototype-of":224}],80:[function(require,module,exports){
require('../../modules/es.object.set-prototype-of');
var path = require('../../internals/path');

module.exports = path.Object.setPrototypeOf;

},{"../../internals/path":174,"../../modules/es.object.set-prototype-of":225}],81:[function(require,module,exports){
require('../../modules/es.object.to-string');
require('../../modules/es.string.iterator');
require('../../modules/web.dom-collections.iterator');
require('../../modules/es.promise');
require('../../modules/es.promise.all-settled');
require('../../modules/es.promise.finally');
var path = require('../../internals/path');

module.exports = path.Promise;

},{"../../internals/path":174,"../../modules/es.object.to-string":226,"../../modules/es.promise":229,"../../modules/es.promise.all-settled":227,"../../modules/es.promise.finally":228,"../../modules/es.string.iterator":232,"../../modules/web.dom-collections.iterator":250}],82:[function(require,module,exports){
require('../../modules/es.reflect.construct');
var path = require('../../internals/path');

module.exports = path.Reflect.construct;

},{"../../internals/path":174,"../../modules/es.reflect.construct":230}],83:[function(require,module,exports){
require('../../modules/es.reflect.get');
var path = require('../../internals/path');

module.exports = path.Reflect.get;

},{"../../internals/path":174,"../../modules/es.reflect.get":231}],84:[function(require,module,exports){
require('../../../modules/es.string.starts-with');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('String').startsWith;

},{"../../../internals/entry-virtual":124,"../../../modules/es.string.starts-with":233}],85:[function(require,module,exports){
require('../../../modules/es.string.trim');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('String').trim;

},{"../../../internals/entry-virtual":124,"../../../modules/es.string.trim":234}],86:[function(require,module,exports){
require('../../modules/es.array.concat');
require('../../modules/es.object.to-string');
require('../../modules/es.symbol');
require('../../modules/es.symbol.async-iterator');
require('../../modules/es.symbol.description');
require('../../modules/es.symbol.has-instance');
require('../../modules/es.symbol.is-concat-spreadable');
require('../../modules/es.symbol.iterator');
require('../../modules/es.symbol.match');
require('../../modules/es.symbol.match-all');
require('../../modules/es.symbol.replace');
require('../../modules/es.symbol.search');
require('../../modules/es.symbol.species');
require('../../modules/es.symbol.split');
require('../../modules/es.symbol.to-primitive');
require('../../modules/es.symbol.to-string-tag');
require('../../modules/es.symbol.unscopables');
require('../../modules/es.math.to-string-tag');
require('../../modules/es.json.to-string-tag');
var path = require('../../internals/path');

module.exports = path.Symbol;

},{"../../internals/path":174,"../../modules/es.array.concat":203,"../../modules/es.json.to-string-tag":216,"../../modules/es.math.to-string-tag":217,"../../modules/es.object.to-string":226,"../../modules/es.symbol":240,"../../modules/es.symbol.async-iterator":235,"../../modules/es.symbol.description":236,"../../modules/es.symbol.has-instance":237,"../../modules/es.symbol.is-concat-spreadable":238,"../../modules/es.symbol.iterator":239,"../../modules/es.symbol.match":242,"../../modules/es.symbol.match-all":241,"../../modules/es.symbol.replace":243,"../../modules/es.symbol.search":244,"../../modules/es.symbol.species":245,"../../modules/es.symbol.split":246,"../../modules/es.symbol.to-primitive":247,"../../modules/es.symbol.to-string-tag":248,"../../modules/es.symbol.unscopables":249}],87:[function(require,module,exports){
require('../../modules/es.symbol.iterator');
require('../../modules/es.string.iterator');
require('../../modules/web.dom-collections.iterator');
var WrappedWellKnownSymbolModule = require('../../internals/well-known-symbol-wrapped');

module.exports = WrappedWellKnownSymbolModule.f('iterator');

},{"../../internals/well-known-symbol-wrapped":200,"../../modules/es.string.iterator":232,"../../modules/es.symbol.iterator":239,"../../modules/web.dom-collections.iterator":250}],88:[function(require,module,exports){
require('../modules/web.dom-collections.iterator');
require('../modules/es.string.iterator');
var getIteratorMethod = require('../internals/get-iterator-method');

module.exports = getIteratorMethod;

},{"../internals/get-iterator-method":131,"../modules/es.string.iterator":232,"../modules/web.dom-collections.iterator":250}],89:[function(require,module,exports){
require('../modules/web.dom-collections.iterator');
require('../modules/es.string.iterator');
var getIterator = require('../internals/get-iterator');

module.exports = getIterator;

},{"../internals/get-iterator":132,"../modules/es.string.iterator":232,"../modules/web.dom-collections.iterator":250}],90:[function(require,module,exports){
require('../modules/web.dom-collections.iterator');
require('../modules/es.string.iterator');
var isIterable = require('../internals/is-iterable');

module.exports = isIterable;

},{"../internals/is-iterable":146,"../modules/es.string.iterator":232,"../modules/web.dom-collections.iterator":250}],91:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

},{}],92:[function(require,module,exports){
var isObject = require('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

},{"../internals/is-object":147}],93:[function(require,module,exports){
module.exports = function () { /* empty */ };

},{}],94:[function(require,module,exports){
module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

},{}],95:[function(require,module,exports){
var isObject = require('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

},{"../internals/is-object":147}],96:[function(require,module,exports){
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

},{"../internals/to-absolute-index":191,"../internals/to-length":194,"../internals/to-object":195}],97:[function(require,module,exports){
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

},{"../internals/to-absolute-index":191,"../internals/to-length":194,"../internals/to-object":195}],98:[function(require,module,exports){
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

},{"../internals/array-iteration":101,"../internals/array-method-is-strict":103,"../internals/array-method-uses-to-length":104}],99:[function(require,module,exports){
'use strict';
var bind = require('../internals/function-bind-context');
var toObject = require('../internals/to-object');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var toLength = require('../internals/to-length');
var createProperty = require('../internals/create-property');
var getIteratorMethod = require('../internals/get-iterator-method');

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};

},{"../internals/call-with-safe-iteration-closing":106,"../internals/create-property":115,"../internals/function-bind-context":128,"../internals/get-iterator-method":131,"../internals/is-array-iterator-method":142,"../internals/to-length":194,"../internals/to-object":195}],100:[function(require,module,exports){
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

},{"../internals/to-absolute-index":191,"../internals/to-indexed-object":192,"../internals/to-length":194}],101:[function(require,module,exports){
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

},{"../internals/array-species-create":105,"../internals/function-bind-context":128,"../internals/indexed-object":139,"../internals/to-length":194,"../internals/to-object":195}],102:[function(require,module,exports){
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

},{"../internals/engine-v8-version":123,"../internals/fails":127,"../internals/well-known-symbol":201}],103:[function(require,module,exports){
'use strict';
var fails = require('../internals/fails');

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

},{"../internals/fails":127}],104:[function(require,module,exports){
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

},{"../internals/descriptors":118,"../internals/fails":127,"../internals/has":134}],105:[function(require,module,exports){
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

},{"../internals/is-array":143,"../internals/is-object":147,"../internals/well-known-symbol":201}],106:[function(require,module,exports){
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

},{"../internals/an-object":95}],107:[function(require,module,exports){
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

},{"../internals/well-known-symbol":201}],108:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],109:[function(require,module,exports){
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

},{"../internals/classof-raw":108,"../internals/to-string-tag-support":197,"../internals/well-known-symbol":201}],110:[function(require,module,exports){
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

},{"../internals/well-known-symbol":201}],111:[function(require,module,exports){
var fails = require('../internals/fails');

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

},{"../internals/fails":127}],112:[function(require,module,exports){
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

},{"../internals/create-property-descriptor":114,"../internals/iterators":152,"../internals/iterators-core":151,"../internals/object-create":160,"../internals/set-to-string-tag":182}],113:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"../internals/create-property-descriptor":114,"../internals/descriptors":118,"../internals/object-define-property":162}],114:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],115:[function(require,module,exports){
'use strict';
var toPrimitive = require('../internals/to-primitive');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

},{"../internals/create-property-descriptor":114,"../internals/object-define-property":162,"../internals/to-primitive":196}],116:[function(require,module,exports){
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

},{"../internals/create-iterator-constructor":112,"../internals/create-non-enumerable-property":113,"../internals/export":126,"../internals/is-pure":148,"../internals/iterators":152,"../internals/iterators-core":151,"../internals/object-get-prototype-of":167,"../internals/object-set-prototype-of":171,"../internals/redefine":178,"../internals/set-to-string-tag":182,"../internals/well-known-symbol":201}],117:[function(require,module,exports){
var path = require('../internals/path');
var has = require('../internals/has');
var wrappedWellKnownSymbolModule = require('../internals/well-known-symbol-wrapped');
var defineProperty = require('../internals/object-define-property').f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};

},{"../internals/has":134,"../internals/object-define-property":162,"../internals/path":174,"../internals/well-known-symbol-wrapped":200}],118:[function(require,module,exports){
var fails = require('../internals/fails');

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

},{"../internals/fails":127}],119:[function(require,module,exports){
var global = require('../internals/global');
var isObject = require('../internals/is-object');

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

},{"../internals/global":133,"../internals/is-object":147}],120:[function(require,module,exports){
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

},{}],121:[function(require,module,exports){
var userAgent = require('../internals/engine-user-agent');

module.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);

},{"../internals/engine-user-agent":122}],122:[function(require,module,exports){
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('navigator', 'userAgent') || '';

},{"../internals/get-built-in":130}],123:[function(require,module,exports){
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

},{"../internals/engine-user-agent":122,"../internals/global":133}],124:[function(require,module,exports){
var path = require('../internals/path');

module.exports = function (CONSTRUCTOR) {
  return path[CONSTRUCTOR + 'Prototype'];
};

},{"../internals/path":174}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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

},{"../internals/create-non-enumerable-property":113,"../internals/function-bind-context":128,"../internals/global":133,"../internals/has":134,"../internals/is-forced":144,"../internals/object-get-own-property-descriptor":163,"../internals/path":174}],127:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

},{}],128:[function(require,module,exports){
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

},{"../internals/a-function":91}],129:[function(require,module,exports){
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

},{"../internals/a-function":91,"../internals/is-object":147}],130:[function(require,module,exports){
var path = require('../internals/path');
var global = require('../internals/global');

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

},{"../internals/global":133,"../internals/path":174}],131:[function(require,module,exports){
var classof = require('../internals/classof');
var Iterators = require('../internals/iterators');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"../internals/classof":109,"../internals/iterators":152,"../internals/well-known-symbol":201}],132:[function(require,module,exports){
var anObject = require('../internals/an-object');
var getIteratorMethod = require('../internals/get-iterator-method');

module.exports = function (it) {
  var iteratorMethod = getIteratorMethod(it);
  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  } return anObject(iteratorMethod.call(it));
};

},{"../internals/an-object":95,"../internals/get-iterator-method":131}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],135:[function(require,module,exports){
module.exports = {};

},{}],136:[function(require,module,exports){
var global = require('../internals/global');

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

},{"../internals/global":133}],137:[function(require,module,exports){
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('document', 'documentElement');

},{"../internals/get-built-in":130}],138:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var createElement = require('../internals/document-create-element');

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

},{"../internals/descriptors":118,"../internals/document-create-element":119,"../internals/fails":127}],139:[function(require,module,exports){
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

},{"../internals/classof-raw":108,"../internals/fails":127}],140:[function(require,module,exports){
var store = require('../internals/shared-store');

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;

},{"../internals/shared-store":184}],141:[function(require,module,exports){
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

},{"../internals/create-non-enumerable-property":113,"../internals/global":133,"../internals/has":134,"../internals/hidden-keys":135,"../internals/is-object":147,"../internals/native-weak-map":156,"../internals/shared-key":183}],142:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

},{"../internals/iterators":152,"../internals/well-known-symbol":201}],143:[function(require,module,exports){
var classof = require('../internals/classof-raw');

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};

},{"../internals/classof-raw":108}],144:[function(require,module,exports){
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

},{"../internals/fails":127}],145:[function(require,module,exports){
var isObject = require('../internals/is-object');

var floor = Math.floor;

// `Number.isInteger` method implementation
// https://tc39.github.io/ecma262/#sec-number.isinteger
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"../internals/is-object":147}],146:[function(require,module,exports){
var classof = require('../internals/classof');
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};

},{"../internals/classof":109,"../internals/iterators":152,"../internals/well-known-symbol":201}],147:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],148:[function(require,module,exports){
module.exports = true;

},{}],149:[function(require,module,exports){
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

},{"../internals/classof-raw":108,"../internals/is-object":147,"../internals/well-known-symbol":201}],150:[function(require,module,exports){
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

},{"../internals/an-object":95,"../internals/call-with-safe-iteration-closing":106,"../internals/function-bind-context":128,"../internals/get-iterator-method":131,"../internals/is-array-iterator-method":142,"../internals/to-length":194}],151:[function(require,module,exports){
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

},{"../internals/create-non-enumerable-property":113,"../internals/has":134,"../internals/is-pure":148,"../internals/object-get-prototype-of":167,"../internals/well-known-symbol":201}],152:[function(require,module,exports){
arguments[4][135][0].apply(exports,arguments)
},{"dup":135}],153:[function(require,module,exports){
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

},{"../internals/classof-raw":108,"../internals/engine-is-ios":121,"../internals/global":133,"../internals/object-get-own-property-descriptor":163,"../internals/task":190}],154:[function(require,module,exports){
var global = require('../internals/global');

module.exports = global.Promise;

},{"../internals/global":133}],155:[function(require,module,exports){
var fails = require('../internals/fails');

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

},{"../internals/fails":127}],156:[function(require,module,exports){
var global = require('../internals/global');
var inspectSource = require('../internals/inspect-source');

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

},{"../internals/global":133,"../internals/inspect-source":140}],157:[function(require,module,exports){
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

},{"../internals/a-function":91}],158:[function(require,module,exports){
var isRegExp = require('../internals/is-regexp');

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};

},{"../internals/is-regexp":149}],159:[function(require,module,exports){
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

},{"../internals/descriptors":118,"../internals/fails":127,"../internals/indexed-object":139,"../internals/object-get-own-property-symbols":166,"../internals/object-keys":169,"../internals/object-property-is-enumerable":170,"../internals/to-object":195}],160:[function(require,module,exports){
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

},{"../internals/an-object":95,"../internals/document-create-element":119,"../internals/enum-bug-keys":125,"../internals/hidden-keys":135,"../internals/html":137,"../internals/object-define-properties":161,"../internals/shared-key":183}],161:[function(require,module,exports){
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

},{"../internals/an-object":95,"../internals/descriptors":118,"../internals/object-define-property":162,"../internals/object-keys":169}],162:[function(require,module,exports){
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

},{"../internals/an-object":95,"../internals/descriptors":118,"../internals/ie8-dom-define":138,"../internals/to-primitive":196}],163:[function(require,module,exports){
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

},{"../internals/create-property-descriptor":114,"../internals/descriptors":118,"../internals/has":134,"../internals/ie8-dom-define":138,"../internals/object-property-is-enumerable":170,"../internals/to-indexed-object":192,"../internals/to-primitive":196}],164:[function(require,module,exports){
var toIndexedObject = require('../internals/to-indexed-object');
var nativeGetOwnPropertyNames = require('../internals/object-get-own-property-names').f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};

},{"../internals/object-get-own-property-names":165,"../internals/to-indexed-object":192}],165:[function(require,module,exports){
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

},{"../internals/enum-bug-keys":125,"../internals/object-keys-internal":168}],166:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],167:[function(require,module,exports){
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

},{"../internals/correct-prototype-getter":111,"../internals/has":134,"../internals/shared-key":183,"../internals/to-object":195}],168:[function(require,module,exports){
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

},{"../internals/array-includes":100,"../internals/has":134,"../internals/hidden-keys":135,"../internals/to-indexed-object":192}],169:[function(require,module,exports){
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

},{"../internals/enum-bug-keys":125,"../internals/object-keys-internal":168}],170:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){
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

},{"../internals/a-possible-prototype":92,"../internals/an-object":95}],172:[function(require,module,exports){
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

},{"../internals/descriptors":118,"../internals/object-keys":169,"../internals/object-property-is-enumerable":170,"../internals/to-indexed-object":192}],173:[function(require,module,exports){
'use strict';
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var classof = require('../internals/classof');

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

},{"../internals/classof":109,"../internals/to-string-tag-support":197}],174:[function(require,module,exports){
arguments[4][135][0].apply(exports,arguments)
},{"dup":135}],175:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

},{}],176:[function(require,module,exports){
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

},{"../internals/an-object":95,"../internals/is-object":147,"../internals/new-promise-capability":157}],177:[function(require,module,exports){
var redefine = require('../internals/redefine');

module.exports = function (target, src, options) {
  for (var key in src) {
    if (options && options.unsafe && target[key]) target[key] = src[key];
    else redefine(target, key, src[key], options);
  } return target;
};

},{"../internals/redefine":178}],178:[function(require,module,exports){
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

module.exports = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;
  else createNonEnumerableProperty(target, key, value);
};

},{"../internals/create-non-enumerable-property":113}],179:[function(require,module,exports){
// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

},{}],180:[function(require,module,exports){
var global = require('../internals/global');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};

},{"../internals/create-non-enumerable-property":113,"../internals/global":133}],181:[function(require,module,exports){
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

},{"../internals/descriptors":118,"../internals/get-built-in":130,"../internals/object-define-property":162,"../internals/well-known-symbol":201}],182:[function(require,module,exports){
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

},{"../internals/create-non-enumerable-property":113,"../internals/has":134,"../internals/object-define-property":162,"../internals/object-to-string":173,"../internals/to-string-tag-support":197,"../internals/well-known-symbol":201}],183:[function(require,module,exports){
var shared = require('../internals/shared');
var uid = require('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":185,"../internals/uid":198}],184:[function(require,module,exports){
var global = require('../internals/global');
var setGlobal = require('../internals/set-global');

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;

},{"../internals/global":133,"../internals/set-global":180}],185:[function(require,module,exports){
var IS_PURE = require('../internals/is-pure');
var store = require('../internals/shared-store');

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.4',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

},{"../internals/is-pure":148,"../internals/shared-store":184}],186:[function(require,module,exports){
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

},{"../internals/a-function":91,"../internals/an-object":95,"../internals/well-known-symbol":201}],187:[function(require,module,exports){
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

},{"../internals/require-object-coercible":179,"../internals/to-integer":193}],188:[function(require,module,exports){
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

},{"../internals/fails":127,"../internals/whitespaces":202}],189:[function(require,module,exports){
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

},{"../internals/require-object-coercible":179,"../internals/whitespaces":202}],190:[function(require,module,exports){
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

},{"../internals/classof-raw":108,"../internals/document-create-element":119,"../internals/engine-is-ios":121,"../internals/fails":127,"../internals/function-bind-context":128,"../internals/global":133,"../internals/html":137}],191:[function(require,module,exports){
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

},{"../internals/to-integer":193}],192:[function(require,module,exports){
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object');
var requireObjectCoercible = require('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":139,"../internals/require-object-coercible":179}],193:[function(require,module,exports){
var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

},{}],194:[function(require,module,exports){
var toInteger = require('../internals/to-integer');

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer":193}],195:[function(require,module,exports){
var requireObjectCoercible = require('../internals/require-object-coercible');

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

},{"../internals/require-object-coercible":179}],196:[function(require,module,exports){
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

},{"../internals/is-object":147}],197:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';

},{"../internals/well-known-symbol":201}],198:[function(require,module,exports){
var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

},{}],199:[function(require,module,exports){
var NATIVE_SYMBOL = require('../internals/native-symbol');

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';

},{"../internals/native-symbol":155}],200:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');

exports.f = wellKnownSymbol;

},{"../internals/well-known-symbol":201}],201:[function(require,module,exports){
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

},{"../internals/global":133,"../internals/has":134,"../internals/native-symbol":155,"../internals/shared":185,"../internals/uid":198,"../internals/use-symbol-as-uid":199}],202:[function(require,module,exports){
// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],203:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var fails = require('../internals/fails');
var isArray = require('../internals/is-array');
var isObject = require('../internals/is-object');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var createProperty = require('../internals/create-property');
var arraySpeciesCreate = require('../internals/array-species-create');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/engine-v8-version');

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

},{"../internals/array-method-has-species-support":102,"../internals/array-species-create":105,"../internals/create-property":115,"../internals/engine-v8-version":123,"../internals/export":126,"../internals/fails":127,"../internals/is-array":143,"../internals/is-object":147,"../internals/to-length":194,"../internals/to-object":195,"../internals/well-known-symbol":201}],204:[function(require,module,exports){
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

},{"../internals/add-to-unscopables":93,"../internals/array-copy-within":96,"../internals/export":126}],205:[function(require,module,exports){
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

},{"../internals/add-to-unscopables":93,"../internals/array-fill":97,"../internals/export":126}],206:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var forEach = require('../internals/array-for-each');

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});

},{"../internals/array-for-each":98,"../internals/export":126}],207:[function(require,module,exports){
var $ = require('../internals/export');
var from = require('../internals/array-from');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});

},{"../internals/array-from":99,"../internals/check-correctness-of-iteration":107,"../internals/export":126}],208:[function(require,module,exports){
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

},{"../internals/array-includes":100,"../internals/array-method-is-strict":103,"../internals/array-method-uses-to-length":104,"../internals/export":126}],209:[function(require,module,exports){
var $ = require('../internals/export');
var isArray = require('../internals/is-array');

// `Array.isArray` method
// https://tc39.github.io/ecma262/#sec-array.isarray
$({ target: 'Array', stat: true }, {
  isArray: isArray
});

},{"../internals/export":126,"../internals/is-array":143}],210:[function(require,module,exports){
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

},{"../internals/add-to-unscopables":93,"../internals/define-iterator":116,"../internals/internal-state":141,"../internals/iterators":152,"../internals/to-indexed-object":192}],211:[function(require,module,exports){
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

},{"../internals/array-method-has-species-support":102,"../internals/array-method-uses-to-length":104,"../internals/create-property":115,"../internals/export":126,"../internals/is-array":143,"../internals/is-object":147,"../internals/to-absolute-index":191,"../internals/to-indexed-object":192,"../internals/to-length":194,"../internals/well-known-symbol":201}],212:[function(require,module,exports){
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

},{"../internals/a-function":91,"../internals/array-method-is-strict":103,"../internals/export":126,"../internals/fails":127,"../internals/to-object":195}],213:[function(require,module,exports){
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

},{"../internals/array-method-has-species-support":102,"../internals/array-method-uses-to-length":104,"../internals/array-species-create":105,"../internals/create-property":115,"../internals/export":126,"../internals/to-absolute-index":191,"../internals/to-integer":193,"../internals/to-length":194,"../internals/to-object":195}],214:[function(require,module,exports){
var $ = require('../internals/export');

// `Date.now` method
// https://tc39.github.io/ecma262/#sec-date.now
$({ target: 'Date', stat: true }, {
  now: function now() {
    return new Date().getTime();
  }
});

},{"../internals/export":126}],215:[function(require,module,exports){
var $ = require('../internals/export');
var bind = require('../internals/function-bind');

// `Function.prototype.bind` method
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
$({ target: 'Function', proto: true }, {
  bind: bind
});

},{"../internals/export":126,"../internals/function-bind":129}],216:[function(require,module,exports){
var global = require('../internals/global');
var setToStringTag = require('../internals/set-to-string-tag');

// JSON[@@toStringTag] property
// https://tc39.github.io/ecma262/#sec-json-@@tostringtag
setToStringTag(global.JSON, 'JSON', true);

},{"../internals/global":133,"../internals/set-to-string-tag":182}],217:[function(require,module,exports){
var setToStringTag = require('../internals/set-to-string-tag');

// Math[@@toStringTag] property
// https://tc39.github.io/ecma262/#sec-math-@@tostringtag
setToStringTag(Math, 'Math', true);

},{"../internals/set-to-string-tag":182}],218:[function(require,module,exports){
var $ = require('../internals/export');
var isInteger = require('../internals/is-integer');

// `Number.isInteger` method
// https://tc39.github.io/ecma262/#sec-number.isinteger
$({ target: 'Number', stat: true }, {
  isInteger: isInteger
});

},{"../internals/export":126,"../internals/is-integer":145}],219:[function(require,module,exports){
var $ = require('../internals/export');
var assign = require('../internals/object-assign');

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});

},{"../internals/export":126,"../internals/object-assign":159}],220:[function(require,module,exports){
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var create = require('../internals/object-create');

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  create: create
});

},{"../internals/descriptors":118,"../internals/export":126,"../internals/object-create":160}],221:[function(require,module,exports){
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var objectDefinePropertyModile = require('../internals/object-define-property');

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperty: objectDefinePropertyModile.f
});

},{"../internals/descriptors":118,"../internals/export":126,"../internals/object-define-property":162}],222:[function(require,module,exports){
var $ = require('../internals/export');
var $entries = require('../internals/object-to-array').entries;

// `Object.entries` method
// https://tc39.github.io/ecma262/#sec-object.entries
$({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});

},{"../internals/export":126,"../internals/object-to-array":172}],223:[function(require,module,exports){
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

},{"../internals/descriptors":118,"../internals/export":126,"../internals/fails":127,"../internals/object-get-own-property-descriptor":163,"../internals/to-indexed-object":192}],224:[function(require,module,exports){
var $ = require('../internals/export');
var fails = require('../internals/fails');
var toObject = require('../internals/to-object');
var nativeGetPrototypeOf = require('../internals/object-get-prototype-of');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});


},{"../internals/correct-prototype-getter":111,"../internals/export":126,"../internals/fails":127,"../internals/object-get-prototype-of":167,"../internals/to-object":195}],225:[function(require,module,exports){
var $ = require('../internals/export');
var setPrototypeOf = require('../internals/object-set-prototype-of');

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
$({ target: 'Object', stat: true }, {
  setPrototypeOf: setPrototypeOf
});

},{"../internals/export":126,"../internals/object-set-prototype-of":171}],226:[function(require,module,exports){
// empty

},{}],227:[function(require,module,exports){
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

},{"../internals/a-function":91,"../internals/export":126,"../internals/iterate":150,"../internals/new-promise-capability":157,"../internals/perform":175}],228:[function(require,module,exports){
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

},{"../internals/export":126,"../internals/fails":127,"../internals/get-built-in":130,"../internals/is-pure":148,"../internals/native-promise-constructor":154,"../internals/promise-resolve":176,"../internals/redefine":178,"../internals/species-constructor":186}],229:[function(require,module,exports){
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

},{"../internals/a-function":91,"../internals/an-instance":94,"../internals/check-correctness-of-iteration":107,"../internals/classof-raw":108,"../internals/engine-v8-version":123,"../internals/export":126,"../internals/get-built-in":130,"../internals/global":133,"../internals/host-report-errors":136,"../internals/inspect-source":140,"../internals/internal-state":141,"../internals/is-forced":144,"../internals/is-object":147,"../internals/is-pure":148,"../internals/iterate":150,"../internals/microtask":153,"../internals/native-promise-constructor":154,"../internals/new-promise-capability":157,"../internals/perform":175,"../internals/promise-resolve":176,"../internals/redefine":178,"../internals/redefine-all":177,"../internals/set-species":181,"../internals/set-to-string-tag":182,"../internals/species-constructor":186,"../internals/task":190,"../internals/well-known-symbol":201}],230:[function(require,module,exports){
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var create = require('../internals/object-create');
var bind = require('../internals/function-bind');
var fails = require('../internals/fails');

var nativeConstruct = getBuiltIn('Reflect', 'construct');

// `Reflect.construct` method
// https://tc39.github.io/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  nativeConstruct(function () { /* empty */ });
});
var FORCED = NEW_TARGET_BUG || ARGS_BUG;

$({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

},{"../internals/a-function":91,"../internals/an-object":95,"../internals/export":126,"../internals/fails":127,"../internals/function-bind":129,"../internals/get-built-in":130,"../internals/is-object":147,"../internals/object-create":160}],231:[function(require,module,exports){
var $ = require('../internals/export');
var isObject = require('../internals/is-object');
var anObject = require('../internals/an-object');
var has = require('../internals/has');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var getPrototypeOf = require('../internals/object-get-prototype-of');

// `Reflect.get` method
// https://tc39.github.io/ecma262/#sec-reflect.get
function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject(target) === receiver) return target[propertyKey];
  if (descriptor = getOwnPropertyDescriptorModule.f(target, propertyKey)) return has(descriptor, 'value')
    ? descriptor.value
    : descriptor.get === undefined
      ? undefined
      : descriptor.get.call(receiver);
  if (isObject(prototype = getPrototypeOf(target))) return get(prototype, propertyKey, receiver);
}

$({ target: 'Reflect', stat: true }, {
  get: get
});

},{"../internals/an-object":95,"../internals/export":126,"../internals/has":134,"../internals/is-object":147,"../internals/object-get-own-property-descriptor":163,"../internals/object-get-prototype-of":167}],232:[function(require,module,exports){
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

},{"../internals/define-iterator":116,"../internals/internal-state":141,"../internals/string-multibyte":187}],233:[function(require,module,exports){
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

},{"../internals/correct-is-regexp-logic":110,"../internals/export":126,"../internals/is-pure":148,"../internals/not-a-regexp":158,"../internals/object-get-own-property-descriptor":163,"../internals/require-object-coercible":179,"../internals/to-length":194}],234:[function(require,module,exports){
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

},{"../internals/export":126,"../internals/string-trim":189,"../internals/string-trim-forced":188}],235:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.asyncIterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.asynciterator
defineWellKnownSymbol('asyncIterator');

},{"../internals/define-well-known-symbol":117}],236:[function(require,module,exports){
arguments[4][226][0].apply(exports,arguments)
},{"dup":226}],237:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.hasInstance` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.hasinstance
defineWellKnownSymbol('hasInstance');

},{"../internals/define-well-known-symbol":117}],238:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.isConcatSpreadable` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.isconcatspreadable
defineWellKnownSymbol('isConcatSpreadable');

},{"../internals/define-well-known-symbol":117}],239:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');

},{"../internals/define-well-known-symbol":117}],240:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var global = require('../internals/global');
var getBuiltIn = require('../internals/get-built-in');
var IS_PURE = require('../internals/is-pure');
var DESCRIPTORS = require('../internals/descriptors');
var NATIVE_SYMBOL = require('../internals/native-symbol');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');
var fails = require('../internals/fails');
var has = require('../internals/has');
var isArray = require('../internals/is-array');
var isObject = require('../internals/is-object');
var anObject = require('../internals/an-object');
var toObject = require('../internals/to-object');
var toIndexedObject = require('../internals/to-indexed-object');
var toPrimitive = require('../internals/to-primitive');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var nativeObjectCreate = require('../internals/object-create');
var objectKeys = require('../internals/object-keys');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertyNamesExternal = require('../internals/object-get-own-property-names-external');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var shared = require('../internals/shared');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');
var uid = require('../internals/uid');
var wellKnownSymbol = require('../internals/well-known-symbol');
var wrappedWellKnownSymbolModule = require('../internals/well-known-symbol-wrapped');
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');
var setToStringTag = require('../internals/set-to-string-tag');
var InternalStateModule = require('../internals/internal-state');
var $forEach = require('../internals/array-iteration').forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;

},{"../internals/an-object":95,"../internals/array-iteration":101,"../internals/create-non-enumerable-property":113,"../internals/create-property-descriptor":114,"../internals/define-well-known-symbol":117,"../internals/descriptors":118,"../internals/export":126,"../internals/fails":127,"../internals/get-built-in":130,"../internals/global":133,"../internals/has":134,"../internals/hidden-keys":135,"../internals/internal-state":141,"../internals/is-array":143,"../internals/is-object":147,"../internals/is-pure":148,"../internals/native-symbol":155,"../internals/object-create":160,"../internals/object-define-property":162,"../internals/object-get-own-property-descriptor":163,"../internals/object-get-own-property-names":165,"../internals/object-get-own-property-names-external":164,"../internals/object-get-own-property-symbols":166,"../internals/object-keys":169,"../internals/object-property-is-enumerable":170,"../internals/redefine":178,"../internals/set-to-string-tag":182,"../internals/shared":185,"../internals/shared-key":183,"../internals/to-indexed-object":192,"../internals/to-object":195,"../internals/to-primitive":196,"../internals/uid":198,"../internals/use-symbol-as-uid":199,"../internals/well-known-symbol":201,"../internals/well-known-symbol-wrapped":200}],241:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.matchAll` well-known symbol
defineWellKnownSymbol('matchAll');

},{"../internals/define-well-known-symbol":117}],242:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.match` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.match
defineWellKnownSymbol('match');

},{"../internals/define-well-known-symbol":117}],243:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.replace` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.replace
defineWellKnownSymbol('replace');

},{"../internals/define-well-known-symbol":117}],244:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.search` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.search
defineWellKnownSymbol('search');

},{"../internals/define-well-known-symbol":117}],245:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.species` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.species
defineWellKnownSymbol('species');

},{"../internals/define-well-known-symbol":117}],246:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.split` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.split
defineWellKnownSymbol('split');

},{"../internals/define-well-known-symbol":117}],247:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.toPrimitive` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.toprimitive
defineWellKnownSymbol('toPrimitive');

},{"../internals/define-well-known-symbol":117}],248:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.toStringTag` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.tostringtag
defineWellKnownSymbol('toStringTag');

},{"../internals/define-well-known-symbol":117}],249:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.unscopables` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.unscopables
defineWellKnownSymbol('unscopables');

},{"../internals/define-well-known-symbol":117}],250:[function(require,module,exports){
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

},{"../internals/classof":109,"../internals/create-non-enumerable-property":113,"../internals/dom-iterables":120,"../internals/global":133,"../internals/iterators":152,"../internals/well-known-symbol":201,"./es.array.iterator":210}],251:[function(require,module,exports){
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

},{"../internals/export":126,"../internals/global":133,"../internals/task":190}],252:[function(require,module,exports){
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

},{"../internals/engine-user-agent":122,"../internals/export":126,"../internals/global":133}],253:[function(require,module,exports){
var parent = require('../../es/array/from');

module.exports = parent;

},{"../../es/array/from":51}],254:[function(require,module,exports){
var parent = require('../../es/array/is-array');

module.exports = parent;

},{"../../es/array/is-array":52}],255:[function(require,module,exports){
var parent = require('../../../es/array/virtual/for-each');

module.exports = parent;

},{"../../../es/array/virtual/for-each":56}],256:[function(require,module,exports){
var parent = require('../../es/date/now');

module.exports = parent;

},{"../../es/date/now":61}],257:[function(require,module,exports){
var parent = require('../../es/instance/bind');

module.exports = parent;

},{"../../es/instance/bind":63}],258:[function(require,module,exports){
var parent = require('../../es/instance/concat');

module.exports = parent;

},{"../../es/instance/concat":64}],259:[function(require,module,exports){
var parent = require('../../es/instance/copy-within');

module.exports = parent;

},{"../../es/instance/copy-within":65}],260:[function(require,module,exports){
var parent = require('../../es/instance/fill');

module.exports = parent;

},{"../../es/instance/fill":66}],261:[function(require,module,exports){
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

},{"../../internals/classof":109,"../../modules/web.dom-collections.iterator":250,"../array/virtual/for-each":255}],262:[function(require,module,exports){
var parent = require('../../es/instance/index-of');

module.exports = parent;

},{"../../es/instance/index-of":67}],263:[function(require,module,exports){
var parent = require('../../es/instance/slice');

module.exports = parent;

},{"../../es/instance/slice":68}],264:[function(require,module,exports){
var parent = require('../../es/instance/sort');

module.exports = parent;

},{"../../es/instance/sort":69}],265:[function(require,module,exports){
var parent = require('../../es/instance/splice');

module.exports = parent;

},{"../../es/instance/splice":70}],266:[function(require,module,exports){
var parent = require('../../es/instance/starts-with');

module.exports = parent;

},{"../../es/instance/starts-with":71}],267:[function(require,module,exports){
var parent = require('../../es/instance/trim');

module.exports = parent;

},{"../../es/instance/trim":72}],268:[function(require,module,exports){
var parent = require('../../es/number/is-integer');

module.exports = parent;

},{"../../es/number/is-integer":73}],269:[function(require,module,exports){
var parent = require('../../es/object/assign');

module.exports = parent;

},{"../../es/object/assign":74}],270:[function(require,module,exports){
var parent = require('../../es/object/create');

module.exports = parent;

},{"../../es/object/create":75}],271:[function(require,module,exports){
var parent = require('../../es/object/define-property');

module.exports = parent;

},{"../../es/object/define-property":76}],272:[function(require,module,exports){
var parent = require('../../es/object/entries');

module.exports = parent;

},{"../../es/object/entries":77}],273:[function(require,module,exports){
var parent = require('../../es/object/get-own-property-descriptor');

module.exports = parent;

},{"../../es/object/get-own-property-descriptor":78}],274:[function(require,module,exports){
var parent = require('../../es/object/get-prototype-of');

module.exports = parent;

},{"../../es/object/get-prototype-of":79}],275:[function(require,module,exports){
var parent = require('../../es/object/set-prototype-of');

module.exports = parent;

},{"../../es/object/set-prototype-of":80}],276:[function(require,module,exports){
var parent = require('../../es/promise');

module.exports = parent;

},{"../../es/promise":81}],277:[function(require,module,exports){
var parent = require('../../es/reflect/construct');

module.exports = parent;

},{"../../es/reflect/construct":82}],278:[function(require,module,exports){
var parent = require('../../es/reflect/get');

module.exports = parent;

},{"../../es/reflect/get":83}],279:[function(require,module,exports){
require('../modules/web.immediate');
var path = require('../internals/path');

module.exports = path.setImmediate;

},{"../internals/path":174,"../modules/web.immediate":251}],280:[function(require,module,exports){
require('../modules/web.timers');
var path = require('../internals/path');

module.exports = path.setInterval;

},{"../internals/path":174,"../modules/web.timers":252}],281:[function(require,module,exports){
require('../modules/web.timers');
var path = require('../internals/path');

module.exports = path.setTimeout;

},{"../internals/path":174,"../modules/web.timers":252}],282:[function(require,module,exports){
var parent = require('../../es/symbol');

module.exports = parent;

},{"../../es/symbol":86}],283:[function(require,module,exports){
var parent = require('../../es/symbol/iterator');

module.exports = parent;

},{"../../es/symbol/iterator":87}],284:[function(require,module,exports){
arguments[4][91][0].apply(exports,arguments)
},{"dup":91}],285:[function(require,module,exports){
arguments[4][92][0].apply(exports,arguments)
},{"../internals/is-object":340,"dup":92}],286:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');
var create = require('../internals/object-create');
var definePropertyModule = require('../internals/object-define-property');

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

},{"../internals/object-create":351,"../internals/object-define-property":353,"../internals/well-known-symbol":402}],287:[function(require,module,exports){
'use strict';
var charAt = require('../internals/string-multibyte').charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};

},{"../internals/string-multibyte":382}],288:[function(require,module,exports){
arguments[4][94][0].apply(exports,arguments)
},{"dup":94}],289:[function(require,module,exports){
arguments[4][95][0].apply(exports,arguments)
},{"../internals/is-object":340,"dup":95}],290:[function(require,module,exports){
module.exports = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined';

},{}],291:[function(require,module,exports){
'use strict';
var NATIVE_ARRAY_BUFFER = require('../internals/array-buffer-native');
var DESCRIPTORS = require('../internals/descriptors');
var global = require('../internals/global');
var isObject = require('../internals/is-object');
var has = require('../internals/has');
var classof = require('../internals/classof');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var defineProperty = require('../internals/object-define-property').f;
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var wellKnownSymbol = require('../internals/well-known-symbol');
var uid = require('../internals/uid');

var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var isPrototypeOf = ObjectPrototype.isPrototypeOf;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQIRED = false;
var NAME;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var isView = function isView(it) {
  var klass = classof(it);
  return klass === 'DataView' || has(TypedArrayConstructorsList, klass);
};

var isTypedArray = function (it) {
  return isObject(it) && has(TypedArrayConstructorsList, classof(it));
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (setPrototypeOf) {
    if (isPrototypeOf.call(TypedArray, C)) return C;
  } else for (var ARRAY in TypedArrayConstructorsList) if (has(TypedArrayConstructorsList, NAME)) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
      return C;
    }
  } throw TypeError('Target is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) {
      delete TypedArrayConstructor.prototype[KEY];
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    redefine(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];
      if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) {
        delete TypedArrayConstructor[KEY];
      }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8Array[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  if (!global[NAME]) NATIVE_ARRAY_BUFFER_VIEWS = false;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !has(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG, { get: function () {
    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
    createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};

},{"../internals/array-buffer-native":290,"../internals/classof":305,"../internals/create-non-enumerable-property":309,"../internals/descriptors":313,"../internals/global":326,"../internals/has":327,"../internals/is-object":340,"../internals/object-define-property":353,"../internals/object-get-prototype-of":358,"../internals/object-set-prototype-of":362,"../internals/redefine":369,"../internals/uid":399,"../internals/well-known-symbol":402}],292:[function(require,module,exports){
'use strict';
var global = require('../internals/global');
var DESCRIPTORS = require('../internals/descriptors');
var NATIVE_ARRAY_BUFFER = require('../internals/array-buffer-native');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefineAll = require('../internals/redefine-all');
var fails = require('../internals/fails');
var anInstance = require('../internals/an-instance');
var toInteger = require('../internals/to-integer');
var toLength = require('../internals/to-length');
var toIndex = require('../internals/to-index');
var IEEE754 = require('../internals/ieee754');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var getOwnPropertyNames = require('../internals/object-get-own-property-names').f;
var defineProperty = require('../internals/object-define-property').f;
var arrayFill = require('../internals/array-fill');
var setToStringTag = require('../internals/set-to-string-tag');
var InternalStateModule = require('../internals/internal-state');

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var $DataView = global[DATA_VIEW];
var $DataViewPrototype = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype = Object.prototype;
var RangeError = global.RangeError;

var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter = function (Constructor, key) {
  defineProperty(Constructor[PROTOTYPE], key, { get: function () { return getInternalState(this)[key]; } });
};

var get = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = bytes.slice(start, start + count);
  return isLittleEndian ? pack : pack.reverse();
};

var set = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    setInternalState(this, {
      bytes: arrayFill.call(new Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS) this.byteLength = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = getInternalState(buffer).byteLength;
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    setInternalState(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!DESCRIPTORS) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new NativeArrayBuffer(); // eslint-disable-line no-new
    new NativeArrayBuffer(1.5); // eslint-disable-line no-new
    new NativeArrayBuffer(NaN); // eslint-disable-line no-new
    return NativeArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new NativeArrayBuffer(toIndex(length));
    };
    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE] = NativeArrayBuffer[PROTOTYPE];
    for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
      }
    }
    ArrayBufferPrototype.constructor = $ArrayBuffer;
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (setPrototypeOf && getPrototypeOf($DataViewPrototype) !== ObjectPrototype) {
    setPrototypeOf($DataViewPrototype, ObjectPrototype);
  }

  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var nativeSetInt8 = $DataViewPrototype.setInt8;
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);

module.exports = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};

},{"../internals/an-instance":288,"../internals/array-buffer-native":290,"../internals/array-fill":294,"../internals/create-non-enumerable-property":309,"../internals/descriptors":313,"../internals/fails":321,"../internals/global":326,"../internals/ieee754":332,"../internals/internal-state":336,"../internals/object-define-property":353,"../internals/object-get-own-property-names":356,"../internals/object-get-prototype-of":358,"../internals/object-set-prototype-of":362,"../internals/redefine-all":368,"../internals/set-to-string-tag":377,"../internals/to-index":387,"../internals/to-integer":389,"../internals/to-length":390}],293:[function(require,module,exports){
arguments[4][96][0].apply(exports,arguments)
},{"../internals/to-absolute-index":386,"../internals/to-length":390,"../internals/to-object":391,"dup":96}],294:[function(require,module,exports){
arguments[4][97][0].apply(exports,arguments)
},{"../internals/to-absolute-index":386,"../internals/to-length":390,"../internals/to-object":391,"dup":97}],295:[function(require,module,exports){
arguments[4][100][0].apply(exports,arguments)
},{"../internals/to-absolute-index":386,"../internals/to-indexed-object":388,"../internals/to-length":390,"dup":100}],296:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"../internals/array-species-create":301,"../internals/function-bind-context":323,"../internals/indexed-object":333,"../internals/to-length":390,"../internals/to-object":391,"dup":101}],297:[function(require,module,exports){
'use strict';
var toIndexedObject = require('../internals/to-indexed-object');
var toInteger = require('../internals/to-integer');
var toLength = require('../internals/to-length');
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var min = Math.min;
var nativeLastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
// For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });
var FORCED = NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH;

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
module.exports = FORCED ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = toLength(O.length);
  var index = length - 1;
  if (arguments.length > 1) index = min(index, toInteger(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : nativeLastIndexOf;

},{"../internals/array-method-is-strict":298,"../internals/array-method-uses-to-length":299,"../internals/to-indexed-object":388,"../internals/to-integer":389,"../internals/to-length":390}],298:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"../internals/fails":321,"dup":103}],299:[function(require,module,exports){
arguments[4][104][0].apply(exports,arguments)
},{"../internals/descriptors":313,"../internals/fails":321,"../internals/has":327,"dup":104}],300:[function(require,module,exports){
var aFunction = require('../internals/a-function');
var toObject = require('../internals/to-object');
var IndexedObject = require('../internals/indexed-object');
var toLength = require('../internals/to-length');

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};

},{"../internals/a-function":284,"../internals/indexed-object":333,"../internals/to-length":390,"../internals/to-object":391}],301:[function(require,module,exports){
arguments[4][105][0].apply(exports,arguments)
},{"../internals/is-array":338,"../internals/is-object":340,"../internals/well-known-symbol":402,"dup":105}],302:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"../internals/an-object":289,"dup":106}],303:[function(require,module,exports){
arguments[4][107][0].apply(exports,arguments)
},{"../internals/well-known-symbol":402,"dup":107}],304:[function(require,module,exports){
arguments[4][108][0].apply(exports,arguments)
},{"dup":108}],305:[function(require,module,exports){
arguments[4][109][0].apply(exports,arguments)
},{"../internals/classof-raw":304,"../internals/to-string-tag-support":395,"../internals/well-known-symbol":402,"dup":109}],306:[function(require,module,exports){
var has = require('../internals/has');
var ownKeys = require('../internals/own-keys');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

},{"../internals/has":327,"../internals/object-define-property":353,"../internals/object-get-own-property-descriptor":354,"../internals/own-keys":364}],307:[function(require,module,exports){
arguments[4][111][0].apply(exports,arguments)
},{"../internals/fails":321,"dup":111}],308:[function(require,module,exports){
arguments[4][112][0].apply(exports,arguments)
},{"../internals/create-property-descriptor":310,"../internals/iterators":345,"../internals/iterators-core":344,"../internals/object-create":351,"../internals/set-to-string-tag":377,"dup":112}],309:[function(require,module,exports){
arguments[4][113][0].apply(exports,arguments)
},{"../internals/create-property-descriptor":310,"../internals/descriptors":313,"../internals/object-define-property":353,"dup":113}],310:[function(require,module,exports){
arguments[4][114][0].apply(exports,arguments)
},{"dup":114}],311:[function(require,module,exports){
arguments[4][116][0].apply(exports,arguments)
},{"../internals/create-iterator-constructor":308,"../internals/create-non-enumerable-property":309,"../internals/export":320,"../internals/is-pure":341,"../internals/iterators":345,"../internals/iterators-core":344,"../internals/object-get-prototype-of":358,"../internals/object-set-prototype-of":362,"../internals/redefine":369,"../internals/set-to-string-tag":377,"../internals/well-known-symbol":402,"dup":116}],312:[function(require,module,exports){
arguments[4][117][0].apply(exports,arguments)
},{"../internals/has":327,"../internals/object-define-property":353,"../internals/path":365,"../internals/well-known-symbol-wrapped":401,"dup":117}],313:[function(require,module,exports){
arguments[4][118][0].apply(exports,arguments)
},{"../internals/fails":321,"dup":118}],314:[function(require,module,exports){
arguments[4][119][0].apply(exports,arguments)
},{"../internals/global":326,"../internals/is-object":340,"dup":119}],315:[function(require,module,exports){
arguments[4][120][0].apply(exports,arguments)
},{"dup":120}],316:[function(require,module,exports){
arguments[4][121][0].apply(exports,arguments)
},{"../internals/engine-user-agent":317,"dup":121}],317:[function(require,module,exports){
arguments[4][122][0].apply(exports,arguments)
},{"../internals/get-built-in":324,"dup":122}],318:[function(require,module,exports){
arguments[4][123][0].apply(exports,arguments)
},{"../internals/engine-user-agent":317,"../internals/global":326,"dup":123}],319:[function(require,module,exports){
arguments[4][125][0].apply(exports,arguments)
},{"dup":125}],320:[function(require,module,exports){
var global = require('../internals/global');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var setGlobal = require('../internals/set-global');
var copyConstructorProperties = require('../internals/copy-constructor-properties');
var isForced = require('../internals/is-forced');

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
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

},{"../internals/copy-constructor-properties":306,"../internals/create-non-enumerable-property":309,"../internals/global":326,"../internals/is-forced":339,"../internals/object-get-own-property-descriptor":354,"../internals/redefine":369,"../internals/set-global":375}],321:[function(require,module,exports){
arguments[4][127][0].apply(exports,arguments)
},{"dup":127}],322:[function(require,module,exports){
'use strict';
// TODO: Remove from `core-js@4` since it's moved to entry points
require('../modules/es.regexp.exec');
var redefine = require('../internals/redefine');
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var regexpExec = require('../internals/regexp-exec');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var SPECIES = wellKnownSymbol('species');

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

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
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
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};

},{"../internals/create-non-enumerable-property":309,"../internals/fails":321,"../internals/redefine":369,"../internals/regexp-exec":371,"../internals/well-known-symbol":402,"../modules/es.regexp.exec":409}],323:[function(require,module,exports){
arguments[4][128][0].apply(exports,arguments)
},{"../internals/a-function":284,"dup":128}],324:[function(require,module,exports){
arguments[4][130][0].apply(exports,arguments)
},{"../internals/global":326,"../internals/path":365,"dup":130}],325:[function(require,module,exports){
arguments[4][131][0].apply(exports,arguments)
},{"../internals/classof":305,"../internals/iterators":345,"../internals/well-known-symbol":402,"dup":131}],326:[function(require,module,exports){
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

},{}],327:[function(require,module,exports){
arguments[4][134][0].apply(exports,arguments)
},{"dup":134}],328:[function(require,module,exports){
arguments[4][135][0].apply(exports,arguments)
},{"dup":135}],329:[function(require,module,exports){
arguments[4][136][0].apply(exports,arguments)
},{"../internals/global":326,"dup":136}],330:[function(require,module,exports){
arguments[4][137][0].apply(exports,arguments)
},{"../internals/get-built-in":324,"dup":137}],331:[function(require,module,exports){
arguments[4][138][0].apply(exports,arguments)
},{"../internals/descriptors":313,"../internals/document-create-element":314,"../internals/fails":321,"dup":138}],332:[function(require,module,exports){
// IEEE754 conversions based on https://github.com/feross/ieee754
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = 1 / 0;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = new Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare
  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);
    if (number * (c = pow(2, -exponent)) < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

module.exports = {
  pack: pack,
  unpack: unpack
};

},{}],333:[function(require,module,exports){
arguments[4][139][0].apply(exports,arguments)
},{"../internals/classof-raw":304,"../internals/fails":321,"dup":139}],334:[function(require,module,exports){
var isObject = require('../internals/is-object');
var setPrototypeOf = require('../internals/object-set-prototype-of');

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};

},{"../internals/is-object":340,"../internals/object-set-prototype-of":362}],335:[function(require,module,exports){
arguments[4][140][0].apply(exports,arguments)
},{"../internals/shared-store":379,"dup":140}],336:[function(require,module,exports){
arguments[4][141][0].apply(exports,arguments)
},{"../internals/create-non-enumerable-property":309,"../internals/global":326,"../internals/has":327,"../internals/hidden-keys":328,"../internals/is-object":340,"../internals/native-weak-map":349,"../internals/shared-key":378,"dup":141}],337:[function(require,module,exports){
arguments[4][142][0].apply(exports,arguments)
},{"../internals/iterators":345,"../internals/well-known-symbol":402,"dup":142}],338:[function(require,module,exports){
arguments[4][143][0].apply(exports,arguments)
},{"../internals/classof-raw":304,"dup":143}],339:[function(require,module,exports){
arguments[4][144][0].apply(exports,arguments)
},{"../internals/fails":321,"dup":144}],340:[function(require,module,exports){
arguments[4][147][0].apply(exports,arguments)
},{"dup":147}],341:[function(require,module,exports){
module.exports = false;

},{}],342:[function(require,module,exports){
arguments[4][149][0].apply(exports,arguments)
},{"../internals/classof-raw":304,"../internals/is-object":340,"../internals/well-known-symbol":402,"dup":149}],343:[function(require,module,exports){
arguments[4][150][0].apply(exports,arguments)
},{"../internals/an-object":289,"../internals/call-with-safe-iteration-closing":302,"../internals/function-bind-context":323,"../internals/get-iterator-method":325,"../internals/is-array-iterator-method":337,"../internals/to-length":390,"dup":150}],344:[function(require,module,exports){
arguments[4][151][0].apply(exports,arguments)
},{"../internals/create-non-enumerable-property":309,"../internals/has":327,"../internals/is-pure":341,"../internals/object-get-prototype-of":358,"../internals/well-known-symbol":402,"dup":151}],345:[function(require,module,exports){
arguments[4][135][0].apply(exports,arguments)
},{"dup":135}],346:[function(require,module,exports){
arguments[4][153][0].apply(exports,arguments)
},{"../internals/classof-raw":304,"../internals/engine-is-ios":316,"../internals/global":326,"../internals/object-get-own-property-descriptor":354,"../internals/task":384,"dup":153}],347:[function(require,module,exports){
arguments[4][154][0].apply(exports,arguments)
},{"../internals/global":326,"dup":154}],348:[function(require,module,exports){
arguments[4][155][0].apply(exports,arguments)
},{"../internals/fails":321,"dup":155}],349:[function(require,module,exports){
arguments[4][156][0].apply(exports,arguments)
},{"../internals/global":326,"../internals/inspect-source":335,"dup":156}],350:[function(require,module,exports){
arguments[4][157][0].apply(exports,arguments)
},{"../internals/a-function":284,"dup":157}],351:[function(require,module,exports){
arguments[4][160][0].apply(exports,arguments)
},{"../internals/an-object":289,"../internals/document-create-element":314,"../internals/enum-bug-keys":319,"../internals/hidden-keys":328,"../internals/html":330,"../internals/object-define-properties":352,"../internals/shared-key":378,"dup":160}],352:[function(require,module,exports){
arguments[4][161][0].apply(exports,arguments)
},{"../internals/an-object":289,"../internals/descriptors":313,"../internals/object-define-property":353,"../internals/object-keys":360,"dup":161}],353:[function(require,module,exports){
arguments[4][162][0].apply(exports,arguments)
},{"../internals/an-object":289,"../internals/descriptors":313,"../internals/ie8-dom-define":331,"../internals/to-primitive":394,"dup":162}],354:[function(require,module,exports){
arguments[4][163][0].apply(exports,arguments)
},{"../internals/create-property-descriptor":310,"../internals/descriptors":313,"../internals/has":327,"../internals/ie8-dom-define":331,"../internals/object-property-is-enumerable":361,"../internals/to-indexed-object":388,"../internals/to-primitive":394,"dup":163}],355:[function(require,module,exports){
arguments[4][164][0].apply(exports,arguments)
},{"../internals/object-get-own-property-names":356,"../internals/to-indexed-object":388,"dup":164}],356:[function(require,module,exports){
arguments[4][165][0].apply(exports,arguments)
},{"../internals/enum-bug-keys":319,"../internals/object-keys-internal":359,"dup":165}],357:[function(require,module,exports){
arguments[4][166][0].apply(exports,arguments)
},{"dup":166}],358:[function(require,module,exports){
arguments[4][167][0].apply(exports,arguments)
},{"../internals/correct-prototype-getter":307,"../internals/has":327,"../internals/shared-key":378,"../internals/to-object":391,"dup":167}],359:[function(require,module,exports){
arguments[4][168][0].apply(exports,arguments)
},{"../internals/array-includes":295,"../internals/has":327,"../internals/hidden-keys":328,"../internals/to-indexed-object":388,"dup":168}],360:[function(require,module,exports){
arguments[4][169][0].apply(exports,arguments)
},{"../internals/enum-bug-keys":319,"../internals/object-keys-internal":359,"dup":169}],361:[function(require,module,exports){
arguments[4][170][0].apply(exports,arguments)
},{"dup":170}],362:[function(require,module,exports){
arguments[4][171][0].apply(exports,arguments)
},{"../internals/a-possible-prototype":285,"../internals/an-object":289,"dup":171}],363:[function(require,module,exports){
arguments[4][173][0].apply(exports,arguments)
},{"../internals/classof":305,"../internals/to-string-tag-support":395,"dup":173}],364:[function(require,module,exports){
var getBuiltIn = require('../internals/get-built-in');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var anObject = require('../internals/an-object');

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

},{"../internals/an-object":289,"../internals/get-built-in":324,"../internals/object-get-own-property-names":356,"../internals/object-get-own-property-symbols":357}],365:[function(require,module,exports){
var global = require('../internals/global');

module.exports = global;

},{"../internals/global":326}],366:[function(require,module,exports){
arguments[4][175][0].apply(exports,arguments)
},{"dup":175}],367:[function(require,module,exports){
arguments[4][176][0].apply(exports,arguments)
},{"../internals/an-object":289,"../internals/is-object":340,"../internals/new-promise-capability":350,"dup":176}],368:[function(require,module,exports){
var redefine = require('../internals/redefine');

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};

},{"../internals/redefine":369}],369:[function(require,module,exports){
var global = require('../internals/global');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var has = require('../internals/has');
var setGlobal = require('../internals/set-global');
var inspectSource = require('../internals/inspect-source');
var InternalStateModule = require('../internals/internal-state');

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});

},{"../internals/create-non-enumerable-property":309,"../internals/global":326,"../internals/has":327,"../internals/inspect-source":335,"../internals/internal-state":336,"../internals/set-global":375}],370:[function(require,module,exports){
var classof = require('./classof-raw');
var regexpExec = require('./regexp-exec');

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};


},{"./classof-raw":304,"./regexp-exec":371}],371:[function(require,module,exports){
'use strict';
var regexpFlags = require('./regexp-flags');
var stickyHelpers = require('./regexp-sticky-helpers');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
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

},{"./regexp-flags":372,"./regexp-sticky-helpers":373}],372:[function(require,module,exports){
'use strict';
var anObject = require('../internals/an-object');

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"../internals/an-object":289}],373:[function(require,module,exports){
'use strict';

var fails = require('./fails');

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

},{"./fails":321}],374:[function(require,module,exports){
arguments[4][179][0].apply(exports,arguments)
},{"dup":179}],375:[function(require,module,exports){
arguments[4][180][0].apply(exports,arguments)
},{"../internals/create-non-enumerable-property":309,"../internals/global":326,"dup":180}],376:[function(require,module,exports){
arguments[4][181][0].apply(exports,arguments)
},{"../internals/descriptors":313,"../internals/get-built-in":324,"../internals/object-define-property":353,"../internals/well-known-symbol":402,"dup":181}],377:[function(require,module,exports){
var defineProperty = require('../internals/object-define-property').f;
var has = require('../internals/has');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};

},{"../internals/has":327,"../internals/object-define-property":353,"../internals/well-known-symbol":402}],378:[function(require,module,exports){
arguments[4][183][0].apply(exports,arguments)
},{"../internals/shared":380,"../internals/uid":399,"dup":183}],379:[function(require,module,exports){
arguments[4][184][0].apply(exports,arguments)
},{"../internals/global":326,"../internals/set-global":375,"dup":184}],380:[function(require,module,exports){
var IS_PURE = require('../internals/is-pure');
var store = require('../internals/shared-store');

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

},{"../internals/is-pure":341,"../internals/shared-store":379}],381:[function(require,module,exports){
arguments[4][186][0].apply(exports,arguments)
},{"../internals/a-function":284,"../internals/an-object":289,"../internals/well-known-symbol":402,"dup":186}],382:[function(require,module,exports){
arguments[4][187][0].apply(exports,arguments)
},{"../internals/require-object-coercible":374,"../internals/to-integer":389,"dup":187}],383:[function(require,module,exports){
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

},{"../internals/require-object-coercible":374,"../internals/to-integer":389}],384:[function(require,module,exports){
arguments[4][190][0].apply(exports,arguments)
},{"../internals/classof-raw":304,"../internals/document-create-element":314,"../internals/engine-is-ios":316,"../internals/fails":321,"../internals/function-bind-context":323,"../internals/global":326,"../internals/html":330,"dup":190}],385:[function(require,module,exports){
var classof = require('../internals/classof-raw');

// `thisNumberValue` abstract operation
// https://tc39.github.io/ecma262/#sec-thisnumbervalue
module.exports = function (value) {
  if (typeof value != 'number' && classof(value) != 'Number') {
    throw TypeError('Incorrect invocation');
  }
  return +value;
};

},{"../internals/classof-raw":304}],386:[function(require,module,exports){
arguments[4][191][0].apply(exports,arguments)
},{"../internals/to-integer":389,"dup":191}],387:[function(require,module,exports){
var toInteger = require('../internals/to-integer');
var toLength = require('../internals/to-length');

// `ToIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-toindex
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};

},{"../internals/to-integer":389,"../internals/to-length":390}],388:[function(require,module,exports){
arguments[4][192][0].apply(exports,arguments)
},{"../internals/indexed-object":333,"../internals/require-object-coercible":374,"dup":192}],389:[function(require,module,exports){
arguments[4][193][0].apply(exports,arguments)
},{"dup":193}],390:[function(require,module,exports){
arguments[4][194][0].apply(exports,arguments)
},{"../internals/to-integer":389,"dup":194}],391:[function(require,module,exports){
arguments[4][195][0].apply(exports,arguments)
},{"../internals/require-object-coercible":374,"dup":195}],392:[function(require,module,exports){
var toPositiveInteger = require('../internals/to-positive-integer');

module.exports = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};

},{"../internals/to-positive-integer":393}],393:[function(require,module,exports){
var toInteger = require('../internals/to-integer');

module.exports = function (it) {
  var result = toInteger(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};

},{"../internals/to-integer":389}],394:[function(require,module,exports){
arguments[4][196][0].apply(exports,arguments)
},{"../internals/is-object":340,"dup":196}],395:[function(require,module,exports){
arguments[4][197][0].apply(exports,arguments)
},{"../internals/well-known-symbol":402,"dup":197}],396:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var global = require('../internals/global');
var DESCRIPTORS = require('../internals/descriptors');
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = require('../internals/typed-array-constructors-require-wrappers');
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var ArrayBufferModule = require('../internals/array-buffer');
var anInstance = require('../internals/an-instance');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var toLength = require('../internals/to-length');
var toIndex = require('../internals/to-index');
var toOffset = require('../internals/to-offset');
var toPrimitive = require('../internals/to-primitive');
var has = require('../internals/has');
var classof = require('../internals/classof');
var isObject = require('../internals/is-object');
var create = require('../internals/object-create');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var getOwnPropertyNames = require('../internals/object-get-own-property-names').f;
var typedArrayFrom = require('../internals/typed-array-from');
var forEach = require('../internals/array-iteration').forEach;
var setSpecies = require('../internals/set-species');
var definePropertyModule = require('../internals/object-define-property');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var InternalStateModule = require('../internals/internal-state');
var inheritIfRequired = require('../internals/inherit-if-required');

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError = global.RangeError;
var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function (C, list) {
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var addGetter = function (it, key) {
  nativeDefineProperty(it, key, { get: function () {
    return getInternalState(this)[key];
  } });
};

var isArrayBuffer = function (it) {
  var klass;
  return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target)
    && typeof key != 'symbol'
    && key in target
    && String(+key) == String(key);
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  return isTypedArrayIndex(target, key = toPrimitive(key, true))
    ? createPropertyDescriptor(2, target[key])
    : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  if (isTypedArrayIndex(target, key = toPrimitive(key, true))
    && isObject(descriptor)
    && has(descriptor, 'value')
    && !has(descriptor, 'get')
    && !has(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable
    && (!has(descriptor, 'writable') || descriptor.writable)
    && (!has(descriptor, 'enumerable') || descriptor.enumerable)
  ) {
    target[key] = descriptor.value;
    return target;
  } return nativeDefineProperty(target, key, descriptor);
};

if (DESCRIPTORS) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  module.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+$/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }
        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
        return inheritIfRequired(function () {
          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
            : typedArrayOffset !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
              : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    $({
      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else module.exports = function () { /* empty */ };

},{"../internals/an-instance":288,"../internals/array-buffer":292,"../internals/array-buffer-view-core":291,"../internals/array-iteration":296,"../internals/classof":305,"../internals/create-non-enumerable-property":309,"../internals/create-property-descriptor":310,"../internals/descriptors":313,"../internals/export":320,"../internals/global":326,"../internals/has":327,"../internals/inherit-if-required":334,"../internals/internal-state":336,"../internals/is-object":340,"../internals/object-create":351,"../internals/object-define-property":353,"../internals/object-get-own-property-descriptor":354,"../internals/object-get-own-property-names":356,"../internals/object-set-prototype-of":362,"../internals/set-species":376,"../internals/to-index":387,"../internals/to-length":390,"../internals/to-offset":392,"../internals/to-primitive":394,"../internals/typed-array-constructors-require-wrappers":397,"../internals/typed-array-from":398}],397:[function(require,module,exports){
/* eslint-disable no-new */
var global = require('../internals/global');
var fails = require('../internals/fails');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');
var NATIVE_ARRAY_BUFFER_VIEWS = require('../internals/array-buffer-view-core').NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer = global.ArrayBuffer;
var Int8Array = global.Int8Array;

module.exports = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
  Int8Array(1);
}) || !fails(function () {
  new Int8Array(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array();
  new Int8Array(null);
  new Int8Array(1.5);
  new Int8Array(iterable);
}, true) || fails(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1;
});

},{"../internals/array-buffer-view-core":291,"../internals/check-correctness-of-iteration":303,"../internals/fails":321,"../internals/global":326}],398:[function(require,module,exports){
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var getIteratorMethod = require('../internals/get-iterator-method');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var bind = require('../internals/function-bind-context');
var aTypedArrayConstructor = require('../internals/array-buffer-view-core').aTypedArrayConstructor;

module.exports = function from(source /* , mapfn, thisArg */) {
  var O = toObject(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var i, length, result, step, iterator, next;
  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    O = [];
    while (!(step = next.call(iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind(mapfn, arguments[2], 2);
  }
  length = toLength(O.length);
  result = new (aTypedArrayConstructor(this))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};

},{"../internals/array-buffer-view-core":291,"../internals/function-bind-context":323,"../internals/get-iterator-method":325,"../internals/is-array-iterator-method":337,"../internals/to-length":390,"../internals/to-object":391}],399:[function(require,module,exports){
arguments[4][198][0].apply(exports,arguments)
},{"dup":198}],400:[function(require,module,exports){
arguments[4][199][0].apply(exports,arguments)
},{"../internals/native-symbol":348,"dup":199}],401:[function(require,module,exports){
arguments[4][200][0].apply(exports,arguments)
},{"../internals/well-known-symbol":402,"dup":200}],402:[function(require,module,exports){
arguments[4][201][0].apply(exports,arguments)
},{"../internals/global":326,"../internals/has":327,"../internals/native-symbol":348,"../internals/shared":380,"../internals/uid":399,"../internals/use-symbol-as-uid":400,"dup":201}],403:[function(require,module,exports){
arguments[4][210][0].apply(exports,arguments)
},{"../internals/add-to-unscopables":286,"../internals/define-iterator":311,"../internals/internal-state":336,"../internals/iterators":345,"../internals/to-indexed-object":388,"dup":210}],404:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var IndexedObject = require('../internals/indexed-object');
var toIndexedObject = require('../internals/to-indexed-object');
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});

},{"../internals/array-method-is-strict":298,"../internals/export":320,"../internals/indexed-object":333,"../internals/to-indexed-object":388}],405:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var defineProperty = require('../internals/object-define-property').f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

},{"../internals/descriptors":313,"../internals/object-define-property":353}],406:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var toInteger = require('../internals/to-integer');
var thisNumberValue = require('../internals/this-number-value');
var repeat = require('../internals/string-repeat');
var fails = require('../internals/fails');

var nativeToFixed = 1.0.toFixed;
var floor = Math.floor;

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var FORCED = nativeToFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToFixed.call({});
});

// `Number.prototype.toFixed` method
// https://tc39.github.io/ecma262/#sec-number.prototype.tofixed
$({ target: 'Number', proto: true, forced: FORCED }, {
  // eslint-disable-next-line max-statements
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toInteger(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    var multiply = function (n, c) {
      var index = -1;
      var c2 = c;
      while (++index < 6) {
        c2 += n * data[index];
        data[index] = c2 % 1e7;
        c2 = floor(c2 / 1e7);
      }
    };

    var divide = function (n) {
      var index = 6;
      var c = 0;
      while (--index >= 0) {
        c += data[index];
        data[index] = floor(c / n);
        c = (c % n) * 1e7;
      }
    };

    var dataToString = function () {
      var index = 6;
      var s = '';
      while (--index >= 0) {
        if (s !== '' || index === 0 || data[index] !== 0) {
          var t = String(data[index]);
          s = s === '' ? t : s + repeat.call('0', 7 - t.length) + t;
        }
      } return s;
    };

    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        result = dataToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        result = dataToString() + repeat.call('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat.call('0', fractDigits - k) + result
        : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});

},{"../internals/export":320,"../internals/fails":321,"../internals/string-repeat":383,"../internals/this-number-value":385,"../internals/to-integer":389}],407:[function(require,module,exports){
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var redefine = require('../internals/redefine');
var toString = require('../internals/object-to-string');

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}

},{"../internals/object-to-string":363,"../internals/redefine":369,"../internals/to-string-tag-support":395}],408:[function(require,module,exports){
arguments[4][229][0].apply(exports,arguments)
},{"../internals/a-function":284,"../internals/an-instance":288,"../internals/check-correctness-of-iteration":303,"../internals/classof-raw":304,"../internals/engine-v8-version":318,"../internals/export":320,"../internals/get-built-in":324,"../internals/global":326,"../internals/host-report-errors":329,"../internals/inspect-source":335,"../internals/internal-state":336,"../internals/is-forced":339,"../internals/is-object":340,"../internals/is-pure":341,"../internals/iterate":343,"../internals/microtask":346,"../internals/native-promise-constructor":347,"../internals/new-promise-capability":350,"../internals/perform":366,"../internals/promise-resolve":367,"../internals/redefine":369,"../internals/redefine-all":368,"../internals/set-species":376,"../internals/set-to-string-tag":377,"../internals/species-constructor":381,"../internals/task":384,"../internals/well-known-symbol":402,"dup":229}],409:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var exec = require('../internals/regexp-exec');

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});

},{"../internals/export":320,"../internals/regexp-exec":371}],410:[function(require,module,exports){
'use strict';
var redefine = require('../internals/redefine');
var anObject = require('../internals/an-object');
var fails = require('../internals/fails');
var flags = require('../internals/regexp-flags');

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}

},{"../internals/an-object":289,"../internals/fails":321,"../internals/redefine":369,"../internals/regexp-flags":372}],411:[function(require,module,exports){
arguments[4][232][0].apply(exports,arguments)
},{"../internals/define-iterator":311,"../internals/internal-state":336,"../internals/string-multibyte":382,"dup":232}],412:[function(require,module,exports){
'use strict';
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var anObject = require('../internals/an-object');
var toLength = require('../internals/to-length');
var requireObjectCoercible = require('../internals/require-object-coercible');
var advanceStringIndex = require('../internals/advance-string-index');
var regExpExec = require('../internals/regexp-exec-abstract');

// @@match logic
fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
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

},{"../internals/advance-string-index":287,"../internals/an-object":289,"../internals/fix-regexp-well-known-symbol-logic":322,"../internals/regexp-exec-abstract":370,"../internals/require-object-coercible":374,"../internals/to-length":390}],413:[function(require,module,exports){
'use strict';
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var anObject = require('../internals/an-object');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var toInteger = require('../internals/to-integer');
var requireObjectCoercible = require('../internals/require-object-coercible');
var advanceStringIndex = require('../internals/advance-string-index');
var regExpExec = require('../internals/regexp-exec-abstract');

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

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
    return nativeReplace.call(replacement, symbols, function (match, ch) {
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

},{"../internals/advance-string-index":287,"../internals/an-object":289,"../internals/fix-regexp-well-known-symbol-logic":322,"../internals/regexp-exec-abstract":370,"../internals/require-object-coercible":374,"../internals/to-integer":389,"../internals/to-length":390,"../internals/to-object":391}],414:[function(require,module,exports){
'use strict';
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var isRegExp = require('../internals/is-regexp');
var anObject = require('../internals/an-object');
var requireObjectCoercible = require('../internals/require-object-coercible');
var speciesConstructor = require('../internals/species-constructor');
var advanceStringIndex = require('../internals/advance-string-index');
var toLength = require('../internals/to-length');
var callRegExpExec = require('../internals/regexp-exec-abstract');
var regexpExec = require('../internals/regexp-exec');
var fails = require('../internals/fails');

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
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
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
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
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
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
          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
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
}, !SUPPORTS_Y);

},{"../internals/advance-string-index":287,"../internals/an-object":289,"../internals/fails":321,"../internals/fix-regexp-well-known-symbol-logic":322,"../internals/is-regexp":342,"../internals/regexp-exec":371,"../internals/regexp-exec-abstract":370,"../internals/require-object-coercible":374,"../internals/species-constructor":381,"../internals/to-length":390}],415:[function(require,module,exports){
// `Symbol.prototype.description` getter
// https://tc39.github.io/ecma262/#sec-symbol.prototype.description
'use strict';
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var global = require('../internals/global');
var has = require('../internals/has');
var isObject = require('../internals/is-object');
var defineProperty = require('../internals/object-define-property').f;
var copyConstructorProperties = require('../internals/copy-constructor-properties');

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}

},{"../internals/copy-constructor-properties":306,"../internals/descriptors":313,"../internals/export":320,"../internals/global":326,"../internals/has":327,"../internals/is-object":340,"../internals/object-define-property":353}],416:[function(require,module,exports){
arguments[4][240][0].apply(exports,arguments)
},{"../internals/an-object":289,"../internals/array-iteration":296,"../internals/create-non-enumerable-property":309,"../internals/create-property-descriptor":310,"../internals/define-well-known-symbol":312,"../internals/descriptors":313,"../internals/export":320,"../internals/fails":321,"../internals/get-built-in":324,"../internals/global":326,"../internals/has":327,"../internals/hidden-keys":328,"../internals/internal-state":336,"../internals/is-array":338,"../internals/is-object":340,"../internals/is-pure":341,"../internals/native-symbol":348,"../internals/object-create":351,"../internals/object-define-property":353,"../internals/object-get-own-property-descriptor":354,"../internals/object-get-own-property-names":356,"../internals/object-get-own-property-names-external":355,"../internals/object-get-own-property-symbols":357,"../internals/object-keys":360,"../internals/object-property-is-enumerable":361,"../internals/redefine":369,"../internals/set-to-string-tag":377,"../internals/shared":380,"../internals/shared-key":378,"../internals/to-indexed-object":388,"../internals/to-object":391,"../internals/to-primitive":394,"../internals/uid":399,"../internals/use-symbol-as-uid":400,"../internals/well-known-symbol":402,"../internals/well-known-symbol-wrapped":401,"dup":240}],417:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $copyWithin = require('../internals/array-copy-within');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.copyWithin` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.copywithin
exportTypedArrayMethod('copyWithin', function copyWithin(target, start /* , end */) {
  return $copyWithin.call(aTypedArray(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
});

},{"../internals/array-buffer-view-core":291,"../internals/array-copy-within":293}],418:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $every = require('../internals/array-iteration').every;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.every` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.every
exportTypedArrayMethod('every', function every(callbackfn /* , thisArg */) {
  return $every(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":291,"../internals/array-iteration":296}],419:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $fill = require('../internals/array-fill');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.fill
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod('fill', function fill(value /* , start, end */) {
  return $fill.apply(aTypedArray(this), arguments);
});

},{"../internals/array-buffer-view-core":291,"../internals/array-fill":294}],420:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $filter = require('../internals/array-iteration').filter;
var speciesConstructor = require('../internals/species-constructor');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.filter
exportTypedArrayMethod('filter', function filter(callbackfn /* , thisArg */) {
  var list = $filter(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  var C = speciesConstructor(this, this.constructor);
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
});

},{"../internals/array-buffer-view-core":291,"../internals/array-iteration":296,"../internals/species-constructor":381}],421:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $findIndex = require('../internals/array-iteration').findIndex;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.findindex
exportTypedArrayMethod('findIndex', function findIndex(predicate /* , thisArg */) {
  return $findIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":291,"../internals/array-iteration":296}],422:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $find = require('../internals/array-iteration').find;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.find` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.find
exportTypedArrayMethod('find', function find(predicate /* , thisArg */) {
  return $find(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":291,"../internals/array-iteration":296}],423:[function(require,module,exports){
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Float32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Float32', function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":396}],424:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $forEach = require('../internals/array-iteration').forEach;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.foreach
exportTypedArrayMethod('forEach', function forEach(callbackfn /* , thisArg */) {
  $forEach(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":291,"../internals/array-iteration":296}],425:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $includes = require('../internals/array-includes').includes;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.includes
exportTypedArrayMethod('includes', function includes(searchElement /* , fromIndex */) {
  return $includes(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":291,"../internals/array-includes":295}],426:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $indexOf = require('../internals/array-includes').indexOf;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.indexof
exportTypedArrayMethod('indexOf', function indexOf(searchElement /* , fromIndex */) {
  return $indexOf(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":291,"../internals/array-includes":295}],427:[function(require,module,exports){
'use strict';
var global = require('../internals/global');
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var ArrayIterators = require('../modules/es.array.iterator');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var Uint8Array = global.Uint8Array;
var arrayValues = ArrayIterators.values;
var arrayKeys = ArrayIterators.keys;
var arrayEntries = ArrayIterators.entries;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var nativeTypedArrayIterator = Uint8Array && Uint8Array.prototype[ITERATOR];

var CORRECT_ITER_NAME = !!nativeTypedArrayIterator
  && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);

var typedArrayValues = function values() {
  return arrayValues.call(aTypedArray(this));
};

// `%TypedArray%.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.entries
exportTypedArrayMethod('entries', function entries() {
  return arrayEntries.call(aTypedArray(this));
});
// `%TypedArray%.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.keys
exportTypedArrayMethod('keys', function keys() {
  return arrayKeys.call(aTypedArray(this));
});
// `%TypedArray%.prototype.values` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.values
exportTypedArrayMethod('values', typedArrayValues, !CORRECT_ITER_NAME);
// `%TypedArray%.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype-@@iterator
exportTypedArrayMethod(ITERATOR, typedArrayValues, !CORRECT_ITER_NAME);

},{"../internals/array-buffer-view-core":291,"../internals/global":326,"../internals/well-known-symbol":402,"../modules/es.array.iterator":403}],428:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $join = [].join;

// `%TypedArray%.prototype.join` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.join
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod('join', function join(separator) {
  return $join.apply(aTypedArray(this), arguments);
});

},{"../internals/array-buffer-view-core":291}],429:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $lastIndexOf = require('../internals/array-last-index-of');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.lastIndexOf` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.lastindexof
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
  return $lastIndexOf.apply(aTypedArray(this), arguments);
});

},{"../internals/array-buffer-view-core":291,"../internals/array-last-index-of":297}],430:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $map = require('../internals/array-iteration').map;
var speciesConstructor = require('../internals/species-constructor');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.map` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.map
exportTypedArrayMethod('map', function map(mapfn /* , thisArg */) {
  return $map(aTypedArray(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
    return new (aTypedArrayConstructor(speciesConstructor(O, O.constructor)))(length);
  });
});

},{"../internals/array-buffer-view-core":291,"../internals/array-iteration":296,"../internals/species-constructor":381}],431:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $reduceRight = require('../internals/array-reduce').right;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduceRicht` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduceright
exportTypedArrayMethod('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
  return $reduceRight(aTypedArray(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":291,"../internals/array-reduce":300}],432:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $reduce = require('../internals/array-reduce').left;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduce
exportTypedArrayMethod('reduce', function reduce(callbackfn /* , initialValue */) {
  return $reduce(aTypedArray(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":291,"../internals/array-reduce":300}],433:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var floor = Math.floor;

// `%TypedArray%.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reverse
exportTypedArrayMethod('reverse', function reverse() {
  var that = this;
  var length = aTypedArray(that).length;
  var middle = floor(length / 2);
  var index = 0;
  var value;
  while (index < middle) {
    value = that[index];
    that[index++] = that[--length];
    that[length] = value;
  } return that;
});

},{"../internals/array-buffer-view-core":291}],434:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var toLength = require('../internals/to-length');
var toOffset = require('../internals/to-offset');
var toObject = require('../internals/to-object');
var fails = require('../internals/fails');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var FORCED = fails(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).set({});
});

// `%TypedArray%.prototype.set` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod('set', function set(arrayLike /* , offset */) {
  aTypedArray(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var length = this.length;
  var src = toObject(arrayLike);
  var len = toLength(src.length);
  var index = 0;
  if (len + offset > length) throw RangeError('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, FORCED);

},{"../internals/array-buffer-view-core":291,"../internals/fails":321,"../internals/to-length":390,"../internals/to-object":391,"../internals/to-offset":392}],435:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var speciesConstructor = require('../internals/species-constructor');
var fails = require('../internals/fails');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $slice = [].slice;

var FORCED = fails(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).slice();
});

// `%TypedArray%.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.slice
exportTypedArrayMethod('slice', function slice(start, end) {
  var list = $slice.call(aTypedArray(this), start, end);
  var C = speciesConstructor(this, this.constructor);
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
}, FORCED);

},{"../internals/array-buffer-view-core":291,"../internals/fails":321,"../internals/species-constructor":381}],436:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $some = require('../internals/array-iteration').some;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.some` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.some
exportTypedArrayMethod('some', function some(callbackfn /* , thisArg */) {
  return $some(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":291,"../internals/array-iteration":296}],437:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $sort = [].sort;

// `%TypedArray%.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.sort
exportTypedArrayMethod('sort', function sort(comparefn) {
  return $sort.call(aTypedArray(this), comparefn);
});

},{"../internals/array-buffer-view-core":291}],438:[function(require,module,exports){
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var toLength = require('../internals/to-length');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var speciesConstructor = require('../internals/species-constructor');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.subarray` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.subarray
exportTypedArrayMethod('subarray', function subarray(begin, end) {
  var O = aTypedArray(this);
  var length = O.length;
  var beginIndex = toAbsoluteIndex(begin, length);
  return new (speciesConstructor(O, O.constructor))(
    O.buffer,
    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
  );
});

},{"../internals/array-buffer-view-core":291,"../internals/species-constructor":381,"../internals/to-absolute-index":386,"../internals/to-length":390}],439:[function(require,module,exports){
'use strict';
var global = require('../internals/global');
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var fails = require('../internals/fails');

var Int8Array = global.Int8Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString;
var $slice = [].slice;

// iOS Safari 6.x fails here
var TO_LOCALE_STRING_BUG = !!Int8Array && fails(function () {
  $toLocaleString.call(new Int8Array(1));
});

var FORCED = fails(function () {
  return [1, 2].toLocaleString() != new Int8Array([1, 2]).toLocaleString();
}) || !fails(function () {
  Int8Array.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring
exportTypedArrayMethod('toLocaleString', function toLocaleString() {
  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice.call(aTypedArray(this)) : aTypedArray(this), arguments);
}, FORCED);

},{"../internals/array-buffer-view-core":291,"../internals/fails":321,"../internals/global":326}],440:[function(require,module,exports){
'use strict';
var exportTypedArrayMethod = require('../internals/array-buffer-view-core').exportTypedArrayMethod;
var fails = require('../internals/fails');
var global = require('../internals/global');

var Uint8Array = global.Uint8Array;
var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype || {};
var arrayToString = [].toString;
var arrayJoin = [].join;

if (fails(function () { arrayToString.call({}); })) {
  arrayToString = function toString() {
    return arrayJoin.call(this);
  };
}

var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

// `%TypedArray%.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tostring
exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);

},{"../internals/array-buffer-view-core":291,"../internals/fails":321,"../internals/global":326}],441:[function(require,module,exports){
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Uint32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint32', function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":396}],442:[function(require,module,exports){
var global = require('../internals/global');
var DOMIterables = require('../internals/dom-iterables');
var ArrayIteratorMethods = require('../modules/es.array.iterator');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}

},{"../internals/create-non-enumerable-property":309,"../internals/dom-iterables":315,"../internals/global":326,"../internals/well-known-symbol":402,"../modules/es.array.iterator":403}],443:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],444:[function(require,module,exports){
"use strict";

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.match");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

_Object$defineProperty2(exports, "DomTools", {
  enumerable: true,
  get: function get() {
    return _index.DomTools;
  }
});

_Object$defineProperty2(exports, "Utils", {
  enumerable: true,
  get: function get() {
    return _index.Utils;
  }
});

exports.NyaPCommon = void 0;

var _setTimeout3 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _iterator = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol/iterator"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));

var _defineProperty = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _create = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/create"));

var _construct = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/reflect/construct"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-prototype-of"));

var _setPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/set-prototype-of"));

var _bind = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/bind"));

var _setInterval2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-interval"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _index = require("../component/NyaP-Core/index.js");

var _index2 = _interopRequireDefault(require("../component/NyaP-Danmaku/index.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof _symbol["default"] === "function" && typeof _iterator["default"] === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof _symbol["default"] === "function" && obj.constructor === _symbol["default"] && obj !== _symbol["default"].prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    (0, _defineProperty["default"])(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = (0, _create["default"])(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = _setPrototypeOf2["default"] || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = (0, _construct["default"])(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !_construct["default"]) return false;
  if (_construct["default"].sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call((0, _construct["default"])(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = _setPrototypeOf2["default"] ? _getPrototypeOf2["default"] : function _getPrototypeOf(o) {
    return o.__proto__ || (0, _getPrototypeOf2["default"])(o);
  };
  return _getPrototypeOf(o);
}

var O2H = _index.DomTools.Object2HTML; //default options

var NyaPCommonOptions = {
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
    defaultDanmakuColor: null,
    //a hex color(without #),default when the color inputed is invalid
    send: function send(d) {
      return _promise["default"].reject();
    } //the method for sending danmaku

  },
  // for ui
  uiOptions: {
    danmakuColors: ['fff', '6cf', 'ff0', 'f00', '0f0', '00f', 'f0f', '000'],
    //colors in the danmaku style pannel
    danmakuModes: [0, 3, 2, 1],
    //0:right	1:left	2:bottom	3:top  ;; mode in the danmaku style pannel
    danmakuSizes: [20, 24, 36],
    //danmaku size buttons in the danmaku style pannel
    danmakuColor: null,
    //default color to fill the color option input
    danmakuMode: 0,
    //0: right to left.
    danmakuSize: 24,
    autoHideDanmakuInput: true //hide danmakuinput after danmaku sending

  },
  loadingInfo: {
    //text replacement at loading time (for left-bottom message)
    doneText: 'ok',
    failText: 'failed',
    contentSpliter: '...'
  },
  loadingAnimation: {
    start: function start(NP) {
      NP.$('#loading_anime').innerHTML = '(๑•́ ω •̀๑)';
      NP._.loadingAnimationInterval = (0, _setInterval2["default"])(function () {
        //loading animation
        NP.$('#loading_anime').style.transform = "translate(" + _index.Utils.rand(-20, 20) + "px," + _index.Utils.rand(-20, 20) + "px) rotate(" + _index.Utils.rand(-10, 10) + "deg)";
      }, 80);
    },
    stop: function stop(NP) {
      clearInterval(NP._.loadingAnimationInterval);
      var lf = NP.$('#loading_frame');
      if (lf.parentNode) //remove loading animation
        lf.parentNode.removeChild(lf);
    },
    error: function error(NP) {
      clearInterval(NP._.loadingAnimationInterval);
      NP.$('#loading_anime').innerHTML = '(๑• . •๑)';
      NP.$('#loading_anime').style.transform = "";
    }
  },
  //other common options
  playerContainer: null,
  //the element for containing the player
  icons: {
    play: [30, 30, '<path d="m10.063,8.856l9.873,6.143l-9.873,6.143v-12.287z" stroke-width="3" stroke-linejoin="round"/>'],
    danmakuStyle: [30, 30, '<path style="fill-opacity:0!important;" stroke-width="1.4" d="m21.004,8.995c-0.513,-0.513 -1.135,-0.770 -1.864,-0.770l-8.281,0c-0.729,0 -1.350,0.256 -1.864,0.770c-0.513,0.513 -0.770,1.135 -0.770,1.864l0,8.281c0,0.721 0.256,1.341 0.770,1.858c0.513,0.517 1.135,0.776 1.864,0.776l8.281,0c0.729,0 1.350,-0.258 1.864,-0.776c0.513,-0.517 0.770,-1.136 0.770,-1.858l0,-8.281c0,-0.729 -0.257,-1.350 -0.770,-1.864z" stroke-linejoin="round"/>' + '<path d="m12.142,14.031l1.888,0l0,-1.888l1.937,0l0,1.888l1.888,0l0,1.937l-1.888,0l0,1.888l-1.937,0l0,-1.888l-1.888,0l0,-1.937z" stroke-width="1"/>'],
    danmakuToggle: [30, 30, '<path d="m8.569,10.455l0,0c0,-0.767 0.659,-1.389 1.473,-1.389l0.669,0l0,0l3.215,0l6.028,0c0.390,0 0.765,0.146 1.041,0.406c0.276,0.260 0.431,0.613 0.431,0.982l0,3.473l0,0l0,2.083l0,0c0,0.767 -0.659,1.389 -1.473,1.389l-6.028,0l-4.200,3.532l0.985,-3.532l-0.669,0c-0.813,0 -1.473,-0.621 -1.473,-1.389l0,0l0,-2.083l0,0l0,-3.473z"/>'],
    addDanmaku: [30, 30, '<path style="fill-opacity:1!important" d="m21.781,9.872l-1.500,-1.530c-0.378,-0.385 -0.997,-0.391 -1.384,-0.012l-0.959,0.941l2.870,2.926l0.960,-0.940c0.385,-0.379 0.392,-0.998 0.013,-1.383zm-12.134,7.532l2.871,2.926l7.593,-7.448l-2.872,-2.927l-7.591,7.449l0.000,0.000zm-1.158,2.571l-0.549,1.974l1.984,-0.511l1.843,-0.474l-2.769,-2.824l-0.509,1.835z" stroke-width="0"/>'],
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

var NyaPCommon = /*#__PURE__*/function (_NyaPlayerCore) {
  _inherits(NyaPCommon, _NyaPlayerCore);

  var _super = _createSuper(NyaPCommon);

  _createClass(NyaPCommon, [{
    key: "frame",
    get: function get() {
      return this._.player || this.videoFrame;
    }
  }, {
    key: "player",
    get: function get() {
      return this._.player;
    }
  }, {
    key: "currentPlayerMode",
    get: function get() {
      return this.player.getAttribute('playerMode') || 'normal';
    }
  }, {
    key: "_danmakuEnabled",
    get: function get() {
      return this.opt.danmaku.enable;
    }
  }]);

  function NyaPCommon(opt) {
    var _context, _context2, _context3;

    var _this;

    _classCallCheck(this, NyaPCommon);

    _this = _super.call(this, _index.Utils.deepAssign({}, NyaPCommonOptions, opt));

    _this.log('%c https://github.com/JiaJiaJiang/NyaP/ ', 'log', "background:#6f8fa2;color:#ccc;padding:.3em");

    opt = _this.opt;
    _this.$ = (0, _bind["default"])(_context = _this.$).call(_context, _assertThisInitialized(_this));
    _this.$$ = (0, _bind["default"])(_context2 = _this.$$).call(_context2, _assertThisInitialized(_this)); //language

    var _t = _this._t = (0, _bind["default"])(_context3 = _this.i18n._).call(_context3, _this.i18n); //translate
    //load languages to the core


    var langs = require('./langs.json');

    for (var l in langs) {
      _this.i18n.add(l, langs[l]);
    } //the video frame for NyaP and NyaPTouch


    _this.videoFrame = O2H({
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

    _this._.selectorCache = {};
    _this._.volumeBox = new MsgBox('', 'info', _this.$('#msg_box'));
    _this._.ios = !!navigator.userAgent.match(/i[A-z]+?; CPU .+?like Mac OS/);
    _this._.mobileX5 = !!navigator.userAgent.match(/MQQBrowser/); //receive stat requests

    _this.on('stat', function (stat) {
      var name = _t(stat[1]);

      _this.debug('stat:', name);

      var d = O2H({
        _: 'div',
        child: [name]
      });
      d.append(_this.opt.loadingInfo.contentSpliter);

      _this.$('#loading_info').appendChild(d);

      stat[2].then(function (result) {
        //wait for the result
        d.append(result || _this.opt.loadingInfo.doneText);
      })["catch"](function (e) {
        d.append(e.message || e || _this.opt.loadingInfo.failText);
      });
    }); //loading animation


    if (opt.loadingAnimation) {
      var _opt, _opt$loadingAnimation;

      (_opt = opt) === null || _opt === void 0 ? void 0 : (_opt$loadingAnimation = _opt.loadingAnimation) === null || _opt$loadingAnimation === void 0 ? void 0 : _opt$loadingAnimation.start(_assertThisInitialized(_this));
    }

    _index.DomTools.addEvents(_this.video, {
      loadedmetadata: function loadedmetadata(e) {
        var _opt2, _opt2$loadingAnimatio;

        _this.statResult('loading_video');

        (_opt2 = opt) === null || _opt2 === void 0 ? void 0 : (_opt2$loadingAnimatio = _opt2.loadingAnimation) === null || _opt2$loadingAnimatio === void 0 ? void 0 : _opt2$loadingAnimatio.stop(_assertThisInitialized(_this));
      },
      error: function error(e) {
        var _opt3, _opt3$loadingAnimatio;

        _this.statResult('loading_video', e === null || e === void 0 ? void 0 : e.message);

        (_opt3 = opt) === null || _opt3 === void 0 ? void 0 : (_opt3$loadingAnimatio = _opt3.loadingAnimation) === null || _opt3$loadingAnimatio === void 0 ? void 0 : _opt3$loadingAnimatio.error(_assertThisInitialized(_this));
      }
    }); //load danmaku frame


    if (_this._danmakuEnabled) {
      _this.danmakuContainer = O2H({
        _: 'div',
        prop: {
          id: 'danmaku_container'
        }
      });

      _this.stat('loading_danmakuFrame', function () {
        _this.Danmaku = new _index2["default"](_assertThisInitialized(_this));

        _this.videoFrame.insertBefore(_this.danmakuContainer, _this.$('#loading_frame'));
      });
    } //stupid x5 core


    if (_this._.mobileX5) {
      try {
        _this.Danmaku.modules.TextDanmaku.setRendererMode(1); //force css mode


        _this.Danmaku.modules.TextDanmaku.text2d.supported = false;
      } catch (e) {
        alert(e.message);
      }
    }

    return _this;
  }

  _createClass(NyaPCommon, [{
    key: "$",
    value: function $(selector) {
      var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true; //querySelector for the frame element

      if (useCache && this._.selectorCache[selector]) return this._.selectorCache[selector];
      var el = this.frame.querySelector(selector);
      if (el) this._.selectorCache[selector] = el;
      return el;
    }
  }, {
    key: "$$",
    value: function $$(selector) {
      //querySelectorAll for the frame element
      return this.frame.querySelectorAll(selector);
    }
  }, {
    key: "playerMode",
    value: function playerMode() {
      var _this2 = this;

      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'normal';
      var ios = this._.ios;
      if (mode === 'normal' && this.currentPlayerMode === mode) return;

      if (this.currentPlayerMode === 'fullScreen') {
        ios || _index.DomTools.exitFullscreen()["catch"](function (e) {});
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

            _index.DomTools.requestFullscreen(this.player).then(function () {
              _this2.player.setAttribute('playerMode', 'fullScreen');

              _this2.emit('playerModeChange', mode);
            })["catch"](function (e) {
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
  }, {
    key: "msg",
    value: function msg(text) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'tip'; //type:tip|info|error

      var msg = new MsgBox(text, type, this.$('#msg_box'));
      requestAnimationFrame(function () {
        return msg.show();
      });
    }
  }, {
    key: "_iconActive",
    value: function _iconActive(name, bool) {
      var _this$$;

      (_this$$ = this.$("#icon_span_".concat(name))) === null || _this$$ === void 0 ? void 0 : _this$$.classList[bool ? 'add' : 'remove']('active_icon');
    }
  }, {
    key: "_setDisplayTime",
    value: function _setDisplayTime() {
      var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (current !== null) this.$('#current_time').innerHTML = current;
      if (total !== null) this.$('#total_time').innerHTML = total;
    }
  }, {
    key: "send",
    value: function send() {
      var _this3 = this;

      var color = this._.danmakuColor || this.opt.danmaku.defaultDanmakuColor,
          text = this.$('#danmaku_input').value,
          size = this._.danmakuSize,
          mode = this._.danmakuMode,
          time = this.Danmaku.time,
          d = {
        color: color,
        text: text,
        size: size,
        mode: mode,
        time: time
      };
      var S = this.Danmaku.send(d, function (danmaku) {
        if (danmaku && danmaku._ === 'text') _this3.$('#danmaku_input').value = '';
        danmaku.highlight = true;

        _this3.Danmaku.load(danmaku, true);

        if (_this3.opt.uiOptions.autoHideDanmakuInput) {
          _this3.danmakuInput(false);
        }
      });

      if (!S) {
        this.danmakuInput(false);
        return;
      }
    }
  }]);

  return NyaPCommon;
}(_index.NyaPlayerCore);

exports.NyaPCommon = NyaPCommon;

var MsgBox = /*#__PURE__*/function () {
  function MsgBox(text, type, parentNode) {
    var _this4 = this;

    _classCallCheck(this, MsgBox);

    this.using = false;
    var msg = this.msg = O2H({
      _: 'div',
      attr: {
        "class": "msg_type_".concat(type)
      }
    });
    msg.addEventListener('click', function () {
      return _this4.remove();
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
      var _this5 = this;

      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = (0, _setTimeout3["default"])(function () {
        return _this5.remove();
      }, time || Math.max((this.texts ? this.texts.length : 0) * 0.6 * 1000, 5000));
    })
  }, {
    key: "setText",
    value: function setText(text) {
      this.msg.innerHTML = '';
      var e = O2H(text);
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
      if (!this.using) this.show(false);
    }
  }, {
    key: "show",
    value: function show() {
      var _this6 = this;

      var autoHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (this.using) return;
      this.msg.style.opacity = 0;

      if (this.parentNode && this.parentNode !== this.msg.parentNode) {
        this.parentNode.appendChild(this.msg);
      }

      this.using = true;
      this.msg.parentNode && (0, _setTimeout3["default"])(function () {
        _this6.msg.style.opacity = 1;
      }, 0);
      if (autoHide) this.setTimeout();
    }
  }, {
    key: "remove",
    value: function remove() {
      var _this7 = this;

      if (!this.using) return;
      this.using = false;
      this.msg.style.opacity = 0;

      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = 0;
      }

      (0, _setTimeout3["default"])(function () {
        _this7.msg.parentNode && _this7.msg.parentNode.removeChild(_this7.msg);
      }, 600);
    }
  }]);

  return MsgBox;
}();

},{"../component/NyaP-Core/index.js":1,"../component/NyaP-Danmaku/index.js":7,"./langs.json":446,"@babel/runtime-corejs3/core-js-stable/instance/bind":19,"@babel/runtime-corejs3/core-js-stable/object/create":32,"@babel/runtime-corejs3/core-js-stable/object/define-property":33,"@babel/runtime-corejs3/core-js-stable/object/get-prototype-of":36,"@babel/runtime-corejs3/core-js-stable/object/set-prototype-of":37,"@babel/runtime-corejs3/core-js-stable/promise":38,"@babel/runtime-corejs3/core-js-stable/reflect/construct":39,"@babel/runtime-corejs3/core-js-stable/set-interval":42,"@babel/runtime-corejs3/core-js-stable/set-timeout":43,"@babel/runtime-corejs3/core-js-stable/symbol":44,"@babel/runtime-corejs3/core-js-stable/symbol/iterator":45,"core-js/modules/es.object.to-string":407,"core-js/modules/es.promise":408,"core-js/modules/es.regexp.exec":409,"core-js/modules/es.regexp.to-string":410,"core-js/modules/es.string.match":412,"core-js/modules/es.symbol":416,"core-js/modules/es.symbol.description":415}],445:[function(require,module,exports){
/*
Copyright luojia@luojia.me
LGPL license
*/
'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.number.to-fixed");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.match");

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _iterator = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol/iterator"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));

var _defineProperty = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _create = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/create"));

var _construct = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/reflect/construct"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-prototype-of"));

var _setPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/set-prototype-of"));

var _setImmediate2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-immediate"));

var _isInteger = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/number/is-integer"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _startsWith = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/starts-with"));

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _now = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/date/now"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/assign"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _NyaPCommon2 = require("./NyaPCommon.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof _symbol["default"] === "function" && typeof _iterator["default"] === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof _symbol["default"] === "function" && obj.constructor === _symbol["default"] && obj !== _symbol["default"].prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    (0, _defineProperty["default"])(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = (0, _create["default"])(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = _setPrototypeOf2["default"] || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = (0, _construct["default"])(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !_construct["default"]) return false;
  if (_construct["default"].sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call((0, _construct["default"])(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = _setPrototypeOf2["default"] ? _getPrototypeOf2["default"] : function _getPrototypeOf(o) {
    return o.__proto__ || (0, _getPrototypeOf2["default"])(o);
  };
  return _getPrototypeOf(o);
}

var O2H = _NyaPCommon2.DomTools.Object2HTML; //NyaPTouch options

var NyaPTouchOptions = {
  dragToSeek: true,
  //drag ←→ direction on the video to seek
  dragToChangeVolume: true,
  //drag ↑↓ direction on the video to change volume
  bottomControlHeight: 50,
  //control bar height
  progressBarHeight: 14,
  progressPad: 10,
  //progress bar side margin
  hideControlsBeforeVideoLoaded: true,
  fullScreenToFullPageIfNotSupported: true
}; //touch player

var NyaPTouch = /*#__PURE__*/function (_NyaPCommon) {
  _inherits(NyaPTouch, _NyaPCommon);

  var _super = _createSuper(NyaPTouch);

  function NyaPTouch(opt) {
    var _this;

    _classCallCheck(this, NyaPTouch);

    _this = _super.call(this, _NyaPCommon2.Utils.deepAssign({}, NyaPTouchOptions, opt));
    opt = _this.opt;

    var NP = _assertThisInitialized(_this),
        _t = _this._t,
        $ = _this.$,
        video = _this.video; //set icons


    function icon(name, event) {
      var _context, _context2, _context3, _context4, _context5;

      var attr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var ico = opt.icons[name];
      return O2H({
        _: 'span',
        event: event,
        attr: attr,
        prop: {
          id: "icon_span_".concat(name),
          innerHTML: (0, _concat["default"])(_context = (0, _concat["default"])(_context2 = (0, _concat["default"])(_context3 = (0, _concat["default"])(_context4 = (0, _concat["default"])(_context5 = "<svg height=\"".concat(NP.opt.bottomControlHeight, "\" width=\"")).call(_context5, NP.opt.bottomControlHeight / ico[1] * ico[0], "\" viewBox=\"0,0,")).call(_context4, ico[0], ",")).call(_context3, ico[1], "\" id=\"icon_")).call(_context2, name, "\"\">")).call(_context, ico[2], "</svg>")
        }
      });
    }

    _this.stat('creating_player');

    _this._.fullScreenToFullPage = opt.fullScreenToFullPageIfNotSupported && _this._.ios; //create player elements

    _this._.player = O2H({
      _: 'div',
      attr: {
        "class": 'NyaPTouch',
        id: 'NyaPTouch'
      },
      child: [_this.videoFrame, {
        _: 'div',
        prop: {
          id: 'controls',
          hidden: opt.hideControlsBeforeVideoLoaded
        },
        child: [{
          _: 'div',
          prop: {
            id: 'control_bottom'
          },
          child: [{
            _: 'div',
            attr: {
              id: 'control_bottom_first'
            },
            child: [{
              _: 'div',
              attr: {
                id: 'progress_area'
              },
              child: [{
                _: 'div',
                prop: {
                  id: 'progress_info'
                },
                child: [{
                  _: 'span',
                  attr: {
                    id: 'progress_frame'
                  },
                  child: [{
                    _: 'div',
                    prop: {
                      id: 'progress_wrap'
                    },
                    child: [{
                      _: 'div',
                      prop: {
                        id: 'buffed_bar'
                      }
                    }, {
                      _: 'div',
                      prop: {
                        id: 'progress_bar'
                      }
                    }, {
                      _: 'div',
                      prop: {
                        id: 'seekTo_bar',
                        hidden: true
                      }
                    }]
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
              }]
            }, {
              _: 'span',
              prop: {
                id: 'button_area'
              },
              child: [icon('play', {
                click: function click(e) {
                  return _this.playToggle();
                }
              }), {
                _: 'div',
                attr: {
                  style: 'flex-grow: 1;display: flex;'
                },
                child: [{
                  _: 'span',
                  attr: {
                    id: 'danmakuStyleEditor',
                    "class": 'NyaP_hideNotFirstChildren',
                    tabindex: 0
                  },
                  child: [icon('danmakuStyle', {
                    click: function click(e) {
                      return _this.danmakuStyleToggle();
                    }
                  }), {
                    _: 'div',
                    attr: {
                      id: 'danmaku_size_box'
                    }
                  }, {
                    _: 'div',
                    attr: {
                      id: 'danmaku_mode_box'
                    }
                  }, {
                    _: 'div',
                    attr: {
                      id: 'danmaku_color_box'
                    }
                  }]
                }, {
                  _: 'input',
                  attr: {
                    id: 'danmaku_input',
                    placeholder: _t('Input danmaku here')
                  }
                }]
              }, // {_:'div',attr:{style:'flex-grow: 1;'}},
              icon('danmakuToggle', {
                click: function click(e) {
                  return _this.Danmaku.toggle();
                }
              }, {
                "class": 'active_icon'
              }), icon('loop', {
                click: function click(e) {
                  return video.loop = !video.loop;
                }
              }), icon('volume', {
                click: function click(e) {
                  return video.muted = !video.muted;
                }
              }), icon(_this._.fullScreenToFullPage ? 'fullPage' : 'fullScreen', {
                click: function click(e) {
                  return _this.playerMode(_this._.fullScreenToFullPage ? 'fullPage' : 'fullScreen');
                }
              })]
            }]
          }]
        }]
      }]
    }); //add private vars

    (0, _assign["default"])(NP._, {
      currentDragMode: null,
      touchStartPoint: [0, 0],
      bottomControlDraging: undefined,
      bottomControlTransformY: 0,
      preVideoStat: false,
      seekTo: 0
    }); //calc progress and control_bottom styles

    (0, _assign["default"])($('#progress_wrap').style, {
      left: _this.opt.progressPad + 'px',
      right: _this.opt.progressPad + 'px',
      height: _this.opt.progressBarHeight + 'px',
      marginTop: -_this.opt.progressBarHeight / 2 + 1 + 'px'
    }); // $('#control_bottom').style.marginBottom=`-${this.opt.bottomControlHeight}px`;
    //add extra touch event to video

    extendEvent.doubletouch($('#main_video'));
    extendEvent.touchdrag($('#main_video'), {
      allowMultiTouch: false,
      preventDefaultX: true
    });
    extendEvent.touchdrag($('#control_bottom'), {
      allowMultiTouch: false,
      preventDefaultY: true
    }); //events

    var events = {
      main_video: {
        playing: function playing(e) {
          NP._setDisplayTime(null, _NyaPCommon2.Utils.formatTime(video.duration, video.duration));

          NP._iconActive('play', true);
        },
        pause: function pause(e) {
          NP._iconActive('play', false);
        },
        loadedmetadata: function loadedmetadata(e) {
          console.log('视频时间1', video.duration);
          requestAnimationFrame(function () {
            console.log('视频时间2', video.duration);

            NP._setDisplayTime(null, _NyaPCommon2.Utils.formatTime(video.duration, video.duration));
          });
          if (opt.hideControlsBeforeVideoLoaded) $('#controls').hidden = false;
        },
        volumechange: function volumechange(e) {
          var _context6; //show volume msg


          NP._.volumeBox.renew((0, _concat["default"])(_context6 = "".concat(_t('volume'), ":")).call(_context6, (video.volume * 100).toFixed(0), "%") + "".concat(video.muted ? '(' + _t('muted') + ')' : ''), 3000); //change icon style


          _NyaPCommon2.DomTools.setAttrs($('#volume_circle'), {
            'stroke-dasharray': "".concat(video.volume * 12 * Math.PI, " 90"),
            style: "fill-opacity:".concat(video.muted ? .2 : .6, "!important")
          });
        },
        progress: function progress(e) {
          return NP.drawProgress();
        },
        click: function click(e) {
          e.preventDefault();
          NP.controlsToggle();
        },
        doubletouch: function doubletouch(e) {
          return NP.playToggle();
        },
        timeupdate: function timeupdate(e) {
          var t = (0, _now["default"])();
          if (t - NP._.lastTimeUpdate < 30) return;

          NP._setDisplayTime(_NyaPCommon2.Utils.formatTime(video.currentTime, video.duration));

          NP.drawProgress();
          NP._.lastTimeUpdate = t;
        },
        touchstart: function touchstart(e) {
          var T = e.changedTouches[0];
          if (NP._.currentDragMode) return;
          NP._.touchStartPoint = [T.clientX, T.clientY];
        },
        touchmove: function touchmove(e) {
          if (NP._.currentDragMode) e.preventDefault();
        },
        touchdrag: function touchdrag(e) {
          if (!NP._.currentDragMode) {
            //make sure the drag mode:seek,volume
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
              //seek
              if (!opt.dragToSeek) return;
              NP._.currentDragMode = 'seek';
              NP._.seekTo = video.currentTime;
            } else {
              NP._.currentDragMode = 'volume';
            }
          }

          switch (NP._.currentDragMode) {
            case 'volume':
              {
                video.volume = _NyaPCommon2.Utils.clamp(video.volume - e.deltaY / 200, 0, 1); // NP._.volumeBox.renew(`${_t('volume')}:${(video.volume*100).toFixed(0)}%`+`${video.muted?('('+_t('muted')+')'):''}`,3000);

                break;
              }

            case 'seek':
              {
                var mu = 1 + Math.abs(e.touches[0].clientY - NP._.touchStartPoint[1]) / 5;
                NP._.seekTo = _NyaPCommon2.Utils.clamp(NP._.seekTo + e.deltaX / 100 * mu, 0, video.duration);
                NP.emit('seekMark', NP._.seekTo);
                break;
              }
          }
        },
        touchend: function touchend(e) {
          if (NP._.currentDragMode === 'seek') {
            video.currentTime = NP._.seekTo;
            $('#progress_bar').style.width = "".concat((NP._.seekTo / video.duration * 100).toFixed(2), "%");
            NP.$('#seekTo_bar').hidden = true;

            NP._setDisplayTime(null, _NyaPCommon2.Utils.formatTime(video.duration, video.duration));
          }

          NP._.currentDragMode = null;
        }
        /* contextmenu:e=>{
        	e.preventDefault();
        	if(!opt.dragToChangeVolume)return;
        	NP._.currentDragMode='volume';
        }, */

      },

      /* control_bottom:{
      	touchdrag:e=>{
      		if(NP._.bottomControlDraging===undefined){
      			NP._.bottomControlDraging=(Math.abs(e.deltaY)>Math.abs(e.deltaX));
      		}
      		if(NP._.bottomControlDraging)
      			NP._bottomControlTransformY(NP._.bottomControlTransformY-e.deltaY);
      	},
      	touchend:e=>{
      		if(NP._.bottomControlDraging==undefined)return;
      		NP._.bottomControlDraging=undefined;
      		let R=$('#control_bottom').offsetHeight/2;
      		NP._bottomControlTransformY(NP._.bottomControlTransformY<R?0:NP.opt.bottomControlHeight);
      	},
      }, */
      progress_frame: {
        click: function click(e) {
          var t = e.target,
              pad = NP.opt.progressPad,
              pre = _NyaPCommon2.Utils.clamp((e.offsetX - pad) / (t.offsetWidth - 2 * pad), 0, 1);

          video.currentTime = pre * video.duration;
        }
      },
      danmaku_input: {
        'keydown': function keydown(e) {
          if (e.key == 'Enter') NP.send();
        },
        focus: function focus(e) {
          NP._.preVideoStat = !video.paused;
          video.pause();
          if (!_NyaPCommon2.DomTools.isFullscreen()) return;
          $('#control_bottom').style.top = 0;

          NP._bottomControlTransformY(0);
        },
        blur: function blur(e) {
          (0, _setTimeout2["default"])(function () {
            if (NP._.preVideoStat) video.play();
          }, 100);
          if ($('#control_bottom').style.top == '') return;
          $('#control_bottom').style.top = '';

          NP._bottomControlTransformY($('#control_bottom').offsetHeight - NP.opt.bottomControlHeight);
        }
      },
      danmakuStyleEditor: {
        blur: function blur(e) {
          return NP.danmakuStyleToggle(false);
        }
      },
      danmaku_mode_box: {
        click: function click(e) {
          var _context7;

          var t = e.target;

          if ((0, _startsWith["default"])(_context7 = t.id).call(_context7, 'icon_span_danmakuMode')) {
            var m = 1 * t.id.match(/\d$/)[0];
            if (NP._.danmakuMode !== undefined) $("#icon_span_danmakuMode".concat(NP._.danmakuMode)).classList.remove('active');
            $("#icon_span_danmakuMode".concat(m)).classList.add('active');
            NP._.danmakuMode = m;
          }
        }
      },
      danmaku_size_box: {
        click: function click(e) {
          var _context8;

          var t = e.target;
          if (!t.size) return;
          (0, _forEach["default"])(_context8 = _NyaPCommon2.Utils.toArray($('#danmaku_size_box').childNodes)).call(_context8, function (sp) {
            if (NP._.danmakuSize === sp.size) sp.classList.remove('active');
          });
          t.classList.add('active');
          NP._.danmakuSize = t.size;
        }
      },
      danmaku_color_box: {
        click: function click(e) {
          if (e.target.color) {
            var c = NP.Danmaku.isVaildColor(e.target.color);

            if (c) {
              var _context9; //match valid hex color code


              NP._.danmakuColor = c;
              (0, _forEach["default"])(_context9 = _NyaPCommon2.Utils.toArray($('#danmaku_color_box').childNodes)).call(_context9, function (cp) {
                if (cp === e.target) cp.classList.add('active');else cp.classList.remove('active');
              });
            } else {
              var _context10;

              NP._.danmakuColor = undefined;
              c = NP.Danmaku.isVaildColor(NP.opt.danmaku.defaultDanmakuColor);
              (0, _forEach["default"])(_context10 = _NyaPCommon2.Utils.toArray($('#danmaku_color_box').childNodes)).call(_context10, function (cp) {
                return cp.classList.remove('active');
              });
            }
          }
        }
      }
    };

    for (var eleid in events) {
      //add events to elements
      var el = $("#".concat(eleid));
      if (!el) continue;
      var eves = events[eleid];
      eves && _NyaPCommon2.DomTools.addEvents($("#".concat(eleid)), eves);
    }

    _NyaPCommon2.DomTools.addEvents(_assertThisInitialized(_this), {
      video_loopChange: function video_loopChange(value) {
        return NP._iconActive('loop', value);
      },
      danmakuFrameToggle: function danmakuFrameToggle(bool) {
        return _this._iconActive('danmakuToggle', bool);
      },
      //listen danmakuToggle event to change button style
      seekMark: function seekMark(t) {
        if ($('#seekTo_bar').hidden) $('#seekTo_bar').hidden = false;
        $('#seekTo_bar').style.width = "".concat((t / video.duration * 100).toFixed(2), "%");

        NP._setDisplayTime(null, _NyaPCommon2.Utils.formatTime(t, video.duration));
      },
      playerModeChange: function playerModeChange(mode) {
        var _context11;

        (0, _forEach["default"])(_context11 = ['fullScreen', 'fullPage']).call(_context11, function (m) {
          NP._iconActive(m, mode === m);
        });
      }
    });

    _NyaPCommon2.DomTools.addEvents(document, {
      'fullscreenchange,mozfullscreenchange,webkitfullscreenchange,msfullscreenchange': function fullscreenchangeMozfullscreenchangeWebkitfullscreenchangeMsfullscreenchange(e) {
        if (NP.currentPlayerMode == 'fullScreen' && !_NyaPCommon2.DomTools.isFullscreen()) NP.playerMode('normal');
      },
      visibilitychange: function visibilitychange(e) {
        if (document.hidden) NP._.preVideoStat = false;
      }
    }); //danmaku ui


    if (_this._danmakuEnabled) {
      var _context12, _context13, _context14; //danmaku sizes


      opt.uiOptions.danmakuSizes && (0, _forEach["default"])(_context12 = opt.uiOptions.danmakuSizes).call(_context12, function (s, ind) {
        var el = O2H({
          _: 'span',
          attr: {
            style: "font-size:".concat(16 + ind * 3, "px;"),
            title: s
          },
          prop: {
            size: s
          },
          child: ['A']
        });
        $('#danmaku_size_box').appendChild(el);

        if (typeof opt.uiOptions.danmakuSize === 'number' && s === opt.uiOptions.danmakuSize) {
          el.click();
        }
      }); //danmaku colors

      opt.uiOptions.danmakuColors && (0, _forEach["default"])(_context13 = opt.uiOptions.danmakuColors).call(_context13, function (c) {
        var el = O2H({
          _: 'span',
          attr: {
            style: "background-color:#".concat(c, ";"),
            title: c
          },
          prop: {
            color: c
          }
        });
        $('#danmaku_color_box').appendChild(el);
      }); //danmaku modes

      opt.uiOptions.danmakuModes && (0, _forEach["default"])(_context14 = opt.uiOptions.danmakuModes).call(_context14, function (m) {
        var _opt$uiOptions;

        var el = icon("danmakuMode".concat(m));
        $('#danmaku_mode_box').appendChild(el);

        if ((0, _isInteger["default"])((_opt$uiOptions = opt.uiOptions) === null || _opt$uiOptions === void 0 ? void 0 : _opt$uiOptions.danmakuMode) && m === opt.uiOptions.danmakuMode) {
          el.click();
        }
      });
    } else {
      var _context15;

      (0, _forEach["default"])(_context15 = _this.$$('[id*=danmaku]')).call(_context15, function (el) {
        //remove danmaku buttons
        el.parentNode, removeChild(el);
      });
    } //put into the container


    if (opt.playerContainer instanceof HTMLElement) opt.playerContainer.appendChild(NP.player);

    _this.statResult('creating_player');

    return _this;
  }

  _createClass(NyaPTouch, [{
    key: "controlsToggle",
    value: function controlsToggle() {
      var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$('#controls').hidden;
      this.$('#controls').hidden = !bool;
    }
  }, {
    key: "danmakuStyleToggle",
    value: function danmakuStyleToggle() {
      var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$('#danmakuStyleEditor').classList.contains('NyaP_hideNotFirstChildren');
      this.$('#danmakuStyleEditor').classList[bool ? 'remove' : 'add']('NyaP_hideNotFirstChildren');
    }
  }, {
    key: "_bottomControlTransformY",
    value: function _bottomControlTransformY() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._.bottomControlTransformY;
      this._.bottomControlTransformY = _NyaPCommon2.Utils.clamp(y, 0, NP.opt.bottomControlHeight);
      this.$('#control_bottom').style.transform = "translate3d(0,-".concat(this._.bottomControlTransformY, "px,0)");
      if (y === 0) this.danmakuStyleToggle(false);
    }
  }, {
    key: "danmakuInput",
    value: function danmakuInput() {
      var _this2 = this;

      var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._.bottomControlTransformY === 0; //hide or show danmaku input

      return;
      var $ = this.$;
      if (bool) this._bottomControlTransformY(this.$('#control_bottom_first').offsetHeight - NP.opt.bottomControlHeight);else {
        this._bottomControlTransformY(0);
      }
      (0, _setImmediate2["default"])(function () {
        bool ? $('#danmaku_input').focus() : _this2._.player.focus();
      });
    }
  }, {
    key: "drawProgress",
    value: function drawProgress() {
      var V = this.video,
          B = V.buffered,
          D = V.duration;
      var lastBuffered = 0;
      if (B.length) lastBuffered = B.end(B.length - 1);
      this.$('#buffed_bar').style.width = "".concat((lastBuffered / D * 100).toFixed(2), "%");
      this.$('#progress_bar').style.width = "".concat((V.currentTime / D * 100).toFixed(2), "%");
    }
  }]);

  return NyaPTouch;
}(_NyaPCommon2.NyaPCommon);

var extendEventDefaultOpt = {
  touchdrag: {
    preventDefault: false,
    preventDefaultX: false,
    preventDefaultY: false,
    allowMultiTouch: false
  },
  doubletouch: {
    preventDefault: true
  }
};
var extendEvent = {
  //扩展事件
  touchdrag: function touchdrag(element, opt) {
    var stats = {};
    opt = (0, _assign["default"])({}, extendEventDefaultOpt.touchdrag, opt);
    element.addEventListener('touchstart', function (e) {
      if (!opt.allowMultiTouch && e.changedTouches.length > 1) {
        stats = {};
        return;
      }

      var ct = e.changedTouches;

      for (var t = ct.length; t--;) {
        stats[ct[t].identifier] = [ct[t].clientX, ct[t].clientY];
      }
    });
    element.addEventListener('touchmove', function (e) {
      if (!opt.allowMultiTouch && e.touches.length > 1) {
        return;
      }

      var ct = e.changedTouches;

      for (var t = ct.length; t--;) {
        var id = ct[t].identifier;
        if (!id in stats) continue; //不属于这个元素的事件

        var event = new TouchEvent('touchdrag', e);
        event.deltaX = ct[t].clientX - stats[id][0];
        event.deltaY = ct[t].clientY - stats[id][1];
        stats[id] = [ct[t].clientX, ct[t].clientY];

        if (opt.preventDefault || opt.preventDefaultX && Math.abs(event.deltaX) > Math.abs(event.deltaY) || opt.preventDefaultY && Math.abs(event.deltaX) < Math.abs(event.deltaY)) {
          e.preventDefault();
        }

        element.dispatchEvent(event);
      }
    });
  },
  doubletouch: function doubletouch(element, opt) {
    //enable doubletouch event
    //触摸中出现离开则开始定时
    //定时400毫秒内出现离开事件后判断触点位置组，
    var lastTouches = [],
        //store touches array of a previous event
    currentTouches = [],
        //e.touches
    checking = false,
        //checking if the event should be fired
    checkTimeout = 0; //setTimeout

    function reset() {
      clearTimeout(checkTimeout);
      lastTouches = [];
      currentTouches = [];
      checking = false;
    }

    opt = (0, _assign["default"])({}, extendEventDefaultOpt.doubletouch, opt);
    element.addEventListener('touchstart', function (e) {
      currentTouches = e.touches; //touches of this touch event
    });
    element.addEventListener('touchend', function (e) {
      if (e.touches.length !== 0) return;
      var _lastTouches = lastTouches;
      lastTouches = currentTouches;

      if (checking) {
        clearTimeout(checkTimeout);

        do {
          if (_lastTouches.length !== currentTouches.length) break; //points not match
          //compare evert points' position

          var lP = [];

          for (var i = _lastTouches.length; i--;) {
            //get points of last touches
            lP.push([_lastTouches[i].clientX, _lastTouches[i].clientY]);
          }

          for (var _i = currentTouches.length; _i--;) {
            for (var i2 = lP.length; i2--;) {
              //remove points that are not more than 6 pixels far from last point
              if (lineLength(currentTouches[_i].clientX, currentTouches[_i].clientY, lP[i2][0], lP[i2][1]) <= 6) {
                (0, _splice["default"])(lP).call(lP, i2, 1);
              }
            }
          }

          if (lP.length !== 0) break; //some points are not at the same place
          //ok

          if (opt.preventDefault) e.preventDefault();
          var event = new TouchEvent('doubletouch', e);
          event.points = currentTouches.length;
          element.dispatchEvent(event);
        } while (0);

        reset();
      } else {
        checking = true;
        checkTimeout = (0, _setTimeout2["default"])(function () {
          checking = false;
        }, 400);
      }
    });
  }
};

function lineLength(ax, ay, bx, by) {
  return Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
}

window.NyaPTouch = NyaPTouch;

},{"./NyaPCommon.js":444,"@babel/runtime-corejs3/core-js-stable/date/now":18,"@babel/runtime-corejs3/core-js-stable/instance/concat":20,"@babel/runtime-corejs3/core-js-stable/instance/for-each":23,"@babel/runtime-corejs3/core-js-stable/instance/splice":27,"@babel/runtime-corejs3/core-js-stable/instance/starts-with":28,"@babel/runtime-corejs3/core-js-stable/number/is-integer":30,"@babel/runtime-corejs3/core-js-stable/object/assign":31,"@babel/runtime-corejs3/core-js-stable/object/create":32,"@babel/runtime-corejs3/core-js-stable/object/define-property":33,"@babel/runtime-corejs3/core-js-stable/object/get-prototype-of":36,"@babel/runtime-corejs3/core-js-stable/object/set-prototype-of":37,"@babel/runtime-corejs3/core-js-stable/reflect/construct":39,"@babel/runtime-corejs3/core-js-stable/set-immediate":41,"@babel/runtime-corejs3/core-js-stable/set-timeout":43,"@babel/runtime-corejs3/core-js-stable/symbol":44,"@babel/runtime-corejs3/core-js-stable/symbol/iterator":45,"core-js/modules/es.number.to-fixed":406,"core-js/modules/es.object.to-string":407,"core-js/modules/es.regexp.exec":409,"core-js/modules/es.regexp.to-string":410,"core-js/modules/es.string.match":412,"core-js/modules/es.symbol":416,"core-js/modules/es.symbol.description":415}],446:[function(require,module,exports){
module.exports={"zh-CN":{"play":"播放","Send":"发送","Done":"完成","loop":"循环","pause":"暂停","muted":"静音","volume":"音量","settings":"设置","wheeling":"滚轮","hex color":"Hex颜色","Loading core":"加载核心","Loading video":"加载视频","Loading plugin":"加载插件","full page(P)":"全页模式(P)","Loading danmaku":"加载弹幕","Creating player":"创建播放器","full screen(F)":"全屏模式(F)","danmaku toggle(D)":"弹幕开关(D)","Input danmaku here":"在这里输入弹幕","Loading danmaku frame":"加载弹幕框架","danmaku input(Enter)":"弹幕输入框(回车)","Failed to change to fullscreen mode":"无法切换到全屏模式","loading_core":"加载核心","loading_plugin":"加载插件","loading_danmakuFrame":"加载弹幕框架","creating_player":"创建播放器","loading_danmaku":"加载弹幕","loading_video":"加载视频"}}
},{}]},{},[445])

//# sourceMappingURL=NyaPTouch.js.map
