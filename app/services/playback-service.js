import Service, { inject } from "@ember/service";
import { computed, get, getProperties } from "@ember/object";
import { isEqual } from "@ember/utils";

export default Service.extend({
  audio: inject(),

  playlist: [],
  index: 0,

  seek: computed.alias('current.seek'),
  duration: computed.alias('current.duration'),
  title: computed.alias('current.title'),
  playing: computed.alias('current.playing'),

  current: computed('index', 'playlist.[]', function() {
    const { playlist, index } = getProperties(this, 'playlist', 'index');
    return playlist.objectAt(index);
  }),

  play() {
    const { audio, current } = getProperties(this, 'audio', 'current');

    if (!get(current, 'playing')) {
      audio.play(current);
    }
  },

  pause() {
    get(this, 'audio').pause();
  },

  skip(direction) {
    if(isEqual(direction, 'prev')) {
      this.decrementProperty('index');
    } else {
      this.incrementProperty('index');
    } 

    this.play();
  }
});
