import Service, { inject } from "@ember/service";
import { computed, get, getProperties } from "@ember/object";
import { isEqual } from "@ember/utils";

export default Service.extend({
  hifi: inject(),

  playlist: [],
  index: 0,

  mute: computed.alias('hifi.isMuted'),
  volume: computed.alias('hifi.volume'),
  position: computed.alias('hifi.position'),
  duration: computed.alias('hifi.duration'),
  playing: computed.alias('hifi.isPlaying'),
  percentLoaded: computed.alias('hifi.percentLoaded'),
  
  title: computed.alias('current.title'),

  current: computed('index', 'playlist.[]', function() {
    const { playlist, index } = getProperties(this, 'playlist', 'index');
    return playlist.objectAt(index);
  }),

  play() {
    const { hifi, current } = getProperties(this, 'hifi', 'current');
    hifi.play(get(current, 'file'));
  },

  pause() {
    get(this, 'hifi').pause();
  },

  toggleMute() {
    get(this, 'hifi').toggleMute();
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
