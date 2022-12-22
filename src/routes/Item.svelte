<script lang="ts">
	export let name: string;
	export let icon_url: string;
	export let item_id: string;
</script>

<a href={`/items/${item_id}`} class="item-wrapper">
	<div class="item-icon-wrapper">
		<img src={icon_url} alt={name} class="item-icon" />
	</div>
	<div>
		{name}
	</div>
</a>

<style>
	.item-wrapper {
		display: flex;
		align-items: center;
		padding: 0.4rem 0;
		font-size: 0.9rem;
		text-decoration: none;
	}
	.item-icon-wrapper {
		background-color: #f8fafd1a;
		border-radius: 50%;
		margin-right: 0.5rem;
	}
	.item-icon {
		width: 2.2rem;
		height: 2.2rem;
	}
</style>
