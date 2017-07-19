import Service from "@ember/service";
import { inject } from "@ember/service";
import { computed } from "@ember/object";
import { isPresent } from "@ember/utils";

export default Service.extend({
  audio: inject(),

  duration: computed.alias('audio.duration'),
  title: computed.alias('current.title'),
  playing: computed.alias('current.playing'),

  play(episode) {
    const audio = this.get('audio');
    const current = this.get('current');
    episode = episode || current;
    this.select(episode)
    if (!episode.get('playing')) {
      this.set('playing', true);
      audio.play(episode);
    }
  },

  select(episode) {
    const audio = this.get('audio');
    const current = this.get('current');

    if (episode !== current) {
      audio.stop();
      
      if(isPresent(current)) {
        current.set('playing', false);
      }

      this.set('current', episode);
    }
  },

  pause() {
    this.get('audio').pause();
    this.set('current.playing', false);
  },
});
