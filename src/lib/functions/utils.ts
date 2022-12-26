import type { Currency, InventoryValueHistoryEntry } from './types';
import { get } from 'svelte/store';
import { exchangeRate } from './stores';

export const addLeadinZero = (n: number) => {
	return n < 10 ? '0' + n : n;
};

export const priceToStr = (price: number, currency: Currency) => {
	const priceStr = price
		.toFixed(2)
		.toString()
		.replace('.', ',')
		.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
	return `${priceStr} ${currToSymbol(currency)}`;
};

export const gainToStr = (gain: number) => {
	const gainStr = gain.toFixed(2).toString();
	return `${gainStr} %`;
};

export const convCurr = (price: number, currency: Currency) => {
	if (currency == 'euro') return price / get(exchangeRate);
	return price;
};

export const currToSymbol = (currency: Currency) => {
	return currency == 'euro' ? '€' : '¥';
};

export const dateToStr = (date: Date | null) => {
	if (!date) return '';
	const year = date.getFullYear();
	const month = addLeadinZero(date.getMonth() + 1);
	const day = addLeadinZero(date.getDate());
	const hours = addLeadinZero(date.getHours());
	const minutes = addLeadinZero(date.getMinutes());
	const seconds = addLeadinZero(date.getSeconds());
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getRelativeValue = (inventoryValue: InventoryValueHistoryEntry) => {
	return (
		(inventoryValue.inventory_value + inventoryValue.liquid_funds) / inventoryValue.invested_capital
	);
};
