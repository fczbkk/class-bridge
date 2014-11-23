class ClassBridge


  # generates regex for matching class names separated by whitespace
  re: (classname) ->
    ///
      (^|\s)        # beginning of string or whitespace
      #{classname}
      (\s|$)        # end of string or whitespace
    ///


  has: (element, classname) ->
    @re classname
      .test element.className


  add: (element, classname) ->
    unless @has element, classname
      element.className += " #{classname}"


  remove: (element, classname) ->
    re = @re classname
    element.className = element.className.replace re, ' '


  toggle: (element, classname) ->
    if @has element, classname
      @remove element, classname
    else
      @add element, classname
