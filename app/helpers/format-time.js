import Ember from 'ember';

export function formatTime(secs) {
  let minutes = Math.floor(secs / 60) || 0;
  let seconds = (secs - minutes * 60) || 0;

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default Ember.Helper.helper(formatTime);
