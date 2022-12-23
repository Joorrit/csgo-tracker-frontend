<script lang="ts">
	import type { PositionsInformation } from './types';
	import PositionInformation from './PositionInformation.svelte';
	import "carbon-components-svelte/css/g100.css"
	//import { Dropdown } from "carbon-components/scss/components/dropdown/_dropdown.scss"
	import { Dropdown } from "carbon-components-svelte";
	//import Dropdown from 'sv-bootstrap-dropdown';

	let dropdownTrigger;
	export let positionsInformation: PositionsInformation;
	positionsInformation.sort((a, b) => b.position_size*b.current_price - a.position_size*a.current_price);
</script>

<div class="wrapper">
	<div class="investment-container">
		<div class="title-dropdown">
			<span class="title">Investments</span>
			<div>
				<Dropdown
					type="inline"
					selectedId="0"
					items={[
						{ id: "0", text: "Slack" },
						{ id: "1", text: "Email" },
						{ id: "2", text: "Fax" },
					]}
				/>
			</div>
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
	.title-dropdown {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.title {
		font-weight: 600;
		font-size: 1.2rem;
		margin-bottom: 1rem;
		margin-left: 1.5rem;
		flex:1;
	}
</style>
