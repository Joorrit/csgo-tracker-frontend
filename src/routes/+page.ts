import type { PageLoad } from './$types';
import type { InventoryValueHistoryRes, ItemRes } from '$lib/functions/types';
import { exchangeRate } from '$lib/functions/stores';

export const ssr = false;

export const load = (async ({ params }) => {
	const inventoryValueRes = await fetch(`https://joorrit.de/api/inventory/inventory_value_history`);
	const inventoryValuefetchedData: InventoryValueHistoryRes = await inventoryValueRes.json();
	const positionsInformationRes = await fetch(
		`https://joorrit.de/api/inventory/positions_information`
	);
	const positionsInformationFetchedData: ItemRes = await positionsInformationRes.json();
	const itemsRes = await fetch(`https://joorrit.de/api/items`);
	const itemsFetchedData: ItemRes = await itemsRes.json();
	const exchangeRateRes = await fetch('https://joorrit.de/api/exchange_rate');
	const exchangeRateFetchedData = await exchangeRateRes.json();
	const exchangeRateVal = exchangeRateFetchedData.data;
	exchangeRate.set(exchangeRateVal);

	return {
		inventoryValue: inventoryValuefetchedData,
		items: itemsFetchedData,
		positionsInformation: positionsInformationFetchedData
	};
}) satisfies PageLoad;
