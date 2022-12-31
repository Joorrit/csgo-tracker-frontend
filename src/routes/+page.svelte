<script lang="ts">
	import type { InventoryValueHistory, Items, PositionsInformation } from '$lib/functions/types';
	import type { UTCTimestamp } from 'lightweight-charts';
	import { DurationSelectorWrapper, PortfolioElem } from '$lib/components';
	import { convCurr, priceToStr, dateToStr, getRelativeValue, getAbsoluteGain } from '$lib/functions/utils';
	import { currency } from '$lib/functions/stores';
	import { Investments } from '$lib/components';
	import PriceChart from '$lib/components/Chart/PriceChart.svelte';

	export let data: any;

	let chart: any;
	let selectedDurationIndex = 5;

	const inventoryValueData: InventoryValueHistory = data.inventoryValue.data;
	const positionsInformationData: PositionsInformation = data.positionsInformation.data;
	const chartData = inventoryValueData.map((inventoryValue) => {
		const unixTimestamp = (new Date(inventoryValue.timestamp).getTime() / 1000) as UTCTimestamp;
		return {
			time: unixTimestamp,
			value: getAbsoluteGain(inventoryValue)
		};
	});

	const itemsData: Items = data.items.data;
	let newestEntry = inventoryValueData[inventoryValueData.length - 1];
	let oldestEntry = inventoryValueData[0];
	let currEntry = newestEntry;

	let crosshairTime: Date | null = null;

	function onCrosshairMove(price: number, time: number) {
		const closestEntry = findClosestEntry(time);
		if (price !== null && price !== undefined) {
			currEntry = closestEntry;
		} else {
			currEntry = newestEntry;
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
			newestEntry = toEntry;
		}
		if (fromEntry) {
			oldestEntry = fromEntry;
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
			value={priceToStr(
				convCurr(currEntry.inventory_value + currEntry.liquid_funds, $currency),
				$currency
			)}
			gainValue={priceToStr(
				convCurr(
					getAbsoluteGain(currEntry)-getAbsoluteGain(oldestEntry),
					$currency
				),
				$currency
			)}
			gainPerc={`${
				Math.round(
					Math.abs(((getAbsoluteGain(currEntry)- getAbsoluteGain(oldestEntry))/oldestEntry.invested_capital) * 100) * 100
				) / 100
			}%`}
			profit={getAbsoluteGain(currEntry) > getAbsoluteGain(oldestEntry)}
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
			profit={getAbsoluteGain(newestEntry) > getAbsoluteGain(oldestEntry)}
		/>
	</div>
	<div class="invenstment-wrapper">
		<Investments
			positionsInformation={positionsInformationData}
			current_liquid_funds={currEntry.liquid_funds}
		/>
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
