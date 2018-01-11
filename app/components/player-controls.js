import { oneWay, alias, none } from '@ember/object/computed';
import Component from "@ember/component";
import { inject } from "@ember/service";
import { computed, get, getProperties, set } from "@ember/object";

export default Component.extend({
  tagName: 'footer',
  classNames: ['box', 'player'],
  classNameBindings: ['hasNoCurrent:is-invisible'],

  hifi: inject(),
  queue: inject(),

  showQueue: false,

  current: oneWay('queue.current'),
  hasNoCurrent: none('current'),
  title: alias('current.title'),

  progression: computed('hifi.position', 'hifi.duration', function() {
    const position = get(this, 'hifi.position');
    const duration = get(this, 'hifi.duration');
    if(position === undefined || duration === undefined) {
      return 0;
    } else {
      return Math.floor(position * 100 / duration);
    }
  }),

  togglePause() {
    get(this, 'hifi').togglePause();
  },

  play() {
    get(this, 'hifi').togglePause();
  },

  pause() {
    get(this, 'hifi').togglePause();
  },

  toggleMute() {
    get(this, 'hifi').toggleMute();
  },

  toggleQueue() {
    this.toggleProperty('showQueue');
  },

  hideQueue() {
    this.set('showQueue', false);
  },

  skip(direction) {
    const queue = get(this, 'queue');
    const { hasPrevious, hasNext } = getProperties(queue, 'hasPrevious', 'hasNext');

    if(hasPrevious && direction == 'prev') {
      this.decrementProperty('queue.index');
    } else if(hasNext && direction == 'next') {
      this.incrementProperty('queue.index');
    }

    let file = get(this, 'current.src');

    this.get('hifi').load(file).then(({sound}) => {
      sound.play({
        position: 0
      });
    });
  },

  skipTo(index) {
    const queue = get(this, 'queue');

    set(queue, 'index', index);

    let file = get(queue, 'current.file');

    this.get('hifi').load(file).then(({sound}) => {
      sound.play({
        position: 0
      });
    });

  }
});
