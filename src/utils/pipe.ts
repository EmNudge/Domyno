// generic pipe utility command
function pipe(...funcs: Function[]) {
	return (val: any) => funcs.reduce((accum, curr) => curr(accum), val);
}

export default pipe;
