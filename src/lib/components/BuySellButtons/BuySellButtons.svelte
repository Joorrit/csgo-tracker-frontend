
<div class="wrapper">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="buy-button">
        <span>Buy</span>
    </div>
    <div class="sell-button">
        <span>Sell</span>
	</div>
</div>

<style>
	.wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        gap: 2rem;
        margin-top: 1rem;
    }
    .buy-button{
        background-color: var(--color-pos);
        color: white;
        text-align: center;
        border-radius: 10px;
        flex:1;
        padding: 0.5rem 1rem;
        font-weight: bold;
        font-size: 1rem;
    }
    .sell-button{
        background-color: var(--color-neg);
        color: white;
        text-align: center;
        flex:1;
        border-radius: 10px;
        padding: 0.5rem 1rem;
        font-weight: bold;
        font-size: 1rem;
    }
</style>