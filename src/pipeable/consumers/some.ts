import { some as _some } from "../../regular";

export function some<T>(func: HigherOrderFn<T, boolean> = (item) => Boolean(item)) {
    return (iter: Iterable<T>) => _some(iter,func)
}

export default some;
