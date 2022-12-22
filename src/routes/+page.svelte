<script lang="ts">
	import type { PageData } from './$types';
	import type { InventoryValueHistory, Items } from './+page';
	import DurationSelectorWrapper from './DurationSelectorWrapper.svelte';
	import Invenstments from './Invenstments.svelte';
	import PortfolioElem from './PortfolioElem.svelte';
	import PriceChart from './PriceChart.svelte';
	import { convCurr, priceToStr } from './utils';
	import { currency } from './stores';
	$: $currency, convAllCurr();

	function convAllCurr() {
		oldestCapital = convCurr(oldestEntry.inventory_value, $currency);
		newestCapital = convCurr(newestEntry.inventory_value, $currency);
		currCapital = convCurr(newestEntry.inventory_value, $currency);
	}

	export let data: PageData;

	let chart: any;
	let selectedDurationIndex = 5;

	const inventoryValueData: InventoryValueHistory = data.inventoryValue.data;
	const itemsData: Items = data.items.data;
	const newestEntry = inventoryValueData[inventoryValueData.length - 1];
	const oldestEntry = inventoryValueData[0];
	let oldestCapital = oldestEntry.inventory_value;
	let newestCapital = newestEntry.inventory_value;
	let currCapital = newestEntry.inventory_value;

	function onCrosshairMove(price: number, time: number) {
		if (price !== null && price !== undefined) {
			currCapital = convCurr(price, $currency);
		} else {
			currCapital = newestCapital;
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
		const oneDayAgo = now - 24 * 60 * 60;
		chart.setTimeScale(oneDayAgo, now);
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
	<title>Home</title>
	<meta name="description" content="stonkymaker" />
</svelte:head>

<div class="wrapper">
	<div class="table-wrapper" id="table-wrapper">
		<PortfolioElem
			value={`${priceToStr(currCapital)} ${$currency == 'euro' ? '€' : '¥'}`}
			gainValue={`${priceToStr(Math.abs(oldestCapital - currCapital))}${
				$currency == 'euro' ? '€' : '¥'
			}`}
			gainPerc={`${Math.round(Math.abs((currCapital / oldestCapital - 1) * 100) * 100) / 100}%`}
			profit={currCapital > oldestCapital}
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
			{inventoryValueData}
			{onCrosshairMove}
			{onTimeScaleChanged}
			bind:this={chart}
			profit={newestCapital > oldestCapital}
		/>
	</div>
	<div class="invenstment-wrapper">
		<Invenstments items={itemsData} />
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
