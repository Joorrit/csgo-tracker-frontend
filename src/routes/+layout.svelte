<script lang="ts">
	import './styles.css';
	import './fonts.css';
	import { Header } from '$lib/components';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	main {
		min-width: 80%;
		max-width: 90%;
		margin: 0 auto;
		box-sizing: border-box;
		margin-top: var(--header-height);
	}
</style>
