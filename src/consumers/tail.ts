/// gets the last element from an iter. 
function tail<T>(iter: Iterable<T>): T | null {
	let value = null;
	for (const item of iter) value = item;

	return value;
} 

export default tail;