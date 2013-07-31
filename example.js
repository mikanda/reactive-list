
/**
 * Module dependencies.
 */

var query = require('query')
  , dom = require('dom')
  , domify = require('domify')
  , Model = require('model')
  , dynamicRows = require('reactive-list');

var template = domify([
  '<tr data-index="{index}">',
  '  <td>',
  '    <span>At {index}</span>',
  '    <input type="text" value="{name}">',
  '    <input class="add" type="button" value="+">',
  '    <input class="remove" type="button" value="-">',
  '  </td>',
  '</tr>'
].join('\n'));
var User = Model('user').attr('name');
var model = new User({ name: 'Test value' });
var rows = dynamicRows(query('#rows'), template);

// remove button

rows.on('add', function(index, model, el){
  query('.add', el).onclick = function(){

    // the index needs to be recalculated since it could have been changed

    var index = parseInt(dom(el).attr('data-index'));

    // append after the current element

    rows.append(index, model);
  };
  query('.remove', el).onclick = function(){

    // the index needs to be recalculated since it could have been changed

    var index = parseInt(dom(el).attr('data-index'));

    // remove the current element

    rows.remove(index);
  };
});

/**
 * Register click events for buttons
 */

// add new entry

query('#add').onclick = function(){
  var index = parseInt(query('#indexValue').value)
    , el;
  if (Number.isNaN(index)) return rows.append(model);
  rows.insert(index, model);
};

// remove entry

query('#remove').onclick = function(){
  var index = parseInt(query('#indexValue').value);
  if (Number.isNaN(index)) return;
  rows.remove(index);
};
query('#change-value').onclick = function(){
  var value = query('#new-value').value;
  model.name(value);
};
