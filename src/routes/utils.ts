import type { Currency } from './types';

export const addLeadinZero = (n: number) => {
	return n < 10 ? '0' + n : n;
};

export const priceToStr = (price: number, currency: Currency) => {
	const priceStr = price
		.toFixed(2)
		.toString()
		.replace('.', ',')
		.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
	return `${priceStr} ${currency=='euro'?'€':'¥'}`;
};

export const gainToStr = (gain: number) => {
	const gainStr = gain
		.toFixed(2)
		.toString()
	return `${gainStr} %`;
}

import { exchangeRate } from './stores';
import { get } from 'svelte/store';

export const convCurr = (price: number, currency: Currency) => {
	if (currency == 'euro') return price / get(exchangeRate);
	return price;
};
