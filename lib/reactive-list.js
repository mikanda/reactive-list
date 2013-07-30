
/**
 * Module dependencies.
 */

var dom = require('dom')
  , object = require('object')
  , Emitter = require('emitter')
  , Index = require('./index-adapter');

/**
 * Module exports.
 *
 * @param {DOMElement} el the root element
 * @param {DOMElement} template the row template
 */

module.exports = ReactiveList;

/**
 * Initialize new view.
 */

function ReactiveList(el, template, view) {
  if (!(this instanceof ReactiveList)) {
    return new ReactiveList(el, template);
  }
  this.el = el;
  this.template = template;
  this.view = view;
  this.indices = [];
}

// inherit from emitter

Emitter(ReactiveList.prototype);

/**
 * Create and bind new element.  Can be overriden in subclasses.
 *
 * @param {Object} model
 * @param {Number} index
 */

ReactiveList.prototype.createElement = function(model, index){

  // create new node from html or element

  if (typeof this.template == 'string') {
    return dom(this.template);
  } else {
    return this.template.cloneNode(true);
  }
};

/**
 * Append a new row after `index` or at last if `null`.
 *
 * @param {Number} [index]
 */

ReactiveList.prototype.append = function(index, model, view){
  if (typeof index !== 'number') {

    // reorder arguments

    view = model;
    model = index;
    index = this.indices.length;
  } else {
    index += 1;
  }
  return this.insert(index, model, view);
};

/**
 * Insert a new node at `index`.
 *
 * @param {Number} [index] optional index to insert at
 * @param {Object|Model} model the model to bind
 * @param {Object} [view] optional view for reactive
 */

ReactiveList.prototype.insert = function(index, model, view){
  var adapter
    , refEl  // the referencing node before which we want to insert
    , el; // the newly created element

  // handle index as optional argument

  if (typeof index !== 'number') {

    // reorder arguments

    view = model;
    model = index;
    index = 0;
  } else if (index == null) {
    index = 0;
  }
  refEl = (this.indices[index] || {}).el;
  el = this.createElement();
  adapter = new Index(el, index, model, view || this.view);

  // insert the new object in the indices

  this.insertIndex(index, adapter);

  // update the indexes after the element

  this.incrementIndices(index);
  if (refEl) this.el.insertBefore(el, refEl);
  else {

    // insert at the beginning if we have an invalid index

    adapter.set(this.indices.length - 1);
    dom(this.el).append(el);
  }
  this.emit(
    'add',
    adapter.model.index(),
    adapter.model.model(),
    el
  );
};

/**
 * Insert the index-adapter `object` at `index`.
 *
 * @api private
 */

ReactiveList.prototype.insertIndex = function(index, adapter){
  this.indices.splice(index, 0, adapter);
};

/**
 * Increment all indices after `index`.
 *
 * @api private
 */

ReactiveList.prototype.incrementIndices = function(index){
  for (var i = (index + 1); i < this.indices.length; ++i) {
    this.indices[i].inc();
  }
};

/**
 * Remove the element at `index`.
 *
 * @param {Number} index
 * @return {Emitter} the model stored for `index`
 */

ReactiveList.prototype.remove = function(index){
  var object = this.indices[index];

  // first remove the element from the dom

  dom(object.el).remove();

  // and then remove it from the indices

  this.indices.splice(index, 1);

  // and decrement all following indices

  for (var i = index; i < this.indices.length; ++i) {
    this.indices[i].dec();
  }
  this.emit(
    'remove',
    object.model.index(),
    object.model.model(),
    object.el
  );
};
