<div class="wrapper">
	<div class="investment-container">
		<slot />
	</div>
</div>

<style>
	.wrapper {
		min-width: 6rem;
		min-height: 6rem;
		overflow-y: auto;
		height: calc(100vh - var(--header-height));
	}

	@media only screen and (max-width: 1200px) {
		.wrapper {
			height: auto;
			overflow-y: auto;
		}
	}

	.wrapper::-webkit-scrollbar {
		width: 10px;
	}

	.wrapper::-webkit-scrollbar-track {
		background: rgb(68, 68, 68);
		border-radius: 10px;
	}

	.wrapper::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 10px;
	}

	.wrapper::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
	.investment-container {
		display: flex;
		flex-direction: column;
		background-color: #2e2e2e;
		padding: 1.5rem 0;
		border-radius: 10px;
	}
</style>
