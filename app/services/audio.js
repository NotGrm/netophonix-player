import Service from "@ember/service";
import howler from 'npm:howler';
import { get, set } from "@ember/object";
import { isEqual, isPresent, isNone } from "@ember/utils";

export default Service.extend({
  init() {
    this._super(...arguments);
  },

  initSound(file) {
    let sound = new howler.Howl({
      src: file,
      onplay: () => {
        this.set('duration', Math.round(sound.duration()));
        requestAnimationFrame(this.step.bind(this));
      },
    });

    return sound;
  },

  play(track) {
    const trackFile = get(track, 'file');
    
    if(isNone(get(track, 'sound'))) {
      set(track, 'sound', this.initSound(trackFile));
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

  step() {
    const sound = get(this, 'sound');
    this.set('seek', Math.round(sound.seek()));

    if(sound.playing()) {
      requestAnimationFrame(this.step.bind(this));
    }
  }
});
