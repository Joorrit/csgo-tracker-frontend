<script lang="ts">
	import type { DropDownElement, PositionsInformation } from '$lib/functions/types';
	import { currency } from '$lib/functions/stores';
	import { DropDown } from '$lib/components';
	import { SiteWrapper } from '$lib/components';
	import { currToSymbol, priceToStr, convCurr } from '$lib/functions/utils';
	import PositionInformation from './PositionInformation.svelte';

	export let positionsInformation: PositionsInformation;
	positionsInformation.sort(
		(a, b) => b.position_size * b.current_price - a.position_size * a.current_price
	);

	export let current_liquid_funds: number;

	$: $currency, updateElements();
	function updateElements() {
		elements = [
			{ title: 'Today (%)', value: 'day-trend-perc' },
			{ title: `Today (${currToSymbol($currency)})`, value: 'day-trend' },
			{ title: 'Since Purchase (%)', value: 'total-trend-perc' },
			{ title: `Since Purchase (${currToSymbol($currency)})`, value: 'total-trend' }
		];
	}
	let elements: DropDownElement[] = [];
	updateElements();

	let selectedElement: any = elements[0];
</script>

<SiteWrapper>
	<div class="title-wrapper">
		<span class="title">Investments</span>
		<DropDown bind:selectedElement bind:elements />
	</div>
	<div>
		{#each positionsInformation as positionInformation}
			<PositionInformation
				name={positionInformation.item.name}
				icon_url={positionInformation.item.icon_url}
				item_id={positionInformation.item.item_id}
				position_size={positionInformation.position_size}
				purchase_price={positionInformation.purchase_price}
				current_price={positionInformation.current_price}
				prev_day_price={positionInformation.prev_day_price}
				displayType={selectedElement.value}
			/>
		{/each}
	</div>
	<div class="liquids-wrapper">
		<span style="flex: 1"> Liquide Mittel: </span>
		<span style="font-weight: 400">
			{priceToStr(convCurr(current_liquid_funds, $currency), $currency)}
		</span>
	</div>
</SiteWrapper>

<style>
	.title-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 1.5rem;
	}
	.title {
		font-weight: 600;
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}
	.liquids-wrapper {
		display: flex;
		font-weight: 600;
		font-size: 1.2rem;
		margin-bottom: 0rem;
		margin-left: 1.5rem;
		margin-top: 1rem;
		margin-right: 1.5rem;
	}
</style>
