(function() {
  var ClassBridge, constructRe, root;

  constructRe = function(classname) {
    return RegExp("(^|\\s)" + classname + "(\\s|$)");
  };

  ClassBridge = {
    _addNamespace: function(classname) {
      return classname;
    },
    has: function(element, classname) {
      classname = this._addNamespace(classname);
      return constructRe(classname).test(element.className);
    },
    add: function(element, classname) {
      classname = this._addNamespace(classname);
      if (!this.has(element, classname)) {
        return element.className += " " + classname;
      }
    },
    remove: function(element, classname) {
      var re;
      classname = this._addNamespace(classname);
      re = constructRe(classname);
      return element.className = element.className.replace(re, ' ');
    },
    toggle: function(element, classname, condition) {
      classname = this._addNamespace(classname);
      if (condition != null) {
        if (condition) {
          return this.add(element, classname);
        } else {
          return this.remove(element, classname);
        }
      } else {
        if (this.has(element, classname)) {
          return this.remove(element, classname);
        } else {
          return this.add(element, classname);
        }
      }
    },
    withNamespace: function(namespace) {
      var clone, key, val;
      if (namespace == null) {
        namespace = '';
      }
      clone = {};
      for (key in ClassBridge) {
        val = ClassBridge[key];
        clone[key] = val;
      }
      delete clone.withNamespace;
      clone._addNamespace = function(classname) {
        return namespace + classname;
      };
      return clone;
    }
  };

  if (typeof expose !== "undefined" && expose !== null) {
    expose(ClassBridge, 'ClassBridge');
  } else {
    root = window || global;
    root.ClassBridge = ClassBridge;
  }

}).call(this);
