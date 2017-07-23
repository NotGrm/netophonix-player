import Component from "@ember/component";
import { inject } from "@ember/service";
import { computed, get, getProperties } from "@ember/object";

export default Component.extend({
  hifi: inject(),
  queue: inject(),

  current: computed.oneWay('queue.current'),
  title: computed.alias('current.title'),

  play() {
    get(this, 'hifi').togglePause();
  },

  pause() {
    get(this, 'hifi').togglePause();
  },

  mute() {
    get(this, 'hifi').toggleMute();
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
