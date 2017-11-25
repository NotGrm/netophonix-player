import Component from '@ember/component';
import { inject } from '@ember/service';
import { get } from '@ember/object';

const SagaTileComponent = Component.extend({
  tagName: 'article',
  classNames: ['tile', 'is-child', 'notification', 'is-info'],

  router: inject(),

  click() {
    get(this, 'router').transitionTo('sagas.show', get(this, 'saga'))
  }
});

SagaTileComponent.reopenClass({
  positionalParams: ['saga']
});

export default SagaTileComponent;