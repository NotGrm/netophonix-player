import Component from "@ember/component";
import { inject } from "@ember/service";
import { computed, get, getProperties } from "@ember/object";

export default Component.extend({
  classNames: ['player'],

  hifi: inject(),
  queue: inject(),

  showQueue: false,

  current: computed.oneWay('queue.current'),
  title: computed.alias('current.title'),

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

    let file = get(this, 'current.file');

    this.get('hifi').load(file).then(({sound}) => {
      sound.play({
        position: 0
      });
    });
  },
});
