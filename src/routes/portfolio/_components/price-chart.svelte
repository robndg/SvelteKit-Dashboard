<script type="ts">
    import 'anychart';
    import { onMount } from 'svelte';
    import { beforeUpdate, afterUpdate } from 'svelte';

    // userBalances store: Wallet balances
    import { userBalances } from '../../../userBalances';
    
    let cryptoFull: string;
    let walletBalance: number;

    userBalances.subscribe(value => {
        cryptoFull = value.cryptoFull;
        walletBalance = value.walletBalance;
    }); 


    // Price History
    let pricePrevious;
    let priceHistory: any;
    // Displayed Price Data
    export let percentageIncrease: any;

    /* Page Data */
    export let days:number; // TimeFrame
    let daysToHours: any;
    export let historyData: Array<[number, string]>; // Time vs (Amount + TODO: add balance %)
    
    // Store chartData
    let chartData: any;
    
    /* Test: Use <User Settings> and <Wallet Data> with fetched <PriceHistory> vs TimeFrame (days) */

    // Invoke this function when the component is mounted to the DOM
    //onMount(async () => {
    $: if (historyData) {
       
        // Map Date and price Data
        chartData = historyData.slice(0, daysToHours).map(data => [new Date(data[0]).toString(), data[1]]);  

        anychart.onDocumentReady(function () {
            // create a area chart
    
            var dataSet = anychart.data.set(chartData);
            // map the data
            var mapping = dataSet.mapAs({x: 0, value: 1});
            var chart = anychart.area(mapping);
            // Start at y 0
            chart.yScale().minimum(0);
            // Styles
            chart.normal().stroke("#8980d5");
            chart.dataArea().background().enabled(false);
            //chart.dataArea().background().fill(['0 #18181b 1', '0.4 #18181b 0'], 90, true);
            chart.background().enabled(false);
            
            // set the container where chart will be drawn
             chart.container("chart-container");


            // crosshair settings
            var crosshair = chart.crosshair();
            // enable crosshair
            crosshair.enabled(true);
            // set custom function for formatting x crossshair label
            
            // set custom function for formatting y crossshair label
            var yCrossLabel = crosshair.yLabel();
            yCrossLabel.enabled(false);

            crosshair.yStroke(null);

            var xScale = anychart.scales.dateTime();
            chart.xScale(xScale);

          
            //  draw the chart on the page
            chart.draw();
        });

    }
    //});
    
    afterUpdate(() => {
    

	});

    function mapChart(){
        console.log("Price Chart days, daysToHours:")
        daysToHours = (days * 24) - 1;
        console.log(days);
        console.log(daysToHours);

        // Map Date and price Data + Splice daysToHours
        chartData = historyData.slice(0, daysToHours).map(data => [new Date(data[0]).toString(), data[1]]); 
        //chartData = historyData.map(data => [new Date(data[0]).toString(), data[1]]);
        
        // For now remove inner html for new chart to draw        
        const element = document.getElementById("chart-container");
        if(element != null){
          element.innerHTML = "";
        }
       
        // Can Map filter large dataset as a function, bug with onMount (remove .slice)
        
        /*var newMapping = mapping.filter("value", function() {
            console.log("here");
            console.log(historyData[0][0]);
            console.log(historyData[daysToHours][0])
            return historyData[daysToHours][0] >= historyData[0][0];
        });
        series0.data(newMapping);*/
       
    }
    // Time Frame, Buttons
    let timeframes_list = [
        '1',
        '7',
        '30',
        '365'
    ];
    // TODO: Remap Series 0 data on original chart
    function updateDays(newDays) {
        days = newDays;
        console.log(days);
        mapChart();
    }
</script>
<div class="flex items-baseline justify-between border-b border-zinc-900 pt-4 pb-6 p-7 mb-6">
    <div>
        <h2 class="text-lg {percentageIncrease >= 0 ? 'text-green-400' : 'text-red-400'}">{percentageIncrease}%</h2>
    </div>
    <div class="flex items-center">
     
        <button type="button" class="-m-2 ml-4 inline-flex items-center rounded-md {days == 1 ? 'border border-indigo-500' : ''} px-3 py-2 text-sm font-medium text-gray-300 rounded-lg bg-zinc-900 p-1 text-zinc-200 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-700"
            on:click={() => updateDays(1)} 
            >  
            1D
        </button>
        <button type="button" class="-m-2 ml-4 inline-flex items-center rounded-md {days == 7 ? 'border border-indigo-500' : ''} px-3 py-2 text-sm font-medium text-gray-300 rounded-lg bg-zinc-900 p-1 text-zinc-200 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-700"
            on:click={() => updateDays(7)} 
            >
            1W
        </button>
        <button type="button" class="-m-2 ml-4 inline-flex items-center rounded-md {days == 30 ? 'border border-indigo-500' : ''} px-3 py-2 text-sm font-medium text-gray-300 rounded-lg bg-zinc-900 p-1 text-zinc-200 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-700"
            on:click={() => updateDays(30)} 
            >
            1M
        </button>
        <button type="button" class="-m-2 ml-4 inline-flex items-center rounded-md {days > 30 ? 'border border-indigo-500' : ''} px-3 py-2 text-sm font-medium text-gray-300 rounded-lg bg-zinc-900 p-1 text-zinc-200 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-700"
            on:click={() => updateDays(365)} 
            >
            1Y
        </button>
        
    </div>
  </div>

<div id="chart-container" style="width: 100%; height: 300px;"></div>