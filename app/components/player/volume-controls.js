import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['field', 'is-grouped', 'player__volume'],
  isHovered: false,

  mouseEnter() {
    this.set('isHovered', true);
  },

  mouseLeave() {
    this.set('isHovered', false);
  }
});
