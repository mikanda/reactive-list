
/**
 * Module dependencies.
 */

var Emitter = require('emitter');

/**
 * Module exports.
 */

module.exports = Model;

/**
 * Wrap a given `model` and extend it with an index.
 */

function Model(model, index) {
  var properModel;
  if (typeof model.emit !== 'function') {

    // make sure we have an emitter as model

    properModel = new Emitter({});
    properModel.__proto__ = model;
  } else {

    // otherwise use the model directly

    properModel = model;
  }
  this.__proto__ = properModel;
  this._index = index;
  for (var key in proto) this[key] = proto[key];
}

/**
 * The prototype to override the model.
 */

var proto = {

  /**
   * Accessor/mutator for the index.
   */

  index: function(value){
    if (value == null) {
      return this._index;
    } else {
      this._index = value;
      this.emit('change index', value);
    }
  },

  /**
   * Return the wrapped model.
   */

  model: function(){
    return this.__proto__;
  }
};
