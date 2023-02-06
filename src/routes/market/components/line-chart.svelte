<script type="ts">
    import 'anychart';
    import { onMount } from 'svelte';

    export let data: any;
    export let dataTitle: string;

    onMount(() => {
        // check data
        if (data) {
            console.log("container" + dataTitle)
            // create a chart
            var chart = anychart.line(data);
            
            //chart.normal().stroke("#8980d5");
        
            chart.background().enabled(false);

            // create a line series and set the data
            var series = chart.line(data);

            // styles
            var labelsX = chart.xAxis()/*.labels();*/
            labelsX.enabled(false);
            var labelsY = chart.yAxis()
            labelsY.enabled(false);
            // set the container id
            chart.container("container-" + dataTitle);

            // initiate drawing the chart
            chart.draw();
        }
    });
</script>

<div id="container-{dataTitle}" style="width: 100%; height: 75px;"></div>