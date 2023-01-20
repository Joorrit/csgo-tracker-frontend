export type Currency = 'euro' | 'yuan';
export type InventoryValueHistoryEntry = {
	inventory_value: number;
	invested_capital: number;
	timestamp: any;
	liquid_funds: number;
};

export type InventoryValueHistory = Array<InventoryValueHistoryEntry>;

export type InventoryValueHistoryRes = {
	data: InventoryValueHistory;
};

export type ItemEntry = {
	icon_url: string;
	item_id: string;
	name: string;
};

export type Items = Array<ItemEntry>;

export type ItemsRes = {
	data: Items;
};

export type PositionInformationEntry = {
	item: ItemEntry;
	position_size: number;
	current_price: number;
	current_highest_bargain_price: number;
	prev_day_price: number;
	purchase_price: number;
};

export type PositionsInformation = Array<PositionInformationEntry>;

export type PositionsInformationRes = {
	data: PositionsInformation;
};

export type DropDownElement = {
	title: string;
	value: string;
};

export type ItemPrice = {
	highest_bargain_price: number;
	item_id: string;
	price: number;
	timestamp: any;
};

export type ItemPriceHistory = Array<ItemPrice>;

export type ItemPriceHistoryRes = {
	data: ItemPriceHistory;
};

export type ItemRes = {
	data: ItemEntry;
};

export type OrderHistoryEntry = {
	order_type: string;
	quantity: number;
	timestamp: any;
	item_price: number;
};
export type OrderHistoryArray = Array<OrderHistoryEntry>;
