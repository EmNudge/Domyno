import { chunk as _chunk } from "../../regular";

/// splits iterable into chunks of size chunkSize
export function chunk<T>(chunkSize: number) {
    return (iter:Iterable<T>) => _chunk(iter, chunkSize)
}

export default chunk;
