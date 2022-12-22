<script lang="ts">
	import {
		createChart,
		type IChartApi,
		type ISeriesApi,
		type LineData,
		type WhitespaceData
	} from 'lightweight-charts';
	import { onMount, afterUpdate } from 'svelte';

	import { addLeadinZero } from './utils';

	export let chartData: (LineData | WhitespaceData)[];
	export let onCrosshairMove: any;
	export let onTimeScaleChanged: any;
	export let profit: boolean;

	let lineSeries: ISeriesApi<'Line'>;
	let chart: IChartApi;

	var width = window.innerWidth * 0.5;
	var height = window.innerHeight * 0.5;
	onMount(() => {
		const container: any = document.getElementById('price-chart');

		chart = createChart(container, {
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
					return `${date.getHours()}:${addLeadinZero(date.getMinutes())}`;
				}
			},
			rightPriceScale: {}
		});

		lineSeries = chart.addLineSeries();

		lineSeries.setData(chartData);

		lineSeries.applyOptions({
			color: 'red'
		});

		chart.timeScale().fitContent();

		chart.subscribeCrosshairMove(function (param: any) {
			const price = param.seriesPrices.get(lineSeries);
			const time = param.time;
			onCrosshairMove(price, time);
		});

		chart.timeScale().subscribeVisibleTimeRangeChange(function (param: any) {
			const from = param.from;
			const to = param.to;
			onTimeScaleChanged(from, to);
		});

		sizeChart();
	});

	afterUpdate(() => {
		lineSeries.applyOptions({
			color: profit ? 'rgba(19, 255, 128, 0.8)' : 'rgba(255, 19, 19, 0.8)'
		});
	});

	function sizeChart() {
		const wrapper = document.getElementById('table-wrapper');
		const width = wrapper?.offsetWidth;
		// const height = wrapper?.offsetHeight;
		if (width && height) {
			chart.resize(width, height);
		}
	}

	var timerID: any = null;
	window.addEventListener('resize', () => {
		if (timerID) clearTimeout(timerID);
		timerID = setTimeout(function () {
			sizeChart();
		}, 10);
	});

	export function setTimeScale(from: any, to: any) {
		chart.timeScale().setVisibleRange({
			from: from,
			to: to
		});
	}
</script>

<section>
	<div class="table-wrapper">
		<div id="price-chart" />
	</div>
</section>

<style>
	.table-wrapper {
		margin-top: 1rem;
	}
</style>
