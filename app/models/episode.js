import EmberObject, { get, set } from "@ember/object";

export default EmberObject.extend({
  step() {
    const sound = get(this, 'sound');
    set(this, 'seek', Math.round(sound.seek()));

    if(sound.playing()) {
      requestAnimationFrame(this.step.bind(this));
    }
  }

});
