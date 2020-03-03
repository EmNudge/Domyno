/// value is the prop which leads to the next object which may or may not exist
interface NestedObject<T> {
	[value: string]: any;
}

/// allows iterating through structures that are deeply nested, such as Linked Lists
/// atm it's rather messy since there isn't a good way to write this out with generics,
/// so a hand-made one, specific for a situation, is probably better.
function iterableFromNested<T>(nestProp: string) {
	return function*(iterObj: NestedObject<T>): Iterable<NestedObject<T>> {
		// making a copy so that we don't mutate the original object
		let mutIterObj = iterObj;
	
		// check that next nest exists i.e. it's not null or undefined
		while (mutIterObj) {
			yield mutIterObj;
	
			// move mutIterObj down one nesting level
			mutIterObj = mutIterObj[nestProp] as NestedObject<T>;
		}
	}
}

export default iterableFromNested;
