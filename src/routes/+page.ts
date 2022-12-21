import type { PageLoad } from './$types';

export const ssr = false;

type InventoryValueHistoryEntry = {
	inventory_value: number;
	inventory_capital: number;
	timestamp: any;
};

type InventoryValueHistory = {
	data: Array<InventoryValueHistoryEntry>;
};

export const load = (async ({ params }) => {
	const res = await fetch(`https://joorrit.de/api/inventory/inventory_value_history`);
	const fetchedData: InventoryValueHistory = await res.json();

	return fetchedData;
}) satisfies PageLoad;
