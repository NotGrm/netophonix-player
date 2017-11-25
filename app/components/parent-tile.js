import Component from '@ember/component';
import { computed, get, getProperties } from '@ember/object';

const ParentTileComponent = Component.extend({
  classNames: ['tile', 'is-parent'],
  classNameBindings: ['vertical:is-vertical', 'sizeClass'],

  sizeClass: computed('size', function() {
    const size = get(this, 'size');

    if(size) {
      return `is-${size}`;
    }

    return '';
  }),

  objects: computed('array', 'indices', function() {
    const {array, indices} = getProperties(this, 'array', 'indices');

    if(Number.isInteger(indices)) {
      return array.objectAt(indices);
    } else {
      return indices.map(i => {
        return array.objectAt(i);
      })
    }
  })
});

ParentTileComponent.reopenClass({
  positionalParams: ['array']
});

export default ParentTileComponent;
