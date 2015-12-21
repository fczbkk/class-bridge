# generates regex for matching class names separated by whitespace
constructRe = (classname) ->
  ///
    (^|\s)        # beginning of string or whitespace
    #{classname}
    (\s|$)        # end of string or whitespace
  ///


ClassBridge =


  _addNamespace: (classname) -> classname


  has: (element, classname) ->
    classname = @_addNamespace classname
    constructRe classname
      .test element.className


  add: (element, classname) ->
    classname = @_addNamespace classname
    unless @has element, classname
      element.className += " #{classname}"


  remove: (element, classname) ->
    classname = @_addNamespace classname
    re = constructRe classname
    element.className = element.className.replace re, ' '


  toggle: (element, classname, condition) ->
    classname = @_addNamespace classname
    if condition?
      if condition
        @add element, classname
      else
        @remove element, classname
    else
      if @has element, classname
        @remove element, classname
      else
        @add element, classname


  withNamespace: (namespace = '') ->
    clone = {}
    for key, val of ClassBridge
      clone[key] = val
    delete clone.withNamespace
    clone._addNamespace = (classname) -> namespace + classname
    clone


# export to global namespace
if expose?
  expose ClassBridge, 'ClassBridge'
else
  root = window or global
  root.ClassBridge = ClassBridge
