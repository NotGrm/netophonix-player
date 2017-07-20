import Component from "@ember/component";
import { inject } from "@ember/service";
import { computed, get, getProperties } from "@ember/object";
import { isEqual } from "@ember/utils";

export default Component.extend({
  playbackService: inject(),

  playing: computed.alias('playbackService.playing'),
  title: computed.alias('playbackService.title'),
  duration: computed.alias('playbackService.duration'),
  seek: computed.alias('playbackService.seek'),

  resume() {
    this.get('playbackService').play();
  },

  pause() {
    this.get('playbackService').pause();
  },

  skip(direction) {
    const { index, playing } = get(this, 'playbackService').getProperties('index', 'playing');
    const minIndex = 0;
    const maxIndex = get(this, 'playbackService.playlist.length') - 1;
      
    if(isEqual(direction, 'prev') && index > minIndex) {
      this.decrementProperty('playbackService.index');
    } 
    
    if(isEqual(direction, 'next') && index < maxIndex) {
      this.incrementProperty('playbackService.index');
    }

    if(playing) {
      get(this, 'playbackService').play();
    }
  }
});
