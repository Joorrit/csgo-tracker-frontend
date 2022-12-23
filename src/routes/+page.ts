import type { PageLoad } from './$types';
import { exchangeRate } from './stores';
import type { InventoryValueHistoryRes, ItemRes } from './types';

export const ssr = false;



export const load = (async ({ params }) => {
	const inventoryValueRes = await fetch(`https://joorrit.de/api/inventory/inventory_value_history`);
	const inventoryValuefetchedData: InventoryValueHistoryRes = await inventoryValueRes.json();
	const positionsInformationRes = await fetch(`https://joorrit.de/api/inventory/positions_information`);
	const positionsInformationFetchedData: ItemRes = await positionsInformationRes.json();
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
		items: itemsFetchedData,
		positionsInformation: positionsInformationFetchedData
	};
}) satisfies PageLoad;
