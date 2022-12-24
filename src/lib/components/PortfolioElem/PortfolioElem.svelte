<script lang="ts">
	export let title: string;
	export let value: string;
	export let gainValue: string;
	export let gainPerc: string;
	export let profit: boolean;
	export let datestring: string;
</script>

<div class="wrapper">
	<span class="title">{title}</span>
	<span class="value">{value}</span>
	<div class="gain-wrapper">
		<span
			class="gain"
			style="--portfolio-gain-color:{profit ? 'var(--color-pos)' : 'var(--color-neg)'}"
			>{gainValue} ({gainPerc})</span
		>
		<span class="date">{datestring}</span>
	</div>
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
	.gain-wrapper {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		align-items: center;
	}
	.gain {
		font-size: 0.75rem;
		font-weight: 600;
		margin: 0rem;
		color: var(--portfolio-gain-color);
	}
	.date {
		font-size: 0.75rem;
		font-weight: 600;
		margin: 0rem;
		color: var(--color-text-grey);
	}
</style>
