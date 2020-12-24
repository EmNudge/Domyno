import { every as _every } from "../../regular";

export function every<T>(func: HigherOrderFn<T, boolean> = (item) => Boolean(item)) {
    return (iter: Iterable<T>) => _every(iter,func)
}

export default every;
