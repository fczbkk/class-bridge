/**
 * Gets unique string items from an array.
 * @param {Array} input
 * @returns {Array} List of unique items from the input.
 * @ignore
 */
export function getUnique (input) {
  const result = {};
  input.forEach(item => result[item] = true);
  return Object.keys(result);
}


/**
 * Gets list of unique strings separated by whitespace.
 * @param input
 * @returns {Array}
 * @ignore
 */
export function parseString (input) {
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
export function parseArray (input) {
  const result = input.filter(item => typeof item === 'string');
  return getUnique(result);
}


/**
 * Gets list of keys of an hash separated by whether their values are truthy or falsy.
 * @param {Object} input
 * @returns {{truthy: Array, falsy: Array}}
 * @ignore
 */
export function parseHash (input) {
  const result = {truthy: [], falsy: []};

  Object.keys(input).forEach((item) => {
    const target = (input[item]) ? result.truthy : result.falsy;
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
export function parseClassList (input, namespace) {
  let result = {
    truthy: [],
    falsy: []
  };

  if (typeof input === 'string') {
    result.truthy = parseString(input);
  } else if (Array.isArray(input)) {
    result.truthy = parseArray(input);
  } else if (typeof input === 'object') {
    result = parseHash(input);
  }

  if (typeof namespace !== 'undefined') {
    result.truthy = result.truthy.map(item => namespace + item);
    result.falsy = result.falsy.map(item => namespace + item);
  }

  return result;
}


/**
 * Gets list of unique strings from all provided arrays.
 * @returns {Array}
 */
export function mergeClasses () {
  const args = Array.prototype.slice.call(arguments);
  return getUnique([].concat.apply([], args));
}


/**
 * Removes class names from other list of class names.
 * @param {Array} element_classes - List of original class names.
 * @param {Array} ref_classes - List of class names to be removed.
 * @returns {Array}
 */
export function subtractClasses (element_classes, ref_classes) {
  return element_classes.filter((item) => ref_classes.indexOf(item) === -1);
}

/**
 * Gets list of classes of an element.
 * @param {Element} element
 * @returns {Array.<string>}
 */
export function getElementClassNames (element) {
  // asking for `element.className` is not a good idea, because it returns
  // different result for SVG elements
  return parseString(element.getAttribute('class'));
}

/**
 * Sets classes of an element
 * @param {Element} element
 * @param {Array.<string>} class_names
 * @returns {Element}
 */
export function setElementClassNames (element, class_names = []) {
  element.setAttribute('class', class_names.join(' '));
  return element;
}
