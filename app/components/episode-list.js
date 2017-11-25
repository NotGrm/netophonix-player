import { resolve } from 'rsvp';
import Component from '@ember/component';
import { inject } from "@ember/service";
import { get, getProperties, set } from "@ember/object";

export default Component.extend({
  classNames: ['content'],

  hifi: inject(),
  queue: inject(),

  episodes: [],

  play(index) {
    const { episodes, hifi, queue } = getProperties(this, 'episodes', 'hifi', 'queue');

    resolve(episodes).then(tracks => {
      set(queue, 'tracks', tracks);
      set(queue, 'index', index);

      hifi.play(get(queue, 'current.src'));
    })
  }
});
