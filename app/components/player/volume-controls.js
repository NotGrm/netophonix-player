import Component from '@ember/component';

export default Component.extend({
  classNames: ['field', 'is-grouped', 'player__volume'],
  isHovered: false,

  mouseEnter() {
    this.set('isHovered', true);
  },

  mouseLeave() {
    this.set('isHovered', false);
  }
});
