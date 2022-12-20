<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		min-width: 80%;
		max-width: 90%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
