import isElement from 'iselement';
import {
  parseClassList,
  parseString,
  mergeClasses,
  subtractClasses
} from './utilities';


/**
 * List of class names. If a string is provided, it will be split by whitespace. If an array is provided, only string items will be used. If an object is provided, its keys will be used as class names and only the ones with truthy values will be used.
 * @typedef {string|Array|Object} ClassList
 */


export default {

  _namespace: '',

  /**
   * Returns true if all class names are present in element.
   * @param {HTMLElement} element
   * @param {ClassList} class_names
   * @param {string} [namespace]
   * @returns {boolean}
   */
  has: function (element, class_names, namespace = this._namespace) {
    if (isElement(element)) {
      const element_classes = parseString(element.className);
      const ref_classes = parseClassList(class_names, namespace).truthy;

      return ref_classes.reduce((previous, current) => {
        return previous && (element_classes.indexOf(current) !== -1);
      }, true);
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
  hasAny: function (element, class_names, namespace = this._namespace) {
    if (isElement(element)) {
      const element_classes = parseString(element.className);
      const ref_classes = parseClassList(class_names, namespace).truthy;

      return ref_classes.reduce((previous, current) => {
        return previous || (element_classes.indexOf(current) !== -1);
      }, false);
    }
    return false;
  },

  /**
   * Adds class names to the element.
   * @param {HTMLElement} element
   * @param {ClassList} class_names
   * @param {string} [namespace]
   */
  add: function(element, class_names, namespace = this._namespace) {
    if (isElement(element)) {
      const element_classes = parseString(element.className);
      const ref_classes = parseClassList(class_names, namespace).truthy;
      const new_classes = mergeClasses(element_classes, ref_classes);
      element.className = new_classes.join(' ');
    }
  },

  /**
   * Removes class names from the element.
   * @param {HTMLElement} element
   * @param {ClassList} class_names
   * @param {string} [namespace]
   */
  remove: function (element, class_names, namespace = this._namespace) {
    if (isElement(element)) {
      const element_classes = parseString(element.className);
      const ref_classes = parseClassList(class_names, namespace).truthy;
      const new_classes = subtractClasses(element_classes, ref_classes);
      element.className = new_classes.join(' ');
    }
  },

  /**
   * Adds class names to the element if they don't exist yet. Removes the existing ones.
   * @param {HTMLElement} element
   * @param {ClassList} class_names
   * @param {string} [namespace]
   */
  toggle: function (element, class_names, namespace = this._namespace) {
    if (isElement(element)) {
      const element_classes = parseString(element.className);
      const ref_classes = parseClassList(class_names, namespace).truthy;
      const classes_to_add = [];
      const classes_to_remove = [];

      ref_classes.forEach((item) => {
        const target = (element_classes.indexOf(item) === -1)
          ? classes_to_add
          : classes_to_remove;
        target.push(item);
      });

      let new_classes = mergeClasses(element_classes, classes_to_add);
      new_classes = subtractClasses(new_classes, classes_to_remove);

      element.className = new_classes.join(' ');
    }
  },

  /**
   * Creates instance of ClassBridge with namespace defined. The namespace will be used automatically in all method calls.
   * @param {string} [namespace]
   */
  withNamespace: function (namespace) {
    const clone = {};
    Object.keys(this).forEach(key => clone[key] = this[key]);
    clone._namespace = namespace;
    return clone;
  }

}