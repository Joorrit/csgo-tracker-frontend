<script lang="ts">
	export let name: string;
	export let icon_url: string;
</script>

<div class="item-icon-wrapper">
	<img src={icon_url} alt={name} class="item-icon" />
</div>

<style>
	.item-icon-wrapper {
		background-color: #f8fafd1a;
		border-radius: 50%;
		margin-right: 0.5rem;
		width: auto;
		max-width: 5rem;
		height: auto;
		max-height: 5rem;
		margin-bottom: 0rem;
	}
	.item-icon {
		width: 100%;
		height: 100%;
	}
</style>
