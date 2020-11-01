/// utility function for use in pipes when normal spread is difficult
function collect<T>(iter: Iterable<T>): T[] {
	return [...iter];
}

export default collect;
