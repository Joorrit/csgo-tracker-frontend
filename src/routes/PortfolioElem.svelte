<script lang="ts">
	export let value: string;
	export let gainValue: string;
	export let gainPerc: string;
	export let profit: boolean;
</script>

<div class="wrapper">
	<span class="title">Portfolio</span>
	<span class="value">{value}</span>
	<span
		class="gain"
		style="--portfolio-gain-color:{profit ? 'var(--color-pos)' : 'var(--color-neg)'}"
		>{gainValue} ({gainPerc})</span
	>
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
		color: var(--portfolio-gain-color);
	}
</style>
