import ClassBridge from './../src/';


function createElement (class_list = []) {
  const element = document.createElement('div');
  if (typeof class_list === 'string') {
    class_list = [class_list];
  }
  element.className = class_list.join(' ');
  return element;
}


describe('Class Bridge', function () {

  describe('has', function () {

    it('should return false if element does not exist', function () {
      expect(ClassBridge.has()).toEqual(false);
    });

    it('should return true if no classes are present', function () {
      const elm = createElement();
      expect(ClassBridge.has(elm)).toEqual(true);
    });

    it('should return false if a class is not present', function () {
      const elm = createElement();
      expect(ClassBridge.has(elm, 'aaa')).toEqual(false);
    });

    it('should return false if not all classes are present', function () {
      const elm = createElement(['aaa']);
      expect(ClassBridge.has(elm, ['aaa', 'bbb'])).toEqual(false);
    });

    it('should return true if a class is present', function () {
      const elm = createElement(['aaa']);
      expect(ClassBridge.has(elm, 'aaa')).toEqual(true);
    });

    it('should return true if all classes are present', function () {
      const elm = createElement(['aaa', 'bbb', 'ccc']);
      expect(ClassBridge.has(elm, ['aaa', 'bbb', 'ccc'])).toEqual(true);
    });

  });

  describe('hasAny', function () {

    it('should return false if no classes are present', function () {
      const elm = createElement();
      expect(ClassBridge.hasAny(elm, ['aaa', 'bbb'])).toEqual(false);
    });

    it('should return true if some classes are present', function () {
      const elm = createElement(['aaa']);
      expect(ClassBridge.hasAny(elm, ['aaa', 'bbb'])).toEqual(true);
    });

    it('should return true if all classes are present', function () {
      const elm = createElement(['aaa', 'bbb']);
      expect(ClassBridge.hasAny(elm, ['aaa', 'bbb'])).toEqual(true);

    });

  });

  describe('add', function () {

    it('should add single class', function () {
      const elm = createElement();
      ClassBridge.add(elm, 'aaa');
      const result = elm.className.split(/\s+/);
      expect(result).toContain('aaa');
    });

    it('should add array of classes', function () {
      const elm = createElement();
      ClassBridge.add(elm, ['aaa', 'bbb', 'ccc']);
      const result = elm.className.split(/\s+/);
      expect(result).toContain('aaa');
      expect(result).toContain('bbb');
      expect(result).toContain('ccc');
    });

    it('should add hash of classes', function () {
      const elm = createElement();
      ClassBridge.add(elm, {aaa: true, bbb: false, ccc: true});
      const result = elm.className.split(/\s+/);
      expect(result).toContain('aaa');
      expect(result).not.toContain('bbb');
      expect(result).toContain('ccc');
    });

  });

  describe('remove', function () {

    it('should remove single class', function () {
      const elm = createElement(['aaa']);
      ClassBridge.remove(elm, 'aaa');
      const result = elm.className.split(/\s+/);
      expect(result).not.toContain('aaa');
    });

    it('should remove array of classes', function () {
      const elm = createElement(['aaa', 'bbb', 'ccc']);
      ClassBridge.remove(elm, ['aaa', 'bbb']);
      const result = elm.className.split(/\s+/);
      expect(result).not.toContain('aaa');
      expect(result).not.toContain('bbb');
      expect(result).toContain('ccc');
    });

    it('should remove hash of classes', function () {
      const elm = createElement(['aaa', 'bbb', 'ccc']);
      ClassBridge.remove(elm, {aaa: true, bbb: false, ccc: true});
      const result = elm.className.split(/\s+/);
      expect(result).not.toContain('aaa');
      expect(result).toContain('bbb');
      expect(result).not.toContain('ccc');
    });

  });

  describe('toggle', function () {

    it('should remove class if present', function () {
      const elm = createElement(['aaa']);
      ClassBridge.toggle(elm, 'aaa');
      const result = elm.className.split(/\s+/);
      expect(result).not.toContain('aaa');
    });

    it('should add class if not present', function () {
      const elm = createElement();
      ClassBridge.toggle(elm, 'aaa');
      const result = elm.className.split(/\s+/);
      expect(result).toContain('aaa');
    });

    it('should work on array of classes', function () {
      const elm = createElement(['aaa']);
      ClassBridge.toggle(elm, ['aaa', 'bbb']);
      const result = elm.className.split(/\s+/);
      expect(result).not.toContain('aaa');
      expect(result).toContain('bbb');
    });

    it('should work on hash', function () {
      const elm = createElement(['aaa', 'bbb']);
      ClassBridge.toggle(elm, {aaa: true, bbb: false, ccc: true});
      const result = elm.className.split(/\s+/);
      expect(result).not.toContain('aaa');
      expect(result).toContain('bbb');
      expect(result).toContain('ccc');
    });

  });

});

describe('namespace', function () {

  const nsClassBridge = ClassBridge.withNamespace('zzz');

  it('should clone itself', function () {
    const result = ClassBridge.withNamespace('aaa');
    expect(result._namespace).toEqual('aaa');
  });

  it('has', function () {
    const elm = createElement('zzzaaa');
    expect(nsClassBridge.has(elm, 'aaa')).toEqual(true);
    expect(nsClassBridge.has(elm, 'zzzaaa')).toEqual(false);
  });

  it('add', function () {
    const elm = createElement();
    nsClassBridge.add(elm, 'aaa');
    const result = elm.className.split(/\s+/);
    expect(result).toContain('zzzaaa');
    expect(result).not.toContain('aaa');
  });

  it('remove', function () {
    const elm = createElement('zzzaaa');
    nsClassBridge.remove(elm, 'aaa');
    const result = elm.className.split(/\s+/);
    expect(result).not.toContain('zzzaaa');
  });

  it('toggle', function () {
    let result;
    const elm = createElement('zzzaaa');

    nsClassBridge.toggle(elm, 'aaa');
    result = elm.className.split(/\s+/);
    expect(result).not.toContain('zzzaaa');

    nsClassBridge.toggle(elm, 'aaa');
    result = elm.className.split(/\s+/);
    expect(result).toContain('zzzaaa');
  });

});
