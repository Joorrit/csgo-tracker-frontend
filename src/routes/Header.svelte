<script lang="ts">
	import Switch from './Switch.svelte';
	import { currency } from './stores';

	function onCurrencyChange() {
		currency.update((value) => (value === 'euro' ? 'yuan' : 'euro'));
	}
</script>

<header>
	<nav>
		<span class="title">CS:GO Capital</span>
		<div class="currency-wrapper">
			<span>€</span>
			<Switch onClick={onCurrencyChange} />
			<span>¥</span>
		</div>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		font-family: 'Open Sans', sans-serif;
		position: fixed;
		top: 0;
		width: 100vw;
		z-index: 10;
		background-color: var(--color-bg-0);
	}

	nav {
		display: flex;
		justify-content: space-between;
		min-width: 80%;
		max-width: 90%;
		margin: 0 auto;
		padding: 1rem 0;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		height: var(--header-height);
	}

	@media only screen and (max-width: 1200px) {
		nav {
			flex: 1;
		}
	}

	.title {
		font-size: 1.5rem;
		font-weight: 600;
	}

	.currency-wrapper {
		font-size: 1.4rem;
	}

	.currency-wrapper span {
		margin-left: 0.5rem;
	}
</style>
