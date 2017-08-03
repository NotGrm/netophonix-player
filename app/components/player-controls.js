import { oneWay, alias } from '@ember/object/computed';
import Component from "@ember/component";
import { inject } from "@ember/service";
import { computed, get, getProperties } from "@ember/object";

export default Component.extend({
  classNames: ['player'],

  hifi: inject(),
  queue: inject(),

  showQueue: false,

  current: oneWay('queue.current'),
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
});
