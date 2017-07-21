import Component from "@ember/component";
import { inject } from "@ember/service";
import { computed, get, getProperties } from "@ember/object";
import { isEqual } from "@ember/utils";

export default Component.extend({
  playbackService: inject(),

  current: computed.alias('playbackService.current'),
  playing: computed.alias('current.playing'),
  title: computed.alias('current.title'),
  duration: computed.alias('current.duration'),
  seek: computed.alias('current.seek'),

  resume() {
    get(this, 'playbackService').play();
  },

  pause() {
    get(this, 'playbackService').pause();
  },

  skip(direction) {
    const playbackService = get(this, 'playbackService');
    const index = get(playbackService, 'index');
    const playlistSize = get(playbackService, 'playlist.length');
    
    let canGoPrev = 0 < index && direction == 'prev'
    let canGoNext = index < playlistSize - 1 && direction == 'next'

    if(canGoPrev || canGoNext) {
      playbackService.skip(direction);
    }
  }
});
