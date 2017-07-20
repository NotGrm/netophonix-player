import Service, { inject } from "@ember/service";
import { computed, getProperties } from "@ember/object";
import { isPresent } from "@ember/utils";
import { A } from "@ember/array";

export default Service.extend({
  audio: inject(),

  playlist: A(),
  index: 0,

  duration: computed.alias('audio.duration'),
  seek: computed.alias('audio.seek'),
  title: computed.alias('current.title'),
  playing: computed.alias('current.playing'),

  current: computed('index', 'playlist.[]', function() {
    const { playlist, index } = getProperties(this, 'playlist', 'index');
    return playlist.objectAt(index);
  }),

  play() {
    const audio = this.get('audio');
    const current = this.get('current');

    if (!current.get('playing')) {
      this.set('playing', true);
      audio.play(current);
    }
  },

  pause() {
    this.get('audio').pause();
    this.set('current.playing', false);
  },
});
