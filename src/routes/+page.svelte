<script lang="ts">
	import type { PageData } from './$types';
	import PriceChart from './PriceChart.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<PriceChart data={data}/>
</section>

<style>
</style>
