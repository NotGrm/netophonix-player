import { helper } from '@ember/component/helper';

export function capitalize([string]) {
  return string.capitalize()  
}

export default helper(capitalize);
