import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  src: DS.attr('string'),
  createdAt: DS.attr('date'),
  saga: DS.belongsTo('saga'),
});
