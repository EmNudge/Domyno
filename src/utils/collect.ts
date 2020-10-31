// utility function for use in pipes when normal spread is difficult
const collect = (iter: Iterable<any>) => [...iter];

export default collect;