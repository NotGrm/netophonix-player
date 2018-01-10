import DS from 'ember-data';
import {alias} from '@ember/object/computed';

export default DS.Model.extend({
  name: DS.attr('string'),
  synopsis: DS.attr('string'),
  website: DS.attr('string'),
  status: DS.attr('string'),
  createdAt: DS.attr('date'),
  genre: DS.attr('string'),

  episodes: DS.hasMany('episode'),

  firstEpisodeReleadeDate: alias('episodes.firstObject.createdAt'),
  lastEpisodeReleadeDate: alias('episodes.lastObject.createdAt'),
});
