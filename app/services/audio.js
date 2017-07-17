import Service from "@ember/service";
import howler from 'npm:howler';

export default Service.extend({
  init() {
    this._super(...arguments);

    let howl = new howler.Howl({
      src: ['/adoprixtoxis/01-LE_NAUFRAGE.mp3']
    });

    this.set('howl', howl);
  },

  play() {
    let howl = this.get('howl');
    howl.play();
  },

  stop() {
    let howl = this.get('howl');
    howl.stop();
  }
});
