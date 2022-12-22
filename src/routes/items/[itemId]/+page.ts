import type { ItemEntry } from 'src/routes/+page';
import type { PageLoad } from '../../$types';

export const ssr = false;

export type ItemPrice = {
	highest_bargain_price: number;
	item_id: string;
	price: number;
	timestamp: any;
};

export type ItemPriceHistory = Array<ItemPrice>;

type ItemPriceHistoryRes = {
	data: ItemPriceHistory;
};

type ItemRes = {
	data: ItemEntry;
};

export const load = (async ({ params }: any) => {
	const itemPriceHistoryRes = await fetch(
		`https://joorrit.de/api/items/${params.itemId}/price_history`
	);
	const itemPriceHistoryFetchedData: ItemPriceHistoryRes = await itemPriceHistoryRes.json();
	const itemRes = await fetch(`https://joorrit.de/api/items/${params.itemId}`);
	const itemFetchedData: ItemRes = await itemRes.json();

	return {
		itemPriceHistory: itemPriceHistoryFetchedData,
		item: itemFetchedData
	};
}) satisfies PageLoad;
