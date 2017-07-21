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
    get(this, 'playbackService').play();
  },

  pause() {
    get(this, 'playbackService').pause();
  },

  skip(direction) {
    const playbackService = get(this, 'playbackService');
    const { index, playing } = getProperties(playbackService, 'index', 'playing');
    
    const minIndex = 0;
    const maxIndex = get(playbackService, 'playlist.length') - 1;
      
    if(isEqual(direction, 'prev') && index > minIndex) {
      playbackService.decrementProperty('index');
    } 
    
    if(isEqual(direction, 'next') && index < maxIndex) {
      playbackService.incrementProperty('index');
    }

    if(playing) {
      playbackService.play();
    }
  }
});
