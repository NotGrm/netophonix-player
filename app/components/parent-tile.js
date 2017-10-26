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

  objects: computed('array', 'index', function() {
    const {array, index} = getProperties(this, 'array', 'index');

    if(Number.isInteger(index)) {
      return array.objectAt(index);
    } else {
      return index.map(i => {
        return array.objectAt(i);
      })
    }
  })
});

ParentTileComponent.reopenClass({
  positionalParams: ['array', 'index']
});

export default ParentTileComponent;
