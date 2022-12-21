<script lang="ts">
	export let value: string;
	export let gainValue: string;
	export let gainPerc: string;
</script>

<div class="wrapper">
	<span class="title">Portfolio</span>
	<span class="value">{value}</span>
	<span class="gain">{gainValue} ({gainPerc})</span>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
	}
	.title {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0rem;
	}
	.value {
		font-size: 1.7rem;
		font-weight: 600;
		margin: 0rem;
	}
	.gain {
		font-size: 0.75rem;
		font-weight: 600;
		margin: 0rem;
		color: var(--color-pos);
	}
</style>
