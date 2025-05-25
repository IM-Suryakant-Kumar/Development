import type { ChangeEvent } from "react";

export const debounce = <
	T extends (...args: ChangeEvent<HTMLInputElement>[]) => void
>(
	fn: T,
	delay: number
) => {
	let timerId: ReturnType<typeof setTimeout> | null;
	return (...args: Parameters<T>) => {
		const context = this!;
		if (timerId) {
			clearTimeout(timerId);
		}
		timerId = setTimeout(() => {
			fn.apply(context, args);
			timerId = null;
		}, delay);
	};
};
