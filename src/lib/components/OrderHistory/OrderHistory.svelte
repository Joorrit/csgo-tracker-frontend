<script lang="ts">
    import type { OrderHistory } from '$lib/functions/types';
    import { SiteWrapper } from '$lib/components';
    import { currency } from '$lib/functions/stores';
    import { convCurr, gainToStr, priceToStr } from '$lib/functions/utils';

    export let orderHistory: OrderHistory;

    import OrderInformation from './OrderInformation.svelte';
</script>

<div class="wrapper">
    <div class="title-wrapper">
        <span class="title">Order History</span>
    </div>
    <div class="column-titles">
        <div style="flex:0.15">Qty</div>
        <div style="flex:0.2">Price</div>
        <div style="flex:0.5">Timestamp</div>
        <div style="flex:0.1">Type</div>
    </div>
    <div>
        {#each orderHistory as order}
            <OrderInformation
                quantity={order.quantity}
                item_price={order.item_price}
                timestamp={order.timestamp}
                order_type={order.order_type}
            />
        {/each}
    </div>
</div>


<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		display: flex;
		flex-direction: column;
		background-color: #2e2e2e;
		padding: 1.5rem 1.5rem;
		border-radius: 10px;
	}
    .title-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
    .column-titles {
        display: flex;
		align-items: center;
		padding: 0.4rem 0rem;
		font-size: 0.9rem;
		text-decoration: none;
        gap: 0.5rem;
    }
	.title {
		font-weight: 600;
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}
</style>