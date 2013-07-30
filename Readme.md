
# reactive-list

  List controller build on top of component/reactive.

## Installation

  Install with [component(1)](http://component.io):

    $ component install mikanda/reactive-list

## API

### Events

  * `add(index, model, el)` - Fired when an element was added.  `model`
    is the model associated with the element.  `el` is the
    `DOMElement` which was removed.
  * `remove(index, model, el)` - Fired when an element was removed.

### ReactiveList(el, template, view)

  Initialize the widget.

   * `el` is the container element to use
   * `template` is the
     [component/reactive](http://github.com/component/reactive) template
     used to generate the rows
   * `view` is the optional view passed to reactive per default

#### .insert([index], [model])

  Insert a new sub-widget.  If `index` is given replace the element at
  `index` otherwise insert at index 0.  Returns the newly created
  `DOMElement`.  `model` is an optional model to bind with reactive.

#### .append([index], [model])

  Append a new sub-widget.  If `index` is given append after the
  element at `index`.  Returns the newly created `DOMElement`.
  `model` is the same as in `.insert()`.

#### .remove(index)

  Remove the element at `index`.  Returns the model stored at `index`.

## License

  MIT
