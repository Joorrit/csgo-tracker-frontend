<script lang="ts">
	import type { DropDownElement } from '$lib/functions/types';

	export let elements: Array<DropDownElement>;
	export let selectedElement: DropDownElement;

	let show: boolean = false;
</script>

<div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span
		class="title"
		on:click={() => {
			show = !show;
		}}>{selectedElement.title}</span
	>
	<div class="modal-wrapper">
		<div class={`modal${show ? ' show' : ''}`}>
			<ul>
				{#each elements as element}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<li
						on:click={() => {
							selectedElement = element;
							show = false;
						}}
						class={`${selectedElement === element ? 'elem-selected' : ''}`}
					>
						{element.title}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	.modal-wrapper {
		position: relative;
	}
	.title {
		font-size: 0.7rem;
		color: #1ba4ffcc;
		text-transform: uppercase;
		font-weight: 600;
		letter-spacing: 1px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		cursor: pointer;
	}

	.modal {
		position: absolute;
		top: 10px;
		right: 0;
		background-color: #2e2e2e;
		color: #f8fafd8f;
		border-radius: 10px;
		padding: 0.5rem 0rem;
		display: flex;
		z-index: 1;
		border: 1px solid #f8fafd33;
		white-space: nowrap;
		display: none;
	}
	.show {
		display: block;
	}

	.modal ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.modal ul li {
		margin: 0rem;
		cursor: pointer;
		padding: 0.5rem 4rem 0.5rem 1rem;
	}

	.modal ul li:hover {
		background-color: #f8fafd1a;
	}

	.elem-selected {
		color: white;
	}
</style>
