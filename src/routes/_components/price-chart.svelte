<script type="ts">
    import 'anychart';
    import { onMount } from 'svelte';

    type CurrencyData = {
        prices: { [key: string]: { prices: number } }
    }

    export let historyData: Array<[string, string]>;
    console.log(historyData);

    // TODO: may need onMount. Use $ for now
    $: if (historyData) {
            // Map Date and price Data
            const chartData = historyData.map(data => [new Date(data[0]).toString(), data[1]]);
            anychart.onDocumentReady(function() {
                // create a pie chart
                var chart = anychart.line(chartData);
                chart.title("Bitcoin Wallet Chart");
                // set the container where chart will be drawn
                chart.container("chart-container");
                //  draw the chart on the page
                chart.draw();
            });
        }
</script>

<div id="chart-container" style="width: 500px; height: 400px;"></div>