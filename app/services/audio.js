import Service from "@ember/service";
import howler from 'npm:howler';
import { get, getProperties, set } from "@ember/object";
import { isPresent, isNone, tryInvoke } from "@ember/utils";

export default Service.extend({
  init() {
    this._super(...arguments);
  },

  play(episode) {
    if(isNone(episode)) {
      return;
    }

    let { sound, file } = getProperties(episode, 'sound', 'file');
    
    if(isNone(sound)) {
      sound = new howler.Howl({
        src: file,
        onplay: () => {
          this.set('duration', Math.round(sound.duration()));
        },
      });

      set(episode, 'sound', sound);
    }

    sound.play();
    set(this, 'sound', sound);
  },

  pause() {
    get(this, 'sound').pause();
  },

  stop() {
    tryInvoke(get(this, 'sound'), 'stop');
  }
});
