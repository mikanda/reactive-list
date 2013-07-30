
/**
 * Module dependencies.
 */

var chai = require('chai')
  , domify = require('domify')
  , dom = require('dom')
  , query = require('query')
  , ReactiveList = require('reactive-list')
  , should = chai.should()
  , spy = sinon.spy;

/**
 * Tests.
 */

describe('ReactiveList', function(){
  var rows
    , template
    , root
    , onAdd
    , onRemove;
  before(function(){
    root = domify('<ul></ul>');
    template = domify('<span data-index="{index}"></span>');
    rows = ReactiveList(root, template);
    onAdd = spy();
    onRemove = spy();

    // make the emit synchronous

    rows.emit = function(event){
      switch (event) {
      case 'add':
        return onAdd.apply(null, [].splice.call(arguments, 1));
      case 'remove':
        return onRemove.apply(null, [].splice.call(arguments, 1));
      }
    };
  });
  describe('#append', function(){
    it('should append a row', function(){
      rows.append({ name: 'Test Name' });
      onAdd.calledOnce.should.be.true;
      dom(onAdd.args[0][2]).attr('data-index').should.equal('0');
      onAdd.args[0][0].should.equal(0);
      onAdd.args[0][1].name.should.equal('Test Name');
      dom(query('span', root)).attr('data-index').should.equal('0');
    });
    it('should append a row after the first', function(){
      var spans;
      rows.append();
      onAdd.calledTwice.should.be.true;
      rows.template = domify(
        '<span class="test" data-index="{index}"></span>'
      );
      rows.append(0);
      onAdd.calledThrice.should.be.true;
      dom(onAdd.args[2][2]).attr('data-index').should.equal('1');
      spans = query.all('span', root);
      spans.length.should.equal(3);
      dom(spans[1]).attr('data-index').should.equal('1');
      dom(spans[1]).attr('class').should.equal('test');
    });
  });
  describe('#remove', function(){
    it('should remove the third row', function(){
      var spans;
      rows.remove(2);
      spans = query.all('span', root);
      spans.length.should.equal(2);
      dom(spans[1]).attr('class').should.equal('test');
      onRemove.calledOnce.should.be.true;
      onRemove.args[0][0].should.equal(2);
      dom(onRemove.args[0][2]).attr('data-index').should.equal('2');
    });
    it('should remove another row', function(){
      var el;
      rows.append({ name: 'test' });
      rows.remove(2);
      onRemove.calledTwice.should.be.true;
      dom(onRemove.args[1][2]).attr('data-index').should.equal('2');
      onRemove.args[1][0].should.equal(2);
      onRemove.args[1][1].name.should.equal('test');
    });
  });
});
