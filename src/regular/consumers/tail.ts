/// splits iterable into 2 chunks based on result of the boolean function
function tail<T>(iter: Iterable<T>): T | null {
	let value = null;
	for (const item of iter) value = item;

	return value;
}

export default tail;