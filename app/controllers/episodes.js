import Controller from "@ember/controller";
import { inject } from "@ember/service";
import { get } from "@ember/object";

export default Controller.extend({
  hifi: inject(),
  queue: inject(),

  actions: {
    play(index) {
      this.set('queue.tracks', this.get('model'));
      this.set('queue.index', index);

      const currentFile = get(this, 'queue.current.file');
      const hifi = get(this, 'hifi');

      hifi.play(currentFile);
    }
  }
});
