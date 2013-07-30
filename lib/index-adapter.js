
/**
 * Module dependencies.
 */

var reactive = require('reactive')
  , Model = require('./model-wrapper');

/**
 * Module exports.
 */

module.exports = Index;

/**
 * Adapter to handle index changes on a model.
 *
 * @param {DOMElement} el the which is referenced by this index
 * @param {Number} value
 * @param {Emitter} model model used when binding reactive
 * @param {Object} [view] optional view for reactive
 */

function Index(el, value, model, view) {
  if (model == null) {
    model = {};
  }
  this.el = el;
  this.model = new Model(model, value);

  // bind the element

  reactive(el, this.model, view);
}

/**
 * Set the index.
 */

Index.prototype.set = function(value){
  this.model.index(value);
};

/**
 * Increment the index.
 */

Index.prototype.inc = function(value){
  var index = this.model.index();
  this.model.index(index + (value || 1));
};

/**
 * Decrement the index.
 */

Index.prototype.dec = function(value){
  var index = this.model.index();
  this.model.index(index - (value || 1));
};
