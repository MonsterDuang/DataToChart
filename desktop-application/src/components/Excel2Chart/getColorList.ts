function getColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	const color = `${r},${g},${b}`;
	return color;
}

const curColorList = [
	'0,208,201',
	'78,172,245',
	'0,108,240',
	'255,83,83',
	'246,185,62',
	'100,88,255',
	'255,68,0',
	'255,255,0',
	'255,0,255',
	'143,86,121',
];

export const getColorList = (n: number, type?: any) => {
	let list = curColorList.map((x) => {
		let c = `rgb(${x})`;
		if (type == 'rgb') c = x;
		return c;
	});
	if (n > curColorList.length) {
		for (let i = 0; i <= n - curColorList.length; i++) {
			if (type == 'rgb') list.push(getColor());
			else list.push(`rgb(${getColor()})`);
		}
	}
	return list;
};
