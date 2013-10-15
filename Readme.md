
# classes

  Cross-browser element class manipulation, utilizing the native `.classList` when possible. This is not designed to be a `.classList` polyfill.

## Installation

```
$ component install nk-components/dom-classes
```

## Example

```js
var classes = require('dom-classes');
classes(el)
  .add('foo')
  .toggle('bar')
  .remove(/^item-\d+/);
 
classes(document.querySelectorAll('div'))
   .add('hidden');
```

## API

### .add(class)

  Add `class`.

### .remove(class)

  Remove `class` name or all classes matching the given regular expression.

### .toggle(class)

  Toggle `class`.

### .swap(oldClass, newClass)

Swap `oldClass` for `newClass`.

### .has(class)

  Check if `class` is present.

### .array()

  Return an array of classes.

## License

  MIT
