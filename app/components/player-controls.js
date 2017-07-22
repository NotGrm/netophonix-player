import Component from "@ember/component";
import { inject } from "@ember/service";
import { computed, get } from "@ember/object";

export default Component.extend({
  playbackService: inject(),

  current: computed.alias('playbackService.current'),
  title: computed.alias('current.title'),

  resume() {
    get(this, 'playbackService').play();
  },

  pause() {
    get(this, 'playbackService').pause();
  },

  mute() {
    get(this, 'playbackService').toggleMute();
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
  },
});
