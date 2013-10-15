/*global describe, it, beforeEach, assert */

'use strict';

var classes = require('dom-classes');
var __slice = Array.prototype.slice;
var __toString = Object.prototype.toString;

describe('classes([el])', function() {
  var elmts;
  var nodeList;

  function every(list, check) {
    if ('[object NodeList]' === __toString.call(list)) {
      list = __slice.call(list);
    }

    return list.every(check);
  }

  function addClasses(list, classes) {
    if ('[object NodeList]' === __toString.call(list)) {
      list = __slice.call(list);
    }

    list.forEach(function(el) {
      el.className = classes;
    });
  }

  function checkClassName(value) {
    return function(el) {
      return el.className === value;
    };
  }

  function checkIsTrue(prop) {
    return function(value) {
      return value === prop;
    };
  }

  beforeEach(function() {
    var div = document.createElement('div');
    var html = '';
    for (var i = 0; i < 2; i++) {
      html += '<div></div>';
    }

    div.innerHTML = html;
    nodeList = div.querySelectorAll('div');
    elmts = __slice.call(nodeList);
  });

  describe('.add(class)', function() {
    describe('array', function() {
      it('should add a class', function() {
        classes(elmts).add('foo').add('bar');
        assert(every(elmts, checkClassName('foo bar')));
      });
    });

    describe('nodeList', function() {
      it('should add a class', function() {
        classes(nodeList).add('foo').add('bar');
        assert(every(nodeList, checkClassName('foo bar')));
      });
    });
  });


  describe('.remove(class)', function() {
    describe('array', function() {
      it('should remove a class', function() {
        addClasses(elmts, 'foo bar');
        classes(elmts).remove('foo');
        assert(every(elmts, checkClassName('bar')));
      });

      it('should remove matching classes', function() {
        addClasses(elmts, 'foo item-1 item-2 bar');
        classes(elmts).remove(/^item-/);
        assert(every(elmts, checkClassName('foo bar')));
      });
    });

    describe('nodelist', function() {
      it('should remove a class', function() {
        addClasses(nodeList, 'foo bar');
        classes(nodeList).remove('foo');
        assert(every(nodeList, checkClassName('bar')));
      });

      it('should remove matching classes', function() {
        addClasses(nodeList, 'foo item-1 item-2 bar');
        classes(nodeList).remove(/^item-/);
        assert(every(nodeList, checkClassName('foo bar')));
      });
    });
  });


  describe('.toggle(class)', function() {
    describe('array', function() {
      describe('when present', function() {
        it('should remove the class', function() {
          addClasses(elmts, 'foo bar hidden');
          classes(elmts).toggle('hidden');
          assert(every(elmts, checkClassName('foo bar')));
        });
      });

      describe('when not present', function() {
        it('should add the class', function() {
          addClasses(elmts, 'foo bar');
          classes(elmts).toggle('hidden');
          assert(every(elmts, checkClassName('foo bar hidden')));
        });
      });
    });

    describe('nodelist', function() {
      describe('when present', function() {
        it('should remove the class', function() {
          addClasses(nodeList, 'foo bar hidden');
          classes(nodeList).toggle('hidden');
          assert(every(nodeList, checkClassName('foo bar')));
        });
      });

      describe('when not present', function() {
        it('should add the class', function() {
          addClasses(nodeList, 'foo bar');
          classes(nodeList).toggle('hidden');
          assert(every(nodeList, checkClassName('foo bar hidden')));
        });
      });
    });
  });


  describe('.array()', function() {
    describe('array', function() {
      it('should return an array of classes', function() {
        addClasses(elmts, 'foo bar baz');
        var arr = classes(elmts).array();
        assert.isArray(arr);

        arr.forEach(function(ret) {
          assert('foo' === ret[0]);
          assert('bar' === ret[1]);
          assert('baz' === ret[2]);
        });
      });
    });

    describe('nodelist', function() {
      it('should return an array of classes', function() {
        addClasses(nodeList, 'foo bar baz');
        var arr = classes(nodeList).array();
        assert.isArray(arr);

        arr.forEach(function(ret) {
          assert('foo' === ret[0]);
          assert('bar' === ret[1]);
          assert('baz' === ret[2]);
        });
      });
    });
  });


  describe('.has()', function() {
    describe('array', function() {
      it('should check if the class is present', function() {
        addClasses(elmts, 'hey there');
        assert(every(classes(elmts).has('foo'), checkIsTrue(false)));
        assert(every(classes(elmts).has('hey'), checkIsTrue(true)));
        assert(every(classes(elmts).has('there'), checkIsTrue(true)));
      });
    });

    describe('nodelist', function() {
      it('should check if the class is present', function() {
        addClasses(nodeList, 'hey there');
        assert(every(classes(nodeList).has('foo'), checkIsTrue(false)));
        assert(every(classes(nodeList).has('hey'), checkIsTrue(true)));
        assert(every(classes(nodeList).has('there'), checkIsTrue(true)));
      });
    });
  });


  describe('.swap()', function() {
    describe('array', function() {
      it('should swap foo for bar', function() {
        addClasses(elmts, 'foo baz');
        classes(elmts).swap('foo', 'bar');
        assert(every(elmts, checkClassName('baz bar')));
      });
    });

    describe('nodelist', function() {
      it('should swap foo for bar', function() {
        addClasses(nodeList, 'foo baz');
        classes(nodeList).swap('foo', 'bar');
        assert(every(nodeList, checkClassName('baz bar')));
      });
    });
  });

});
