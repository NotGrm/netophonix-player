import Route from "@ember/routing/route";
import { A } from "@ember/array";

import Episode from 'netophonix-player/models/episode';

export default Route.extend({
  model() {
    return A([
      new Episode({
        title: 'Le Naufrage',
        file: '/adoprixtoxis/01-LE_NAUFRAGE.mp3'
      }),
      new Episode({
        title: 'Rencontre du 3e type',
        file: '/adoprixtoxis/02-RENCONTRE_DU_3e_TYPE.mp3'
      })
    ])
  }
});
