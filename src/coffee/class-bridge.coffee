# generates regex for matching class names separated by whitespace
constructRe = (classname) ->
  ///
    (^|\s)        # beginning of string or whitespace
    #{classname}
    (\s|$)        # end of string or whitespace
  ///


ClassBridge =

  has: (element, classname) ->
    constructRe classname
      .test element.className


  add: (element, classname) ->
    unless @has element, classname
      element.className += " #{classname}"


  remove: (element, classname) ->
    re = constructRe classname
    element.className = element.className.replace re, ' '


  toggle: (element, classname, condition) ->
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


# export to global namespace
if expose?
  expose ClassBridge, 'ClassBridge'
else
  root = window or global
  root.ClassBridge = ClassBridge
