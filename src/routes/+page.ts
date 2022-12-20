import type { Time } from 'lightweight-charts';
import type { PageLoad } from './$types';

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

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
