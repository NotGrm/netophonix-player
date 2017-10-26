import Component from '@ember/component';
import { inject } from '@ember/service';
import { get, computed } from '@ember/object';

const SagaTileComponent = Component.extend({
  tagName: 'article',
  classNames: ['saga-tile'],
  classNameBindings: ['colorClass'],

  router: inject(),

  colorClass: computed('color', function() {
    const color = get(this, 'color');

    if(color) {
      return `is-${color}`;
    }
    
    return `is-info`
  }),

  click() {
    get(this, 'router').transitionTo('sagas.show', get(this, 'saga'))
  }
});

SagaTileComponent.reopenClass({
  positionalParams: ['saga']
});

export default SagaTileComponent;