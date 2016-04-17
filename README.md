# Class Bridge

Helper for working with class names in elements.

## How to use it

### Basic functions

```javascript
var my_element = document.createElement('div');
my_element.className = 'aaa';

// Check if element has class name.
ClassBridge.has(my_element, 'aaa');  // true

// Add class name to element.
ClassBridge.add(my_element, 'bbb');
ClassBridge.has(my_element, 'bbb');  // true

// Remove class name from element.
ClassBridge.remove(my_element, 'bbb');
ClassBridge.has(my_element, 'bbb');  // false

// Toggle element's class names.
ClassBridge.has(my_element, 'aaa');  // true
ClassBridge.toggle(my_element, 'aaa');
ClassBridge.has(my_element, 'aaa');  // false
ClassBridge.toggle(my_element, 'aaa');
ClassBridge.has(my_element, 'aaa');  // true
```

### Class list

List of classes can be defined as string, array or object.

```javascript
// String is split into separate items by whitespace.
ClassBridge.add(my_element, 'aaa bbb');
ClassBridge.remove(my_element, 'bbb ccc');
ClassBridge.has(my_element, 'aaa');  // true
ClassBridge.has(my_element, 'bbb');  // false

// Array uses only string items.
ClassBridge.add(my_element, ['aaa', null, true, 123, {}]);
// element's classname is 'aaa' now

// Object's keys are used as classnames, only the ones with truthy
// values are used.
ClassBridge.add({aaa: true, bbb: false});
ClassBridge.has(my_element, 'aaa');  // true
ClassBridge.has(my_element, 'bbb');  // false
```

### Namespaces

Every method has third parameter `namespace`. This should be a string, which will be attached to every item in the class list.

```javascript
ClassBridge.add(my_element, 'aaa', 'zzz');
ClassBridge.has(my_element, 'aaa');     // false
ClassBridge.has(my_element, 'zzzaaa');  // true
```

If you know you will be using namespace consistently, you can create an instance of ClassBridge with predefined namespace:

```javascript
var MyClassBridge = ClassBridge.withNamespace('zzz');
ClassBridge.add(my_element, 'aaa');
ClassBridge.has(my_element, 'aaa');     // false
ClassBridge.has(my_element, 'zzzaaa');  // true
```

## Documentation

### add

Adds class names to the element.

**Parameters**

-   `element` **[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)** 
-   `class_names` **ClassList** 
-   `namespace` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** 

### ClassList

List of class names. If a string is provided, it will be split by whitespace. If an array is provided, only string items will be used. If an object is provided, its keys will be used as class names and only the ones with truthy values will be used.

### has

Returns true if all class names are present in element.

**Parameters**

-   `element` **[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)** 
-   `class_names` **ClassList** 
-   `namespace` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** 

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### hasAny

Returns true if any of class names are present in element.

**Parameters**

-   `element` **[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)** 
-   `class_names` **ClassList** 
-   `namespace` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** 

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### mergeClasses

Gets list of unique strings from all provided arrays.

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

### parseClassList

Attempts to extract list of class names from input

**Parameters**

-   `input` **Any=** 
-   `namespace` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** String to be added to the beginning of every item in result.

Returns **{truthy: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), falsy: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)}** Lists of class names evaluated as truthy and falsy.

### remove

Removes class names from the element.

**Parameters**

-   `element` **[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)** 
-   `class_names` **ClassList** 
-   `namespace` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** 

### subtractClasses

Removes class names from other list of class names.

**Parameters**

-   `element_classes` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** List of original class names.
-   `ref_classes` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** List of class names to be removed.

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

### toggle

Adds class names to the element if they don't exist yet. Removes the existing ones.

**Parameters**

-   `element` **[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)** 
-   `class_names` **ClassList** 
-   `namespace` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** 

### withNamespace

Creates instance of ClassBridge with namespace defined. The namespace will be used automatically in all method calls.

**Parameters**

-   `namespace` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** 

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](https://github.com/fczbkk/class-bridge/issues) or send me an e-mail at <a href="mailto:riki@fczbkk.com">riki@fczbkk.com</a>.

## License

Class Bridge is published under the [MIT license](https://github.com/fczbkk/class-bridge/blob/master/LICENSE).
