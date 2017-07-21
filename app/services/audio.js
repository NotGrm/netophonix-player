import Service from "@ember/service";
import howler from 'npm:howler';
import { get, set } from "@ember/object";
import { isEqual, isPresent, isNone } from "@ember/utils";

export default Service.extend({
  init() {
    this._super(...arguments);
  },

  initSound(track) {
    const file = get(track, 'file');

    let sound = new howler.Howl({
      src: file,
      onplay: () => {
        set(track, 'playing', true);
        set(track, 'duration', Math.round(sound.duration()));
        requestAnimationFrame(track.step.bind(track));
      },
      onpause: () => {
        set(track, 'playing', false);
      },
      onstop: () => {
        set(track, 'playing', false);
      }
    });

    return sound;
  },

  play(track) {   
    if(isNone(get(track, 'sound'))) {
      set(track, 'sound', this.initSound(track));
    } 

    const currentSound = get(this, 'sound');
    const trackSound = get(track, 'sound');

    if(isPresent(currentSound) && !isEqual(currentSound, trackSound)) {
      currentSound.stop();
    }

    set(this, 'sound', trackSound).play();
  },

  pause() {
    get(this, 'sound').pause();
  },
});
