<script lang="ts">
	import DurationSelector from './DurationSelector.svelte';

	export let onClick1Day: any;
	export let onClick1Week: any;
	export let onClick1Month: any;
	export let onClick6Months: any;
	export let onClick1Year: any;
	export let onClickMax: any;
	export let selectedDurationIndex: number;
</script>

<div class="wrapper">
	<DurationSelector title="1T" onClick={onClick1Day} selected={selectedDurationIndex == 0} />
	<DurationSelector title="1W" onClick={onClick1Week} selected={selectedDurationIndex == 1} />
	<DurationSelector title="1M" onClick={onClick1Month} selected={selectedDurationIndex == 2} />
	<DurationSelector title="6M" onClick={onClick6Months} selected={selectedDurationIndex == 3} />
	<DurationSelector title="1J" onClick={onClick1Year} selected={selectedDurationIndex == 4} />
	<DurationSelector title="MAX" onClick={onClickMax} selected={selectedDurationIndex == 5} />
</div>

<style>
	.wrapper {
		display: flex;
		gap: 0.5rem;
		margin-top: 1rem;
	}
</style>
