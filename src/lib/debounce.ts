export function createDebounce(time: number, maxTime: number = 10_000) {
	let timer: number | undefined;
	let starttime: number | null = Date.now();

	const debounce = (fn: () => void) => {
		clearTimeout(timer);
		const dbfn = () => {
			fn();
			starttime = Date.now();
		};
		if (!starttime || Date.now() - starttime < maxTime) {
			timer = setTimeout(dbfn, time);
		} else {
			dbfn();
			timer = undefined;
		}
		if (!starttime) 
			starttime = Date.now()
	}
	return debounce;
}