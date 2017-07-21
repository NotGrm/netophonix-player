import Ember from 'ember';

export function formatIndex(index) {
  console.log(index)
  return Number(index) + 1;
}

export default Ember.Helper.helper(formatIndex);
