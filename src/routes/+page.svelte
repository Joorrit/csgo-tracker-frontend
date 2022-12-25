<script lang="ts">
	import type { InventoryValueHistory, Items, PositionsInformation } from '$lib/functions/types';
	import type { UTCTimestamp } from 'lightweight-charts';
	import { DurationSelectorWrapper, PortfolioElem } from '$lib/components';
	import { convCurr, priceToStr, dateToStr } from '$lib/functions/utils';
	import { currency } from '$lib/functions/stores';
	import { Investments } from '$lib/components';
	import PriceChart from '$lib/components/Chart/PriceChart.svelte';
	$: $currency, convAllCurr();

	function convAllCurr() {
		oldestCapital = convCurr(oldestEntry.inventory_value, $currency);
		newestCapital = convCurr(newestEntry.inventory_value, $currency);
		currCapital = convCurr(newestEntry.inventory_value, $currency);
	}

	export let data: any;

	let chart: any;
	let selectedDurationIndex = 5;

	const inventoryValueData: InventoryValueHistory = data.inventoryValue.data;
	const positionsInformationData: PositionsInformation = data.positionsInformation.data;
	const chartData = inventoryValueData.map((item) => {
		const unixTimestamp = (new Date(item.timestamp).getTime() / 1000) as UTCTimestamp;
		return {
			time: unixTimestamp,
			value: (item.inventory_value + item.liquid_funds) / item.invested_capital
		};
	});

	const itemsData: Items = data.items.data;
	const newestEntry = inventoryValueData[inventoryValueData.length - 1];
	const oldestEntry = inventoryValueData[0];
	let oldestCapital = oldestEntry.inventory_value;
	let newestCapital = newestEntry.inventory_value;
	let currCapital = newestEntry.inventory_value;
	let crosshairTime: Date | null = null;

	function onCrosshairMove(price: number, time: number) {
		const closestEntry = findClosestEntry(time);
		if (price !== null && price !== undefined) {
			currCapital = convCurr(closestEntry.inventory_value, $currency);
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
		const closestEntry = inventoryValueData.reduce((prev, curr) => {
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
			newestCapital = convCurr(toEntry.inventory_value, $currency);
			currCapital = newestCapital;
		}
		if (fromEntry) {
			oldestCapital = convCurr(fromEntry.inventory_value, $currency);
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
		const max = inventoryValueData[0].timestamp;
		chart.setTimeScale(max, now);
		selectedDurationIndex = 5;
	}
</script>

<svelte:head>
	<title>Portfolio - CS:GO Capital</title>
	<meta name="description" content="stonkymaker" />
</svelte:head>

<div class="wrapper">
	<div class="table-wrapper" id="table-wrapper">
		<PortfolioElem
			title="Portfolio"
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
		<Investments positionsInformation={positionsInformationData} />
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: space-between;
		/* height: auto; */
	}
	@media only screen and (max-width: 1200px) {
		.wrapper {
			flex-direction: column;
			height: 100%;
		}
	}
	.table-wrapper {
		overflow: hidden;
		margin-top: var(--main-padding-top);
	}
	.invenstment-wrapper {
		grid-row: 1 / span 3;
		grid-column: 2;
		position: -webkit-sticky;
		position: sticky;
		top: var(--header-height);
		height: 0;
	}
</style>
