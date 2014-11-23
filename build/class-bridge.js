var ClassBridge;

ClassBridge = (function() {
  function ClassBridge() {}

  ClassBridge.prototype.re = function(classname) {
    return RegExp("(^|\\s)" + classname + "(\\s|$)");
  };

  ClassBridge.prototype.has = function(element, classname) {
    return this.re(classname).test(element.className);
  };

  ClassBridge.prototype.add = function(element, classname) {
    if (!this.has(element, classname)) {
      return element.className += " " + classname;
    }
  };

  ClassBridge.prototype.remove = function(element, classname) {
    var re;
    re = this.re(classname);
    return element.className = element.className.replace(re, ' ');
  };

  ClassBridge.prototype.toggle = function(element, classname) {
    if (this.has(element, classname)) {
      return this.remove(element, classname);
    } else {
      return this.add(element, classname);
    }
  };

  return ClassBridge;

})();
