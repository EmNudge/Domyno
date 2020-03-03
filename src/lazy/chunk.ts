/// splits iterable into chunks of size chunkSize
function chunk<T>(chunkSize: number) {
  return function*(iter: Iterable<T>): Iterable<Iterable<T>> {
    const arr = [];
  
    for (const item of iter) {
      if (arr.length === chunkSize) {
        yield arr;
        arr.length = 0;
      }
  
      arr.push(item);
    }
  
    // yield the last remaining elements
    if (arr.length)	yield arr;
  }
}

export default chunk;