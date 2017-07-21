import Service from "@ember/service";
import howler from 'npm:howler';
import { get, getProperties, set, observer } from "@ember/object";
import { isEqual, isPresent, isNone } from "@ember/utils";

export default Service.extend({
  mute: false,
  volume: 1,

  muteChanged: observer('mute', function() {
    const { sound, mute } = getProperties(this, 'sound', 'mute');
    sound.mute(mute);
  }),

  volumeChanged: observer('volume', function() {
    const { sound, volume } = getProperties(this, 'sound', 'volume');
    sound.volume(volume)
  }),

  initSound(track) {
    const file = get(track, 'file');

    let sound = new howler.Howl({
      src: file,
      mute: get(this, 'mute'),
      volume: get(this, 'volume'),
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
