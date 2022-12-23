<script lang="ts">
	import { Logo, Switch } from '$lib/components';
	import { currency } from '$lib/functions/stores';

	function onCurrencyChange() {
		currency.update((value) => (value === 'euro' ? 'yuan' : 'euro'));
	}

	let scrolledDown: boolean = false;

	addEventListener('scroll', () => {
		const scrollPos = window.scrollY;
		scrolledDown = scrollPos > 0;
	});
</script>

<header class={`${scrolledDown ? 'show-border' : ''}`}>
	<nav>
		<Logo />
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
		border-bottom: 1px solid rgba(40, 40, 40, 0);
		transition: border 0.8s;
	}

	.show-border {
		border-bottom: 1px solid rgba(40, 40, 40, 1);
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

	.currency-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.55rem;

		font-size: 1.4rem;
	}
</style>
