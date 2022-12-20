<script lang="ts">
	import { createChart, isBusinessDay, type UTCTimestamp } from 'lightweight-charts';
	import { onMount } from 'svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		const container: any = document.getElementById('price-chart');
		var width = window.innerWidth * 0.8;
		var height = window.innerHeight * 0.8;

		var chart = createChart(container, {
			width: width,
			height: height,
			rightPriceScale: {
				scaleMargins: {
					top: 0.2,
					bottom: 0
				},
				borderVisible: false
			},
			timeScale: {
				borderVisible: false
			},
			layout: {
				backgroundColor: '#ffffff',
				textColor: '#333'
			},
			grid: {
				horzLines: {
					color: '#eee'
				},
				vertLines: {
					color: '#ffffff'
				}
			}
		});

		chart.applyOptions({
			timeScale: {
				tickMarkFormatter: (time: any) => {
					console.log(time);
					const date = new Date(time * 1000);
					return `${date.getDate()}.${
						date.getMonth() + 1
					} - ${date.getHours()}:${date.getMinutes()}`;
				}
			}
		});

		var areaSeries = chart.addAreaSeries({
			topColor: 'rgba(255, 82, 82, 0.56)',
			bottomColor: 'rgba(255, 82, 82, 0.04)',
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

		function businessDayToString(businessDay: any) {
			return businessDay.year + '-' + businessDay.month + '-' + businessDay.day;
		}

		var toolTipWidth = 100;
		var toolTipHeight = 80;
		var toolTipMargin = 15;

		var toolTip = document.createElement('div');
		toolTip.className = 'floating-tooltip-2';
		container.appendChild(toolTip);

		// update tooltip
		chart.subscribeCrosshairMove(function (param: any) {
			if (
				!param.time ||
				param.point.x < 0 ||
				param.point.x > width ||
				param.point.y < 0 ||
				param.point.y > height
			) {
				toolTip.style.display = 'none';
				return;
			}

			var dateStr = isBusinessDay(param.time)
				? businessDayToString(param.time)
				: new Date(param.time * 1000).toLocaleDateString();

			toolTip.style.display = 'block';
			var price = param.seriesPrices.get(areaSeries);
			toolTip.innerHTML =
				'<div style="color: rgba(255, 70, 70, 1)">Portfolio</div>' +
				'<div style="font-size: 24px; margin: 4px 0px">' +
				Math.round(price) +
				'¥</div>' +
				'<div>' +
				dateStr +
				'</div>';

			var y = param.point.y;

			var left = param.point.x + toolTipMargin;
			if (left > width - toolTipWidth) {
				left = param.point.x - toolTipMargin - toolTipWidth;
			}

			var top = y + toolTipMargin;
			if (top > height - toolTipHeight) {
				top = y - toolTipHeight - toolTipMargin;
			}

			toolTip.style.left = left + 'px';
			toolTip.style.top = top + 'px';
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
		background-color: white;
	}
</style>
