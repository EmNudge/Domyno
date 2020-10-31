/// splits iterable into 2 arrays by reversing a zip
function unzip<T>(iter: Iterable<Iterable<T>>) {
	const arr1 = [];
	const arr2 = [];

	for (const [item1, item2] of iter) {
		arr1.push(item1);
		arr2.push(item2);
	}

	return [arr1, arr2];
}

export default unzip;
