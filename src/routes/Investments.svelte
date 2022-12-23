<script lang="ts">
	import type { DropDownElement, PositionsInformation } from './types';
	import PositionInformation from './PositionInformation.svelte';
	import DropDown from './DropDown.svelte';

	export let positionsInformation: PositionsInformation;
	positionsInformation.sort(
		(a, b) => b.position_size * b.current_price - a.position_size * a.current_price
	);

	const dropdownElements: DropDownElement[] = [
		{ title: 'Tagestrend (%)', value: 'day-trend-perc' },
		{ title: 'Tagestrend (€)', value: 'day-trend' },
		{ title: 'Seit Kauf (%)', value: 'total-trend-perc' },
		{ title: 'Seit Kauf (€)', value: 'total-trend' }
	];

	let selectedElement: any = dropdownElements[0];
</script>

<div class="wrapper">
	<div class="investment-container">
		<div class="title-wrapper">
			<span class="title">Investments</span>
			<DropDown elements={dropdownElements} bind:selectedElement />
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
	</div>
</div>

<style>
	.wrapper {
		min-width: 6rem;
		min-height: 6rem;
		height: calc(100vh - var(--header-height));
		overflow-y: auto;
	}

	@media only screen and (max-width: 1200px) {
		.wrapper {
			height: auto;
			overflow-y: auto;
		}
	}

	.title-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 1.5rem;
	}

	.wrapper::-webkit-scrollbar {
		width: 10px;
	}

	.wrapper::-webkit-scrollbar-track {
		background: rgb(68, 68, 68);
		border-radius: 10px;
	}

	.wrapper::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 10px;
	}

	.wrapper::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
	.investment-container {
		display: flex;
		flex-direction: column;
		background-color: #2e2e2e;
		padding: 1.5rem 0;
		border-radius: 10px;
		margin: var(--main-padding-top) 0.5rem;
	}
	.title {
		font-weight: 600;
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}
</style>
