import Controller from "@ember/controller";
import { inject } from "@ember/service";

export default Controller.extend({
  audio: inject(),

  actions: {
    play() {
      this.get('audio').play();
    },
    stop() {
      this.get('audio').stop();
    }
  }
});
