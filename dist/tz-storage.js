/**
 * tz-storage v0.0.1
 * (c) 2019 Tianzhen Mecoepcoo@vip.qq.com
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.storage = factory());
}(this, function () { 'use strict';

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
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Storage =
  /*#__PURE__*/
  function () {
    function Storage() {
      _classCallCheck(this, Storage);

      this._namespace = '';
      this._defaultValue = null;
      this._isSupported = this._checkSupported;
    }
    /**
     * check supported getter
     * @readonly
     * @memberof Storage
     */


    _createClass(Storage, [{
      key: "set",

      /**
       * set localstorage value
       * @param {string} key 
       * @param {string} value 
       * @param {number} [expire] expire timestamp, pass 0 to disable expire
       * @returns
       * @memberof Storage
       */
      value: function set(key, value) {
        var expire = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        if (!this._isSupported) return false;
        key = this._keyHandle(key);
        value = JSON.stringify({
          data: value,
          expire: expire
        });

        try {
          window.localStorage.setItem(key, value);
          return true;
        } catch (e) {
          console.error(e, "Type Error: value is not supported.");
          return false;
        }
      }
      /**
       * get localstorage value
       * @param {string} key 
       * @param {object} options
       * @param {any} options.defaultValue returned when the value is empty
       * @param {string=["string","number","boolean"]} options.type parse type of the value 
       */

    }, {
      key: "get",
      value: function get(key) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref$defaultValue = _ref.defaultValue,
            defaultValue = _ref$defaultValue === void 0 ? null : _ref$defaultValue,
            type = _ref.type;

        // todo 增加d.ts
        if (!this._isSupported) return defaultValue;
        key = this._keyHandle(key);

        var _value = JSON.parse(window.localStorage.getItem(key));

        if (_value === null) return defaultValue;
        var data = _value.data,
            expire = _value.expire;
        var now = new Date().getTime();

        if (expire && expire < now) {
          window.localStorage.removeItem(key);
          return defaultValue;
        }

        switch (type) {
          case 'string':
            data = "".concat(data);
            break;

          case 'number':
            data = Number(data);
            break;

          case 'boolean':
            data = Boolean(data);
            break;

          default:
            break;
        }

        return data === null ? defaultValue : data;
      }
      /**
       * remove the specified localstorage
       * @param {string} key 
       */

    }, {
      key: "remove",
      value: function remove(key) {
        if (!this._isSupported) return false;
        key = this._keyHandle(key);
        window.localStorage.removeItem(key);
        return true;
      }
    }, {
      key: "_keyHandle",
      value: function _keyHandle(key) {
        return this._namespace + key;
      }
    }, {
      key: "_checkSupported",
      get: function get() {
        return window.localStorage && (window.localStorage.setItem('tls', 'ls'), window.localStorage.getItem('tls') === 'ls');
      }
      /**
       * namespace getter
       * @memberof Storage
       * @returns {string}
       */

    }, {
      key: "namespace",
      get: function get() {
        return this._namespace;
      }
      /**
       * namespace setter
       * @memberof Storage
       */
      ,
      set: function set(value) {
        this._namespace = value ? "".concat(value, ".") : '';
      }
    }, {
      key: "defaultValue",
      set: function set(value) {
        this._defaultValue = value;
      }
    }]);

    return Storage;
  }();

  var storage = new Storage();

  return storage;

}));
//# sourceMappingURL=tz-storage.js.map