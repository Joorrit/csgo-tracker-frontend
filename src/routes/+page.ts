import type { PageLoad } from './$types';
import { exchangeRate } from './stores';

export const ssr = false;

type InventoryValueHistoryEntry = {
	inventory_value: number;
	inventory_capital: number;
	timestamp: any;
};

export type InventoryValueHistory = Array<InventoryValueHistoryEntry>;

type InventoryValueHistoryRes = {
	data: InventoryValueHistory;
};

type ItemEntry = {
	icon_url: string;
	item_id: string;
	name: string;
};

export type Items = Array<ItemEntry>;

type ItemRes = {
	data: Items;
};

export const load = (async ({ params }) => {
	const inventoryValueRes = await fetch(`https://joorrit.de/api/inventory/inventory_value_history`);
	const inventoryValuefetchedData: InventoryValueHistoryRes = await inventoryValueRes.json();
	const itemsRes = await fetch(`https://joorrit.de/api/items`);
	const itemsFetchedData: ItemRes = await itemsRes.json();
	const exchangeRateRes = await fetch(
		'https://v6.exchangerate-api.com/v6/0906f918b7251c4b9ec9cd4c/pair/EUR/CNY'
	);
	const exchangeRateFetchedData = await exchangeRateRes.json();
	const exchangeRateVal = exchangeRateFetchedData.conversion_rate;

	exchangeRate.set(exchangeRateVal);

	return {
		inventoryValue: inventoryValuefetchedData,
		items: itemsFetchedData
	};
}) satisfies PageLoad;
