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
           let chartData = historyData.map(data => [new Date(data[0]).toString(), data[1]]);
    
        //onMount(async () => {
            anychart.onDocumentReady(function() {
                // create a pie chart
                var chart = anychart.area(chartData);
                // Start at y 0
                chart.yScale().minimum(0);
                // Styles
                chart.normal().stroke("#8980d5");
                chart.dataArea().background().enabled(false);
                //chart.dataArea().background().fill(['0 #18181b 1', '0.4 #18181b 0'], 90, true);
                chart.background().enabled(false);
                var series0 = chart.area(chartData);
                series0.fill(['0 #18181b 1', '0.4 #8980d5 0.6'], 90, true);
                //chart.title("1 Day Bitcoin Wallet Chart");
                
                // set the container where chart will be drawn
                chart.container("chart-container");
                //  draw the chart on the page
                chart.draw();
                
            });
       //});
    }
</script>

<div id="chart-container" style="width: 100%; height: 300px;"></div>