import { helper } from '@ember/component/helper';

export function formatTime(time) {
  let secs = Math.floor(time / 1000);
  let minutes = Math.floor(secs / 60) || 0;
  let seconds = (secs - minutes * 60) || 0;

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default helper(formatTime);
