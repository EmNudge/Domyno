import { map } from './index';


/// a debugging function which doesn't affect the function
function tap<T>(tapFunc: HigherOrderFn<any, void>) {
	return function*(iter: Iterable<T>) {
		yield* map((item: T) => {
			tapFunc(item);
			return item;
		})(iter);
	};
}

export default tap;
