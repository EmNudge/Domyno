# Domyno - Iterable Utility Library

## What Is This?
Domyno is an iterable utility library. That means it's a collection of rather useful functions for dealing with iterables when such an approach becomes appealing. Why iterables and not simply arrays? You may find better explanations in [my article on Lazy Iterables](https://dev.to/emnudge/lazy-iterators-from-scratch-2903), but it essentially comes down to performance. 

Working with iterables over pure arrays happens to provide us with numerous instances where we can optimize our application and still maintain code clarity through declarative function names.

It should be noted that arrays are also iterables. This library provides functions that wrap around arrays without collecting into a new array until you decide to make it do so - a.k.a. lazy.

## Usage
Regular use
```js
import { map, filter } from 'domyno';

const arr = [1, 2, 3, 4, 5];
const mapIter = map(arr, n => n ** 2);
const filterIter = filter(mapIter, n => n < 15);

// collect into an array. Can also use the collect() function or a for loop
const newArr = [...filterIter];

console.log(newArr); // [1, 4, 9]
```

Piped version
```js
import { collect, pipe } from 'domyno';
import { map, filter } from 'domyno/pipeable';

const arr = [1, 2, 3, 4, 5];
const newArr = pipe(
  map(n => n ** 2),    // curried version of map
  filter(n => n < 15), // curried version of filter
  collect                  // collects into an array
);

console.log(newArr); // [1, 4, 9]
```

## Docs and Tutorials
Consult [the wiki](https://github.com/EmNudge/Domyno/wiki) for a much greater wealth of information on all aspects of Domyno.
