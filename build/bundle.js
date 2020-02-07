'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function some(iter, func = (item) => Boolean(item)) {
    for (const item of iter) {
        if (func(item))
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
/// return new iterable with valus missing that don't pass the filter function
function reduce(iter, initialVal, reduceFunc) {
    let accum = initialVal;
    for (const item of iter) {
        accum = reduceFunc(accum, item);
    }
    return accum;
}

/// return new iterable with each function applied
function* map(iter, mapFunc) {
    for (const item of iter) {
        yield mapFunc(item);
    }
}
/// return new iterable with valus missing that don't pass the filter function
function* filter(iter, filterFunc) {
    for (const item of iter) {
        if (!filterFunc(item))
            continue;
        yield item;
    }
}

/// allows non-array iterables to have a comparable `.entries()` method
/// returns index along with item in a given iterable
function* entries(iter) {
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
/// maps and then flattens. A copy of Array.prototype.flatMap, but specifically iterables
function* flatMap(iter, mapFunc) {
    yield* flat(map(iter, mapFunc));
}

/// basic utility function to combine 2 Iterables. It exits when one runs out of output,
/// regardless of the state of the other one.
function* zip(...iters) {
    // Using raw iterator protocol since for loops can be frustrating
    const rawIters = iters.map((iter) => iter[Symbol.iterator]());
    // values gained from rawIters
    const items = rawIters.map((iter) => iter.next());
    // while no item is done i.e. it has more output
    while (items.every((item) => !item.done)) {
        yield items.map((item) => item.value);
        // moving iterators down to the next element
        for (let i = 0; i < items.length; i++) {
            items[i] = rawIters[i].next();
        }
    }
}
/// allows iterating through structures that are deeply nested, such as Linked Lists
/// atm it's rather messy since there isn't a good way to write this out with generics,
/// so a hand-made one, specific for a situation, is probably better.
function* iterableFromNested(iterObj, nestProp) {
    // making a copy so that we don't mutate the original object
    let mutIterObj = iterObj;
    // check that next nest exists i.e. it's not null or undefined
    while (mutIterObj) {
        yield mutIterObj;
        // move mutIterObj down one nesting level
        mutIterObj = mutIterObj[nestProp];
    }
}
/// chains iterables, one after the other. The code is identical to flatten.
function* chain(...iters) {
    yield* flat(iters);
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

exports.chain = chain;
exports.contains = contains;
exports.cycle = cycle;
exports.entries = entries;
exports.every = every;
exports.filter = filter;
exports.find = find;
exports.flat = flat;
exports.flatMap = flatMap;
exports.iterableFromNested = iterableFromNested;
exports.map = map;
exports.reduce = reduce;
exports.some = some;
exports.zip = zip;
