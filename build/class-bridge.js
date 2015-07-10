(function() {
  var ClassBridge, constructRe, root;

  constructRe = function(classname) {
    return RegExp("(^|\\s)" + classname + "(\\s|$)");
  };

  ClassBridge = {
    has: function(element, classname) {
      return constructRe(classname).test(element.className);
    },
    add: function(element, classname) {
      if (!this.has(element, classname)) {
        return element.className += " " + classname;
      }
    },
    remove: function(element, classname) {
      var re;
      re = constructRe(classname);
      return element.className = element.className.replace(re, ' ');
    },
    toggle: function(element, classname) {
      if (this.has(element, classname)) {
        return this.remove(element, classname);
      } else {
        return this.add(element, classname);
      }
    }
  };

  if (typeof expose !== "undefined" && expose !== null) {
    expose(ClassBridge, 'ClassBridge');
  } else {
    root = window || global;
    root.ClassBridge = ClassBridge;
  }

}).call(this);
