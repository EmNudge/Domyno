import type { hofFunc } from '../..';

function every<T>(func: hofFunc<T, boolean> = (item) => Boolean(item)) {
    return (iter: Iterable<T>): boolean => {
        for (const item of iter) {
            if (!func(item)) return false;
        }
    
        return true;
    }
}

export default every;