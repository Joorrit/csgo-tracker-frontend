<script lang="ts">
	import type { PageData } from './$types';
	import PortfolioElem from './PortfolioElem.svelte';
	import PriceChart from './PriceChart.svelte';
	import { priceToStr } from './utils';

	export let data: PageData;

	const newestEntry = data.data[data.data.length - 1];
	const oldestEntry = data.data[0];
	let oldestCapital = oldestEntry.inventory_value;
	let newestCapital = newestEntry.inventory_value;
	let currCapital = newestEntry.inventory_value;

	function onCrosshairMove(price: number, time: number) {
		if (price) {
			currCapital = price;
		} else {
			currCapital = newestCapital;
		}
	}

	function findClosestEntry(time: number) {
		const closestEntry = data.data.reduce((prev, curr) => {
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
			newestCapital = toEntry.inventory_value;
			currCapital = newestCapital;
		}
		if (fromEntry) {
			oldestCapital = fromEntry.inventory_value;
		}
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<PortfolioElem
		value={`${priceToStr(currCapital)} ¥`}
		gainValue={`${priceToStr(Math.abs(oldestCapital - currCapital))}¥`}
		gainPerc={`${Math.round(Math.abs((currCapital / oldestCapital - 1) * 100) * 100) / 100}%`}
		profit={currCapital > oldestCapital}
	/>
	<PriceChart
		{data}
		{onCrosshairMove}
		{onTimeScaleChanged}
		profit={newestCapital > oldestCapital}
	/>
</section>

<style>
</style>
