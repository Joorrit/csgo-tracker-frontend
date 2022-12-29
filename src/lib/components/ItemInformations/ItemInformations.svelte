<script lang="ts">
	import { SiteWrapper } from '$lib/components';
	import { currency } from '$lib/functions/stores';
	import { convCurr, gainToStr, priceToStr } from '$lib/functions/utils';

	export let positionSize: number;
	export let positionValue: number;
	export let purchasePrice: number;
	export let currentPrice: number;
</script>

<SiteWrapper>
	<div class="wrapper">
		<span class="title">Depot</span>
		<span class="sub-title">Gesamt</span>
		<span class="total-value">{priceToStr(convCurr(positionValue, $currency), $currency)}</span>
		<span class="sub-title">Performance</span>
		<span
			class={`total-value ${currentPrice - purchasePrice >= 0 ? 'positive-gain' : 'negative-gain'}`}
			>{priceToStr(convCurr((currentPrice - purchasePrice) * positionSize, $currency), $currency)} ({gainToStr(
				(currentPrice / purchasePrice - 1) * 100
			)})</span
		>
		<div class="value-wrapper">
			<div class="title-value-container">
				<span class="sub-title">Anzahl</span>
				<span class="value">{positionSize}</span>
			</div>
			<div class="title-value-container">
				<span class="sub-title">Buy in</span>
				<span class="value">{priceToStr(convCurr(purchasePrice, $currency), $currency)}</span>
			</div>
		</div>
	</div>
</SiteWrapper>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		margin: 0 1.5rem;
	}
	.title {
		font-weight: 600;
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}
	.sub-title {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		font-weight: bold;
		color: #f8fafd8f;
		margin-bottom: 0.7rem;
	}
	.value {
		font-weight: bold;
		font-size: 0.9rem;
	}
	.total-value {
		font-weight: bold;
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}
	.positive-gain {
		color: var(--color-pos);
	}
	.negative-gain {
		color: var(--color-neg);
	}
	.value-wrapper {
		display: flex;
	}
	.title-value-container {
		display: flex;
		flex-direction: column;
		margin-right: 1rem;
	}
</style>
