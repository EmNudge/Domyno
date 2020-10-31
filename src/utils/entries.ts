interface Indexable {
    [key: string]: any;
}

/// gets key,value pairs from object
function* entries(obj: Indexable) {
    const keys = Object.keys(obj);

    for (const key of keys) {
        yield [key, obj[key]];
    }
}

export default entries;