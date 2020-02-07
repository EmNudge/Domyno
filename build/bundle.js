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

/// allows non-array iterables to have a comparable `.entries()` method
/// returns index along with item in a given iterable
function* entries(iter) {
    let index = 0;
    for (const item of iter) {
        yield [index, item];
        index++;
    }
}
/// return new iterable with each function applied
function* map(iter, mapFunc) {
    for (const [index, item] of entries(iter)) {
        yield mapFunc(item, index);
    }
}
/// return new iterable with valus missing that don't pass the filter function
function* filter(iter, filterFunc) {
    for (const [index, item] of entries(iter)) {
        if (!filterFunc(item, index))
            continue;
        yield item;
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
/// mimics Array.prototype.slice
function* slice(iter, begin, end) {
    for (const [index, item] of entries(iter)) {
        if (index < begin)
            continue;
        if (end && end > end)
            continue;
        yield item;
    }
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
/// takes first n elements from an iter
function* take(iter, until) {
    for (const [index, item] of entries(iter)) {
        if (index === until)
            return;
        yield item;
    }
}
/// mimics Array.prototype.slice
function* takeWhile(iter, boolFunc) {
    for (const [index, item] of entries(iter)) {
        if (!boolFunc(item, index))
            return;
        yield item;
    }
}

function pipeSome(func) {
    return (iter) => some(iter, func);
}
function pipeEvery(func) {
    return (iter) => every(iter, func);
}
function pipeContains(itemToFind) {
    return (iter) => contains(iter, itemToFind);
}
function pipeFind(itemToFind) {
    return (iter) => find(iter, itemToFind);
}
function pipeReduce(initialVal, reduceFunc) {
    return (iter) => reduce(iter, initialVal, reduceFunc);
}

function pipeMap(mapFunc) {
    return (iter) => map(iter, mapFunc);
}
function pipeFilter(filterFunc) {
    return (iter) => filter(iter, filterFunc);
}
function pipeFlatMap(mapFunc) {
    return (iter) => flatMap(iter, mapFunc);
}

// generic pipe utility command
const pipe = (...funcs) => (val) => funcs.reduce((accum, curr) => curr(accum), val);
// utility function for use in pipes when normal spread is difficult
const collect = (iter) => [...iter];

exports.chain = chain;
exports.collect = collect;
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
exports.pipe = pipe;
exports.pipeContains = pipeContains;
exports.pipeEvery = pipeEvery;
exports.pipeFilter = pipeFilter;
exports.pipeFind = pipeFind;
exports.pipeFlatMap = pipeFlatMap;
exports.pipeMap = pipeMap;
exports.pipeReduce = pipeReduce;
exports.pipeSome = pipeSome;
exports.reduce = reduce;
exports.slice = slice;
exports.some = some;
exports.take = take;
exports.takeWhile = takeWhile;
exports.zip = zip;
