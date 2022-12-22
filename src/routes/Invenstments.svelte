<script lang="ts">
	import type { Items } from './+page';
	import Item from './Item.svelte';

	export let items: Items;
</script>

<div class="wrapper">
	<div class="invenstment-container">
		<span class="title">Investments</span>
		<div>
			{#each items as item}
				<Item name={item.name} icon_url={item.icon_url} />
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
	.invenstment-container {
		display: flex;
		flex-direction: column;
		background-color: #2e2e2e;
		padding: 1.5rem;
		border-radius: 10px;
		margin: var(--main-padding-top) 0.5rem;
	}
	.title {
		font-weight: 600;
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}
</style>
