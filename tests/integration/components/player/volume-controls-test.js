import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player/volume-controls', 'Integration | Component | player/volume controls', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{player/volume-controls}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#player/volume-controls}}
      template block text
    {{/player/volume-controls}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
