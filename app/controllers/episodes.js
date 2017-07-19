import Controller from "@ember/controller";
import { inject } from "@ember/service";

export default Controller.extend({
  playbackService: inject(),

  actions: {
    play(episode) {
      this.get('playbackService').play(episode);
    }
  }
});
