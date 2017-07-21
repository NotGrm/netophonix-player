
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('format-index', 'helper:format-index', {
  integration: true
});

// Replace this with your real tests.
test('it increments index', function(assert) {
  this.set('index', '1234');
  this.render(hbs`{{format-index index}}`);
  assert.equal(this.$().text().trim(), '1235');
});

