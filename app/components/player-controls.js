import Component from "@ember/component";
import { inject } from "@ember/service";
import { computed } from "@ember/object";

export default Component.extend({
  playbackService: inject(),

  playing: computed.alias('playbackService.playing'),
  title: computed.alias('playbackService.title'),
  duration: computed.alias('playbackService.duration'),

  resume() {
    let currentTrack = this.get('playbackService.currentTrack');
    this.get('playbackService').play(currentTrack);
  },

  pause() {
    this.get('playbackService').pause();
  },
});
