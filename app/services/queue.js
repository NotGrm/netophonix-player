import Ember from 'ember';
import { computed, get, getProperties } from "@ember/object";

export default Ember.Service.extend({
  tracks: [],
  index: 0,

  current: computed('index', 'tracks.[]', function() {
    const { tracks, index } = getProperties(this, 'tracks', 'index');
    return tracks.objectAt(index);
  }),

  hasPrevious: computed('index', 'tracks.[]', function() {
    const index = get(this, 'index');
    return index > 0;
  }),

  hasNext: computed('index', 'tracks.[]', function() {
    const { tracks, index } = getProperties(this, 'tracks', 'index');
    return index < tracks.length - 1;
  })
});
