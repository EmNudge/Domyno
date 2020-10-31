'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/// returns true if item found in iterable
function contains(iter, itemToFind) {
    for (const item of iter) {
        const isItem = typeof itemToFind === 'function'
            ? itemToFind(item)
            : itemToFind === item;
        if (isItem)
            return true;
    }
    return false;
}

function every(iter, func = (item) => Boolean(item)) {
    for (const item of iter) {
        if (!func(item))
            return false;
    }
    return true;
}

function some(iter, func = (item) => Boolean(item)) {
    for (const item of iter) {
        if (func(item))
            return true;
    }
    return false;
}

/// returns item if it is found in iterable and null if it isn't
function find(iter, itemToFind) {
    for (const item of iter) {
        const isItem = typeof itemToFind === 'function'
            ? itemToFind(item)
            : itemToFind === item;
        if (isItem)
            return item;
    }
    return null;
}

/// returns index along with item in a given iterable
function* enumerate(iter) {
    let index = 0;
    for (const item of iter) {
        yield [index, item];
        index++;
    }
}

/// flattens an iterator of iterators. Only flattens one level.
function* flat(iter) {
    for (const nestedIter of iter) {
        for (const item of nestedIter) {
            yield item;
        }
    }
}

/// return new iterable with valus missing that don't pass the filter function
function* filter(iter, filterFunc) {
    for (const [index, item] of enumerate(iter)) {
        if (!filterFunc(item, index))
            continue;
        yield item;
    }
}

/// return new iterable with each function applied
function* map(iter, mapFunc) {
    for (const [index, item] of enumerate(iter)) {
        yield mapFunc(item, index);
    }
}

/// maps and then flattens. A copy of Array.prototype.flatMap, but specifically iterables
function* flatMap(iter, mapFunc) {
    yield* flat(map(iter, mapFunc));
}

/// a debugging function which doesn't affect the function
function* tap(iter, tapFunc) {
    yield* map(iter, item => {
        console.log(item);
        return item;
    });
}

/// makes an infinite iterable from given iterable
/// DO NOT SPREAD THIS! THIS IS INFINITE!
function* cycle(iter) {
    while (true) {
        for (const item of iter) {
            yield item;
        }
    }
}

/// splits iterable into chunks of size chunkSize
function* chunk(iter, chunkSize) {
    const arr = [];
    for (const item of iter) {
        if (arr.length === chunkSize) {
            yield arr;
            arr.length = 0;
        }
        arr.push(item);
    }
    // yield the last remaining elements
    if (arr.length)
        yield arr;
}

/// takes first n elements from an iter
function* take(iter, until) {
    for (const [index, item] of enumerate(iter)) {
        if (index === until)
            return;
        yield item;
    }
}

/// Like filtering, but stopping execution when reaching a false value
function* takeWhile(iter, boolFunc) {
    for (const [index, item] of enumerate(iter)) {
        if (!boolFunc(item, index))
            return;
        yield item;
    }
}

/// mimics Array.prototype.slice
function* slice(iter, begin, end) {
    for (const [index, item] of enumerate(iter)) {
        if (index < begin)
            continue;
        if (end && end > end)
            continue;
        yield item;
    }
}

/// gets the nth element of an array. Has O(n) algorithmic complexity
function nth(iter, index) {
    if (index < 0)
        throw new Error('index for nth cannot be negative');
    for (const [i, item] of enumerate(iter)) {
        if (index == i)
            return item;
    }
    return null;
}

/// splits iterable into 2 chunks based on result of the boolean function
function partition(iter, partFunc) {
    const arr1 = [];
    const arr2 = [];
    for (const item of iter) {
        if (partFunc(item)) {
            arr1.push(item);
        }
        else {
            arr2.push(item);
        }
    }
    return [arr1, arr2];
}

/// return new iterable with valus missing that don't pass the filter function
function reduce(iter, initialVal, reduceFunc) {
    let accum = initialVal;
    for (const item of iter) {
        accum = reduceFunc(accum, item);
    }
    return accum;
}

/// splits iterable into 2 chunks based on result of the boolean function
function tail(iter) {
    let value = null;
    for (const item of iter)
        value = item;
    return value;
}

/// splits iterable into 2 arrays by reversing a zip
function unzip(iter) {
    const arr1 = [];
    const arr2 = [];
    for (const [item1, item2] of iter) {
        arr1.push(item1);
        arr2.push(item2);
    }
    return [arr1, arr2];
}

// utility function for use in pipes when normal spread is difficult
const collect = (iter) => [...iter];

// generic pipe utility command
function pipe(...funcs) {
    return (val) => funcs.reduce((accum, curr) => curr(accum), val);
}

/// chains iterables, one after the other. The code is identical to flatten.
function* chain(...iters) {
    yield* flat(iters);
}

function* zip(...iters) {
    // Using raw iterator protocol since for loops can be frustrating
    const rawIters = iters.map((iter) => iter[Symbol.iterator]());
    // values gained from rawIters
    let items = rawIters.map((iter) => iter.next());
    // while no item is done i.e. it has more output
    while (items.every((item) => !item.done)) {
        yield items.map((item) => item.value);
        // moving iterators down to the next element
        items = rawIters.map((iter) => iter.next());
    }
}

/// gets key,value pairs from object
function* entries(obj) {
    const keys = Object.keys(obj);
    for (const key of keys) {
        yield [key, obj[key]];
    }
}

exports.chain = chain;
exports.chunk = chunk;
exports.collect = collect;
exports.contains = contains;
exports.cycle = cycle;
exports.entries = entries;
exports.enumerate = enumerate;
exports.every = every;
exports.filter = filter;
exports.find = find;
exports.flat = flat;
exports.flatMap = flatMap;
exports.map = map;
exports.nth = nth;
exports.partition = partition;
exports.pipe = pipe;
exports.reduce = reduce;
exports.slice = slice;
exports.some = some;
exports.tail = tail;
exports.take = take;
exports.takeWhile = takeWhile;
exports.tap = tap;
exports.unzip = unzip;
exports.zip = zip;