<script lang="ts">
	import { currency } from '$lib/functions/stores';
	import { convCurr, dateToStr, gainToStr, priceToStr } from '$lib/functions/utils';

	export let quantity: number;
    export let item_price: number;
	export let order_type: string;
	export let timestamp: string;
</script>

<div class='item-wrapper'>
    <div class="quantity">x{quantity}</div>
    <div class="item-price">{priceToStr(convCurr(item_price, $currency), $currency)}</div>
    <div class="timestamp">{dateToStr(new Date(timestamp))}</div>
    <div class="order-type">{order_type}</div>
</div>


<style>
	.item-wrapper {
		display: flex;
		align-items: center;
		padding: 0.4rem 0rem;
		font-size: 0.9rem;
		text-decoration: none;
        gap: 0.5rem;
	}
	.item-wrapper:hover {
		background-color: #f8fafd1a;
	}
	.item-price {
		font-size: 0.8rem;
		font-weight: bold;
        flex: 0.2;
	}
    .order-type {
        font-size: 0.8rem;
        font-weight: bold;
        flex: 0.1;
    }
    .timestamp {
        font-size: 0.8rem;
        font-weight: bold;
        flex:0.5;
    }
    .quantity {
        font-size: 0.8rem;
        font-weight: bold;
        flex: 0.15;
    }
</style>
