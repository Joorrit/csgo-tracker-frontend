<script lang="ts">
	import { createChart, isBusinessDay, type UTCTimestamp } from 'lightweight-charts';
	import { onMount } from 'svelte';

	import type { PageData } from './$types';

	export let data: PageData;
	export let onCrosshairMove: any;
	export let onTimeScaleChanged: any;

	onMount(() => {
		const container: any = document.getElementById('price-chart');
		var width = window.innerWidth * 0.5;
		var height = window.innerHeight * 0.5;

		var chart = createChart(container, {
			width: width,
			height: height,
			rightPriceScale: {
				scaleMargins: {
					top: 0.2,
					bottom: 0
				},
				borderVisible: false,
				visible: false
			},
			timeScale: {
				borderVisible: false
			},
			layout: {
				backgroundColor: '#121212',
				textColor: '#88898b'
			},
			grid: {
				horzLines: {
					color: '#212121'
				},
				vertLines: {
					visible: false
				}
			},
			crosshair: {
				horzLine: {
					visible: false,
					labelVisible: false
				},
				vertLine: {
					visible: true,
					style: 0,
					width: 2,
					color: '#cccccc',
					labelVisible: false
				}
			}
		});

		chart.applyOptions({
			timeScale: {
				tickMarkFormatter: (time: any) => {
					const date = new Date(time * 1000);
					// return `${date.getDate()}.${
					// 	date.getMonth() + 1
					// } - ${date.getHours()}:${date.getMinutes()}`;
					return `${date.getHours()}:${date.getMinutes()}`;
				}
			},
			rightPriceScale: {}
		});

		var areaSeries = chart.addAreaSeries({
			topColor: 'rgba(0, 0, 0, 0)',
			bottomColor: 'rgba(0, 0, 0, 0)',
			lineColor: 'rgba(255, 82, 82, 1)',
			lineWidth: 2
			// symbol: 'AAPL',
		});

		const setData = data.data.map((item) => {
			const unixTimestamp = (new Date(item.timestamp).getTime() / 1000) as UTCTimestamp;
			return {
				time: unixTimestamp,
				value: item.inventory_value
			};
		});

		areaSeries.setData(setData);

		chart.timeScale().fitContent();

		chart.subscribeCrosshairMove(function (param: any) {
			const price = param.seriesPrices.get(areaSeries);
			const time = param.time;
			onCrosshairMove(price, time);
		});

		chart.timeScale().subscribeVisibleTimeRangeChange(function (param: any) {
			const from = param.from;
			const to = param.to;
			onTimeScaleChanged(from, to);
		});
	});
</script>

<section>
	<div class="table-wrapper">
		<div id="price-chart" />
	</div>
</section>

<style>
	.table-wrapper {
		padding: 2rem;
	}
</style>
