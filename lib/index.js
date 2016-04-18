'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _iselement = require('iselement');

var _iselement2 = _interopRequireDefault(_iselement);

var _utilities = require('./utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * List of class names. If a string is provided, it will be split by whitespace. If an array is provided, only string items will be used. If an object is provided, its keys will be used as class names and only the ones with truthy values will be used.
 * @typedef {string|Array|Object} ClassList
 */

exports.default = {

  _namespace: '',

  /**
   * Returns true if all class names are present in element.
   * @param {HTMLElement} element
   * @param {ClassList} class_names
   * @param {string} [namespace]
   * @returns {boolean}
   */
  has: function has(element, class_names) {
    var namespace = arguments.length <= 2 || arguments[2] === undefined ? this._namespace : arguments[2];

    if ((0, _iselement2.default)(element)) {
      var _ret = function () {
        var element_classes = (0, _utilities.parseString)(element.className);
        var ref_classes = (0, _utilities.parseClassList)(class_names, namespace).truthy;

        return {
          v: ref_classes.reduce(function (previous, current) {
            return previous && element_classes.indexOf(current) !== -1;
          }, true)
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
    return false;
  },

  /**
   * Returns true if any of class names are present in element.
   * @param {HTMLElement} element
   * @param {ClassList} class_names
   * @param {string} [namespace]
   * @returns {boolean}
   */
  hasAny: function hasAny(element, class_names) {
    var namespace = arguments.length <= 2 || arguments[2] === undefined ? this._namespace : arguments[2];

    if ((0, _iselement2.default)(element)) {
      var _ret2 = function () {
        var element_classes = (0, _utilities.parseString)(element.className);
        var ref_classes = (0, _utilities.parseClassList)(class_names, namespace).truthy;

        return {
          v: ref_classes.reduce(function (previous, current) {
            return previous || element_classes.indexOf(current) !== -1;
          }, false)
        };
      }();

      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
    }
    return false;
  },

  /**
   * Adds class names to the element.
   * @param {HTMLElement} element
   * @param {ClassList} class_names
   * @param {string} [namespace]
   */
  add: function add(element, class_names) {
    var namespace = arguments.length <= 2 || arguments[2] === undefined ? this._namespace : arguments[2];

    if ((0, _iselement2.default)(element)) {
      var element_classes = (0, _utilities.parseString)(element.className);
      var ref_classes = (0, _utilities.parseClassList)(class_names, namespace).truthy;
      var new_classes = (0, _utilities.mergeClasses)(element_classes, ref_classes);
      element.className = new_classes.join(' ');
    }
  },

  /**
   * Removes class names from the element.
   * @param {HTMLElement} element
   * @param {ClassList} class_names
   * @param {string} [namespace]
   */
  remove: function remove(element, class_names) {
    var namespace = arguments.length <= 2 || arguments[2] === undefined ? this._namespace : arguments[2];

    if ((0, _iselement2.default)(element)) {
      var element_classes = (0, _utilities.parseString)(element.className);
      var ref_classes = (0, _utilities.parseClassList)(class_names, namespace).truthy;
      var new_classes = (0, _utilities.subtractClasses)(element_classes, ref_classes);
      element.className = new_classes.join(' ');
    }
  },

  /**
   * Adds class names to the element if they don't exist yet. Removes the existing ones.
   * @param {HTMLElement} element
   * @param {ClassList} class_names
   * @param {string} [namespace]
   */
  toggle: function toggle(element, class_names) {
    var namespace = arguments.length <= 2 || arguments[2] === undefined ? this._namespace : arguments[2];

    if ((0, _iselement2.default)(element)) {
      (function () {
        var element_classes = (0, _utilities.parseString)(element.className);
        var ref_classes = (0, _utilities.parseClassList)(class_names, namespace).truthy;
        var classes_to_add = [];
        var classes_to_remove = [];

        ref_classes.forEach(function (item) {
          var target = element_classes.indexOf(item) === -1 ? classes_to_add : classes_to_remove;
          target.push(item);
        });

        var new_classes = (0, _utilities.mergeClasses)(element_classes, classes_to_add);
        new_classes = (0, _utilities.subtractClasses)(new_classes, classes_to_remove);

        element.className = new_classes.join(' ');
      })();
    }
  },

  /**
   * Creates instance of ClassBridge with namespace defined. The namespace will be used automatically in all method calls.
   * @param {string} [namespace]
   */
  withNamespace: function withNamespace(namespace) {
    var _this = this;

    var clone = {};
    Object.keys(this).forEach(function (key) {
      return clone[key] = _this[key];
    });
    clone._namespace = namespace;
    return clone;
  }

};