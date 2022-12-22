<script lang="ts">
	export let title: string;
	export let onClick: any;
	export let selected: boolean;
</script>

<div class={`btn${selected ? ' selected' : ''}`} on:click={onClick}>
	{title}
</div>

<style>
	.btn {
		font-weight: 700;
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		border-radius: 2px;
		background-color: #121212;
		color: #f8fafd8f;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.selected {
		background-color: #f8fafd1a;
		color: #fff;
	}
</style>
