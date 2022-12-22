<script lang="ts">
	import Header from './Header.svelte';
	import './styles.css';
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
