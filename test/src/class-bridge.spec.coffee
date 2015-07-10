describe 'Class Bridge', ->

  c = null
  e = null

  beforeEach ->
    c = ClassBridge
    e = document.createElement 'div'


  describe 'meta', ->

    it 'should exist', ->
      expect(ClassBridge).toBeDefined()


  describe 'has', ->

    it 'should return false if element does not contain class name', ->
      expect(c.has e, 'aaa').toEqual false

    it 'should return true if element contains class name', ->
      e.className = 'aaa'
      expect(c.has e, 'aaa').toEqual true

    it 'should detect class name among multiple class names', ->
      e.className = 'aaa bbb ccc'
      expect(c.has e, 'aaa').toEqual true
      expect(c.has e, 'bbb').toEqual true
      expect(c.has e, 'ccc').toEqual true


  describe 'add', ->

    it 'should add class name to element', ->
      c.add e, 'aaa'
      expect(e.className).toContain 'aaa'

    it 'should not add duplicate class name if element already contains it', ->
      e.className = 'aaa'
      c.add e, 'aaa'
      expect(e.className).toEqual 'aaa'

    it 'should keep existing class names', ->
      e.className = 'bbb ccc'
      c.add e, 'aaa'
      expect(c.has e, 'aaa').toEqual true
      expect(c.has e, 'bbb').toEqual true
      expect(c.has e, 'ccc').toEqual true


  describe 'remove', ->

    it 'should remove class name from element', ->
      e.className = 'aaa'
      c.remove e, 'aaa'
      expect(e.className).not.toContain 'aaa'

    it 'should keep other class names', ->
      e.className = 'aaa bbb ccc'
      c.remove e, 'aaa'
      expect(c.has e, 'aaa').toEqual false
      expect(c.has e, 'bbb').toEqual true
      expect(c.has e, 'ccc').toEqual true


  describe 'toggle', ->

    it 'should add class name to element if it does not have it', ->
      c.toggle e, 'aaa'
      expect(e.className).toContain 'aaa'

    it 'should remove class name from element if it has it', ->
      e.className = 'aaa'
      c.toggle e, 'aaa'
      expect(e.className).not.toContain 'aaa'
