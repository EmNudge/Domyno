/// gets key,value pairs from object
function* entries(obj: Object) {
  const keys = Object.keys(obj)
  for (const key of keys) {
    yield [key, obj[key]];
  }
}

export default entries;