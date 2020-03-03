import { hofFunc } from '../index.d';

function some<T>(func: hofFunc<T, boolean> = (item) => Boolean(item)) {
  return (iter: Iterable<T>): boolean => {
    for (const item of iter) {
      if (func(item)) return true;
    }
  
    return false;
  }
}

export default some;