/// splits iterable into 2 chunks based on result of the boolean function
export function tail<T>(iter: Iterable<T>): T | undefined {
	let value: T | undefined
	for (const item of iter) value = item;

	return value;
}

export default tail;
