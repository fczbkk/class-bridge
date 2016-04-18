import {
  parseClassList
} from './../src/utilities';

describe('parseClassList', function () {

  it('should return empty lists on no input', function () {
    const result = parseClassList();
    expect(result.truthy).toEqual([]);
    expect(result.falsy).toEqual([]);
  });

  it('should return single class from simple string', function () {
    const result = parseClassList('aaa');
    expect(result.truthy).toEqual(['aaa']);
    expect(result.falsy).toEqual([]);
  });

  it('should return multiple classes from string with whitespace', function () {
    const result = parseClassList('aaa bbb   ccc');
    expect(result.truthy).toEqual(['aaa', 'bbb', 'ccc']);
    expect(result.falsy).toEqual([]);
  });

  it('should return unique results from string', function () {
    const result = parseClassList('aaa aaa bbb bbb ccc');
    expect(result.truthy).toEqual(['aaa', 'bbb', 'ccc']);
    expect(result.falsy).toEqual([]);
  });

  it('should return multiple classes from array', function () {
    const result = parseClassList(['aaa', 'bbb', 'ccc']);
    expect(result.truthy).toEqual(['aaa', 'bbb', 'ccc']);
    expect(result.falsy).toEqual([]);
  });

  it('should only get strings from an array', function () {
    const result = parseClassList(['aaa', null, false, {}, []]);
    expect(result.truthy).toEqual(['aaa']);
    expect(result.falsy).toEqual([]);
  });

  it('should return unique results from array', function () {
    const result = parseClassList(['aaa', 'aaa', 'bbb', 'bbb', 'ccc']);
    expect(result.truthy).toEqual(['aaa', 'bbb', 'ccc']);
    expect(result.falsy).toEqual([]);
  });

  it('should return multiple classes from hash', function () {
    const result = parseClassList({
      aaa: true,
      bbb: false,
      ccc: true
    });
    expect(result.truthy).toEqual(['aaa', 'ccc']);
    expect(result.falsy).toEqual(['bbb']);
  });

  it('should add namespace', function () {
    const result = parseClassList({
      aaa: true,
      bbb: false,
      ccc: true
    }, 'zzz');
    expect(result.truthy).toEqual(['zzzaaa', 'zzzccc']);
    expect(result.falsy).toEqual(['zzzbbb']);
  });

});
