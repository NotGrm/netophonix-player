import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  synopsis: DS.attr('string'),
  website: DS.attr('string'),
  status: DS.attr('string'),
  createdAt: DS.attr('date'),
  genre: DS.attr('string')
});
