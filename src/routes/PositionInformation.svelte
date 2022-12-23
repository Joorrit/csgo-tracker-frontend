<script lang="ts">
	import { currency } from './stores';
	import { convCurr, gainToStr, priceToStr } from './utils';

	export let displayType: 'day-trend-perc' | 'day-trend' | 'total-trend-perc' | 'total-trend';
	export let name: string;
	export let icon_url: string;
	export let item_id: string;
	export let position_size: number;
	export let purchase_price: number;
	export let current_price: number;
	export let prev_day_price: number;
</script>

<a href={`/items/${item_id}`} class="item-wrapper">
	<div class="item-icon-wrapper">
		<img src={icon_url} alt={name} class="item-icon" />
	</div>
	<div class="name-n-price">
		<div>{name}</div>
		<div class="size-n-price">
			<div class="position-size">x{position_size}</div>
			<div class="item-price">{priceToStr(convCurr(current_price, $currency), $currency)}</div>
		</div>
	</div>
	{#if displayType === 'day-trend-perc'}
		<div class={`gain ${current_price / prev_day_price >= 1 ? 'positive-gain' : 'negative-gain'}`}>
			{gainToStr((current_price / prev_day_price - 1) * 100)}
		</div>
	{/if}
	{#if displayType === 'day-trend'}
		<div class={`gain ${current_price - prev_day_price >= 0 ? 'positive-gain' : 'negative-gain'}`}>
			{priceToStr(convCurr(current_price - prev_day_price , $currency), $currency)}
		</div>
	{/if}
	{#if displayType === 'total-trend-perc'}
		<div class={`gain ${current_price / purchase_price >= 1 ? 'positive-gain' : 'negative-gain'}`}>
			{gainToStr((current_price / purchase_price - 1) * 100)}
		</div>
	{/if}
	{#if displayType === 'total-trend'}
		<div class={`gain ${current_price - purchase_price >= 1 ? 'positive-gain' : 'negative-gain'}`}>
			{priceToStr(convCurr(current_price - purchase_price , $currency), $currency)}
		</div>
	{/if}
</a>

<style>
	.item-wrapper {
		display: flex;
		align-items: center;
		padding: 0.4rem 1.5rem;
		font-size: 0.9rem;
		text-decoration: none;
	}
	.item-wrapper:hover {
		background-color: #f8fafd1a;
	}
	.item-icon-wrapper {
		background-color: #f9fafd1a;
		border-radius: 50%;
		margin-right: 0.5rem;
	}
	.item-icon {
		width: 2.2rem;
		height: 2.2rem;
	}
	.item-price {
		font-size: 0.8rem;
		font-weight: bold;
	}
	.size-n-price {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.position-size {
		font-size: 0.8rem;
		background-color: #f9fafd1a;
		padding: 0.1rem 0.25rem;
		color: #f8fafd8f;
		border-radius: 0.3rem;
	}
	.name-n-price {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
		gap: 0.3rem;
		margin-right: 1rem;
	}
	.gain {
		font-size: 1rem;
	}
	.positive-gain {
		color: var(--color-pos);
	}
	.negative-gain {
		color: var(--color-neg);
	}
</style>
