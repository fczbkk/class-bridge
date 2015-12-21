# Class Bridge

Object for cross-browser working with element class names using [bridge pattern](http://en.wikipedia.org/wiki/Bridge_pattern).

Modern browsers can use [`Element.classList`](http://www.w3.org/TR/dom/#dom-element-classlist) to work with element classes. Unfortunately, [`Element.classList` is not supported in Internet Explorer 9 and older](http://caniuse.com/#search=classlist). This lightweight bridge object provides set of handy methods for most common actions with element classes.

You should use [`Element.classList` polyfill](https://cdn.polyfill.io/v1/polyfill.js?features=Element.prototype.classList|always), if you want the full functionality.

So why should you use Class Bridge instead of polyfill? Two reasons:

- **Size.** Minified Class Bridge has 0.6KB, while minified polyfill has 2KB.
- **SVG support.** Safari, Android browser and Internet Expolorer do not support `Element.classList` on SVG elements.

## Example

```javascript
// create testing element
var element = document.createElement('div');
element.className = 'aaa bbb'

// check if element contains classname
ClassBridge.has(element, 'aaa'); // true
ClassBridge.has(element, 'ccc'); // false

// add classname to element
ClassBridge.add(element, 'ccc');
ClassBridge.has(element, 'ccc'); // true

// remove classname from element
ClassBridge.remove(element, 'aaa');
ClassBridge.has(element, 'aaa'); // false

// toggle classname in element
ClassBridge.toggle(element, 'aaa');
ClassBridge.has(element, 'aaa'); // true
ClassBridge.toggle(element, 'aaa');
ClassBridge.has(element, 'aaa'); // false

// toggle adds the classname if optional third parameter is truthy
ClassBridge.toggle(element, 'aaa', true);
ClassBridge.has(element, 'aaa'); // true
ClassBridge.toggle(element, 'aaa', false);
ClassBridge.has(element, 'aaa'); // false

// if you use namespaced selectors
var NamespacedClassBridge = ClassBridge.withNamespace('aaa');

element.className = '';

NamespacedClassBridge.add(element, 'bbb');
ClassBridge.has(element, 'bbb'); // false
NamespacedClassBrige.has(element, 'bbb'); // true
```

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](https://github.com/fczbkk/class-bridge/issues) or send me an e-mail at [riki@fczbkk.com](mailto:riki@fczbkk.com).

## License

Angle JS is published under the [UNLICENSE license](https://github.com/fczbkk/class-bridge/blob/master/UNLICENSE). Feel free to use it in any way.
