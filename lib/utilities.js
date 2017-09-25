'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getUnique = getUnique;
exports.parseString = parseString;
exports.parseArray = parseArray;
exports.parseHash = parseHash;
exports.parseClassList = parseClassList;
exports.mergeClasses = mergeClasses;
exports.subtractClasses = subtractClasses;
exports.getElementClassNames = getElementClassNames;
exports.setElementClassNames = setElementClassNames;
/**
 * Gets unique string items from an array.
 * @param {Array} input
 * @returns {Array} List of unique items from the input.
 * @ignore
 */
function getUnique(input) {
  var result = {};
  input.forEach(function (item) {
    return result[item] = true;
  });
  return Object.keys(result);
}

/**
 * Gets list of unique strings separated by whitespace.
 * @param input
 * @returns {Array}
 * @ignore
 */
function parseString(input) {
  if (/^\s*$/.test(input)) {
    return [];
  }
  return getUnique(input.split(/\s+/));
}

/**
 * Gets list of all unique string items from an array.
 * @param {Array} input
 * @returns {Array}
 * @ignore
 */
function parseArray(input) {
  var result = input.filter(function (item) {
    return typeof item === 'string';
  });
  return getUnique(result);
}

/**
 * Gets list of keys of an hash separated by whether their values are truthy or falsy.
 * @param {Object} input
 * @returns {{truthy: Array, falsy: Array}}
 * @ignore
 */
function parseHash(input) {
  var result = { truthy: [], falsy: [] };

  Object.keys(input).forEach(function (item) {
    var target = input[item] ? result.truthy : result.falsy;
    target.push(item);
  });

  return result;
}

/**
 * Attempts to extract list of class names from input
 * @param {*} [input]
 * @param {string} [namespace] String to be added to the beginning of every item in result.
 * @returns {{truthy: Array, falsy: Array}} Lists of class names evaluated as truthy and falsy.
 */
function parseClassList(input, namespace) {
  var result = {
    truthy: [],
    falsy: []
  };

  if (typeof input === 'string') {
    result.truthy = parseString(input);
  } else if (Array.isArray(input)) {
    result.truthy = parseArray(input);
  } else if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object') {
    result = parseHash(input);
  }

  if (typeof namespace !== 'undefined') {
    result.truthy = result.truthy.map(function (item) {
      return namespace + item;
    });
    result.falsy = result.falsy.map(function (item) {
      return namespace + item;
    });
  }

  return result;
}

/**
 * Gets list of unique strings from all provided arrays.
 * @returns {Array}
 */
function mergeClasses() {
  var args = Array.prototype.slice.call(arguments);
  return getUnique([].concat.apply([], args));
}

/**
 * Removes class names from other list of class names.
 * @param {Array} element_classes - List of original class names.
 * @param {Array} ref_classes - List of class names to be removed.
 * @returns {Array}
 */
function subtractClasses(element_classes, ref_classes) {
  return element_classes.filter(function (item) {
    return ref_classes.indexOf(item) === -1;
  });
}

/**
 * Gets list of classes of an element.
 * @param {Element} element
 * @returns {Array.<string>}
 */
function getElementClassNames(element) {
  // asking for `element.className` is not a good idea, because it returns
  // different result for SVG elements
  return parseString(element.getAttribute('class') || '');
}

/**
 * Sets classes of an element
 * @param {Element} element
 * @param {Array.<string>} class_names
 * @returns {Element}
 */
function setElementClassNames(element) {
  var class_names = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  element.setAttribute('class', class_names.join(' '));
  return element;
}