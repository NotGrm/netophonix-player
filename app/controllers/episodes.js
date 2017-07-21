import Controller from "@ember/controller";
import { inject } from "@ember/service";

export default Controller.extend({
  playbackService: inject(),

  actions: {
    play(index) {
      this.set('playbackService.playlist', this.get('model'));
      this.set('playbackService.index', index);
      this.get('playbackService').play();
    }
  }
});
