<script lang="ts">
	import type { UTCTimestamp } from 'lightweight-charts';
	import type {
		ItemEntry,
		ItemPrice,
		ItemPriceHistory,
		PositionInformationEntry
	} from '$lib/functions/types';
	import { currency } from '$lib/functions/stores';
	import { convCurr, priceToStr, dateToStr } from '$lib/functions/utils';
	import { DurationSelectorWrapper, Icon, PortfolioElem } from '$lib/components';
	import PriceChart from '$lib/components/Chart/PriceChart.svelte';
	import PositionInformation from '$lib/components/ItemInformations/ItemInformations.svelte';
	$: $currency, convAllCurr();

	function convAllCurr() {
		oldestCapital = convCurr(oldestEntry.price, $currency);
		newestCapital = convCurr(newestEntry.price, $currency);
		currCapital = convCurr(newestEntry.price, $currency);
	}

	export let data;

	let chart: any;
	let selectedDurationIndex = 5;
	const itemPositionInformation: PositionInformationEntry = data.itemPositionInformation;
	const itemData: ItemEntry = itemPositionInformation.item;
	const itemPriceHistoryData: ItemPriceHistory = data.itemPriceHistory.data;
	const portfolioValue = data.inventoryValue.data[data.inventoryValue.data.length - 1].inventory_value + data.inventoryValue.data[data.inventoryValue.data.length - 1].liquid_funds;
	const chartData = itemPriceHistoryData.map((item: ItemPrice) => {
		const unixTimestamp = (new Date(item.timestamp).getTime() / 1000) as UTCTimestamp;
		return {
			time: unixTimestamp,
			value: item.price
		};
	});

	const newestEntry = itemPriceHistoryData[itemPriceHistoryData.length - 1];
	const oldestEntry = itemPriceHistoryData[0];
	let oldestCapital = oldestEntry.price;
	let newestCapital = newestEntry.price;
	let currCapital = newestEntry.price;
	let crosshairTime: Date | null = null;

	function onCrosshairMove(price: number, time: number) {
		if (price !== null && price !== undefined) {
			currCapital = convCurr(price, $currency);
		} else {
			currCapital = newestCapital;
		}
		if (time !== null && time !== undefined) {
			crosshairTime = new Date(time * 1000);
		} else {
			crosshairTime = null;
		}
	}

	function findClosestEntry(time: number) {
		const closestEntry = itemPriceHistoryData.reduce((prev: any, curr: any) => {
			const absPrev = Math.abs(new Date(prev.timestamp).getTime() - time * 1000);
			const absCurr = Math.abs(new Date(curr.timestamp).getTime() - time * 1000);
			return absCurr < absPrev ? curr : prev;
		});
		return closestEntry;
	}

	function onTimeScaleChanged(from: number, to: number) {
		const fromEntry = findClosestEntry(from);
		const toEntry = findClosestEntry(to);
		if (toEntry) {
			newestCapital = convCurr(toEntry.price, $currency);
			currCapital = newestCapital;
		}
		if (fromEntry) {
			oldestCapital = convCurr(fromEntry.price, $currency);
		}
	}

	function onClick1Day() {
		const now = new Date().getTime() / 1000;
		const oneDayAgo = new Date();
		oneDayAgo.setHours(0, 0, 0, 0);
		chart.setTimeScale(oneDayAgo.getTime() / 1000, now);
		selectedDurationIndex = 0;
	}

	function onClick1Week() {
		const now = new Date().getTime() / 1000;
		const oneWeekAgo = now - 7 * 24 * 60 * 60;
		chart.setTimeScale(oneWeekAgo, now);
		selectedDurationIndex = 1;
	}

	function onClick1Month() {
		const now = new Date().getTime() / 1000;
		const oneMonthAgo = now - 30 * 24 * 60 * 60;
		chart.setTimeScale(oneMonthAgo, now);
		selectedDurationIndex = 2;
	}

	function onClick6Months() {
		const now = new Date().getTime() / 1000;
		const sixMonthsAgo = now - 6 * 30 * 24 * 60 * 60;
		chart.setTimeScale(sixMonthsAgo, now);
		selectedDurationIndex = 3;
	}

	function onClick1Year() {
		const now = new Date().getTime() / 1000;
		const oneYearAgo = now - 365 * 24 * 60 * 60;
		chart.setTimeScale(oneYearAgo, now);
		selectedDurationIndex = 4;
	}

	function onClickMax() {
		const now = new Date().getTime() / 1000;
		const max = itemPriceHistoryData[0].timestamp;
		chart.setTimeScale(max, now);
		selectedDurationIndex = 5;
	}
</script>

<svelte:head>
	<title>{itemData.name} - CS:GO Capital</title>
	<meta name="description" content="stonkymaker" />
</svelte:head>

<div class="wrapper">
	<div class="table-wrapper" id="table-wrapper">
		<Icon name={itemData.name} icon_url={itemData.icon_url} />
		<PortfolioElem
			title={itemData?.name}
			value={priceToStr(currCapital, $currency)}
			gainValue={priceToStr(Math.abs(oldestCapital - currCapital), $currency)}
			gainPerc={`${Math.round(Math.abs((currCapital / oldestCapital - 1) * 100) * 100) / 100}%`}
			profit={currCapital > oldestCapital}
			datestring={dateToStr(crosshairTime)}
		/>
		<DurationSelectorWrapper
			{onClick1Day}
			{onClick1Week}
			{onClick1Month}
			{onClick6Months}
			{onClick1Year}
			{onClickMax}
			{selectedDurationIndex}
		/>
		<PriceChart
			{chartData}
			{onCrosshairMove}
			{onTimeScaleChanged}
			bind:this={chart}
			profit={newestCapital > oldestCapital}
		/>
	</div>
	<div class="invenstment-wrapper">
		<PositionInformation
			positionSize={itemPositionInformation.position_size}
			positionValue={itemPositionInformation.position_size * itemPositionInformation.current_price}
			purchasePrice={itemPositionInformation.purchase_price}
			currentPrice={itemPositionInformation.current_price}
			portfolioValue={portfolioValue}
		/>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: space-between;
		gap: 2rem;
	}
	@media only screen and (max-width: 1200px) {
		.wrapper {
			flex-direction: column;
			height: 100%;
		}
	}
	.table-wrapper {
		flex: 2;
		overflow: hidden;
		margin-top: var(--main-padding-top);
	}
	.invenstment-wrapper {
		flex: 1;
		position: -webkit-sticky;
		position: sticky;
		top: var(--header-height);
		height: 0;
	}
</style>
