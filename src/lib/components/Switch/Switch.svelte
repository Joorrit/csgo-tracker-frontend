<script lang="ts">
	let value: boolean = false;
	export let onClick: any;
</script>

<label class="switch">
	<input
		type="checkbox"
		on:click={() => {
			value = !value;
			onClick(value);
		}}
	/>
	<span class="slider round" />
</label>

<style>
	.switch {
		position: relative;
		display: inline-block;
		width: 45px;
		height: 26px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #4b4b4b;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 19px;
		width: 19px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: #4b4b4b;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #4b4b4b;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(18px);
		-ms-transform: translateX(18px);
		transform: translateX(18px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
