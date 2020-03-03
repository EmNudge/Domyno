/// gets the last element from an iter. 
function tail<T>(iter: Iterable<T>): T {
	let value = null;
	for (const item of iter) value = item;

	return value;
} 

export default tail;