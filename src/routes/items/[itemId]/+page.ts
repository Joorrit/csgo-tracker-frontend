import type { ItemEntry, PositionInformationEntry } from '$lib/functions/types';
import type { PageLoad } from './$types';

export const ssr = false;

export const load = (async ({ params }: any) => {
	const itemPriceHistoryRes = await fetch(
		`https://joorrit.de/api/items/${params.itemId}/price_history`
	);
	const itemPriceHistoryFetchedData: ItemPriceHistoryRes = await itemPriceHistoryRes.json();
	const itemPositionInformationRes = await fetch(`https://joorrit.de/api/inventory/positions_information/${params.itemId}`);
	const itemPositionInformationFetchedData: PositionInformationEntry = await itemPositionInformationRes.json();

	return {
		itemPriceHistory: itemPriceHistoryFetchedData,
		itemPositionInformation: itemPositionInformationFetchedData
	};
}) satisfies PageLoad;
